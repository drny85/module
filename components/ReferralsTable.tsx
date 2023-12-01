'use client'

import { cn } from '@/lib/utils'
import { ColumnsData, ColumnsReferralData, Referral } from '@/types'
import { capitalize } from '@/utils/capitalize'
import {
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Input,
   Pagination,
   Select,
   SelectItem,
   SortDescriptor,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
} from '@nextui-org/react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const SELECTION = [5, 10, 15, 20]

const columns: ColumnsReferralData[] = [
   { key: 'name', label: 'Customer' },
   { key: 'address', label: 'Address' },
   { key: 'apt', label: 'Apt / Unit' },
   { key: 'moveIn', label: 'Move In' },
   //{ key: 'status', label: 'Status' },
   { key: 'referee', label: 'Referee' },
   { key: 'email', label: 'Email' },
   { key: 'phone', label: 'Phone' },
   { key: 'actions', label: '' },
]

const INITIAL_VISIBLE_COLUMNS = columns.map((c) => c.key).slice(0, 5)

export default function ReferralsTable({
   referrals,
}: {
   referrals: Referral[]
}) {
   const [selectedKeys, setSelectedKeys] = useState(new Set())

   const [page, setPage] = useState(1)
   const [filterValue, setFilterValue] = useState('')
   const hasSearchFilter = Boolean(filterValue)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [visibleColumns, setVisibleColumns] = useState(
      new Set(INITIAL_VISIBLE_COLUMNS)
   )

   const data = referrals || []

   const filteredItems: Referral[] = useMemo(() => {
      let filteredProperties = [...data]

      if (hasSearchFilter) {
         filteredProperties = filteredProperties.filter(
            (referral) =>
               referral.name
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               referral.apt?.toLowerCase().includes(filterValue.toLowerCase())
         )
      }

      return filteredProperties
   }, [data, filterValue, hasSearchFilter])

   const headerColumns = useMemo(() => {
      //@ts-ignore
      if (visibleColumns === 'all') return columns

      return columns.filter((column) =>
         Array.from(visibleColumns).includes(column.key)
      )
   }, [visibleColumns, selectedKeys, setSelectedKeys])

   const pages = Math.ceil(filteredItems.length / rowsPerPage)

   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: '',
      direction: 'ascending',
   })

   const onSearchChange = useCallback((value?: string) => {
      if (value) {
         setFilterValue(value)
         setPage(1)
      } else {
         setFilterValue('')
      }
   }, [])

   const onClear = useCallback(() => {
      setFilterValue('')
      setPage(1)
   }, [])

   const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage
      const end = start + rowsPerPage
      return filteredItems.slice(start, end)
   }, [page, filteredItems, rowsPerPage])

   const sortedItems = useMemo(() => {
      return [...items].sort((a: Referral, b: Referral) => {
         const first = a[sortDescriptor.column as keyof Referral] as string
         const second = b[sortDescriptor.column as keyof Referral] as string
         const cmp = first < second ? -1 : first > second ? 1 : 0

         return sortDescriptor.direction === 'descending' ? -cmp : cmp
      })
   }, [sortDescriptor, items])

   const renderCell = useCallback(
      (referral: Referral, columnKey: React.Key) => {
         //@ts-ignore
         const cellValue = referral[columnKey]

         switch (columnKey) {
            case 'status':
               return (
                  <div className='relative flex items-center w-full justify-center gap-5'>
                     <p>{referral.status.name}</p>
                  </div>
               )

            case 'referee':
               return (
                  <div className='relative'>
                     <p className='capitalize text-left'>
                        {referral.referee?.name}
                     </p>
                  </div>
               )

            case 'manager':
               return (
                  <div className='relative flex items-center w-full'>
                     <p className='text-left flex items-start'>
                        {referral.manager?.name}
                     </p>
                  </div>
               )

            case 'package':
               return (
                  <div className='relative'>
                     <p>{referral.package?.home?.name}</p>
                  </div>
               )

            case 'email':
               return (
                  <div className='relative'>
                     <p className='lowercase'>{referral.email}</p>
                  </div>
               )

            case 'actions':
               return (
                  <div className='relative flex items-center w-full justify-center gap-5'>
                     <Tooltip content='View Referral'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                           <Link href={`/referrals/${referral.id}`}>
                              <Button color='default'>View</Button>
                           </Link>
                        </span>
                     </Tooltip>
                  </div>
               )

            default:
               return cellValue
         }
      },
      []
   )

   const topContent = useMemo(() => {
      return (
         <div className='flex items-center justify-between gap-4 w-full'>
            <div className='flex justify-between gap-3 flex-1'>
               <Input
                  isClearable
                  disabled={data.length === 0}
                  className='sm:max-w-[100%]'
                  placeholder='Search by name or apt/unit'
                  startContent={<BiSearch />}
                  value={filterValue}
                  size='md'
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
               />
            </div>

            <div className='flex items-center justify-between flex-1'>
               <div>
                  <p className='text-lg font-semibold ml-5 text-gray-500'>
                     {data.length} Referrals
                  </p>
               </div>
               <div>
                  <Dropdown>
                     <DropdownTrigger className='hidden sm:flex'>
                        <Button
                           endContent={
                              <ChevronDownIcon className='text-small' />
                           }
                           variant='flat'
                        >
                           Columns
                        </Button>
                     </DropdownTrigger>
                     <DropdownMenu
                        disallowEmptySelection
                        aria-label='Table Columns'
                        closeOnSelect={false}
                        selectedKeys={visibleColumns}
                        selectionMode='multiple'
                        onSelectionChange={setVisibleColumns as any}
                     >
                        {columns.map((column) => (
                           <DropdownItem
                              key={column.key}
                              className='capitalize'
                           >
                              {capitalize(column.label)}
                           </DropdownItem>
                        ))}
                     </DropdownMenu>
                  </Dropdown>
               </div>
               <div>
                  {selectedKeys.size > 0 && (
                     <Button variant='bordered' color='primary'>
                        View {selectedKeys.size}{' '}
                        {selectedKeys.size === 1 ? 'Referral' : 'Properties'}
                     </Button>
                  )}
               </div>
            </div>
         </div>
      )
   }, [filterValue, onSearchChange, onClear, selectedKeys, data.length])

   if (data.length === undefined) return
   return (
      <Table
         fullWidth
         shadow='md'
         aria-label='Example table with dynamic content'
         sortDescriptor={sortDescriptor}
         topContent={topContent}
         color='secondary'
         classNames={{
            wrapper: 'min-h-[300px]',
         }}
         onSortChange={setSortDescriptor}
         selectedKeys={selectedKeys as any}
         selectionMode='multiple'
         onSelectionChange={setSelectedKeys as any}
         bottomContentPlacement='outside'
         bottomContent={
            data.length > 0 && (
               <div className='flex justify-evenly w-full items-center'>
                  <Pagination
                     showControls
                     showShadow
                     color='secondary'
                     page={page}
                     total={pages}
                     onChange={(p) => {
                        setPage(p)
                     }}
                  />

                  <Select
                     size='sm'
                     label={'Per Page'}
                     labelPlacement='outside-left'
                     className='max-w-[120px]'
                     value={rowsPerPage}
                     onChange={(c) => {
                        setRowsPerPage(Number(c.target.value))
                     }}
                  >
                     {SELECTION.map((s) => (
                        <SelectItem key={s} value={s} textValue={s.toString()}>
                           {s}
                        </SelectItem>
                     ))}
                  </Select>
               </div>
            )
         }
      >
         <TableHeader columns={headerColumns}>
            {(column) => (
               <TableColumn
                  allowsSorting={column.key !== 'actions'}
                  key={column.key}
                  // className={cn({
                  //    'text-center': column.key !== 'address',
                  // })}
               >
                  {column.label}
               </TableColumn>
            )}
         </TableHeader>
         <TableBody items={sortedItems} emptyContent='No Properties to show'>
            {(item) => (
               <TableRow
                  key={item.id}
                  className='data-[selected=true]:bg-slate-400'
               >
                  {(columnKey) => (
                     <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
               </TableRow>
            )}
         </TableBody>
      </Table>
   )
}

'use client'

import { cn } from '@/lib/utils'
import { ColumnsData, Property } from '@/types'
import { tableName } from '@/utils/tableName'
import {
   Button,
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
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import PriorityButton from './PriorityButton'

const SELECTION = [5, 10, 15, 20]

const columns: ColumnsData[] = [
   { key: 'MDU PROP ID', label: 'PID' },
   { key: 'VSS PROP NAME', label: 'VSS PROP NAME' },
   { key: 'VSS STREET', label: 'VSS STREET' },
   { key: 'VSS CITY', label: 'City' },
   { key: 'VSS ZIP CODE', label: 'Zip Code' },
   { key: 'TOTAL LU', label: 'LU' },
   { key: 'INTERNET PENETRATION', label: 'DATA %' },
   { key: 'priority', label: 'Priority' },
   { key: 'actions', label: '' },
]

export default function PropertiesTable({
   properties,
}: {
   properties: Property[]
}) {
   const [selectedKeys, setSelectedKeys] = React.useState(new Set())
   const [page, setPage] = useState(1)
   const [filterValue, setFilterValue] = useState('')
   const hasSearchFilter = Boolean(filterValue)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const data = properties || []

   const filteredItems: Property[] = useMemo(() => {
      let filteredProperties = [...data]

      if (hasSearchFilter) {
         filteredProperties = filteredProperties.filter(
            (property) =>
               property['AM NAME']
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               property['VSS PROP NAME']
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               property['VSS STREET']
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               property['VSS STREET NO']
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               property['AM NAME']
                  .toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
               property['MDU PROP ID'].toString() === filterValue
         )
      }

      return filteredProperties
   }, [data, filterValue, hasSearchFilter])

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
      return [...items].sort((a: Property, b: Property) => {
         const first = a[sortDescriptor.column as keyof Property] as string
         const second = b[sortDescriptor.column as keyof Property] as string
         const cmp = first < second ? -1 : first > second ? 1 : 0

         return sortDescriptor.direction === 'descending' ? -cmp : cmp
      })
   }, [sortDescriptor, items])

   const renderCell = React.useCallback(
      (property: Property, columnKey: React.Key) => {
         const cellValue = property[columnKey as keyof Property]

         switch (columnKey) {
            case 'priority':
               return (
                  <div className='hidden md:block'>
                     <PriorityButton property={property} />
                  </div>
               )

            case 'actions':
               return (
                  <div className='relative flex items-center w-full justify-center gap-5'>
                     <Tooltip content='View Property'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                           <Link
                              href={`/properties/${property['MDU PROP ID']}`}
                           >
                              <Button color='default'>View</Button>
                           </Link>
                        </span>
                     </Tooltip>
                  </div>
               )
            case 'VSS STREET':
               return (
                  <div className='flex items-center gap-3 w-full'>
                     <p>{property['VSS STREET NO']}</p>
                     <p>{property['VSS STREET']}</p>
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
                  placeholder='Search by name or last name'
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
                     {data.length} Properties
                  </p>
               </div>
               <div>
                  {selectedKeys.size > 0 && (
                     <Button variant='bordered' color='primary'>
                        View {selectedKeys.size}{' '}
                        {selectedKeys.size === 1 ? 'Property' : 'Properties'}
                     </Button>
                  )}
               </div>
            </div>
         </div>
      )
   }, [filterValue, onSearchChange, onClear, selectedKeys, data.length])

   // if (data.length === 0) return
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
         <TableHeader columns={columns}>
            {(column) => (
               <TableColumn
                  allowsSorting={column.key !== 'actions'}
                  key={column.key}
                  className={cn({
                     'text-center': column.key !== 'VSS PROP NAME',
                  })}
               >
                  {tableName(column.label as keyof Property)}
               </TableColumn>
            )}
         </TableHeader>
         <TableBody items={sortedItems} emptyContent='No Properties to show'>
            {(item) => (
               <TableRow
                  key={item['MDU PROP ID']}
                  className='data-[selected=true]:bg-slate-400'
               >
                  {(columnKey) => (
                     <TableCell
                        className={cn({
                           'text-center': columnKey !== 'VSS PROP NAME',
                        })}
                     >
                        {renderCell(item, columnKey)}
                     </TableCell>
                  )}
               </TableRow>
            )}
         </TableBody>
      </Table>
   )
}

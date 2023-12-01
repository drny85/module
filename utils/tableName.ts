import { Property } from '@/types'

export const tableName = (name: keyof Property) => {
   switch (name) {
      case 'MDU PROP ID':
         return 'PID'
      case 'VSS PROP NAME':
         return 'PROP NAME'
      case 'VSS STREET NO':
         return 'Street #'
      case 'VSS STREET':
         return 'Street'
      case 'VSS CITY':
         return 'City'
      case 'VSS STATE':
         return 'State'
      case 'VSS ZIP CODE':
         return 'Zip Code'
      case 'TOTAL LU':
         return 'LU'
      case 'TV PENETRATION':
         return 'TV %'
      case 'INTERNET PENETRATION':
         return 'DATA %'
      case 'AM NAME':
         return 'CE'

      default:
         return name
   }
}

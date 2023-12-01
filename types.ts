export type Property = {
   'MDU PROP ID': number
   'AM NAME': string
   'EM/EVENTS CHANNEL COACH NAME': string
   'EM/EVENTS CHANNEL REP NAME': string
   'EM/EVENTS CHANNEL VENDOR MGR NAME': string
   'EM/EVENTS CHANNEL VENDOR NAME': string
   'INTERNET PENETRATION': string
   'RMM NAME': string
   'TOTAL BUS UNITS': number
   'TOTAL LU': number
   'TOTAL RES UNITS': number
   'TV PENETRATION': string
   'VSS CITY': string
   'VSS PROP NAME': string
   'VSS STATE': string
   'VSS STREET': string
   'VSS STREET NO': string
   'VSS ZIP CODE': string
   'WIRE CENTER': string
   priority: Priority
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HARD'
export type ActivityType = 'Visit' | 'Event' | 'Introduction' | undefined

export type Activity = {
   id?: string
   type: ActivityType
   date: string | undefined
   comment: string
   createdAt: string
}

export type ColumnsData = {
   key: string
   label: string
}
export type ColumnsReferralData = {
   key: keyof Referral
   label: string
}
export interface STATUS {
   id: 'new' | 'in_progress' | 'closed' | 'not_sold'
   name: 'New' | 'In Progress' | 'Closed' | 'Not Sold'
}
export type UserRole = 'admin' | 'em' | 'coach' | 'ce' | 'referee' | 'ceo'
export interface Helper {
   id?: string
   name: string
   phone: string
   email: string
   addedOn?: string
   userId: string
   type: UserRole
}

export type ReferralInfo = {
   'At Referral Creation CE Email': string
   'At Referral Creation CE Name': string
   CCID: string
   'Client Executive Email': string
   'Client Executive Name': string
   'Client Executive Phone': string
   'Comments/Notes': string
   'EM Coach Email': string
   'EM Coach Name': string
   'Leasing Agent Email': string
   'Leasing Agent Mobile Phone': string
   'Leasing Agent Name': string
   'Managing Partner Email': string
   'Managing Partner Name': string
   'Master Order Number': string
   'Move-In Date': string
   'Opt Out': string
   Payment: string
   Points: string
   'Product Referred': string
   'Product Sold': string
   Program: string
   Property: string
   'Property State': string
   'Property Street Number': string
   Reason: string
   'Referral Expiration Date': string
   'Referral Id': string
   'Referral Type': string
   Resident: string
   'Resident Address': string
   'Resident Email': string
   'Resident Mobile Phone Number': string
   Status: string
   'Submission Date': string
   'UnitApt#': string
   'Verizon Mobile Status': string
}

export const WIRELESSnames: { [key: string]: string } = {
   wireless_referral: 'Wireless CTC',
   wireless_direct: 'Wireless DS',
}

export const services = [
   {
      internet: [
         { id: 'internet_300', name: '300 Mbps' },
         { id: 'internet_500', name: '500 Mbps' },
         { id: 'one-gig', name: '1 Gigabit' },
         { id: 'two-gig', name: '2 Gigabit' },
      ],
   },
   {
      tv: [
         { id: 'tv_test_drive', name: 'Test Drive' },
         { id: 'tv_your', name: 'Your Fios TV' },
         { id: 'tv_more', name: 'More Fios TV' },
         { id: 'tv_most', name: 'Most Fios TV' },
         { id: 'tv_mundo', name: 'TV Mundo' },
         { id: 'tv_total', name: 'Mundo Total' },
         { id: 'youtube', name: 'YouTube TV' },
      ],
   },
   {
      phone: [
         {
            id: 'home_phone',
            name: 'Home Phone',
         },
      ],
   },
   {
      wireless: [
         { id: 'wireless_referral', name: 'Click To Call' },
         { id: 'wireless_direct', name: 'Direct Sale' },
      ],
   },
]

export const TVnames: { [key: string]: string } = {
   tv_test_drive: 'Test Drive',
   tv_your: 'Your TV',
   tv_more: 'More TV',
   tv_most: 'Most TV',
   tv_mundo: 'TV Mundo',
   tv_total: 'Mundo Total',
   youtube: 'YouTube',
}

export const INTERNETnames: { [key: string]: string } = {
   internet_300: '300 Mbps',
   internet_500: '500 Mbps',
   one_gig: '1 Gigabit',
   two_gig: '2 Gigabit',
}

export const TIERS = {
   internet: {
      internet_300: 20,
      internet_500: 35,
      one_gig: 55,
      two_gig: 75,
   },
   tv: {
      tv_your: { tier1: 15, tier2: 25, tier3: 30 },
      tv_test_drive: { tier1: 20, tier2: 30, tier3: 40 },
      tv_more: { tier1: 15, tier2: 25, tier3: 30 },
      tv_most: { tier1: 30, tier2: 40, tier3: 50 },
      tv_mundo: { tier1: 10, tier2: 20, tier3: 25 },
      tv_total: { tier1: 10, tier2: 20, tier3: 25 },
      youtube: { tier1: 15, tier2: 15, tier3: 15 },
   },
   home: {
      home_phone: 10,
   },

   tier: {
      tier1: 8,
      tier2: 9,
      tier3: 15,
   },
   wireless: {
      wireless_referral: 60,
      wireless_direct: 125,
   },
}

export type Package = {
   id: string
   name: string
}
export type Packages = {
   home: Package | null
   internet: Package | null
   tv: Package | null
   wireless: Package | null
}

export type Referral = {
   id?: string
   name: string
   phone: string
   email?: string
   address: string
   propertyName: string
   apt?: string | null
   package: Packages
   order_date: string | null
   due_date: string | null
   referee: Helper | null
   manager: Helper | null
   status: STATUS
   date_entered: string
   userId: string | null
   moveIn: string | null
   addedBy: string
   updated: string | null
   isVerizonWirelessCustomer: boolean
   isReferral: boolean
   type: 'move' | 'new' | 'acp' | 'other'
   applicationId: string | null
   mon: string | null
   email_sent: boolean
   email_sent_on: string | null
   comment: string | null
   followUpOn: string | null
} & {
   actions?: string
}

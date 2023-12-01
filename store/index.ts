// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// type PropertiesState = {
//    properties: Property[]
//    property: Property | null
//    setProperty: (property: Property) => void
//    setProperties: (properties: Property[]) => void
// }
// export const useProperties = create<PropertiesState>()(
//    persist(
//       (set) => ({
//          properties: [],
//          property: null,
//          setProperty: (property) => set({ property }),
//          setProperties: (properties) => set({ properties }),
//       }),
//       { name: 'properties', skipHydration: true }
//    )
// )

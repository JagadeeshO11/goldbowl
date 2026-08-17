import { createContext, useContext } from 'react'
import { usePrototypeStore } from '../hooks/usePrototypeStore'

const PrototypeContext = createContext(null)

export function PrototypeProvider({ children }) {
  const state = usePrototypeStore()
  return <PrototypeContext.Provider value={state}>{children}</PrototypeContext.Provider>
}

export function usePrototypeContext() {
  const context = useContext(PrototypeContext)
  if (!context) throw new Error('usePrototypeContext must be used inside PrototypeProvider')
  return context
}

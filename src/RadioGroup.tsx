import { ReactNode, createContext, useContext, useState } from 'react'
import React from 'react'

type RadioGroupProps = {
  children: ReactNode
}

type ContextType = {
  selected?: string
  setSelected?: (val: string) => void
}

const RadioGroup = createContext<ContextType>({})

export default function RadioGroupContext({ children }: RadioGroupProps): JSX.Element {
  const [selected, setSelected] = useState<string>('')
  // Prevent ref propagation ?
  return <RadioGroup.Provider value={{ selected, setSelected }}>{children}</RadioGroup.Provider>
}

export function useRadioGroupContext(): ContextType {
  return useContext<ContextType>(RadioGroup)
}

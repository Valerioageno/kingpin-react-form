import type { InputEffect, Result } from './types'
import { ReactNode, createContext, forwardRef, useContext, useImperativeHandle, useState } from 'react'
import React from 'react'

type RadioGroupProps = {
  name: string
  children: ReactNode
}

type ContextType = {
  selected?: string
  setSelected?: (val: string) => void
}

const RadioGroup = createContext<ContextType>({})

const RadioGroupContext = forwardRef<InputEffect, RadioGroupProps>((props, ref): JSX.Element => {
  const [selected, setSelected] = useState<string>('')

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result {
        return { name: props.name || 'former-radio-group', value: selected }
      },
    }),
    [props.name, selected],
  )
  // TODO: stop here ref propagation
  return <RadioGroup.Provider value={{ selected, setSelected }}>{props.children}</RadioGroup.Provider>
})

export function useRadioGroupContext(): ContextType {
  return useContext<ContextType>(RadioGroup)
}

RadioGroupContext.displayName = 'FormerRadioGroup'
export default RadioGroupContext

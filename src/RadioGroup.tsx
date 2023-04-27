/* eslint-disable jsdoc/check-param-names */
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

/**
 * @description This is the controller for radio buttons. In order to make a group of radio buttons working you have to wrap them using this component.
 * @param selected the name of the selected radio button
 * @param name The RadioGroup identifier
 * @returns JSX.Element
 */
const FormerRadioGroup = forwardRef<InputEffect<string>, RadioGroupProps>((props, ref): JSX.Element => {
  const [selected, setSelected] = useState<string>('')

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result<string> {
        return { name: props.name || 'former-radio-group', value: selected }
      },
    }),
    [props.name, selected],
  )
  // TODO: stop here ref propagation
  return <RadioGroup.Provider value={{ selected, setSelected }}>{props.children}</RadioGroup.Provider>
})

/**
 * @access private
 * @description Access the RadioGroupContext in the radio buttons.
 * @returns JSX.Element
 */
export function useRadioGroupContext(): ContextType {
  return useContext<ContextType>(RadioGroup)
}

FormerRadioGroup.displayName = 'FormerRadioGroup'
export default FormerRadioGroup

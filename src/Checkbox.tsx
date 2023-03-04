import type { InputEffect, Result } from './types'
import { InputHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<InputEffect, InputProps>((props, ref): JSX.Element => {
  const [value, setValue] = useState<boolean>(props.checked || false)

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result {
        return { name: props?.name || 'former-checkbox', value }
      },
    }),
    [props.name, value],
  )

  return (
    <input
      name="former-radio"
      {...props}
      checked={value}
      onChange={(e): void => {
        props.onChange?.(e)
        setValue((e) => !e)
      }}
    />
  )
})

Checkbox.displayName = 'FormerCheckbox'
export default Checkbox

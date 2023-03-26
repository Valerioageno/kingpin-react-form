import { useRadioGroupContext } from './RadioGroup'
import { useIsomorphicEffect } from './helpers'
import type { InputEffect, Result } from './types'
import { InputHTMLAttributes, forwardRef, useImperativeHandle } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Radio = forwardRef<InputEffect<boolean>, InputProps>((props, ref): JSX.Element => {
  const { selected, setSelected } = useRadioGroupContext()

  useIsomorphicEffect(() => {
    if (selected === props.name) {
      setSelected?.(props.name || 'former-radio')
    }
  }, [selected, setSelected])

  useIsomorphicEffect(() => {
    if (props.checked) setSelected?.(props.name || 'former-radio')
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result<boolean> {
        return { name: props?.name || 'former-radio', value: selected === props.name }
      },
    }),
    [props.name, selected],
  )

  return (
    <input
      name="former-radio"
      {...props}
      checked={selected === props.name}
      onChange={(e): void => {
        props.onChange?.(e)
        setSelected?.(props.name || 'former-radio')
      }}
    />
  )
})

Radio.displayName = 'FormerRadio'
export default Radio

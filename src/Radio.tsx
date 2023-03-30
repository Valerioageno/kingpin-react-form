import { useRadioGroupContext } from './RadioGroup'
import { useIsomorphicEffect } from './helpers'
import withFormer, { WithFormerType } from './withFormer'
import { InputHTMLAttributes } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const FormerRadio = (props: InputProps & WithFormerType<boolean>): JSX.Element => {
  const { selected, setSelected } = useRadioGroupContext()

  useIsomorphicEffect(() => {
    if (selected === props.name) {
      setSelected?.(props.name || 'former-radio')
    }
  }, [selected, setSelected])

  useIsomorphicEffect(() => {
    if (props.value) setSelected?.(props.name || 'former-radio')
  }, [])

  return (
    <input
      name="former-radio"
      {...props}
      checked={selected === props.name}
      type="radio"
      onChange={(e): void => {
        props.onChange?.(e)
        setSelected?.(props.name || 'former-radio')
      }}
    />
  )
}

export default withFormer(FormerRadio)

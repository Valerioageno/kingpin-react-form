import withFormer, { WithFormerType } from './withFormer'
import React, { ChangeEvent, InputHTMLAttributes } from 'react'

type ReturnTypes = string | number | boolean

const FormerInput = (props: InputHTMLAttributes<HTMLInputElement> & WithFormerType<ReturnTypes>): JSX.Element => {
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    props.onChange?.(e)

    switch (props.type) {
      case 'number':
      case 'range':
        props.updateState?.(+e.target.value)
        break
      case 'checkbox':
        props.updateState?.(!props.value)
        break
      default:
        props.updateState?.(e.target.value)
    }
  }

  return (
    <input
      name="former-input"
      {...props}
      value={props.value}
      checked={props.type === 'checkbox' ? (props.value as unknown as boolean) : undefined}
      onChange={onChange}
    />
  )
}

export default withFormer<InputHTMLAttributes<HTMLInputElement> & WithFormerType<ReturnTypes>, ReturnTypes>(FormerInput)

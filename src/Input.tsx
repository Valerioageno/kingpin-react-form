import { purgeProps } from './helpers'
import withKingpin from './hoc/withKingpin'
import type { WithKingpinProps, WithKingpinType } from './types'
import React, { ChangeEvent, FunctionComponent, InputHTMLAttributes } from 'react'

type ReturnTypes = string | number | boolean

type Props = InputHTMLAttributes<HTMLInputElement> & WithKingpinType<ReturnTypes>

/**
 * @description This is just a simple HTML input element which works within the Kingpin form  component out of the box. It takes whatever input HTML attribute as prop.
 * @param props InputHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinInput = withKingpin<Props, ReturnTypes>((props: Props): JSX.Element => {
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
      name="Kingpin-input"
      {...purgeProps(props)}
      value={props.value}
      checked={props.type === 'checkbox' ? Boolean(props.value) : undefined}
      onChange={onChange}
    />
  )
}, '')

KingpinInput.displayName = 'KingpinInput'

export default KingpinInput as unknown as FunctionComponent<WithKingpinProps<ReturnTypes> & Props>

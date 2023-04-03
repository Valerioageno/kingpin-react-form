import { useRadioGroupContext } from './RadioGroup'
import { useIsomorphicEffect } from './helpers'
import withFormer, { WithFormerType } from './withFormer'
import { InputHTMLAttributes } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * @name FormerRadio
 * @description This is just a simple HTML input (type="radio") element which works within the Former form component out of the box. It takes whatever input HTML attribute as prop. To work properly it has to be wrapped by the RadioGroup component.
 * @param props InputHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const FormerRadio = withFormer<InputHTMLAttributes<HTMLInputElement> & WithFormerType<boolean>, boolean>(
  (props: InputProps & WithFormerType<boolean>): JSX.Element => {
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
  },
)

export default FormerRadio

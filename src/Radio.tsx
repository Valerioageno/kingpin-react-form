import { useRadioGroupContext } from './RadioGroup'
import { useIsomorphicEffect } from './helpers'
import { WithKingpinType } from './withKingpin'
import { InputHTMLAttributes } from 'react'
import React from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * @description This is just a simple HTML input (type="radio") element which works within the Kingpin form component out of the box. It takes whatever input HTML attribute as prop. To work properly it has to be wrapped by the RadioGroup component.
 * @param props InputHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinRadio = (props: InputProps & WithKingpinType<boolean>): JSX.Element => {
  const { selected, setSelected } = useRadioGroupContext()

  useIsomorphicEffect(() => {
    if (selected === props.name) {
      setSelected?.(props.name || 'kingpin-radio')
    }
  }, [selected, setSelected])

  useIsomorphicEffect(() => {
    if (props.value) setSelected?.(props.name || 'kingpin-radio')
  }, [])

  return (
    <input
      name="kingpin-radio"
      {...props}
      checked={selected === props.name}
      type="radio"
      onChange={(e): void => {
        props.onChange?.(e)
        setSelected?.(props.name || 'kingpin-radio')
      }}
    />
  )
}
export default KingpinRadio

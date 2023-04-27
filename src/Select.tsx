import withFormer, { WithFormerType } from './withFormer'
import React, { SelectHTMLAttributes } from 'react'

/**
 * @description This is just a simple HTML select element which works within the Former form component out of the box. It takes whatever select HTML attribute as prop.
 * @param props SelectHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const FormerSelect = withFormer<SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>, string>(
  (props: SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>): JSX.Element => (
    <select name="former-select" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
  ),
)

export default FormerSelect

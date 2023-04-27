import withFormer, { WithFormerType } from './withFormer'
import React, { TextareaHTMLAttributes } from 'react'

/**
 * @description This is just a simple HTML textarea  element which works within the Former Form  component out of the box. It takes whatever textarea HTML attribute as prop.
 * @param props TextareaHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const FormerTextarea = withFormer<TextareaHTMLAttributes<HTMLTextAreaElement> & WithFormerType<string>, string>(
  (props: TextareaHTMLAttributes<HTMLTextAreaElement> & WithFormerType<string>): JSX.Element => (
    <textarea name="former-textarea" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
  ),
)

export default FormerTextarea

import withFormer, { WithFormerType } from './withFormer'
import React, { TextareaHTMLAttributes } from 'react'

const FormerTextarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement> & WithFormerType<string>): JSX.Element => (
  <textarea name="former-textarea" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
)

export default withFormer<TextareaHTMLAttributes<HTMLTextAreaElement> & WithFormerType<string>, string>(FormerTextarea)

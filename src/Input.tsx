import withFormer, { WithFormerType } from './withFormer'
import React, { InputHTMLAttributes } from 'react'

const FormerInput = (props: InputHTMLAttributes<HTMLInputElement> & WithFormerType<string>): JSX.Element => (
  <input {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
)

export default withFormer<InputHTMLAttributes<HTMLInputElement> & WithFormerType<string>, string>(FormerInput)

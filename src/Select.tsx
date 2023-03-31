import withFormer, { WithFormerType } from './withFormer'
import React, { SelectHTMLAttributes } from 'react'

const FormerSelect = (props: SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>): JSX.Element => (
  <select name="former-select" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
)

export default withFormer<SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>, string>(FormerSelect)

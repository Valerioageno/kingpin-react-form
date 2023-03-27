// import type { InputEffect, Result } from './types'
// import { SelectHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
// import React from 'react'
// const Select = forwardRef<InputEffect<string>, SelectHTMLAttributes<HTMLSelectElement>>((props, ref): JSX.Element => {
//   const [state, setState] = useState<string>('')
//   useImperativeHandle(
//     ref,
//     () => ({
//       sendData(): Result<string> {
//         return { name: props?.name || 'former-select', value: state }
//       },
//     }),
//     [props.name, state],
//   )
//   return <select name="former-select" {...props} value={state} onChange={(e): void => setState(e.target.value)} />
// })
// Select.displayName = 'FormerSelect'
// export default Select
import withFormer, { WithFormerType } from './withFormer'
import React, { SelectHTMLAttributes } from 'react'

const FormerSelect = (props: SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>): JSX.Element => (
  <select name="former-select" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
)

export default withFormer<SelectHTMLAttributes<HTMLSelectElement> & WithFormerType<string>, string>(FormerSelect)

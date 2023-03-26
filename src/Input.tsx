// import type { InputEffect, Result } from './types'
// import { InputHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
// import React from 'react'
// type InputProps = InputHTMLAttributes<HTMLInputElement>
// const Input = forwardRef<InputEffect, InputProps>((props, ref): JSX.Element => {
//   // Boolean with radio an checkbox
//   const [state, setState] = useState<string | boolean>('')
//   useImperativeHandle(
//     ref,
//     () => ({
//       sendData(): Result {
//         return { name: props?.name || 'former-input', value: state }
//       },
//     }),
//     [props.name, state],
//   )
//   return (
//     <input
//       name="former-input"
//       {...props}
//       value={state as string}
//       onChange={(e): void => {
//         props.onChange?.(e)
//         setState(e.target.value)
//       }}
//     />
//   )
// })
// Input.displayName = 'FormerInput'
// export default Input
import withFormer, { WithFormerType } from './withFormer'
import React, { InputHTMLAttributes } from 'react'

const FormerInput = (props: InputHTMLAttributes<HTMLInputElement> & WithFormerType<string>): JSX.Element => (
  <input {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
)

export default withFormer<InputHTMLAttributes<HTMLInputElement> & WithFormerType<string>, string>(FormerInput)

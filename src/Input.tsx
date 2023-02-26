import type { InputEffect } from './types'
import { InputHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
import React from 'react'

const Input = forwardRef<InputEffect, InputHTMLAttributes<HTMLInputElement>>((props, ref): JSX.Element => {
  const [state, setState] = useState<string>('')

  useImperativeHandle(ref, () => ({
    sendData(): { name: string; value: string } {
      return { name: props?.name || 'former-input', value: state }
    },
  }))

  return <input name="former-input" {...props} value={state} onChange={(e): void => setState(e.target.value)} />
})

Input.displayName = 'FormerInput'
export default Input

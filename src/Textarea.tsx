import { TextareaHTMLAttributes, forwardRef, useState, useImperativeHandle } from 'react'
import { InputEffect, Result } from './types'
import React from 'react'

const Textarea = forwardRef<InputEffect, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref): JSX.Element => {
    const [state, setState] = useState<string | number | readonly string[]>(props.defaultValue || '')

    useImperativeHandle(ref, () => ({
      sendData(): Result {
        return { name: props?.name || 'former-textarea', value: state }
      },
    }))

    return (
      <textarea name="former-textarea" {...props} onChange={(e): void => setState(e.target.value)} />
    )
  },
)

Textarea.displayName = 'FormerTextarea'
export default Textarea

import type { InputEffect, Result } from './types'
import { TextareaHTMLAttributes, forwardRef, useImperativeHandle, useState } from 'react'
import React from 'react'

const Textarea = forwardRef<
  InputEffect<string | number | readonly string[]>,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref): JSX.Element => {
  const [state, setState] = useState<string | number | readonly string[]>(props.defaultValue || '')

  useImperativeHandle(
    ref,
    () => ({
      sendData(): Result<string | number | readonly string[]> {
        return { name: props?.name || 'former-textarea', value: state }
      },
    }),
    [props.name, state],
  )

  return <textarea name="former-textarea" {...props} onChange={(e): void => setState(e.target.value)} />
})

Textarea.displayName = 'FormerTextarea'
export default Textarea

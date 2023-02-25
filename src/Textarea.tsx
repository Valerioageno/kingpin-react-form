import { TextareaHTMLAttributes, forwardRef, useState, useImperativeHandle } from 'react'
import { InputEffect, Result } from './types'
import React from 'react'

const Textarea = forwardRef<InputEffect, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref): JSX.Element => {
    const [state, setState] = useState<string>('')

    useImperativeHandle(ref, () => ({
      sendData(): Result {
        return { name: props?.name || 'unset', value: state }
      },
    }))

    return (
      <textarea {...props} value={state} onChange={(e): void => setState(e.target.value)}>
        {props.children}
      </textarea>
    )
  },
)

Textarea.displayName = 'FormerTextarea'
export default Textarea

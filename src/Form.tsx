import { iterateOverChildren } from './helpers'
import type { InputEffect, Value } from './types'
import { FormEvent, HTMLAttributes, useRef } from 'react'
import React from 'react'

type FormProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit?: (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => void
}

const FormerForm = (props: FormProps): JSX.Element => {
  const childrenRef = useRef<InputEffect[]>([])

  const submitFunction = (e: FormEvent<HTMLFormElement>): void => {
    const data: Record<string, Value> = {}
    childrenRef?.current?.forEach((el): void => {
      const d = el?.sendData?.()

      if (d?.name) {
        data[d.name] = d?.value
      }
    })
    props?.onSubmit?.(e, data)
  }

  return (
    <form {...props} onSubmit={submitFunction}>
      {iterateOverChildren(props.children, {
        // TODO: Avoid ref on non-library elements
        ref: (ref: InputEffect) => (childrenRef.current[childrenRef.current.length] = ref),
      })}
    </form>
  )
}

export default FormerForm

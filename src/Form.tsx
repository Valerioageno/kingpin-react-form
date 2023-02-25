import { Children, cloneElement, useRef, HTMLAttributes, FormEvent, ReactElement, JSXElementConstructor } from 'react'
import { InputEffect } from './types'
import React from 'react'

const FormerForm = (props: HTMLAttributes<HTMLFormElement>): JSX.Element => {
  const elements = Children.toArray(props.children)
  const childrenRef = useRef<InputEffect[]>([])

  const submitFunction = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const data: Record<string, unknown> = {}
    childrenRef?.current?.forEach((el): void => {
      const d = el?.sendData?.()
      if (d?.name) {
        data[d.name] = d?.value
      }
    })
    props?.onSubmit?.(e)
  }

  return (
    <form {...props} onSubmit={submitFunction}>
      {Children.map(elements, (child, index) => {
        // Check if input or textarea or...
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
          ref: (ref: InputEffect) => (childrenRef.current[index] = ref),
        })
      })}
    </form>
  )
}

export default FormerForm

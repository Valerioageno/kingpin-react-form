import { iterateOverChildren } from './helpers'
import type { InputEffect, Value } from './types'
import { FormEvent, HTMLAttributes, PropsWithRef, useRef } from 'react'
import React from 'react'

type FormProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit?: (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => void
}

/**
 * @description This is the main element Former has. It's just a simple HTML form element which handle the logic of each Former element set as child element.
 * It takes as props all the HTML form attributes. The onSubmit event is extended with a second arguments which includes all the values set in the within Former elements.
 * @param props FormHTMLAttributes
 * @returns JSX.Element
 */
const FormerForm = (props: FormProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = useRef<InputEffect<any>[]>([])

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

  const customProps = (componentName: string): PropsWithRef<unknown> => {
    if (componentName.startsWith('Former') || componentName.startsWith('withFormer')) {
      return {
        ref: (ref: InputEffect<unknown>) => (childrenRef.current[childrenRef.current.length] = ref),
      }
    }
    return {}
  }

  return (
    <form {...props} onSubmit={submitFunction}>
      {iterateOverChildren(props.children, customProps)}
    </form>
  )
}

export default FormerForm

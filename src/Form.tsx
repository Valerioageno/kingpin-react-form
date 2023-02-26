import {
  Children,
  cloneElement,
  useRef,
  HTMLAttributes,
  FormEvent,
  ReactElement,
  JSXElementConstructor,
  isValidElement,
  ReactNode,
} from 'react'
import type { InputEffect, Value } from './types'
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

  const iterateOverChildren = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!isValidElement(child)) return child

      return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
        ...child.props,
        // you can alse read child original className by child.props.className
        ref: (ref: InputEffect) => (childrenRef.current[childrenRef.current.length] = ref),
        children: iterateOverChildren(child.props.children),
      })
    })
  }

  return (
    <form {...props} onSubmit={submitFunction}>
      {iterateOverChildren(props.children)}
    </form>
  )
}

export default FormerForm

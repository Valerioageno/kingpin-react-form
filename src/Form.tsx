import { iterateOverChildren } from './helpers'
import type { InputEffect, Value } from './types'
import { FormEvent, HTMLAttributes, MouseEvent, PropsWithRef, ReactElement, useRef } from 'react'
import React from 'react'

type FormProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  /**
   * @description The "classic" onSubmit event but with a second argument containing the whole form payload.
   */
  onSubmit?: (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => void
  /**
   * @description Callback that runs when all the field have been reset.
   */
  onReset?: () => void
}

/**
 * @description This is the main element Kingpin has. It's just a simple HTML form element which handle the logic of each Kingpin element set as child element.
 * It takes as props all the HTML form attributes. The onSubmit event is extended with a second arguments which includes all the values set in the within Kingpin elements.
 * @param props FormHTMLAttributes
 * @returns JSX.Element
 */
const KingpinForm = (props: FormProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = useRef<InputEffect<any>[]>([])

  const resetForm = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    childrenRef?.current?.forEach((el): void => el?.reset?.())
    props.onReset?.()
  }

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

  const customProps = (child: ReactElement): PropsWithRef<unknown> => {
    if (child.props.name === 'reset') {
      return {
        onClick: resetForm,
      }
    }
    if (child.props.name) {
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

export default KingpinForm

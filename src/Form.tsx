import { iterateOverChildren } from './helpers'
import type { FormResult, InputEffect, Value } from './types'
import { FormEvent, HTMLAttributes, MouseEvent, PropsWithRef, ReactElement, useRef } from 'react'
import React from 'react'

type FormProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  /**
   * @description The "classic" onSubmit event but with a second argument containing the whole form payload.
   */
  onSubmit?: (e: FormEvent<HTMLFormElement>, form: FormResult) => void
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
  /**
   * @description Contains the reference to all the kingpin valid fields.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = useRef<Map<string, InputEffect<any>>>(new Map([]))

  /**
   * @description Contains the name of all current form errors.
   */
  const errorsRef = useRef<Set<string>>(new Set([]))

  /**
   * @description Iterates over all kingpin elements running the reset function.
   * @param e MouseEvent<HTMLButtonElement>
   */
  const resetForm = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    childrenRef?.current?.forEach((el): void => el?.reset?.())
    props.onReset?.()
  }

  /**
   * @description Handle the submit event.
   * @param e FormEvent<HTMLFormElement>
   */
  const submitFunction = (e: FormEvent<HTMLFormElement>): void => {
    const payload: Record<string, Value> = {}
    let isFormValid = true
    errorsRef.current.clear()

    /**
     * Iterate over each kingpin element, fetch the value and check for possible validation error.
     */
    childrenRef?.current?.forEach((el): void => {
      const isElementValid = el?.checkValidation ? el.checkValidation() : true
      const d = el?.sendData?.()

      if (d?.name) {
        if (!isElementValid) {
          errorsRef.current.add(`${d.name}:error`)
          isFormValid = false
        }
        payload[d.name] = d?.value
      }
    })

    /**
     * Throw global error
     */
    if (!isFormValid) errorsRef.current.add('error')

    /**
     * Iterate over all elements and display or clear errors.
     */
    childrenRef.current.forEach((el) => el.shouldShowError?.(errorsRef.current))

    // Return data to user function.
    props?.onSubmit?.(e, { isFormValid, payload })
  }

  /**
   * @description Generate props based on the element name
   * @param child ReactElement
   * @returns The reference to pass to valid kingpin elements
   */
  const customProps = (child: ReactElement): PropsWithRef<unknown> => {
    if (child.props.name === 'reset') {
      return {
        onClick: resetForm,
      }
    }

    if (child.props.name) {
      return {
        ref: (element: InputEffect<unknown>): void => {
          childrenRef.current.set(child.props.name, element)
        },
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

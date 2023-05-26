import useValidation from '../hooks/useValidation'
import type { InputEffect, KingpinComponent, Result, WithKingpinProps } from '../types'
import React, { ComponentType, forwardRef, useImperativeHandle, useMemo, useState } from 'react'

/**
 * @description Trasnform the passed WrappedComponent into an input usable by the Kingpin form component.
 * The new Component will have the name prop mandatory.
 *
 * In order to make it usable with Kingpin it passes as props the updateState method which has
 * to be used as state setter.
 * Check the documentation for more details.
 * @param WrappedComponent ComponentType T
 * @param initialState Default state. Used when "initialState" is not provided - Optional
 * @returns JSX.Element
 */
export default function withKingpin<T, State>(
  WrappedComponent: ComponentType<T>,
  initialState?: State,
): KingpinComponent<T, State> {
  const displayName = WrappedComponent?.displayName || WrappedComponent?.name || 'Component'

  const ComponentWithKingpin = forwardRef<InputEffect<State>, Omit<T, 'updateState'> & WithKingpinProps<State>>(
    (props, ref) => {
      const checkIsValid = useValidation(props.validation)

      const generateInitialVal = useMemo(
        (): State | undefined => (typeof props?.initialValue === 'undefined' ? initialState : props?.initialValue),
        [props.initialValue],
      )

      const [state, setState] = useState<State | undefined>(generateInitialVal)
      const [isValid, setIsValid] = useState<boolean | string[]>(checkIsValid(state))
      const [className, setClassName] = useState<string>(props.className || '')

      /**
       * Execute top level triggered events.
       * The triggers are in the Form element.
       */
      useImperativeHandle(ref, () => ({
        sendData(): Result<State | undefined> {
          /**
           * Handle the classNames logic.
           * Attach the "errorClassName" on invalid fields.
           */
          setClassName(
            [props.className, isValid || props.errorClassName].filter((x) => typeof x === 'string').join(' '),
          )
          /**
           * Send data to Form component
           */
          return { name: props?.name || 'Kingpin-element', value: state }
        },
        reset(): void {
          setClassName(props.className || '')
          setState(generateInitialVal)
        },
        checkValidation(): boolean | string[] {
          return isValid
        },
      }))

      return (
        <WrappedComponent
          {...(props as unknown as T)}
          value={state}
          className={className}
          updateState={(val: State): void => {
            setIsValid(checkIsValid(val))
            setState(val)
          }}
          isValid={isValid}
        />
      )
    },
  )

  ComponentWithKingpin.displayName = `withKingpin(${displayName})`

  return ComponentWithKingpin
}

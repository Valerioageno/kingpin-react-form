import { InputEffect, Result } from './types'
import React, { ComponentType, ForwardRefExoticComponent, forwardRef, useImperativeHandle, useState } from 'react'

export type WithFormerType<T> = {
  updateState?: (val: T) => void
}

type WithFormerProps<T> = {
  name: string
  initialValue: T
}

/**
 * @name withFormer HOC.
 * @description Trasnform the passed WrappedComponent into an input usable by the Former form component.
 * The new Component will have two new mandatory props:
 * - name: string
 * - initialValue: T
 *
 * In order to make it usable with Former it passes as props the updateState method which has
 * to be used as state setter.
 * Check the documentation for more details.
 * @param WrappedComponent ComponentType T
 * @returns JSX.Element
 */
export default function withFormer<T, State>(
  WrappedComponent: ComponentType<T>,
): ForwardRefExoticComponent<
  React.PropsWithoutRef<Omit<T, 'updateState'> & WithFormerProps<State>> & React.RefAttributes<InputEffect<State>>
> {
  const displayName = WrappedComponent?.displayName || WrappedComponent?.name || 'Component'

  const ComponentWithFormer = forwardRef<InputEffect<State>, Omit<T, 'updateState'> & WithFormerProps<State>>(
    (props, ref) => {
      const [state, setState] = useState<State>(props.initialValue)

      useImperativeHandle(ref, () => ({
        sendData(): Result<State> {
          return { name: props?.name || 'former-element', value: state }
        },
      }))

      return (
        <WrappedComponent
          {...(props as unknown as T)}
          value={state}
          updateState={(val: State): void => setState(val)}
        />
      )
    },
  )

  ComponentWithFormer.displayName = `withFormer(${displayName})`

  return ComponentWithFormer
}

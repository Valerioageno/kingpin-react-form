import { InputEffect, Result } from './types'
import React, { ComponentType, ForwardRefExoticComponent, forwardRef, useImperativeHandle, useState } from 'react'

export type WithKingpinType<T> = {
  updateState?: (val: T) => void
}

type WithKingpinProps<T> = {
  name: string
  initialValue: T
}

/**
 * @description Trasnform the passed WrappedComponent into an input usable by the Kingpin form component.
 * The new Component will have two new mandatory props:
 * - name: string
 * - initialValue: T
 *
 * In order to make it usable with Kingpin it passes as props the updateState method which has
 * to be used as state setter.
 * Check the documentation for more details.
 * @param WrappedComponent ComponentType T
 * @returns JSX.Element
 */
export default function withKingpin<T, State>(
  WrappedComponent: ComponentType<T>,
): ForwardRefExoticComponent<
  React.PropsWithoutRef<Omit<T, 'updateState' | 'content' | 'rel' | 'rev'> & WithKingpinProps<State>> &
    React.RefAttributes<InputEffect<State>>
> {
  const displayName = WrappedComponent?.displayName || WrappedComponent?.name || 'Component'

  const ComponentWithKingpin = forwardRef<InputEffect<State>, Omit<T, 'updateState'> & WithKingpinProps<State>>(
    (props, ref) => {
      const [state, setState] = useState<State>(props.initialValue)

      useImperativeHandle(ref, () => ({
        sendData(): Result<State> {
          return { name: props?.name || 'Kingpin-element', value: state }
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

  ComponentWithKingpin.displayName = `withKingpin(${displayName})`

  return ComponentWithKingpin
}

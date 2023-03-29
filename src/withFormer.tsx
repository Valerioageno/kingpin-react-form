import { InputEffect, Result } from './types'
import React, { ComponentType, ForwardRefExoticComponent, forwardRef, useImperativeHandle, useState } from 'react'

export type WithFormerType<T> = {
  updateState?: (val: T) => void
}

type WithFormerProps<T> = {
  name: string
  initialValue: T
}

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

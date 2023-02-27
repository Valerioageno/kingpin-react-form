import {
  Children,
  DependencyList,
  EffectCallback,
  JSXElementConstructor,
  PropsWithRef,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
} from 'react'

export const iterateOverChildren = <T,>(children: ReactNode, customProps: PropsWithRef<T>): ReactNode => {
  return Children.map(children, (child) => {
    // equal to (if (child == null || typeof child == 'string'))
    if (!isValidElement(child)) return child

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
      ...child.props,
      ...customProps,
      // TODO: Avoid propagation on RadioGroup children
      children: iterateOverChildren(child.props.children, customProps),
    })
  })
}

export const useIsomorphicEffect = (callback: EffectCallback, deps: DependencyList): void => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLayoutEffect(callback, deps)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  return useEffect(callback, [deps])
}

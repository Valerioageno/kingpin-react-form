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

export const iterateOverChildren = <T,>(
  children: ReactNode,
  customProps: (componentName: ReactElement) => PropsWithRef<T>,
): ReactNode => {
  return Children.map(children, (child) => {
    // equal to (if (child == null || typeof child == 'string'))
    if (!isValidElement(child)) return child

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
      ...child.props,
      ...customProps(child),
      children: child.props.name ? child.props.children : iterateOverChildren(child.props.children, customProps),
    })
  })
}

/**
 * @description remove from the passed object all the keys set in the second argument.
 * @param obj the object which needs to remove some fields.
 * @param keys the fields to remove.
 * @returns A new object without the listed keys.
 */
export function removeKeysFromObject<T = Record<string, unknown>>(obj: T, keys: string[]): T {
  // TODO: avoid clone the object
  const newObj: T = { ...obj }

  keys.forEach((k) => {
    // TODO: correct type casting
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete newObj[k]
  })

  return newObj
}

export const useIsomorphicEffect = (callback: EffectCallback, deps: DependencyList): void => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLayoutEffect(callback, deps)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  return useEffect(callback, [deps])
}

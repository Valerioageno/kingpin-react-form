import type { InputEffect } from './types'
import React, { ReactNode, forwardRef, useImperativeHandle, useState } from 'react'

type ErrorProps = {
  children: ReactNode
  name: string
}

/**
 * @description This is a wrapper over an error message. The name has to follow the pattern: "{inputName}:error"
 * @param props children, name
 * @returns JSX.Element
 */
const Error = forwardRef<InputEffect<boolean>, ErrorProps>(({ children, name }, ref): JSX.Element => {
  const [showError, setShowError] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    shouldShowError(errors: Set<string>): void {
      setShowError(errors.has(name))
    },
    reset(): void {
      setShowError(false)
    },
  }))

  if (showError) return <>{children}</>
  return <></>
})

Error.displayName = 'KingpinError'

export default Error

import { removeKeysFromObject } from './helpers'
import type { WithKingpinProps, WithKingpinType } from './types'
import withKingpin from './withKingpin'
import React, { FunctionComponent, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & WithKingpinType<string>

/**
 * @description This is just a simple HTML textarea  element which works within the Kingpin Form component out of the box. It takes whatever textarea HTML attribute as prop.
 * @param props TextareaHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinTextarea = withKingpin<Props, string>(
  (props: Props): JSX.Element => (
    <textarea
      name="kingpin-textarea"
      {...removeKeysFromObject(props, ['initialValue', 'updateState', 'isValid', 'validation'])}
      onChange={(e): void => {
        props.updateState?.(e.target.value)
        props.onChange?.(e)
      }}
    />
  ),
)

KingpinTextarea.displayName = 'KingpinTextarea'

export default KingpinTextarea as unknown as FunctionComponent<WithKingpinProps<string> & Props>

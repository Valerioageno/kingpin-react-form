import { removeKeysFromObject } from './helpers'
import withKingpin, { WithKingpinType } from './withKingpin'
import React, { TextareaHTMLAttributes } from 'react'

/**
 * @description This is just a simple HTML textarea  element which works within the Kingpin Form component out of the box. It takes whatever textarea HTML attribute as prop.
 * @param props TextareaHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinTextarea = withKingpin<TextareaHTMLAttributes<HTMLTextAreaElement> & WithKingpinType<string>, string>(
  (props: TextareaHTMLAttributes<HTMLTextAreaElement> & WithKingpinType<string>): JSX.Element => (
    <textarea
      name="kingpin-textarea"
      {...removeKeysFromObject(props, ['initialValue', 'updateState'])}
      onChange={(e): void => props?.updateState?.(e.target.value)}
    />
  ),
)
KingpinTextarea.displayName = 'KingpinTextarea'

export default KingpinTextarea

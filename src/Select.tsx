import { removeKeysFromObject } from './helpers'
import withKingpin, { WithKingpinType } from './withKingpin'
import React, { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & WithKingpinType<string>

/**
 * @description This is just a simple HTML select element which works within the Kingpin form component out of the box. It takes whatever select HTML attribute as prop.
 * @param props SelectHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinSelect = withKingpin<Props, string>(
  (props: Props): JSX.Element => (
    <select
      name="kingpin-select"
      {...removeKeysFromObject(props, ['initialValue', 'updateState', 'isValid', 'validation'])}
      onChange={(e): void => props?.updateState?.(e.target.value)}
    />
  ),
)
KingpinSelect.displayName = 'KingpinSelect'
export default KingpinSelect

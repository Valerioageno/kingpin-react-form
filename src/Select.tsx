import withKingpin, { WithKingpinType } from './withKingpin'
import React, { SelectHTMLAttributes } from 'react'

/**
 * @description This is just a simple HTML select element which works within the Kingpin form component out of the box. It takes whatever select HTML attribute as prop.
 * @param props SelectHTMLAttributes & initialValue
 * @returns JSX.Element
 */
const KingpinSelect = withKingpin<SelectHTMLAttributes<HTMLSelectElement> & WithKingpinType<string>, string>(
  (props: SelectHTMLAttributes<HTMLSelectElement> & WithKingpinType<string>): JSX.Element => (
    <select name="kingpin-select" {...props} onChange={(e): void => props?.updateState?.(e.target.value)} />
  ),
)

export default KingpinSelect

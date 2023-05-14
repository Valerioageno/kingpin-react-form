import { Select } from '../src'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Select', () => {
  it('Render select', () => {
    render(
      <Select data-testid="select" initialValue="" name="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>,
    )
    expect(screen.getByTestId('select')).toBeInTheDocument()
    expect(screen.getByTestId('select')).toBeInstanceOf(HTMLSelectElement)
    expect(screen.getByTestId('select')).toBeVisible()
  })
})

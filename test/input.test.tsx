import { Input } from '../src'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Input', () => {
  it('Render input', () => {
    render(<Input data-testid="input" initialValue="" name="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByTestId('input')).toBeVisible()
  })
})

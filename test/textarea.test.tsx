import { Textarea } from '../src'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Textarea', () => {
  it('Render textarea', () => {
    render(<Textarea data-testid="textarea" initialValue="" name="textarea" />)
    expect(screen.getByTestId('textarea')).toBeInTheDocument()
    expect(screen.getByTestId('textarea')).toBeInstanceOf(HTMLTextAreaElement)
    expect(screen.getByTestId('textarea')).toBeVisible()
  })
})

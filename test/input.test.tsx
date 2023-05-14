import { Form, Input, Value } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Input', () => {
  it('Render input', () => {
    render(<Input data-testid="input" initialValue="" name="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByTestId('input')).toBeVisible()
    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ciao' } })

    expect(screen.getByDisplayValue('ciao')).toBeInTheDocument()
  })

  it('Reset input', () => {
    let payload: Record<string, Value> = {}
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: Record<string, Value>): void => {
      e.preventDefault()
      payload = data
    }

    render(
      <Form onSubmit={onSubmitFn}>
        <Input name="input" data-testid="input" initialValue="" />
        <button type="button" data-testid="reset" name="reset">
          Reset
        </button>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ input: '' })

    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ciao' } })
    expect(screen.queryByDisplayValue('ciao')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ input: 'ciao' })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ input: '' })
  })
})

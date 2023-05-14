import { Form, Select, Value } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
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
    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('select'), { target: { value: '2' } })
    expect(screen.queryByDisplayValue('2')).toBeInTheDocument()
  })

  it('Reset select', () => {
    let payload: Record<string, Value> = {}
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: Record<string, Value>): void => {
      e.preventDefault()
      payload = data
    }
    render(
      <Form onSubmit={onSubmitFn}>
        <Select data-testid="select" initialValue="" name="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
        <button type="button" name="reset" data-testid="reset">
          Reset
        </button>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ select: '' })

    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('select'), { target: { value: '2' } })
    expect(screen.queryByDisplayValue('2')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ select: '2' })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ select: '' })
  })
})

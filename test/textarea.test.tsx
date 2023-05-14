import { Form, Textarea, Value } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Textarea', () => {
  it('Render textarea', () => {
    render(<Textarea data-testid="textarea" initialValue="" name="textarea" />)
    expect(screen.getByTestId('textarea')).toBeInTheDocument()
    expect(screen.getByTestId('textarea')).toBeInstanceOf(HTMLTextAreaElement)
    expect(screen.getByTestId('textarea')).toBeVisible()

    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciao' } })

    expect(screen.getByDisplayValue('ciao')).toBeInTheDocument()
  })

  it('Reset textarea', () => {
    let payload: Record<string, Value> = {}
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: Record<string, Value>): void => {
      e.preventDefault()
      payload = data
    }

    render(
      <Form onSubmit={onSubmitFn}>
        <Textarea data-testid="textarea" initialValue="" name="textarea" />
        <button type="button" data-testid="reset" name="reset">
          Reset
        </button>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ textarea: '' })

    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciao' } })
    expect(screen.queryByDisplayValue('ciao')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ textarea: 'ciao' })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload).toStrictEqual({ textarea: '' })
  })
})

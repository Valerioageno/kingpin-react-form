/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Error, Form, FormResult, Input } from '../src'
import { shouldNotBeEmpty } from './utils/validation'
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
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
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
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { input: '' } })

    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ciao' } })
    expect(screen.queryByDisplayValue('ciao')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { input: 'ciao' } })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { input: '' } })
  })

  it('Input validation and error handling', () => {
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }
    render(
      <Form onSubmit={onSubmitFn}>
        <Input data-testid="input" initialValue="" name="input" validation={shouldNotBeEmpty} />
        <Error name="input:error">
          <p data-testid="error-message">Error message</p>
        </Error>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { input: '' } })

    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ciao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { input: 'ciao' } })

    fireEvent.change(screen.getByTestId('input'), { target: { value: '' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { input: '' } })
  })
})

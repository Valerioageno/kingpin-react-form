/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Error, Form, FormResult, Input } from '../src'
import { shouldBeAtLeast10Chars, shouldNotBeEmpty } from './utils/validation'
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

  it('Input errorClassName', () => {
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
    }
    render(
      <Form onSubmit={onSubmitFn}>
        <Input
          data-testid="email"
          name="emal"
          type="email"
          validation={shouldNotBeEmpty}
          errorClassName="email-error"
        />
        <Input
          data-testid="password"
          name="password"
          type="password"
          validation={shouldNotBeEmpty}
          className="password-class"
          errorClassName="password-error"
        />
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    expect(screen.getByTestId('email')?.className).toBe('')
    expect(screen.getByTestId('password')?.className).toBe('password-class')
    fireEvent.click(screen.getByTestId('submit'))

    expect(screen.getByTestId('email')?.className).toBe('email-error')
    expect(screen.getByTestId('password')?.className).toBe('password-class password-error')
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'ciao' } })
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'ciao' } })

    // Before submit they should still be invalid
    expect(screen.getByTestId('email')?.className).toBe('email-error')
    expect(screen.getByTestId('password')?.className).toBe('password-class password-error')
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.getByTestId('email')?.className).toBe('')
    expect(screen.getByTestId('password')?.className).toBe('password-class')
  })

  it('Multiple input error', () => {
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
    }

    render(
      <Form onSubmit={onSubmitFn}>
        <Input
          type="password"
          name="password"
          data-testid="password"
          validation={{
            tenChars: shouldBeAtLeast10Chars,
            empty: shouldNotBeEmpty,
          }}
        />
        <Error name="password:empty">
          <p data-testid="empty-password">Password should not be empty</p>
        </Error>
        <Error name="password:tenChars">
          <p data-testid="10chars-error">Password should be at least 10 characters</p>
        </Error>
        <button data-testid="submit">Submit</button>
      </Form>,
    )

    expect(screen.queryByTestId('empty-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('10chars-error')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('empty-password')).toBeInTheDocument()
    expect(screen.queryByTestId('10chars-error')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'ciao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('empty-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('10chars-error')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'ciaociaociao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('empty-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('10chars-error')).not.toBeInTheDocument()
  })
})

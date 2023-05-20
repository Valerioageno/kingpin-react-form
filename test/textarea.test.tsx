/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Error, Form, FormResult, Textarea } from '../src'
import { shouldBeAtLeast10Chars, shouldNotBeEmpty } from './utils/validation'
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
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
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
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { textarea: '' } })

    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciao' } })
    expect(screen.queryByDisplayValue('ciao')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { textarea: 'ciao' } })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('ciao')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { textarea: '' } })
  })

  it('Textarea array validation and error handling', () => {
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }
    render(
      <Form onSubmit={onSubmitFn}>
        <Textarea
          data-testid="textarea"
          initialValue=""
          name="textarea"
          validation={[shouldBeAtLeast10Chars, shouldNotBeEmpty]}
        />
        <Error name="textarea:error">
          <p data-testid="error-message">Error message</p>
        </Error>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { textarea: '' } })

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { textarea: 'ciao' } })

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciaociaociao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { textarea: 'ciaociaociao' } })

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'ciao' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { textarea: 'ciao' } })
  })
})

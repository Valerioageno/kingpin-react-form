/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Error, Form, FormResult, Radio, RadioGroup } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Radio', () => {
  it('Render radios', () => {
    render(
      <RadioGroup name="radios" initialValue="radio">
        <Radio name="radio" data-testid="radio" />
      </RadioGroup>,
    )
    expect(screen.getByTestId('radio')).toBeInTheDocument()
    expect(screen.getByTestId('radio')).toBeInstanceOf(HTMLInputElement)
    expect(screen.getByTestId('radio')).toBeVisible()
    expect(screen.getByTestId('radio')).toBeChecked()
  })

  it('Reset radio', () => {
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }

    render(
      <Form onSubmit={onSubmitFn}>
        <RadioGroup name="radios" initialValue="radio1">
          <Radio name="radio1" data-testid="radio1" />
          <Radio name="radio2" data-testid="radio2" />
        </RadioGroup>
        <button type="button" data-testid="reset" name="reset">
          Reset
        </button>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { radios: 'radio1' } })
    expect(screen.getByTestId('radio1')).toBeChecked()
    expect(screen.getByTestId('radio2')).not.toBeChecked()

    fireEvent.click(screen.getByTestId('radio2'))
    expect(screen.getByTestId('radio1')).not.toBeChecked()
    expect(screen.getByTestId('radio2')).toBeChecked()
    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { radios: 'radio2' } })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.getByTestId('radio1')).toBeChecked()
    expect(screen.getByTestId('radio2')).not.toBeChecked()
    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { radios: 'radio1' } })
  })

  it('Radio validation and error handling', () => {
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }
    const shouldBeFirst = (s: string): boolean => s === 'radio1'

    render(
      <Form onSubmit={onSubmitFn}>
        <RadioGroup name="radios" initialValue="radio2" validation={shouldBeFirst}>
          <Radio name="radio1" data-testid="radio1" />
          <Radio name="radio2" data-testid="radio2" />
        </RadioGroup>
        <Error name="radios:error">
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
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { radios: 'radio2' } })

    fireEvent.click(screen.getByTestId('radio1'))
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { radios: 'radio1' } })

    fireEvent.click(screen.getByTestId('radio2'))
    fireEvent.click(screen.getByTestId('submit'))
    expect(screen.queryByTestId('error-message')).toBeInTheDocument()
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { radios: 'radio2' } })
  })
})

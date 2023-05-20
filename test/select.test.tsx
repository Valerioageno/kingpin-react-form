/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form, FormResult, Select } from '../src'
import { shouldBe3 } from './utils/validation'
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
    let payload: FormResult

    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
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
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { select: '' } })

    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('select'), { target: { value: '2' } })
    expect(screen.queryByDisplayValue('2')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { select: '2' } })

    fireEvent.click(screen.getByTestId('reset'))
    expect(screen.queryByDisplayValue('2')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { select: '' } })
  })

  it('Select array validation', () => {
    let payload: FormResult
    const onSubmitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }
    render(
      <Form onSubmit={onSubmitFn}>
        <Select data-testid="select" initialValue="" name="select" validation={[shouldBe3]}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { select: '' } })

    fireEvent.change(screen.getByTestId('select'), { target: { value: '2' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { select: '2' } })

    fireEvent.change(screen.getByTestId('select'), { target: { value: '3' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: true, payload: { select: '3' } })

    fireEvent.change(screen.getByTestId('select'), { target: { value: '2' } })
    fireEvent.click(screen.getByTestId('submit'))
    expect(payload!).toStrictEqual({ isFormValid: false, payload: { select: '2' } })
  })
})

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Form, FormResult, withKingpin } from '../src'
import { fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import Select, { SingleValue } from 'react-select'

type Option = { value: string; label: string }

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

type CustomSelectProps = {
  updateState: (val: SingleValue<Option>) => void
  initialValue: SingleValue<Option>
}

const CustomSelect = withKingpin<CustomSelectProps, SingleValue<Option>>(
  ({ updateState, initialValue }): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(initialValue)

    return (
      <div className="App">
        <Select
          defaultValue={selectedOption}
          placeholder="Select"
          onChange={(val): void => {
            setSelectedOption(val)
            updateState(val)
          }}
          options={options}
        />
      </div>
    )
  },
)

describe('withKingpin HOC', () => {
  it('Correctly submit the payload', async () => {
    let payload: FormResult
    const submitFn = (e: React.FormEvent<HTMLFormElement>, data: FormResult): void => {
      e.preventDefault()
      payload = data
    }
    const { container } = render(
      <Form onSubmit={submitFn}>
        <CustomSelect name="custom-select" initialValue={null} data-testid="custom-select" />)
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </Form>,
    )
    fireEvent.click(screen.getByTestId('submit'))

    expect(payload!).toStrictEqual({
      isFormValid: true,
      payload: {
        'custom-select': null,
      },
    })

    fireEvent.focus(container.querySelector('input')!)
    fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown', code: 40 })
    fireEvent.click(screen.getByText('Strawberry'))
    fireEvent.click(screen.getByTestId('submit'))

    expect(payload!).toStrictEqual({
      isFormValid: true,
      payload: {
        'custom-select': { value: 'strawberry', label: 'Strawberry' },
      },
    })
  })
})

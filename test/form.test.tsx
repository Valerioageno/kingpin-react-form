import { Checkbox, Form, Input, Radio, RadioGroup, Select, Textarea, Value } from '../src'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'

describe('Form', () => {
  it('Render form', () => {
    render(<Form data-testid="form" />)
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInstanceOf(HTMLFormElement)
    expect(screen.getByTestId('form')).toBeVisible()
  })

  it('Correct submit payload', async () => {
    let payload: Record<string, Value> = {}
    const submitFn = (e: React.FormEvent<HTMLFormElement>, data: Record<string, Value>): void => {
      e.preventDefault()
      payload = data
    }

    render(
      <Form onSubmit={submitFn}>
        <Input name="email" type="email" data-testid="email" initialValue="" />
        <Input name="password" type="password" data-testid="password" initialValue="" />
        <Textarea name="textarea1" data-testid="textarea1" initialValue="" />
        <Textarea name="textarea2" data-testid="textarea2" initialValue="" />
        <Select name="select1" data-testid="select1">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <Select name="select2" data-testid="select2">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <RadioGroup name="radio-group-1">
          <Radio name="radio1" data-testid="radio1" />
          <Radio checked name="radio2" />
        </RadioGroup>
        <RadioGroup name="radio-group-2">
          <Radio checked name="radio3" />
          <Radio name="radio4" />
        </RadioGroup>
        <Checkbox name="checkbox1" checked data-testid="checkbox1" />
        <Checkbox name="checkbox2" data-testid="checkbox2" />
        <button type="submit" data-testid="submit">
          submit
        </button>
      </Form>,
    )

    fireEvent.click(screen.getByTestId('submit'))

    expect(payload).toStrictEqual({
      email: '',
      password: '',
      textarea1: '',
      textarea2: '',
      select1: '',
      select2: '',
      'radio-group-1': 'radio2',
      'radio-group-2': 'radio3',
      checkbox1: true,
      checkbox2: false,
    })

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'hey@former.com' } })
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'psw' } })
    fireEvent.change(screen.getByTestId('textarea1'), { target: { value: 'test textarea 1' } })
    fireEvent.change(screen.getByTestId('textarea2'), { target: { value: 'test textarea 2' } })
    fireEvent.change(screen.getByTestId('select1'), { target: { value: '1' } })
    fireEvent.change(screen.getByTestId('select2'), { target: { value: '3' } })

    fireEvent.change(screen.getByTestId('radio1'), { target: { value: 'a' } })
    fireEvent.change(screen.getByTestId('checkbox1'), { target: { value: 'a' } })
    fireEvent.change(screen.getByTestId('checkbox2'), { target: { value: 'a' } })

    fireEvent.click(screen.getByTestId('submit'))

    expect(payload).toStrictEqual({
      email: 'hey@former.com',
      password: 'psw',
      textarea1: 'test textarea 1',
      textarea2: 'test textarea 2',
      select1: '1',
      select2: '3',
      'radio-group-1': 'radio1',
      'radio-group-2': 'radio3',
      checkbox1: false,
      checkbox2: true,
    })
  })
})

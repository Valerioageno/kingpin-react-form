---
sidebar_position: 3
---

# Radio buttons

Radio buttons need a wrapper which keeps the state.

```tsx
import { Form, Radio, RadioGroup } from 'react-former'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>): void => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <RadioGroup name="radio-group">
        <Radio name="radio1" />
        <Radio name="radio2" checked />
      </RadioGroup>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

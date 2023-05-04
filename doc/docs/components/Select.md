---
sidebar_position: 1
---

# Select

This is just a simple HTML select element which works within the Kingpin
`<Form />` component out of the box. It takes whatever input HTML attribute
as prop plus `initialValue`.

The `name` and `initialValue` attributes are mandatory.

```tsx
import { Form, Select } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <h3>Favourite pasta</h3>
      <Select name="pasta" initialValue="">
        <option value="0">Open this select menu</option>
        <option value="1">Pesto</option>
        <option value="2">Ragù</option>
        <option value="3">Carbonara</option>
      </Select>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

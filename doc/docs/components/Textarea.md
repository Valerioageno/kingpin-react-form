---
sidebar_position: 1
---

# Textarea

This is just a simple HTML textarea element which works within the Kingpin
`<Form />` component out of the box. It takes whatever input HTML attribute
as prop plus `initialValue`.

The `name` and `initialValue` attributes are mandatory.

```tsx
import { Form, Textarea } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <Textarea name="comment" initialValue="" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

---
sidebar_position: 1
---

# Input

```tsx
import { Form, Input } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

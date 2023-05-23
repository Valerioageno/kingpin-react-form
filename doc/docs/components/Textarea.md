---
sidebar_position: 4
tags:
  - Component
  - Kingpin
---

# Textarea

This is just a simple HTML textarea element which works within the Kingpin
`<Form />` component out of the box.

## Props

| Name                | Mandatory | Purpose                                                                                              |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| name                | true      | A string which describe the element. Will be the element `key` in the submit payload                 |
| initialValue        | false     | The textarea initial value                                                                           |
| validation          | false     | A single (or an array of) function(s) to validate the element. Check the [doc](../validation)        |
| Textarea attributes | false     | All the React [textarea attributes](https://react.dev/reference/react-dom/components/textarea#props) |

```tsx
import { Form, FormResult, Textarea } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: FormResult) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <Textarea name="comment" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

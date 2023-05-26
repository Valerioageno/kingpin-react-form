---
sidebar_position: 2
tags:
  - Component
  - Kingpin
---

# Select

This is just a simple HTML select element which works within the Kingpin
`<Form />` component out of the box.

## Props

| Name              | Mandatory | Purpose                                                                                                         |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| name              | true      | A string which describe the element. Will be the element `key` in the submit payload                            |
| initialValue      | false     | The select initial value                                                                                        |
| validation        | false     | A single (or an array/object of) function(s) to validate the element. Check the [doc](../validation)            |
| errorClassName    | false     | A className that is attached to the `className` on error. Check [here](../validation#error-classname) for more. |
| Select attributes | false     | All the React [select attributes](https://react.dev/reference/react-dom/components/select#props)                |

```tsx
import { Form, FormResult, Select } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: FormResult) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <h3>Favourite pasta</h3>
      <Select name="pasta">
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

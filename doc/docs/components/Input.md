---
sidebar_position: 1
tags:
  - Component
  - Kingpin
---

# Input

This is just a simple HTML input element which works within the Kingpin
`<Form />` component out of the box.

:::note

If you need a radio button take a look at the [Radio](./Radio.mdx) component.

:::

## Props

| Name             | Mandatory | Purpose                                                                                                         |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| name             | true      | A string which describe the element. Will be the element `key` in the submit payload                            |
| initialValue     | false     | The input initial value                                                                                         |
| validation       | false     | A single (or an array of) function(s) to validate the element. Check the [doc](../validation)                   |
| errorClassName   | false     | A className that is attached to the `className` on error. Check [here](../validation#error-classname) for more. |
| Input attributes | false     | All the React [input attributes](https://react.dev/reference/react-dom/components/input#props)                  |

```tsx
import { Form, FormResult, Input } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: FormResult) => {
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

## Returned type

Input is hands down the most versatile among the inputs type since the number of different
values the `type` attribute can have.

For this reason quite probably you won't need always a `string` as return type and Kingpin
take actually care of it.

Basically if the `type` attribute is `range` or `number` the returned type will be a
[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
and if the attribute is `checkbox` the returned type will be a
[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).

In all other cases the returned type will be a
[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

:::caution

The default value for the input tag is a string. Be sure to use the `initialValue` prop with checkboxes and number fields.

:::

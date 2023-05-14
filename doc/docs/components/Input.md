---
sidebar_position: 1
---

# Input

This is just a simple HTML input element which works within the Kingpin
`<Form />` component out of the box. It takes whatever input HTML attribute
as prop plus `initialValue`.

The `name` and `initialValue` attributes are mandatory.

:::note

If you need a radio button take a look at the [Radio](./Radio.mdx) component.

:::

```tsx
import { Form, Input } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <Form onSubmit={submit}>
      <Input name="email" type="email" initialValue="" />
      <Input name="password" type="password" initialValue="" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## Returned type

Input is hands down the most versatile among the inputs type since the number of different
values the `type` attribute can have.

For this reason quite probably you won't need always a `string` as return type and Kingping
take actually care of it.

Basically if the `type` attribute is `range` or `number` the return tipe will be a
[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
and if the attribute is `checkbox` the return value will be a
[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).

In all other cases the returned type will be a
[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

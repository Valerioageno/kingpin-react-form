---
sidebar_position: 0
tags:
  - Component
  - Kingpin
---

# Form

## Basics

Form is where the whole Kingpin logic is handled.

In order to make the inputs working correctly they have to al
be wrapped within a Kingpin `<Form />` element.

:::note
It accepts in the body whatever React element. By the way just Kinpin components
or element wrapped by the [withKingpin](../withKingpin.mdx) HOC will be
considered in the submit payload.
:::

## Form element

The form is just a normal HTML `<form>` element with just two differences:

1. The `onSubmit` event has two arguments: the "classic" event and the [form payload](#formresult).
2. It could also take the `onReset` event as prop in order to have a listener on the form
   reset.

Check the props for more.

## Props

| Name            | Mandatory | Purpose                                                                       |
| --------------- | --------- | ----------------------------------------------------------------------------- |
| onSubmit        | false     | The simple `onSubmit` event but it takes as second argument the `FormResult`. |
| onReset         | false     | A callback that runs after the form reset.                                    |
| children        | true      | The form body                                                                 |
| Form attributes | false     | All the React form attributes                                                 |

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

## Reset the form

To reset the form you just need to create a simple button with `name="reset"`.

The rest of the logic is entirely managed by Kingpin.

:::caution

Be sure to set `type="button"` in order to avoid unwanted submits.

:::

```tsx
import { Form, FormResult, Input } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: FormResult) => {
    e.preventDefault()
    console.log(data)
  }

  const reset = () => {
    console.log('Form has been reset')
  }

  return (
    <Form onSubmit={submit} onReset={reset}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      <button name="reset" type="button">
        Reset
      </button>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## FormResult

The `FormResult` represent the state of the form and is set as second argument in the `onSubmit` event.

It is basically formed by two main voices:

- `isValid`: `boolean` - Represents whether are or aren't error in the form so you don't have to iterate over the elements.
- `payload`: Is an object that represents the values stored in the elements. The `key`s are the components name.

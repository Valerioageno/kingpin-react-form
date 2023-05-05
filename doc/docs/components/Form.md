---
sidebar_position: 0
---

# Form

Form is where the whole Kingpin logic is stored.
In order to make the inputs working correctly they have to
be wrapped within a Kingpin `<Form />` element.

## Form element

The form is just a normal HTML `<form>` element with just two differences:

1. The `onSubmit` event has two arguments: the "classic" event and the form payload.
2. It could also take the `onReset` event as prop in order to have a listener on the form
   reset.

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

## Reset the form

To reset the form you just need to create a simple button with `name="reset"`.

The rest of the logic is entirely managed by Kingpin.

```tsx
import { Form, Input } from 'kingpin-react-form'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }

  const reset = () => {
    console.log('Form has been reset')
  }

  return (
    <Form onSubmit={submit} onReset={reset}>
      <Input name="email" type="email" initialValue="" />
      <Input name="password" type="password" initialValue="" />
      <button name="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

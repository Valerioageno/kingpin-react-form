---
sidebar_position: 2
---

# Getting started

## Install

Install the package with your favourite package manager.

```bash
npm install react-former
```

```bash
yarn add react-former
```

## Library basics

Former's focus is to don't change the ReactAPI making the integration itself as sooth as possible.
To achieve this each component could be thougth as just a simple input element so **all the attributes
are accessible**.

All the atomic states are kept by the `<Form />` component and they can be accessed globally using the
`onSubmit` event which is extended with a further parameter which is an object containing all the states.

```tsx
import { Form, Input } from 'react-former'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)

    // data: {
    //     email: "",
    //     password: ""
    // }
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

The `data` object is automatically assembled according to the `<Form />` children and it ensures
performant rendering cycles during the form updates.

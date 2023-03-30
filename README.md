# Former

![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![CI](https://github.com/Valerioageno/former/actions/workflows/main.yml/badge.svg)

Super fast ReactJS forms on react with almost null overhead.

## Features

- 🪶 Super light-weight - Zero dependencies
- 🌲 Tree shakable [🚧 WIP]
- 🎯 Top rendering performance
- 😎 Declarative and easy to read
- 🔫 Battle tested
- 🔌 Pluggable/Extensible
- 🔖 Design System ready

## In few lines

Former is a form library that aims to make the writing of forms on React easy like writing them directly
on the HTML.

To do it Former let each input to be just declared and enhance the [Single
Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
of each element (each input field take care just of it self).

The SRP let each field to render independently without causing unhandled re-render side effects.

The main `<Form />` component is the **only** interface for managing user set data, this choice in order to
lead to a better forms develop and managing all the data in a single place.

Read more in the documentation.

## Getting started

Install the package with your favourite package manager.

```bash
npm i react-former
```

```bash
yarn add react-former
```

Then create your form.

```tsx
import { FormEvent } from 'react'
import { Form, Input, Value } from 'react-former'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)

    // data: {
    //     email: "",
    //     password: ""
    //     terms-acceptance: true
    // }
  }

  return (
    <Form onSubmit={submit}>
      <Input name="email" type="email" initialValue="" />
      <Input name="password" type="password" initialValue="" />
      <Input name="terms-acceptance" type="checkbox" initialValue={true} />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

Easy like a pie.

## Key concept

In order to make Former efficient and reusable the entire state logic is managed
within the `<Form />` component (you don't need to directly control each input value).

Each Former action element (`<Input />`, `<Textarea />`, ...) has two mandatory fields:

- name (string describing the input purpose; check possible name conflicts!)
- initialValue (That's it)

Thanks to them the `<Form />` is now able to easily handle the internal state, but how?

`<Form />` is "**just**" a simple html `<form>`, so you can use it as usual. The most important
difference is that the `onSubmit` event now has to function arguments: the "classic" event and an object
which is the `key:value` representation of its content.

## Extend Former inputs

Modern forms require more than just `<input />` and `<textarea />` components.

Former plan is to add pluggable external components like `Typeaheads`, `Slider`, `Dropdown` ecc.
specifically desinged and developed to work within a Former `Form`.

In order to make Former extensible by anyone it's possible create custom
components with the `withFormer` HOC.

To see how it works with a real example check the documentation.

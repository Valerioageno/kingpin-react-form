# Kingpin React Form

![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![CI](https://github.com/Valerioageno/kingpin-react-form/actions/workflows/main.yml/badge.svg)

![Kingpin react form cover](https://raw.githubusercontent.com/Valerioageno/kingpin-react-form/main/Cover.png 'Kingpin React Form')

Super fast ReactJS forms with almost null overhead.

## Features

- 🪶 Super light-weight - Zero dependencies
- 🌲 Tree shakable
- 🎯 Top rendering performance
- 😎 Declarative and easy to read
- 🔫 Battle tested
- 🔌 Pluggable/Extensible
- 🔖 Design System ready
- ⚙️ Native Typescript types

## In few lines

Kingpin is a form library that aims to make the writing of forms on React easy like writing them directly
on the HTML.

To do it Kingpin let each input to be just declared and enhance the [Single
Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
of each element (each input field take care just of it self).

The SRP let each field to render independently without causing unhandled re-render side effects.

The main `<Form />` component is the **only** interface for managing user set data, this choice in order to
lead to a better forms develop and managing all the data in a single place.

Read more in the documentation.

## Getting started

Install the package with your favourite package manager.

```bash
npm i kingpin-react-form
```

```bash
yarn add kingpin-react-form
```

Then create your form.

```tsx
import { Form, Input, Value } from 'kingpin-react-form'
import { FormEvent } from 'react'

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

In order to make Kingpin efficient and reusable the entire state logic is managed
within the `<Form />` component (you don't need to directly control each input value).

Each Kingpin action element (`<Input />`, `<Textarea />`, ...) has two mandatory fields:

- name (string describing the input purpose; be aware of possible name conflicts!)
- initialValue (That's it)

Thanks to them the `<Form />` is now able to easily handle the internal state, but how?

`<Form />` is "**just**" a simple html `<form>`, so you can use it as usual. The most important
difference is that the `onSubmit` event now has two function arguments: the "classic" event and an object
which is the `name:value` representation of its content.

## Extend Kingpin inputs

Modern forms require more than just `<input />` and `<textarea />` components.

Kingpin plan is to add pluggable external components like `Typeaheads`, `Slider`, `Dropdown` ecc.
specifically desinged and developed to work within a Kingpin `Form`.

In order to make Kingpin extensible by anyone it's possible create custom
components with the `withKingpin` HOC.

To see how it works with a real example check the documentation.

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/Valerioageno/kingpin-react-form/blob/main/LICENSE) file.

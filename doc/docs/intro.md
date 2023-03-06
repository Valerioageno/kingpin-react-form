---
sidebar_position: 1
---

# Former

Super fast forms on react with almost null overhead.

## Features

- 🪶 Super light-weight - Zero dependencies
- 🌲 Tree shakable
- 🎯 Top rendering performance
- 😎 Declarative and easy to read
- 🔫 Battle tested
- 🔌 Pluggable
- 🔖 Design System ready

## In few lines

Former is a form library that aims to make the writing of forms on React easy like writing them directly
on the HTML.

To do it Former let each input to be super declarative and enhance the [Single
Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
of each element (each input field take care just of it self).

The SRP let each field to render independently without causing unhandled re-render side effects.

By the nature of Former this library is useful for sharing a components in a desing systems that includes also the
inputs elements.

## Why a new form library

Currently implementations are quite verbose causing a confusing DX and in
some case they use uncontrolled components which is the
[unrecommended](https://reactjs.org/docs/uncontrolled-components.html)
way to handle forms in React.

In most cases using uncontrolled components causes re-renders on unexpected
actions like the submit.

Among the other reasons Former wants to let the developer to write forms in the
better React way possible handling the re-renders in a declarative way.

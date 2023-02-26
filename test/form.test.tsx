import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Form } from '../src'

describe('Form', () => {
  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Form />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

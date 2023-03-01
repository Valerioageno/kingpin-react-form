import { Form, Input, Radio, RadioGroup, Select, Textarea, Value } from '../../.'
import { FormEvent } from 'react'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, Value>) => {
    e.preventDefault()
    console.log(data)
  }
  return (
    <div className="container py-4 px-3 mx-auto">
      <h1 className="text-primary">Form Example</h1>
      <Form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <Input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <Input name="password" type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="form-floating mb-3">
          <Textarea name="comments" className="form-control" placeholder="Leave a comment here" id="floatingTextarea" />
          <label htmlFor="floatingTextarea">Comments</label>
        </div>
        <Select name="number-selector" className="form-select mb-3" value="0" aria-label="Default select example">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
        <RadioGroup name="radio-group">
          <div className="form-check">
            <Radio className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Default radio
            </label>
          </div>
          <div className="form-check">
            <Radio className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" checked />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Default checked radio
            </label>
          </div>
        </RadioGroup>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default App

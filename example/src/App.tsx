import { Error, Form, FormResult, Input, Radio, RadioGroup, Select, Textarea } from '../../.'
import WithHOCSelect from './select'
import { FormEvent, useRef } from 'react'

function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, form: FormResult) => {
    e.preventDefault()
    console.log(form)
  }

  const shouldNotBeEmpty = (s: string | number | boolean): boolean => {
    if (typeof s === 'string') return s.length > 0
    return true
  }

  const shouldBeFirst = (s: string): boolean => s === 'flexRadioDefault1'
  const shouldBeAtLeast10Chars = (s: string): boolean => s.length > 10
  const shouldNotbeNull = (s: any): boolean => s !== null

  return (
    <div className="container py-4 px-3 mx-auto">
      {/* <h1 className="text-primary">Form Example</h1> */}
      <Form onSubmit={submit}>
        <h3>Inputs</h3>
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
          <Input name="password" type="password" className="form-control" id="exampleInputPassword1" initialValue="" />
        </div>
        <WithHOCSelect
          name="with-kingpin-select"
          className=""
          initialValue={null}
          randomProp={10}
          validation={shouldNotbeNull}
          errorClassName="error-class"
        />
        <Error name="with-kingpin-select:error">
          <div className="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div>
        </Error>
        <h3>Textarea</h3>
        <div className="form-floating mb-3">
          <Textarea
            name="comments"
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            initialValue=""
            validation={[shouldBeAtLeast10Chars, shouldNotBeEmpty]}
            errorClassName="alert-danger"
          />
          <label htmlFor="floatingTextarea">Comments</label>
          <Error name="comments:error">
            <div className="alert alert-danger" role="alert">
              This is a danger alert—check it out!
            </div>
          </Error>
        </div>
        {/*
        <h3>Select</h3>
        <Select
          name="number-selector"
          className="form-select mb-3"
          value="0"
          aria-label="Default select example"
          initialValue=""
        >
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
         */}
        <h3>Radios</h3>
        <RadioGroup name="radio-group" initialValue="flexRadioDefault2">
          <div className="form-check">
            <Radio className="form-check-input" name="flexRadioDefault1" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Default radio
            </label>
          </div>
          <div className="form-check">
            <Radio className="form-check-input" name="flexRadioDefault2" id="flexRadioDefault2" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Default checked radio
            </label>
          </div>
        </RadioGroup>
        {/* <h3>Checkboxes</h3>
        <div className="form-check">
          <Input
            className="form-check-input"
            type="checkbox"
            name="checkbox"
            id="flexCheckDefault"
            initialValue={true}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        {/* <button type="button" name="reset" className="btn btn-secondary mt-3">
          Reset
        </button> */}
      </Form>
    </div>
  )
}

export default App

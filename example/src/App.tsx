import { FormEvent } from 'react'
import { Form, Input, Select, Textarea } from '../../.'
function App(): JSX.Element {
  const submit = (e: FormEvent<HTMLFormElement>, data: Record<string, string>) => {
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default App

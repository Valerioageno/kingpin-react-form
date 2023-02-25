import { Form, Input } from '../../.'
function App() {

  return (
    <div className="container py-4 px-3 mx-auto">
      <h1 className="text-primary">Form Example</h1>
      <Form onSubmit={console.log}>
      <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <Input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <Input type="password" className="form-control" id="exampleInputPassword1"  />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </div>
  )
}

export default App

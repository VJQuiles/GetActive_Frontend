import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';

function App() {

  return (
    <>
      <Navbar>I'm just trying stuff</Navbar>
      <h1>This is just to see something for the dopamine. And as reminder that i can make things show up in the browser...</h1>
      <div className='text-center'>
        <Button variant='danger'> This is a button </Button>
      </div>
      <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
      <Form.Control
        type="color"
        id="exampleColorInput"
        defaultValue="#563d7c"
        title="Choose your color"
      />
    </>
  )
}

export default App
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const Preferences: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value)
  }

  return (
    <Form>
      <Form.Group>
        <Form.Check
          type='radio'
          id='option1'
          value='option1'
          name='radioOptions'
          checked={selectedOption === 'option1'}
          onChange={handleChange}
          className='mb-2'
        />
      </Form.Group>
    </Form>
  )
}

export default Preferences

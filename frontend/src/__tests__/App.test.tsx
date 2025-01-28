import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from '../App'

test('renders Button and calls onClick when clicked', () => {
  const handleClick = jest.fn()
  const { getByText } = render(<App />)

});
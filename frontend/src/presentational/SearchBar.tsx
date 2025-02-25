import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './SearchBar.scss'
import { useNavigate } from 'react-router-dom'

const SearchBar: React.FC = () => {
  const navigate = useNavigate()
  const onSearch = () => {
    navigate('Products')
  }

  return (
    <InputGroup className="rounded-pill p-2 SearchBar">
      <Form.Control
        type="text"
        placeholder="What are you looking for?"
        className="border-0 shadow-none"
      />
      <Button
        variant="warning"
        className="rounded-pill d-flex align-items-center"
        onClick={onSearch}
      >
        <FontAwesomeIcon icon={faSearch} /> {' '}Search
      </Button>
    </InputGroup>
  )
}

export default SearchBar

import React from 'react'
import { Button } from 'react-bootstrap'
import { handleDelete } from '../services/handleDelete'

interface Prop {
  deleteUrl: string
}

const DeleteButton: React.FC<Prop> = ({ deleteUrl }) => {
  const onClick = () => {
    handleDelete(deleteUrl)
  }

  return (
    <Button variant='link' className='text-danger' onClick={onClick}>
      <i className='fa fa-trash' />
    </Button>
  )
}

export default DeleteButton

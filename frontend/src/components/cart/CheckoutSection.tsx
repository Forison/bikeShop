import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CheckoutSection = () => {
  const navigate = useNavigate()

  return (
    <Card className='p-3 shadow-sm'>
      <div className='d-flex justify-content-between fw-bold'>
        <span>Total</span>
        <span>$78.76</span>
      </div>

      <Button variant='warning' className='w-100 my-2'>
        Proceed to checkout
      </Button>
      <Button variant='outline-secondary' className='w-100' onClick={() => navigate('/')}>
        Continue shopping
      </Button>
    </Card>
  )
}

export default CheckoutSection

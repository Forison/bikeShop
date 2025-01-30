import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface Prop {
  total: number
}

const CheckoutSection: React.FC<Prop> = ({ total }) => {
  const navigate = useNavigate()
  const handleOrder = () => {
    
  }

  return (
    <>
      <h2 className='mb-4'>Checkout</h2>
      <Card className='p-3 shadow-sm'>
        <div className='d-flex justify-content-between fw-bold'>
          <span>Total</span>
          <span>${total}</span>
        </div>

        <Button 
          variant='warning'
          className='w-100 my-2'
          onClick={handleOrder}
        >
          Order now
        </Button>
        <Button variant='outline-secondary' className='w-100' onClick={() => navigate('/')}>
          Continue shopping
        </Button>
      </Card>
    </>
  )
}

export default CheckoutSection

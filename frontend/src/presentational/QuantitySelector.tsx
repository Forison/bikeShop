import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Prop {
  maxQuantity: number
}

const QuantitySelector: React.FC<Prop> = ({ maxQuantity = 10 }) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className='d-flex align-items-center bg-light rounded-pill p-1 mt-2'>

      <Button
        variant='light'
        className='btn btn-sm rounded-circle text-sm'
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity === 0}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <span className='mx-3 mall-text'>{quantity}</span>
      <Button
        variant='outline-secondary'
        className='btn btn-sm rounded-circle text-sm'
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity === maxQuantity}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  )
}

export default QuantitySelector

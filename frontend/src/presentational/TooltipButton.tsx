import React from 'react'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import { ProductCustomizations } from '../utils/interface/customization'
import { PriceRule } from '../utils/interface/shop'
import { isMatchingCondition } from '../utils/helper/isMatchingCondition'

interface Props {
  price_rule: any
  customization_options: any
}

const TooltipButton: React.FC<Props> = ({ customization_options, price_rule }) => {
  const renderTooltip = () => (
    <Tooltip id='button-tooltip'>
      This is a cool part
    </Tooltip>
  )

  return (
    <>
      <h1 className='small'>Your customization options</h1>
      {customization_options?.map((customization_option: any, index: number) => (
        <div className='d-flex mb-1' key={index}>
          <OverlayTrigger placement='top' overlay={renderTooltip}>
            <Button
              variant={isMatchingCondition(price_rule, customization_option) ? 'outline-success' : 'outline-secondary'}
              disabled
            >
              {customization_option.part}: {customization_option.option}
            </Button>
          </OverlayTrigger>
        </div >
      ))}
    </>
  )
}

export default TooltipButton

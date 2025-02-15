import React from 'react'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import { ProductCustomizations } from '../utils/interface/customization'
import { PriceRulePartOption } from '../utils/interface/shop'
import { isMatchingCondition, priceModifier } from '../utils/helper/isMatchingCondition'

interface Props {
  price_rule: PriceRulePartOption[] | undefined
  customization_options: ProductCustomizations[]
}

const TooltipButton: React.FC<Props> = ({ customization_options, price_rule }) => {
  const renderTooltip = (message?: string) => (props: any) => (
    <Tooltip id='button-tooltip' {...props}>
      {message}
    </Tooltip>
  )

  return (
    <>
      <h1 className='small'>Your customization options</h1>
      {customization_options?.map((customization_option: any, index: number) => (
        <div className='d-flex mb-1' key={index}>
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={
              isMatchingCondition(price_rule, customization_option)
                ? renderTooltip(`An additional €${priceModifier(price_rule, customization_option)} 
                                 was added due special price rule for combination`)
                : renderTooltip()
            }
          >
            <Button
              variant={isMatchingCondition(price_rule, customization_option) ? 'outline-success' : 'outline-secondary'}
              disabled={!isMatchingCondition(price_rule, customization_option)}
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


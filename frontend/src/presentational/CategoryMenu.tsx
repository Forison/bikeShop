import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStore,
  faTshirt,
  faLeaf,
  faWrench,
  faRunning,
  faPaintBrush,
} from '@fortawesome/free-solid-svg-icons'
import Preferences from './Preferences'

import './CategoryMenu.scss'

type Category = {
  icon: any
  label: string
}

const categories: Category[] = [
  { icon: faRunning, label: 'Sports' },
  { icon: faPaintBrush, label: 'Art' },
  { icon: faTshirt, label: 'Fashion' },
  { icon: faLeaf, label: 'Herbal' },
  { icon: faWrench, label: 'Handy man' },
  { icon: faStore, label: 'Provisions' },
]

const CategoryMenu: React.FC = () => {
  return (
    <div className="category-menu">
      <h1 className="fs-6 text-center">Preferences</h1>
      <hr />
      <ListGroup>
        {categories.map((item, index) => {
          return (
            <ListGroup.Item
              key={index}
              className="category-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={item.icon} className="category-icon me-2" />
                <span className="text-muted small">{item.label}</span>
              </div>
              <div className="preferences-container">
                <Preferences />
              </div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default CategoryMenu

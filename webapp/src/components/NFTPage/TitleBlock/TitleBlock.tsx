import React from 'react'
import { Props } from './TitleBlock.types'
import './TitleBlock.css'

const TitleBlock = (props: Props) => {
  const { title, children, right } = props

  return (
    <div className="block-container">
      <div className="title-container">
        <h6 className="title">{title}</h6>
        {right}
      </div>
      {children}
    </div>
  )
}

export default TitleBlock

import React, { useState } from 'react'
import { Props } from './DescriptionBlock.types'
import classNames from 'classnames'
import './DescriptionBlock.css'

const DescriptionBlock = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { nft } = props

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="description-container">
      <div className={classNames('show-text', !isOpen && 'hidden-text')}>
        {nft.metadata.description}{' '}
        {!isOpen && <div className="hidden-text-blur" />}
      </div>
      {!isOpen && (
        <button onClick={onOpen} className="more-button">
          More
        </button>
      )}
    </div>
  )
}

export default DescriptionBlock

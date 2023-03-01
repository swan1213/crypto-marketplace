import React, { useState } from 'react'

import { MenuItem } from '../MenuItem'
import { Props } from './Dropdown.types'

const Dropdown = ({ value, children, open }: Props) => {
  const [isOpen, setIsOpen] = useState(open || false)

  const onDropdownClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <MenuItem value={value} onClick={onDropdownClick} withCaret={true} />
      {isOpen && children}
    </>
  )
}

export default React.memo(Dropdown) as typeof Dropdown

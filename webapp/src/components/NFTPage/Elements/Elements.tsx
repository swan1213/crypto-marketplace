import React from 'react'
import { Props } from './Elements.types'
import './Elements.css'

const Elements = (props: Props) => {
  const { elementTypes, maxElementType } = props

  return (
    <div className="elements-container">
      <div className="top-element">
        <img
          className="top-element-icon"
          src={maxElementType.icon}
          alt="icon"
        />
        <p className="top-element-text">
          {maxElementType.title}
          <br />
          {maxElementType.value}%
        </p>
      </div>
      <div className="bottom-elements">
        {elementTypes.map((element: any, index: any) => {
          return (
            <div className="bottom-element" key={index}>
              <img
                className="bottom-element-icon"
                src={element.icon}
                alt="icon"
              />
              <p className="bottom-element-text">
                {element.title}
                <br />
                {element.value}%
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Elements)

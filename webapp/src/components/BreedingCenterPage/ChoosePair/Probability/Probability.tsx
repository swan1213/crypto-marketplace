import { SVG } from "@kmon/ui"
import React from "react"

import "./Probability.css"
import { Props } from "./Probability.types"

const Probability = (props: Props) => {
  const { mutationFactor } = props
  const classes = ['kryptomon', 'probability']

  return (
    <div className={classes.join(' ')}>
      <span className="probability-title">MUTATION FACTOR {mutationFactor !== null ? mutationFactor.toFixed(2) : ''}%</span>
      <div className="circle1">
        <div className="circle2">
          <SVG name="heart" />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Probability)
import React from 'react'
import { Loader } from '@kmon/ui'
import { LazyImage } from 'react-lazy-images'

import { Props } from './Image.types'
import './Image.css'

// 1x1 transparent pixel
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII='

const Image = (props: Props) => {
  return (
    <LazyImage
      src={props.src}
      alt={props.alt}
      debounceDurationMs={1000}
      placeholder={({ ref }) => (
        <div ref={ref}>
          <Loader size="small" active />
        </div>
      )}
      actual={({ imageProps }) => (
        <img className="image" alt="alt" {...imageProps} />
      )}
    />
  )
}

// the purpose of this wrapper is to make the div always be square, by using a 1x1 transparent pixel
const ImageWrapper = (props: Props) => {
  const { className, ...rest } = props

  let classes = 'Image'
  if (className) {
    classes += ' ' + className
  }

  return (
    <div className={classes}>
      <img src={PIXEL} alt="pixel" className="pixel" />
      <div className="image-wrapper">
        <Image {...rest} />
      </div>
    </div>
  )
}

export default React.memo(ImageWrapper)

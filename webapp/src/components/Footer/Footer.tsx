import React from 'react'
import { FooterProps } from '@kmon/ui'
import { Footer as BaseFooter } from '@kmon/dapps/dist/containers'
import * as tranlsations from '../../modules/translation/locales'

// const locales = Object.keys(tranlsations)
// English only at the moment
const locales = [Object.keys(tranlsations)[0]]

const Footer = (props: FooterProps) => (
  <BaseFooter locales={locales} {...props} />
)

export default React.memo(Footer)

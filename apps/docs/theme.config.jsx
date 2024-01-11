import React from 'react'
import { SeidhrLogo } from '@seidhr/react-muna-logo'

export default {
  logo: (
    <>
      <SeidhrLogo className='w-6 h-6 mr-3' />
      <span>Muna | ᛗᚢᚾᚨ</span>
    </>
  ),
  project: {
    link: 'https://github.com/seidhr/muna'
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Muna | ᛗᚢᚾᚨ" />
      <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      <meta property="og:description" content="Muna (remember) is a Sanity Studio with a data schema for describing and presenting cultural heritage objects." />
    </>
  )
}
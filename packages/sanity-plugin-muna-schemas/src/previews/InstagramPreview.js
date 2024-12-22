/* eslint-disable react/prop-types */
/* eslint-disable no-process-env */
import React from 'react'
import InstagramEmbed from 'react-instagram-embed'

const token = process.env.SANITY_STUDIO_INSTAGRAM_TOKEN

const InstagramPreview = ({ value }) => {
  const { url } = value
  if (!url) {
    return <p>Mangler URL til Instagram innlegg</p>
  }

  return (
    <InstagramEmbed
      clientAccessToken={token}
      url={url}
      maxWidth={480}
      hideCaption
      containerTagName="div"
      injectScript
    />
  )
}

export default InstagramPreview

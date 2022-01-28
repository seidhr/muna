/* import React from 'react'
import ReactPlayer from 'react-player'

const Youtube = ({value: {url}}) => {
  return (
    <ReactPlayer url={url} />
  )
} */

export default {
  name: 'Video',
  type: 'object',
  title: 'Video',
  description: 'Embed video',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'url',
      title: 'url',
      type: 'url',
    },
/*     {
      name: 'service',
      title: 'Tjeneste',
      titleEN: 'Service',
      type: 'string',
      options: {
        list: ['youtube'],
      },
    }, */
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    /* component: Youtube, */
     prepare({title, url}) {
      return {
        title: `Video: ${url}`,
      }
    }
  },
}

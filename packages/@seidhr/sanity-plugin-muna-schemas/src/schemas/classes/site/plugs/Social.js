import React from 'react'
import {TwitterTweetEmbed} from 'react-twitter-embed'

const Tweet = ({value: {url}}) => {
  const exp = /\/status\/(\d+)($|[?/])/
  const [, id] = exp.exec(url) || []
  if (id) {
    return (
      <TwitterTweetEmbed
        className="sliderBoxes"
        tweetId={id}
        options={{conversation: 'none', 'hide-thread': true}}
      />
    )
  }
  return <React.Fragment />
}

export default {
  name: 'Social',
  type: 'object',
  title: 'Social',
  description: 'A big social. Centered',
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
    {
      name: 'service',
      title: 'Tjeneste',
      titleEN: 'Service',
      type: 'string',
      options: {
        list: ['twitter'],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'service',
      url: 'url',
    },
    component: Tweet,
    /*  prepare({title, subtitle}) {
      return {
        title: `Social: ${title}`,
        subtitle
      }
    } */
  },
}

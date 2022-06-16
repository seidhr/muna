import React from 'react'
import {
  Box,
  Text
} from '@sanity/ui'

export const QuotePreview = ({ value: { content, credit } }) => {
  const text = content
    ? content.map((block) => block.children
      .filter((child) => child._type === 'span')
      .map((span, index) => (<p key={index}>"{span.text}"</p>)))
    : ''

  const textCredit = credit
    ? credit.map((block) => block.children
      .filter((child) => child._type === 'span')
      .map((span, index) => (<small key={index}>{span.text}</small>)))
    : ''

  return (
    <Box padding={[3, 3, 4, 4]}>
      {text &&
        <>{text}</>
      }
      {textCredit &&
        <>{textCredit}</>
      }
    </Box>
  )
}
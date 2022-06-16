import React from 'react'
import {
  Box,
  Text,
  Heading,
  Label,
  Stack
} from '@sanity/ui'

export const TextPreview = ({ value: { title, content, type } }) => {
  const text = content.length
    ? content
      .filter((child) => child.children[0]._type === 'span')
      .map((span, index) => (
        <p key={index}>
          {span.style == "normal" ? (span.children[0].text.slice(0, 125) + ` ...`) : <strong>{span.children[0].text}</strong>}
        </p>
      ))
    : ''

  return (
    <Box paddingTop={2}>
      <Stack space={3}>
        {type && (<Label size={0}>{type}</Label>)}
        {title && (<Heading>{title}</Heading>)}
      </Stack>
      {text && (<Text>{text}</Text>)}
    </Box>
  )
}
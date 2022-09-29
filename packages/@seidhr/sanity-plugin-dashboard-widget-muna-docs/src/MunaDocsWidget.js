import React from 'react'
import { Card, Heading, Text } from '@sanity/ui'
import { SeidhrLogo } from '@seidhr/react-muna-logo'

const MunaDocsWidget = () => {
  return (
    <Card padding={[3, 3, 4]} radius={3} height='fill'>
      <SeidhrLogo style={{ display: 'block', margin: 'auto' }} width='10em' height='10em' />
      <Heading as="h2" size={4} align="center">ᛗᚢᚾᚨ</Heading>

      <Text>
        <p> Muna or ᛗᚢᚾᚨ means remember in norse. Muna is a schema for Sanity that enables detailed descriptions of cultural heritage objects and knowledge about their contexts.</p>
        <p>
          <a href='https://muna.xyz/docs/model/introduction' target='_blank' rel='noreferrer'>
            Muna documentation
          </a>
        </p>
      </Text>
    </Card>
  )
}

export default MunaDocsWidget

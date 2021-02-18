import React from "react"
import { Button, Card, Text, Inline } from '@sanity/ui'

const Preview = ({src, item, onClick}) => {

  return (
    <Card key={item.id} 
    >
      <img src={src} />
      <Text>
        {item.title}
      </Text>
      <Inline>
        <Button inverted onClick={() => onClick(item)}>
          Select
        </Button>
      </Inline>
      {/* <a href={'https://marcus.uib.no/' + item.id} target="_blank">View at marcus.uib.no</a> */}
    </Card>
)
}

export default Preview

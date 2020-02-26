import React from "react"
import Button from "part:@sanity/components/buttons/default"
import ButtonGroup from "part:@sanity/components/buttons/button-group"
import Card from "part:@sanity/components/previews/card"

import styled, {keyframes} from "styled-components"

const Preview = ({src, item, onClick}) => {

  return (
    <Container>
      <Card title={item.title} media={() => 
        <img src={src} />}
      >

        <ButtonGroup>
          <Button inverted onClick={() => onClick(item)}>
            Select
          </Button>
        </ButtonGroup>
        {/* <a href={'https://marcus.uib.no/' + item.id} target="_blank">View at marcus.uib.no</a> */}
      </Card>
    </Container>
  )
}

const FadeIn = keyframes` 
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 300px;
  padding: 6px 0;
  margin: 6px;
  animation: ${FadeIn} 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`

export default Preview

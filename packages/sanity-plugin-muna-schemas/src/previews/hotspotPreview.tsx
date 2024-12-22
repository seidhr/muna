import React from 'react'
import Preview from 'part:@sanity/base/preview'
import schema from 'part:@sanity/base/schema'
import { Box } from '@sanity/ui'

const HotspotPreview = ({ spot }) => {
  return (
    <Box padding={2} style={{ minWidth: 200 }}>
      {spot?.depicts?._ref ? (
        <Preview value={{ _id: spot.depicts._ref }} type={schema.get(`Actor`)} /> // Not working for different types?
      ) : (
        `No Reference Selected`
      )}
    </Box>
  )
}

export default HotspotPreview

/* 
import React from 'react'
import Preview from 'part:@sanity/base/preview'
import schema from 'part:@sanity/base/schema'
import sanityClient from 'part:@sanity/base/client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Box } from '@sanity/ui'

const queryClient = new QueryClient()
const client = sanityClient.withConfig({ apiVersion: `2021-05-19` })
const query = `*[_id == $id][0]._type`

const Spot = ({ spot }) => {
  const { isLoading, error, data } = useQuery(['useSpot'], () =>
    client.fetch(query, { id: spot.depicts._ref })
  )

  return (
    <>
      {
        spot?.depicts?._ref && data ? (
          <Preview value={{ _id: spot.depicts._ref }} type={schema.get(data._type)} />
        ) : (
          `No Reference Selected`
        )
      }
    </>
  )
}

const HotspotPreview = ({ spot }) => {

  return (
    <Box padding={2} style={{ minWidth: 200 }}>
      <QueryClientProvider client={queryClient}>
        <Spot spot={spot} />
      </QueryClientProvider>
    </Box>
  )
}

export default HotspotPreview
*/
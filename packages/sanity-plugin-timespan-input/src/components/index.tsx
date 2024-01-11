/* eslint-disable react/prop-types */
import { ReactNode } from 'react'
import { Box, Flex } from '@sanity/ui'
import { Period } from './period'

export function Preview({ value }: any): ReactNode {
  const { beginOfTheBegin, endOfTheBegin, beginOfTheEnd, endOfTheEnd, date } = value
  return (
    <>
      {beginOfTheBegin || endOfTheBegin || beginOfTheEnd || endOfTheEnd || date ? (
        <Flex
          direction={'row'}
          justify={'center'}
          align={'center'}
          marginTop={4}
          width={'100%'}
          style={{ fontSize: '12px' }}
        >
          <Box
            flex={0}
            style={{
              position: 'relative',
              height: '31px',
              minWidth: '25px',
              borderBlockEnd: '1px dashed #aaa',
            }}
          />
          {date && !beginOfTheBegin && !endOfTheBegin && !endOfTheEnd && !beginOfTheEnd && <></>}
          {!beginOfTheBegin && !endOfTheBegin && endOfTheEnd && beginOfTheEnd && (
            <Period name={'Unknown start'} variant="unknown" />
          )}
          {endOfTheBegin && (
            <Period start={beginOfTheBegin} end={endOfTheBegin} name={'Fuzzy start'} />
          )}
          {beginOfTheBegin && !endOfTheBegin && endOfTheEnd && !beginOfTheEnd && (
            <Period start={beginOfTheBegin} end={endOfTheEnd} name={'Certain'} variant="certain" />
          )}
          {beginOfTheBegin && endOfTheBegin && beginOfTheEnd && endOfTheEnd && (
            <Period name={'Certain'} variant="certain" />
          )}
          {beginOfTheEnd && <Period start={beginOfTheEnd} end={endOfTheEnd} name={'Fuzzy end'} />}
          {beginOfTheBegin && endOfTheBegin && !endOfTheEnd && !beginOfTheEnd && (
            <Period name={'Unknown end'} variant="unknown" />
          )}
          <Box
            flex={0}
            style={{
              position: 'relative',
              height: '31px',
              minWidth: '25px',
              borderBlockEnd: '1px dashed #aaa',
            }}
          />
        </Flex>
      ) : (
        <Flex
          direction={'row'}
          justify={'center'}
          align={'center'}
          marginTop={1}
          width={'100%'}
          style={{
            fontSize: '12px',
            borderBlockEnd: '1px dashed #aaa',
            position: 'relative',
            height: '15px',
          }}
        >
          <Box
            padding={2}
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              position: 'absolute',
              top: '-1px',
            }}
          >
            No EDTF value or invalid value
          </Box>
        </Flex>
      )}
    </>
  )
}

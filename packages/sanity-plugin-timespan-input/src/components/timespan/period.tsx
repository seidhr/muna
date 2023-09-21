/* eslint-disable react/require-default-props */
// eslint-disable-next-line no-unused-vars
import React, { CSSProperties, ReactNode } from 'react'
import { Box, Flex, Stack } from '@sanity/ui'
import { ArrowLeftIcon, ArrowRightIcon } from '@sanity/icons'
import { format } from 'date-fns'

export const Period = ({
  start,
  end,
  name,
  variant = 'fuzzy',
}: {
  name: string
  start?: string
  end?: string
  variant?: 'fuzzy' | 'certain' | 'unknown' | 'infinity'
}): ReactNode => {
  let bg: CSSProperties | undefined

  switch (variant) {
    case 'fuzzy':
      bg = {
        backgroundImage:
          'repeating-linear-gradient(45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%)',
        backgroundSize: '5px 5px',
        backgroundColor: '#ffffff',
        borderBlockEnd: '1px solid #444',
      }
      break
    case 'certain':
      bg = {
        backgroundImage:
          'repeating-linear-gradient(45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%)',
        backgroundSize: '5px 5px',
        backgroundColor: '#ffffff',
        borderBlockEnd: '1px solid #444',
      }
      break
    case 'unknown':
      bg = {
        borderBlockEnd: '1px solid #444',
      }
      break
    case 'infinity':
      bg = {
        borderBlockEnd: '1px solid #444',
      }
      break
    default:
      bg = {}
      break
  }

  return (
    <Stack flex={1}>
      <Box
        flex={1}
        style={{
          position: 'relative',
          height: '15px',
        }}
      >
        {start && (
          <>
            <ArrowLeftIcon
              style={{ position: 'absolute', top: '-8px', left: '-5px', fontSize: 18 }}
            />
            <span style={{ position: 'absolute', top: '-7px', left: '16px' }}>
              {format(new Date(start), 'yyyy.MM.dd')}
            </span>
          </>
        )}
        {variant === 'infinity' && (
          <>
            <ArrowLeftIcon
              style={{ position: 'absolute', top: '-8px', left: '-5px', fontSize: 18 }}
            />
            <span style={{ position: 'absolute', top: '-7px', left: '16px' }}>&infin;</span>
          </>
        )}
      </Box>
      <Flex flex={1} justify={'center'} paddingY={1} style={bg}>
        <Box padding={1} style={{ backgroundColor: 'white', borderRadius: '5px' }}>
          {name}
        </Box>
      </Flex>
      <Box
        flex={1}
        style={{
          position: 'relative',
          height: '15px',
        }}
      >
        {end && (
          <>
            <ArrowRightIcon
              style={{ position: 'absolute', bottom: '-8px', right: '-5px', fontSize: 18 }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '-8px',
                right: '16px',
              }}
            >
              {format(new Date(end), 'yyyy.MM.dd')}
            </span>
          </>
        )}
        {variant === 'infinity' && (
          <>
            <ArrowRightIcon
              style={{ position: 'absolute', bottom: '-8px', right: '-5px', fontSize: 18 }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '-8px',
                right: '16px',
              }}
            >
              &infin;
            </span>
          </>
        )}
      </Box>
    </Stack>
  )
}

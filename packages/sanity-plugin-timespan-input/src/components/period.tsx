import { ArrowLeftIcon, ArrowRightIcon } from '@sanity/icons'
import { Box, Flex, Stack, useTheme } from '@sanity/ui'
import { format } from 'date-fns'
import { CSSProperties, ReactNode } from 'react'

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
  let bg: { light: CSSProperties; dark: CSSProperties } | undefined

  const theme = useTheme()

  const mode = theme.sanity.color.dark ? 'dark' : 'light'

  const boxColorScheme =
    mode === 'light'
      ? { backgroundColor: '#ffffff', color: '#000000' }
      : { backgroundColor: '#000000', color: '#ffffff' }

  switch (variant) {
    case 'fuzzy':
      bg = {
        light: {
          backgroundImage:
            'repeating-linear-gradient(45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%)',
          backgroundSize: '5px 5px',
          backgroundColor: '#ffffff',
          borderBlockStart: '1px solid #444',
          borderBlockEnd: '1px solid #444',
          color: '#000000',
        },
        dark: {
          backgroundImage:
            'repeating-linear-gradient(45deg, #dddddd 0, #dddddd 0.5px, transparent 0, transparent 50%)',
          backgroundSize: '5px 5px',
          backgroundColor: '#000000',
          borderBlockStart: '1px solid #ccc',
          borderBlockEnd: '1px solid #ccc',
          color: '#ffffff',
        },
      }
      break
    case 'certain':
      bg = {
        light: {
          backgroundImage:
            'repeating-linear-gradient(45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #000000 0, #000000 0.5px, transparent 0, transparent 50%)',
          backgroundSize: '5px 5px',
          backgroundColor: '#ffffff',
          borderBlockStart: '1px solid #444',
          borderBlockEnd: '1px solid #444',
          color: '#000000',
        },
        dark: {
          backgroundImage:
            'repeating-linear-gradient(45deg, #dddddd 0, #dddddd 0.5px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #dddddd 0, #dddddd 0.5px, transparent 0, transparent 50%)',
          backgroundSize: '5px 5px',
          backgroundColor: '#000000',
          borderBlockStart: '1px solid #ccc',
          borderBlockEnd: '1px solid #ccc',
          color: '#ffffff',
        },
      }
      break
    case 'unknown':
      bg = {
        light: {
          borderBlockStart: '1px solid #444',
          borderBlockEnd: '1px solid #444',
          color: '#000000',
        },
        dark: {
          borderBlockStart: '1px solid #ccc',
          borderBlockEnd: '1px solid #ccc',
          color: '#ffffff',
        },
      }
      break
    case 'infinity':
      bg = {
        light: {
          borderBlockStart: '1px solid #444',
          borderBlockEnd: '1px solid #444',
          color: '#000000',
        },
        dark: {
          borderBlockStart: '1px solid #ccc',
          borderBlockEnd: '1px solid #ccc',
          color: '#ffffff',
        },
      }
      break
    default:
      bg = {
        light: {},
        dark: {},
      }
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
              style={{ position: 'absolute', top: '-8px', left: '-3px', fontSize: 18 }}
            />
            <span style={{ position: 'absolute', top: '-7px', left: '16px' }}>
              {format(new Date(start), 'yyyy.MM.dd')}
            </span>
          </>
        )}
        {variant === 'infinity' && (
          <>
            <ArrowLeftIcon
              style={{ position: 'absolute', top: '-8px', left: '-3px', fontSize: 18 }}
            />
            <span style={{ position: 'absolute', top: '-7px', left: '16px' }}>&infin;</span>
          </>
        )}
      </Box>
      <Flex flex={1} justify={'center'} paddingY={1} style={bg[mode]}>
        <Box padding={1} style={{ ...boxColorScheme, borderRadius: '5px' }}>
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
              style={{ position: 'absolute', bottom: '-8px', right: '-3px', fontSize: 18 }}
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
              style={{ position: 'absolute', bottom: '-8px', right: '-3px', fontSize: 18 }}
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

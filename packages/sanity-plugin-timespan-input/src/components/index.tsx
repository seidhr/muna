/* eslint-disable react/prop-types */
import { Box, Flex, useTheme } from '@sanity/ui'
import { parse } from 'edtf'
import { ReactNode } from 'react'

import { EDTFDate, EDTFInterval, TimespanValue } from '../types'
import { Period } from './period'

interface PreviewProps {
  value: TimespanValue
}

function getDateLabel(date: EDTFDate | null): string {
  if (!date) return 'unknown'
  if (date === 'Infinity') return 'infinity'

  if (
    typeof date.uncertain === 'number' &&
    date.uncertain > 0 &&
    typeof date.approximate === 'number' &&
    date.approximate !== 0
  ) {
    return 'approximate and uncertain'
  }
  if (date.uncertain === true || (typeof date.uncertain === 'number' && date.uncertain !== 0)) {
    return 'uncertain'
  }
  if (typeof date.approximate === 'number' && date.approximate !== 0) {
    return 'approximate'
  }
  return 'certain'
}

function getIntervalLabel(interval: EDTFInterval): string[] {
  if (!interval?.values?.length) return ['unknown']

  const [start, end] = interval.values
  const startLabel = getDateLabel(start)
  const endLabel = getDateLabel(end)

  return [startLabel, endLabel]
}

// eslint-disable-next-line complexity
export function Preview({ value }: PreviewProps): ReactNode {
  const { beginOfTheBegin, endOfTheBegin, beginOfTheEnd, endOfTheEnd, date, edtf } = value

  let boxLabel: string | undefined
  let intervalLabel: string[] = []

  try {
    const edtfValue = parse(edtf)
    boxLabel = edtfValue.type === 'Date' ? getDateLabel(edtfValue) : undefined
    intervalLabel = edtfValue.type === 'Interval' ? getIntervalLabel(edtfValue) : []
  } catch (error) {
    //console.warn('Failed to parse EDTF value:', error)
    boxLabel = 'invalid'
  }

  const theme = useTheme()

  const mode = theme.sanity.color.dark ? 'dark' : 'light'
  const boxColorScheme =
    mode === 'light'
      ? { backgroundColor: '#ffffff', color: '#000000' }
      : { backgroundColor: '#000000', color: '#ffffff' }

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
            <Period name={intervalLabel[0]} variant="unknown" />
          )}
          {endOfTheBegin && (
            <Period
              start={beginOfTheBegin}
              end={endOfTheBegin}
              name={`${intervalLabel[0]} start`}
            />
          )}
          {beginOfTheBegin && endOfTheEnd && !endOfTheBegin && !beginOfTheEnd && (
            <Period
              start={beginOfTheBegin}
              end={endOfTheEnd}
              name={boxLabel ?? 'certain'}
              variant="certain"
            />
          )}
          {beginOfTheBegin && endOfTheBegin && beginOfTheEnd && endOfTheEnd && (
            <Period name={boxLabel ?? 'certain'} variant="certain" />
          )}
          {beginOfTheEnd && (
            <Period start={beginOfTheEnd} end={endOfTheEnd} name={`${intervalLabel[1]} end`} />
          )}
          {beginOfTheBegin && endOfTheBegin && !endOfTheEnd && !beginOfTheEnd && (
            <Period name={intervalLabel[1]} variant="unknown" />
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
              ...boxColorScheme,
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

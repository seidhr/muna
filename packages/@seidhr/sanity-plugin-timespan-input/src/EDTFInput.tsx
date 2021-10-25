import React from 'react'
import { getTimespan } from './functions/getTimespan'
import { Card, Container, Heading, ThemeProvider, studioTheme } from '@sanity/ui';
import TimespanWrapper from './viz';
import { Timespan } from './types';

const EDTFinput = () => {
  const date = getTimespan('2021-11-11')
  const dateTime = getTimespan('2021-11-11 20:00')
  const certainYear = getTimespan('2016-0X-2X')
  const certainEndYear = getTimespan('/2016-0X-2X')
  const certainBeginAndEndYear: Timespan = getTimespan('1979-1X-11/2016-0X-2X')

  return (
    <ThemeProvider theme={studioTheme}>
      <Container width={5}>
        <Card width={3} margin={3} padding={4}>
          <Heading as="h1" size={5}>
            EDTF
          </Heading>
          <p>Initial tests of edtf.js.</p>

          <Heading as="h2">Input: 2021-11-11</Heading>
          <div style={{ height: '150px' }}>
            <TimespanWrapper data={date} />
          </div>
          <pre>{JSON.stringify(date, null, 2)}</pre>

          <Heading as="h2">Input: 2021-11-11 20:00</Heading >
          <div style={{ height: '150px' }}>
            <TimespanWrapper data={dateTime} />
          </div>
          <pre>{JSON.stringify(dateTime, null, 2)}</pre>

          <Heading as="h2">Input: 2016-0X-2X</Heading>
          <div style={{ height: '150px' }}>
            <TimespanWrapper data={certainYear} />
          </div>
          <pre>{JSON.stringify(certainYear, null, 2)}</pre>

          <Heading as="h2">Input: /2016-0X-2X</Heading>
          <div style={{ height: '150px' }}>
            <TimespanWrapper data={certainEndYear} />
          </div>
          <pre>{JSON.stringify(certainEndYear, null, 2)}</pre>

          <Heading as="h2">Input: 1979-1X-11/2016-0X-2X</Heading>
          <div style={{ height: '150px' }}>
            <TimespanWrapper data={certainBeginAndEndYear} />
          </div>
          <pre>{JSON.stringify(certainBeginAndEndYear, null, 2)}</pre>

          <Heading as="h2">Error tests</Heading>
          <p>How should error be handeled? We could use the error to highlight the part of the string where the illegal character appears.</p>

          <Heading as="h3">Input: 1979-1X- 11</Heading>
          <pre>{JSON.stringify(getTimespan('1979-1X- 11'), null, 2)}</pre>

          <Heading as="h3">Input: 1979-1X-åå</Heading>
          <pre>{JSON.stringify(getTimespan('1979-1X-åå'), null, 2)}</pre>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default EDTFinput;

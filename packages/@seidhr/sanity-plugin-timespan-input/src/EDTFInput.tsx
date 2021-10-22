import React from 'react'
import { getTimespan } from './functions/getTimespan'
import { Card, Container, Heading, ThemeProvider, studioTheme } from '@sanity/ui';
import Timespan from './viz';

const EDTFinput = () => {

  return (
    <ThemeProvider theme={studioTheme}>
      <Container width={5}>
        <Card width={3} margin={3} padding={4}>
          <Heading as="h1" size={5}>
            EDTF
          </Heading>
          <p>
            <span>Input: 2021-11-11</span>
            <pre>{JSON.stringify(getTimespan('2021-11-11'), null, 2)}</pre>
          </p>
          <p>
            <span>Input: 2021-11-11 20:00</span>
            <pre>{JSON.stringify(getTimespan('2021-11-11 20:00'), null, 2)}</pre>
          </p>
          <p>
            <span>Input: 2016-0X-2X</span>
            <pre>{JSON.stringify(getTimespan('2016-0X-2X'), null, 2)}</pre>
          </p>
          <p>
            <span>Input: /2016-0X-2X</span>
            <pre>{JSON.stringify(getTimespan('/2016-0X-2X'), null, 2)}</pre>
          </p>
          <p>
            <div style={{ height: '150px' }}>
              <Timespan data={getTimespan('1979-1X-11/2016-0X-2X')} />
            </div>
            <span>Input: 1979-1X-11/2016-0X-2X</span>
            <pre>{JSON.stringify(getTimespan('1979-1X-11/2016-0X-2X'), null, 2)}</pre>
          </p>
          <Heading as="h2">Error tests</Heading>
          <p>
            <span>Input: 1979-1X- 11</span>
            <pre>{JSON.stringify(getTimespan('1979-1X- 11'), null, 2)}</pre>
          </p>
          <p>
            <span>Input: 1979-1X-åå</span>
            <pre>{JSON.stringify(getTimespan('1979-1X-åå'), null, 2)}</pre>
          </p>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default EDTFinput;

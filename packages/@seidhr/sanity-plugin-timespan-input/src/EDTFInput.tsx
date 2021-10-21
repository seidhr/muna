import React from 'react'
import { getTimespan } from './functions/edtfToCRM'
import { Card, Container, Heading, ThemeProvider, studioTheme } from '@sanity/ui';

const EDTFinput = () => {

  return (
    <ThemeProvider theme={studioTheme}>
      <Container width={5}>
        <Card width={3} margin={3} padding={4}>
          <Heading as="h1" size={5}>
            EDTF
          </Heading>
          <p>
            <span>Input: 2016-0X-2X</span>
            <pre>{JSON.stringify(getTimespan('2016-0X-2X'), null, 2)}</pre>
          </p>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default EDTFinput;

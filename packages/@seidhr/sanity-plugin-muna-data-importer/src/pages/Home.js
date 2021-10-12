import React from 'react';
import { Card, Container, Heading, ThemeProvider, studioTheme } from '@sanity/ui';

const Home = () => {

  return (
    <ThemeProvider theme={studioTheme}>
      <Container width={5}>
        <Card width={3} margin={3} padding={4}>
          <Heading as="h1" size={5}>
            Muna data importer
          </Heading>
          <p>
            Very WIP. Will use:
          </p>
          <ul>
            <li>XState</li>
            <li>sanity-diff-patch</li>
            <li>Kulturnav</li>
            <li>NB.no</li>
            <li>Marcus</li>
          </ul>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Home;

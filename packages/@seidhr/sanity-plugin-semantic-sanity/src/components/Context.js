import React from 'react';
import { Box, Card, Code, Heading, Stack, Text } from '@sanity/ui';

const Context = ({ context }) => {
  return (
    <Box>
      <Stack space={4}>
        <Heading as="h2" size={3}>
          JSON-LD Context
        </Heading>
        <Text>
          JSON-LD context that can be linked to when sharing data from Sanity to external semantic systems.
        </Text>
      </Stack>
      <Card marginTop={4} padding={3} shadow={1}>
        <Code style={{maxHeight: '65vh', overflow: 'scroll'}} language="json" size={0}>
          {JSON.stringify(context, null, 2)}
        </Code>
      </Card>
    </Box>
  );
};

export default Context;

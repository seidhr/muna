import React from 'react';
import { Box, Card, Code, Heading, Stack, Text } from '@sanity/ui';

const Ontology = ({ ontology }) => {
  return (
    <Box>
      <Stack space={4}>
        <Heading as="h2" size={3}>
          Ontology
        </Heading>
        <Text>
          Sanity Schemas as OWL ontology.
        </Text>
      </Stack>
      <Card marginTop={4} padding={3} shadow={1}>
        <Code style={{maxHeight: '65vh', overflow: 'scroll'}}  language="json" size={0}>
          {JSON.stringify(ontology, null, 2)}
        </Code>
      </Card>
    </Box>
  );
};

export default Ontology;

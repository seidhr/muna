import React from 'react';
import _ from 'lodash';
import { Card, Container, Grid, Heading, Stack, Text, ThemeProvider, studioTheme } from '@sanity/ui';
import { getOntology } from './functions/getOntology';
import { getFields } from "./functions/getFields";
import { getContext } from "./functions/getContext";
import { orderSchemas } from "./functions/orderSchemas";
import Context from './components/Context';
import Ontology from './components/Ontology';

const Home = ({ sourceSchemas }) => {
  if (!sourceSchemas) {
    return (
      <Card
        padding={[3, 3, 4]}
        radius={2}
        shadow={1}
        tone="critical"
      >
        No schemas provided!
      </Card>
    )
  }

  const orderedSchemas = orderSchemas(sourceSchemas)
  const ontology = getOntology(orderedSchemas)
  console.log(orderedSchemas)
  let { context, base } = getContext()
  orderedSchemas
    .forEach((type) => {
      context['@context'][type.name] = {
        '@id': type.options?.semanticSanity?.context?.['@id'] ? type.options.semanticSanity.context['@id'] : `${base}${type.name}`,
        '@context': getFields(type.fields, base),
      };
    });

  return (
    <ThemeProvider theme={studioTheme}>
      <Container width={5}>
        <Card width={3} margin={3} padding={4}>
          <Stack space={4}>
            <Heading as="h1" size={5}>
              Semantic Sanity
            </Heading>
            <Text>
              Based on your settings your schemas has been converted to an OWL ontology and JSON-LD context.
            </Text>
            <Card
              padding={[3, 3, 4]}
              radius={2}
              shadow={1}
              tone="positive"
            >
              TIP! Create an API endpoint and dump the content of Sanity with a JSON-LD Context, convert the result to RDF and feed the result along with the ontology into a Sparql endpoint!
            </Card>
          </Stack>
        </Card>
        <Grid columns={[1, 2, 2, 2]} gap={[3, 3, 3, 6]} paddingX={5}>
          <Ontology ontology={ontology} />
          <Context context={context} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Home;

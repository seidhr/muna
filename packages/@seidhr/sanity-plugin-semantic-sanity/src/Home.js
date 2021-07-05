import React from 'react';
import _ from 'lodash';
import { Card, Container, Grid, Heading, Stack, Text } from '@sanity/ui';
import { getFields, getContext, getOntolgy, orderSchemas } from './lib';
import Context from './components/Context';
import Ontology from './components/Ontology';

const Home = ({ types }) => {
  let {context, base} = getContext()
  const orderedClasses = orderSchemas(types)
  const filteredClasses = orderedClasses.filter(_class => _class.options?.jsonld?.exclude != true)
  const ontology = getOntolgy(filteredClasses)

  filteredClasses
    .forEach((type) => {
      context['@context'][type.name] = {
        '@id': type.options?.jsonld?.context?.['@id'] ? type.options.jsonld.context?.['@id'] : `${base}${type.name}`,
        '@context': getFields(type.fields, base),
      };
    });

  return (
    <Container width={5}>
      <Card width={3} margin={3} padding={4}>
        <Stack space={4}>
          <Heading as="h1" size={5}>
            Semantic Sanity
          </Heading>
          <Text>
            Based on your settings your schemas has been converted to an OWL ontology and JSON-LD context. 
          </Text>
          <Text>
            Following schemas has been ignored: [TODO]
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
      <Grid columns={[1, 2, 2, 2]} gap={[3, 3, 3, 6]} padding={5}>
        <Ontology ontology={ontology} />
        <Context context={context} />
      </Grid>
    </Container>
  );
};

export default Home;

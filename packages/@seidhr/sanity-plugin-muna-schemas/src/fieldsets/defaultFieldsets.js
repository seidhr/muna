const defaultFieldsets = [
  {
    name: 'state',
    title: 'Status',
    options: {collapsible: true, collapsed: false, columns: 2},
  },
  {
    name: 'minimum',
    title: 'Basic metadata',
    options: {collapsible: true, collapsed: false},
  },
  {
    name: 'representation',
    title: 'Hovedbilde og IIIF manifest',
    options: {collapsible: true, collapsed: false},
  },
  {
    name: 'partsOfTheObject',
    title: 'Felt relatert til deler eller seksjoner',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'additionalInformation',
    title: 'Tekster i/om og avbildinger på objektet',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'visualObject',
    title: 'Felt relatert til visuelle objekt',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'linguisticObject',
    title: 'Felt relatert til tekstlige objekt',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'physicalDescription',
    title: 'Felt relatert til fysisk beskrivelse',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'collectionManagement',
    title: 'Felt relatert til samlingspleie',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'purpose',
    title: 'Fields related to the purpose of the activity',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'objects',
    title: 'Fields related to the objects or object types used',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'technique',
    title: 'Fields related to techniques, designs or procedures used',
    options: {collapsible: true, collapsed: true},
  },
  {
    name: 'documentation',
    title: 'Documentation',
    options: {collapsible: true, collapsed: false},
  },
]

export {defaultFieldsets}

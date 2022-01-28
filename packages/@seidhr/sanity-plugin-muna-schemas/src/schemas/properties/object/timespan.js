export const timespan = {
  name: 'timespan',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  type: 'array',
  of: [{ type: 'Timespan' }],
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
  validation: (Rule) => Rule.length(1).warning('You should only register one timespan'),
};

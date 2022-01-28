export default {
  widgets: [
    {
      name: 'widget-muna-docs',
      layout: {
        width: 'small'
      },
    },
    {
      name: 'project-users',
      layout: {
        height: 'auto'
      }
    },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/seidhr/muna',
            category: 'Code',
          },
        ],
      },
    },
  ],
}

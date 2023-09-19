export const data = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  description: 'A timeline visualization of the lives of the first five U.S. presidents.',
  width: 550,
  height: 30,
  padding: 5,

  data: [
    {
      name: 'people',
      values: [
        {
          label: 'Washington',
          bb: 1885,
          eb: 1914,
          be: 1936,
          ee: 1945,
        },
      ],
    },
  ],

  scales: [
    {
      name: 'yscale',
      type: 'band',
      range: [0, { signal: 'height' }],
      domain: { data: 'people', field: 'label' },
    },
    {
      name: 'xscale',
      type: 'point',
      align: 1,
      paddingOuter: 0,
      range: [0, { signal: 'width' }],
      domain: { data: 'people', fields: ['bb', 'eb', 'be', 'ee'] },
    },
  ],

  axes: [{ orient: 'bottom', scale: 'xscale' }],

  marks: [
    {
      type: 'text',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'bb' },
          y: { scale: 'yscale', field: 'label', offset: -3 },
          fill: { value: '#000' },
          text: { field: 'bb' },
          fontSize: { value: 10 },
        },
      },
    },
    {
      type: 'text',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'eb' },
          y: { scale: 'yscale', field: 'label', offset: -3 },
          fill: { value: '#000' },
          text: { field: 'eb' },
          fontSize: { value: 10 },
        },
      },
    },
    {
      type: 'text',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'be' },
          y: { scale: 'yscale', field: 'label', offset: -3 },
          fill: { value: '#000' },
          text: { field: 'be' },
          fontSize: { value: 10 },
        },
      },
    },
    {
      type: 'text',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'ee' },
          y: { scale: 'yscale', field: 'label', offset: -3 },
          fill: { value: '#000' },
          text: { field: 'ee' },
          fontSize: { value: 10 },
        },
      },
    },
    {
      type: 'rect',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'bb' },
          x2: { scale: 'xscale', field: 'eb' },
          //"y": {"scale": "yscale", "field": "label"},
          height: { value: 20 },
          fill: { value: '#557' },
        },
      },
    },
    {
      type: 'rect',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'eb' },
          x2: { scale: 'xscale', field: 'be' },
          //"y": {"scale": "yscale", "field": "label", "offset":-1},
          height: { value: 20 },
          fill: { value: '#e44' },
        },
      },
    },
    {
      type: 'rect',
      from: { data: 'people' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: 'be' },
          x2: { scale: 'xscale', field: 'ee' },
          //"y": {"scale": "yscale", "field": "label", "offset":-1},
          height: { value: 20 },
          fill: { value: '#557' },
        },
      },
    },
  ],
}

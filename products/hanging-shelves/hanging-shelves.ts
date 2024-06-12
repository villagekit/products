import type { Parts } from '@villagekit/design/kit'

const panelShortY: [number, number] = [-2, 3]
const panelLongY: [number, number] = [-7, 8]

export const parts: Parts = [
  post({
    x: 0,
    footSide: 'right',
  }),
  post({
    x: 15,
    footSide: 'right',
  }),
  post({
    x: 29,
    footSide: 'left',
  }),
  post({
    x: 44,
    footSide: 'left',
  }),

  // first row
  {
    type: 'gridbeam:x',
    x: [15, 45],
    y: 1,
    z: 10,
  },
  {
    type: 'gridbeam:x',
    x: [15, 45],
    y: -1,
    z: 10,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 11,
  },
  {
    type: 'gridpanel:xy',
    x: [30, 44],
    y: panelShortY,
    z: 11,
  },

  // second row
  {
    type: 'gridbeam:x',
    x: [0, 30],
    y: 1,
    z: 18,
  },
  {
    type: 'gridbeam:x',
    x: [0, 30],
    y: -1,
    z: 18,
  },
  {
    type: 'gridpanel:xy',
    x: [1, 15],
    y: panelLongY,
    z: 19,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 19,
  },

  // third row
  {
    type: 'gridbeam:x',
    x: [15, 45],
    y: 1,
    z: 26,
  },
  {
    type: 'gridbeam:x',
    x: [15, 45],
    y: -1,
    z: 26,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 27,
  },
  {
    type: 'gridpanel:xy',
    x: [30, 44],
    y: panelShortY,
    z: 27,
  },

  // fourth row
  {
    type: 'gridbeam:x',
    x: [15, 30],
    y: 1,
    z: 34,
  },
  {
    type: 'gridbeam:x',
    x: [15, 30],
    y: -1,
    z: 34,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 35,
  },

  // fifth row
  {
    type: 'gridbeam:x',
    x: [0, 30],
    y: 1,
    z: 42,
  },
  {
    type: 'gridbeam:x',
    x: [0, 30],
    y: -1,
    z: 42,
  },
  {
    type: 'gridpanel:xy',
    x: [1, 15],
    y: panelShortY,
    z: 43,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 43,
  },

  // sixth row
  {
    type: 'gridbeam:x',
    x: [0, 30],
    y: -1,
    z: 50,
  },
  {
    type: 'gridbeam:x',
    x: [15, 45],
    y: 1,
    z: 50,
  },
  {
    type: 'gridpanel:xy',
    x: [1, 15],
    y: panelShortY,
    z: 51,
  },
  {
    type: 'gridpanel:xy',
    x: [16, 29],
    y: panelShortY,
    z: 51,
  },
  {
    type: 'gridpanel:xy',
    x: [30, 44],
    y: panelShortY,
    z: 51,
  },
]

type PostOptions = {
  x: number
  footSide: 'right' | 'left'
}

function post(options: PostOptions): Parts {
  const { x, footSide } = options

  return [
    // bottom post
    {
      type: 'gridbeam:z',
      x,
      y: 0,
      z: [0, 30],
    },
    // top post
    {
      type: 'gridbeam:z',
      x,
      y: 0,
      z: [30, 60],
    },
    // post joiner
    {
      type: 'gridbeam:z',
      x,
      y: 1,
      z: [28, 33],
    },

    // bottom feet
    {
      type: 'gridbeam:x',
      x: footSide === 'right' ? [x, x + 2] : [x - 1, x + 1],
      y: 1,
      z: 1,
    },
    {
      type: 'gridbeam:y',
      x: footSide === 'right' ? x + 1 : x - 1,
      y: [-2, 4],
      z: 0,
    },

    // top extension
    {
      type: 'gridbeam:z',
      x,
      y: 1,
      z: [58, 63],
    },

    // top feet
    {
      type: 'gridbeam:x',
      x: footSide === 'right' ? [x, x + 2] : [x - 1, x + 1],
      y: 0,
      z: 61,
    },
    {
      type: 'gridbeam:y',
      x: footSide === 'right' ? x + 1 : x - 1,
      y: [-2, 4],
      z: 62,
    },
  ]
}

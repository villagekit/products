import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'

export const parameters = {
  seatWidth: {
    label: 'Seat width',
    shortId: 'sw',
    type: 'number',
    min: 5,
    max: 10,
    step: 5,
  },
  seatDepth: {
    label: 'Seat depth',
    shortId: 'sd',
    type: 'number',
    min: 6,
    max: 14,
    step: 2,
  },
  seatHeight: {
    label: 'Seat height',
    description: 'The height from the ground to the top of the seat',
    shortId: 'sh',
    type: 'number',
    min: 5,
    max: 15,
  },
  shouldIncludeBack: {
    label: 'Include back',
    shortId: 'b',
    type: 'boolean',
  },
  backHeight: {
    label: 'Back height',
    description: 'The height from the seat to the top of the backrest',
    shortId: 'bh',
    type: 'number',
    min: 5,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default-with-back',
    label: 'Default With Back',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 10,
      shouldIncludeBack: true,
    },
  },
  {
    id: 'default',
    label: 'Default (Without Back)',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 10,
      shouldIncludeBack: false,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatWidth, seatDepth, seatHeight, backHeight, shouldIncludeBack } = parameters

  return [
    // bottom left y
    {
      type: 'gridbeam:y',
      x: 1,
      y: [0, seatDepth],
      z: 0,
    },
    // bottom right y
    {
      type: 'gridbeam:y',
      x: seatWidth - 2,
      y: [0, seatDepth],
      z: 0,
    },
    // bottom x
    {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: 1,
      z: 1,
    },
    // left z leg
    {
      type: 'gridbeam:z',
      x: 0,
      y: 0,
      z: [0, seatHeight],
    },
    // right z leg
    {
      type: 'gridbeam:z',
      x: seatWidth - 1,
      y: 0,
      z: [0, seatHeight],
    },

    range(Math.floor((1 / 2) * seatDepth)).map((depthIndex) => ({
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: 2 * depthIndex - 1,
      z: seatHeight - 1,
    })),

    // top left y
    {
      type: 'gridbeam:y',
      x: 1,
      y: [-1, seatDepth - 1],
      z: seatHeight - 2,
    },
    // top right y
    {
      type: 'gridbeam:y',
      x: seatWidth - 2,
      y: [-1, seatDepth - 1],
      z: seatHeight - 2,
    },

    shouldIncludeBack && [
      // left back z
      {
        type: 'gridbeam:z',
        x: 0,
        y: seatDepth - 2,
        z: [seatHeight - 2, seatHeight + backHeight - 2],
      },
      // right back z
      {
        type: 'gridbeam:z',
        x: seatWidth - 1,
        y: seatDepth - 2,
        z: [seatHeight - 2, seatHeight + backHeight - 2],
      },
      // bottom back x
      {
        type: 'gridbeam:x',
        x: [0, seatWidth],
        y: seatDepth - 3,
        z: seatHeight + backHeight - 5,
      },
      // top back x
      {
        type: 'gridbeam:x',
        x: [0, seatWidth],
        y: seatDepth - 3,
        z: seatHeight + backHeight - 3,
      },
    ],
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

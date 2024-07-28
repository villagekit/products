import type { Params, PartsFn, Plugins, Presets } from '@villagekit/design/kit'

export const parameters = {
  seatWidth: {
    label: 'Seat width',
    shortId: 'sw',
    type: 'number',
    min: 10,
    max: 30,
    step: 10,
  },
  seatDepth: {
    label: 'Seat depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 15,
  },
  seatHeight: {
    label: 'Seat height',
    description: 'The height from the ground to the top of the seat',
    shortId: 'sh',
    type: 'number',
    min: 5,
    max: 15,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      seatDepth: 11,
      seatHeight: 10,
      seatWidth: 30,
    },
  },
]

export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatWidth, seatDepth, seatHeight } = parameters

  return [
    range(Math.floor((1 / 2) * seatDepth)).map((depthIndex) => [
      {
        type: 'gridbeam:x',
        x: [0, seatWidth],
        y: 2 * depthIndex,
        z: seatHeight - 1,
      },

      {
        type: 'gridbeam:z',
        x: 0,
        y: 2 * depthIndex + 1,
        z: [0, seatHeight],
      },
      {
        type: 'gridbeam:z',
        x: seatWidth - 1,
        y: 2 * depthIndex + 1,
        z: [0, seatHeight],
      },
    ]),

    seatDepth % 2 === 1 && {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: seatDepth - 1,
      z: seatHeight - 1,
    },

    {
      type: 'gridbeam:y',
      x: 1,
      y: [1, seatDepth - 1],
      z: seatHeight - 2,
    },
    {
      type: 'gridbeam:y',
      x: seatWidth - 2,
      y: [1, seatDepth - 1],
      z: seatHeight - 2,
    },
  ]
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

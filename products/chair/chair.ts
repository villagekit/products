import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
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
    id: 'regular',
    label: 'Regular',
    values: {
      seatHeight: 10,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatHeight } = parameters

  const seatDepth = 10
  const seatWidth = 10

  return [
    {
      type: 'gridpanel:xy',
      x: [0, seatWidth],
      y: [0, seatDepth],
      z: seatHeight,
    },

    {
      type: 'gridbeam:z',
      x: 0,
      y: 0,
      z: [0, seatHeight],
    },
    {
      type: 'gridbeam:z',
      x: seatWidth - 1,
      y: 0,
      z: [0, seatHeight],
    },
    {
      type: 'gridbeam:z',
      x: 0,
      y: seatDepth - 1,
      z: [0, seatHeight],
    },
    {
      type: 'gridbeam:z',
      x: seatWidth - 1,
      y: seatDepth - 1,
      z: [0, seatHeight],
    },

    {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: 1,
      z: seatHeight - 2,
    },
    {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: seatDepth - 2,
      z: seatHeight - 2,
    },

    {
      type: 'gridbeam:y',
      x: 1,
      y: [0, seatDepth],
      z: seatHeight - 1,
    },
    {
      type: 'gridbeam:y',
      x: seatWidth - 2,
      y: [0, seatDepth],
      z: seatHeight - 1,
    },
  ] satisfies Parts
}

import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 60,
    step: 5,
  },
  shelfWidth: {
    label: 'Shelf width',
    shortId: 'sw',
    type: 'number',
    min: 5,
    max: 10,
    step: 5,
  },
  shelfDepth: {
    label: 'Shelf depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 10,
    step: 5,
  },
  ladderOffset: {
    label: 'Ladder offset',
    shortId: 'lo',
    type: 'number',
    min: 0,
    max: 5,
  },
  shelfSpacing: {
    label: 'Shelf spacing',
    shortId: 'ss',
    type: 'number',
    min: 4,
    max: 15,
  },
  initialShelfOffset: {
    label: 'Initial shelf offset',
    shortId: 'iso',
    type: 'number',
    min: 0,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      height: 23,
      shelfWidth: 8,
      shelfDepth: 10,
      ladderOffset: 0,
      shelfSpacing: 7,
      initialShelfOffset: 0,
    },
  },
  {
    id: 'cat-ladder',
    label: 'Cat Ladder',
    values: {
      height: 23,
      shelfWidth: 8,
      shelfDepth: 10,
      ladderOffset: 3,
      shelfSpacing: 7,
      initialShelfOffset: 0,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { height, shelfWidth, shelfDepth, ladderOffset, shelfSpacing, initialShelfOffset } =
    parameters

  const numShelves = Math.ceil((height - initialShelfOffset) / shelfSpacing)

  return [
    {
      type: 'gridbeam:z',
      x: 0,
      y: 0,
      z: [0, height],
    },

    range(numShelves).map((shelfIndex) =>
      shelf({
        shelfWidth,
        shelfDepth,
        ladderOffset,
        ladderAlignment: shelfIndex % 2 === 0 ? 'left' : 'right',
        z:
          shelfIndex === numShelves - 1
            ? height
            : 2 + initialShelfOffset + shelfIndex * shelfSpacing,
      }),
    ),
  ] satisfies Parts
}

type ShelfOptions = {
  shelfWidth: number
  shelfDepth: number
  ladderOffset: number
  ladderAlignment: 'left' | 'right'
  z: number
}

function shelf(options: ShelfOptions): Parts {
  const { shelfWidth, shelfDepth, ladderOffset, ladderAlignment, z } = options

  switch (ladderAlignment) {
    case 'left':
      return [
        {
          type: 'gridbeam:x',
          x: [-1, 1],
          y: -1,
          z: z - 2,
        },
        {
          type: 'gridbeam:y',
          x: -1,
          y: [0, -shelfDepth],
          z: z - 1,
        },
        {
          type: 'gridpanel:xy',
          x: [
            Math.floor((-1 / 2) * shelfWidth) - ladderOffset,
            Math.ceil((1 / 2) * shelfWidth) - ladderOffset,
          ],
          y: [-1, -1 - shelfDepth],
          z: z,
        },
      ]
    case 'right':
      return [
        {
          type: 'gridbeam:x',
          x: [0, 2],
          y: -1,
          z: z - 2,
        },
        {
          type: 'gridbeam:y',
          x: 1,
          y: [0, -shelfDepth],
          z: z - 1,
        },
        {
          type: 'gridpanel:xy',
          x: [
            Math.floor((-1 / 2) * shelfWidth) + ladderOffset,
            Math.ceil((1 / 2) * shelfWidth) + ladderOffset,
          ],
          y: [-1, -1 - shelfDepth],
          z: z,
        },
      ]
  }
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

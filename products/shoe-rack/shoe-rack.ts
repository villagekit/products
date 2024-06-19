import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 15,
    max: 45,
    step: 5,
  },
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 5,
    max: 30,
  },
  shelfHeight: {
    label: 'Shelf Height',
    shortId: 'sh',
    type: 'number',
    min: 4,
    max: 15,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      height: 15,
      shelfHeight: 4,
      width: 30,
    },
  },
  {
    id: 'short',
    label: 'Short',
    values: {
      height: 5,
      shelfHeight: 4,
      width: 30,
    },
  },
  {
    id: 'tall',
    label: 'Tall',
    values: {
      height: 25,
      shelfHeight: 4,
      width: 30,
    },
  },
  {
    id: 'narrow',
    label: 'Narrow',
    values: {
      height: 15,
      shelfHeight: 4,
      width: 15,
    },
  },
  {
    id: 'wide',
    label: 'Wide',
    values: {
      height: 15,
      shelfHeight: 4,
      width: 45,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, height, shelfHeight } = parameters

  const depth = 7

  // 0-30 => 0, 31-45 => 2
  const numLegSupports = Math.max(Math.ceil((width - 30) / 15), 0)

  const numShelves = Math.max(Math.floor(height / shelfHeight), 1)

  return [
    {
      type: 'gridbeam:z',
      x: 0,
      y: 0,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: width - 1,
      y: 0,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: 0,
      y: depth - 1,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: width - 1,
      y: depth - 1,
      z: [0, height],
    },

    range(numShelves).map((shelfIndex): Parts => {
      const z = height - shelfIndex * (shelfHeight + 1) - 1

      if (z < 1) {
        return []
      }

      return [
        {
          type: 'gridbeam:x',
          x: [0, width],
          y: 1,
          z,
        },
        {
          type: 'gridbeam:x',
          x: [0, width],
          y: 3,
          z,
        },
        {
          type: 'gridbeam:x',
          x: [0, width],
          y: 5,
          z,
        },

        {
          type: 'gridbeam:y',
          x: 1 + 0,
          y: [0, depth],
          z: z - 1,
        },
        {
          type: 'gridbeam:y',
          x: width - 2 - 0,
          y: [0, depth],
          z: z - 1,
        },
      ]
    }),

    range(numLegSupports).map((legSupportIndex): Parts => {
      const legSupportOffsetMultiplier = 1 / (numLegSupports + 1)
      const legSupportOffset =
        Math.round(legSupportOffsetMultiplier * width * (legSupportIndex + 1)) - 1
      // nudge z posts towards the middle
      const legZSupportXNudge = legSupportIndex >= Math.floor(numLegSupports / 2) ? -1 : 1

      return [
        range(numShelves).map((shelfIndex): Parts => {
          const z = height - shelfIndex * (shelfHeight + 1) - 1

          if (z < 1) {
            return []
          }

          return [
            {
              type: 'gridbeam:y',
              x: legSupportOffset + legZSupportXNudge,
              y: [0, depth],
              z: z - 1,
            },
          ]
        }),

        {
          type: 'gridbeam:z',
          x: legSupportOffset,
          y: 0,
          z: [0, height],
        },
        {
          type: 'gridbeam:z',
          x: legSupportOffset,
          y: depth - 1,
          z: [0, height],
        },
      ]
    }),
  ]
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

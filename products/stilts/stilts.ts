import type { Params, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  poleHeight: {
    label: 'Pole height',
    shortId: 'ph',
    type: 'number',
    min: 10,
    max: 60,
    step: 10,
  },
  footHeight: {
    label: 'Foot height',
    shortId: 'fh',
    type: 'number',
    min: 2,
    max: 30,
  },
  footWidth: {
    label: 'Foot width',
    shortId: 'fw',
    type: 'number',
    min: 1,
    max: 4,
  },
  footDepth: {
    label: 'Foot depth',
    shortId: 'fd',
    type: 'number',
    min: 4,
    max: 10,
  },
  hasExtension: {
    label: 'Has extension',
    shortId: 'he',
    type: 'boolean',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      poleHeight: 30,
      footHeight: 7,
      footDepth: 5,
      footWidth: 2,
      hasExtension: false,
    },
  },
  {
    id: 'extended',
    label: 'Extended',
    values: {
      poleHeight: 30,
      footHeight: 7,
      footDepth: 5,
      footWidth: 2,
      hasExtension: true,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const {
    poleHeight,
    footHeight,
    footDepth,
    footWidth,
    hasExtension,
  } = parameters

  const poleSpacing = 5 + footWidth * 2

  return [
    {
      type: 'gridbeam:z',
      x: 0,
      y: 0,
      z: [0, poleHeight],
    },
    {
      type: 'gridbeam:z',
      x: poleSpacing,
      y: 0,
      z: [0, poleHeight],
    },

    hasExtension && [
      {
        type: 'gridbeam:z',
        x: 0,
        y: -1,
        z: [footHeight, footHeight + poleHeight],
      },
      {
        type: 'gridbeam:z',
        x: poleSpacing,
        y: -1,
        z: [footHeight, footHeight + poleHeight],
      },
    ],

    {
      type: 'gridbeam:x',
      x: [0, footWidth + 1],
      y: -1,
      z: footHeight - 1,
    },
    {
      type: 'gridbeam:x',
      x: [poleSpacing - footWidth, poleSpacing + 1],
      y: -1,
      z: footHeight - 1,
    },

    Array.from(Array(footWidth).keys()).map(i => {
      const offset = Math.floor(footDepth / 2)
      return [
        {
          type: 'gridbeam:y',
          x: 1 + i,
          y: [offset, -footDepth + offset],
          z: footHeight,
        },
        {
          type: 'gridbeam:y',
          x: poleSpacing - 1 - i,
          y: [offset, -footDepth + offset],
          z: footHeight,
        },
      ]
    }),
  ]
}

import type { Params, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  seatWidth: {
    label: 'Seat width',
    max: 60,
    min: 20,
    step: 5,
    type: 'number',
    shortId: 'sw',
  },
  seatDepth: {
    label: 'Seat depth',
    max: 10,
    min: 5,
    step: 5,
    type: 'number',
    shortId: 'sd',
  },
  seatHeight: {
    description: 'The height from the ground to the top of the seat',
    label: 'Seat height',
    max: 15,
    min: 5,
    type: 'number',
    shortId: 'sh',
  },
  widthOverhang: {
    description: 'How many grid units should the panel overhang the beams',
    label: 'Overhang',
    max: 4,
    min: 0,
    shortId: 'wo',
    type: 'number',
  },
  shouldIncludeBack: {
    label: 'Include back',
    type: 'boolean',
    shortId: 'b',
  },
  backHeight: {
    description: 'The height from the seat to the top of the backrest',
    label: 'Back height',
    max: 10,
    min: 5,
    step: 5,
    type: 'number',
    shortId: 'bh',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 30,
      shouldIncludeBack: false,
      widthOverhang: 3,
    },
  },
  {
    id: 'regular-with-back',
    label: 'Regular With Back',
    values: {
      backHeight: 10,
      seatDepth: 10,
      seatHeight: 10,
      seatWidth: 30,
      shouldIncludeBack: true,
      widthOverhang: 3,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { seatWidth, seatDepth, seatHeight, backHeight, widthOverhang, shouldIncludeBack } =
    parameters

  const backZBeamEndZ = shouldIncludeBack ? seatHeight + backHeight : seatHeight
  const seatPanelStartY = shouldIncludeBack ? 1 : 0
  const seatPanelEndY = shouldIncludeBack ? seatDepth + 1 : seatDepth

  // 0-30 => 0, 31-45 => 1, 46-60 => 2
  const numLegSupports = Math.ceil((seatWidth - 30) / 15)

  return [
    {
      type: 'gridpanel:xy',
      x: [0, seatWidth],
      y: [seatPanelStartY, seatPanelEndY],
      z: seatHeight,
    },

    shouldIncludeBack && {
      type: 'gridpanel:xz',
      x: [0, seatWidth],
      y: 1,
      z: [seatHeight + 1, seatHeight + 1 + backHeight],
    },

    {
      type: 'gridbeam:z',
      x: widthOverhang,
      y: 0,
      z: [0, backZBeamEndZ],
    },
    {
      type: 'gridbeam:z',
      x: seatWidth - 1 - widthOverhang,
      y: 0,
      z: [0, backZBeamEndZ],
    },
    {
      type: 'gridbeam:z',
      x: widthOverhang,
      y: seatDepth - 1,
      z: [0, seatHeight],
    },
    {
      type: 'gridbeam:z',
      x: seatWidth - 1 - widthOverhang,
      y: seatDepth - 1,
      z: [0, seatHeight],
    },

    {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: 1,
      z: seatHeight - 1,
    },
    {
      type: 'gridbeam:x',
      x: [0, seatWidth],
      y: seatDepth - 2,
      z: seatHeight - 1,
    },

    {
      type: 'gridbeam:y',
      x: 1 + widthOverhang,
      y: [0, seatDepth],
      z: seatHeight - 2,
    },
    {
      type: 'gridbeam:y',
      x: seatWidth - 2 - widthOverhang,
      y: [0, seatDepth],
      z: seatHeight - 2,
    },

    range(numLegSupports).map((legSupportIndex) => {
      const legSupportOffsetMultiplier = 1 / (numLegSupports + 1)
      const legSupportOffset =
        Math.round(legSupportOffsetMultiplier * seatWidth * (legSupportIndex + 1)) - 1
      // nudge z posts towards the middle
      const legZSupportXNudge = legSupportIndex >= Math.floor(numLegSupports / 2) ? -1 : 1

      return [
        {
          type: 'gridbeam:y',
          x: legSupportOffset + legZSupportXNudge,
          y: [0, seatDepth],
          z: seatHeight - 2,
        },
        {
          type: 'gridbeam:z',
          x: legSupportOffset,
          y: 0,
          z: [0, backZBeamEndZ],
        },
        {
          type: 'gridbeam:z',
          x: legSupportOffset,
          y: seatDepth - 1,
          z: [0, seatHeight],
        },
      ]
    }),
  ]
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

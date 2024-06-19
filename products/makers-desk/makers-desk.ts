import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  deskHeight: {
    label: 'Desk height',
    shortId: 'dh',
    type: 'number',
    min: 10,
    max: 30,
  },
  deskWidth: {
    label: 'Desk width',
    shortId: 'dw',
    type: 'number',
    min: 10,
    max: 30,
  },
  deskDepth: {
    label: 'Desk depth',
    shortId: 'dd',
    type: 'number',
    min: 15,
    max: 25,
    step: 5,
  },
  storageHeight: {
    label: 'Storage height',
    shortId: 'sh',
    type: 'number',
    min: 5,
    max: 10,
  },
  storageDepth: {
    label: 'Storage depth',
    shortId: 'sd',
    type: 'number',
    min: 5,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      deskHeight: 20,
      deskWidth: 30,
      deskDepth: 20,
      storageHeight: 10,
      storageDepth: 8,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { deskHeight, deskWidth, deskDepth, storageHeight, storageDepth } = parameters

  return [
    // desk panel
    {
      type: 'gridpanel:xy',
      x: [0, deskWidth - 2],
      y: [0, deskDepth],
      z: deskHeight,
    },
    // storage panel
    {
      type: 'gridpanel:xy',
      x: [-1, deskWidth - 1],
      y: [deskDepth - storageDepth, deskDepth],
      z: deskHeight + storageHeight,
    },

    // front left post
    {
      type: 'gridbeam:z',
      x: 1,
      y: 0,
      z: [0, deskHeight],
    },
    // middle left post
    {
      type: 'gridbeam:z',
      x: -1,
      y: deskDepth - storageDepth,
      z: [0, deskHeight + storageHeight],
    },
    // back left post
    {
      type: 'gridbeam:z',
      x: -1,
      y: deskDepth - 1,
      z: [0, deskHeight + storageHeight],
    },
    // front right post
    {
      type: 'gridbeam:z',
      x: deskWidth - 4,
      y: 0,
      z: [0, deskHeight],
    },
    // middle right post
    {
      type: 'gridbeam:z',
      x: deskWidth - 2,
      y: deskDepth - storageDepth,
      z: [0, deskHeight + storageHeight],
    },
    // back right post
    {
      type: 'gridbeam:z',
      x: deskWidth - 2,
      y: deskDepth - 1,
      z: [0, deskHeight + storageHeight],
    },

    // bottom left y
    {
      type: 'gridbeam:y',
      x: 0,
      y: [0, deskDepth],
      z: 0,
    },
    // bottom right y
    {
      type: 'gridbeam:y',
      x: deskWidth - 3,
      y: [0, deskDepth],
      z: 0,
    },
    // desk left y
    {
      type: 'gridbeam:y',
      x: 0,
      y: [0, deskDepth],
      z: deskHeight - 2,
    },
    // desk right y
    {
      type: 'gridbeam:y',
      x: deskWidth - 3,
      y: [0, deskDepth],
      z: deskHeight - 2,
    },
    // storage left y
    {
      type: 'gridbeam:y',
      x: 0,
      y: [deskDepth - storageDepth, deskDepth],
      z: deskHeight + storageHeight - 2,
    },
    // storage right y
    {
      type: 'gridbeam:y',
      x: deskWidth - 3,
      y: [deskDepth - storageDepth, deskDepth],
      z: deskHeight + storageHeight - 2,
    },

    // bottom left front x
    {
      type: 'gridbeam:x',
      x: [0, 2],
      y: 1,
      z: 1,
    },
    // bottom left middle x
    {
      type: 'gridbeam:x',
      x: [-1, 1],
      y: deskDepth - storageDepth + 1,
      z: 1,
    },
    // bottom left back x
    {
      type: 'gridbeam:x',
      x: [-1, 1],
      y: deskDepth - 2,
      z: 1,
    },
    // bottom right front x
    {
      type: 'gridbeam:x',
      x: [deskWidth - 4, deskWidth - 2],
      y: 1,
      z: 1,
    },
    // bottom right middle x
    {
      type: 'gridbeam:x',
      x: [deskWidth - 3, deskWidth - 1],
      y: deskDepth - storageDepth + 1,
      z: 1,
    },
    // bottom right back x
    {
      type: 'gridbeam:x',
      x: [deskWidth - 3, deskWidth - 1],
      y: deskDepth - 2,
      z: 1,
    },

    // desk left front x
    {
      type: 'gridbeam:x',
      x: [0, deskWidth - 2],
      y: 1,
      z: deskHeight - 1,
    },
    // desk left support x
    {
      type: 'gridbeam:x',
      x: [0, deskWidth - 2],
      y: Math.floor((deskDepth - storageDepth) / 2) + 1,
      z: deskHeight - 1,
    },
    // desk left storage front x
    {
      type: 'gridbeam:x',
      x: [-1, deskWidth - 1],
      y: deskDepth - storageDepth + 1,
      z: deskHeight - 1,
    },
    // desk left storage back x
    {
      type: 'gridbeam:x',
      x: [-1, deskWidth - 1],
      y: deskDepth - 2,
      z: deskHeight - 1,
    },

    // storage left front x
    {
      type: 'gridbeam:x',
      x: [-1, deskWidth - 1],
      y: deskDepth - storageDepth + 1,
      z: deskHeight + storageHeight - 1,
    },
    // storage left back x
    {
      type: 'gridbeam:x',
      x: [-1, deskWidth - 1],
      y: deskDepth - 2,
      z: deskHeight + storageHeight - 1,
    },
  ] satisfies Parts
}

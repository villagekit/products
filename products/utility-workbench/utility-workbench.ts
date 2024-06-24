import type { Params, Parts, PartsFn, Plugins, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  depth: {
    label: 'Depth',
    shortId: 'd',
    type: 'number',
    min: 10,
    max: 20,
    step: 10,
  },
  workHeight: {
    label: 'Work height',
    shortId: 'wh',
    type: 'number',
    min: 8,
    max: 30,
  },
  shelfHeight: {
    label: 'Shelf height',
    shortId: 'sh',
    type: 'number',
    min: 8,
    max: 30,
  },
  overhang: {
    label: 'Overhang',
    shortId: 'o',
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
      width: 30,
      depth: 20,
      workHeight: 20,
      shelfHeight: 15,
      overhang: 5,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, workHeight, shelfHeight, overhang } = parameters

  return [
    // front left z
    {
      type: 'gridbeam:z',
      x: overhang + 1,
      y: 0,
      z: [0, workHeight],
    },
    // back left z
    {
      type: 'gridbeam:z',
      x: overhang + 1,
      y: depth - 1,
      z: [0, workHeight],
    },
    // front right z
    {
      type: 'gridbeam:z',
      x: width - overhang - 2,
      y: 0,
      z: [0, workHeight],
    },
    // back right z
    {
      type: 'gridbeam:z',
      x: width - overhang - 2,
      y: depth - 1,
      z: [0, workHeight],
    },

    // left y
    {
      type: 'gridbeam:y',
      x: overhang,
      y: [0, depth],
      z: 1,
    },
    // right y
    {
      type: 'gridbeam:y',
      x: width - overhang - 1,
      y: [0, depth],
      z: 1,
    },
    // middle x
    {
      type: 'gridbeam:x',
      x: [overhang, width - overhang],
      y: Math.floor((1 / 2) * depth),
      z: 2,
    },
    // middle left z
    {
      type: 'gridbeam:z',
      x: overhang + 1,
      y: Math.floor((1 / 2) * depth) + 1,
      z: [1, 3],
    },
    // middle right z
    {
      type: 'gridbeam:z',
      x: width - overhang - 2,
      y: Math.floor((1 / 2) * depth) + 1,
      z: [1, 3],
    },

    // shelf left y
    {
      type: 'gridbeam:y',
      x: overhang,
      y: [0, depth],
      z: shelfHeight - 2,
    },
    // shelf right y
    {
      type: 'gridbeam:y',
      x: width - overhang - 1,
      y: [0, depth],
      z: shelfHeight - 2,
    },
    // shelf front x
    {
      type: 'gridbeam:x',
      x: [0, width],
      y: 1,
      z: shelfHeight - 1,
    },
    // shelf back x
    {
      type: 'gridbeam:x',
      x: [0, width],
      y: depth - 2,
      z: shelfHeight - 1,
    },
    // shelf panel
    {
      type: 'gridpanel:xy',
      x: [0, width],
      y: [1, depth - 1],
      z: shelfHeight,
    },

    // work left y
    {
      type: 'gridbeam:y',
      x: overhang,
      y: [0, depth],
      z: workHeight - 2,
    },
    // work right y
    {
      type: 'gridbeam:y',
      x: width - overhang - 1,
      y: [0, depth],
      z: workHeight - 2,
    },
    // work front x
    {
      type: 'gridbeam:x',
      x: [0, width],
      y: 1,
      z: workHeight - 1,
    },
    // work back x
    {
      type: 'gridbeam:x',
      x: [0, width],
      y: depth - 2,
      z: workHeight - 1,
    },
    // work panel
    {
      type: 'gridpanel:xy',
      x: [0, width],
      y: [0, depth],
      z: workHeight,
    },
  ] satisfies Parts
}

export const plugins: Plugins = ['smart-fasteners']

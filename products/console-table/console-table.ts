import type { Parts } from '@villagekit/design/kit'

const baseWidth = 20
const tableWidth = 30
const depth = 8
const height = 25

const widthOverhang = tableWidth - baseWidth
const widthOverhangLeft = Math.ceil((1 / 2) * widthOverhang)
const widthOverhangRight = Math.floor((1 / 2) * widthOverhang)

export const parts: Parts = [
  // left front beam z
  {
    type: 'gridbeam:z',
    x: 0,
    y: 0,
    z: [0, height],
  },
  // left back beam z
  {
    type: 'gridbeam:z',
    x: 0,
    y: depth - 1,
    z: [0, height],
  },
  // right front beam z
  {
    type: 'gridbeam:z',
    x: baseWidth - 1,
    y: 0,
    z: [0, height],
  },
  // right back beam z
  {
    type: 'gridbeam:z',
    x: baseWidth - 1,
    y: depth - 1,
    z: [0, height],
  },

  // bottom front beam x
  {
    type: 'gridbeam:x',
    x: [0, baseWidth],
    y: 1,
    z: 0,
  },
  // bottom back beam x
  {
    type: 'gridbeam:x',
    x: [0, baseWidth],
    y: depth - 2,
    z: 0,
  },

  // top front beam x
  {
    type: 'gridbeam:x',
    x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
    y: 1,
    z: height - 1,
  },
  // top back beam x
  {
    type: 'gridbeam:x',
    x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
    y: depth - 2,
    z: height - 1,
  },

  // bottom left beam y
  {
    type: 'gridbeam:y',
    x: 1,
    y: [0, depth],
    z: 1,
  },
  // bottom right beam y
  {
    type: 'gridbeam:y',
    x: baseWidth - 2,
    y: [0, depth],
    z: 1,
  },

  // top left beam y
  {
    type: 'gridbeam:y',
    x: 1,
    y: [0, depth],
    z: height - 2,
  },
  // top right beam y
  {
    type: 'gridbeam:y',
    x: baseWidth - 2,
    y: [0, depth],
    z: height - 2,
  },

  // top panel
  {
    type: 'gridpanel:xy',
    x: [-widthOverhangLeft, baseWidth + widthOverhangRight],
    y: [0, depth],
    z: height,
  },
]

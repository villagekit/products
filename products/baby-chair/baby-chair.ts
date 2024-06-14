import type { Parts } from '@villagekit/design/kit'

const backHeight = 12
const armHeight = 8
const seatHeight = 4
const chairDepth = 8
const chairWidth = 8

export const parts: Parts = [
  // front left z
  {
    type: 'gridbeam:z',
    x: 0,
    y: 0,
    z: [0, armHeight],
  },
  // front right z
  {
    type: 'gridbeam:z',
    x: chairWidth - 1,
    y: 0,
    z: [0, armHeight],
  },
  // back left z
  {
    type: 'gridbeam:z',
    x: 0,
    y: chairDepth - 1,
    z: [0, backHeight],
  },
  // back right z
  {
    type: 'gridbeam:z',
    x: chairWidth - 1,
    y: chairDepth - 1,
    z: [0, backHeight],
  },

  // bottom front x
  {
    type: 'gridbeam:x',
    x: [0, chairWidth],
    y: 1,
    z: seatHeight - 2,
  },
  // bottom back x
  {
    type: 'gridbeam:x',
    x: [0, chairWidth],
    y: chairDepth - 2,
    z: seatHeight - 2,
  },
  // top back x
  {
    type: 'gridbeam:x',
    x: [0, chairWidth],
    y: chairDepth,
    z: backHeight - 1,
  },
  // back panel
  {
    type: 'gridpanel:xz',
    x: [1, chairWidth - 1],
    y: chairDepth,
    z: [backHeight - 2, backHeight + 1],
  },

  // bottom left y
  {
    type: 'gridbeam:y',
    x: 1,
    y: [0, chairDepth],
    z: seatHeight - 1,
  },
  // bottom right y
  {
    type: 'gridbeam:y',
    x: chairWidth - 2,
    y: [0, chairDepth],
    z: seatHeight - 1,
  },
  // seat panel
  {
    type: 'gridpanel:xy',
    x: [1, chairWidth - 1],
    y: [0, chairDepth],
    z: seatHeight,
  },

  // arm left y
  {
    type: 'gridbeam:y',
    x: -1,
    y: [0, chairDepth],
    z: armHeight - 1,
  },
  // arm right y
  {
    type: 'gridbeam:y',
    x: chairWidth,
    y: [0, chairDepth],
    z: armHeight - 1,
  },
]

import type { Parts } from '@villagekit/design/kit'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

const legLength = 15
const width = 30
const height = 30

const legStart = Math.floor(-(1 / 2) * legLength)
const legEnd = Math.ceil((1 / 2) * legLength)

export const parts: Parts = [
  // bottom x beam
  GridBeam.X({
    x: [0, width],
    y: 0,
    z: 1,
  }),
  // top x beam
  GridBeam.X({
    x: [0, width],
    y: 0,
    z: height - 1,
  }),

  // left leg y beam
  GridBeam.Y({
    x: 1,
    y: [legStart, legEnd],
    z: 0,
  }),
  // right leg y beam
  GridBeam.Y({
    x: width - 2,
    y: [legStart, legEnd],
    z: 0,
  }),

  // left front post z beam
  GridBeam.Z({
    x: 0,
    y: -1,
    z: [0, height],
  }),
  // left back post z beam
  GridBeam.Z({
    x: 0,
    y: 1,
    z: [0, height],
  }),
  // right front post z beam
  GridBeam.Z({
    x: width - 1,
    y: -1,
    z: [0, height],
  }),
  // right back post z beam
  GridBeam.Z({
    x: width - 1,
    y: 1,
    z: [0, height],
  }),

  // top left support y beam
  GridBeam.Y({
    x: 1,
    y: [-1, 2],
    z: height - 2,
  }),
  // top right support y beam
  GridBeam.Y({
    x: width - 2,
    y: [-1, 2],
    z: height - 2,
  }),
]

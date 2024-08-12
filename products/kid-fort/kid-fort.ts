import type { Parts } from '@villagekit/design/kit'
import { radToDeg } from '@villagekit/math'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import type { RotateOptions } from '@villagekit/part/creator'

const gridLength = 0.04

const fortHeight = 30
const fortWidth = 30
const fortDepth = 30

const supportLength = 30
const supportHeight = 21
const supportAngle = calculateSupportAngle(supportLength, supportHeight)

function calculateSupportAngle(supportLength: number, supportHeight: number) {
  const height = supportHeight - 0.5
  const rads = Math.atan(height / Math.sqrt(supportLength ** 2 - height ** 2))
  return radToDeg(rads)
}

export const parts: Parts = [
  // front left z beam
  GridBeam.Z({
    x: 0,
    y: 0,
    z: [0, fortHeight],
  }),
  // front right z beam
  GridBeam.Z({
    x: fortWidth - 1,
    y: 0,
    z: [0, fortHeight],
  }),
  // back left z beam
  GridBeam.Z({
    x: 0,
    y: fortDepth - 1,
    z: [0, fortHeight],
  }),
  // back right z beam
  GridBeam.Z({
    x: fortWidth - 1,
    y: fortDepth - 1,
    z: [0, fortHeight],
  }),
  // front x beam
  GridBeam.X({
    x: [0, fortWidth],
    y: 1,
    z: fortHeight - 1,
  }),
  // back x beam
  GridBeam.X({
    x: [0, fortWidth],
    y: fortDepth - 2,
    z: fortHeight - 1,
  }),
  // left y beam
  GridBeam.Y({
    x: 1,
    y: [0, fortDepth],
    z: fortHeight - 2,
  }),
  // right y beam
  GridBeam.Y({
    x: fortWidth - 2,
    y: [0, fortDepth],
    z: fortHeight - 2,
  }),

  // left front support
  rotateGroup(
    [
      GridBeam.X({
        x: [1 - supportLength, 1],
        y: 1,
        z: supportHeight,
      }),
      GridBeam.X({
        x: [1 - supportLength, 1],
        y: fortDepth - 2,
        z: supportHeight,
      }),
      GridBeam.Y({
        x: 4 - supportLength,
        y: [0, fortDepth],
        z: supportHeight + 1,
      }),
    ],
    {
      direction: [0, 1, 0],
      angle: -90 + supportAngle,
      origin: [0, 0, supportHeight * gridLength],
    },
  ),

  /*
  // left back support
    GridBeam.create({
      variantId: '40mm:8mm:douglas-fir',
      lengthInGrids: supportLength,
    })
    .rotate({ direction: [0, 1, 0], angle: 90 + supportAngle })
    .translate([0, (fortDepth - 2) * gridLength, supportHeight * gridLength]),

  // left cross support
  GridBeam.create({
    variantId: '40mm:8mm:douglas-fir',
    lengthInGrids: supportLength,
  })
    .rotate({ direction: [0, 0, 1], angle: 90 })
    .translate([(4 - supportLength) * gridLength, 0, supportHeight * gridLength])
    .rotate({
      direction: [0, 1, 0],
      angle: -supportAngle,
      origin: [0, 0, supportHeight * gridLength],
    }),
  */

  // right front support
  GridBeam.create({
    variantId: '40mm:8mm:douglas-fir',
    lengthInGrids: supportLength,
  })
    .rotate({ direction: [0, 1, 0], angle: 90 - supportAngle })
    .translate([(fortWidth - 1) * gridLength, 1 * gridLength, supportHeight * gridLength]),

  // right back support
  GridBeam.create({
    variantId: '40mm:8mm:douglas-fir',
    lengthInGrids: supportLength,
  })
    .rotate({ direction: [0, 1, 0], angle: 90 - supportAngle })
    .translate([
      (fortWidth - 1) * gridLength,
      (fortDepth - 2) * gridLength,
      supportHeight * gridLength,
    ]),
]

function rotateGroup(parts: Array<GridBeam>, rotation: RotateOptions) {
  return parts.map((part) => part.rotate(rotation))
}

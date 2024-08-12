import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'
import { radToDeg } from '@villagekit/math'
import { GridBeam } from '@villagekit/part-gridbeam/creator'
import type { RotateOptions } from '@villagekit/part/creator'

export const parameters = {
  fortHeight: {
    label: 'Fort Height',
    shortId: 'fh',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  fortWidth: {
    label: 'Fort Width',
    shortId: 'fw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  fortDepth: {
    label: 'Fort Depth',
    shortId: 'fd',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  supportHeight: {
    label: 'Support Height',
    shortId: 'sh',
    type: 'number',
    min: 10,
    max: 30,
  },
  supportLength: {
    label: 'Support Length',
    shortId: 'sl',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      fortHeight: 30,
      fortWidth: 30,
      fortDepth: 30,
      supportLength: 30,
      supportHeight: 21,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { fortHeight, fortWidth, fortDepth, supportLength, supportHeight } = parameters

  const gridLength = 0.04

  const supportAngle = calculateSupportAngle(supportLength, supportHeight)

  return [
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

    // left supports
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

    // left supports
    rotateGroup(
      [
        GridBeam.X({
          x: [fortWidth - 1, fortWidth - 1 + supportLength],
          y: 1,
          z: supportHeight,
        }),
        GridBeam.X({
          x: [fortWidth - 1, fortWidth - 1 + supportLength],
          y: fortDepth - 2,
          z: supportHeight,
        }),
        GridBeam.Y({
          x: fortWidth - 1 + supportLength - 4,
          y: [0, fortDepth],
          z: supportHeight + 1,
        }),
      ],
      {
        direction: [0, 1, 0],
        angle: 90 - supportAngle,
        origin: [(fortWidth - 1) * gridLength, 0, supportHeight * gridLength],
      },
    ),
  ] satisfies Parts
}

function calculateSupportAngle(supportLength: number, supportHeight: number) {
  const height = supportHeight - 0.5
  const rads = Math.atan(height / Math.sqrt(supportLength ** 2 - height ** 2))
  return radToDeg(rads)
}

function rotateGroup(parts: Array<GridBeam>, rotation: RotateOptions) {
  return parts.map((part) => part.rotate(rotation))
}

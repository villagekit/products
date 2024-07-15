import type { Parts } from '@villagekit/design/kit'

const numUnitsX = 2
const numUnitsY = 2
const unitSizeX = 30
const unitSizeY = 20
const unitNumSupports = 2
const height = 5

export const parts: Parts = [
  range(numUnitsX).map(
    (xIndex): Parts => [
      range(numUnitsY).map(
        (yIndex): Parts => [
          createStageUnit({
            sizeX: unitSizeX,
            sizeY: unitSizeY,
            numSupports: unitNumSupports,
            height,
            offsetX: xIndex * unitSizeX,
            offsetY: yIndex * unitSizeY,
          }),
        ],
      ),
    ],
  ),
]

type StageUnitOptions = {
  sizeX: number
  sizeY: number
  numSupports: number
  height: number
  offsetX: number
  offsetY: number
}

function createStageUnit(options: StageUnitOptions): Parts {
  const { sizeX, sizeY, numSupports, height, offsetX, offsetY } = options

  const parts = [
    // left front beam z
    { type: 'gridbeam:z', x: 1, y: 0, z: [0, height] },
    // left back beam z
    { type: 'gridbeam:z', x: sizeX - 2, y: 0, z: [0, height] },
    // right front beam z
    { type: 'gridbeam:z', x: 1, y: sizeY - 1, z: [0, height] },
    // right front beam z
    { type: 'gridbeam:z', x: sizeX - 2, y: sizeY - 1, z: [0, height] },

    // front beam x
    { type: 'gridbeam:x', x: [0, sizeX], y: 1, z: height - 1 },
    // back beam x
    { type: 'gridbeam:x', x: [0, sizeX], y: sizeY - 2, z: height - 1 },

    // left beam y
    { type: 'gridbeam:y', x: 0, y: [0, sizeY], z: height - 2 },
    // right beam y
    { type: 'gridbeam:y', x: sizeX - 1, y: [0, sizeY], z: height - 2 },

    // supports
    range(numSupports).map((supportIndex) => {
      const supportOffsetMultiplier = 1 / (numSupports + 1)
      const supportOffset = Math.round(supportOffsetMultiplier * sizeY * (supportIndex + 1)) - 1
      return { type: 'gridbeam:x', x: [0, sizeX], y: supportOffset, z: height - 1 }
    }),

    // top panel
    { type: 'gridpanel:xy', x: [0, sizeX], y: [0, sizeY], z: height },
  ] satisfies Parts

  return parts.map(function offsetPart(part): Parts {
    if (Array.isArray(part)) return part.map(offsetPart)

    switch (part.type) {
      case 'gridbeam:x':
        return [{ ...part, x: [part.x[0] + offsetX, part.x[1] + offsetX], y: part.y + offsetY }]
      case 'gridbeam:y':
        return [{ ...part, x: part.x + offsetX, y: [part.y[0] + offsetY, part.y[1] + offsetY] }]
      case 'gridbeam:z':
        return [{ ...part, x: part.x + offsetX, y: part.y + offsetY }]
      case 'gridpanel:xy':
        return [
          {
            ...part,
            x: [part.x[0] + offsetX, part.x[1] + offsetX],
            y: [part.y[0] + offsetY, part.y[1] + offsetY],
          },
        ]
    }
  })
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

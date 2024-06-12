import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  unitHeight: {
    label: 'Unit height',
    shortId: 'uh',
    type: 'number',
    min: 10,
    max: 30,
    step: 10,
  },
  unitWidth: {
    label: 'Unit width',
    shortId: 'uw',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  unitDepth: {
    label: 'Unit depth',
    shortId: 'ud',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  numUnits: {
    label: 'Num units',
    shortId: 'nu',
    type: 'number',
    min: 1,
    max: 6,
  },
  boxHeight: {
    label: 'Box height',
    shortId: 'nu',
    type: 'number',
    min: 2,
    max: 10,
  }
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      unitHeight: 20,
      unitWidth: 15,
      unitDepth: 15,
      numUnits: 3,
      boxHeight: 5,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { unitHeight, unitWidth, unitDepth, numUnits, boxHeight } = parameters

  return [
    Array.from(Array(numUnits).keys()).map(unitIndex => {
      const totalBoxHeight = unitHeight - 3
      const requiredBoxHeight = boxHeight + 3
      const numBoxes = Math.floor(totalBoxHeight / requiredBoxHeight)
      const boxZs = Array.from(Array(numBoxes).keys()).map(boxIndex => {
        return totalBoxHeight - requiredBoxHeight * boxIndex - boxHeight
      })

      return unit({
        start: {
          x: 0 + unitWidth * unitIndex,
          y: 0,
          z: 0,
        },
        unitSize: {
          x: unitWidth,
          y: unitDepth,
          z: unitHeight,
        },
        boxHeight,
        boxZs,
      })
    })
  ]
}

type UnitOptions = {
  start: {
    x: number,
    y: number,
    z: number
  }
  unitSize: {
    x: number,
    y: number
    z: number
  }
  boxHeight: number
  boxZs: Array<number>
}

function unit(options: UnitOptions): Parts {
  const { start, unitSize, boxHeight, boxZs } = options
  return [
    {
      type: 'gridbeam:z',
      x: start.x,
      y: start.y,
      z: [start.z, start.z + unitSize.z],
    },
    {
      type: 'gridbeam:z',
      x: start.x + unitSize.x - 1,
      y: start.y,
      z: [start.z, start.z + unitSize.z],
    },
    {
      type: 'gridbeam:z',
      x: start.x,
      y: start.y + unitSize.y - 1,
      z: [start.z, start.z + unitSize.z],
    },
    {
      type: 'gridbeam:z',
      x: start.x + unitSize.x - 1,
      y: start.y + unitSize.y - 1,
      z: [start.z, start.z + unitSize.z],
    },

    boxZs.map((z): Parts => [
      {
        type: 'gridbeam:x',
        x: [start.x, start.x + unitSize.x],
        y: start.y + 1,
        z: z - 2,
      },
      {
        type: 'gridbeam:x',
        x: [start.x, start.x + unitSize.x],
        y: start.y + unitSize.y - 2,
        z: z - 2,
      },
      {
        type: 'gridbeam:y',
        x: start.x + 1,
        y: [start.y, start.y + unitSize.y],
        z: z - 1,
      },
      {
        type: 'gridbeam:y',
        x: start.x + unitSize.x - 2,
        y: [start.y, start.y + unitSize.y],
        z: z - 1,
      },

      box({
        start: {
          x: start.x + 1.5,
          y: start.y + 1.5,
          z: z + 0.5,
        },
        size: {
          x: unitSize.x - 3,
          y: unitSize.y - 3,
          z: boxHeight,
        },
      })
    ]),

    {
      type: 'gridbeam:y',
      x: start.x + 1,
      y: [start.y, start.y + unitSize.y],
      z: unitSize.z - 2,
    },
    {
      type: 'gridbeam:y',
      x: start.x + unitSize.x - 2,
      y: [start.y, start.y + unitSize.y],
      z: unitSize.z - 2,
    },
    {
      type: 'gridbeam:x',
      x: [start.x, start.x + unitSize.x],
      y: start.y + 1,
      z: unitSize.z - 1,
    },
    {
      type: 'gridbeam:x',
      x: [start.x, start.x + unitSize.x],
      y: start.y + unitSize.y - 2,
      z: unitSize.z - 1,
    },

    {
      type: 'gridpanel:xy',
      x: [start.x, start.x + unitSize.x],
      y: [start.y, start.y + unitSize.y],
      z: unitSize.z,
      fit: 'bottom',
    }
  ]
}

type BoxOptions = {
  start: {
    x: number,
    y: number,
    z: number
  }
  size: {
    x: number,
    y: number
    z: number
  }
}

function box(options: BoxOptions): Parts {
  const { start, size } = options

  return [
    // bottom
    {
      type: 'gridpanel:xy',
      x: [start.x, start.x + size.x],
      y: [start.y, start.y + size.y],
      z: start.z - 1,
      fit: 'top',
    },
    // front
    {
      type: 'gridpanel:xz',
      x: [start.x, start.x + size.x],
      y: start.y - 1,
      z: [start.z, start.z + size.z],
      fit: 'top',
    },
    // back
    {
      type: 'gridpanel:xz',
      x: [start.x, start.x + size.x],
      y: start.y + size.y,
      z: [start.z, start.z + size.z],
      fit: 'bottom',
    },
    // left
    {
      type: 'gridpanel:yz',
      x: start.x - 1,
      y: [start.y, start.y + size.y],
      z: [start.z, start.z + size.z],
      fit: 'top',
    },
    // right
    {
      type: 'gridpanel:yz',
      x: start.x + size.x,
      y: [start.y, start.y + size.y],
      z: [start.z, start.z + size.z],
      fit: 'bottom',
    },
  ]
}

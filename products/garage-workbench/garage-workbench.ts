import type { Parts } from '@villagekit/design/kit'

export const parts: Parts = [
  unit({
    start: {
      x: 0,
      y: 0,
      z: 0,
    },
    unitSize: {
      x: 15,
      y: 15,
      z: 20,
    },
    boxHeight: 5,
    boxZs: [
      4,
      12
    ]
  })
]

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

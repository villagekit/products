import type { Params, Part, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    label: 'Width',
    max: 60,
    min: 10,
    step: 5,
    shortId: 'w',
    type: 'number',
  },
  depth: {
    label: 'Depth',
    max: 20,
    min: 5,
    step: 5,
    shortId: 'd',
    type: 'number',
  },
  height: {
    label: 'Height',
    max: 60,
    min: 20,
    step: 5,
    shortId: 'h',
    type: 'number',
  },
  heightPerShelf: {
    label: 'Height per shelf',
    max: 20,
    min: 4,
    shortId: 'hs',
    type: 'number',
  },
  usePanelsForSides: {
    label: 'Use panels for sides',
    shortId: 'ps',
    type: 'boolean',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      depth: 10,
      height: 40,
      heightPerShelf: 10,
      usePanelsForSides: false,
      width: 40,
    },
  },
  {
    id: 'tall',
    label: 'Tall',
    values: {
      depth: 10,
      height: 60,
      heightPerShelf: 10,
      usePanelsForSides: false,
      width: 40,
    },
  },
  {
    id: 'shallow',
    label: 'Shallow',
    values: {
      depth: 5,
      height: 40,
      heightPerShelf: 10,
      usePanelsForSides: false,
      width: 40,
    },
  },
  {
    id: 'deep',
    label: 'Deep',
    values: {
      depth: 20,
      height: 40,
      heightPerShelf: 20,
      usePanelsForSides: false,
      width: 40,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, heightPerShelf, usePanelsForSides } = parameters

  const numShelves = Math.floor(height / heightPerShelf)

  const rackWidth = Math.floor(width / 2)
  const shelfWidth = width - rackWidth

  const createShelf = (shelfHeight: number): Parts => {
    return [
      createPanelsY({
        depth,
        panel: {
          options: {
            x: [1, shelfWidth + 1],
            z: shelfHeight,
          },
          type: 'xy',
        },
      }),

      {
        type: 'gridbeam:y',
        x: 1,
        y: [0, depth],
        z: shelfHeight - 1,
      },
      {
        type: 'gridbeam:y',
        x: shelfWidth,
        y: [0, depth],
        z: shelfHeight - 1,
      },
    ]
  }

  return [
    usePanelsForSides
      ? [
          createPanelsY({
            depth,
            panel: {
              options: {
                fit: 'top',
                x: 0,
                z: [1, height + 1],
              },
              type: 'yz',
            },
          }),

          createPanelsY({
            depth,
            panel: {
              options: {
                x: shelfWidth + 1,
                z: [1, height + 1],
              },
              type: 'yz',
            },
          }),

          createPanelsY({
            depth,
            panel: {
              options: {
                x: width + 1,
                z: [1, height + 1],
              },
              type: 'yz',
            },
          }),
        ]
      : [
          {
            type: 'gridbeam:z',
            x: usePanelsForSides ? 1 : 0,
            y: depth - 1,
            z: [1, height + 1],
          },
          {
            type: 'gridbeam:z',
            x: usePanelsForSides ? 1 : 0,
            y: 0,
            z: [1, height + 1],
          },
          {
            type: 'gridbeam:z',
            x: shelfWidth + 1,
            y: depth - 1,
            z: [1, height + 1],
          },
          {
            type: 'gridbeam:z',
            x: shelfWidth + 1,
            y: 0,
            z: [1, height + 1],
          },
          {
            type: 'gridbeam:z',
            x: width + 1,
            y: depth - 1,
            z: [1, height + 1],
          },
          {
            type: 'gridbeam:z',
            x: width + 1,
            y: 0,
            z: [1, height + 1],
          },
        ],

    {
      type: 'gridbeam:y',
      x: width,
      y: [0, depth],
      z: 1,
    },
    {
      type: 'gridbeam:y',
      x: 1,
      y: [0, depth],
      z: 1,
    },
    {
      type: 'gridbeam:y',
      x: shelfWidth,
      y: [0, depth],
      z: 1,
    },

    {
      type: 'gridbeam:x',
      x: [1, width + 1],
      y: 0,
      z: 0,
    },
    {
      type: 'gridbeam:x',
      x: [1, width + 1],
      y: depth - 1,
      z: 0,
    },

    {
      type: 'gridpanel:xy',
      x: [1, shelfWidth + 1],
      y: [0, depth],
      z: 2,
    },

    range(1, numShelves).map((shelfIndex): Parts => {
      const shelfHeight = height - shelfIndex * heightPerShelf + 1

      return createShelf(shelfHeight)
    }),

    createPanelsY({
      depth,
      panel: {
        options: {
          x: [1, width + 1],
          z: height + 1,
        },
        type: 'xy',
      },
    }),

    {
      type: 'gridbeam:y',
      x: 1,
      y: [0, depth],
      z: height,
    },
    {
      type: 'gridbeam:y',
      x: shelfWidth,
      y: [0, depth],
      z: height,
    },
    {
      type: 'gridbeam:y',
      x: width,
      y: [0, depth],
      z: height,
    },
  ] satisfies Parts
}

interface CreatePanelsYOptions {
  depth: number
  panel:
    | {
        type: 'xy'
        options: {
          x: [number, number]
          z: number
          fit?: 'top' | 'bottom'
        }
      }
    | {
        type: 'yz'
        options: {
          x: number
          z: [number, number]
          fit?: 'top' | 'bottom'
        }
      }
}

function createPanelsY(options: CreatePanelsYOptions): Parts {
  const { depth, panel } = options

  const numTenPanels = Math.floor(depth / 10)
  const numFivePanels = Math.floor((depth % 10) / 5)

  return [
    range(numTenPanels).map((tenPanelIndex): Part => {
      const y: [number, number] = [10 * tenPanelIndex, 10 * (tenPanelIndex + 1)]

      return panel.type === 'xy'
        ? { type: 'gridpanel:xy', y, ...panel.options }
        : { type: 'gridpanel:yz', y, ...panel.options }
    }),
    range(numTenPanels * 2, numTenPanels * 2 + numFivePanels).map((fivePanelIndex): Part => {
      const y: [number, number] = [5 * fivePanelIndex, 5 * (fivePanelIndex + 1)]

      return panel.type === 'xy'
        ? { type: 'gridpanel:xy', y, ...panel.options }
        : { type: 'gridpanel:yz', y, ...panel.options }
    }),
  ]
}

function range(end: number): Array<number>
function range(start: number, end: number): Array<number>
function range(...args: [number] | [number, number]): Array<number> {
  const [start, end] = args.length === 1 ? [0, args[0]] : [args[0], args[1]]
  const length = end - start
  return Array.from(Array(length).keys()).map((i) => i + start)
}

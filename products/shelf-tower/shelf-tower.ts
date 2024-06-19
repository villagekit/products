import type { Params, Part, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    label: 'Width',
    max: 30,
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
    min: 10,
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
      height: 30,
      heightPerShelf: 10,
      usePanelsForSides: false,
      width: 15,
    },
  },
  {
    id: 'short',
    label: 'Short',
    values: {
      depth: 10,
      height: 15,
      heightPerShelf: 5,
      usePanelsForSides: false,
      width: 15,
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
      width: 15,
    },
  },
  {
    id: 'shallow',
    label: 'Shallow',
    values: {
      depth: 5,
      height: 20,
      heightPerShelf: 5,
      usePanelsForSides: false,
      width: 15,
    },
  },
  {
    id: 'deep',
    label: 'Deep',
    values: {
      depth: 20,
      height: 30,
      heightPerShelf: 10,
      usePanelsForSides: false,
      width: 15,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, heightPerShelf, usePanelsForSides } = parameters

  const numShelves = Math.floor(height / heightPerShelf)

  const createShelf = (shelfHeight: number): Parts => {
    return [
      createPanelsY({
        depth,
        panel: {
          options: {
            x: [1, width + 1],
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
        x: width,
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
                z: [0, height],
              },
              type: 'yz',
            },
          }),
          createPanelsY({
            depth,
            panel: {
              options: {
                x: width + 1,
                z: [0, height],
              },
              type: 'yz',
            },
          }),
        ]
      : [
          {
            type: 'gridbeam:z',
            x: 0,
            y: depth - 1,
            z: [0, height],
          },
          {
            type: 'gridbeam:z',
            x: 0,
            y: 0,
            z: [0, height],
          },
          {
            type: 'gridbeam:z',
            x: width + 1,
            y: depth - 1,
            z: [0, height],
          },
          {
            type: 'gridbeam:z',
            x: width + 1,
            y: 0,
            z: [0, height],
          },
        ],

    range(numShelves).map((shelfIndex): Parts => {
      const shelfHeight = height - shelfIndex * heightPerShelf

      return createShelf(shelfHeight)
    }),
  ]
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

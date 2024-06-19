import type { Params, Part, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    label: 'Width',
    max: 30,
    min: 5,
    shortId: 'w',
    step: 5,
    type: 'number',
  },
  depth: {
    label: 'Depth',
    max: 30,
    min: 5,
    shortId: 'd',
    step: 5,
    type: 'number',
  },
  height: {
    label: 'Height',
    max: 20,
    min: 5,
    shortId: 'h',
    type: 'number',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      depth: 15,
      height: 10,
      width: 15,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height } = parameters

  return [
    createPanelsY({
      depth: depth,
      panel: {
        options: {
          x: [0, width],
          z: height,
        },
        type: 'xy',
      },
    }),

    {
      type: 'gridbeam:z',
      x: 1,
      y: 1,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: width - 2,
      y: 1,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: 1,
      y: depth - 2,
      z: [0, height],
    },
    {
      type: 'gridbeam:z',
      x: width - 2,
      y: depth - 2,
      z: [0, height],
    },

    {
      type: 'gridbeam:x',
      x: [0, width],
      y: 0,
      z: height - 2,
    },
    {
      type: 'gridbeam:x',
      x: [0, width],
      y: depth - 1,
      z: height - 2,
    },

    {
      type: 'gridbeam:y',
      x: 0,
      y: [0, depth],
      z: height - 1,
    },
    {
      type: 'gridbeam:y',
      x: width - 1,
      y: [0, depth],
      z: height - 1,
    },
  ] satisfies Parts
}

export interface CreatePanelsYOptions {
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

export function createPanelsY(options: CreatePanelsYOptions): Parts {
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

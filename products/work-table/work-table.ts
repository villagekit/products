import type { Params, Part, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  width: {
    type: 'number',
    label: 'Width',
    shortId: 'w',
    max: 60,
    min: 10,
    step: 5,
  },
  depth: {
    type: 'number',
    label: 'Depth',
    shortId: 'd',
    max: 30,
    min: 10,
    step: 10,
  },
  height: {
    type: 'number',
    label: 'Height',
    shortId: 'h',
    max: 30,
    min: 8,
  },
  shouldIncludePanels: {
    type: 'boolean',
    label: 'Top panels',
    description: 'Should include panels on top',
    shortId: 'p',
  },
  hasWidthwiseBottoms: {
    type: 'boolean',
    label: 'Width-wise bottoms',
    description: 'Should include width-wise bottom beams',
    shortId: 'bw',
  },
  hasDepthwiseBottoms: {
    type: 'boolean',
    label: 'Depth-wise bottoms',
    description: 'Should include depth-wise bottom beams',
    shortId: 'bd',
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'large',
    label: 'Large',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'large-tall',
    label: 'Large Tall',
    values: {
      depth: 30,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'large-short',
    label: 'Large Short',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 60,
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'medium-tall',
    label: 'Medium Tall',
    values: {
      depth: 30,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'medium-short',
    label: 'Medium Short',
    values: {
      depth: 30,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 30,
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      depth: 20,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 20,
      shouldIncludePanels: true,
      width: 20,
    },
  },
  {
    id: 'small-tall',
    label: 'Small Tall',
    values: {
      depth: 20,
      hasDepthwiseBottoms: true,
      hasWidthwiseBottoms: true,
      height: 30,
      shouldIncludePanels: true,
      width: 20,
    },
  },
  {
    id: 'small-short',
    label: 'Small Short',
    values: {
      depth: 20,
      hasDepthwiseBottoms: false,
      hasWidthwiseBottoms: false,
      height: 10,
      shouldIncludePanels: true,
      width: 20,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { width, depth, height, hasWidthwiseBottoms, hasDepthwiseBottoms, shouldIncludePanels } =
    parameters

  const panelWidth = 10
  const numPanels = Math.floor(depth / panelWidth)

  const panelSupportsPer = 20
  const numPanelSupports = Math.ceil(width / panelSupportsPer) + 1
  const gridsPerPanelSupport = Math.floor(width / (numPanelSupports - 1))

  return [
    shouldIncludePanels &&
      range(numPanels).map((index: number): Part => {
        return {
          type: 'gridpanel:xy',
          x: [0, width],
          y: [index * panelWidth, (index + 1) * panelWidth],
          z: height,
        }
      }),

    range(numPanelSupports - 1).map((index: number): Part => {
      const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

      return {
        type: 'gridbeam:y',
        x: index * gridsPerPanelSupport + xOffset,
        y: [0, depth],
        z: height - 1,
      }
    }),
    {
      type: 'gridbeam:y',
      x: width - 1,
      y: [0, depth],
      z: height - 1,
    },

    range(numPanelSupports - 1).map((index: number): Parts => {
      return [
        {
          type: 'gridbeam:z',
          x: index * gridsPerPanelSupport,
          y: 1,
          z: [0, height],
        },
        {
          type: 'gridbeam:z',
          x: index * gridsPerPanelSupport,
          y: depth - 2,
          z: [0, height],
        },
      ]
    }),
    {
      type: 'gridbeam:z',
      x: width - 2,
      y: 1,
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

    hasDepthwiseBottoms && [
      range(numPanelSupports - 1).map((index: number): Part => {
        const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

        return {
          type: 'gridbeam:y',
          x: index * gridsPerPanelSupport + xOffset,
          y: [0, depth],
          z: 1,
        }
      }),
      {
        type: 'gridbeam:y',
        x: width - 1,
        y: [0, depth],
        z: 1,
      },

      !hasWidthwiseBottoms && [
        range(numPanelSupports - 1).map((index: number): Parts => {
          const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

          return [
            {
              type: 'gridbeam:x',
              x: [index * gridsPerPanelSupport, index * gridsPerPanelSupport + 2 * xOffset],
              y: 0,
              z: 2,
            },
            {
              type: 'gridbeam:x',
              x: [index * gridsPerPanelSupport, index * gridsPerPanelSupport + 2 * xOffset],
              y: depth - 1,
              z: 2,
            },
          ]
        }),

        {
          type: 'gridbeam:x',
          x: [width - 2, width],
          y: 0,
          z: 2,
        },
        {
          type: 'gridbeam:x',
          x: [width - 2, width],
          y: depth - 1,
          z: 2,
        },
      ],
    ],

    hasWidthwiseBottoms && [
      {
        type: 'gridbeam:x',
        x: [0, width],
        y: 0,
        z: 2,
      },
      {
        type: 'gridbeam:x',
        x: [0, width],
        y: depth - 1,
        z: 2,
      },

      !hasDepthwiseBottoms && [
        range(numPanelSupports - 1).map((index: number): Parts => {
          const xOffset = index / numPanelSupports < 1 / 2 ? 1 : -1

          return [
            {
              type: 'gridbeam:y',
              x: index * gridsPerPanelSupport + xOffset,
              y: [0, 2],
              z: 1,
            },
            {
              type: 'gridbeam:y',
              x: index * gridsPerPanelSupport + xOffset,
              y: [depth - 2, depth],
              z: 1,
            },
          ]
        }),
        {
          type: 'gridbeam:y',
          x: width - 1,
          y: [0, 2],
          z: 1,
        },
        {
          type: 'gridbeam:y',
          x: width - 1,
          y: [depth - 2, depth],
          z: 1,
        },
      ],
    ],
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

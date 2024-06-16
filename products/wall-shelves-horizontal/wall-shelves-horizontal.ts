import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  height: {
    label: 'Height',
    shortId: 'h',
    type: 'number',
    min: 10,
    max: 60,
    step: 5,
  },
  shelfPanelWidth: {
    label: 'Shelf panel width',
    shortId: 'spw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  shelfPanelDepth: {
    label: 'Shelf panel depth',
    shortId: 'spd',
    type: 'number',
    min: 2,
    max: 5,
  },
  shelfBeamWidth: {
    label: 'Shelf beam width',
    shortId: 'sbw',
    type: 'number',
    min: 10,
    max: 30,
    step: 5,
  },
  postSpacing: {
    label: 'Post spacing',
    shortId: 'ps',
    type: 'number',
    min: 5,
    max: 15,
  },
  shelfSpacing: {
    label: 'Shelf spacing',
    shortId: 'ss',
    type: 'number',
    min: 4,
    max: 15,
  },
  initialShelfOffset: {
    label: 'Initial shelf offset',
    shortId: 'iso',
    type: 'number',
    min: 0,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'default',
    label: 'Default',
    values: {
      height: 30,
      shelfPanelWidth: 30,
      shelfPanelDepth: 3,
      shelfBeamWidth: 20,
      postSpacing: 10,
      shelfSpacing: 6,
      initialShelfOffset: 3,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const {
    height,
    shelfPanelWidth,
    shelfPanelDepth,
    shelfBeamWidth,
    postSpacing,
    shelfSpacing,
    initialShelfOffset,
  } = parameters

  const numShelves = Math.ceil((height - initialShelfOffset - 2) / shelfSpacing)

  return [
    posts({ height, postSpacing }),
    range(numShelves).map((shelfIndex) =>
      shelf({
        postSpacing,
        shelfPanelWidth,
        shelfPanelDepth,
        shelfBeamWidth,
        z:
          shelfIndex === numShelves - 1
            ? height
            : 2 + initialShelfOffset + shelfIndex * shelfSpacing,
        alignment:
          shelfIndex === 0 || shelfIndex === numShelves - 1
            ? 'center'
            : shelfIndex % 2 === 1
              ? 'left'
              : 'right',
      }),
    ),
  ] satisfies Parts
}

type PostsOptions = {
  height: number
  postSpacing: number
}

function posts(options: PostsOptions): Parts {
  const { height, postSpacing } = options

  const leftPostX = -Math.floor((1 / 2) * postSpacing)
  const rightPostX = Math.ceil((1 / 2) * postSpacing)

  return [
    // left
    {
      type: 'gridbeam:z',
      x: leftPostX,
      y: 1,
      z: [0, height],
    },
    // right
    {
      type: 'gridbeam:z',
      x: rightPostX,
      y: 1,
      z: [0, height],
    },
  ]
}

type ShelfOptions = {
  postSpacing: number
  shelfPanelWidth: number
  shelfPanelDepth: number
  shelfBeamWidth: number
  z: number
  alignment: 'left' | 'center' | 'right'
}

function shelf(options: ShelfOptions): Parts {
  const { postSpacing, shelfPanelWidth, shelfPanelDepth, shelfBeamWidth, z, alignment } = options

  const leftPostX = -Math.floor((1 / 2) * postSpacing)
  const rightPostX = Math.ceil((1 / 2) * postSpacing)

  switch (alignment) {
    case 'center':
      return [
        {
          type: 'gridbeam:y',
          x: leftPostX + 1,
          y: [0, 2],
          z: z - 2,
        },
        {
          type: 'gridbeam:y',
          x: rightPostX - 1,
          y: [0, 2],
          z: z - 2,
        },
        {
          type: 'gridbeam:x',
          x: [-Math.floor((1 / 2) * shelfBeamWidth), Math.ceil((1 / 2) * shelfBeamWidth)],
          y: 0,
          z: z - 1,
        },
        {
          type: 'gridpanel:xy',
          x: [-Math.floor((1 / 2) * shelfPanelWidth), Math.ceil((1 / 2) * shelfPanelWidth)],
          y: [0, -shelfPanelDepth],
          z: z,
        },
      ]
    case 'left':
      return [
        {
          type: 'gridbeam:x',
          x: [rightPostX, rightPostX - shelfBeamWidth],
          y: 0,
          z: z - 1,
        },
        {
          type: 'gridpanel:xy',
          x: [
            Math.floor((1 / 2) * (shelfPanelWidth - postSpacing)),
            Math.floor((1 / 2) * (shelfPanelWidth - postSpacing)) - shelfPanelWidth,
          ],
          y: [0, -shelfPanelDepth],
          z: z,
        },
      ]
    case 'right':
      return [
        {
          type: 'gridbeam:x',
          x: [
            -Math.ceil((1 / 2) * postSpacing),
            shelfBeamWidth - Math.floor((1 / 2) * postSpacing),
          ],
          y: 0,
          z: z - 1,
        },
        {
          type: 'gridpanel:xy',
          x: [
            -Math.floor((1 / 2) * (shelfPanelWidth - postSpacing)),
            -Math.floor((1 / 2) * (shelfPanelWidth - postSpacing)) + shelfPanelWidth,
          ],
          y: [0, -shelfPanelDepth],
          z: z,
        },
      ]
  }
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

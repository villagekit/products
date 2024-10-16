import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'
import { radToDeg } from '@villagekit/math'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const parameters = {
  size: {
    label: 'Size',
    shortId: 's',
    type: 'number',
    min: 15,
    max: 30,
    step: 15,
  },
  width: {
    label: 'Width',
    shortId: 'w',
    type: 'number',
    min: 15,
    max: 30,
    step: 15,
  },
  topShelf: {
    label: 'Top shelf',
    shortId: 'ts',
    type: 'choice',
    options: {
      none: 'None',
      full: 'Full',
    },
  },
  bottomShelf: {
    label: 'Bottom shelf',
    shortId: 'bs',
    type: 'choice',
    options: {
      none: 'None',
      full: 'Full',
      side: 'Side',
    },
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      size: 30,
      width: 30,
      topShelf: 'full',
      bottomShelf: 'side',
    },
  },
  {
    id: 'small',
    label: 'Small',
    values: {
      size: 30,
      width: 30,
      topShelf: 'full',
      bottomShelf: 'full',
    },
  },
]

// export const plugins: Plugins = ['smart-fasteners']

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { size, width, topShelf, bottomShelf } = parameters

  const zOffset = size === 15 ? 1 : size === 30 ? 2 : null
  if (zOffset === null) throw new Error('Unexpected size')

  return [
    // left z
    GridBeam.Z({
      x: 0,
      y: 0,
      z: [0, size],
    }),

    // left angle
    GridBeam.Z({
      x: -1,
      y: 0,
      z: [0, size],
    }).rotate({
      direction: [1, 0, 0],
      // cos(theta) = adjacent / hypotenuse
      // cos(theta) = 12 / 13
      // theta = acos(12 / 13)
      angle: radToDeg(Math.acos(12 / 13)),
      origin: [0, 0, size - zOffset],
    }),

    // right z
    GridBeam.Z({
      x: width - 1,
      y: 0,
      z: [0, size],
    }),
  ] satisfies Parts
}

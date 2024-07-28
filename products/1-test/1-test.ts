import type { Parts, Plugins } from '@villagekit/design/kit'
import { Fastener } from '@villagekit/part-fastener/creator'
import { GridBeam } from '@villagekit/part-gridbeam/creator'

export const parts: Parts = [
  GridBeam.X({
    x: [0, 10],
    y: 0,
    z: 0,
  }),
  GridBeam.Y({
    x: 0,
    y: [0, 10],
    z: 1,
  }),
  GridBeam.Z({
    x: 1,
    y: 1,
    z: [0, 10],
  }),
  /*
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [0, 1, 1],
    direction: [1, 0, 0],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [1, 0, 0],
    direction: [0, 1, 0],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [0, 0, 0],
    direction: [0, 0, 1],
  }),
  */
]

export const plugins: Plugins = ['smart-fasteners']
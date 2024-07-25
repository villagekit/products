import type { Parts } from '@villagekit/design/kit'
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
    x: 0,
    y: 0,
    z: [2, 12],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [0, 0, 0],
    direction: [1, 0, 0],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [0, 0, 0],
    direction: [0, 1, 0],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [-2, -2, 0],
    direction: [0, 1, 0],
  }),
  Fastener.Line({
    variantId: '75mm:bolt:12mm:nut',
    start: [-4, -4, 0],
    direction: [0, 0, 1],
  }),
]

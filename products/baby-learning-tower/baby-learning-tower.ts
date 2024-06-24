import type { Parts, Plugins } from '@villagekit/design/kit'

const towerHeight = 20
const towerWidth = 10
const lowerStandDepth = 10
const upperStandDepth = 7
const upperStandZ = 7
const handleZSpacing = 6

const lowerStandStartY = upperStandDepth - lowerStandDepth

export const parts: Parts = [
  // front left z beam
  {
    type: 'gridbeam:z',
    x: 0,
    y: 0,
    z: [0, towerHeight],
  },
  // back left z beam
  {
    type: 'gridbeam:z',
    x: 0,
    y: upperStandDepth - 1,
    z: [0, towerHeight],
  },
  // front right z beam
  {
    type: 'gridbeam:z',
    x: towerWidth - 1,
    y: 0,
    z: [0, towerHeight],
  },
  // back right z beam
  {
    type: 'gridbeam:z',
    x: towerWidth - 1,
    y: upperStandDepth - 1,
    z: [0, towerHeight],
  },

  // extra front left z beam
  {
    type: 'gridbeam:z',
    x: 0,
    y: lowerStandStartY + 1,
    z: [0, 3],
  },
  // extra front right z beam
  {
    type: 'gridbeam:z',
    x: towerWidth - 1,
    y: lowerStandStartY + 1,
    z: [0, 3],
  },

  // front bottom x beams
  {
    type: 'gridbeam:x',
    x: [-1, towerWidth + 1],
    y: lowerStandStartY,
    z: 0,
  },
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: lowerStandStartY,
    z: 1,
  },

  // back bottom x beams
  {
    type: 'gridbeam:x',
    x: [-1, towerWidth + 1],
    y: upperStandDepth - 2,
    z: 0,
  },
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: upperStandDepth - 2,
    z: 1,
  },

  // left bottom y beam
  {
    type: 'gridbeam:y',
    x: 1,
    y: [lowerStandStartY, upperStandDepth],
    z: 2,
  },
  // right bottom y beam
  {
    type: 'gridbeam:y',
    x: towerWidth - 2,
    y: [lowerStandStartY, upperStandDepth],
    z: 2,
  },

  // bottom stand panel
  {
    type: 'gridpanel:xy',
    x: [1, towerWidth - 1],
    y: [lowerStandStartY, upperStandDepth],
    z: 3,
  },

  // upper stand front x
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: 1,
    z: upperStandZ - 2,
  },
  // upper stand back x
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: upperStandDepth - 2,
    z: upperStandZ - 2,
  },
  // upper stand left y
  {
    type: 'gridbeam:y',
    x: 1,
    y: [0, upperStandDepth],
    z: upperStandZ - 1,
  },
  // upper stand right y
  {
    type: 'gridbeam:y',
    x: towerWidth - 2,
    y: [0, upperStandDepth],
    z: upperStandZ - 1,
  },
  // upper stand panel
  {
    type: 'gridpanel:xy',
    x: [1, towerWidth - 1],
    y: [0, upperStandDepth],
    z: upperStandZ,
  },

  // front bottom x handle
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: -1,
    z: towerHeight - handleZSpacing,
  },
  // front top x handle
  {
    type: 'gridbeam:x',
    x: [0, towerWidth],
    y: -1,
    z: towerHeight - 2,
  },
  // back bottom x handle
  {
    type: 'gridbeam:x',
    x: [-1, towerWidth + 1],
    y: upperStandDepth,
    z: towerHeight - handleZSpacing - 2,
  },
  // back bottom x handle
  {
    type: 'gridbeam:x',
    x: [-1, towerWidth + 1],
    y: upperStandDepth,
    z: towerHeight - 2,
  },

  // left bottom y handle
  {
    type: 'gridbeam:y',
    x: -1,
    y: [0, upperStandDepth + 1],
    z: towerHeight - handleZSpacing - 1,
  },
  // left top y handle
  {
    type: 'gridbeam:y',
    x: -1,
    y: [0, upperStandDepth + 1],
    z: towerHeight - 1,
  },
  // right bottom y handle
  {
    type: 'gridbeam:y',
    x: towerWidth,
    y: [0, upperStandDepth + 1],
    z: towerHeight - handleZSpacing - 1,
  },
  // right top y handle
  {
    type: 'gridbeam:y',
    x: towerWidth,
    y: [0, upperStandDepth + 1],
    z: towerHeight - 1,
  },
]

export const plugins: Plugins = ['smart-fasteners']

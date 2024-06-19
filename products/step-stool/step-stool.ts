import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  numSteps: {
    label: 'Number of steps',
    shortId: 'ns',
    type: 'number',
    min: 2,
    max: 4,
  },
  stepDepth: {
    label: 'Step depth',
    description: 'The depth of every step except the topmost step',
    shortId: 'sd',
    type: 'number',
    min: 4,
    max: 10,
  },
  stepHeight: {
    label: 'Step height',
    shortId: 'sh',
    type: 'number',
    min: 4,
    max: 10,
  },
  stepWidth: {
    label: 'Step width',
    shortId: 'sw',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  topStepDepth: {
    label: 'Top step depth',
    description: 'The depth of the topmost step',
    shortId: 'tsd',
    type: 'number',
    min: 5,
    max: 10,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'base',
    label: 'Base',
    values: {
      numSteps: 2,
      stepDepth: 4,
      stepHeight: 5,
      stepWidth: 10,
      topStepDepth: 6,
    },
  },
  {
    id: 'short',
    label: 'Short',
    values: {
      numSteps: 2,
      stepDepth: 5,
      stepHeight: 4,
      stepWidth: 10,
      topStepDepth: 5,
    },
  },
  {
    id: 'high',
    label: 'High',
    values: {
      numSteps: 3,
      stepDepth: 5,
      stepHeight: 5,
      stepWidth: 10,
      topStepDepth: 5,
    },
  },
  {
    id: 'wide',
    label: 'Wide',
    values: {
      numSteps: 2,
      stepDepth: 5,
      stepHeight: 5,
      stepWidth: 20,
      topStepDepth: 5,
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { stepWidth, stepHeight, numSteps, stepDepth, topStepDepth } = parameters

  const lastY = (numSteps - 1) * stepDepth
  const topY = lastY + topStepDepth
  const topHeight = numSteps * stepHeight

  return [
    {
      type: 'gridbeam:y',
      x: 1,
      y: [0, (numSteps - 1) * stepDepth + topStepDepth],
      z: stepHeight - 2,
    },
    {
      type: 'gridbeam:y',
      x: stepWidth - 2,
      y: [0, (numSteps - 1) * stepDepth + topStepDepth],
      z: stepHeight - 2,
    },

    range(numSteps - 1).map((stepIndex): Parts => {
      const isFirstStep = stepIndex === 0
      const isLastStep = stepIndex === numSteps - 1

      const height = stepHeight * (1 + stepIndex)
      const y = stepDepth * stepIndex
      const lastStepOffset = Math.max(5, stepDepth) - stepDepth
      const panelDepth = !isLastStep ? stepDepth : stepDepth + lastStepOffset

      return [
        {
          type: 'gridpanel:xy',
          x: [0, stepWidth],
          y: [y, y + panelDepth],
          z: height,
        },

        {
          type: 'gridbeam:z',
          x: 0,
          y,
          z: [0, height],
        },

        {
          type: 'gridbeam:z',
          x: stepWidth - 1,
          y,
          z: [0, height],
        },

        {
          type: 'gridbeam:x',
          x: [0, stepWidth],
          y: y + 1,
          z: height - 1,
        },
        {
          type: 'gridbeam:x',
          x: [0, stepWidth],
          y: y + stepDepth - 1,
          z: height - 1,
        },

        !isFirstStep && [
          {
            type: 'gridbeam:y',
            x: 1,
            y: [y, y + stepDepth],
            z: height - 2,
          },
          {
            type: 'gridbeam:y',
            x: stepWidth - 2,
            y: [y, y + stepDepth],
            z: height - 2,
          },

          {
            type: 'gridbeam:x',
            x: [0, stepWidth],
            y: y + 1,
            z: stepHeight - 3,
          },
        ],
      ]
    }),

    {
      type: 'gridpanel:xy',
      x: [0, stepWidth],
      y: [lastY, topY],
      z: topHeight,
    },

    {
      type: 'gridbeam:z',
      x: 0,
      y: lastY,
      z: [0, topHeight],
    },
    {
      type: 'gridbeam:z',
      x: stepWidth - 1,
      y: lastY,
      z: [0, topHeight],
    },

    {
      type: 'gridbeam:x',
      x: [0, stepWidth],
      y: lastY + 1,
      z: topHeight - 1,
    },
    {
      type: 'gridbeam:x',
      x: [0, stepWidth],
      y: topY - 2,
      z: topHeight - 1,
    },

    {
      type: 'gridbeam:x',
      x: [0, stepWidth],
      y: lastY + 1,
      z: stepHeight - 3,
    },
    {
      type: 'gridbeam:x',
      x: [0, stepWidth],
      y: topY - 2,
      z: stepHeight - 3,
    },

    {
      type: 'gridbeam:z',
      x: 0,
      y: topY - 1,
      z: [0, topHeight],
    },
    {
      type: 'gridbeam:z',
      x: stepWidth - 1,
      y: topY - 1,
      z: [0, topHeight],
    },
  ] satisfies Parts
}

function range(end: number) {
  return Array.from(Array(end).keys())
}

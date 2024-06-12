const LABEL_RE = /^[\w ]+$/
const TAGS_RE = /^[\w-]+(,\s*[\w-]+)*$/

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setHelper('splitCommaList', (input) => {
    return input.split(',').map((i) => i.trim())
  })
  plop.setGenerator('kit', {
    description: 'Generate a new kit product',
    prompts: [
      {
        type: 'input',
        name: 'label',
        message: 'Product label',
        validate: (input) => {
          return LABEL_RE.test(input)
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Product description',
        default: '',
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Product tags',
        default: '',
        validate: (input) => {
          return TAGS_RE.test(input)
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: './products/{{ dashCase label }}',
        base: './templates/kit',
        templateFiles: './templates/kit/*',
      },
    ],
  })
}

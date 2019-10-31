import {GraphQLScalarType, valueFromASTUntyped} from 'graphql'
import {DocumentJSON, NodeJSON, BlockJSON, TextJSON, MarkJSON, InlineJSON} from 'slate'
import {isObject, isArray, isString} from '@karma.run/utility'

export type RichTextValue = DocumentJSON

export interface KeyGeneratorClass {
  new (): KeyGenerator
}

export interface KeyGenerator {
  generateKey(): string
}

export interface CreateRichTextScalarOptions {
  validation: ValidationOptions
  keyGeneratorClass?: KeyGeneratorClass
}

export class IncrementalKeyGenerator implements KeyGenerator {
  private _currentKey: number = 0

  generateKey(): string {
    return (this._currentKey++).toString()
  }
}

export function createRichTextScalar({
  validation,
  keyGeneratorClass = IncrementalKeyGenerator
}: CreateRichTextScalarOptions) {
  return new GraphQLScalarType({
    name: 'GraphQLRichText',
    serialize(value: DocumentJSON) {
      const keyGenerator = new keyGeneratorClass()
      const opts = {validation, keyGenerator}
      const node = validateNodeJSON(value, opts)

      if (node.object !== 'document') throw new TypeError(`Top-level node must be a document node.`)
      return node
    },

    parseValue(value: unknown) {
      const keyGenerator = new keyGeneratorClass()
      const opts = {validation, keyGenerator}
      const node = validateNodeJSON(value, opts)

      if (node.object !== 'document') throw new TypeError(`Top-level node must be a document node.`)
      return node
    },

    parseLiteral(ast) {
      const keyGenerator = new keyGeneratorClass()
      const opts = {validation, keyGenerator}
      const node = validateNodeJSON(valueFromASTUntyped(ast), opts)

      if (node.object !== 'document') throw new TypeError(`Top-level node must be a document node.`)
      return node
    }
  })
}

export type PathArray = readonly (string | number)[]
export type UnknownNode = Readonly<Record<string, {type: string}>>

export type DataValidationFn<T extends Readonly<Record<string, any>> = {}> = (
  data: Readonly<Record<string, unknown> | undefined>
) => T

export type DataValidationMap = Record<string, DataValidationFn | null>

export interface ValidationOptions {
  block: DataValidationMap
  inline: DataValidationMap
  marks: DataValidationMap
}

export interface NodeValidationOptions {
  validation: ValidationOptions
  keyGenerator: KeyGenerator
}

export const validNodeTypes: NodeJSON['object'][] = ['document', 'block', 'inline', 'text']

export function validateNodeJSON(
  unknown: unknown,
  opts: NodeValidationOptions,
  path: PathArray = []
): NodeJSON {
  if (!isObject(unknown)) {
    throw new TypeError(
      `Value at path ${JSON.stringify(path)} must be of type object found ${typeof unknown}.`
    )
  }

  const node = unknown as NodeJSON

  if (!validNodeTypes.includes(node.object)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([...path, 'object'])} must be one of ${JSON.stringify(
        validNodeTypes
      )} found ${JSON.stringify(node.object)}.`
    )
  }

  switch (node.object) {
    case 'document':
      return validateDocumentJSON(node, opts, path)

    case 'block':
      return validateBlockNode(node, opts, path)

    case 'inline':
      return validateInlineNode(node, opts, path)

    case 'text':
      return validateTextNode(node, opts, path)
  }

  throw new TypeError(`Couldn't parse ${unknown} as RichText`)
}

function validateDocumentJSON(
  node: DocumentJSON,
  opts: NodeValidationOptions,
  path: PathArray
): DocumentJSON {
  if (!isArray(node.nodes)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} must be an array found ${typeof node.nodes}.`
    )
  }

  const key = opts.keyGenerator.generateKey()
  const validatedNodes = node.nodes.map((node, index) =>
    validateNodeJSON(node, opts, [...path, 'nodes', index])
  )

  const childObjectTypes = validatedNodes.map(node => node.object)

  if (
    childObjectTypes.includes('document') ||
    childObjectTypes.includes('inline') ||
    childObjectTypes.includes('text')
  ) {
    throw new TypeError(
      `Document child nodes at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} should only include block nodes.`
    )
  }

  return {
    key,
    object: 'document',
    nodes: validatedNodes
  }
}

function validateBlockNode(
  node: BlockJSON,
  opts: NodeValidationOptions,
  path: PathArray
): BlockJSON {
  if (node.nodes && !isArray(node.nodes)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} must be an array found ${typeof node.nodes}.`
    )
  }

  if (!isString(node.type)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'type'
      ])} must be of type string found ${typeof node.type}.`
    )
  }

  const validationFn = opts.validation.block[node.type]

  if (validationFn === undefined) {
    throw new TypeError(
      `Error at path ${JSON.stringify([
        ...path,
        'type'
      ])}, couldn't find a validation entry for block of type "${node.type}".`
    )
  }

  const key = opts.keyGenerator.generateKey()
  const validatedData = wrapDataValidation(node.data, validationFn, [...path, 'data'])
  const validatedNodes = node.nodes
    ? node.nodes.map((node, index) => validateNodeJSON(node, opts, [...path, 'nodes', index]))
    : []

  const childObjectTypes = validatedNodes.map(node => node.object)

  if (
    childObjectTypes.includes('document') ||
    (childObjectTypes.includes('block') && childObjectTypes.includes('inline')) ||
    (childObjectTypes.includes('block') && childObjectTypes.includes('text'))
  ) {
    throw new TypeError(
      `Block child nodes at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} should either include only block nodes or inline and text nodes.`
    )
  }

  return {
    key,
    object: 'block',
    type: node.type,
    data: validatedData,
    nodes: validatedNodes as (BlockJSON | InlineJSON | TextJSON)[]
  }
}

function validateInlineNode(
  node: InlineJSON,
  opts: NodeValidationOptions,
  path: PathArray
): InlineJSON {
  if (node.nodes && !isArray(node.nodes)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} must be an array found ${typeof node.nodes}.`
    )
  }

  if (!isString(node.type)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'type'
      ])} must be of type string found ${typeof node.type}.`
    )
  }

  const validationFn = opts.validation.inline[node.type]

  if (validationFn === undefined) {
    throw new TypeError(
      `Error at path ${JSON.stringify([
        ...path,
        'type'
      ])}, couldn't find a validation entry for inline of type "${node.type}".`
    )
  }

  const key = opts.keyGenerator.generateKey()
  const validatedData = wrapDataValidation(node.data, validationFn, [...path, 'data'])
  const validatedNodes = node.nodes
    ? node.nodes.map((node, index) => validateNodeJSON(node, opts, [...path, 'nodes', index]))
    : []

  const childObjectTypes = validatedNodes.map(node => node.object)

  if (childObjectTypes.includes('document') || childObjectTypes.includes('block')) {
    throw new TypeError(
      `Inline child nodes at path ${JSON.stringify([
        ...path,
        'nodes'
      ])} should only include inline or text nodes.`
    )
  }

  return {
    key,
    object: 'inline',
    type: node.type,
    data: validatedData,
    nodes: validatedNodes as (InlineJSON | TextJSON)[]
  }
}

function validateTextNode(node: TextJSON, opts: NodeValidationOptions, path: PathArray): TextJSON {
  if (node.marks && !isArray(node.marks)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'marks'
      ])} must be an array found ${typeof node.marks}.`
    )
  }

  if (!isString(node.text)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'text'
      ])} must be of type string found ${typeof node.text}.`
    )
  }

  const key = opts.keyGenerator.generateKey()
  const validatedMarks = node.marks
    ? node.marks.map((mark, index) => validateMarkNode(mark, opts, [...path, 'marks', index]))
    : []

  return {
    key,
    object: 'text',
    text: node.text,
    marks: validatedMarks
  }
}

function validateMarkNode(node: MarkJSON, opts: NodeValidationOptions, path: PathArray): MarkJSON {
  if (!isString(node.type)) {
    throw new TypeError(
      `Value at path ${JSON.stringify([
        ...path,
        'type'
      ])} must be of type string found ${typeof node.type}.`
    )
  }

  const validationFn = opts.validation.marks[node.type]

  if (validationFn === undefined) {
    throw new TypeError(
      `Error at path ${JSON.stringify([
        ...path,
        'type'
      ])}, couldn't find a validation entry for mark of type "${node.type}".`
    )
  }

  const validatedData = wrapDataValidation(node.data, validationFn, [...path, 'data'])

  return {
    object: 'mark',
    type: node.type,
    data: validatedData
  }
}

function wrapDataValidation<T extends Readonly<Record<string, any>> = {}>(
  data: Record<string, unknown> | undefined,
  validationFn: DataValidationFn<T> | null,
  path: PathArray
) {
  let validatedData = {}

  if (validationFn) {
    try {
      validatedData = validationFn(data)
    } catch (err) {
      throw new Error(
        `Data validation error at path ${JSON.stringify(path)}: ${err ? err.message : err}`
      )
    }
  }

  return validatedData
}

import { defineField, defineType, ObjectDefinition } from 'sanity'

/**
 * External reference schema type definition
 * This is used as a template - actual schema types are created dynamically via createExternalReferenceSchema
 * @public
 */
export interface ExternalReferenceDefinition extends Omit<
  ObjectDefinition,
  'type' | 'fields' | 'options'
> {
  type: string // Dynamic type name
}

declare module '@sanity/types' {
  export interface IntrinsicDefinitions {
    // Dynamic schema types will be registered at runtime
    // TypeScript will accept any string as a type name
    [key: string]: ExternalReferenceDefinition
  }
}


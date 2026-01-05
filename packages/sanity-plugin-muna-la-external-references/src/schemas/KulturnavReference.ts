import { defineField, defineType, ObjectDefinition } from 'sanity'

import { KulturnavInput } from '../components/KulturnavInput'
import type { KulturnavFieldOptions } from '../types'

const kulturnavReferenceTypeName = 'kulturnavReference'

/**
 * @public
 */
export interface KulturnavReferenceDefinition extends Omit<
  ObjectDefinition,
  'type' | 'fields' | 'options'
> {
  type: typeof kulturnavReferenceTypeName
  options?: KulturnavFieldOptions
}

declare module '@sanity/types' {
  export interface IntrinsicDefinitions {
    kulturnavReference: KulturnavReferenceDefinition
  }
}

/**
 * Schema type for kulturnav references following Linked Art reference model
 * @see https://linked.art/api/1.0/shared/reference/
 *
 * @public
 */
export const kulturnavReference = defineType({
  name: kulturnavReferenceTypeName,
  type: 'object',
  title: 'Kulturnav Reference',
  description: 'Reference to an entity from kulturnav.org or similar API',
  components: {
    input: KulturnavInput,
  },
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Dereferenceable URI identifying the referenced resource',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'Entity type (e.g., Person, Concept, Place)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description:
        'Human-readable label for the referenced resource (maps to _label in Linked Art)',
    }),
    defineField({
      name: 'notation',
      type: 'array',
      title: 'Notation',
      description: 'Additional identifiers (e.g., language tags)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'complete',
      type: 'boolean',
      title: 'Complete',
      description:
        'If true, stores full embedded data instead of reference (maps to _complete in Linked Art)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      id: 'id',
    },
    prepare({ label, type, id }: { label?: string; type?: string; id?: string }) {
      return {
        title: label || id || 'Untitled Reference',
        subtitle: type || 'Unknown Type',
      }
    },
  },
})

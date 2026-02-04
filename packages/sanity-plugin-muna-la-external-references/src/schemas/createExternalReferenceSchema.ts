import { defineField, defineType } from 'sanity'

/**
 * Create an external reference schema type with Linked Art structure
 * @public
 */
export function createExternalReferenceSchema(schemaTypeName: string) {
  return defineType({
    name: schemaTypeName,
    type: 'object',
    title: 'External Reference',
    description: 'Reference to an external entity following Linked Art reference model',
    options: {
      // Prevent modal from opening when used in arrays
      collapsible: false,
      collapsed: false,
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
}


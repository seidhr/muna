/* eslint-disable prettier/prettier */
import { Card, Stack } from '@sanity/ui'
import edtf from 'edtf'
import { useCallback, useEffect, useRef } from 'react'
import React from 'react'
import { FieldMember, InputProps, MemberField, ObjectInputProps, set, unset } from 'sanity'

import { Preview } from './components/Preview'
import { mapEDTF } from './mapEDTF'
import { Patch, Timespan } from './types'

export type TimespanInputCallbackProps = Omit<InputProps, 'renderDefault'>

// Extend the `ObjectInputProps` type
export type TimespanInputProps = ObjectInputProps<Timespan>

export function TimespanInput(props: Readonly<ObjectInputProps>): React.JSX.Element {
  const { value, members, onChange, renderField, renderInput, renderItem, renderPreview } = props
  const previousEdtf = useRef<string | undefined>(value?.edtf)

  const edtfMember = members.find(
    (member): member is FieldMember => member.kind === 'field' && member.name === 'edtf',
  )

  useEffect(() => {
    // Skip if we're creating a new document and no edtf value exists yet
    if (!value?.edtf) {
      return
    }

    if (value.edtf !== previousEdtf.current) {
      let edtfValue
      try {
        edtfValue = edtf(value.edtf)
        const edtfMapped = mapEDTF(edtfValue)
        const timespanPatches = edtfMapped?.map((e: Patch) => set(e.value, e.path))

        // Only apply patches if we have a valid EDTF value
        if (edtfValue.isEDTF) {
          const patches = [
            unset(['beginOfTheBegin']),
            unset(['endOfTheBegin']),
            unset(['beginOfTheEnd']),
            unset(['endOfTheEnd']),
            unset(['date']),
            set(value.edtf, ['edtf']),
            ...timespanPatches,
          ]

          // Only set _type if it's not already set
          if (!value._type) {
            patches.unshift(set('Timespan', ['_type']))
          }

          onChange(patches)
        }
      } catch (error) {
        // Only apply unset patches if we have a value to work with
        if (value._type) {
          onChange([
            unset(['beginOfTheBegin']),
            unset(['endOfTheBegin']),
            unset(['beginOfTheEnd']),
            unset(['endOfTheEnd']),
            unset(['date']),
          ])
        }
      }
    }
    previousEdtf.current = value?.edtf
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value?._type, value?.edtf])

  useEffect(() => {
    // Only unset if we have an existing document with empty edtf
    if (value?._type && !value?.edtf) {
      onChange([unset()])
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value])

  const customRenderInput = useCallback(
    (renderInputCallbackProps: TimespanInputCallbackProps): React.JSX.Element => {
      return (
        <Stack>
          <Card>{renderInput(renderInputCallbackProps)}</Card>
          {value && <Preview value={value} />}
        </Stack>
      )
    },
    [renderInput, value],
  )

  return (
    <Stack space={2}>
      {edtfMember && (
        <MemberField
          member={edtfMember}
          renderInput={customRenderInput}
          renderField={renderField}
          renderItem={renderItem}
          renderPreview={renderPreview}
        />
      )}
    </Stack>
  )
}

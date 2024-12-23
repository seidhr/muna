/* eslint-disable prettier/prettier */
import { Card, Stack } from '@sanity/ui'
import edtf from 'edtf'
import { useCallback, useEffect, useRef } from 'react'
import React from 'react'
import { FieldMember, InputProps, MemberField, ObjectInputProps, set, unset } from 'sanity'

import { Preview } from './components'
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
    if (value?.edtf && value.edtf !== previousEdtf.current) {
      let edtfValue
      try {
        edtfValue = edtf(value?.edtf)
        const edtfMapped = mapEDTF(edtfValue)
        const timespanPatches = edtfMapped?.map((e: Patch) => set(e.value, e.path))
        const patches =
          props.value?._type === 'Timespan'
            ? [
              unset(['beginOfTheBegin']),
              unset(['endOfTheBegin']),
              unset(['beginOfTheEnd']),
              unset(['endOfTheEnd']),
              unset(['date']),
              set(value.edtf, ['edtf']),
              ...timespanPatches,
            ]
            : [set('Timespan', ['_type'])]

        if (edtfValue.isEDTF) {
          onChange(patches)
        }
      } catch (error) {
        onChange([
          unset(['beginOfTheBegin']),
          unset(['endOfTheBegin']),
          unset(['beginOfTheEnd']),
          unset(['endOfTheEnd']),
          unset(['date']),
        ])
      }
    }
    previousEdtf.current = value?.edtf
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value?._type, value?.edtf])

  useEffect(() => {
    // delete all Timespan fields if the edtf field is empty
    if (!value?.edtf) {
      onChange([unset()])
    }
    // Adding onChange as a dependency will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

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

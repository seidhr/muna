/* eslint-disable prettier/prettier */
import { useCallback, useEffect } from 'react'
import { FieldMember, MemberField, ObjectInputProps, InputProps, set, unset } from 'sanity'
import { Card, Stack } from '@sanity/ui'
import { mapEDTF } from './mapEDTF'
import edtf from 'edtf'
import { Patch, Timespan } from './types'
import { Preview } from './components'

export type TimespanInputCallbackProps = Omit<InputProps, 'renderDefault'>

// Extend the `ObjectInputProps` type
export type TimespanInputProps = ObjectInputProps<Timespan>

export function TimespanInput(props: ObjectInputProps) {
  const { value, members, onChange, renderField, renderInput, renderItem, renderPreview } = props

  const edtfMember = members.find(
    (member): member is FieldMember => member.kind === 'field' && member.name === 'edtf',
  )

  useEffect(() => {
    if (value?.edtf) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value?._type, value?.edtf])

  useEffect(() => {
    // delete all Timespan fields if the edtf field is empty
    if (!value?.edtf) {
      onChange([unset()])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const customRenderInput = useCallback(
    (renderInputCallbackProps: TimespanInputCallbackProps) => {
      // Add TimespanPreview to the renderInput function
      return (
        <Stack>
          {/* Call the original renderInput function, passing along input props */}
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

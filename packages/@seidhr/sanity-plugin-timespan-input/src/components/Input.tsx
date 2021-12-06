import React from 'react'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import Fieldset from 'part:@sanity/components/fieldsets/default'
// Utilities for patching
import PatchEvent, { setIfMissing } from '@sanity/form-builder/PatchEvent'
import edtf from 'edtf'
import * as types from 'edtf/src/types'
import { mapEDTF } from '../functions/mapEDTF'
import { useId } from '@reach/auto-id'
import TimespanWrapper from './preview'

const EDTFinput = React.forwardRef((props, ref) => {
  // destructure props for easier use
  const {
    compareValue,
    focusPath,
    markers,
    onBlur,
    onChange,
    onFocus,
    presence,
    type,
    value,
    level
  } = props

  const handleFieldChange = React.useCallback(
    (field, fieldPatchEvent) => {
      let p = fieldPatchEvent.prefixAll(field.name)
      let timespanPatch = { patches: [] }

      if (field.name === 'edtf') {
        let edtfObj: types.Year | types.Date | types.Interval
        let isValid: boolean = false
        try {
          edtfObj = edtf(fieldPatchEvent.patches[0].value, { types: ['Year', 'Date', 'Interval', 'Season'] })
          //console.log('edtf object: ', edtfObj)
          isValid = edtfObj.isEDTF
        } catch (err) {
        }

        if (isValid && edtfObj) {
          Object.entries(mapEDTF(edtfObj)).forEach(([key, value]) => {
            timespanPatch.patches.push({
              type: 'set',
              path: [key],
              value: value
            })
          })
        }

        if (p.patches[0].type == 'unset') {
          timespanPatch.patches.push({
            type: 'unset',
            path: ['beginOfTheBegin']
          }, {
            type: 'unset',
            path: ['endOfTheBegin']
          }, {
            type: 'unset',
            path: ['date']
          }, {
            type: 'unset',
            path: ['beginOfTheEnd']
          }, {
            type: 'unset',
            path: ['endOfTheEnd']
          })
        }
      }
      const all = p.patches.concat(timespanPatch.patches)
      onChange(PatchEvent.from(all).prepend(setIfMissing({ _type: type.name })))
    },
    [onChange]
  )

  // Get an array of field names for use in a few instances in the code
  const fieldNames = type.fields.map((f) => f.name)

  // If Presence exist, get the presence as an array for the children of this field
  const childPresence =
    presence.length === 0
      ? presence
      : presence.filter((item) => fieldNames.includes(item.path[0]))

  // If Markers exist, get the markers as an array for the children of this field
  const childMarkers =
    markers.length === 0
      ? markers
      : markers.filter((item) => fieldNames.includes(item.path[0]))

  return (
    <>
      <Fieldset
        legend={type.title} // schema title
        description={type.description} // schema description
        markers={childMarkers} // markers built above
        presence={childPresence} // presence built above
      >
        {type.fields.filter(field => field.name === 'edtf').map((field, i) => {
          const inputId = useId()
          return (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              id={inputId}
              level={level + 1}
              ref={i === 0 ? ref : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
              path={[field.name]}
              markers={markers}
              focusPath={focusPath}
              readOnly={field.readOnly}
              presence={presence}
              onFocus={onFocus}
              onBlur={onBlur}
              compareValue={compareValue}
            />
          )
        })}
        {/* <pre>{value && (JSON.stringify(value, null, 2))}</pre> */}
        {value && (
          <div style={{ height: '100px' }}>
            <TimespanWrapper data={value} />
          </div>
        )}
      </Fieldset>
    </>
  )
})

export default EDTFinput
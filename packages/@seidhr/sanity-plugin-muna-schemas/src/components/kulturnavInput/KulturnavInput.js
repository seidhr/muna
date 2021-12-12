import React from 'react'

import {PatchEvent, set} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

import {
  Tooltip,
  Text,
  Box,
  TextInput,
  Card
} from '@sanity/ui'

const url =
  'https://kulturnav.org/api/search/entity.dataset:2155319e-50c9-416a-ae85-3e6afc33ef4e,nativeCompoundName:'

const createPatchFrom = (value) => PatchEvent.from(value === '' ? unset() : set(value))

function searchKN(url, query) {
  return fetch(url + query)
    .then((r) => r.json())
    .then(
      (r) =>
        r.map((i) => ({
          _type: 'concept',
          _key: i.uuid,
          preferredIdentifier: i.uuid,
          label: i.caption.no || '',
          url: `https://kulturnav.org/${i.uuid}`,
        })),
    )
}

export const KulturnavInput = React.forwardRef((props, ref) => {
  const { type, onChange } = props
  return(
    <FormField label={type.title} description={type.description}>
      {type.tipDescription ? 
        <Tooltip
          content={(
            <Box padding={2}>
              <Text>{type.tipDescription}</Text>
            </Box>
          )}
          placement="top"
        >
            <Card>
                <TextInput
                    type="text"
                    ref={ref}
                    placeholder={type.placeholder}
                    value={props.value}
                    onChange={event => {onChange(PatchEvent.from(set(event.target.value)))}}
                /> 
            </Card>
        </Tooltip>
      :
        <Card>
            <TextInput
            type="text"
            ref={ref}
            placeholder={type.placeholder}
            value={props.value}
            onChange={event => {onChange(PatchEvent.from(set(event.target.value)))}}
            /> 
        </Card>
      }
      
    </FormField>
  )

})



/* export default React.forwardRef((props, ref) => {
  const {type, value, onChange} = props
  const [query, setQuery] = useState()
  const {data: queryResult} = useSWR([url, `${query}*?lang=no`], searchKN)

  return (
    <Box>
      <DefaultLabel>{type.title}</DefaultLabel>
      <SearchableSelect
        ref={ref}
        value={value}
        items={queryResult || []}
        inputValue={(queryResult || []).find((item) => item._key === value)}
        onChange={(selectedItem) => onChange(createPatchFrom(selectedItem))}
        onSearch={setQuery}
        //disabled={!queryResult || !queryResult.length}
        renderItem={(item) => (
          <div className={styles.item}>
            <span>{item.label}</span>
          </div>
        )}
      />
    </Box>
  )
}) */

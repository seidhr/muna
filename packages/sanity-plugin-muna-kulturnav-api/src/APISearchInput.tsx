import React, { useState, useCallback, useEffect } from 'react'
import { Select } from '@sanity/ui'
import { StringInputProps, set, unset } from 'sanity/form'

export function APISearchInput(props: StringInputProps) {
  const { value, type, markers, readOnly, presence, compareValue, onFocus, onBlur, onChange } =
    props
  const [searchValue, setSearchValue] = useState<string | undefined>(value)
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = useCallback(
    (query) => {
      setLoading(true)
      fetch(`https://kulturnav.org/api/search?query=${query}`)
        .then((res) => res.json())
        .then((res) => {
          setOptions(res.results.map((result: any) => result.prefLabel))
          setLoading(false)
        })
    },
    [setOptions],
  )

  useEffect(() => {
    if (searchValue) {
      handleSearch(searchValue)
    }
  }, [searchValue])

  const handleChange = useCallback(
    (event) => {
      const inputValue = event.currentTarget.value
      setSearchValue(inputValue)
      onChange(set(inputValue))
    },
    [onChange],
  )

  const handleClear = useCallback(() => {
    setSearchValue(undefined)
    onChange(unset())
  }, [onChange])

  return (
    <Select
      value={searchValue}
      onChange={handleChange}
      onClear={handleClear}
      placeholder="Search for a term"
      options={options}
      isLoading={loading}
    />
  )
}

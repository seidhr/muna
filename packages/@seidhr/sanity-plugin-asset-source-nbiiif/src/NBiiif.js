import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Dialog from "part:@sanity/components/dialogs/fullscreen"
import Input from "part:@sanity/components/textinputs/default"
import Spinner from "part:@sanity/components/loading/spinner"
import axios from "axios"
import useDebounce from "./useDebounce"
import Preview from "./Preview"

const instance = axios.create({
  baseURL: "https://api.nb.no/catalog/v1/",
})

const NBiiif = ({onClose, onSelect}) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState("")

  const debounced = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debounced && debounced.length >= 3) {
      handleSearch()
    } else {
      setResults([])
    }
  }, [debounced])

  const search = (searchType = "items", params = {}) => {
    return instance.get(`/${searchType}`, {
      params: {
        q: debounced,
        digitalAccessibleOnly: true,        
        ...params
      }
    }).then(response => response.data).then(data => data._embedded.items)
  }

  const handleSearch = () => {
    setIsSearching(true)
    search()
      .then(setResults)
      .then(() => {
        setText(`Showing result for ${debounced}`)
        setIsSearching(false)
      })
  }

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  const chooseItem = (item) => {
    console.log(item)

    onSelect([{
      kind: "url",
      value: item._links.thumbnail_large.href,
      assetDocumentProps: {
        originalFilename: item.id, // Use this filename when the asset is saved as a file by someone.
        source: {
          // The source this image is from
          name: "nb.no",
          url: item._links.presentation.href,
          // A string that uniquely idenitfies it within the source.
          // In this example the URL is the closest thing we have as an actual ID.
          id: item.id
        },
        description: item.metadata.title,
        creditLine: "From nb.no"
      }
    }])
  }

  return (
    <Dialog title={"Select a document from NB.no"} onClose={onClose} isOpen>
      {isSearching && <Spinner fullscreen/>}

      <p>Search for documents in the National Library of Norway. Adds a thumbnail and a url to the IIIF Manifest to Sanity. For e better search go to <a href="https://www.nb.no/search">NB search</a></p>
      
      <Input placeholder={"Type phrase here"} id={"searchInput"} onChange={handleChange} value={searchTerm}
              isClearable
              onClear={() => setSearchTerm("")}/>

      <div>
        <h3>{text}</h3>
        <Grid>

          {results.map(result => (
            <Preview src={result && result._links.thumbnail_large ? result._links.thumbnail_large.href : ''} item={result}
                     onClick={chooseItem}/>
          ))}

        </Grid>
      </div>
    </Dialog>
  )
}

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
`

export default NBiiif

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Dialog from "part:@sanity/components/dialogs/fullscreen"
import Input from "part:@sanity/components/textinputs/default"
import Spinner from "part:@sanity/components/loading/spinner"
import axios from "axios"
import useDebounce from "./useDebounce"
import Preview from "./Preview"

var jsonrql = require('json-rql')

const instance = axios.create({
  baseURL: "http://sparql.ub.uib.no/",
  headers: {
    'Content-Type': 'application/ld+json',
    'Accept': 'application/ld+json'
  },
})

const Marcus = ({onClose, onSelect}) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState("")
  const [sparql, setSparql] = useState("")

  const debounced = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debounced && debounced.length >= 3) {
      setSparqlQuery()
      handleSearch()
    } else {
      setResults([])
    }
  }, [debounced])
  
  const search = (params = {}) => {
    return instance.get('sparql/sparql', {
      params: {
        query: `DESCRIBE ?id WHERE { GRAPH ?g { ?id <http://purl.org/dc/terms/identifier> "${debounced}". }}`,
        ...params
      }
    })
    .then(response => response.data)
    .then(response => [response])
    .then((response) => {
      return JSON.parse(JSON.stringify(response).split('"@id":').join('"id":'));
    })
    //.then(data => data)
    .catch((error) => {
      // Error 😨
      if (error.response) {
        /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
      } else if (error.request) {
        /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })}
    
  const handleSearch = () => {
    setIsSearching(true)
    search()
    .then(setResults)
    .then(() => {
      setText(`Showing result for ${debounced}`)
      setIsSearching(false)
    })
  }

  function setQ() {
    console.log('Debounced = ' + debounced)
    return jsonrql.toSparql({
      '@context': {
        'dct': 'http://purl.org/dc/terms/'
      },
      '@describe': ['?id'],
      '@where': {
        '@id': '?id',
        'dct:identifier': {
          '@value': debounced
        }
      }
    }, function (err, sparql) {
      console.log(err || sparql);
      return sparql
    })
  }

  const setSparqlQuery = () => {
    setSparql(setQ())
  }
  
  const handleChange = e => {
    setSearchTerm(e.target.value)
  }


  const chooseItem = (item) => {
    console.log(item)

    onSelect([{
      kind: "url",
      value: item.hasThumbnail,
      assetDocumentProps: {
        originalFilename: item.identifier, // Use this filename when the asset is saved as a file by someone.
        source: {
          // The source this image is from
          name: "From Marcus.uib.no",
          url: item.id,
          // A string that uniquely idenitfies it within the source.
          // In this example the URL is the closest thing we have as an actual ID.
          id: item.identifier
        },
        title: item.title,
        label: item.id,
        description: item.title,
        creditLine: `[${item.title}](${item.id})`
      }
    }])
  }

  return (
    <Dialog title={"Select a document from Marcus.uib.no"} onClose={onClose} isOpen>
      {isSearching && <Spinner fullscreen/>}

      <p>Search for documents by ID in Marcus, the special collection site from the University library of Bergen. Adds a thumbnail and a url to Sanity. <strong>NB! Only exact matches on ID/signature for now</strong>. For a better search go to <a href="https://marcus.uib.no/search/" target="_blank">Marcus search</a></p>
      
      <Input placeholder={"Type phrase here"} id={"searchInput"} onChange={handleChange} value={searchTerm}
              isClearable
              onClear={() => setSearchTerm("")}/>

      <div>
        <h3>{text}</h3>
        <Grid>
          { results ? results.map(result => (
            <Preview src={result && result.hasThumbnail ? result.hasThumbnail : ''} item={result}
                     onClick={chooseItem}/>
          )) : ''}

          { !results ? <p>Whoops! Found nothing!</p> : ''}

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

export default Marcus
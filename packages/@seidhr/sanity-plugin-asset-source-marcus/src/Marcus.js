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
  baseURL: "https://sparql.ub.uib.no/sparql/sparql",
})


const Marcus = ({onClose, onSelect}) => {

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

  const search = (params = {}) => {
    query = jsonrql.toSparql({
      '@context' : {
          'dct' : 'http://purl.org/dc/terms/'
      },
      '@describe' : ['?id'],
      '@where' : {
        '@id' : '?id',
        'dct:identifier' : {
            '@value' : debounced
          }
        }
      }, function (err, sparql) {
        // sparql => SELECT ?p ?c WHERE {
        //   ?c <http://xmlns.com/foaf/0.1/name> "York"@en.
        //   ?p <http://dbpedia.org/ontology/birthPlace> ?c.
        //   ?p <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://dbpedia.org/ontology/Artist>.
        // }
        console.log(err || sparql);
    });
    
    return instance.get({
      params: {
        q: query,
        digitalAccessibleOnly: true,        
        ...params
      }
    })
    .then(response => response.data)
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
          name: "From [nb.no]]nb.no)",
          url: item._links.presentation.href,
          // A string that uniquely idenitfies it within the source.
          // In this example the URL is the closest thing we have as an actual ID.
          id: item.id
        },
        title: item.metadata.title,
        label: item._links.self.href,
        description: item.metadata.title,
        creditLine: `[${item.metadata.title}](${item._links.self.href})`
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

          { results && results._embedded && results._embedded.items ? results._embedded.items.map(result => (
            <Preview src={result && result._links.thumbnail_large ? result._links.thumbnail_large.href : ''} item={result}
                     onClick={chooseItem}/>
          )) : ''}

          { results && results._embedded && !results._embedded.items ? <p>Whoops! Found nothing!</p> : ''}

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

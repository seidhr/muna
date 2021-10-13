# Muna data importer documentation

For now a list of articles to read and the APIs to be included at first.

## XState

* https://medium.com/weekly-webtips/intro-to-xstate-a-true-state-management-system-library-for-react-d8c0051c71e4
* https://imfeld.dev/writing/swr_with_xstate
* [Pending XState machine](https://xstate.js.org/viz/?gist=860f97dcf3792c75d97b9728131444e3)
* https://egghead.io/lessons/react-handle-http-request-state-with-xstate
* https://github.com/kyleshevlin/intro-to-state-machines-and-xstate-course/tree/master/lessons/using-history-states
* https://codesandbox.io/s/xstate-react-reddit-example-with-actors-5g9nu?from-embed=&file=/src/redditMachine.js (fits this tools usecase)
* https://github.com/mattpocock/xstate-catalogue/blob/master/lib/machines/simple-data-fetch.machine.ts
* https://xstate.js.org/docs/about/resources.html

## Diff patch

We want to be able to reimport, but not overwrite data. Diff patch should make i possible to create a UI that lets the user decide on what to import.

* https://github.com/rexxars/sanity-diff-patch
* https://www.sanity.io/docs/http-patches#A80781bT

## React-table

* https://github.com/SimeonGriggs/sanity-react-table

## APIs

These should be created from a generic machin, or rather an elasticSearchMachine and a fetchMachine depending on the service.
### Kulturnav

* https://kulturnav.org/info/api
* https://kulturnav.org/info/api-core
* [Fridtjof Nansen](https://kulturnav.org/37d98c32-e3cc-493c-ad49-051a407ff9f0.json)
### NB

* https://api.nb.no/

### Marcus

* https://sparql.ub.uib.no/

## Alternative approach

Use the apis, maybe only Kulturnav, as custom input component:

* https://www.sanity.io/schemas/populate-fields-with-data-from-a-file-upload-b5cccda5
* https://gist.github.com/PetterRuud/9e96665c87592571a45f5d00b5eb0a0c
* https://gist.github.com/bjoerge/c3a1aaa49dbd608bd341666ff70a128e
* https://gist.github.com/georgebutter/2cc45dde23c5ba194c9c6038a3fca82e
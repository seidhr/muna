---
id: introduction
title: Muna introduction
sidebar_label: Introduction
---

Sanity documenta are equivalent to classes. A property can refer to another document or create a nested object on the original document. Objects are sadly not directly queryable and can not be referred to by other documents. **Muna** nest data for quick editorial experience for the end user. Converting Sanity data to JSON-LD could easily convert *objects* to *documents* and poplate a rdf triplestore for detailed querying. A conversion of a dataset using **Muna** to rdf should treat document and object as equals.

## Properties

Common properties are described in `./src/props/index.js` as properties are reused extensivly. The same property name can still be reused in *document* or *object* for more spesific ranges.

```js title="./src/props/index.js"
const hasType = {
    name: "hasType",
    title: "Classified as",
    type: "array",
    of: [
        {
            type: "reference",
            to: [{ type: "someType" }],
        },
    ],
    validation: (Rule) => Rule.required(),
};
```

```js title="./src/documents/madeObject.js"
    ...
    {
        name: "hasType",
        title: "Classified as",
        type: "array",
        of: [
        {
            type: "reference",
            to: [{ type: "objectType" }],
        },
        ],
        validation: (Rule) => Rule.required(),
    },
    ...
```

## Documents are classes

Getting the balance right between Sanity documents and objects is a bit tricky coming from the world of RDF. As of sept. 2020 creating a document when creating the reference is not user friendly. A CIDOC-CRM class such as Birth is an object in Sanity for a smoother user experience. 

Ideally one could query directly for objects with GROQ, but that is not possible. With GROQ you need to find all persons with a birth object and matching date and filter the results.

```js title="GROQ"
*[
    activityStream[]._type == "birth" 
    && activityStream[].timespan[].date == "1890-08-27T23:17:00.000Z"
]{
    label,
	activityStream[]{
  	_type == 'birth' => {
        ...
    }
  }
} 
```

A SPARQL would query for the class Birth with a relation to a timespan matching the date and return all matching persons.

```sql title="SPARQL"
PREFIX ex: <http://www.example.org/schema#>

DESCRIBE ?person WHERE {
    ?s a ex:Birth ;
        ex:wasBorn ?person ;
        ex:hasTimespan ?time .
    ?time ex:date "1890-08-27T23:17:00.000Z" .
}
```

The reasoning behind having few documents and many objects is user friendliness. **Muna** tries to strike a balance between expressivness and useability. The query example illustrates 

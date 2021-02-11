---
id: documents
title: Muna documents
sidebar_label: Documents
---

As mentioned **Muna** treats documents as classes. 

## Activity stream

**Muna** use Activity stream to group events that have happened to objects, actors and other documents. The reason is that **Activity stream** makes for a better editing experience compared to the CIDOC-CRM way. Too many properties makes it hard to edit the documents. The downside is that it is necessary to dive into some menues to edit the data.

[Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/)

## Report

Report is a subclass of E14_Condition_Assessment and E33_Linguistic_Object. The reasoning for this is that Sanity lets us create text with objects and structured data with Portable Text. We want quality data, but also the capability for users to write details reports. 

Treatment is a object connected to a report. This is because treatment should never be undertaken without documenting the Made Object before modification.

## Timeline

Modified version of [TimelineJS JSON data format](https://timeline.knightlab.com/docs/json-format.html) and [Knut Melværs](https://github.com/kmelve) [Sanity Timeline.js schemas](https://github.com/kmelve/sanity-plugin-timelinejs).
With added capability of referencing events and more from the Muna schema.

[Example](https://www.saelen.family/id/2654ca9e-32c4-4b2c-a35f-ae2d4a012625)
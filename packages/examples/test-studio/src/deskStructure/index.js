import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import { BsFileRichtext } from 'react-icons/bs'
import { FaGlasses, FaMapMarkedAlt } from 'react-icons/fa'
import { MdEvent } from 'react-icons/md'
import { TiUser } from 'react-icons/ti'
import activities from './activities'
import humanMadeObject from './humanMadeObject'
import management from './management'
import pageBuilder from './pageBuilder'
import types from './types'
import references from './references'

const hiddenDocTypes = (listItem) =>
  ![
    'HumanMadeObject',
    'Collection',
    'Actor',
    'Period',
    'Event',
    'Activity',
    'LinguisticObject',
    'Report',
    'Acquisition',
    'Move',
    'DesignOrProcedure',
    'Timeline',
    'Exhibition',
    'Project',
    'SiteSettings',
    'Place',
    'SystemCategory',
    'Concept',
    'Material',
    'Work',
    'VisualItem',
    'Language',
    'ObjectType',
    'PlaceType',
    'EventType',
    'ExhibitionType',
    'ActorType',
    'TextType',
    'WorkType',
    'Technique',
    'StorageType',
    'SectionType',
    'ReportType',
    'MeasurementUnit',
    'IdentifierType',
    'DimensionType',
    'ConditionType',
    'ActivityType',
    'AcquisitionType',
    'AppelationType',
    'Role',
    'NavigationMenu',
    'navigationItem',
    'Page',
    'Post',
    'Route',
    'Toc',
    'Storage',
    'LinguisticDocument',
    'media.tag',
    'Transformation',
    'Production',
    'Measurement',
    'Joining',
    'Leaving',
    'Formation',
    'Dissolution',
    'Birth',
    'Death',
    'BeginningOfExistence',
    'Creation',
    'Destruction',
  ].includes(listItem.getId())

/* export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    references,
  ])
} */

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (['Page', 'LinguisticDocument'].includes(schemaType)) {
    return S.document().views([
      ...Structure.getDocumentNodeViewsForSchemaType(schemaType),
      references
    ])
  }

  return S.document().views([
    S.view.form(),
    references,
  ])
}

export default () =>
  S.list()
    .id('__root__')
    .title('Innhold')
    .items([
      pageBuilder,
      management,
      S.divider(),
      humanMadeObject,
      S.divider(),
      S.listItem()
        .title('Aktører')
        .icon(TiUser)
        .child(
          S.list()
            .title('Aktører')
            .items([
              S.listItem()
                .title('Alle Aktører')
                .icon(TiUser)
                .child(S.documentTypeList('Actor').title('Alle Aktører')),
              S.listItem()
                .title('Aktører etter type')
                .icon(TiUser)
                .child(
                  // List out all categories
                  S.documentTypeList('ActorType')
                    .title('Aktører etter type')
                    .filter('_type == "ActorType"')
                    .child((actorTypeId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Actor')
                        .title('Aktører')
                        .filter('_type == "Actor" && $actorTypeId in hasType[]._ref')
                        .params({ actorTypeId })
                        .initialValueTemplates([
                          S.initialValueTemplateItem('actorWithType', { actorTypeId })
                        ])
                    ),
                ),
              S.listItem().title('Upubliserte aktører').icon(TiUser).child(
                // List out all categories
                S.documentTypeList('Actor')
                  .title('Upubliserte aktører')
                  .filter('_type == "Actor" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(TiUser).child(
                // List out all categories
                S.documentTypeList('Actor')
                  .title('Til gjennomgang')
                  .filter('_type == "Actor" && editorialState == "review"'),
              ),
              S.divider(),
              S.documentTypeListItem('ActorType').title('Aktørtype'),
            ]),
        ),
      // Much used types
      S.divider(),
      S.documentTypeListItem('Concept').title('Emner'),
      S.documentTypeListItem('Material').title('Material'),
      // TYPE
      types,
      S.divider(),
      S.listItem()
        .title('Steder')
        .icon(FaMapMarkedAlt)
        .child(
          S.list()
            .title('Steder')
            .items([
              S.listItem()
                .title('Alle steder')
                .icon(FaMapMarkedAlt)
                .child(S.documentTypeList('Place').title('Alle steder')),
              S.listItem()
                .title('Steder etter type')
                .icon(FaMapMarkedAlt)
                .child(
                  // List out all categories
                  S.documentTypeList('PlaceType')
                    .title('Steder etter type')
                    .filter('_type == "PlaceType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Place')
                        .title('Steder')
                        .filter('_type == "Place" && $catId in hasType[]._ref')
                        .params({ catId }),
                    ),
                ),
              S.divider(),
              S.documentTypeListItem('PlaceType').title('Stedstype'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('Work').title('Verk'),
      S.documentTypeListItem('VisualItem').title('Visuell ting'),
      S.listItem()
        .title('Tekster')
        .icon(BsFileRichtext)
        .child(
          S.list()
            .title('Tekster')
            .items([
              S.listItem()
                .title('Alle tekster')
                .icon(FaGlasses)
                .child(S.documentTypeList('LinguisticDocument').title('Alle tekster')),
              S.listItem()
                .title('Tekster etter type')
                .icon(FaGlasses)
                .child(
                  // List out all categories
                  S.documentTypeList('TextType')
                    .title('Tekster etter type')
                    .filter('_type == "TextType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('LinguisticDocument')
                        .title('Tekster')
                        .filter('_type == "LinguisticDocument" && $catId in hasType[]._ref')
                        .params({ catId }),
                    ),
                ),
              S.listItem().title('Upubliserte tekster').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('LinguisticDocument')
                  .title('Upubliserte tekster')
                  .filter('_type == "LinguisticDocument" && accessState == "secret"'),
              ),
              S.listItem().title('Til gjennomgang').icon(FaGlasses).child(
                // List out all categories
                S.documentTypeList('LinguisticDocument')
                  .title('Til gjennomgang')
                  .filter('_type == "LinguisticDocument" && editorialState == "review"'),
              ),
              S.divider(),
              S.documentTypeListItem('TextType').title('Tekststype'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('Period').title('Perioder'),
      S.listItem()
        .title('Hendelser')
        .icon(MdEvent)
        .child(
          S.list()
            .title('Hendelser')
            .items([
              S.listItem()
                .title('Alle hendelser')
                .icon(MdEvent)
                .child(S.documentTypeList('Event').title('Alle hendelser')),
              S.listItem()
                .title('Hendelser etter type')
                .icon(MdEvent)
                .child(
                  // List out all categories
                  S.documentTypeList('EventType')
                    .title('Hendelser etter type')
                    .filter('_type == "EventType"')
                    .child((catId) =>
                      // List out project documents where the _id for the selected
                      // category appear as a _ref in the project’s categories array
                      S.documentList()
                        .schemaType('Event')
                        .title('Hendelser')
                        .filter('_type == "Event" && $catId in hasType[]._ref')
                        .params({ catId }),
                    ),
                ),
              S.divider(),
              S.documentTypeListItem('EventType').title('Hendelsestype'),
            ]),
        ),
      // ACTIVITY
      activities,
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])

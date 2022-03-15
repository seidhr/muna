import S from '@sanity/desk-tool/structure-builder'
import { FaTags } from 'react-icons/fa'
import { GiBoltSpellCast } from 'react-icons/gi'
// import PreviewIFrame from '../../src/components/previewIFrame'

const activities = S.listItem()
  .title('Aktiviteter')
  .icon(FaTags)
  .child(
    S.list()
      .title('Aktiviteter')
      .items([
        S.listItem()
          .title('Aktiviteter')
          .icon(GiBoltSpellCast)
          .child(
            S.list()
              .title('Aktiviteter')
              .items([
                S.listItem()
                  .title('Aktiviteter etter type')
                  .icon(GiBoltSpellCast)
                  .child(
                    // List out all categories
                    S.documentTypeList('ActivityType')
                      .title('Aktiviteter etter type')
                      .filter('_type == "ActivityType"')
                      .child((catId) =>
                        // List out project documents where the _id for the selected
                        // category appear as a _ref in the project’s categories array
                        S.documentList()
                          .schemaType('Activity')
                          .title('Aktiviteter')
                          .filter('_type == "Activity" && $catId in hasType[]._ref')
                          .params({ catId }),
                      ),
                  ),
                S.listItem()
                  .title('Alle aktiviteter')
                  .icon(GiBoltSpellCast)
                  .child(S.documentTypeList('Activity').title('Alle aktiviteter')),
              ]),
          ),
        S.documentTypeListItem('Production').title('Produksjon'),
        S.documentTypeListItem('Creation').title('Skapelse (ikke fysisk)'),
        S.documentTypeListItem('Measurement').title('Måling'),
        S.documentTypeListItem('BeginningOfExistence').title('Start på eksistens'),
        S.documentTypeListItem('Transformation').title('Transformasjon'),
        /* S.documentTypeListItem('EndOfExistence').title('Slutt på eksistens'), */
        S.documentTypeListItem('Birth').title('Fødsel'),
        S.documentTypeListItem('Death').title('Død'),
        S.documentTypeListItem('Formation').title('Opprettelse'),
        S.documentTypeListItem('Dissolution').title('Oppløsning'),
        S.documentTypeListItem('Destruction').title('Ødeleggelse'),
        S.documentTypeListItem('Joining').title('Innlemmelse'),
        S.documentTypeListItem('Leaving').title('Utmelding'),
        S.divider(),
        S.documentTypeListItem('ActivityType').title('Aktivitetstype'),
        S.documentTypeListItem('Technique').title('Teknikk'),

      ]),
  )

export default activities

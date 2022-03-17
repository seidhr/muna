import S from '@sanity/desk-tool/structure-builder'
import { createDeskHierarchy } from '@sanity/hierarchical-document-list'
//import * as Structure from '@sanity/document-internationalization/lib/structure'
import { FaSitemap, FaRoute } from 'react-icons/fa'
import { CgTemplate } from 'react-icons/cg'
import { FaGlasses } from 'react-icons/fa'
import { BsFileRichtext } from 'react-icons/bs'
import blog from './blog'
import config from 'config:@sanity/document-internationalization';
import { GiSettingsKnobs } from 'react-icons/gi'

// Not working in latest 0.1.2
/* const page = Structure.getFilteredDocumentTypeListItems().find(({ id }) => {
  return id === 'Page';
})
const linguisticDocument = Structure.getFilteredDocumentTypeListItems().find(({ id }) => {
  return id === 'LinguisticDocument';
}) */

export default S.listItem()
  .title('Sidebygger')
  .icon(FaSitemap)
  .child(
    S.list()
      .title('Sidebygger')
      .items([
        // SETTINGS SINGLETON
        S.listItem()
          .title('Nettsideinnstillinger')
          .icon(GiSettingsKnobs)
          .child(S.editor().id('siteSettings').schemaType('SiteSettings').documentId('siteSettings')),
        // page,
        S.listItem()
          .title('Sider')
          .icon(CgTemplate)
          .schemaType('Page')
          .child(
            S.documentList('Page')
              .title('Sider')
              .schemaType('Page')
              .filter(`_type == "Page" && !(_id match "**home") && __i18n_lang == $baseLanguage`)
              .params({ baseLanguage: config.base })
              .menuItems(S.documentTypeList('Page').getMenuItems())
          ),
        S.listItem()
          .title('Tekster')
          .icon(BsFileRichtext)
          .child(
            S.list()
              .title('Tekster')
              .items([
                // linguisticDocument,
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
        blog,
        S.divider(),
        S.listItem()
          .title('Stier')
          .icon(FaRoute)
          .schemaType('Route')
          .child(
            S.documentTypeList('Route')
              .title('Stier')
          ),
        S.divider(),
        createDeskHierarchy({
          title: 'Hovedmeny',
          // The hierarchy will be stored in this document ID 👇
          documentId: 'main-nav',
          // Document types editors should be able to include in the hierarchy
          referenceTo: ['Route'],
          // ❓ Optional: provide filters and/or parameters for narrowing which documents can be added
          /* referenceOptions: {
            filter: 'status in $acceptedStatuses',
            filterParams: {
              acceptedStatuses: ['published', 'approved']
            }
          }, */
          // ❓ Optional: limit the depth of your hierarachies
          maxDept: 3
        }),
      ]),
  )

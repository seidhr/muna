import S from '@sanity/desk-tool/structure-builder'
// import PreviewIFrame from '../../src/components/previewIFrame'
import { FaCog, FaSitemap, FaRoute } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { FcHome, FcTemplate } from 'react-icons/fc'
import { RiSideBarFill } from 'react-icons/ri'
import { AiFillAlert } from 'react-icons/ai'
import { FaGlasses } from 'react-icons/fa'
import { BsFileRichtext } from 'react-icons/bs'
import blog from './blog'

export default S.listItem()
  .title('Sidebygger')
  .icon(FaSitemap)
  .child(
    S.list()
      .title('Sidebygger')
      .items([
        S.documentListItem()
          .title('Frontpage')
          .schemaType('Page')
          .icon(FcHome)
          .child(S.document().schemaType('Page').documentId('frontpage')),
        S.documentListItem()
          .title('Footer')
          .schemaType('Page')
          .icon(FcHome)
          .child(S.document().schemaType('Page').documentId('footer')),
        S.listItem()
          .title('Sider')
          .icon(FcTemplate)
          .schemaType('Page')
          .child(
            S.documentList('Page')
              .title('Sider')
              .menuItems(S.documentTypeList('Page').getMenuItems())
              .filter('_type == "Page" && !(_id match "**frontpage")'),
          ),
        S.listItem()
          .title('Tekster')
          .icon(BsFileRichtext)
          .child(
            S.list()
              .title('Tekster')
              .items([
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
                S.listItem()
                  .title('Alle tekster')
                  .icon(FaGlasses)
                  .child(S.documentTypeList('LinguisticDocument').title('Alle tekster')),
              ]),
          ),
        blog,
        S.listItem()
          .title('Varsler')
          .icon(AiFillAlert)
          .schemaType('Alert')
          .child(
            S.documentList('Alert')
              .title('Varsler')
              .menuItems(S.documentTypeList('Alert').getMenuItems())
              .filter('_type == "Alert"'),
          ),
        S.divider(),
        S.listItem()
          .title('Stier')
          .icon(FaRoute)
          .schemaType('Route')
          .child(
            S.documentTypeList('Route')
              .title('Stier')
            /*               .child(
                            (documentId) => S.document().documentId(documentId).schemaType('Route'),
                            // .views([S.view.form(), PreviewIFrame()])
                          ), */
          ),
        S.divider(),
        S.listItem()
          .title('Navigasjonsmenyer')
          .icon(MdMenu)
          .schemaType('NavigationMenu')
          .child(
            S.documentTypeList('NavigationMenu')
              .title('Navigasjonsmenyer')
          ),
        S.listItem()
          .title('Innholdsfortegnelser')
          .icon(RiSideBarFill)
          //.schemaType('Toc')
          .child(
            S.documentTypeList('Toc')
              .title('Innholdsfortegnelser')
              .child(
                (documentId) => S.document().documentId(documentId).schemaType('Toc'),
                // .views([S.view.form(), PreviewIFrame()])
              ),
          ),
        S.divider(),
        // SETTINGS SINGLETON
        S.listItem()
          .title('Nettsideinnstillinger')
          .icon(FaCog)
          .child(S.editor().id('siteSettings').schemaType('SiteSettings').documentId('site-settings')),
      ]),
  )

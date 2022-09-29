import S from '@sanity/desk-tool/structure-builder'
import { FaTags } from 'react-icons/fa'

const types = S.listItem()
  .title('...andre typer')
  .icon(FaTags)
  .child(
    S.list()
      .title('Typer')
      .items([
        S.documentTypeListItem('IdentifierType').title('IdentifikatorType'),
        S.documentTypeListItem('AppelationType').title('Navnetype'),
        S.documentTypeListItem('Language').title('Språk'),
      ]),
  )

export default types

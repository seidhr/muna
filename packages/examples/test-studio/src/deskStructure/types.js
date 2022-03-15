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
        S.documentTypeListItem('Role').title('Rolle'),
        S.documentTypeListItem('SectionType').title('Seksjonstype'),
        S.documentTypeListItem('Language').title('Språk'),
        S.documentTypeListItem('MeasurementUnit').title('Måleenhet'),
        S.documentTypeListItem('DimensionType').title('Dimensjonstype'),
        S.documentTypeListItem('WorkType').title('Verkstype'),
      ]),
  )

export default types

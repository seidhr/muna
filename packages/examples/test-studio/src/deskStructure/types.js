import S from '@sanity/desk-tool/structure-builder'
import {FaTags} from 'react-icons/fa'
// import PreviewIFrame from '../../src/components/previewIFrame'

const types = S.listItem()
  .title('...andre typer')
  .icon(FaTags)
  .child(
    S.list()
      .title('Typer')
      .items([
        S.documentTypeListItem('ActivityType').title('Aktivitetstype'),
        S.documentTypeListItem('AcquisitionType').title('Akkvisisjonstype'),
        S.documentTypeListItem('ActorType').title('Aktørtype'),
        S.documentTypeListItem('DimensionType').title('Dimensjonstype'),
        S.documentTypeListItem('EventType').title('Hendelsestype'),
        S.documentTypeListItem('IdentifierType').title('IdentifikatorType'),
        S.documentTypeListItem('StorageType').title('Lagringstype'),
        S.documentTypeListItem('MeasurementUnit').title('Måleenhet'),
        S.documentTypeListItem('AppelationType').title('Navnetype'),
        S.documentTypeListItem('ObjectType').title('Objekttype'),
        S.documentTypeListItem('ReportType').title('Rapporttype'),
        S.documentTypeListItem('Role').title('Rolle'),
        S.documentTypeListItem('SectionType').title('Seksjonstype'),
        S.documentTypeListItem('Language').title('Språk'),
        S.documentTypeListItem('PlaceType').title('Stedstype'),
        S.documentTypeListItem('Technique').title('Teknikk'),
        S.documentTypeListItem('TextType').title('Tekststype'),
        S.documentTypeListItem('ConditionType').title('Tilstandstype'),
        S.documentTypeListItem('ExhibitionType').title('Utstillingstype'),
        S.documentTypeListItem('WorkType').title('Verkstype'),
      ]),
  )

export default types

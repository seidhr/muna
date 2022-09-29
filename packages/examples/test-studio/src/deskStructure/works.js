import S from '@sanity/desk-tool/structure-builder'
import { MdOutlineEmojiObjects } from 'react-icons/md'

const works = S.listItem()
  .title('Verk')
  .icon(MdOutlineEmojiObjects)
  .child(
    S.list()
      .title('Verk')
      .items([
        S.documentTypeListItem('Work').title('Verk'),
        S.documentTypeListItem('VisualItem').title('Visuell ting'),
        S.divider(),
        S.documentTypeListItem('WorkType').title('Verkstype'),
      ]),
  )

export default works

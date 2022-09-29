import S from '@sanity/desk-tool/structure-builder'
import {GoMegaphone as BlogIcon, GoArchive as AllIcon} from 'react-icons/go'

// import PreviewIFrame from '../../src/components/previewIFrame'

export const icons = {
  BlogIcon,
  AllIcon,
}

const blog = S.listItem()
  .title('Blogg')
  .icon(BlogIcon)
  .child(
    S.list()
      .title('/blog')
      .items([
        S.listItem()
          .title('Publiserte blogginnlegg')
          .schemaType('Post')
          .icon(BlogIcon)
          .child(
            S.documentTypeList('Post')
              .title('Publiserte blogginnlegg')
              .menuItems(S.documentTypeList('Post').getMenuItems())
              .filter('_type == "Post" && publishedAt < now() && !(_id in path("drafts.**"))'),
            /* .child((documentId) =>
                S.document()
                  .documentId(documentId)
                  .schemaType('Post')
                  .views([S.view.form(), PreviewIFrame()])
              ) */
          ),
        S.documentTypeListItem('Post')
          .title('Alle blogginnlegg')
          .icon(
            AllIcon,
          ) /* ,
        S.listItem()
          .title('Post by author')
          .child(
            S.documentTypeList('actor')
              .title('Post by author')
              .filter(
                '_type == "actor" && count(*[_type=="Post" && ^._id in authors[]->.actor._ref]) > 0'
              )
              .child(id =>
              // List out project documents where the _id for the selected
              // category appear as a _ref in the project’s categories array
                S.documentList()
                  .schemaType('Post')
                  .title('Blogs')
                  .filter(
                    '_type == "Post" && $id in authors[].actor._ref'
                  )
                  .params({id})
              )
          ) */,
      ]),
  )

export default blog

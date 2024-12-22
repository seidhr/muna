import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const file = defineField({
  name: 'file',
  title: 'File',
  description: (
    <span>
      Upload or choose a image. This image will be used for previews.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'file',
  options: {
    semanticSanity: {
      '@type': '@json',
    },
  },
})

import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const image = defineField({
  name: 'image',
  title: 'Thumbnail',
  description: (
    <span>
      Upload or choose a image. This image will be used for previews.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
  type: 'DigitalObjectImage',
  options: {
    hotspot: true,
    semanticSanity: {
      '@type': '@json',
    },
  },
})

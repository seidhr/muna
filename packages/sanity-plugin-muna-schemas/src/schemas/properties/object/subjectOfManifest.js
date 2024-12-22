import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { defineField } from 'sanity'

export const subjectOfManifest = defineField({
  name: 'subjectOfManifest',
  title: 'Main manifest',
  type: 'url',
  descriptionEN: (
    <span>
      The main manifest of this object.{' '}
      <a target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </a>
    </span>
  ),
})

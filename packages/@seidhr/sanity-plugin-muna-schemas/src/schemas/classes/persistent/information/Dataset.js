import { label } from "../../../properties/datatype"
import { homepage, preferredIdentifier } from "../../../properties/object"

export default {
  name: 'Dataset',
  type: 'object',
  title: 'Datasett',
  titleEN: 'Dataset',
  fields: [
    homepage,
    label,
    preferredIdentifier
  ],
}

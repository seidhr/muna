// This fucker cannot be imported, as the developer of it is an ass
import edtf from 'edtf'

export const getTimespan = (date) => {
  return {
    min: new Date(edtf(date).min),
    max: new Date(edtf(date).max),
  }
}

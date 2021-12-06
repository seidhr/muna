import { Timespan } from '../types'

/**
 * Remember to handle errors
 * @param {object} edtf edtf object
 * @returns Timespan object
 */
export const mapEDTF = (edtf: any): Timespan => {
  if (!edtf) {
    return null
  }
  //console.log(edtf)

  if (edtf.type == 'Interval') {
    const timespan: Timespan = {
      beginOfTheBegin: edtf.lower?.min ? new Date(edtf.lower?.min).toISOString() : '',
      endOfTheBegin: edtf.lower?.max ? new Date(edtf.lower?.max).toISOString() : '',
      date: '',
      beginOfTheEnd: edtf.upper?.min ? new Date(edtf.upper?.min).toISOString() : '',
      endOfTheEnd: edtf.upper?.max ? new Date(edtf.upper?.max).toISOString() : ''
    }
    // console.log('returning: ', timespan)
    return timespan
  }

  const timespan: Timespan = {
    beginOfTheBegin: edtf.min && (edtf.min != edtf.max) ? new Date(edtf.min).toISOString() : '',
    endOfTheBegin: '',
    date: edtf.min === edtf.max ? new Date(edtf.min).toISOString() : '',
    beginOfTheEnd: '',
    endOfTheEnd: edtf.max && (edtf.min != edtf.max) ? new Date(edtf.max).toISOString() : ''
  }
  // console.log('returning', timespan)
  return timespan

}

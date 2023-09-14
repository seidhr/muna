import { Timespan } from '../types'
import { utcToZonedTime, format } from 'date-fns-tz'
import { fromUnixTime } from 'date-fns'

const getDateFromDateTime = (unix: number) => {
  const date = format(utcToZonedTime(fromUnixTime(unix / 1000), 'UTC'), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'UTC' })
  return date
}

const getDateFromDate = (unix: number) => {
  const date = format(fromUnixTime(unix / 1000), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: 'UTC' })
  return date
}

/**
 * Remember to handle errors
 * @param {object} edtf edtf object
 * @returns Timespan object
 */
export const mapEDTF = (edtf: any): Timespan => {
  if (!edtf) {
    return null
  }
  //console.log(edtf)

  if (edtf.type == 'Interval') {
    const timespan: Timespan = {
      ...(edtf.lower?.min && { beginOfTheBegin: getDateFromDateTime(edtf.lower?.min) }),
      ...(edtf.lower?.max && { endOfTheBegin: getDateFromDateTime(edtf.lower?.max) }),
      ...(edtf.upper?.min && { beginOfTheEnd: getDateFromDateTime(edtf.upper?.min) }),
      ...(edtf.upper?.max && { endOfTheEnd: getDateFromDateTime(edtf.upper?.max) }),
    }
    // console.log('returning: ', timespan)
    return timespan
  }

  const timespan: Timespan = {
    ...(edtf.min && (edtf.min != edtf.max) && { beginOfTheBegin: getDateFromDateTime(edtf.min) }),
    ...(edtf.min && (edtf.min === edtf.max) && { date: getDateFromDate(edtf.min) }),
    ...(edtf.max && (edtf.min != edtf.max) && { endOfTheEnd: getDateFromDateTime(edtf.max) }),
  }
  // console.log('returning', timespan)
  return timespan
}

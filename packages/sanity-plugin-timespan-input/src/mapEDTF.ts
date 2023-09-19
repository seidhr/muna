/* eslint-disable prettier/prettier */
import { utcToZonedTime, format } from 'date-fns-tz'
import { fromUnixTime } from 'date-fns'
import { EDTF, Patch } from './types'

const getDateFromDateTime = (unix: number) => {
  const date = format(
    utcToZonedTime(fromUnixTime(unix / 1000), 'UTC'),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    { timeZone: 'UTC' },
  )
  return date
}

const getDateFromDate = (unix: number) => {
  const date = format(fromUnixTime(unix / 1000), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
    timeZone: 'UTC',
  })
  return date
}

/**
 * Remember to handle errors
 * @param {object} edtf edtf object
 * @returns Timespan object
 */
export const mapEDTF = (edtf: EDTF): Patch[] => {
  if (edtf.type == '_Interval') {
    const intervalBeginOfTheBegin = edtf.lower?.min
      ? {
        value: getDateFromDateTime(edtf.lower?.min),
        path: ['beginOfTheBegin'],
      }
      : null

    const intervalEndOfTheBegin = edtf.lower?.max
      ? {
        value: getDateFromDateTime(edtf.lower?.max),
        path: ['endOfTheBegin'],
      }
      : null
    const intervalBeginOfTheEnd = edtf.upper?.min
      ? {
        value: getDateFromDateTime(edtf.upper?.min),
        path: ['beginOfTheEnd'],
      }
      : null
    const intervalEndOfTheEnd = edtf.upper?.max
      ? {
        value: getDateFromDateTime(edtf.upper?.max),
        path: ['endOfTheEnd'],
      }
      : null

    const timespan = [
      intervalBeginOfTheBegin,
      intervalEndOfTheBegin,
      intervalBeginOfTheEnd,
      intervalEndOfTheEnd,
    ].filter(Boolean) as Patch[]

    return timespan
  }

  const beginOfTheBegin =
    edtf.min && edtf.min != edtf.max
      ? {
        value: getDateFromDateTime(edtf.min),
        path: ['beginOfTheBegin'],
      }
      : null

  const date =
    edtf.min && edtf.min === edtf.max ? { value: getDateFromDate(edtf.min), path: ['date'] } : null

  const endOfTheEnd =
    edtf.max && edtf.min != edtf.max
      ? { value: getDateFromDateTime(edtf.max), path: ['endOfTheEnd'] }
      : null

  const timespan = [beginOfTheBegin, date, endOfTheEnd].filter(Boolean) as Patch[]

  return timespan
}

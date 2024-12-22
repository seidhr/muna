/* eslint-disable prettier/prettier */
import { TZDate } from '@date-fns/tz'
import { format, fromUnixTime } from 'date-fns'
import { EDTF, Patch } from './types'

const getDateFromDateTime = (unix: number) => {
  const date = format(
    new TZDate(fromUnixTime(unix / 1000), 'UTC'),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  )
  return date
}

const getDateFromDate = (unix: number) => {
  const date = format(fromUnixTime(unix / 1000), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  return date
}

/**
 * Map the edtf extended Date to a Sanity patch array
 * @param {object} edtf edtf extended Date
 * @returns Sanity patch array
 */
export const mapEDTF = (edtf: EDTF): Patch[] => {
  // Get the dates for Intervals and single dates from the edtf extended Date
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
  const beginOfTheBegin = edtf.min && edtf.min != edtf.max
    ? {
      value: getDateFromDateTime(edtf.min),
      path: ['beginOfTheBegin'],
    }
    : null
  const date = edtf.min && edtf.min === edtf.max
    ? {
      value: getDateFromDate(edtf.min),
      path: ['date']
    }
    : null
  const endOfTheEnd = edtf.max && edtf.min != edtf.max
    ? {
      value: getDateFromDateTime(edtf.max),
      path: ['endOfTheEnd']
    }
    : null

  // Create the patch array
  const timespan = [
    intervalBeginOfTheBegin ?? beginOfTheBegin,
    intervalEndOfTheBegin,
    date,
    intervalBeginOfTheEnd,
    intervalEndOfTheEnd ?? endOfTheEnd,
  ].filter(Boolean) as Patch[]

  return timespan
}

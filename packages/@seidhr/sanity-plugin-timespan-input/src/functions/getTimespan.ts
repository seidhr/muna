// This fucker cannot be imported, as the developer of it is an ass
import edtf from 'edtf'
import isMatch from 'date-fns/isMatch'
import parse from 'date-fns/parse'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'

/**
 * Remember to handle errors
 * @param date edtf string
 * @returns object
 */
export const getTimespan = (date: string) => {
  if (!date) {
    return null
  }

  let timespan = {
    edtf: date,
    date: undefined,
    begin: {
      beginOfTheBegin: undefined,
      endOfTheBegin: undefined,
    },
    end: {
      beginOfTheEnd: undefined,
      endOfTheEnd: undefined,
    }
  }

  if (isMatch(date, 'yyyy-MM-dd HH:mm')) {
    timespan.date = zonedTimeToUtc(parse(date, 'yyyy-MM-dd HH:mm', new Date()), 'Europe/London')
    return timespan
  }

  if (date.includes('/')) {
    try {
      const [start, end] = date.split('/', 2)
      timespan.begin.beginOfTheBegin = start ? new Date(edtf(start).min) : undefined
      timespan.begin.endOfTheBegin = start ? new Date(edtf(start).max) : undefined
      timespan.end.beginOfTheEnd = end ? new Date(edtf(end).min) : undefined
      timespan.end.endOfTheEnd = end ? new Date(edtf(end).max) : undefined

      return timespan
    } catch (e) {
      if (e instanceof RangeError) {
        return e
      } else {
        throw e;  // re-throw the error unchanged
      }
    }
  } else {
    try {
      timespan.begin.beginOfTheBegin = new Date(edtf(date).min)
      timespan.end.endOfTheEnd = new Date(edtf(date).max)
      return timespan

    } catch (e) {
      if (e instanceof RangeError) {
        return e
      } else {
        return e;  // re-throw the error unchanged
      }
    }
  }
  return null
}

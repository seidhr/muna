type LocaleString = {
  _type: 'LocaleString'
  no?: string
  en?: string
}

type TimeSpan = {
  _type: 'TimeSpan'
  date?: Date
  beginOfTheBegin?: Date
  endOfTheBegin?: Date
  beginOfTheEnd?: Date
  endOfTheEnd?: Date
}

type ActivityStream = {
  label: LocaleString
  timespan?: TimeSpan
}

interface SActor {
  label: LocaleString
  sortedLabel?: string
  activityStream: [ActivityStream]
}
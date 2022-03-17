type LocalizedString = {
  _type: 'LocalizedString'
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
  label: LocalizedString
  timespan?: TimeSpan
}

interface SActor {
  label: LocalizedString
  sortedLabel?: string
  activityStream: [ActivityStream]
}
var dayjs = require('dayjs');
var _ = require('lodash');
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
require('dayjs/locale/nb')

export const timespanAsString = (bb, eb, date, be, ee, lang) => {
  let dates = _.pickBy({ bb: bb, eb: eb, date: date, be: be, ee: ee }, _.identity);
  dates = Object.assign(
    {},
    ...Object.keys(dates).map((date) => ({ [date]: dayjs(dates[date]).locale(lang).format('LL') }))
  );
  let prettyTimespan = `${dates.date || ''}${dates.bb || ''}${dates.bb && dates.eb ? '~' : ''}${dates.eb || ''}` +
    `${(dates.bb || dates.eb) && (dates.be || dates.ee) ? ' / ' : ''}` +
    `${dates.be || ''}${dates.be && dates.ee ? '~' : ''}${dates.ee || ''}`;
  return prettyTimespan;
};

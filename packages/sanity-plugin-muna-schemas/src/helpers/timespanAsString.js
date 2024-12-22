const dayjs = require('dayjs');
const _ = require('lodash');
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
require('dayjs/locale/nb')

// eslint-disable-next-line max-params
export const timespanAsString = (bb, eb, date, be, ee, lang) => {
  let dates = _.pickBy({ bb, eb, date, be, ee }, _.identity);
  dates = Object.assign(
    {},
    ...Object.keys(dates).map((d) => ({ [d]: dayjs(dates[d]).locale(lang).format('LL') }))
  );
  const prettyTimespan = `${dates.date || ''}${dates.bb || ''}${dates.bb && dates.eb ? '~' : ''}${dates.eb || ''}` +
    `${(dates.bb || dates.eb) && (dates.be || dates.ee) ? ' / ' : ''}` +
    `${dates.be || ''}${dates.be && dates.ee ? '~' : ''}${dates.ee || ''}`;
  return prettyTimespan;
};

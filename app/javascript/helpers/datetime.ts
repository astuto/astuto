import I18n from 'i18n-js';

export const friendlyDate = date => {
  var now = new Date();
  var timeStamp = fromRailsStringToJavascriptDate(date);

  const ONE_MINUTE = 60;
  const ONE_HOUR = 3600;
  const ONE_DAY = 86400;
  const ONE_MONTH = 2592000; // 30 days
  const ONE_YEAR = 31536000; // 365 days

  var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  
  if (secondsPast < ONE_MINUTE) {
    return I18n.t('common.datetime.now');
  } else if (secondsPast < ONE_HOUR) {
    let minutesPast = Math.round(secondsPast / ONE_MINUTE);
    return I18n.t('common.datetime.minutes', { count: minutesPast });
  } else if (secondsPast <= ONE_DAY) {
    let hoursPast = Math.round(secondsPast / ONE_HOUR);
    return I18n.t('common.datetime.hours', { count: hoursPast });
  } else if (secondsPast <= ONE_MONTH) {
    let daysPast = Math.round(secondsPast / ONE_DAY);
    return I18n.t('common.datetime.days', { count: daysPast });
  } else if (secondsPast <= ONE_YEAR) {
    let monthsPast = Math.round(secondsPast / ONE_MONTH);
    return I18n.t('common.datetime.months', { count: monthsPast });
  } else {
    let yearsPast = Math.round(secondsPast / ONE_YEAR);
    return I18n.t('common.datetime.years', { count: yearsPast });
  }
}

export default friendlyDate;

/*
  Converts the default Rails datetime string
  format to a JavaScript Date object.
*/
export const fromRailsStringToJavascriptDate = date => {
  let dateOnly = date.slice(0, 10);
  let timeOnly = date.slice(11, 19);
  
  return new Date(`${dateOnly}T${timeOnly}Z`);
}

export const fromJavascriptDateToRailsString = (date: Date) => {
  return date.toJSON();
}
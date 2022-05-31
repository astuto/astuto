import I18n from 'i18n-js';

export const friendlyDate = date => {
  var now = new Date();
  var timeStamp = fromRailsStringToJavascriptDate(date);

  var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  
  if (secondsPast < 60) {
    return I18n.t('common.datetime.now');
  } else if (secondsPast < 3600) {
    let minutesPast = Math.round(secondsPast / 60);
    return I18n.t('common.datetime.minutes', { count: minutesPast });
  } else if (secondsPast <= 86400) {
    let hoursPast = Math.round(secondsPast / 3600);
    return I18n.t('common.datetime.hours', { count: hoursPast });
  } else {
    let daysPast = Math.round(secondsPast / 86400);
    return I18n.t('common.datetime.days', { count: daysPast });
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
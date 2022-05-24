export const friendlyDate = date => {
  var now = new Date();
  var timeStamp = fromRailsStringToJavascriptDate(date);

  var secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  
  if (secondsPast < 60) {
    return 'just now';
  } else if (secondsPast < 3600) {
    let minutesPast = Math.round(secondsPast / 60);
    return minutesPast + ' ' + (minutesPast === 1 ? 'minute' : 'minutes') + ' ago';
  } else if (secondsPast <= 86400) {
    let hoursPast = Math.round(secondsPast / 3600);
    return hoursPast + ' ' + (hoursPast === 1 ? 'hour' : 'hours') + ' ago';
  } else {
    let daysPast = Math.round(secondsPast / 86400);
    return daysPast + ' ' + (daysPast === 1 ? 'day' : 'days') + ' ago';
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
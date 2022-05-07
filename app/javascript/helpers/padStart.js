// padStart has been introduced in ES2017, but right now we're running on ES2016
// This is a MDN polyfill used as an alternative
// TODO: switch to ES2017 and remove this script

function padStart(str, targetLength, padString) {
  targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '));
  if (str.length > targetLength) {
      return String(str);
  }
  else {
      targetLength = targetLength-str.length;
      if (targetLength > padString.length) {
          padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0,targetLength) + String(str);
  }
};

export default padStart;
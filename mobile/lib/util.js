const LineStyle = {
  '123': { color: '#EE352E' },
  '456': { color: '#00933C' },
  '7': { color: '#B933AD' },
  'ACE': { color: '#0039A6' },
  'BDFM': { color: '#FF6319' },
  'G': { color: '#6CBE45' },
  'JZ': { color: '#996633' },
  'L': { color: '#A7A9AC' },
  'NQR': { color: '#FCCC0A' },
  'S': { color: '#808183' },
  'SIR': { color: '#192b87' }
};

const WordHelper = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const DateHelper = (date) => {
  date = date.split(':');
  if (date[0] < 12) {
    return `${date[0]}:${date[1]} AM`;
  } else if (date[0] === 12) {
    return `${date[0]}:${date[1]} PM`;
  } else if (date < 24) {
    return `${date[0] - 12}:${date[1]} PM`;
  } else {
    return `${date[0]-24}:${date[1]} AM tomorrow morning`;
  }
};

export default Helpers = {
  LineStyle,
  WordHelper,
  DateHelper
};

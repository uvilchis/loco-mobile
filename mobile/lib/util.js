const LineStyle = {
  '123': { color: '#e80909' },
  '456': { color: 'green' },
  '7': { color: 'purple' },
  'ACE': { color: 'blue' },
  'BDFM': { color: 'orange' },
  'G': { color: '#21bc43' },
  'JZ': { color: '#706127' },
  'L': { color: 'grey' },
  'NQR': { color: 'gold' },
  'S': { color: 'lightslategrey' },
  'SIR': { color: '#192b87' }
};

const WordHelper = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const DateHelper = (date) => {
  date = date.split(':');
  if (date[0] < 12) {
    return `${date[0]}:${date[1]} AM`;
  } else if (date[0] === 12) {
    return `${date[0]}:${date[1]} PM`;
  } else if (date[0] < 24) {
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
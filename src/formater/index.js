import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';
import makeJsonFormat from './json.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishFormat(data);
    case 'plain':
      return makePlainFormat(data);
    case 'json':
      return makeJsonFormat(data);
    default:
      return 'Error';
  }
};

export default chooseFormat;

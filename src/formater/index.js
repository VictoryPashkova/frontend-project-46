import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishFormat(data);
    case 'plain':
      return makePlainFormat(data);
    default:
      return 'Error';
  }
};

export default chooseFormat;

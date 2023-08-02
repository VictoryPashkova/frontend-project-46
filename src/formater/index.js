import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';
import makeJsonFormat from './json.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'Stylish':
      return makeStylishFormat(data);
    case 'Plain':
      return makePlainFormat(data);
    case 'Json':
      return makeJsonFormat(data);
    default:
      throw new Error(`Unknowen format ${format}`);
  }
};

export default chooseFormat;

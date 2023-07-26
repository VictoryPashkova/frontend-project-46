import stylish from './stylish.js';

const chooseFormat = (data, format) => {
  switch (format) {
    case 'stylish': 
      return stylish(data);
    case 'something':
      return null;
    default:
      return 'Error';
  }
};

export default chooseFormat;

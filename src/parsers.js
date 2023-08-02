import yaml from 'js-yaml';

const getParsedFileData = (fileData, fileFormat) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(fileData);
    case 'yaml':
      return yaml.load(fileData);
    case 'yml':
      return yaml.load(fileData);
    default:
      throw new Error(`Unknowen format ${fileFormat}`);
  }
};

export default getParsedFileData;

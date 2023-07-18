import yaml from 'js-yaml';

const getParsedFileData = (fileData, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(fileData);
  } if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return yaml.load(fileData);
  }
  return 'file extension error';
};

export default getParsedFileData;

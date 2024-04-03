const path = require('path');
const fs = require('fs');

function saveJson({ data, filePath, isAbsolute }) {
  let _path = filePath;
  if (!isAbsolute) {
    _path = path.join(__dirname, '../assets', filePath);
  }
  fs.writeFileSync(_path, JSON.stringify(data, null, 2));
}

module.exports = {
  saveJson,
};

const fs = require('fs');
const path = require('path');
const { saveJson } = require('./utils');

let CiDict = null;

/** 加载新华字典 */
function loadCiDict() {
  if (!CiDict) {
    const filePath = path.join(__dirname, '../assets/dict/ci.json');
    const res = fs.readFileSync(filePath, { encoding: 'utf-8' });
    CiDict = JSON.parse(res);
  }
}

/** 根据单个字组词，把结果保存到 json 文件中 */
function getWordsByChar({ char }) {
  if (!char) return;
  let res = [];
  for (let item of CiDict) {
    if (!item) continue;
    if (item.ci.includes(char)) {
      if (item.ci.length <= 4) {
        // 大于 4 字，不录
        res.push(item);
      }
    }
  }
  return res;
}

function main({ char, fileName }) {
  loadCiDict();
  const ciList = getWordsByChar({ char });
  saveJson({ data: ciList, filePath: `selected/${fileName}.json` });
}

main({ char: '黄', fileName: 'huang' });

const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

function getJsonFile({ filePath }) {
  const res = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return JSON.parse(res);
}

function downloadGushiJson({ url }) {
  if (!url) throw '请输入在线 json 地址';
  const fileName = url.match(/\/([^\/]+\.json)$/)?.[1];
  const targetPath = path.join(__dirname, '../assets/gushi', fileName);
  if (!fs.existsSync(targetPath)) {
    execSync(`curl -o ${targetPath} ${url}`);
  }
  return getJsonFile({ filePath: targetPath });
}

/**
 * 查找选定字是否在诗词中，默认在单行中包含即可
 * words: ['关', '在']
 * mode: 'any' |'all'
 *  - 'any': 诗句里面只要包含任何一个 word，就算匹配
 *  - 'all': 诗句里包含所有 word，才能匹配
 * gushiUrl: 'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/%E8%AF%97%E7%BB%8F/shijing.json'
 */
function findWordInGushi({ words, gushiUrl, mode = 'any' }) {
  if (!words?.length) return;
  const gushi = downloadGushiJson({ url: gushiUrl });
  let res = [];
  gushi.forEach((poem, gushiIndex) => {
    poem.content.forEach((line, lineIndex) => {
      let matchCount = 0;
      words.forEach((x) => {
        if (line.includes(x)) {
          matchCount++;
        }
      });
      if (!matchCount) return;
      const meta = {
        line,
        index: lineIndex,
        gushi: poem,
        gushiIndex,
      };
      if (mode === 'any' && matchCount) {
        res.push(meta);
      }
      if (mode === 'all' && matchCount === words.length) {
        res.push(meta);
      }
    });
  });
  return res;
}

const list = findWordInGushi({ words: ['黄'], gushiUrl: 'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/%E8%AF%97%E7%BB%8F/shijing.json' });
console.log(list);

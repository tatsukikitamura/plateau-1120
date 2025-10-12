const fs = require('fs');
const path = require('path');

/**
 * 指定されたディレクトリを再帰的に検索し、特定のファイル名のファイルのパスをすべて見つけ出す関数
 * @param {string} startPath - 検索を開始するディレクトリのパス
 * @param {string} filter - 検索するファイル名 (例: 'tileset.json')
 * @returns {string[]} - 見つかったファイルのパスの配列
 */
function findFiles(startPath, filter) {
  let results = [];

  // 指定されたパスが存在するか確認
  if (!fs.existsSync(startPath)) {
    console.log("ディレクトリが見つかりません:", startPath);
    return [];
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);

    // サブディレクトリの場合は、再帰的にこの関数を呼び出す
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filename, filter));
    } 
    // ファイル名がフィルターと一致する場合は、結果の配列に追加
    else if (path.basename(filename) === filter) {
      results.push(filename);
    }
  }
  return results;
}

// --- 実行 ---
const searchDirectory = './data'; // 検索対象のディレクトリ
const targetFile = 'tileset.json';   // 検索するファイル名

const allTilesetPaths = findFiles(searchDirectory, targetFile);

console.log('見つかった tileset.json ファイル:');
console.log(allTilesetPaths);

// 見つかったファイルの中身を読み込みたい場合
/*
allTilesetPaths.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(content);
    console.log(`\n--- ${filePath} の内容 ---`);
    console.log(jsonData.asset); // 例としてassetプロパティを表示
  } catch (err) {
    console.error(`ファイルの読み込みまたは解析に失敗しました: ${filePath}`, err);
  }
});
*/
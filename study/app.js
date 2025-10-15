import { geourls, loadGeoJSON } from './javascript/geojson.js';
import { urls, load3dTile } from './javascript/3dtile.js';
import { loadOsmBuildings } from './javascript/osmBuildings.js';
import { initializeUIController } from './javascript/uiController.js';

// Cesium Ion アクセストークンの設定
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDVkMGZiMS1kN2EwLTQwMzQtYmVhZS0xNDI1MTEyNGFjMmMiLCJpZCI6MzQ3NTk0LCJpYXQiOjE3NTk3MjE0NTd9.pz5v1AKLw6RjXhfmwWHs8a1gUdW0pE2cHVKlaPu-F-o';

// Cesiumビューアーの初期化
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});    

// カメラの初期位置設定
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(140.12, 35.60, 400),
});

/**
 * メイン関数
 */
async function main() {
  // OSM Buildingsの読み込み
  await loadOsmBuildings(viewer);
  
  // 3D Tilesetの読み込み
  load3dTile(viewer, urls);
  
  // GeoJSONデータの読み込み
  loadGeoJSON(viewer, geourls);
  
  // UIコントローラーの初期化
  initializeUIController(viewer);
}

// アプリケーションの開始

initializeUIController(viewer);
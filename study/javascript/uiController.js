/**
 * UI操作とイベントリスナーを管理するモジュール
 */
import { loadGeoJSON, geourls } from './geojson.js';
import { load3dTile, urls } from './3dtile.js';
import { clearGeoJSONDataSources } from './dataManager.js';

/**
 * UIコントローラーを初期化する関数
 * @param {Cesium.Viewer} viewer - Cesiumのビューアーインスタンス
 */
export function initializeUIController(viewer) {
  // DOM要素の取得
  const pointButton = document.getElementById('point-button');
  const lineButton = document.getElementById('line-button');
  const multiLineButton = document.getElementById('multi-line-button');
  const pointSelectionContainer = document.getElementById('point-selection-container');
  const landmarkButton = document.getElementById('landmark-button');
  const parkButton = document.getElementById('park-button');
  const shelterButton = document.getElementById('shelter-button');
  const stationButton = document.getElementById('station-button');
  const allPointsButton = document.getElementById('all-points-button');

  // Pointボタンのイベントリスナー
  pointButton.addEventListener('click', () => {
    console.log('Pointボタンがクリックされました');
    // Point選択コンテナの表示/非表示を切り替え
    if (pointSelectionContainer.style.display === 'none') {
      pointSelectionContainer.style.display = 'block';
    } else {
      pointSelectionContainer.style.display = 'none';
    }
  });

  // Lineボタンのイベントリスナー
  lineButton.addEventListener('click', () => {
    console.log('Lineボタンがクリックされました');
    load3dTile(viewer, urls);
  });

  // Multi Lineボタンのイベントリスナー（MultiLineStringのみロード）
  multiLineButton.addEventListener('click', () => {
    console.log('Multi Lineボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    const multiLineUrls = geourls.filter(url => url.includes('MultiLineString'));
    loadGeoJSON(viewer, multiLineUrls);
  });

  // Pointデータ選択ボタンのイベントリスナー
  landmarkButton.addEventListener('click', () => {
    console.log('ランドマークボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    loadGeoJSON(viewer, ['../data/geoJSON/Point/landmark.geojson']);
  });

  parkButton.addEventListener('click', () => {
    console.log('公園ボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    loadGeoJSON(viewer, ['../data/geoJSON/Point/park.geojson']);
  });

  shelterButton.addEventListener('click', () => {
    console.log('避難所ボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    loadGeoJSON(viewer, ['../data/geoJSON/Point/shelter.geojson']);
  });

  stationButton.addEventListener('click', () => {
    console.log('駅ボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    loadGeoJSON(viewer, ['../data/geoJSON/Point/station.geojson']);
  });

  allPointsButton.addEventListener('click', () => {
    console.log('すべてのPointボタンがクリックされました');
    clearGeoJSONDataSources(viewer);
    loadGeoJSON(viewer, geourls);
  });
}

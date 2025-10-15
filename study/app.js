import { geourls, loadGeoJSON } from './javascript/geojson.js';
import { urls, load3dTile } from './javascript/3dtile.js';

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDVkMGZiMS1kN2EwLTQwMzQtYmVhZS0xNDI1MTEyNGFjMmMiLCJpZCI6MzQ3NTk0LCJpYXQiOjE3NTk3MjE0NTd9.pz5v1AKLw6RjXhfmwWHs8a1gUdW0pE2cHVKlaPu-F-o';

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});    

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(140.12, 35.60, 400),
});

// 非同期で OSM Buildings をロード
async function loadOsmBuildings() {
  try {
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
  } catch (error) {
    console.error('OSM Buildingsの読み込みエラー:', error);
  }
}

function main() {
  loadOsmBuildings();
  load3dTile(viewer,urls);
  loadGeoJSON(viewer,geourls);
}

main();
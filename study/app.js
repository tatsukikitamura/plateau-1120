// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDVkMGZiMS1kN2EwLTQwMzQtYmVhZS0xNDI1MTEyNGFjMmMiLCJpZCI6MzQ3NTk0LCJpYXQiOjE3NTk3MjE0NTd9.pz5v1AKLw6RjXhfmwWHs8a1gUdW0pE2cHVKlaPu-F-o';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});    

// Fly the camera to San Francisco at the given longitude, latitude, and height.
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

loadOsmBuildings();

// 3D Tilesets の読み込み
const urls = [
  '../data/tileset/bldg/bldg_3dtiles_lod1/tileset.json',
  '../data/tileset/bldg/bldg_3dtiles_lod2/tileset.json',
  '../data/tileset/bldg/bldg_3dtiles_lod2_no_texture/tileset.json',
  '../data/tileset/brid/brid_3dtiles_lod2/tileset.json'
];

async function loadTilesets() {
  for (const url of urls) {
    try {
      const tileset = await Cesium.Cesium3DTileset.fromUrl(url);
      viewer.scene.primitives.add(tileset);
      
      // 3D Tilesetのスタイル設定
      const style = new Cesium.Cesium3DTileStyle({
        color: "color('green')"
      });
      tileset.style = style;
    } catch (error) {
      console.error(`3D Tilesetの読み込みエラー: ${url}`, error);
    }
  }
}

loadTilesets();

// GeoJSON の読み込み
const geourls = [
  '../data/geoJSON/border.geojson',
  '../data/geoJSON/emergency_route.geojson',
  '../data/geoJSON/landmark.geojson',
  '../data/geoJSON/park.geojson',
  '../data/geoJSON/railway.geojson',
  '../data/geoJSON/shelter.geojson',
  '../data/geoJSON/station.geojson',
];

async function loadGeoJSON() {
  for (const url of geourls) {
    try {
      const dataSource = await Cesium.GeoJsonDataSource.load(url);
      viewer.dataSources.add(dataSource);
      dataSource.style = new Cesium.GeoJsonDataSource.Style({
        fill :Cesium.Color.GREEN,
        stroke :Cesium.Color.BLACK,
        strokeWidth : 2,
      });
      console.log(`GeoJSON読み込み完了: ${url}`);
    } catch (error) {
      console.error(`GeoJSON読み込みエラー (${url}):`, error);
    }
  }
}

loadGeoJSON();

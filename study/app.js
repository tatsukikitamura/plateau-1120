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

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);

const tileset = new Cesium.Cesium3DTileset({
  url: '../data/bldg/bldg_3dtiles_lod1/tileset.json' // このURLを指定するだけ
});
viewer.scene.primitives.add(tileset);

const tileset2 = new Cesium.Cesium3DTileset({
  url: '../data/bldg/bldg_3dtiles_lod2/tileset.json' // このURLを指定するだけ
});
viewer.scene.primitives.add(tileset2);

const tileset3 = new Cesium.Cesium3DTileset({
  url: '../data/bldg/bldg_3dtiles_lod2_no_texture/tileset.json' // このURLを指定するだけ
});
viewer.scene.primitives.add(tileset3);

const tileset4 = new Cesium.Cesium3DTileset({
  url: '../data/brid/brid_3dtiles_lod2/tileset.json' // このURLを指定するだけ
});
viewer.scene.primitives.add(tileset4);
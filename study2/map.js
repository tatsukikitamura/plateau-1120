// 1. 地図の初期化
const map = new maplibregl.Map({
    container: 'map', // div要素のID
    // 背景地図として地理院タイル（ラスタ）を指定
    style: {
        "version": 8,
        "sources": {
            "gsi-std": {
                "type": "raster",
                "tiles": ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
                "tileSize": 256,
                "attribution": "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
            }
        },
        "layers": [
            {
                "id": "gsi-std-layer",
                "type": "raster",
                "source": "gsi-std",
                "minzoom": 0,
                "maxzoom": 18
            }
        ]
    },
    center: [140.1314, 35.5859], // メタデータから中心座標を設定
    zoom: 12 // データが表示される範囲に調整（メタデータのminzoom: 8, maxzoom: 16）
});

// 2. 地図が読み込まれたらMVTソースとレイヤーを追加
map.on('load', () => {
    console.log('地図の読み込みが完了しました');
    
    // 2-1. MVTソースの追加
    console.log('MVTソースを追加中...');
    map.addSource('my-vector-source', {
        type: 'vector',
        // HTTPサーバー経由でタイルURLを指定
        tiles: ['http://localhost:8000/data/tran/tran_mvt_lod1/{z}/{x}/{y}.mvt'],
        minzoom: 8,
        maxzoom: 16
    });
    console.log('MVTソース「my-vector-source」を追加しました');

    // 2-2. MVTレイヤーの追加とスタイリング
    console.log('MVTレイヤーを追加中...');
    
    // メタデータによるとRoadレイヤーはPolygonなので、fillレイヤーとして追加
    map.addLayer({
        'id': 'road-fill-layer',        // レイヤーの一意なID
        'type': 'fill',                 // ジオメトリがPolygonなので'fill'を指定
        'source': 'my-vector-source',   // 上で定義したソースのID
        'source-layer': 'Road',         // ★メタデータ内のレイヤーID('Road')と一致させる
        'minzoom': 8,                   // メタデータのminzoomに合わせる
        'maxzoom': 16,                   // メタデータのmaxzoomに合わせる
        'paint': {
            'fill-color': '#0080ff',    // 塗りつぶしの色
            'fill-opacity': 0.5,        // 透明度
            'fill-outline-color': '#000000' // 枠線の色
        }
    });
    console.log('MVTレイヤー「road-fill-layer」を追加しました');
    
    // 道路の境界線も追加（より見やすくするため）
    map.addLayer({
        'id': 'road-line-layer',
        'type': 'line',
        'source': 'my-vector-source',
        'source-layer': 'Road',
        'minzoom': 8,
        'maxzoom': 16,
        'paint': {
            'line-color': '#000000',
            'line-width': 1,
            'line-opacity': 0.8
        }
    });
    console.log('MVTレイヤー「road-line-layer」を追加しました');
    
    // ソースとレイヤーの状態を確認
    console.log('現在のソース:', map.getStyle().sources);
    console.log('現在のレイヤー:', map.getStyle().layers.map(layer => layer.id));
});

// エラーハンドリング
map.on('error', (e) => {
    console.error('地図エラー:', e);
    console.error('エラーの詳細:', {
        type: e.type,
        sourceId: e.sourceId,
        tile: e.tile,
        error: e.error
    });
});

// ソースエラーの詳細なハンドリング
map.on('sourcedata', (e) => {
    if (e.sourceId === 'my-vector-source') {
        console.log('MVTソースデータイベント:', e);
        if (e.isSourceLoaded) {
            console.log('MVTソース「my-vector-source」のデータが正常に読み込まれました');
        }
        if (e.tile) {
            console.log('タイル情報:', {
                tileID: e.tile.tileID,
                state: e.tile.state,
                loaded: e.tile.loaded
            });
        }
    }
});


map.on('sourceload', (e) => {
    if (e.sourceId === 'my-vector-source') {
        console.log('MVTソース「my-vector-source」が完全に読み込まれました');
        console.log('ソースの詳細:', map.getSource('my-vector-source'));
    }
});

// レイヤーのクリックイベントを追加（データが存在するかテスト）
map.on('click', 'road-fill-layer', (e) => {
    console.log('道路データがクリックされました:', e.features[0].properties);
});

// マウスオーバー時のカーソル変更
map.on('mouseenter', 'road-fill-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'road-fill-layer', () => {
    map.getCanvas().style.cursor = '';
});

<template >
  <div class="box">
    <div id="map"></div>
    <div class="btn">
      <el-button @click="createMap">OSM</el-button>
      <el-button @click="create_GaoDe_Map">高德</el-button>
      <el-button @click="createMapBaidu">百度</el-button>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import { TileImage, OSM } from "ol/source";
import TileGrid from "ol/tilegrid/TileGrid";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
export default {
  data() {
    return {
      map: null,
      sourceLayer: null, //图层
    };
  },
  methods: {
    init() {
      this.map = new Map({
        target: "map",
        layers: [
          new Tile({
            source: new OSM(), //默认为OSM地图
          }),
        ],
        view: new View({
          center: fromLonLat([116.40387397, 39.91488908]),
          zoom: 12,
          maxZoom: 25,
          projection: "EPSG:3857",
        }),
      });
    },

    //初始化OSM地图
    createMap() {
      let layer = new Tile({
        source: new OSM(),
      });
      this.map ? this.map.addLayer(layer) : null;
    },

    //初始化高德地图
    create_GaoDe_Map() {
      let layer = new Tile({
        source: new XYZ({
          url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
        }),
      });
      this.map ? this.map.addLayer(layer) : null;
    },

    //初始化百度地图
    createMapBaidu() {
      let resolutions = [];
      for (let i = 0; i < 19; i++) {
        resolutions[i] = Math.pow(2, 18 - i);
      }
      let tilegrid = new TileGrid({
        origin: [0, 0],
        resolutions: resolutions,
      });
      let baidu_source = new TileImage({
        projection: "EPSG:3857",
        tileGrid: tilegrid,
        tileUrlFunction: function (tileCoord) {
          if (!tileCoord) {
            return "";
          }
          let z = tileCoord[0];
          let x = tileCoord[1];
          let y = -tileCoord[2] - 1;
          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }
          return (
              "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" +
              x +
              "&y=" +
              y +
              "&z=" +
              z +
              "&styles=pl&udt=20151021&scaler=1&p=1"
          );
        },
      });

      let newlayer = new Tile({
        source: new XYZ({
          url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
        }),
      });

      let layer = new Tile({
        source: baidu_source,
      });
      console.log(layer);

      this.map ? this.map.addLayer(layer) : null;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped >
.box {
  width: 100vw;
  height: 100vh;
}

.btn {
  position: fixed;
  top: 70px;
  right: 10px;
}

#map {
  width: 100%;
  height: 100%;
}
</style>


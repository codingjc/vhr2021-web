<template>
  <div>
    <a class="skiplink" href="#map">Go to map</a>
    <div id="map" class="map" tabindex="0"></div>
    <button id="zoom-out">Zoom out</button>
    <button id="zoom-in">Zoom in</button>
  </div>
</template>

<script>

import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from "ol/proj";

export default {
  name: "SysData",
  methods:{
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

      this.map ? this.map.addLayer(newlayer) : null;
    }
  },
  created() {

  },
  mounted() {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [120.21551, 30.253363],
        projection: "EPSG:4326",
        zoom: 12,
      }),
    });

    document.getElementById('zoom-out').onclick = function () {
      const view = map.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    };

    document.getElementById('zoom-in').onclick = function () {
      const view = map.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom + 1);
    };
  }
}
</script>

<style>
    .map {
      width: 100%;
      height:700px;
    }
    a.skiplink {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    a.skiplink:focus {
      clip: auto;
      height: auto;
      width: auto;
      background-color: #fff;
      padding: 0.3em;
    }
    #map:focus {
      outline: #4A74A8 solid 0.15em;
    }
</style>
<template>
  <div>

    <!-- 组件 -->
    <baidu-map
        class="Bmap"
        ak='3mG9TtuFtEY7SK3070gZ2QUvOsyN7zR7'
        :center="center"
        :zoom="zoom"
        @ready="mapReady"
    :scroll-wheel-zoom="true"
    >
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map'; // 局部注册


export default {
  name: 'mapNum',
  components: { BaiduMap},
  data () {
    return {
      center: { lng: 0, lat: 0 },  //经纬度
      zoom: 3,　 //地图展示级别
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(this.point.longitude, this.point.latitude);

      map.centerAndZoom(this.point, 12);
      //把标注添加到地图上
      let marker = new BMap.Marker(this.point);

      map.addOverlay(marker);

      //把信息添加到地图上
      map.addOverlay(marker);
      let content = '<table>';
      content = content + '<tr><td> 任务：技术服务</td></tr>';
      content = content + '<tr><td> 地点：广东省广州市海珠区科韵南路</td></tr>';
      content = content + '<tr><td> 时间：2021-07-15</td></tr>';
      content += '</table>';

      let infowindow = new BMap.InfoWindow(content);
      marker.openInfoWindow(infowindow);
    }
  }
}
</script>

<style scoped>

</style>
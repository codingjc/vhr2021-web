<template>
  <div>
<!--    <div id="allmap" ref="allmap"></div>-->
    <baidu-map  center="北京" class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
  </div>
</template>

<script>

import {BaiduMap} from '@/util/map.js';
export default {
  name: "basicMap",
  data(){
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
  // mounted() {
  //   this.$nextTick(function() {
  //     BaiduMap.init().then(BMap => {
  //       let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
  //       map.centerAndZoom(new BMap.Point(120.21666, 30.260569), 12); // 初始化地图,设置中心点坐标和地图级别
  //       map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
  //         mapTypes: [
  //           BMAP_NORMAL_MAP,
  //           BMAP_HYBRID_MAP
  //         ]
  //       }));
  //       map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
  //       map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  //       map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
  //       map.addControl(new BMap.GeolocationControl());
  //       map.addControl(new BMap.OverviewMapControl());
  //       map.addControl(new BMap.ScaleControl());
  //       map.addControl(new BMap.MapTypeControl());
  //
  //       //信息窗口
  //       var opts = {
  //         width : 250,     // 信息窗口宽度
  //         height: 100,     // 信息窗口高度
  //         title : "测试标题"  // 信息窗口标题
  //       }
  //       var infoWindow = new BMap.InfoWindow("测试内容", opts);
  //
  //       // 添加标注
  //       var point = new BMap.Point(120.21666, 30.260569);
  //       var marker = new BMap.Marker(point);
  //       map.addOverlay(marker);
  //       marker.addEventListener("click", function(){
  //         map.openInfoWindow(infoWindow, point);
  //       })
  //
  //       // 创建地址解析器实例
  //       // var myGeo = new BMap.Geocoder();
  //       // 将地址解析结果显示在地图上，并调整地图视野
  //       // myGeo.getPoint("杭州市滨江区滨安路1199号", function(point){
  //       //       if (point) {
  //       //         console.log(point)
  //       //         map.centerAndZoom(point, 16);
  //       //         var dahuaMarker = new BMap.Marker(point);
  //       //         dahuaMarker.addEventListener("click", function(){
  //       //           map.openInfoWindow(infoWindow, point);
  //       //         })
  //       //         map.addOverlay(dahuaMarker);
  //       //       }
  //       //     },
  //       //     "杭州市");
  //
  //     })
  //   })
  // }
}
</script>

<style>
  #allmap{
    height:700px;
    width: 1500px;
  }

  .bm-view {
    width: 100%;
    height: 300px;
  }
</style>
<template>
  <div>
    <baidu-map :center="center" :zoom="zoom"  class="bm-view" :scroll-wheel-zoom="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_TOP_LEFT" :show-address-bar="true" :auto-location="true"></bm-geolocation>
      <bm-marker :position="one" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <!--                      <bm-label :content="markerName" :label-style="{color: 'red', fontSize: '24px'}" :offset="{width: -35, height: 30}"></bm-label>-->
      </bm-marker>
      <!--                    <bm-panorama anchor="BMAP_ANCHOR_TOP_LEFT"></bm-panorama>-->
    </baidu-map>

    <div>
      <el-button type="primary" @click="click">aaa</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysInit",
  data(){
    return{
      one: {
        lng: 120.21551,
        lat: 30.253363
      },
      center: {lng: 120.21551, lat: 30.253363},  //经纬度
      zoom: 16,　 //地图展示级别
      hz: {
        lng: 120.21551,
        lat: 30.253363
      },
      jx: {
        lng: 120.763836,
        lat: 30.753208
      }
    }
  },
  methods: {
    click(){
      this.one.lng = this.jx.lng;
      this.one.lat = this.jx.lat;
      this.center.lng = this.jx.lng;
      this.center.lat = this.jx.lat;
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 400px;
}
</style>
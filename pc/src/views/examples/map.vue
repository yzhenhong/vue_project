<template>
  <div>
    <div class="enclosureTil" @click="querySome">
      <div>跳转某个</div>
    </div>
    <div class="enclosureTil">
      <div>绘制电子围栏多边形图案完成时，请双击鼠标左键 确定完成图案的绘制结束;点击编辑电子围栏的范围时，请将地图右上角的绘制工具替换成  第一个小手的编辑状态。</div>
      <div>绘制圆形和矩形的时候，需要点击鼠标右上角的小手来结束绘制的状态。</div>
    </div>
    <!-- 操作 -->
    <el-button type="primary" icon="el-icon-edit" size="small" @click="edit">编辑</el-button>
    <el-button type="primary" icon="el-icon-error" size="small" @click="clearAll">重绘</el-button>
    <el-button type="primary" icon="el-icon-success" size="small" @click="preservation">保存</el-button>
    <div>
      <div id="allmap" style="overflow:hidden;zoom:1;position:relative;">
        <div id="map" style="height:100%;-webkit-transition: all 0.5s ease-in-out;transition: all 0.5s ease-in-out;"></div>
      </div>
    </div>
    <!-- 地图2 -->
    <div class="enclosureTil" @click="seeMap">
      <div>seeMap</div>
    </div>
    <div id="allmap2"></div>
  </div>
</template>

<script>
import { mapData } from '@/global/js/dictionary'
import BMap from 'BMap';
import BMapLib from 'BMapLib';
import BMAP_ANCHOR_TOP_RIGHT from 'BMAP_ANCHOR_TOP_RIGHT';
export default {
  data() {
    return {
      // 保存围栏的数据
      fence: {
        sellerUserId: '',
        shippingArea: [],
      },
      // 百度地图
      map: '',
      // 围栏数据
      overlays: [],
      // 绘制围栏得到的坐标值
      coordinate: [],
      // 围栏样式
      styleOptions: {
        strokeColor: 'red',    // 边线颜色。
        fillColor: '#ccc',      // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2,       // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid'   // 边线的样式，solid或dashed。
      },
      // 鼠标绘制工具
      drawingManager: {},
      // 商户id
      sellerUserId: '',
      // 地图2
      map2: '',
    }
  },
  methods: {
    // 查询商户详细的信息
    querySome() {
      let tempData = mapData.resultData[0];
      console.log(tempData);
      this.fence.sellerUserId = tempData.sellerUserId;
      // 显示的地图范围移动至选择的药店附近
      let new_point = new BMap.Point(tempData.longitude, tempData.latitude);
      this.map.centerAndZoom(new_point, 15);
      this.map.panTo(new_point);
      this.ready(tempData.longitude, tempData.latitude);
      this.resetCoordinate([tempData]);
      // 初始化电子围栏
      this.clearAll();
      // 当商户有围栏信息的时候将会绘制原本商户已有的围栏
      if (tempData.shippingArea) {
        let xyArray =  JSON.parse(tempData.shippingArea);
        // 显示商户的电子围栏区域
        if (xyArray.length > 0) {
          let polylinePointsArray = [];
          for (let i = 0; i < xyArray.length; i++) {
            polylinePointsArray[i] = new BMap.Point(xyArray[i].y, xyArray[i].x);
          }
          let polygon = new BMap.Polygon(polylinePointsArray, this.styleOptions);  // 创建多边形
          this.map.addOverlay(polygon);   // 增加多边形
          this.overlays.push(polygon); // 是否把该图像加入到编辑和删除行列
          this.overlays[0].enableEditing();// 开启编辑状态
        }
      }
    },
    // 选择范围重置坐标点
    resetCoordinate(sellerUserList) {
      // 建立坐标点：
      // lng：经度 lat：纬度
      let points = sellerUserList.map(item => {
        return {
          lng: item.longitude,
          lat: item.latitude,
          sellerUserId: item.sellerUserId,
          sellerName: item.sellerName,
          shippingArea: item.shippingArea,
          businessDate: item.businessDate
        };
      });
      // 清除之前的坐标点
      let allOverlay = this.map.getOverlays();
      for (let i = 0; i < allOverlay.length - 1; i++) {
        this.map.removeOverlay(allOverlay[i]);
      }
      this.createCoordinate(points);
    },
    // 百度坐标转火星坐标
    bd_decrypt(bd_lng, bd_lat) {
       let X_PI = Math.PI * 3000.0 / 180.0;
      let x = bd_lng - 0.0065;
      let y = bd_lat - 0.006;
      let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
      let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
      let gg_lng = z * Math.cos(theta);
      let gg_lat = z * Math.sin(theta);
      return { y: gg_lng, x: gg_lat };
    },
    // 百度地图API功能初始化
    ready(longitude, latitude) {
      let lon  = longitude ? longitude : 113.259395308258;
      let lat  = latitude ? latitude : 23.1318552762566;
      // 创建Map实例
      this.map = new BMap.Map('map');
      // 初始化地图,设置中心点坐标和地图级别
      let poi = new BMap.Point(lon, lat);
      this.map.centerAndZoom(poi, 15);
      // 启用滚轮放大缩小，默认禁用
      this.map.enableScrollWheelZoom();

       // 绘制工具事件
      let overlaycomplete = e=> {
        console.log(e);
        this.clearAll();
        this.overlays = [];
        this.coordinate = [];
        this.overlays.push(e.overlay);
        let path = e.overlay.getPath();// Array<Point> 返回多边型的点数组'y:' + path[i].lng + ',x:' + path[i].lat
        for (let i = 0; i < path.length; i++) {
          this.coordinate.push({ x: path[i].lat, y: path[i].lng });
        }
      };
      // 实例化鼠标绘制工具
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMap.Size(5, 5), // 偏离值
        },
        circleOptions: this.styleOptions, // 圆的样式
        polylineOptions: this.styleOptions, // 线的样式
        polygonOptions: this.styleOptions, // 多边形的样式
        rectangleOptions: this.styleOptions // 矩形的样式
      });
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      this.drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    },
    // 编辑
    edit() {
      console.log('编辑')
      if (this.overlays.length === 0) {
        this.$message('请先选择标注点');
        return false;
      }
      this.overlays[0].enableEditing();
    },
    // 保存
    preservation() {
      console.log('保存')
      if (this.fence.sellerUserId === '') {
        this.$message('请先选择标注点');
        return false;
      }
      if (this.overlays.length === 0) {
        this.$message('请先绘制电子围栏才能保存');
        return false;
      }
      this.overlays[0].disableEditing();
      this.coordinate = [];
      let path = this.overlays[0].getPath();// Array<Point> 返回多边型的点数组
      for (let i = 0; i < path.length; i++) {
        // this.coordinate.push({ y: path[i].lng, x: path[i].lat });
        // 百度坐标转火星坐标
        let t = this.bd_decrypt(path[i].lng, path[i].lat);
        this.coordinate.push(t);
      }
      this.fence.shippingArea = this.coordinate;
      console.log(this.fence);
    },
    // 重绘
    clearAll() {
      console.log('重绘')
       for (let i = 0; i < this.overlays.length; i++) {
        this.map.removeOverlay(this.overlays[i]);
      }
      this.overlays = [];
      this.coordinate = [];
    },
    // 创建坐标点
    createCoordinate(points) {
      let _this = this;
      // 循环建立标注点
      for (let i = 0, pointsLen = points.length; i < pointsLen; i++) {
        let point = new BMap.Point(points[i].lng, points[i].lat); // 将标注点转化成地图上的点
        let marker = new BMap.Marker(point); // 将点转化成标注点
        this.map.addOverlay(marker);  // 将标注点添加到地图上
        // 添加监听事件
        (function() {
          let thePoint = points[i];
          marker.addEventListener('click',
            // 显示信息的方法
            function() {
              _this.showInfo(this, thePoint, _this);
            });
        })();
      }
    },
    // 编写信息显示方法
    showInfo(thisMarker, point, _this) {
      console.log(thisMarker, point, _this);
      _this.fence.sellerUserId = point.sellerUserId;
      // 点击坐标点的时候显示的地图范围移动至选择的药店附近
      let new_point = new BMap.Point(point.lng, point.lat);
      this.map.centerAndZoom(new_point, 15);
      this.map.panTo(new_point);
      // 初始化电子围栏
      _this.clearAll();
      // 当商户有围栏信息的时候将会绘制原本商户已有的围栏
      if (point.shippingArea) {
        let xyArray =  JSON.parse(point.shippingArea);
        // 显示商户的电子围栏区域
        if (xyArray.length > 0) {
          let polylinePointsArray = [];
          for (let i = 0; i < xyArray.length; i++) {
            polylinePointsArray[i] = new BMap.Point(xyArray[i].y, xyArray[i].x);
          }
          let polygon = new BMap.Polygon(polylinePointsArray, _this.styleOptions);  // 创建多边形
          _this.map.addOverlay(polygon);   // 增加多边形
          _this.overlays.push(polygon); // 是否把该图像加入到编辑和删除行列
          _this.overlays[0].enableEditing();// 开启编辑状态
        }
      }
      // 获取点的信息
      let sContent =
        '<ul style="margin:0 0 5px 0;padding:0.2em 0">'
        + '<li style="line-height: 26px;font-size: 15px;">'
        + '<span style="width: 200px;display: inline-block;">药店id：</span>' + point.sellerUserId + '</li>'
        + '<li style="line-height: 26px;font-size: 15px;">'
        + '<span style="width: 200px;display: inline-block;">药店名称：</span>' + point.sellerName + '</li>'
        + '<li style="line-height: 26px;font-size: 15px;">'
        + '<span style="width: 200px;display: inline-block;">营业日期：</span>' + point.businessDate + '</li>'
        + '</ul>';
      let infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
      thisMarker.openInfoWindow(infoWindow); // 图片加载完后重绘infoWindow
    },
    // 查询所有数据的围栏
    getData() {
      let tempData = mapData.resultData;
      // 建立坐标点：
      // lng：经度 lat：纬度
      let points = tempData.map(item => {
        return {
          lng: item.longitude,
          lat: item.latitude,
          sellerUserId: item.sellerUserId,
          sellerName: item.sellerName,
          shippingArea: item.shippingArea,
          businessDate: item.businessDate
        };
      });
      this.createCoordinate(points);
    },
    // 地图2
    ready2() {
      this.map2 = new BMap.Map('allmap2');
      this.map2.centerAndZoom('深圳', 16);
      this.map2.enableScrollWheelZoom(true);
    },
    seeMap() {
      this.map2.clearOverlays();
      let new_point = new BMap.Point(114.066519, 22.549303);
      let marker = new BMap.Marker(new_point);  // 创建标注
      this.map2.addOverlay(marker);              // 将标注添加到地图中
      this.map2.panTo(new_point);
      // }
    },
  },
  mounted() {
    this.ready();
    this.getData()
    // 地图2
    this.ready2();
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
#allmap,#editMap,#allmap2 {
  width: 100%; height:700px; overflow: hidden;
  border: 1px solid #ccc;
  /deep/ .BMapLib_box.BMapLib_marker,/deep/ .BMapLib_box.BMapLib_polyline{
    display: none;
  }
}
dl,dt,dd,ul,li{
  margin:0;
  padding:0;
  list-style:none;
}
p{font-size:12px;}
dt{
  font-size:14px;
  font-family:"微软雅黑";
  font-weight:bold;
  border-bottom:1px dotted #000;
  padding:5px 0 5px 5px;
  margin:5px 0;
}
dd{
  padding:5px 0 0 5px;
}
li{
  line-height:28px;
}
.enclosureTil{
  margin: 20px 0px;
  div{
    line-height: 20px;
    font-size: 16px;
    color: red;
  }
  img{
    width: 30px;
    height: 30px;
  }
}
</style>
<template>
  <div id="id-service-index">
    <div class="card"
         style="width:100%">
      <div><i class="el-icon-user"
           size="small"></i></div>
      <div style="margin-left:10px">
        <p>租户1</p>
        <p>启用状态:<el-checkbox v-model="checked"></el-checkbox>{{checked?'启用':'禁用'}}</p>
        <p>创建时间: 2022-4-15</p>
      </div>
    </div>
    <div class="card id-service-index-flex card-2"
         style="width:100%;justify-content: space-around;">
      <div v-for="item in 3"
           :key="item"
           class="card-2-lie">
        <div class="icon">
          <img src="https://img1.baidu.com/it/u=241042152,3428389889&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
               style="width:100%;height:100%" />
        </div>
        <div>
          <p style="font-size:20px;font-weight:bold;color:#abe2f6;display:inline-block">6</p>
          <p>应用数量</p>
        </div>
      </div>
    </div>
    <!-- 资源分配 -->
    <div class="card card-2 resouce"
         style="width:100%;">
      <div class="title">
        <span style="display:inline-block">资源分配</span>
        <div>集群:
          <v-select v-model="value"
                    dense
                    height="20px"
                    :items="app1"
                    label="全部状态"
                    outlined
                    style="width: 120px;display:inline-block" />
        </div>
      </div>
      <div style="display:flex;justify-content: space-around;width:100%;">
        <div v-for="item in 3"
             :key="item"
             class="card-2-lie">
          <div class="icon">
            <img src="https://img1.baidu.com/it/u=241042152,3428389889&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                 style="width:100%;height:100%" />
          </div>
          <div>
            <p style="font-size:20px;font-weight:bold;color:#abe2f6;display:inline-block">8<span style="font-weight:bold">Core</span></p>
            <p>CPU</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 已使用资源 -->
    <div class="card card-2 resouce"
         style="width:100%;">
      <div class="title">
        <span style="display:inline-block">已使用资源</span>
        <div>集群:
          <v-select v-model="value"
                    dense
                    height="20px"
                    :items="app1"
                    label="全部状态"
                    outlined
                    style="width: 120px;display:inline-block" />
        </div>
      </div>
      <div style="display:flex;justify-content: space-around;width:100%;">
        <div class="resouce-lie"
             v-for="(item,index) in readyResouce"
             :key="index">
          <div>
            {{item.name}}
          </div>
          <v-progress-linear class="rounded font-weight-medium"
                             :color="getColor(item.CpuPercentage)"
                             height="15"
                             :value="item.CpuPercentage">
            <span class="white--text">{{ item.CpuPercentage }}% </span>
          </v-progress-linear>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      checked: true,
      app1: ['字段1', '字段2', '字段3'],
      value: '',
      readyResouce: [{
        name: 'CPU',
        CpuPercentage: 50,
        tip: '8core'
      },
      {
        name: '内存',
        CpuPercentage: 75,
        tip: '8core'
      }, {
        name: '存储',
        CpuPercentage: 100,
        tip: '8core'
      }]
    };
  },
  methods: {
    getColor (percentage) {
      return percentage ? (percentage < 60 ? 'primary' : percentage < 80 ? 'warning' : 'red darken-1') : 'primary';
    },
  },

};
</script>
<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.id-service-index {
  padding-top: 10px;
}
.id-service-index-flex {
  display: flex;
  justify-content: space-between;
}
.card {
  display: flex;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 0 20px #eee;
  padding-bottom: 20px;
  margin: 10px 0 20px 0;
  background-color: #ffffff;
  padding: 10px;
  .title {
    width: 100%;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
  }
}
.card-2 {
  .card-2-lie {
    display: flex;
    font-size: 14px;
    color: #000;
    width: 30%;
    padding: 20px 0;
    background-color: #f8f8f8;
    border-radius: 5px;
    .icon {
      margin-left: 15px;
      margin-right: 30px;
      width: 44px;
      height: 44px;
    }
  }
}
.resouce {
  display: flex;
  flex-direction: column;
  .resouce-lie {
    display: flex;
    flex-direction: column;
    display: flex;
    font-size: 14px;
    color: #000;
    width: 30%;
    padding: 20px 0;
    background-color: #f8f8f8;
    border-radius: 5px;
  }
}
</style>

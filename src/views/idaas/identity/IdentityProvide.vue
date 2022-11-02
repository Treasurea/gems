<template>
  <div class="ma-5">
    <v-tabs>
      <v-tab v-for="i in tabs" :key="i">
        <v-icon left> mdi-account </v-icon>
        {{ i }}
      </v-tab>
      <v-tab-item v-if="active == 0" class="pa-5">
        <v-form class="pt-2" lazy-validation @submit.prevent>
          <div v-for="(i, k) in identityForm" :key="k">
            <v-flex> {{ i.label }}</v-flex>
            <v-text-field v-model="identity[i.model]" background-color="rgba(0,0,0,.05)" class="pt-0" dense flat solo />
          </div>
          <v-btn class="my-0" color="primary" small @click="next"> 下一步 </v-btn>
        </v-form>
      </v-tab-item>
      <v-tab-item v-if="active == 1" class="pa-5">
        <v-form class="pt-2" lazy-validation>
          <Ad />
          <div style="display: flex">
            <v-btn class="my-0" color="primary" small @click="prev"> 上一步 </v-btn>
            <v-btn class="my-0" color="primary" small> 保存 </v-btn>
            <v-btn class="my-0" color="primary" small> 保存提交 </v-btn>
          </div>
        </v-form>
      </v-tab-item>
      <v-tab-item> 其他 </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import Ad from './components/Ad';
  export default {
    name: 'IdentityProvide',
    components: {
      Ad,
    },
    props: {},
    data() {
      return {
        active: 0,
        tabs: ['绑定AD', '其他身份提供方'],
        identity: {
          name: '',
          service: '',
          account: '',
          password: '',
        },
        identityForm: [
          {
            model: 'name',
            label: '显示名称',
          },
          {
            model: 'service',
            label: '服务器名称',
          },
          {
            model: 'account',
            label: '管理员名称',
          },
          {
            model: 'password',
            label: '管理员密码',
          },
        ],
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      next: function () {
        if (this.active === 0) {
          this.active++;
        } else if (this.active === 1) {
          this.active++;
        }
      },
      prev: function () {
        if (--this.active < 0) this.active = 0;
      },
    },
  };
</script>

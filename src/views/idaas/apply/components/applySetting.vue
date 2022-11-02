<template>
  <v-card class="ma-5" flat>
    <v-tabs>
      <v-tab v-for="i in tabs" :key="i">
        <v-icon left> mdi-account </v-icon>
        {{ i }}
      </v-tab>
      <v-tab-item class="pa-5">
        <v-form class="pt-2" lazy-validation @submit.prevent>
          <div v-for="(i, k) in applyBaseForm" :key="k">
            <v-flex> {{ i.label }}</v-flex>
            <v-text-field v-model="apply[i.model]" background-color="rgba(0,0,0,.05)" class="pr-10" dense flat solo />
          </div>
          <v-flex> 应用图标</v-flex>
          <v-icon left>mdi-account </v-icon>
        </v-form>
        <v-btn class="my-0" color="primary" small> 保存 </v-btn>
      </v-tab-item>
      <v-tab-item>
        <apply-user />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
  import applyUser from './applyUser.vue';
  export default {
    name: 'ApplySetting',
    components: {
      ApplyUser: applyUser,
    },
    props: {},
    data() {
      return {
        tabs: ['通用设置', '应用用户'],
        apply: {
          applyId: 'app_mmmutxtyjybwh3xgwzujr7aa4m',
          source: '模板应用',
          applyName: 'app1',
          applyIcon: '',
        },
        applyBaseForm: [
          {
            model: 'applyId',
            label: '应用Id',
          },
          {
            model: 'source',
            label: '创建来源',
          },
          {
            model: 'applyName',
            label: '应用名称',
          },
        ],
      };
    },
    computed: {
      applyBaseForm: {
        get() {
          return this.$store.state.ApplyForm;
        },
        set(val) {
          this.$store.commit('SET_APPLYFORM', val);
        },
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<template>
  <v-card flat>
    <v-tabs class="tabs_out" keepalive vertical>
      <v-tab v-for="i in tabs" :key="i">
        <v-icon left> mdi-account </v-icon>
        {{ i }}
      </v-tab>
      <v-tab-item>
        <v-tabs>
          <v-tab v-for="i in tabs1" :key="i">
            <v-icon left> mdi-account </v-icon>
            {{ i }}
          </v-tab>
          <v-tab-item v-if="active == 0">
            <v-form v-model="validInfo" class="pt-2" lazy-validation @submit.prevent>
              <div v-for="(i, k) in identityForm" :key="k">
                <v-flex> {{ i.label }}</v-flex>
                <v-text-field
                  v-model="identity[i.model]"
                  background-color="rgba(0,0,0,.05)"
                  class="pt-0"
                  dense
                  flat
                  solo
                />
              </div>
              <v-btn class="my-0" color="primary" small @click="next"> 下一步 </v-btn>
            </v-form>
          </v-tab-item>
          <v-tab-item v-if="active == 1">
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
      </v-tab-item>
      <v-tab-item>
        <div style="display: flex; align-items: flex-start">
          <div>
            <div class="mt-3">组织结构</div>
            <v-treeview activatable hoverable :items="items" shaped />
          </div>
          <v-tabs>
            <v-tab v-for="i in tabs2" :key="i">
              <v-icon left> mdi-account </v-icon>
              {{ i }}
            </v-tab>
            <v-tab-item>
              <identitySearch />
            </v-tab-item>
            <v-tab-item>
              <accountSearch />
            </v-tab-item>
          </v-tabs>
        </div>
      </v-tab-item>
      <v-tab-item>
        <apply-search />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
  import accountSearch from './account/Account.vue';
  import applySearch from './apply/Apply.vue';
  import Ad from './identity/components/Ad';
  import identitySearch from './identity/IdentityProvide.vue';

  export default {
    name: 'Idaas',
    components: {
      AccountSearch: accountSearch,
      Ad,
      IdentitySearch: identitySearch,
      ApplySearch: applySearch,
    },
    data: () => ({
      tabs: ['身份提供方', '账户', '应用'],
      tabs1: ['绑定AD', '其他身份提供方'],
      tabs2: ['账号', '组织'],
      active: 0,
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
      validInfo: false,
      items: [
        {
          id: 19,
          name: '富士康集团',
          children: [
            {
              id: 20,
              name: '深圳富士康',
              children: [
                { id: 21, name: '富士康龙华' },
                { id: 22, name: '富士康南山' },
              ],
            },
            { id: 24, name: '上海富士康' },
          ],
        },
      ],
    }),
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

<style lang="scss" scoped>
  .v-input__slot {
    width: 96px;
    height: 14px;
  }
  .v-card {
    margin: 20px;
    border-radius: 20px;
    border: 2px;
  }
  .tabs_out {
    padding: 20px;
  }
</style>

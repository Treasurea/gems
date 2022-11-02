<template>
  <div style="display: flex; align-items: flex-start">
    <div style="background-color: #ffffff; height: 500px; width: 300px">
      <div class="ma-3">组织结构</div>
      <el-tree :data="items" :props="defaultProps" @node-click="handleNodeClick" />
      <!-- <v-treeview
        activatable
        :active.sync="active"
        :items="items"
        :open.sync="open"
        return-object
      >
        <template #prepend="{ item }">
          <v-icon v-if="item.selected == false" @click.prevent="selectFn(item)">
            {{ 'mdi-checkbox-blank-outline' }}
          </v-icon>
          <v-icon v-else @click.prevent="selectFn(item)">
            {{ 'mdi-checkbox-marked' }}
          </v-icon>
        </template>
      </v-treeview> -->
    </div>
    <v-tabs class="pa-5">
      <v-tab v-for="i in tabs" :key="i">
        <v-icon left> mdi-account </v-icon>
        {{ i }}
      </v-tab>
      <v-btn
        color="primary"
        depressed
        style="position: absolute; right: 50px; top: 5px"
        to="/idaas-service/idaas-identity"
      >
        账号同步
      </v-btn>
      <v-tab-item class="pa-5">
        <AddAccount :org-selected="orgSelected" />
      </v-tab-item>
      <v-tab-item class="pa-5">
        <AddOrg :org-selected="orgSelected" />
      </v-tab-item>
      <v-tab-item class="pa-5">
        <Tenant :org-selected="orgSelected" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import AddAccount from './AddAccount.vue';
  import AddOrg from './AddOrg.vue';
  import { getOrg } from '@/api';
  import Tenant from '@/views/tenant/tenant/newTenant.vue';
  //修改组织树
  function changeOrg(arr) {
    arr.forEach((item) => {
      item.label = item.orgName;
      item.children = item.child;
      if (item.fatherOrg) {
        item.selected = false;
      } else {
        item.selected = true;
      }
      delete item.orgName;
      delete item.child;
      if (item.children) {
        changeOrg(item.children);
      }
    });
    return arr;
  }
  export default {
    name: 'Account',
    components: {
      AddAccount,
      AddOrg,
      Tenant,
    },
    props: {},
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        active: [],
        orgSelected: {
          orgId: 'cc6f9342-fb7c-4bf9-be8e-f4edae23165c',
        },
        tabs: ['账号', '组织', '租户'],
        itemsTran: [],
        items: [],
      };
    },
    computed: {
      selected() {
        if (!this.active.length) return undefined;

        const id = this.active[0];

        return this.items.find((item) => item.orgId === id);
      },
    },
    watch: {
      selected: 'randomAvatar',
    },
    created() {},
    mounted() {
      this.getOrg();
    },
    methods: {
      handleNodeClick(item) {
        // console.log(data.orgId);
        this.orgSelected.orgId = item.orgId;
        this.orgSelected.orgName = item.label;
        this.orgSelected.fatherOrg = item.fatherOrg;
      },
      getOrg() {
        // const params = {
        //   orgId: '036883b1-fe1f-4842-94ca-b3e8a51dbd78',
        // };
        getOrg().then((res) => {
          this.itemsTran.push(res);
          this.items = changeOrg(this.itemsTran);
        });
      },
      // selectFn(item) {
      //   item.selected ? (item.selected = false) : (item.selected = true);
      //   this.orgSelected.orgId = item.orgId;
      //   this.orgSelected.orgName = item.name;
      //   this.orgSelected.fatherOrg = item.fatherOrg;
      // },
    },
  };
</script>
<style scoped>
  .v-treeview-node--active {
    background-color: none;
  }
  .primary--text {
    color: none;
    caret-color: none;
  }
</style>

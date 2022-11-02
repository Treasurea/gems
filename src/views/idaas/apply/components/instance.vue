<template>
  <div class="ma-5">
    <div class="pt-5 pl-5" style="display: flex; align-items: baseline; background-color: #ffffff">
      <!-- <v-btn class="mb-2" color="primary" dark @click="open" > 创建实例 </v-btn> -->
    </div>
    <v-data-table class="elevation-1" :headers="headers" :items="instanceForm" :search="search" sort-by="user">
      <template #top>
        <v-dialog v-model="dialogTenant" max-width="500px">
          <v-card height="550px">
            <v-card-text>
              <v-flex class="px-1 mb-2">租户列表</v-flex>
              <v-text-field class="mx-1" dense hide-details prepend-inner-icon="mdi-magnify" />
              <v-list dense height="450px">
                <v-list-item v-for="(user, index) in allUsers" :key="index" link>
                  <v-list-item-avatar class="my-1">
                    <v-avatar class="white--text font-weight-medium" color="primary" :size="32">
                      {{ user.username[0].toLocaleUpperCase() }}
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content class="text-subtitle-1" @click="showTenant(user.username)">
                    {{ user.username }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <div class="px-4 py-2" style="background-color: #ffffff"
            ><button class="float-right mx-2 v-btn v-btn--text theme--light v-size--default error--text" type="button"
              ><span class="v-btn__content" @click="close"> 保存 </span></button
            ><div class="kubegems__clear-float"
          /></div>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">是否确定删除此项?</v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确认</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template #item[1].webAddress>
        <a v-for="item in instanceForm" href="dbewlc7df7c700m4.sso.caas.fiicloud.foxconn.com" target="_blank"
          >dbewlc7df7c700m4.sso.caas.fiicloud.foxconn.com</a
        >
      </template>
      <template #item.status>
        <v-select class="pt-6" dense height="20px" :items="status" label="状态" outlined style="width: 120px" />
      </template>
      <template #item.operate="{ item }">
        <v-btn color="blue darken-1" text @click="deleteItem(item)">释放</v-btn>
        <v-btn color="blue darken-1" text @click="chooseTenant(item)">下发</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  function changeUser(arr) {
    let newArr = [];
    arr.forEach((item) => {
      let obj = {};
      obj.instanceName = item.instance_name;
      obj.webAddress = item.domain;
      obj.instance_id = item.instance_id;
      newArr.push(obj);
    });
    return newArr;
  }
  import { getTenantList, addInstance, getInstance } from '@/api';
  export default {
    name: 'Apply',
    data: () => ({
      params: {
        page: 1,
        size: 10,
        containAllocatedResourcequota: true,
      },
      allUsers: [],
      instanceForm: [
        {
          instanceName: '实例1',
          webAddress: 'dbewlc7df7c700m4.sso.caas.fiicloud.foxconn.com',
          instance_id: '850b09cf-0dfb-475c-afbf-03b84b1e661b',
        },
      ],
      dialog: false,
      dialogDelete: false,
      dialogTenant: false,
      search: '',
      // status: ['启用', '禁用'],
      headers: [
        {
          text: '实例名称',
          align: 'start',
          sortable: false,
          value: 'instanceName',
        },
        { text: '实例ID', value: 'instance_id', sortable: false },
        { text: '用户门户', value: 'webAddress', sortable: false },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'operate', sortable: false },
      ],
      // instanceForm: [],
      editedIndex: -1,
      editedItem: {
        applyName: '',
        applyId: '',
      },
      defaultItem: {
        applyName: '',
        applyId: '',
      },

      instance: {
        instance_name: '',
        creator: '',
      },
      issueInstance: {
        instance_id: '',
        tenant_id: '',
      },
    }),

    computed: {
      // instanceForm: {
      //   get() {
      //     return this.$store.state.instanceForm;
      //   },
      //   set(val) {
      //     this.$store.commit('SET_instanceForm', val);
      //   },
      // },
      status: ['启用', '禁用'],
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    created() {
      this.initialize();
      this.getApply();
      this.tenantList();
      this.getIns();
    },
    methods: {
      showTenant(items) {
        this.issueInstance.tenant_id = items;
      },
      async getIns() {
        const params = {
          instance_name: '',
          page: 1,
          size: 10,
        };
        const data = await getInstance(params);
        this.instanceForm = changeUser(data);
      },
      async tenantList() {
        const data = await getTenantList(this.params);
        this.allUsers = data.List.map((item) => {
          return {
            username: item.TenantName,
          };
        });
      },
      chooseTenant(item) {
        this.dialogTenant = true;
        this.issueInstance.instance_id = item.instance_id;
      },
      getApply() {
        //this.$http.getApp().then(res=>this.instanceForm=res.data)
      },
      initialize() {
        this.instance.creator = this.$store.state.User.Username;
      },

      editItem(item) {
        this.editedIndex = this.instanceForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.instanceForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.instanceForm.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.dialogTenant = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
        console.log(this.issueInstance);
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.instanceForm[this.editedIndex], this.editedItem);
        } else {
          addInstance(this.instance);
        }
        this.close();
      },
    },
  };
</script>

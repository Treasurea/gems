<template>
  <v-data-table class="elevation-1" :headers="headers" :items="applyBaseForm" :search="search" sort-by="user">
    <template #top>
      <v-dialog v-model="dialog" max-width="1200px">
        <template #activator="{ on, attrs }">
          <div style="display: flex; align-items: baseline">
            <v-btn class="mb-2" color="primary" dark v-bind="attrs" v-on="on"> 添加应用账户 </v-btn>
            <v-select dense height="20px" label="按账户名搜索" outlined style="width: 100px" />
            <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="请输入" single-line />
          </div>
        </template>
        <v-card flat>
          <v-row class="pa-0 ma-0">
            <v-col class="py-1" cols="4">
              <v-treeview
                activatable
                :active.sync="active"
                :items="items"
                :open.sync="open"
                return-object
                @update:open="handleClick"
              >
                <template #prepend="{ item }">
                  <v-icon v-if="item.selected == false" @click.prevent="selectFn(item)">
                    {{ 'mdi-checkbox-blank-outline' }}
                  </v-icon>
                  <v-icon v-else @click.prevent="selectFn(item)">
                    {{ 'mdi-checkbox-marked' }}
                  </v-icon>
                </template>
              </v-treeview>
            </v-col>
            <v-col class="py-1" cols="4">
              <v-card elevation="2" flat height="550px">
                <v-card-text>
                  <v-flex class="px-1 mb-2" />
                  <v-list dense height="450px" :style="{ overflowY: `auto` }">
                    <v-list-item v-for="(user, index) in allTenants" :key="index" link @click="setRole(user, index)">
                      <v-list-item-avatar class="my-1">
                        <v-avatar class="white--text font-weight-medium" color="primary" :size="32">
                          {{ user.username[0].toLocaleUpperCase() }}
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content class="text-subtitle-1">
                        {{ user.username }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col class="py-1" cols="4">
              <v-card elevation="2" flat height="550px">
                <v-card-text>
                  <v-flex class="px-1 mb-2" />
                  <v-text-field class="mx-1" dense hide-details prepend-inner-icon="mdi-magnify" />
                  <v-list-item v-for="(user, index) in idaasUsers" :key="index" link @click="removeRole(user, index)">
                    <v-list-item-avatar class="my-1">
                      <v-avatar class="white--text font-weight-medium" color="primary" :size="32">
                        {{ user.username[0].toLocaleUpperCase() }}
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content class="text-subtitle-1">
                      {{ user.username }}
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card-actions style="background-color: #ffffff">
          <v-spacer />
          <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
          <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
        </v-card-actions>
      </v-dialog>
      <v-dialog v-model="editdialog">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="editedItem.idaas" label="IDaaS账号名" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="editedItem.applyAccount" label="应用账号" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="editedItem.applyAuth" label="应用权限" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="editedItem.addTime" label="添加时间" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="editedItem.updateTime" label="更新时间" />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
              </v-card-actions>
            </v-container>
          </v-card-text>
        </v-card>
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
    <template #item.operate="{ item }">
      <v-icon class="mr-2" small @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'ApplyUser',
    comments: {},
    data: () => ({
      allTenants: [
        { username: '东莞富士康成员1' },
        { username: '深圳富士康成员1' },
        { username: '龙华富士康成员1' },
        { username: 'Tenant3' },
      ],
      idaasUsers: [{ username: 'demo' }, { username: 'user1' }, { username: 'user2' }, { username: 'user3' }],
      dialog: false,
      dialogDelete: false,
      editdialog: false,
      search: '',
      items: [
        {
          orgId: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
          name: '富士康总部',
          selected: true,
          fatherOrg: '',
          children: [
            {
              orgId: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
              name: '深圳富士康',
              selected: false,
              fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
              children: [
                {
                  orgId: 'a5f842cc-1bf2-474f-a5ee-63da0adcdb71',
                  name: '龙华富士康',
                  selected: false,
                  fatherOrg: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
                  children: [],
                },
              ],
            },
            {
              orgId: 'b532ff10-324a-4e92-aa63-19f49222331e',
              name: '东莞富士康',
              selected: false,
              fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
              children: [],
            },
            {
              orgId: 'c726020a-f502-4f8a-86c1-8aabcef6ddb1',
              name: '工业富联',
              selected: false,
              fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
              children: [],
            },
          ],
        },
      ],
      headers: [
        {
          text: 'IDaaS账号名',
          align: 'start',
          sortable: false,
          value: 'idaas',
        },
        { text: '应用账号', value: 'applyAccount' },
        { text: '应用权限', value: 'applyAuth' },
        { text: '添加时间', value: 'addTime' },
        { text: '更新时间', value: 'updateTime' },
        { text: '操作', value: 'operate', sortable: false },
      ],
      // applyBaseForm: [],
      editedIndex: -1,
      editedItem: {
        idaas: '',
        applyAccount: '',
        applyAuth: '',
        addTime: '',
        updateTime: '',
      },
      defaultItem: {
        idaas: '',
        applyAccount: '',
        applyAuth: '',
        addTime: '',
        updateTime: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '添加应用账户' : '编辑应用账号';
      },
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
    },

    methods: {
      selectFn(item) {
        item.selected ? (item.selected = false) : (item.selected = true);
      },
      setRole(user, index) {
        this.$delete(this.allTenants, index);
        this.idaasUsers.push(user);
        this.applyBaseForm.push({ idaas: this.allTenants[index].username });
      },
      removeRole(user, index) {
        this.$delete(this.idaasUsers, index);
        this.allTenants.push(user);
      },
      initialize() {
        this.applyBaseForm = [
          {
            idaas: 'ts001',
            applyAccount: 'appy_user001',
            applyAuth: '管理员',
            addTime: '2022-02-22',
            updateTime: '2022-02-22',
          },
          {
            idaas: 'ts002',
            applyAccount: 'apply_user02',
            applyAuth: '用户',
            addTime: '2022-02-22',
            updateTime: '2022-02-22',
          },
          {
            idaas: 'ts003',
            applyAccount: 'apply_user03',
            applyAuth: '管理员',
            addTime: '2022-02-22',
            updateTime: '2022-02-22',
          },
        ];
      },
      editItem(item) {
        this.editedIndex = this.applyBaseForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.editdialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.applyBaseForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.applyBaseForm.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.editdialog = false;
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
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
          Object.assign(this.applyBaseForm[this.editedIndex], this.editedItem);
        } else {
          console.log('1');
        }
        this.close();
      },
    },
  };
</script>

<template>
  <v-data-table class="elevation-1" :headers="headers" :items="tenantForm" :search="search" sort-by="user">
    <template #top>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card flat>
          <v-row class="pa-0 ma-0">
            <v-col class="py-1" cols="6">
              <v-treeview activatable :items="items" open-on-click>
                <template #prepend="{ item, open }">
                  <v-icon v-if="item.selected == false" @click.stop="selectFn(item)">
                    {{ 'mdi-checkbox-blank-outline' }}
                  </v-icon>
                  <v-icon v-else @click.stop="selectFn(item)">
                    {{ 'mdi-checkbox-marked' }}
                  </v-icon>
                </template>
              </v-treeview>
            </v-col>
            <v-col class="py-1" cols="6">
              <v-card elevation="2" flat height="450px">
                <v-card-text>
                  <v-flex class="px-1 mb-2" />
                  <v-list dense height="450px" :style="{ overflowY: `auto` }">
                    <input v-model="isCheckAll" type="checkbox" @click="checkAll" />全选
                    <v-list-item v-for="(item, index) in allTenants" :key="index" link>
                      <input v-model="saveInfo" type="checkbox" :value="item" @change="singleCheck" />
                      <v-list-item-content class="text-subtitle-1">
                        {{ item.username }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
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
    </template>
    <template #item.operate="{ item }">
      <v-btn class="mr-2" small @click="editItem(item)"> 绑定 </v-btn>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  function changeOrg(arr) {
    arr.forEach((item) => {
      item.name = item.orgName;
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
  // import { newPostAddUser, newGetUser } from '@/api';
  export default {
    name: 'AddAccount',
    props: {
      orgSelected: {
        type: Object,
        default: {},
      },
    },
    data: () => ({
      isCheckAll: true,
      saveInfo: [],
      allTenants: [
        { username: '东莞富士康成员1' },
        { username: '深圳富士康成员1' },
        { username: '龙华富士康成员1' },
        { username: 'Tenant3' },
      ],
      dialog: false,
      search: '',
      itemsTran: [],
      items: [],
      headers: [
        {
          text: '租户',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '操作', value: 'operate', sortable: false },
      ],
      tenantForm: [{ name: 'Tenant1' }],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
      orgItems: {
        orgId: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
        orgName: '富士康总部',
        fatherOrg: '',
        child: [
          {
            orgId: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
            orgName: '深圳富士康',
            fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
            child: [
              {
                orgId: 'a5f842cc-1bf2-474f-a5ee-63da0adcdb71',
                orgName: '龙华富士康',
                fatherOrg: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
                child: [],
              },
            ],
          },
          {
            orgId: 'b532ff10-324a-4e92-aa63-19f49222331e',
            orgName: '东莞富士康',
            fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
            child: [],
          },
          {
            orgId: 'c726020a-f502-4f8a-86c1-8aabcef6ddb1',
            orgName: '工业富联',
            fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
            child: [],
          },
        ],
      },
    }),

    computed: {},

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
      this.getOrgList();
    },
    mounted() {},
    methods: {
      singleCheck() {
        if (this.saveInfo.length === this.allTenants.length) {
          this.isCheckAll = true;
        } else {
          this.isCheckAll = false;
        }
        console.log(this.saveInfo);
      },
      checkAll() {
        let that = this;
        this.allTenants.forEach((item) => {
          if (!that.isCheckAll) {
            that.saveInfo.push(item);
          } else that.saveInfo = [];
        });
        console.log(this.saveInfo);
      },
      getOrgList() {
        this.itemsTran.push(this.orgItems);
        this.items = changeOrg(this.itemsTran);
      },
      selectFn(item) {
        item.selected ? (item.selected = false) : (item.selected = true);
        this.orgSelected.orgId = item.orgId;
        this.orgSelected.orgName = item.name;
        this.orgSelected.fatherOrg = item.fatherOrg;
      },
      initialize() {},
      editItem(item) {
        this.editedIndex = this.tenantForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.tenantForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.tenantForm.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
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

      async save() {
        if (this.editedIndex > -1) {
          Object.assign(this.tenantForm[this.editedIndex], this.editedItem);
        } else {
          // this.tenantForm.push({
          //   name: this.newAccountForm.username,
          //   org: this.newAccountForm.organization,
          // });
        }
        // await newPostAddUser(this.newAccountForm);
        this.close();
      },
    },
  };
</script>

<template>
  <v-data-table class="elevation-1" :headers="headers" :items="accountForm" :search="search" sort-by="user">
    <template #top>
      <v-dialog v-model="dialog" max-width="500px">
        <template #activator="{ on, attrs }">
          <div style="display: flex; align-items: baseline">
            <v-btn class="mb-2" color="primary" dark v-bind="attrs" v-on="on"> 新增账号 </v-btn>
            <v-select
              v-model="statusSearch"
              dense
              height="20px"
              :items="status"
              label="全部状态"
              outlined
              style="width: 100px"
            />
            <v-select dense height="20px" label="用户名" outlined style="width: 100px" />
            <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="请输入" single-line />
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="newAccountForm.email" label="邮箱" required :rules="objRules.emailRules" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="newAccountForm.password"
                    label="密码"
                    required
                    :rules="objRules.passwordRules"
                  />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="newAccountForm.name" label="名称" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="newAccountForm.phone_number" label="手机号" :rules="objRules.phoneRules" />
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="newAccountForm.organization" label="组织" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
            <v-btn color="blue darken-1" text @click="save"> 保存 </v-btn>
          </v-card-actions>
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
  </v-data-table>
</template>

<script>
  //格式化数据
  function changeUser(arr) {
    let newArr = [];
    if (arr) {
      arr.forEach((item) => {
        let obj = {};
        obj.name = item.name;
        obj.org = item.organization;
        obj.phone = item.phoneNumber;
        obj.email = item.email;
        newArr.push(obj);
      });
    }
    return newArr;
  }
  import { Message } from 'element-ui';

  import { newGetUser } from '@/api';
  import api from '@/api_other';
  import { email, password, phone } from '@/utils/rules';

  export default {
    name: 'AddAccount',
    props: {
      orgSelected: {
        type: Object,
        default: {},
      },
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      status: ['启用', '禁用'],
      statusSearch: '',
      search: '',

      headers: [
        {
          text: '账号',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '手机', value: 'phone' },
        { text: '邮箱', value: 'email' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'operate', sortable: false },
      ],
      newAccountForm: {
        email: '',
        password: '',
        name: '',
        phone_number: '',
        avatar: '',
      },
      accountForm: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        phone: '',
        email: '',
        status: false,
        org: '',
      },
      defaultItem: {
        name: '',
        phone: '',
        email: '',
        status: false,
        org: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '新建账号' : '编辑账号';
      },
      objRules() {
        return {
          phoneRules: [phone],
          passwordRules: [password],
          emailRules: [email],
        };
      },
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
      orgSelected: {
        handler(val) {
          this.newAccountForm.organization = val.orgId;
          this.getUser();
        },
        deep: true,
      },
    },

    created() {
      this.initialize();
    },
    mounted() {
      this.getUser();
    },
    methods: {
      async getUser() {
        const params = {
          organization: this.orgSelected.orgId,
          page: 1,
          size: 10,
        };
        const data = await newGetUser(params);
        this.accountForm = changeUser(data);
      },
      initialize() {
        // this.newAccountForm.username = this.$store.state.User.Username;
        this.newAccountForm.organization = this.orgSelected.orgId;
      },
      editItem(item) {
        this.editedIndex = this.accountForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.accountForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.accountForm.splice(this.editedIndex, 1);
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
          Object.assign(this.accountForm[this.editedIndex], this.editedItem);
        } else {
          const res = await api.AddAc(this.newAccountForm);
          console.log(res);
          if (res.code === 200) {
            Message({
              type: 'success',
              message: res.msg,
            });
          } else {
            Message({
              type: 'error',
              message: res.msg,
              duration: 5 * 1000,
            });
          }
        }
        this.close();
        this.getUser();
      },
    },
  };
</script>

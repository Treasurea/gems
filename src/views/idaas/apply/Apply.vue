<template>
  <div class="ma-5">
    <div style="display: flex; align-items: baseline">
      <!-- <v-btn class="mb-2" color="primary" dark @click="addApply"> 添加应用 </v-btn> -->
      <!-- <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="搜索我的应用" single-line /> -->
    </div>
    <v-data-table class="elevation-1" :headers="headers" :items="applyForm" :search="search" sort-by="user">
      <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="搜索我的应用" single-line />
      <template #top>
        <!-- <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">添加应用</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field label="OIDC应用" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
              <v-btn color="blue darken-1" text @click="add"> 立刻添加 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        <v-dialog v-model="delDialog" max-width="500px">
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
        <v-btn color="blue darken-1" text to="/idaas-service/idaas-applySetting"> 编辑</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItem(item)"> 删除</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  function changeApply(arr) {
    let newArr = [];
    if (arr.length) {
      arr.forEach((item) => {
        let obj = {};
        obj.application_id = item.application_id;
        obj.tenant = item.tenant;
        newArr.push(obj);
      });
    } else {
      this.applyForm = [];
    }
    return newArr;
  }
  export default {
    name: 'Apply',
    data: () => ({
      dialog: false,
      delDialog: false,
      search: '',
      headers: [
        {
          text: '应用Id',
          align: 'start',
          sortable: false,
          value: 'application_id',
        },
        { text: '租户名称 ', value: 'tenant', sortable: false },
        { text: '操作', value: 'operate', sortable: false },
      ],
      applyForm: [],
      data: [
        {
          instance_id: 'instance001',
          application_id: 'application001',
          tenant: 'tenant001',
          creator: 'user001',
          oidc_client: '97e4dfe8-9a39-4a76-a0d5-8eebaa4c9e7c',
          client_secret: '7e13c03f-c26c-446b-b28b-7155ff9551e9',
          create_time: '2022-09-28T16:45:20+08:00',
          update_time: '2022-09-28T16:45:20+08:00',
        },
      ],
      editedIndex: -1,
      editedItem: {
        applyName: '',
        applyId: '',
      },
      defaultItem: {
        applyName: '',
        applyId: '',
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
      this.getApply();
    },
    methods: {
      addApply() {
        this.dialog = true;
      },
      getApply() {
        this.applyForm = changeApply(this.data);
      },
      initialize() {},

      editItem(item) {
        this.editedIndex = this.applyForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.applyForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.applyForm.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      // closeSave() {
      //   this.formDialog = false;
      // },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.applyForm[this.editedIndex], this.editedItem);
        } else {
          this.applyForm.push(this.editedItem);
        }
        this.close();
      },
      add() {
        this.dialog = false;
        this.formDialog = true;
      },
      addsave() {
        this.formDialog = false;
      },
    },
  };
</script>

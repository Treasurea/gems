<template>
  <div>
    <div>用户</div>
    <v-data-table class="elevation-1" :headers="headers" :items="adForm" :search="search" sort-by="user">
      <template #top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.idaas" label="IDaas字段" />
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-select
                      v-model="editedItem.map"
                      dense
                      height="20px"
                      label="字段值"
                      outlined
                      style="width: 100px"
                    />
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-select
                      v-model="editedItem.field"
                      dense
                      height="20px"
                      label="字段值"
                      outlined
                      style="width: 100px"
                    />
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
      </template>
      <template #item.map>
        <v-select class="pt-6" dense height="20px" :items="app1" label="选择字段" outlined style="width: 120px" />
      </template>
      <template #item.field>
        <v-select class="pt-6" dense height="20px" :items="app2" label="选择字段" outlined style="width: 120px" />
      </template>
      <template #item.operate="{ item }">
        <v-btn class="my-0" color="primary" small @click="addUser"> 添加 </v-btn>
        <v-btn class="my-0" color="primary" small @click="delUser(item)"> 删除 </v-btn>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <div>组织</div>
    <v-data-table class="elevation-1" :headers="headers" :items="orgForm" :search="search" sort-by="user">
      <template #item.map>
        <v-select class="pt-6" dense height="20px" :items="app3" label="选择字段" outlined style="width: 120px" />
      </template>
      <template #item.field>
        <v-select class="pt-6" dense height="20px" :items="app4" label="选择字段" outlined style="width: 120px" />
      </template>
      <template #item.operate="{ item }">
        <v-btn class="my-0" color="primary" small @click="addUser"> 添加 </v-btn>
        <v-btn class="my-0" color="primary" small @click="delUser(item)"> 删除 </v-btn>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'Ad',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      app1: ['字段1', '字段2', '字段3'],
      app2: ['字段4', '字段5', '字段6'],
      app3: ['字段1', '字段2', '字段3'],
      app4: ['字段4', '字段5', '字段6'],
      search: '',
      headers: [
        {
          text: 'IDaas字段',
          align: 'start',
          sortable: false,
          value: 'idaas',
        },
        { text: '映射规则', value: 'map' },
        { text: '字段值', value: 'field' },
        { text: '操作', value: 'operate', sortable: false },
      ],
      adForm: [],
      editedIndex: -1,
      editedItem: {
        idaas: '',
        map: '',
        field: '',
      },
      defaultItem: {
        idaas: '',
        map: '',
        field: '',
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
    },

    methods: {
      initialize() {
        (this.adForm = [
          {
            idaas: '账户',
            map: 'username',
            field: '',
          },
        ]),
          (this.orgForm = [
            {
              idaas: '组织名',
              map: 'username',
              field: '',
            },
          ]);
      },
      addUser() {
        this.dialog = true;
      },
      delUser(item) {
        this.editedIndex = this.adForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.adForm.splice(this.editedIndex, 1);
      },
      deleteItemConfirm() {
        this.adForm.splice(this.editedIndex, 1);
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
      save() {
        this.adForm.push(this.editedItem);
        this.close();
      },
    },
  };
</script>

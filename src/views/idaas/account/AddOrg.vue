<template>
  <v-data-table class="elevation-1" :headers="headers" :items="orgForm" :search="search" sort-by="user">
    <template #top>
      <v-dialog v-model="dialog" max-width="500px">
        <template #activator="{ on, attrs }">
          <div style="display: flex; align-items: baseline">
            <v-btn class="mb-2" color="primary" dark v-bind="attrs" v-on="on"> 新增组织 </v-btn>
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
                <v-col cols="24" md="4" sm="6">
                  <v-text-field v-model="addOrgForm.orgName" label="组织名" />
                </v-col>
                <v-col cols="24" md="4" sm="6">
                  <v-text-field v-model="addOrgForm.creator" label="创建人" />
                </v-col>
                <v-col cols="24" md="4" sm="6">
                  <v-text-field v-model="addOrgForm.fatherOrg" label="父组织ID" />
                </v-col>
                <v-col cols="24" md="4" sm="6">
                  <v-text-field v-model="addOrgForm.isRoot" label="根节点" />
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
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="24" md="4" sm="6">
                  <v-text-field v-model="editedItem.orgName" label="组织名" />
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
      <v-icon class="mr-2" small @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <!-- <template #no-data>
      <span>
    </template> -->
  </v-data-table>
</template>

<script>
  import { newAddOrg, getOrg } from '@/api';

  export default {
    name: 'AddOrg',
    props: {
      orgSelected: {
        type: Object,
        default: {},
      },
    },
    data: () => ({
      dialog: false,
      delDialog: false,
      editDialog: false,
      search: '',
      // itemsTran: [],
      headers: [
        {
          text: '组织名',
          align: 'start',
          sortable: false,
          value: 'orgName',
        },
        { text: '组织ID', value: 'orgId', sortable: false },
        { text: '操作', value: 'operate', sortable: false },
      ],
      addOrgForm: {
        orgName: '富士康总部',
        creator: '',
        fatherOrg: '',
        isRoot: false,
      },
      orgForm: [],
      editedIndex: -1,
      editedItem: {
        orgName: '',
        orgId: '',
        operate: 0,
      },
      defaultItem: {
        orgName: '',
        orgId: '',
        opetare: 0,
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '新建组织' : '编辑组织';
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
          this.addOrgForm.fatherOrg = val.fatherOrg;
          this.addOrgForm.orgName = val.orgName;
          if (!this.addOrgForm.fatherOrg) {
            this.addOrgForm.isRoot = true;
          }
          this.getOrg();
        },
        deep: true,
      },
    },

    created() {
      this.initialize();
    },
    mounted() {
      this.getOrg();
    },
    methods: {
      getOrg() {
        const params = {
          orgId: this.orgSelected.orgId,
        };
        console.log(this.orgSelected.orgId);
        getOrg(params).then((res) => {
          (this.itemsTran = []), this.itemsTran.push(res);
          this.changeOrg(this.itemsTran);
        });
      },
      initialize() {
        this.addOrgForm.creator = this.$store.state.User.Username;
      },
      changeOrg(arr) {
        (this.orgForm = []),
          arr.forEach((item) => {
            let obj = {};
            obj.orgId = item.orgId;
            obj.orgName = item.orgName;
            if (!item.fatherOrg) {
              obj.selected = true;
            } else {
              obj.selected = false;
            }
            if (item.child.length > 0) {
              this.changeOrg(item.child);
            }
            this.orgForm.push(obj);
          });
      },
      editItem(item) {
        this.editedIndex = this.orgForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.editDialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.orgForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.orgForm.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.editDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.editDialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.orgForm[this.editedIndex], this.editedItem);
        } else {
          newAddOrg(this.addOrgForm);
        }
        this.close();
        this.getOrg();
      },
      orgSave() {
        this.close();
      },
    },
  };
</script>

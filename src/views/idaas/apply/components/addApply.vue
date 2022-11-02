<template>
  <v-card flat>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.applyName" label="应用名称" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#1e88e5" text @click="close"> 取消 </v-btn>
          <v-btn color="#1e88e5" text @click="save"> 保存 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="搜索我的应用" single-line />
    <v-row class="mt-5 ml-15" dense style="height: 200px">
      <v-col v-for="(i, k) in applyForm" :key="k" cols="2">
        <v-card color="blue darken-3">
          <v-card-title class="font-weight-medium" style="flex-direction: column">
            {{ i.applyName }}
          </v-card-title>
          <v-row>
            <v-col class="ms-4" cols="5">
              <v-card color="#385F73" dark>
                <v-btn class="ml-4 button" color="blue darken-2" cols="2" icon large @click="addApply(i)">
                  <v-icon>mdi-pencil</v-icon>添加
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'AddApply',
    components: {},
    props: {},
    data() {
      return {
        dialog: false,
        search: '',
        editedItem: {},
        editedIndex: null,
      };
    },
    computed: {
      applyForm: {
        get() {
          return this.$store.state.ApplyForm;
        },
        set(val) {
          this.$store.commit('SET_APPLYFORM', val);
        },
      },
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
    },
    created() {},

    mounted() {},
    methods: {
      addApply(item) {
        this.dialog = true;
        this.editedIndex = this.applyForm.indexOf(item);
        this.editedItem = Object.assign({}, item);
      },
      close() {
        this.dialog = false;
      },
      save() {
        if (this.editedItem.applyName === this.applyForm[this.editedIndex].applyName) {
          this.applyForm.push(this.editedItem);
        } else {
          Object.assign(this.applyForm[this.editedIndex], this.editedItem);
        }
        this.close();
        this.$router.push({ name: 'idaas-apply' });
      },
    },
  };
</script>

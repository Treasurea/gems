<template>
  <v-container>
    <div style="display: flex">
      <div width="1px">
        <v-card class="pa-0" flat height="auto">
          <div v-for="(items, k) in tabs" :key="k" class="pa-5">
            <v-btn color="primary" dark rounded @click="to(items.value)"> {{ items.text }}</v-btn>
          </div>
        </v-card>
      </div>
      <div class="ml-5" style="flex: 1">
        <v-card flat height="auto" width="auto">
          <v-card-text class="pa-0">
            <router-view class="pl-5 pr-5 pb-5" />
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'Idaas',
    components: {},
    computed: {
      tabs() {
        return [
          { text: '身份提供方', value: 'identity' },
          { text: '账户', value: 'account' },
          { text: '应用', value: 'apply' },
        ];
      },
    },
    methods: {
      to(item) {
        this.$router.push({ name: item });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-radius: 20px;
  }
  .idaas_right {
    border-radius: 20px;
  }
</style>

<template>
  <div style="display: flex; align-items: flex-start">
    <div style="background-color: #ffffff; height: 700px">
      <div class="ma-3">组织结构</div>
      <v-treeview activatable item-key="orgId" :items="items" open-on-click :selection-type="selectionType">
        <template #prepend="{ item, open }">
          <!-- false是全选 -->
          <v-icon v-if="item.selected == false" @click.stop="selectFn(item)">
            {{ 'mdi-shield-outline' }}
          </v-icon>
          <!-- 2是半选 -->
          <v-icon v-else-if="item.selected == '2'">
            {{ 'mdi-shield-half-full' }}
          </v-icon>
          <!-- true是不选 -->
          <v-icon v-else @click.stop="selectFn(item)">
            {{ 'mdi-shield-check' }}
          </v-icon>
        </template>
      </v-treeview>
    </div>
    <v-tabs class="pa-5">
      <v-tab v-for="i in tabs" :key="i">
        <v-icon left> mdi-account </v-icon>
        {{ i }}
      </v-tab>
      <v-btn color="primary" depressed style="position: absolute; right: 50px; top: 5px" to="/idaas-service/idaas-identity">
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
import Tenant from './tenant.vue';
function getLeafLoop (ob, orgId, bools = 1) {
  var resultOb = []; //先定义个返回值 为空数组
  for (let j = 0; j < ob['children'].length; j++)
  {
    if (ob['children'][j].orgId != orgId)
    {
      resultOb = getLeafLoop(ob['children'][j], orgId);
      //必须要有中断的解决办法，不然整个循环会继续下去，结果会变成undefine
      if (resultOb)
      {
        break;
      }
    } else
    {
      if (bools == 1)
      {
        //返回父节点 子节点和自身
        resultOb = [ob, ob['children'][j]];
      } else if (bools == 2)
      {
        //返回父节点
        resultOb = ob;
      } else
      {
        //返回子节点和自身
        resultOb = ob['children'][j];
      }
      break;
    }
  }
  //因为返回结果根据bools有三种情况，所以要排除掉 空数组的返回
  //当没有合适的匹配时，返回的是 undefine，即没有返回
  if (!Array.isArray(resultOb) || resultOb.length > 0)
  {
    return resultOb;
  }
}
//itemsArr为一个数组, 默认情况下，传入的是所有渲染的数据 items
//返回一对象或者数组，
//找到与id值一致的节点
//当bools为1 返回父节点 和 子节点与自身 两者组合的 数组 (默认)
//当bools为2 返回父节点 对象类型
//当bools为3 返回子节点与自身 对象类型
function getLeaf (itemsArr, orgId, bools = 1) {
  var returnOb = [];
  for (let i = 0; i < itemsArr.length; i++)
  {
    if (itemsArr[i].orgId != orgId)
    {
      returnOb = getLeafLoop(itemsArr[i], orgId, bools);
      if (returnOb)
      {
        //如果返回的不是undefine，则停止循环
        break;
      }
    } else
    {
      //id为根节点时，返回自身
      if (bools == 1)
      {
        //特殊情况，如果点击的节点，是根节点，则 父节点和 子节点与自身 都是自己
        returnOb = [itemsArr[i], itemsArr[i]];
      } else
      {
        returnOb = itemsArr[i];
      }
      break; //结束循环
    }
  }
  //因为返回结果根据bools有三种情况，所以要排除掉 空数组的返回
  //当没有合适的匹配时，返回的是 undefine，即没有返回
  if (!Array.isArray(returnOb) || returnOb.length > 0)
  {
    return returnOb;
  }
}

//修改节点下的所有selected 的状态;
//属性的selected 为 判断标准
//arr为一个数组
function changeSelect (arr, bools) {
  for (let i = 0; i < arr.length; i++)
  {
    arr[i].selected = bools;
    if (arr[i].children.length > 0)
    {
      changeSelect(arr[i].children, bools);
    }
  }
}
//修改组织树
function changeOrg (arr) {
  arr.forEach((item) => {
    item.name = item.orgName;
    item.children = item.child;
    delete item.orgName;
    delete item.child;
    if (item.children)
    {
      changeOrg(item.children);
    }
  });
  return arr;
}
//返回父节点下的子节点的状态
//返回一个二维数组，第一项为选中的项， 第二项为没有被选中的项
//arr为一个数组
function leafSelectStatus (arr) {
  var seleTrue = [];
  var seleFalse = [];
  var selected = {};
  for (let i = 0; i < arr.length; i++)
  {
    if (arr[i].selected)
    {
      //将 true 和 2 的状态 归为一组（如果有需要可以分开）
      seleTrue.push(arr[i].orgId); //这里设置返回的选中的节点 数据内容
      selected.orgId = arr[i].orgId;
      selected.orgName = arr[i].name;
      selected.fatherOrg = arr[i].fatherOrg;
      // console.log(selected)
    } else
    {
      seleFalse.push(arr[i].orgId); //这里设置返回的未选中的节点 数据内容
    }
    if (arr[i].children.length > 0)
    {
      //递归，继续查找子节点下的子节点
      var resultOb = leafSelectStatus(arr[i].children);
      //拼接上 子节点下的子节点 返回的数据
      seleTrue = seleTrue.concat(resultOb[0]);
      seleFalse = seleFalse.concat(resultOb[1]);
    }
  }
  return [seleTrue, seleFalse, selected]; //返回一个数组
}

//修改爷爷辈的节点selected
function changeGraFatherStatus (itemArr, orgId) {
  var resultob = getLeaf(itemArr, orgId);
  var sonStatus = leafSelectStatus(resultob[0].children);
  if (sonStatus[0].length > 0 && sonStatus[1].length > 0)
  {
    //此时parent变为 半选状态
    resultob[0].selected = 2;
    // console.log("有未选中和选中的");
    //这时候需要继续向根节点 做进一步修改
    if (resultob[0].orgId != resultob[1].orgId)
    {
      // this.selectFn(parent, true);
      changeGraFatherStatus(itemArr, resultob[0].orgId);
    }
  } else if (sonStatus[0].length == 0 && sonStatus[1].length > 0)
  {
    //此时parent应该变成未选中
    resultob[0].selected = false;
    // console.log("都是未选中的")
    //这时候需要继续向根节点 做进一步修改
    if (resultob[0].orgId != resultob[1].orgId)
    {
      // this.selectFn(parent, true);
      changeGraFatherStatus(itemArr, resultob[0].orgId);
    }
  } else if (sonStatus[0].length > 0 && sonStatus[1].length == 0)
  {
    //此时parent应该变成选中
    resultob[0].selected = true;
    // console.log("都是选中的");
    //这时候需要继续向根节点 做进一步修改
    //如果该节点就是根节点，不在进行循环
    if (resultob[0].orgId != resultob[1].orgId)
    {
      changeGraFatherStatus(itemArr, resultob[0].orgId);
    }
  } else
  {
    //没有子节点 并且自身还是根节点的时候会出现
    // console.log("我就是孤独的根号3");
  }
}
export default {
  name: 'Account',
  components: {
    AddAccount,
    AddOrg,
    Tenant,
  },
  props: {},
  data () {
    return {
      selectSet: new Set(),
      orgSelected: {
        orgId: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
      },
      selectionType: 'independent',
      tabs: ['账号', '组织', '租户'],
      itemsTran: [],
      // selected:{
      //   orgId:'',
      //   orgName:'',
      //   fatherOrg:''
      // },
      items: [
        // {
        //   orgId: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
        //   name: '富士康总部',
        //   selected: true,
        //   fatherOrg: '',
        //   children: [
        //     {
        //       orgId: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
        //       name: '深圳富士康',
        //       selected: false,
        //       fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
        //       children: [
        //         {
        //           orgId: 'a5f842cc-1bf2-474f-a5ee-63da0adcdb71',
        //           name: '龙华富士康',
        //           selected: false,
        //           fatherOrg: '2e1cf0aa-f2d0-45fe-ba23-9ddf257878a1',
        //           children: [],
        //         },
        //       ],
        //     },
        //     {
        //       orgId: 'b532ff10-324a-4e92-aa63-19f49222331e',
        //       name: '东莞富士康',
        //       selected: false,
        //       fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
        //       children: [],
        //     },
        //     {
        //       orgId: 'c726020a-f502-4f8a-86c1-8aabcef6ddb1',
        //       name: '工业富联',
        //       selected: false,
        //       fatherOrg: 'cf6baed1-21ce-4b48-9dc5-55d74ef29e37',
        //       children: [],
        //     },
        //   ],
        // },
      ],

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
    };
  },
  computed: {},
  watch: {
    items: {
      deep: true,
      handler: function (value) {
        for (var i = 0; i < value.length; i++)
        {
          if (value[i].selected)
          {
            //将半选和全选的节点 添加数据到set中
            this.selectSet.add(value[i].orgId);
          } else
          {
            this.selectSet.delete(value[i].orgId); //将数据从set中删除
          }
        }
      },
    },
  },
  created () {
    this.getOrgList();
  },
  mounted () {
    // this.getOrg()
  },
  methods: {
    selectFn (item) {
      var leafArr = [];
      var parent = '';
      var son = '';
      //改变自身的selected， 该事件是由点击事件造成，而不是循环事件
      item.selected ? (item.selected = false) : (item.selected = true);

      //获取父节点（包含父节点的对象）  和 子节点与自身（自身的对象） 的数组
      leafArr = getLeaf(this.items, item.orgId);

      parent = leafArr[0];
      //其实此处的 son（子节点与自身）和 selectFn(item)的item是一个对象
      son = leafArr[1];

      //修改子节点的所有select 将子节点中的 selected 都变为item.selected状态
      changeSelect(son.children, item.selected);

      //获取父节点下的所有children中 选中、半选中状态 和 未选中 的节点数组
      var sonStatus = leafSelectStatus(parent.children);
      this.orgSelected = leafSelectStatus(parent.children)[2];
      // console.log(this.orgSelected)

      //判断sonStatus中 选中、半选中状态 和 未选中 的节点的数量
      if (sonStatus[0].length > 0 && sonStatus[1].length > 0)
      {
        //此时parent变为 半选状态
        parent.selected = 2;
        // console.log("有未选中和选中的");
        //这时候需要继续向根节点 做进一步修改
        if (parent.orgId != son.orgId)
        {
          // this.selectFn(parent, true);
          changeGraFatherStatus(this.items, parent.orgId);
        }
      } else if (sonStatus[0].length == 0 && sonStatus[1].length > 0)
      {
        //此时parent应该变成未选中
        parent.selected = false;
        // console.log("都是未选中的")
        //这时候需要继续向根节点 做进一步修改
        if (parent.orgId != son.orgId)
        {
          // this.selectFn(parent, true);
          changeGraFatherStatus(this.items, parent.orgId);
        }
      } else if (sonStatus[0].length > 0 && sonStatus[1].length == 0)
      {
        //此时parent应该变成选中
        parent.selected = true;
        // console.log("都是选中的");
        //这时候需要继续向根节点 做进一步修改
        if (parent.orgId != son.orgId)
        {
          changeGraFatherStatus(this.items, parent.orgId);
        }
      } else
      {
        //没有子节点 并且自身还是根节点的时候会出现
        // console.log("我就是孤独的根号3");
      }
    },
    getOrgList () {
      this.itemsTran.push(this.orgItems);
      this.items = changeOrg(this.itemsTran);
    },
  },
  // async getOrg() {
  //   const res = await this.$http.getOrg()
  //   console.log(res)
  // },
};
</script>

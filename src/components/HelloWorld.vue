<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>逆转后的数据为：{{getReversedMsg}}</h2>
    <!-- 指令：v-bind的作用是绑定dom属性（此处为title）和data中的相应字段（data.message） -->
    <span :title="message">
      鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
    <div v-for="(item,index) in todos" :key="index" @click="pushTodo">{{item.text}}</div>

    <div>data中的数组中的数据变化后，computed得来的值会感应到：{{computedTodo}}</div>
    <div>
      <input v-for="(item,index) in results" :key="index" type="text" v-model="item.marks">
      total:{{totalMarks}}
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */ 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App2232',
      message: '页面加载于 ' + new Date().toLocaleString(),
      todos: [
        {text:'学习1222'},
        {text:'学习2'},
        {text:'学习3'}
      ],
      results:[
        {
          name:'Englsh',
          marks:70
        },
        {
          name:'Math',
          marks:90
        },
        {
          name:'histoey',
          marks:80
        },
      ],
    }
  },
  computed:{
    getReversedMsg:function(){
      return this.msg.split('').reverse().join('');
    },
    computedTodo:function(){
      return this.todos[0].text;
    },
    totalMarks:function(){
      let total = 0;
      let _this = this;
      for(let i = 0; i < _this.results.length; i++){
        total += parseInt(_this.results[i].marks);
      }
      return total;
      // 验证结果是：在页面input框输入不同的数字，最终计算出来的总成绩也是响应变化的
    }
  },
  watch:{
    z: {
      handler: function (val, oldVal) {
          console.log('[watch]==>c===:'+val+','+oldVal)
      },
      deep: true // 深度watcher
    },
    x: function (val, oldVal) {
      console.log('变化后的数据是：',val);
    },
  },
  methods:{
    pushTodo:function(){
      this.todos.push({text:'学习4'})
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

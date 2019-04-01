<template>
<div class="hello">
  <h1>{{msg}}</h1>
    <el-progress type="circle" :percentage="100" status="success"></el-progress> 
    <el-button type="warning">警告按钮</el-button>
    <el-button @click.native="startHacking">let's do it</el-button>
    <el-button :plain="true" type="success">成功按钮</el-button>
    <el-input v-model="inputValue"/>  
    <el-row>
      姓名：{{info.name}}
      <el-input v-model="info.name" placeholder="请输入姓名"></el-input>
      年龄：{{info.age}}
      <el-input v-model="info.age" placeholder="请输入年龄"></el-input>
      性别：
      <el-select v-model="info.sex" placeholder="请选择">
        <el-option v-for="item in options" :key="item" :value="item"></el-option>
      </el-select>
      <el-button @click="create">创建</el-button><section></section>
      <template>
        <el-table :data="tabledata" align="left">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="a">
              <!--作用域插槽,删除的时候传递$index-->
              <el-button size="mini" type="danger" @click="del(a.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
</div>
</template>
<script>
import Storage from '../store/store.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      inputValue:"ainio",
      msg: 'Welcome to Your Vue.js App',
      info:{
        name:'',
        age:null,
        sex:''
      },
      options:[
        '女','男','保密'
      ],
      tabledata:Storage.fetch()
    }
  },methods:{
    startHacking(){
      /*eleui的提醒框*/
      this.$notify({
        title:'it works',
        message:'we are champion',
        duration:6000
      })
    },
    create(){
       this.tabledata.push(this.info)
       this.info =  {name: '', age: null, sex: ''}//点击创建后，让option还原，而不是停留在所选的项
    },
    del(index){
      this.tabledata.splice(index,1)//删除点击的对象，index是slot-scope="a"
    }
  },
  watch:{
    /*监听的表格数组的变化*/
    tabledata:{
      handler(items){Storage.save(items)},//新添加，监听对象变化后的操作
      //一个函数用于保存数据
      deep:true//深度监听，避免数据的嵌套层数太多，要使用深度监听，防止数据层级过多监听不到  
    }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

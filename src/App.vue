<template>
  <div class="todoapp">
    <Header :addTodo="addTodo"></Header>
    <List :todolist="showlist"></List>
    <Footer 
    :todolist="showlist" 
    :clearCompleted="clearCompleted"
    :changeIndex="changeIndex"
    :tab_index = "tab_index"
    ></Footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide, reactive, toRef, toRefs ,watch,ref} from 'vue';
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import Footer from '@/components/Footer.vue'
import { todoType } from '@/interfaces/main.ts'
import { getTodoList,setTodoList } from '@/utils/localStorageUtils'
export default defineComponent({
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  setup(){
    onMounted(()=>{
      // todolist.value = getTodoList()
      setTimeout(()=>{
        todolist.value = getTodoList()
      },1000)
    })
    const state = reactive<{todolist: Array<todoType> }>({
      todolist:[]
    })
    const todolist = toRef(state,'todolist')
    //添加数据
    const addTodo = (todos:todoType) :any=>{     
      todolist.value.unshift(todos)
    }
    //监听数据更新就存入localStorage
    watch(todolist,(value)=>{
      setTodoList(value)
    },{deep:true})

    //删除数据
    const delTodo = (id:number) =>{
      if(!window.confirm('确定要删除吗？')) return
      const index =  todolist.value.findIndex(item => id == item.id)
      if (index == -1) return
      todolist.value.splice(index,1)
    }
    const updateTodo = (todo:todoType,flag :boolean) :void => {
      todo.type = flag
    }
    //清除已完成
    const clearCompleted = ():void =>{
      todolist.value = todolist.value.filter(item => !item.type)
    }
    const tab_index = ref<number>(0)
    const changeIndex = (index) =>{
      tab_index.value = index
    }
    const showlist = computed(()=>{
      switch (tab_index.value){
        case 0: return todolist.value
        case 1: return todolist.value.filter(item => !item.type)       
        case 2: return todolist.value.filter(item => item.type)   
      }
    })
    provide('delTodo',delTodo)
    provide('updateTodo',updateTodo)
    
    return{
      todolist,
      addTodo,
      delTodo,
      updateTodo,
      clearCompleted,
      tab_index,
      changeIndex,
      showlist
      // ...toRefs(state)
    }
  }
});
</script>

<style>
@import url('./styles/base.css');
@import url('./styles/index.css');
</style>

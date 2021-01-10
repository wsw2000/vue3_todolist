<template>
    <div class="footer">
      <span class="todo-count">
        <strong>{{totalLenth}}</strong>item left
      </span>
      <ul class="filters">
        <li>
            <input class="toggle" type="checkbox" v-model="allCheck"/>全选/全不选
        </li>
        <li 
        v-for="(item,index) in tabs"
        :key="index"
        @click="changeIndex(index)"
        >
          <a :class="{selected: tab_index == index}">{{item}}</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted()">
        Clear completed
      </button>
    </div>
</template>

<script lang="ts">
import { todoType } from '@/interfaces/main';
import { defineComponent, ref ,reactive, computed, toRefs} from 'vue';
export default defineComponent({
  props:{
    todolist:{
      type !: Array as ()=> todoType[],
      required:true
    },
    clearCompleted:{
      type:Function,
      required:true
    },
    changeIndex:{
      type:Function,
      required:true
    },
    tab_index:{
      type:Number as ()=>number
    }
  },
  setup(props) {
    const tabs = reactive<{tabs : string[]}>({
      tabs:['All','Active','Completed']
    })
    
    const totalLenth = computed<number | undefined>(() => {      
      return props.todolist?.length
    })
    const allCheck = computed({
      get(){      
        let flag = props.todolist.every((item)=> item.type)
        flag = flag && totalLenth.value != 0 ? true : false
        console.log('falg：' + flag);
        
        return flag     
      },
      set(val:boolean){
        props.todolist.forEach(item => item.type = val)
      }
    })
    return {
      totalLenth,
      allCheck,
      ...toRefs(tabs),
    };
  },
})
</script>
<style lang="scss" scoped>
</style>
<template>
  <li
    :class="['todo', {'completed':todo.type}]"
    :style="{backgroundColor:bgColor,color:fontColor}"
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="isFlag"/>
      <label>{{todo.title}}</label>
      <button class="destroy" @click="delTodo(todo.id)" />
    </div>
    <input class="edit" type="text"/>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, inject, computed } from "vue";
import { todoType } from '@/interfaces/main.ts'

export default defineComponent({
  props:{
    todo:{
      type :Object as () => todoType,
      required:true
    }
  },
  setup(props) {
    const bgColor = ref<string>('#fffff')
    const fontColor = ref<string>('#000')
    const mouseHandler = (flag:boolean):void =>{
      flag ? bgColor.value = '#5eaaa8' : bgColor.value = '#ffffff'
      flag ? fontColor.value = '#ffffff' : fontColor.value = '#000'

    }
    const delTodo = inject('delTodo')
    const updateTodo = inject<any>('updateTodo')

    const isFlag = computed({
      get(){
        return props.todo.type
      },
      set(val){
        updateTodo(props.todo,val)
      }
    })
    return {
      bgColor,
      fontColor,
      mouseHandler,
      delTodo,
      isFlag,
      updateTodo
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
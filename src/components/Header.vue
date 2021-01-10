<template>
  <div class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="title"
      @keyup.enter="add"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,reactive} from 'vue';
import {todoType} from '@/interfaces/main.ts'
export default defineComponent({
  props:{
    addTodo:{
      type:Function,
      required:true
    } 
  },
  setup(props,context) {
    const title = ref('')
    const id = ref(0)
    const add = () =>{
      if(!title.value.trim()) return
      const todos = {
        id: Date.now(),
        title:title.value,
        type :false
      }
      props.addTodo(todos)
      title.value = ''
    }
    return {
      title,
      id,
      add
    };
  },
})
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <Item v-for="item in todolist" :key="item.id" :todo="item"></Item>
    </ul>
  </div>
</template>

<script lang="ts">
import Item from "@/components/Item.vue";
import { defineComponent, ref, reactive } from "vue";
import { todoType } from '@/interfaces/main.ts'

export default defineComponent({
  components: {
    Item,
  },
  props:{
    todolist !:Array as () => todoType[]
  },
  setup(props,context) {
    return {
      
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
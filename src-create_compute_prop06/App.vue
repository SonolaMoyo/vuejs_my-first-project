<template>
  <div id="app">
    <current-time class="col-4" />
    <task-input class="col-6" @add-task="addNewTask" />
    <div class="col-12">
      <div class="cardBox">
        <div class="container">
          <h2>My Tasks</h2>
          <ul class="taskList">
            <li v-for="(taskItem, index) in displayList" :key="`${index}_${Math.random()}`">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="!!taskItem.finishedAt"
                @input="changeStatus(index)"
              />
              {{ taskItem.task }}
              <span v-if="taskItem.finishedAt">
                {{ taskItem.finishedAt }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentTime from "./components/CurrentTime.vue";
import TaskInput from "./components/TaskInput.vue";

export default {
  name: "TodoApp",
  components: {
    CurrentTime,
    TaskInput,
  },
  data: () => ({
    taskList: [],
  }),
  computed: {
    displayList() {
      return this.taskList;
    },
  },
  methods: {
    addNewTask(task) {
      this.taskList.push({
        task,
        createdAt: Date.now(),
        finishedAt: undefined,
      });
    },
    changeStatus(taskIndex) {
      const task = this.taskList[taskIndex];
      if (task.finishedAt) {
        task.finishedAt = undefined;
      } else {
        task.finishedAt = Date.now();
      }
    },
  },
};
</script>

<style scoped>
.taskList li {
  text-align: left;
}
</style>

<template>
  <div id="app">
    <current-time class="col-4" />
    <task-input class="col-6" @add-task="addNewTask" />
    <div class="col-12">
      <div class="cardBox">
        <div class="container">
          <h2>My Tasks</h2>
          <div class="col-4">
            <input type="checkbox" name="hideDone" id="hideDone" v-model="hideDone">
            <label for="hideDone">Hide Done Tasks</label>
          </div>
          <div class="col-4">
            <input type="checkbox" name="reverse" id="reverse" v-model="reverse">
            <label for="reverse">Reverse Order</label>
          </div>
          <div class="col-4">
            <input type="checkbox" name="sortById" id="sortById" v-model="sortById">
            <label for="sortById">Sort By Id</label>
          </div>
          <ul class="taskList">
            <li v-for="(taskItem, index) in displayList" :key="`${index}_${Math.random()}`">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="!!taskItem.finishedAt"
                @input="changeStatus(taskItem.id)"
              />
              #{{ taskItem.id }} - {{ taskItem.task }}
              <span v-if="taskItem.finishedAt">
                Done at: {{ formatDate(taskItem.finishedAt) }}
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
    hideDone: false,
    reverse: false,
    sortById: false,
  }),
  computed: {
    baseList() {
      return [...this.taskList].map((t, index) => ({
        ...t,
        id: index + 1,
      }));
    },
    filteredList() {
      return this.hideDone ? [...this.baseList].filter((t) => !t.finishedAt) : [...this.baseList];
    },
    sortedList() {
      let result = [...this.filteredList];
      if (this.sortedList) {
        result = [...this.filteredList].sort((a, b) => b.id - a.id);
      }
      return result;
    },
    displayList() {
      const taskList = [...this.sortedList];

      return this.reverse ? taskList.reverse() : taskList;
    },
  },
  methods: {
    formatDate(value) {
      if (!value) return "";
      if (typeof value !== "number") return value;

      const browserLocale =
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.language;
      const intlDateTime = new Intl.DateTimeFormat(browserLocale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return intlDateTime.format(new Date(value));
    },
    addNewTask(task) {
      this.taskList.push({
        task,
        createdAt: Date.now(),
        finishedAt: undefined,
      });
    },
    changeStatus(taskId) {
      const task = this.taskList[taskId - 1];
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

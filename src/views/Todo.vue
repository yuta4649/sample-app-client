<template>
  <div id="todo">
    <div class="container">
      <div class="box">
        <h1 class="title">TODO LIST</h1>
        <!-- Error Message -->
        <error-message :error="errors" />
        <form class="field has-addons" @submit.prevent="submitInput">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="What needs to be done?" v-model="inputTitle">
          </div>
          <div class="control">
            <button type="submit" class="button is-primary">ADD</button>
          </div>
        </form>
        <div class="tabs is-centered">
          <ul>
            <li v-bind:class="{ 'is-active': displayType === 'all' }"
              @click="displayType = 'all'"
            >
            <a>All</a>

            </li>
            <li v-bind:class="{ 'is-active': displayType === 'all' }"
              @click="displayType = 'all'"
            >
            <a>Active</a>

            </li>
            <li v-bind:class="{ 'is-active': displayType === 'all' }"
              @click="displayType = 'all'"
            >
            <a>Completed</a>

            </li>
          </ul>
        </div>
        <table class="table">
          <tbody>
            <tr v-for="todo in displayTodos" :key="todo.todoId">
              <!-- 完了フラグ -->
              <td class="has-text-centered icon-cell">
                <span
                  class="icon has-text-primary is-size-4"
                  v-if="todo.done"
                >
                  <font-awesome-icon icon="check-circle" />
                </span>
                <span
                  class="icon has-text-grey-light is-size-4 not-completed"
                  v-else
                  @click="onClickCompleteTodo(todo)"
                >
                  <font-awesome-icon :icon="['far', 'circle']" />
                </span>
              </td>
              <!-- タイトル -->
              <td class="is-size-5">{{ todo.title }}</td>
              <!-- 編集ボタン -->
              <td class="button-cell">
                <button
                  class="button is-small is-primary is-light"
                  @click.stop="onClickEdit(todo)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { api, withApi } from "@/api";
import _s from "underscore.string";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "Todo",
  components: {
    "error-message": ErrorMessage,
  },
  data: () => {
    return {
      inputTitle: null,
      displayType: 'all',
      todos: [],
      errors: [],
    };
  },
  computed: {
    displayTodos() {
      switch (this.displayType) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
  /** createdフック */
  async created() {
    await withApi(this, async () => {
      await this.reload();
    });
  },
  methods: {
    /**
     * 入力内容を送信
     */
    async submitInput() {
      if (!this.validate()) {
        return;
      }
      await withApi(this, async () => {
        await api.post('todo', {
          json: {
            title: this.inputTitle,
          },
        }),
        this.inputTitle = null;
        await this.reload();
      });
    },
    /**
     * TODO完了メソッド
     */
    async onClickCompleteTodo(todo) {
      await withApi(this, async () => {
        await api.put(`todo/${todo.todoId}/complete`);
        await this.reload();
      });
    },
    onClickReturn() {
      this.$router.push('/');
    },
    /**
     * 編集画面遷移メソッド
     */
    onClickEdit(todo) {
      this.$router.push(`/todo/${todo.todoId}/edit`);
    },
    /**
     * 更新メソッド
     */
    async reload() {
      this.todos = await api.get('todo/list').json();
    },
    validate() {
      const errors = [];
      if (_s.isBlank(this.inputTitle)) {
        errors.push({
          code: "error.c003",
        });
      }
      this.errors = errors;
      return errors.length == 0;
    },
  },
};
</script>

<style scoped>
td {
  vertical-align: middle;
}
</style>

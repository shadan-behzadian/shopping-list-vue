<template>
  <div id="app">
    <h1>Today's shopping list</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          v-model="description"
          placeholder="Go to Moon..."
        />
      </div>
      <div class="control">
        <button
          class="button is-info"
          @click="addItem"
          :disabled="!description"
        >
          ADD
        </button>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDescription"
        />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ? unselect() : select(item)"
            ><i class="material-icons">{{
              isSelected(item) ? "close" : "edit"
            }}</i></span
          >
          <span
            class="icon has-text-info"
            @click="
              isSelected(item) ? updateItem(item, i) : removeItem(item, i)
            "
          >
            <i class="material-icons">
              {{ isSelected(item) ? "save" : "delete" }}</i
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },
  async mounted() {
    console.log("hi");
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
    console.log(response);
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      console.log(response);
      this.description = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icons {
  cursor: pointer;
}
</style>

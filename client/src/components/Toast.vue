<template>
  <div class="toast">
    <div :class="'type ' + toast.type"></div>
    <div class="toast-header">
      <h3>{{ toast.title }}</h3>
      <!-- <button @click="dismissToast">X</button> -->
    </div>
    <div class="toast-content">
      <p>{{ toast.message }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "Toast",
  props: {
    toast: { required: true, type: Object },
  },
  created() {
    // Automatically dismiss toast after 5 seconds
    setTimeout(() => {
      this.dismissToast();
    }, 5000);
  },
  methods: {
    dismissToast() {
      this.$store.commit("clearToast", this.toast.title);
    },
  },
};
</script>

<style scoped>
/* :root = CSS3 way of adding variables you can use anywhere */

.success,
.info,
.error {
  color: black;
}

.type {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0px;
  width: 12px;
  border-top-left-radius: 1rem;
}

.success {
  background-color: #009900;
}

.info {
  background-color: #009999;
}

.error {
  background-color: #990000;
}

.toast {
  position: relative;
  padding: 10px 10px 10px 25px;
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  box-sizing: border-box;
  background-color: #faf8f7;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #cccccc;
}

.toast p {
  font-weight: 100;
}

.toast .sidebar {
  width: 0.5rem;
}

.toast .toast-content,
.toast .toast-header,
.toast .text {
  width: 100%;
  display: flex;
}

.toast .toast-content {
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.toast .toast-header,
.toast .text {
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
}

.toast .toast-header {
  height: 25px;
  font-weight: 600;
}

.toast .toast-header button {
  margin-left: auto;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background: none;
  font-size: 1rem;
}

.toast .toast-header button:hover {
  background: #e7e7e7;
}

.toast .toast-content {
  flex-grow: 1;
}
.toasts-wrapper {
  width: 600px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 2rem;
  bottom: 1rem;
}
</style>
<template>
  <div class="modal-overlay" v-show="show">
    <div class="modal">
      <div class="modal-header">
        <h3 class="mt-3 font-bold text-center">Mesaj</h3>
        <p class="mt-1 text-sm text-center">{{ message }}</p>
      </div>
      <div class="modal-footer mt-3">
        <div class="flex justify-between p-3">
          <button @click="change(true)" class="bg-green-500 hover:bg-green-600">
            Bitir
          </button>
          <button
            @click="change(false)"
            class="bg-[#33a1eb] hover:bg-[#227dba]"
          >
            Sınava Devam Et
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    change: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  background-color: white;
  max-height: 175px;
  width: 500px;
  margin-top: 10%;
  padding: 0px 0;
  border-radius: 20px;
}

.modal-body {
  height: 350px;
  overflow: auto;
}

.modal-footer {
  position: relative;
  bottom: 0;
  height: 50px;
}
.close {
  position: absolute;
  top: 0;
  right: 30px;
  cursor: pointer;
  color: black;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

button {
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>
<template>
  <div class="modal-overlay" v-show="show">
    <div class="modal">
      <div class="modal-header">
        <h3 class="mt-3 font-bold text-center">Roller</h3>
        <p class="mt-1 text-sm text-center">Lütfen bir rol seçiniz!</p>
      </div>
      <div class="modal-body">
        <div class="p-3">
          <table class="w-full">
            <tbody>
              <tr
                v-for="r in data"
                v-bind:key="r.name"
                class="cursor-pointer hover:bg-gray-100 border-b"
                @click="change(r._id, r.name)"
              >
                <td class="text-[18px] w-full py-2">{{ r.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <div class="text-right p-3">
          <button @click="show = false">Çıkış</button>
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
    data: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    change: {
      type: Function,
      required: true,
    },
  },
  methods: {
    selectRole(name, id) {
      console.log(name, id);
      this.name = name;
      this.id = id;
      this.show = false;
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
  max-height: 500px;
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
  display: flex;
  justify-content: flex-end;
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
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>
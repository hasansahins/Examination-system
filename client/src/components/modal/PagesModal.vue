<template>
  <div class="modal-overlay" v-show="show">
    <div class="modal">
      <div class="modal-header">
        <h3 class="mt-3 font-bold text-center">Sayfalar</h3>
        <p class="mt-1 text-sm text-center">
          Lütfen eklemek istediğiniz sayfaları seçiniz!
        </p>
      </div>
      <div class="modal-body">
        <div class="p-3">
          <table class="w-full">
            <tbody>
              <tr
                v-for="r in data"
                v-bind:key="r.url"
                class="hover:cursor-pointer hover:bg-gray-100 border-b"
              >
                <td>
                  <input
                    type="checkbox"
                    v-model="r.checked"
                    :id="r.url"
                    class="py-2"
                  />

                  <label
                    :for="r.url"
                    class="text-[18px] ml-3 cursor-pointer"
                    >{{ r.name }}</label
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <div class="flex justify-between px-5">
          <button @click="Save" class="save">Kaydet</button>
          <button @click="show = false" class="close">İptal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tr from "../../languages/tr.json";
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
    addPages: {
      type: Function,
      required: true,
    },
  },
  methods: {
    Save() {
      const pages = [];
      this.data.forEach((element) => {
        if (element.checked) {
          pages.push(element.url);
          this.addPages(pages);
        }
      });
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
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

button.save {
  background-color: #11ac00;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
button.close {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>
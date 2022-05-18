

<script>
import { Get, Post, Delete } from "../api";

import PagesModal from "../components/modal/PagesModal.vue";
import tr from "../languages/tr.json";
export default {
  data() {
    return {
      role: {
        _id: "0",
        name: "",
        active: true,
        pages: [],
      },
      modal: {
        show: false,
        data: [],
      },
    };
  },
  created() {
    if (this.$route.params.id !== "0") {
      this.GetRole();
    }
  },
  methods: {
    async GetRole() {
      await Get("roles/" + this.$route.params.id).then((response) => {
        console.log(response.data);

        this.role = response.data;
      }),
        (error) => {
          alert(error);
        };
    },
    async onSubmit(e) {
      e.preventDefault();
      await Post("roles/", this.role).then((response) => {
        if (response.data.error) {
          this.$store.commit("addToast", {
            title: "Hata",
            type: "error",
            message: response.data.error,
          });
        } else {
          if (
            this.role._id === "0" &&
            response.data._id &&
            response.data._id !== "0"
          ) {
            this.role = response.data;
            this.$router.push("/roller/" + response.data._id);
          }

          this.$store.commit("addToast", {
            title: "Başarılı",
            type: "success",
            message: "İşlem Başarılı...",
          });
        }
      });
    },
    deleteRole() {
      if (confirm("Silmek istediğinize emin misiniz?")) {
        Delete("roles/" + this.role._id).then((response) => {
          if (response.data === true) {
            this.$router.push("/roller");
          } else {
            alert("Silinemedi");
          }
        });
      }
    },
    newPage() {
      this.modal.show = true;
      const pages = [];
      tr.menu.forEach((item) => {
        if (this.role.pages.includes(item.url)) {
          item.checked = true;
          pages.push(item);
        } else {
          item.checked = false;
          pages.push(item);
        }
      });

      this.modal.data = pages;
    },
    deletePage(key) {
      this.role.pages.splice(key, 1);
    },
  },
  components: {
    PagesModal,
  },
};
</script>
<template>
  <div class="content">
    <PagesModal
      :show="modal.show"
      :data="modal.data"
      :addPages="
        (pages) => {
          this.role.pages = pages;
          this.modal.show = false;
        }
      "
    />
    <form class="w-full" @submit="onSubmit">
      <div class="p-2 bg-white rounded-2xl shadow-lg">
        <div class="flex justify-between">
          <div class="">
            <h5 class="text-md">Rol</h5>
          </div>
          <div class="flex items-center">
            <button
              class="
                bg-green-300
                py-1
                text-sm
                rounded-xl
                shadow-md
                w-20
                mr-3
                text-gray-700
                hover:bg-green-400
              "
              type="submit"
            >
              {{ $route.params.id === "0" ? "Ekle" : "Güncelle" }}
            </button>
            <button
              class="
                bg-red-400
                py-1
                text-sm
                rounded-xl
                shadow-md
                w-20
                text-white
                hover:bg-red-500
              "
              @click="deleteRole"
              type="button"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-2 mt-5">
        <div class="px-3 mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="fullName"
          >
            Adı
          </label>
          <input
            class="
              appearance-none
              w-full
              block
              bg-gray-200
              text-gray-700
              border border-red-500
              rounded
              px-4
              py-2
              mb-3
              leading-tight
              focus:outline-none focus:bg-white
              text-[18px]
              required
            "
            id="name"
            type="text"
            placeholder="Rol Adı"
            v-model="role.name"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-lg p-2 mt-5">
        <div class="flex justify-between">
          <h5 class="text-[18px]">Sayfalar</h5>
          <button
            class="bg-cyan-600 px-1 w-20 text-sm text-white rounded-lg"
            @click="newPage"
            type="button"
          >
            Yeni Ekle
          </button>
        </div>

        <table class="mt-3 w-full text-left text-[17px]">
          <thead>
            <tr>
              <th>#</th>
              <th class="text-left">Adı</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in role.pages"
              v-bind:key="key"
              class="border-b last:border-0"
            >
              <td>
                <button
                  class="
                    bg-red-500
                    px-2
                    py-1
                    text-sm
                    w-12
                    text-white
                    rounded-lg
                  "
                  @click="deletePage(key)"
                >
                  Sil
                </button>
              </td>
              <td class="py-2">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>


<script>
import { Get, Post, Delete } from "../api";
export default {
  data() {
    return {
      category: {
        _id: "0",
        name: "",
        description: "",
      },
    };
  },
  created() {
    if (this.$route.params.id !== "0") {
      this.GetCategory();
    }
  },
  methods: {
    async GetCategory() {
      await Get("category/" + this.$route.params.id).then((response) => {
        this.category = response.data;
      }),
        (error) => {
          alert(error);
        };
    },
    async onSubmit(e) {
      e.preventDefault();
      await Post("category/", this.category).then((response) => {
        if (response.data.error) {
          this.$store.commit("addToast", {
            title: "Hata",
            type: "error",
            message: response.data.error,
          });
        } else {
          if (
            this.category._id === "0" &&
            response.data._id &&
            response.data._id !== "0"
          ) {
            this.category = response.data;
            this.$router.push("/kategoriler/" + response.data._id);
          }

          this.$store.commit("addToast", {
            title: "Başarılı",
            type: "success",
            message: "İşlem Başarılı...",
          });
        }
      });
    },
    deleteKategori() {
      if (confirm("Silmek istediğinize emin misiniz?")) {
        Delete("category/" + this.category._id).then((response) => {
          if (response.data === true) {
            this.$router.push("/kategoriler");
          } else {
            this.$store.commit("addToast", {
              title: "Hata",
              type: "error",
              message: "Kategori Silinemedi!",
            });
          }
        });
      }
    },
  },
};
</script>
<template>
  <div class="content">
    <form class="w-full" @submit="onSubmit">
      <div class="p-2 bg-white rounded-2xl shadow-lg">
        <div class="flex justify-between">
          <div class="">
            <h5 class="text-md">Kategori</h5>
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
              @click="deleteKategori"
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
            for="name"
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
            placeholder="Kategori Adı"
            v-model="category.name"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
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
            for="aciklama"
          >
            Açıklama
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
            id="aciklama"
            type="text"
            placeholder="Açıklama"
            v-model="category.description"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
      </div>
    </form>
  </div>
</template>
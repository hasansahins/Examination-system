

<script>
import { Get, Post, Delete } from "../api";
import UploadImage from "vue-upload-image";
export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      soru: {
        _id: "0",
        question: "",
        answer: "",
        category: "",
        answers: [],
        image: "",
      },
      answer: "",
      categories: [],
    };
  },
  created() {
    if (this.$route.params.id !== "0") {
      this.GetSoru();
    }
    this.getCategories();
  },
  methods: {
    getCategories() {
      Get("category").then((response) => {
        this.categories = response.data;
      });
    },
    async GetSoru() {
      await Get("question/" + this.$route.params.id).then((response) => {
        this.soru = response.data;
      }),
        (error) => {
          alert(error);
        };
    },
    async onSubmit(e) {
      e.preventDefault();
      if (this.soru.answers.length < 4) {
        this.$store.commit("addToast", {
          title: "Cevap Hatası",
          type: "error",
          message: "Lütfen 4 veya daha fazla cevap ekleyiniz!",
        });
      } else {
        await Post("question/", this.soru).then((response) => {
          console.log(response);
          if (response.data.error) {
            this.$store.commit("addToast", {
              title: "Hata",
              type: "error",
              message: response.data.error,
            });
          } else {
            if (
              this.soru._id === "0" &&
              response.data._id &&
              response.data._id !== "0"
            ) {
              this.soru = response.data;
              this.$router.push("/sorular/" + response.data._id);
            }

            this.$store.commit("addToast", {
              title: "Başarılı",
              type: "success",
              message: "İşlem Başarılı...",
            });
          }
        });
      }
    },
    deleteSoru() {
      if (confirm("Silmek istediğinize emin misiniz?")) {
        Delete("question/" + this.soru._id).then((response) => {
          if (response.data === true) {
            this.$router.push("/sorular");
          } else {
            this.$store.commit("addToast", {
              title: "Hata",
              type: "error",
              message: "Soru Silinemedi!",
            });
          }
        });
      }
    },
    addAnswer(a) {
      if (a.length > 0) {
        this.soru.answers.push({
          answer: a,
          isTrue: false,
        });

        this.answer = "";
      }
    },
    deleteAnswer(index) {
      this.soru.answers.splice(index, 1);
    },
    selectTrue(i) {
      this.soru.answers.forEach((element, index) => {
        if (index === i) {
          element.isTrue = true;
        } else {
          element.isTrue = false;
        }
      });
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
            <h5 class="text-md">Soru</h5>
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
              {{ $route.params.id === "0" ? "Kaydet" : "Güncelle" }}
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
              @click="deleteSoru"
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
            for="soru"
          >
            Soru
          </label>
          <input
            class="
              appearance-none
              w-full
              block
              bg-gray-200
              text-gray-700
              rounded
              px-4
              py-2
              mb-3
              leading-tight
              focus:outline-none
              text-[18px]
              required
            "
            id="soru"
            type="text"
            placeholder="Soru"
            v-model="soru.question"
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
            Soru Açıklaması
          </label>
          <textarea
            class="
              appearance-none
              w-full
              block
              bg-gray-200
              text-gray-700
              rounded
              px-4
              py-2
              mb-3
              leading-tight
              focus:outline-none
              text-[18px]
              required
            "
            rows="4"
            id="aciklama"
            type="text"
            placeholder="Açıklama"
            v-model="soru.description"
          ></textarea>
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
            for="kategori"
          >
            Kategori
          </label>

          <select
            v-model="soru.category"
            class="
              w-full
              block
              bg-gray-200
              text-gray-700
              rounded
              px-4
              py-2
              mb-3
              leading-tight
              focus:outline-none
              text-[18px]
            "
          >
            <option v-for="k in categories" v-bind:key="k" v-bind:value="k._id">
              {{ k.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-2 mt-5">
        <div class="px-3 mb-6 md:mb-0">
          <div class="mt-1">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="cevaplar"
            >
              Cevap Ekle
            </label>

            <div class="flex items-center">
              <input
                class="
                  w-full
                  appearance-none
                  block
                  bg-gray-200
                  text-gray-700
                  rounded-l-lg
                  px-4
                  py-2
                  leading-tight
                  focus:outline-none
                  text-[18px]
                  required
                "
                name="answer"
                v-model="answer"
              />
              <button
                type="button"
                class="
                  bg-green-500
                  px-4
                  py-1
                  rounded-r-lg
                  h-[39px]
                  text-sm text-white
                "
                @click="addAnswer(answer)"
              >
                Ekle
              </button>
            </div>
          </div>
          <div v-if="soru.answers.length > 0" class="mt-6">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="cevaplar"
            >
              Cevaplar
            </label>
            <table class="w-full text-left">
              <thead>
                <tr class="text-[17px] border-b border-black text-gray-500">
                  <th class="w-56">#</th>
                  <th>Cevap</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in soru.answers"
                  v-bind:key="key"
                  :class="value.isTrue && 'bg-green-300'"
                  class="text-[18px] border-b last:border-0"
                >
                  <td class="pl-1">
                    <button
                      class="
                        text-xs
                        bg-red-400
                        text-white
                        px-3
                        py-1
                        rounded-lg
                        mr-5
                      "
                      @click="deleteAnswer(key)"
                      type="button"
                    >
                      Kaldır
                    </button>
                    <button
                      @click="selectTrue(key)"
                      class="
                        text-xs
                        bg-green-400
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "
                      v-if="!value.isTrue"
                      type="button"
                    >
                      Doğru
                    </button>
                  </td>
                  <td class="py-2 text-[13px]">{{ value.answer }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p
            class="mt-5 text-gray-500 text-sm"
            v-if="soru.answers.length === 0"
          >
            Cevap bulunamadı lütfen en az dört tane ekleyiniz.
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
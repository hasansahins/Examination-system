

<script>
import { Get, Post, Delete } from "../api";
import RolesModal from "../components/modal/RolesModal.vue";
export default {
  data() {
    return {
      user: {
        _id: "0",
        fullName: "",
        email: "",
        roleName: "",
        role: "",
      },
      modal: {
        show: false,
        data: {},
      },
    };
  },
  created() {
    if (this.$route.params.id !== "0") {
      this.GetUser();
    }
  },
  methods: {
    GetUser() {
      Get("users/" + this.$route.params.id).then((response) => {
        this.user = response.data;
      });
    },
    onSubmit() {
      Post("users", this.user).then((response) => {
        if (response.data.error) {
          this.$store.commit("addToast", {
            title: "Hata",
            type: "error",
            message: response.data.error,
          });
        } else {
          if (
            this.user._id === "0" &&
            response.data._id &&
            response.data._id !== "0"
          ) {
            this.user._id = response.data._id;
            this.$router.push("/kullanicilar/" + response.data._id);
          }
          this.$store.commit("addToast", {
            title: "Başarılı",
            type: "success",
            message: "İşlem Başarılı",
          });
        }
      });
    },
    modalOpen() {
      Get("roles").then((response) => {
        this.modal.data = response.data;
        this.modal.show = true;
      });
    },
    deleteUser() {
      if (confirm("Silmek istediğinize emin misiniz?")) {
        Delete("users/" + this.user._id).then((response) => {
          if (response.data === true) {
            this.$router.push("/kullanicilar");
          } else {
            this.$store.commit("addToast", {
              title: "Başarısız",
              type: "error",
              message: "İşlem Başararısız oldu.",
            });
          }
        });
      }
    },
  },
  components: {
    RolesModal,
  },
};
</script>
<template>
  <div class="content">
    <div class="p-2 bg-white rounded-2xl shadow-lg">
      <div class="flex justify-between">
        <div class="">
          <h5 class="text-md">Kullanıcı</h5>
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
            @click="onSubmit"
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
            @click="deleteUser"
          >
            Sil
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-lg p-2 mt-5">
      <form class="w-full">
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
            Ad Soyad
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
            "
            id="fullName"
            type="text"
            placeholder="Ad Soyad"
            v-model="user.fullName"
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
            for="email"
          >
            E-Posta
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
            "
            id="email"
            type="email"
            placeholder="E-Posta"
            v-model="user.email"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
        <div class="w-full px-3">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="grid-password"
          >
            Şifre
          </label>
          <input
            class="
              appearance-none
              block
              w-full
              bg-gray-200
              text-gray-700
              border border-gray-200
              rounded
              py-3
              px-4
              mb-3
              leading-tight
              focus:outline-none focus:bg-white focus:border-gray-500
            "
            id="grid-password"
            type="password"
            placeholder="******************"
            v-model="user.password"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-gray-700 text-xs
              font-bold
              mb-2
            "
            for="Rol"
          >
            Rol
          </label>
          <div class="flex items-center">
            <label>{{ user.roleName }}</label>
            <button
              type="button"
              class="
                bg-green-300
                py-1
                text-sm
                rounded-xl
                shadow-md
                w-20
                mt-[-5px]
                text-gray-700
                hover:bg-green-400
              "
              :class="{
                'ml-3': user.roleName !== '',
              }"
              @click="modalOpen"
            >
              {{ user.role.length > 0 ? "Değiştir" : "Ekle" }}
            </button>
          </div>
          <!-- <p class="text-gray-600 text-xs italic">
          Make it as long and as crazy as you'd like
        </p> -->
        </div>
      </form>
    </div>
    <RolesModal
      :show="modal.show"
      :data="modal.data"
      :id="user.role"
      :name="user.roleName"
      :change="
        (id, name) => {
          user.role = id;
          user.roleName = name;
          this.modal.show = false;
        }
      "
    />
  </div>
</template>
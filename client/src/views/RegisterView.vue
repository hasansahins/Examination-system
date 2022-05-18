<template>
  <div
    class="bg-gray-400 min-h-screen flex justify-center items-center flex-wrap"
  >
    <div
      class="
        container
        max-w-sm
        mx-auto
        flex-1 flex flex-col
        items-center
        justify-center
        px-2
        shadow-2xl
        rounded-2xl
        bg-white
      "
    >
      <form class="px-6 py-5 text-black w-full" @submit="onSubmit">
        <!-- <h1 class="mb-3 text-3xl text-center font-bold">Examination System</h1> -->
        <div class="flex items-center mb-4">
          <h4 class="text-xl text-center font-semibold px-2">
            Examination System
          </h4>
        </div>

        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="fullname"
          placeholder="Ad Soyad"
          v-model="fullName"
        />

        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="E-Posta"
          v-model="email"
        />

        <input
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Şifre"
          v-model="password"
        />

        <button
          type="submit"
          class="
            inline-block
            px-7
            py-3
            bg-blue-600
            text-white
            font-medium
            text-sm
            leading-snug
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
            w-full
          "
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Kayıt Ol
        </button>

        <div
          class="
            flex
            items-center
            my-4
            before:flex-1 before:border-t before:border-gray-300 before:mt-0.5
            after:flex-1 after:border-t after:border-gray-300 after:mt-0.5
          "
        >
          <p class="text-center font-semibold mx-4 mb-0">VEYA</p>
        </div>
        <router-link
          class="
            mt-5
            px-7
            py-3
            text-white
            font-medium
            text-sm
            leading-snug
            uppercase
            rounded
            shadow-md
            hover:shadow-lg
            focus:shadow-lg focus:outline-none focus:ring-0
            active:shadow-lg
            transition
            duration-150
            ease-in-out
            w-full
            flex
            justify-center
            items-center
            mb-3
          "
          style="background-color: #3b5998"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          :to="'/login'"
        >
          Giriş Yap
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      fullName: "",
    };
  },
  methods: {
    ...mapActions(["RegisterUser"]),
    onSubmit(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
      };
      // this.$store.dispatch("RegisterUser", user);

      this.RegisterUser(user);

    },
  },
};
</script>


<style>
</style>
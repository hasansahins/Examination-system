<template>
  <section>
    <div class=" m-auto">
      <div
        class="
          flex
          justify-center
          items-center
          flex-wrap
          h-full
          g-6
          text-gray-800
          shadow-2xl
          md:p-20
          p-5
          rounded-2xl
          bg-white
        "
      >
        <div class="md:w-6/12 lg:w-6/12 mb-12 md:mb-0 hidden xl:block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone image"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form @submit="onSubmit">
            <h1 class="text-center font-bold text-4xl mb-10">
              Online Sınav Sistemi
            </h1>

            <!-- Email input -->
            <div class="mb-6">
              <input
                type="email"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                placeholder="E-Posta adresi"
                v-model="email"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                placeholder="Şifre"
                v-model="password"
              />
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="
                    appearance-none
                    h-4
                    w-4
                    border border-gray-300
                    rounded-sm
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-2
                    cursor-pointer
                  "
                  id="exampleCheck2"
                  checked
                />
                <label
                  class="
                    form-check-label
                    inline-block
                    text-gray-800
                    cursor-pointer
                  "
                  for="exampleCheck2"
                  >Beni Hatırla</label
                >
              </div>
              <!-- <a
                href="#!"
                class="
                  text-blue-600
                  hover:text-blue-700
                  focus:text-blue-700
                  active:text-blue-800
                  duration-200
                  transition
                  ease-in-out
                "
                >Şifremi Unuttum ?</a
              > -->
            </div>
            <p class="text-red-600" v-if="User.message.length > 0">
              {{ User.message }}
            </p>
            <!-- Submit button -->
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
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
                w-full
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Giriş Yap
            </button>
            <div
              class="
                flex
                items-center
                my-4
                before:flex-1
                before:border-t
                before:border-gray-300
                before:mt-0.5
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
              :to="'/register'"
            >
              Kayıt Ol!
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  computed: {
    ...mapGetters(["User"]),
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("LoginUser", user);
    },
  },
};
</script>

<style>
.form {
  margin-top: 100px !important;
}
</style>
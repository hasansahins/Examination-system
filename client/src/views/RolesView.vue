<template>
  <div class="content">
    <div class="p-2 bg-white rounded-2xl shadow-lg">
      <div class="flex justify-between">
        <div class="">
          <h5 class="text-md">Roller</h5>
        </div>
        <div class="flex items-center">
          <button
            class="bg-blue-300 py-1 text-sm rounded-xl shadow-md mr-3 w-20"
            @click="getRoles"
          >
            Yenile
          </button>
          <button
            class="bg-green-300 py-1 text-sm rounded-xl shadow-md w-20"
            @click="this.$router.push('/roller/0')"
          >
            Yeni
          </button>
        </div>
      </div>
    </div>

    <section class="text-gray-600 body-font mt-10">
      <div class="mx-auto">
        <div class="flex flex-wrap -m-4">
          <div
            class="p-2 lg:w-1/3"
            v-for="r in roles"
            v-bind:key="r.name"
            @click="this.$router.push('/roller/' + r._id)"
          >
            <div
              class="
                h-full
                bg-white bg-opacity-75
                p-4
                shadow-lg
                rounded-lg
                overflow-hidden
                text-center
                relative
                hover:bg-gray-200 hover:cursor-pointer
              "
            >
              <h1
                class="
                  title-font
                  sm:text-xl
                  text-sm
                  font-medium
                  text-gray-900
                  mb-1
                "
              >
                {{ r.name }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { List } from "../api/RolesApi";
export default {
  data() {
    return {
      roles: [],
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      List().then((response) => {
        console.log(response.data);
        this.roles = response.data;
      });
    },
  },
};
</script>

<style>
</style>
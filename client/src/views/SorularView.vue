<template>
  <div class="content">
    <div class="p-2 bg-white rounded-2xl shadow-lg">
      <div class="flex justify-between">
        <div class="">
          <h5 class="text-md">Sorular</h5>
        </div>
        <div class="flex items-center">
          <!-- <button
            class="bg-blue-300 py-1 text-sm rounded-xl shadow-md mr-3 w-20"
            @click="fakeData"
          >
            Fake Data
          </button> -->

          <button
            class="bg-blue-300 py-1 text-sm rounded-xl shadow-md mr-3 w-20"
            @click="getCategories"
          >
            Yenile
          </button>
          <button
            class="bg-green-300 py-1 text-sm rounded-xl shadow-md w-20"
            @click="this.$router.push('/sorular/0')"
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
            class="p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            v-for="c in questions"
            v-bind:key="c.name"
            @click="this.$router.push('/sorular/' + c._id)"
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
              <h1 class="title-font text-xs font-medium text-gray-900 mb-1">
                {{ c.question }}
              </h1>
              <p class="text-xs">{{ c.CategoryName }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Get, Post } from "../api";
import data from "../data/fakeData.json";
export default {
  data() {
    return {
      questions: [],
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      Get("question").then((response) => {
        this.questions = response.data;
      });
    },
    // fakeData() {
    //   Post("question/test/data", data).then((response) => {
    //     console.log(response.data);
    //   });
    // },
  },
};
</script>

<style>
</style>
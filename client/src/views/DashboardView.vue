<template>
  <div class="content">
    <div class="p-2 bg-white rounded-2xl shadow-lg">
      <h1>Rapor</h1>

      <div class="flex mt-10">
        <div class="w-1/3 p-3 m-3 rounded-lg shadow-xl bg-blue-100">
          <h6 class="text-sm text-left">Çözülen Soru Sayısı</h6>
          <p class="text-right">{{ raporlar.length }}</p>
        </div>

        <div class="w-1/3 p-3 m-3 rounded-lg shadow-xl bg-green-100">
          <h6 class="text-sm text-left">Toplam Doğru</h6>
          <p class="text-right">{{ Dogrular() }}</p>
        </div>

        <div class="w-1/3 p-3 m-3 rounded-lg shadow-xl bg-blue-100">
          <h6 class="text-sm text-left">Toplam Yanlış</h6>
          <p class="text-right">{{ Yanlislar() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Post } from "../api";

export default {
  data() {
    return {
      raporlar: [],
    };
  },
  created: function () {
    this.Raporlar();
  },
  methods: {
    Dogrular() {
      return this.raporlar.filter((r) => r.isTrue).length;
    },
    Yanlislar() {
      return this.raporlar.filter((r) => r.isTrue === false).length;
    },
    async Raporlar() {
      const user = JSON.parse(localStorage.getItem("User"));
      await Get("exam/sinavSonucu/" + user._id).then((response) => {
        this.raporlar = response.data;
      });
    },
  },
};
</script>

<style>
</style>
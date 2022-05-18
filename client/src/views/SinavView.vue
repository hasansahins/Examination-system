<template>
  <div class="content">
    <div class="flex flex-col md:flex-row" v-if="!isExam && !settings">
      <div
        @click="startExam"
        class="
          p-2
          bg-white
          rounded-2xl
          shadow-lg
          w-full
          md:w-1/2
          m-2
          text-center
          cursor-pointer
          hover:bg-gray-200
        "
      >
        <h1 class="text-[18px]">Yeni Bir Sınava Başla</h1>
      </div>
      <div
        @click="Settings"
        class="
          p-2
          bg-white
          rounded-2xl
          shadow-lg
          w-full
          md:w-1/2
          m-2
          text-center
          cursor-pointer
          hover:bg-gray-200
        "
      >
        <h1 class="text-[18px]">Sınav Ayarları</h1>
      </div>
    </div>

    <div class="flex justify-center" v-if="isExam">
      <div class="quiz-container" id="quiz">
        <div class="quiz-header">
          <h2 id="question">{{ order + 1 + ". " + question.question }}</h2>
          <ul>
            <li v-for="(a, key) in question.answers" v-bind:key="key">
              <input
                type="radio"
                name="answer"
                :id="key"
                class="answer"
                @change="selectAnswer(a)"
              />
              <label :for="key" class="ml-3"> {{ a.answer }}</label>
            </li>
          </ul>
        </div>
        <div class="flex justify-between">
          <button class="bg-green-500 hover:bg-green-600" @click="openModal">
            Sınavı Bitir
          </button>
          <button class="bg-[#33a1eb] hover:bg-[#227dba]" @click="nestQuestion">
            Sıradaki Soru
          </button>
        </div>
      </div>
    </div>

    <form @submit="Guncelle" v-if="settings">
      <div class="p-2 bg-white rounded-2xl shadow-lg">
        <div class="flex justify-between">
          <div class="">
            <h5 class="text-md">Sınav Ayarı</h5>
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
              Güncelle
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
            Tekrarlama Gün Sayısı
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
            placeholder="Gün"
            v-model="UserSettings"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
        </div>
      </div>
    </form>
    <MessageModal
      :show="modal"
      :message="message"
      :change="
        (result) => {
          if (result) {
            stopExam();
          }
          modal = false;
        }
      "
    />

    <div
      class="p-5 bg-white rounded-2xl shadow-lg mt-10"
      v-if="!isExam && !settings"
    >
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
import MessageModal from "../components/modal/MessageModal.vue";
export default {
  data() {
    return {
      raporlar: [],
      isExam: false,
      questions: [],
      order: 0,
      question: {},
      answers: [],
      answer: {},
      modal: false,
      message: "",
      settings: false,
      UserSettings: {},
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
    async startExam() {
      const user = JSON.parse(localStorage.getItem("User"));
      await Get("exam/soruGetir").then((response) => {
        this.questions = response.data;
        if (this.questions.length > 25) {
          const app = document.getElementById("app");
          app.classList.add("close-sidebar");
          this.isExam = true;
          this.question = this.questions[this.order];
        }
      });
    },
    async stopExam() {
      if (this.answers.length > 8) {
        await Post("exam/sinavBitir", {
          answers: this.answers,
        }).then((response) => {
          window.location.reload();
        });
      }

      window.location.reload();
    },
    nestQuestion() {
      if (this.answer) {
        const user = JSON.parse(localStorage.getItem("User"));

        this.answers.push({
          question: this.question._id,
          answer: this.answer.answer,
          isTrue: this.answer.isTrue,
          user: user._id,
        });
        this.answer = null;
        this.order++;
        this.question = this.questions[this.order];
      }
    },
    selectAnswer(answer) {
      this.answer = answer;
    },
    openModal() {
      this.modal = true;
      if (this.answers.length < 10) {
        this.message =
          "Sınavı tamamlamak için en az 10 soruya cevap vermeniz gerekiyor. Sınavı bitirirseniz cevapladığınız sorular geçersiz sayılacaktır.";
      } else {
        this.message =
          "Sınavı tamamlamak için onaylamak istediğinize emin misiniz?";
      }
    },
    Settings() {
      const user = JSON.parse(localStorage.getItem("User"));
      this.UserSettings = user.settings;
      this.settings = true;
    },
    Guncelle(e) {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("User"));
      user.settings = this.UserSettings;
      Post("users/update/settings", user).then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          localStorage.setItem("User", JSON.stringify(user));
          this.settings = false;
          this.$store.commit("addToast", {
            title: "Başarılı",
            type: "success",
            message: "Ayarlarınız başarıyla güncellendi.",
          });
        }
      });
    },
    async Raporlar() {
      const user = JSON.parse(localStorage.getItem("User"));
      await Get("exam/sinavSonucu/" + user._id).then((response) => {
        this.raporlar = response.data;
      });
    },
  },
  components: { MessageModal },
};
</script>

<style>
.quiz-container {
  background-color: #fff;
  border-radius: 2%;
  box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
  width: 37.5rem;
  overflow: hidden;
}

.quiz-header {
  padding: 20px 30px 20px 30px;
}

.quiz-container h2 {
  padding: 1rem;
  text-align: center;
  margin: 0;
}

.quiz-container ul {
  list-style-type: none;
  padding: 0;
}

.quiz-container ul li {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.quiz-container ul li label {
  cursor: pointer;
}

.quiz-container button {
  border: none;
  color: #fff;
  display: block;
  width: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  padding: 1.3rem;
}
</style>
<template>
  <div>
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div class="card" style="transform: scale(0.9); transform-origin: 0 0">
          <div class="sm:mx-auto sm:w-full sm:max-w-sn">
            <div class="md:mt-0">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Card logo -->
                <div
                  class="px-4 py-2 bg-white space-y-4 sm:p-6"
                  style="width: 500px"
                >
                  <h1 class="text-xl font-bold">Новый товар</h1>

                  <div>
                    <label> Наименование </label>
                    <input
                      type="text"
                      class="input-text"
                      placeholder="Наименование товара"
                      v-model="form.title"
                    />
                    <p
                      v-if="errors && !!errors.title"
                      class="mt-2 text-sm text-red-600 text-left"
                    >
                      {{ errors.title[0] }}
                    </p>
                  </div>

                  <div>
                    <label> Описание </label>
                    <div class="mt-1">
                      <textarea
                        v-model="form.description"
                        placeholder="Опинсание товара"
                      />
                      <p
                        v-if="errors && !!errors.description"
                        class="mt-2 text-sm text-red-600 text-left"
                      >
                        {{ errors.description[0] }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label> Изображение </label>
                    <div class="mt-2 flex items-center">
                      <span v-if="!url" class="image-default">
                        <svg
                          class="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>

                      <img
                        v-else
                        class="inline-block h-14 w-14 rounded-md"
                        :src="url"
                        alt="img"
                      />

                      <input
                        type="file"
                        @change="getPicture"
                        class="input-image"
                      />
                    </div>
                    <p
                      v-if="errors && !!errors.image"
                      class="mt-2 text-sm text-red-600 text-left"
                    >
                      {{ errors.image[0] }}
                    </p>
                  </div>

                  <div>
                    <label> Цена </label>
                    <input
                      type="text"
                      class="input-text"
                      placeholder="Цена товара ₽"
                      v-model="form.price"
                    />
                    <p
                      v-if="errors && !!errors.price"
                      class="mt-2 text-sm text-red-600 text-left"
                    >
                      {{ errors.price[0] }}
                    </p>
                  </div>

                  <div>
                    <label> Категория </label>
                    <select v-model="form.category_id">
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.title }}
                      </option>
                    </select>
                    <p
                      v-if="errors && !!errors.category_id"
                      class="mt-2 text-sm text-red-600 text-left"
                    >
                      {{ errors.category_id[0] }}
                    </p>
                  </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    class="btn-cancel"
                    @click.prevent="showModalComponent(false)"
                  >
                    Отмена
                  </button>
                  <button class="btn-primary" @click.prevent="save(form)">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    axios.get("/api/categories").then(({ data }) => {
      this.categories = data;
    });
  },

  data() {
    return {
      url: "",
      form: {},
      categories: [],
      errors: [],
    };
  },

  methods: {
    ...mapActions({
      showModalComponent: "admin/showModalComponent",
      saveProduct: "admin/saveProduct",
    }),
    getPicture(e) {
      this.form.image = e.target.files[0];
      this.url = URL.createObjectURL(this.form.image);
    },
    save() {
      let fData = new FormData();
      fData.append("title", this.form.title ?? "");
      fData.append("description", this.form.description ?? "");
      fData.append("image", this.form.image ?? "");
      fData.append("price", this.form.price ?? "");
      fData.append("category_id", this.form.category_id ?? "");
      this.saveProduct(fData).then((res) => {
        if (res) {
          this.errors = res;
        }
      });
    },
  },

  beforeDestroy() {
    this.form = {};
    this.url = "";
    this.errors = [];
  },
};
</script>
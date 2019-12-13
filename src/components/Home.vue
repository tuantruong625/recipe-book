<template>
  <section>
    <navigation />
    <div v-if="!user">
      <login />
    </div>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="recipes">
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mb-10" v-for="recipe in recipes" :key="recipe.id">
          <article class="overflow-hidden rounded-lg shadow-lg">
            <img alt="Placeholder" class="block h-auto w-full" :src="recipe.imageURL ? recipe.imageURL : imagePlaceholder">
            <div class="p-5">
              <header class="flex items-start justify-start leading-tight p-2 md:p-4">
                <h1 class="text-lg font-semibold capitalize">{{ recipe.name }}</h1>
              </header>

              <p class="flex items-start justify-start italic pl-6 text-gray-600">{{ recipe.description }}</p>

              <h2 class="flex items-start text-md font-medium md:p-3 p-3">Ingredients</h2>
              <div class="flex items-start justify-start flex-col md:p-3 p-3" v-for="(ingredient, ingredientIndex) in recipe.ingredients" :key="ingredientIndex">
                <div class="list-disc"> ○ {{ ingredient.name }} | <span class="text-gray-500">{{ ingredient.quantity }}</span></div>
              </div>

              <h2 class="flex items-start text-md font-medium md:p-3 p-3">Steps</h2>
              <div class="flex items-start justify-start flex-col md:p-3 p-3" v-for="(step, stepIndex) in recipe.Steps" :key="stepIndex">
                <div class="list-disc"> ○ {{ step }}</div>
              </div>
              <div class="flex items-start justify-start flex-col md:p-3 p-3">
                <button  @click="deleteItem(recipe.id)" class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                  Delete
                </button>
                <button class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                  <router-link :to="{ name: 'Edit Recipe', params: {recipeList: recipe, key: recipe.id} }" >
                    Edit
                  </router-link>
                </button>
              </div>
              <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline hover:underline text-black" href="#">
                  <img alt="Placeholder" class="block rounded-full h-8" :src="user.photoURL">
                  <p class="ml-2 text-sm">
                    {{ user.displayName }} 
                  </p>
                </a>
              </footer>
            </div>
          </article>
        </div>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="!recipes">
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mb-10" v-for="recipe in recipes" :key="recipe.id">
          <article class="overflow-hidden rounded-lg shadow-lg">
            <img alt="Placeholder" class="block h-auto w-full" :src="recipe.imageURL ? recipe.imageURL : imagePlaceholder">
            <div class="p-5 flex items-center flex-col">
              <header class="flex items-start justify-start leading-tight p-2 md:p-4">
                <h1 class="text-lg font-semibold capitalize">You have no recipes</h1>
              </header>
              <button><router-link
                class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                to="/add-recipe"
              >Add Recipe</router-link></button>

            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import navigation from '@/components/NavBar.vue';
import firebase from 'firebase';
import Login from '@/components/Login.vue';

export default {
  components: {
    navigation,
    Login,
  },
  data() {
    return {
      user: null,
      recipes: [],
      imagePlaceholder: 'https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg',
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.getRecipes();
      this.user = user;
    });
  },
  methods: {
    deleteItem(key) {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('recipes')
        .doc(key)
        .delete();
    },
    editRecipe(recipe){
      console.log(recipe);
      console.log(this.recipes);
    },
    async getRecipes() {
      let recipesRef = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('recipes');

      recipesRef.onSnapshot(snap => {
        this.recipes = [];
        snap.forEach(doc => {
          let recipe = doc.data();
          recipe.id = doc.id;
          this.recipes.push(recipe);
        });
      });
    },
  },
};
</script>

<template>
  <section>
    <navigation/>
    <h1 class="text-6xl">Recipes</h1>
    <div v-for="recipe in recipes" :key="recipe.id">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" :src="recipe.imageURL" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ recipe.name }}</div>
          <p class="text-gray-700 text-base">
            {{ recipe.ingredients[0].name }}:
            {{ recipe.ingredients[0].quantity }}
            {{ recipe.imageURL }}

          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import navigation from '@/components/NavBar.vue';
import firebase from 'firebase';

export default {
  data() {
    return {
      recipes: [],
    };
  },
  components: {
    navigation,
  },
  created() {
    this.getRecipes();
  },
  methods: {
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
          // eslint-disable-next-line no-console
          console.log(recipe);
        });
      });
    },
  },
};
</script>

<style></style>

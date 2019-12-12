<template>
  <section>
    <navigation/>
    <h1 class="text-6xl">Recipes</h1>
    <div v-for="recipe in recipes" :key="recipe.id">
      <pre>
            <code>
            {{ recipe }}
            </code>

            </pre>
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

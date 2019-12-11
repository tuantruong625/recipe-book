<template>
  <section>
    <navigation/>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" v-for="recipe in recipes" :key="recipe.id">
          <article class="overflow-hidden rounded-lg shadow-lg">

            <a href="#">
              <img alt="Placeholder" class="block h-auto w-full" :src="recipe.imageURL ? recipe.imageURL : imagePlaceholder">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a class="no-underline hover:underline text-black" href="#">
                  {{ recipe.name }}
                </a>
              </h1>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <a class="flex items-center no-underline hover:underline text-black" href="#">
                <img alt="Placeholder" class="block rounded-full h-8" :src="user.photoURL">
                <p class="ml-2 text-sm">
                  {{ user.displayName }}
                </p>
              </a>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import navigation from '@/components/NavBar.vue';
import firebase from 'firebase';

export default {
  components: {
    navigation,
  },
  data() {
    return {
      user: null,
      recipes: [],
      imagePlaceholder: 'https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg',
    };
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
  created() {
    this.getRecipes();
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
};
</script>

<style></style>

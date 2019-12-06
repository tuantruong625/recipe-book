<template>
  <section>
    <navigation/>
    <h1 class="text-6xl">Home</h1>
    <button><router-link
      v-show="user"
      class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      to="/add-recipe"
    >Add Recipe</router-link></button>

    <div>
      <h2>Recipes</h2>

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
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
};
</script>

<style></style>

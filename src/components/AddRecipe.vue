<template>
  <section class="form">
    <navigation/>
    <h1 class="text-6xl">Add Recipe</h1>
    <label for="name">
      Name
      <input id="name" type="text" name="name" v-model="name" >
    </label>
    <label for="image">
      Image URL
      <input id="image" type="text" name="image" v-model="imageURL" >
    </label>
    <label for="steps">
      Steps
      {{ Steps }}
      <input id="steps" type="text" name="steps" v-model="step" >
      <button @click="addStep">Add step</button>
    </label>
    <label for="Ingredients">
      Ingredients
      {{ ingredients }}
      <input id="Ingredients" type="text" name="ingredient name" v-model="ingredient.name" >
      <input id="" type="text" name="ingredient quantity" v-model="ingredient.quantity" >
      <button @click="addIngredient">Add Ingredient</button>
    </label>

    <button @click="addRecipe">Add Recipe</button>
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
      Steps: [],
      step: null,
      ingredients: [],
      ingredient: {},
      imageURL: null,
      name: null,
    };
  },
  methods: {
    addStep() {
      this.Steps.push(this.step);
      this.step = '';
    },
    addIngredient() {
      this.ingredients.push(this.ingredient);
      this.ingredient = {};
    },
    addRecipe() {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('recipes')
        .add({
          Steps: this.Steps,
          ingredients: this.ingredients,
          imageURL: this.imageURL,
          name: this.name,
        });
    },
  },
};
</script>

<style></style>

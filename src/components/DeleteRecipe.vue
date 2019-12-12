<template>
  <section class="add-recipe">
    <navigation/>
    <section class="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main class="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section class="bg-cream-lighter p-4 shadow">
          <div class="md:flex">
            <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Add new recipe</h2>
          </div>
          <div class="md:flex mb-8">
            <div class="md:w-1/3">
              <legend class="uppercase tracking-wide text-sm">Recipe Details</legend>
            </div>
            <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">

              <div class="md:flex mb-4">
                <div class="md:flex-1 md:pr-3">
                  <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Name</label>
                  {{ name }}
                </div>
                <div class="md:flex-1 md:pl-3">
                  <img :src="imageURL" :alt="imageURL">
                </div>
              </div>

              <div class="md:flex mb-4">
                <div class="md:flex-1 md:pr-3">
                  <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Steps</label>
                  <span v-for="(step, index) in Steps" :key="index">
                    {{ step }}
                  </span>
                  {{ step }}
                </div>
                <div class="md:flex-1 md:pl-3">
                  <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Ingredients</label>
                  <span v-for="(ingredient, index) in ingredients" :key="index">
                    {{ ingredient.name }} | {{ ingredient.quantity }}
                  </span>
                </div>
              </div>
            </div>
          </div>


          <div class="md:flex mb-8">
            <div class="md:w-1/3">
              <legend class="uppercase tracking-wide text-sm">Create Recipe</legend>
            </div>
            <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <div class="mb-4">
                <label class="block uppercase tracking-wide text-xs font-bold">Name</label>
                <input class="w-full shadow-inner p-4 border-0" type="text" name="name" v-model="name" placeholder="Pizza">
              </div>
              <div class="mb-4">
                <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Image URL</label>
                <input class="w-full shadow-inner p-4 border-0" type="url" name="url" placeholder="image url" v-model="imageURL">
              </div>
            </div>
          </div>

          <div class="md:flex">
            <div class="md:w-1/3">
              <legend class="uppercase tracking-wide text-sm">Add Ingredients</legend>
            </div>
            <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <div class="md:flex mb-4">
                <div class="md:flex-1 md:pr-3">
                  <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Name</label>
                  <div class="w-full flex">
                    <input class="flex-1 shadow-inner p-4 border-0" type="text" name="ingredient name" placeholder="Basil" v-model="ingredient.name">
                  </div>
                </div>

                <div class="md:flex-1 md:pl-3 mt-2 md:mt-0">
                  <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Quantity</label>
                  <div class="w-full flex">
                    <input class="flex-1 shadow-inner p-4 border-0" type="text" name="twitter" placeholder="Bundle" v-model="ingredient.quantity">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="md:flex mb-6 ">
            <div class="md:flex-1 px-3 text-center md:text-right">
              <input type="hidden" name="sponsor" value="0">
              <button class="bg-teal-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded-full" @click="addIngredient">Add Ingredient</button>
            </div>
          </div>

          <div class="md:flex mb-6">
            <div class="md:w-1/3">
              <legend class="uppercase tracking-wide text-sm">Add Steps</legend>
            </div>
            <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <textarea class="w-full shadow-inner p-4 border-0" placeholder="Add each step" rows="3" v-model="step"/>
            </div>
          </div>
          <div class="md:flex mb-6 ">
            <div class="md:flex-1 px-3 text-center md:text-right">
              <input type="hidden" name="sponsor" value="0">
              <button class="bg-teal-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded-full" @click="addStep">Add Step</button>
            </div>
          </div>


          <div class="md:flex mb-6">
            <div class="md:flex-1 px-3 text-center md:text-right justify-center">
              <input type="hidden" name="sponsor" value="0">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="addRecipe">Add Recipe</button>
            </div>
          </div>
        </section>
      </main>
    </section>



    <!--    <label for="name">-->
    <!--      Name-->
    <!--      <input id="name" type="text" name="name" v-model="name" >-->
    <!--    </label>-->
    <!--    <label for="image">-->
    <!--      Image URL-->
    <!--      <input id="image" type="text" name="image" v-model="imageURL" >-->
    <!--    </label>-->
    <!--    <label for="steps">-->
    <!--      Steps-->
    <!--      {{ Steps }}-->
    <!--      <input id="steps" type="text" name="steps" v-model="step" >-->
    <!--      <button @click="addStep">Add step</button>-->
    <!--    </label>-->
    <!--    <label for="Ingredients">-->
    <!--      Ingredients-->
    <!--      {{ ingredients }}-->
    <!--      <input id="Ingredients" type="text" name="ingredient name" v-model="ingredient.name" >-->
    <!--      <input id="" type="text" name="ingredient quantity" v-model="ingredient.quantity" >-->
    <!--      <button @click="addIngredient">Add Ingredient</button>-->
    <!--    </label>-->

    <!--    <button @click="addRecipe">Add Recipe</button>-->
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
      imageURL: 'https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg',
      name: 'Recipe Name',
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

<style>
  .add-recipe-form {
    margin: 0 auto;
  }
</style>

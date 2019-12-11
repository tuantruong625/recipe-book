<template>
  <div>
    <div class="h-screen w-screen flex flex-col items-center justify-center" id="firebaseui-auth-container">
      <h1 class="text-6xl">Recipe Book</h1>
      <img class="h-64 mt-5 mb-5" src="../assets/undraw_noted_pc9f.svg" alt="splash image">
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
  name: 'Login',
  data() {
    return {};
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    let uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>

<style></style>

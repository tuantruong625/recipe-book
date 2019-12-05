import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBNPDg0u0IDBHcBpOVNhkQRG4jFPvG6jdI",
    authDomain: "recipe-book-3057a.firebaseapp.com",
    databaseURL: "https://recipe-book-3057a.firebaseio.com",
    projectId: "recipe-book-3057a",
    storageBucket: "recipe-book-3057a.appspot.com",
    messagingSenderId: "43863100586",
    appId: "1:43863100586:web:7fbaab162f5e14cb3ed4d3",
    measurementId: "G-6KJC8TFHN9"
};

firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

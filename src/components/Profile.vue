<template>
    <section>
        <navigation></navigation>
        <div class="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
            <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
            <div class="flex justify-center -mt-8">
                <img :src="user.photoURL" class="rounded-full border-solid border-white border-2 -mt-3">
            </div>
            <div class="text-center px-3 pb-6 pt-2">
                <h3 class="text-black text-sm bold font-sans">{{user.displayName}}</h3>
                <p class="mt-2 font-sans font-light text-grey-dark">{{user.email}}</p>
                <p class="mt-2 font-sans font-light text-grey-dark">{{user.uid}}</p>
            </div>
            <div class="flex justify-center pb-3 text-grey-dark">

                <div class="text-center">
                    <h2>{{user.providerData[0].providerId}}</h2>
                    <span>Provider</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import navigation from '@/components/NavBar.vue'
import firebase from 'firebase'

export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user
            }
        })
    },
    components: {
        navigation
    }
}
</script>

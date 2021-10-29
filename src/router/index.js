import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../home.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
        name: 'Home',
        path: '/',
        component: Home
    }]
})
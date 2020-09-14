import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    {
        path: '/axios',
        name: 'Axios',
        component: () =>
            import ('../components/module/Axios')
    }, {
        path: '/addressselector',
        name: 'AddressSelector',
        component: () =>
            import ('../components/web/AddressSelector')
    },
    {
        path: '/upvideo',
        name: 'Upvideo',
        component: () =>
            import ('../components/web/Upvideo')
    },
    {
        path: '/upimage',
        name: 'UpImage',
        component: () =>
            import ('../components/web/UpImage')
    },
    {
        path: '/timepicker',
        name: 'TimePicker',
        component: () =>
            import ('../components/web/TimePicker')
    },
    {
        path: '/select',
        name: 'Select',
        component: () =>
            import ('../components/web/Select')
    },
    {
        path: '/page',
        name: 'Pagination',
        component: () =>
            import ('../components/web/Pagination')
    },
    {
        path: '/datepicker',
        name: 'DatePicker',
        component: () =>
            import ('../components/web/DatePicker')
    },
    {
        path: '/speedinessnav',
        name: 'SpeedinessNav',
        component: () =>
            import ('../components/web/SpeedinessNav')
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
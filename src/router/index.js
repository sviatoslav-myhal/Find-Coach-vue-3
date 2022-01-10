import { createRouter, createWebHashHistory } from 'vue-router'

import CoachDetails from '@/components/pages/coaches/CoachDetails'
import CoachList from '@/components/pages/coaches/CoachList'
import CoachRegistration from '@/components/pages/coaches/CoachRegistration'
import NotFound from '@/components/pages/NotFound/NotFound'
import { store } from '@/store'
import Contact from '@/components/pages/requests/Contact'
import Requests from '@/components/pages/requests/Requests'
import UserAuth from '@/components/pages/auth/UserAuth'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        { path: 'contact', component: Contact }
      ]
    },
    { path: '/register', component: CoachRegistration, meta: { requiresLog: true } },
    { path: '/requests', component: Requests, meta: { requiresLog: true } },
    { path: '/auth', component: UserAuth, meta: { requiresNotLog: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'bg-gray-900',
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresLog && !store.getters.isAuthorized) {
    next('/auth');
  } else if (to.meta.requiresNotLog && store.getters.isAuthorized) {
    next('/coaches')
  } else {
    next();
  }
});

import { createRouter, createWebHistory } from 'vue-router'
import PassengerListView from '../views/PassengerListView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import PassengerDetailView from '../views/event/PassengerDetailView.vue'
import PassengerLayoutView from '../views/event/PassengerLayoutView.vue'
import PassengerEditView from '../views/event/PassengerEditView.vue'
import PassengerRegisterView from '../views/event/PassengerRegisterView.vue'
import NProgress from 'nprogress'
import { useEventStore } from '@/stores/event'
import PassengerService from '../services/EventService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PassengerListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        filter: parseInt((route.query?.filter as string) || '3')
      })
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: (to) => {
        //Call API
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return PassengerService.getPassengerById(id)
          .then((Response) => {
            //neet to set up
            eventStore.setEvent(Response.data)
          })
          .catch((error) => {
            if (error.Response && error.Response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'passenger-detail',
          component: PassengerDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'passenger-edit',
          component: PassengerEditView,
          props: true
        },
        {
          path: 'register',
          name: 'passenger-register',
          component: PassengerRegisterView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
  ,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { top: 0 }
    }
  }
})


router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { useStoreAuth } from '../stores/storeAuth.js'

const routes = [
  {
    path:'/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path:'/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path:'/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const storeAuth = useStoreAuth()
  if(!storeAuth.currentUser.id && to.name !== 'auth'){
    return {name: 'auth'}
  }
  if(storeAuth.currentUser.id && to.name === 'auth'){
    return false
  }
})

export default router
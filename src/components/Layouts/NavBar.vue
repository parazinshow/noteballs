<template>
  <nav class="navbar is-success" aria-label="main navigation" role="navigation"> 
    <div class="container is-max-desktop px-2" is-max-desktop>    
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">
          Noteballs - The best note
        </div>
        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{'is-active' : showMobileNav}"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active' : showMobileNav}" ref="navbarMenuRef" >
        <div class="navbar-start">
          <button
            v-if="storeAuth.currentUser.id"
            @click="logout"
            class="button is-small is-info mt-3 ml-3"
          >
            Log out {{ storeAuth.currentUser.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink @click="showMobileNav = false" class="navbar-item" active-class="is-active" to="/">
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            active-class="is-active"
            to="/stats"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/*
  imports
*/
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core'
  import { useStoreAuth } from '../../stores/storeAuth'

//store
  const storeAuth = useStoreAuth()

/*
  mobile nav
*/
  const showMobileNav = ref(false)

// CLick out side to close
  const navbarMenuRef = ref(null)
  const navbarBurgerRef = ref(null)
  onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
  },{
    ignore:[navbarBurgerRef]
  })

//logout
  function logout(){
    showMobileNav.value = false
    storeAuth.logoutUser()
  }

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu{
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
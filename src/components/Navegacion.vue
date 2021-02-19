<template>
  <div>
    <!-- Navigation Bar -->
    <div class="w3-bar w3-light-grey w3-large menu">
      <router-link to="/parqueaderos" class="w3-bar-item w3-button w3-dark-grey w3-mobile" title="dashboard">
        Parqueaderos
      </router-link>
      <router-link to="/clientes" class="w3-bar-item w3-button w3-mobile">
        Clientes
      </router-link>
      <router-link to="/vehiculos" class="w3-bar-item w3-button w3-mobile">
        Vehículos
      </router-link>
      <router-link to="/servicios" class="w3-bar-item w3-button w3-mobile">
        Servicios
      </router-link>
      <router-link to="/tarifas" class="w3-bar-item w3-button w3-mobile">
        Tarifas
      </router-link>
      <router-link to="/usuarios" class="w3-bar-item w3-button w3-mobile">
        Usuarios
      </router-link>
      <router-link to="/cuenta" class="w3-bar-item w3-button w3-right w3-mobile">
        Cuenta
      </router-link>
    </div>
    <!-- fin Navigation Bar -->
  </div>
</template>

<script>
  export default {
    name: "Navegacion",
    props: {},
    components: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a.router-link-exact-active {
    font-weight: bold;
  }
</style>
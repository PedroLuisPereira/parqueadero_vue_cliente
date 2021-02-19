<template>
  <!-- contenido -->
  <div>
    <!-- formulario -->
    <div class="login">
      <div class="w3-card-4">
        <div class="w3-container w3-dark-grey">
          <h3>Login</h3>
        </div>

        <form class="w3-container" v-on:submit.prevent="login()">
          <p>
            <input
              class="w3-input w3-padding-16 w3-border"
              v-model="correo"
              type="email"
              placeholder="Name"
              required
            />
          </p>
          <p>
            <input
              class="w3-input w3-padding-16 w3-border"
              v-model="contra"
              type="password"
              placeholder="Password"
              required
            />
          </p>
          <p>
            <button class="w3-button w3-blue w3-padding-large" type="submit">
              Ingresar
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { url_api } from "@/assets/js/Global.js";
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      correo: "",
      contra: "",
      error: "",
      error_msg: "",
      usuarios: [],
    };
  },
  methods: {
    login: function () {
      let json = {
        correo: this.correo,
        contra: this.contra,
      };

      var config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios
        .post(url_api + "auth.php", json, config)
        .then((response) => {
          if (response.data.status === "success") {
            //guardar token
            localStorage.setItem("token", response.data.token);
            //redirigir al dashboard
            this.$router.push("/parqueaderos");
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  filters: {
    filtro(valor) {
      return valor;
    },
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
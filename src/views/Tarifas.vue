<template>
  <div>
    <Navegacion></Navegacion>

    <!-- formulario -->
    <div class="formulario">
      <div class="w3-card-4">
        <div class="w3-container w3-dark-grey">
          <h2>Tarifas</h2>
        </div>

        <form v-on:submit.prevent="insertar()" class="w3-container">
          <p>
            <label for="">Valor Minuto Automoviles</label>
            <input
              v-model="minuto_autos"
              class="w3-input w3-border"
              type="number"
              min="0"
              step="0.01"
              placeholder="Valor Minuto Automoviles "
              required
            />
          </p>
          <p>
            <label for="">Valor Minutos Motos</label>
            <input
              v-model="minuto_motos"
              class="w3-input w3-border"
              type="number"
              min="0"
              step="0.01"
              placeholder="Valor Minutos Motos"
              required
            />
          </p>
          <p>
            <label for="">Valor Minutos Bicicletas</label>
            <input
              v-model="minuto_bicicletas"
              class="w3-input w3-border"
              type="number"
              min="0"
              step="0.01"
              placeholder="Valor Minutos Bicicletas"
              required
            />
          </p>
          <h4>Descuentos</h4>
          <p>
            <label for="">Minuto para obtener el descuento</label>
            <input
              v-model="minutos"
              class="w3-input w3-border"
              type="number"
              placeholder="Minuto para obtener el descuento"
              min="0"
              required
            />
          </p>
          <p>
            <label for="">Descuento %</label>
            <input
              v-model="descuento"
              class="w3-input w3-border"
              type="number"
              placeholder="Descuento %"
              min="0"
              step="0.01"
              required
            />
          </p>

          <p>
            <button class="w3-button w3-blue w3-padding-large" type="submit">
              Guardar
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navegacion from "@/components/Navegacion.vue";
import axios from "axios";
import { url_api } from "@/assets/js/Global.js";

export default {
  name: "Tarifas",
  props: {
    msg: String,
  },
  components: {
    Navegacion,
  },
  data: function () {
    return {
      minuto_autos: "",
      minuto_bicicletas: "",
      minuto_motos: "",
      descuento: "",
      minutos: "",
      tarifas: [],
    };
  },
  methods: {
    listar: function () {
      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .get(url_api + "tarifas.php", config)
        .then((response) => {
          this.minuto_autos = response.data.datos[0].minuto_autos;
          this.minuto_bicicletas = response.data.datos[0].minuto_bicicletas;
          this.minuto_motos = response.data.datos[0].minuto_motos;
          this.descuento = response.data.datos[0].descuento;
          this.minutos = response.data.datos[0].minutos;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    insertar: function () {
      let json = {
        minuto_autos: this.minuto_autos,
        minuto_bicicletas: this.minuto_bicicletas,
        minuto_motos: this.minuto_motos,
        descuento: this.descuento,
        minutos: this.minutos,
      };

      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .put(url_api + "tarifas.php", json, config)
        .then((response) => {
          if (response.data.status === "success") {
            alert(response.data.mensaje);
            this.listar();
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    this.listar();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

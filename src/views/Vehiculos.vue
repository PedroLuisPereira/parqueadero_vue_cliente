<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-container">
      <!-- nuevo cliente -->
      <div class="w3-row">
        <div class="w3-col m4 l3">
          <p></p>
        </div>
        <form v-on:submit.prevent="buscar()">
          <div class="w3-col m7 l8">
            <div>
              <input
                class="w3-input w3-border"
                type="search"
                v-model="valor"
                name=""
                id=""
              />
            </div>
          </div>
          <div class="w3-col m1 l1">
            <div>
              <button type="submit" class="w3-button w3-border w3-blue">
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>

      <hr />

      <!-- listado de clientes -->

      <h2>Vehículos Registrados</h2>
      <div class="w3-responsive">
        <table class="w3-table-all">
          <tr class="w3-dark-grey">
            <th>Placa - Serial</th>
            <th>Tipo</th>
            <th>Cliente</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
          <tr v-for="item in vehiculos" :key="item.id">
            <td>{{ item.placa }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.nombre }} {{ item.apellidos }}</td>
            <td>
              <router-link :to="{ name:'vehiculo', params:{id:item.id}}" class="w3-button w3-highway-yellow">
                Ver
              </router-link>
            </td>
            <td>
              <button
                class="w3-button w3-highway-blue"
                v-on:click="abrirModalEditar(item)"
              >
                Editar
              </button>
            </td>
            <td>
              <button
                class="w3-button w3-highway-red"
                v-on:click="eliminar(item)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </table>
      </div>

      <!-- Modal Editar  -->
      <div id="id01" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright"
              >&times;</span
            >
            <h2>Editar vehículo</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent>
              <label for="placa">Placa</label>
              <p>
                <input
                  v-model="placa"
                  class="w3-input w3-border"
                  type="text"
                  maxlength="50"
                  placeholder="Placa - Serial"
                  required
                  id="placa"
                />
              </p>
              <label for="Tipo de vehiculo">Tipo de vehiculo</label>
              <p>
                <select
                  class="w3-select w3-border"
                  id="Tipo de vehiculo"
                  v-model="tipo"
                >
                  <option value="" disabled selected>Tipo</option>
                  <option value="Automovil">Automóvil</option>
                  <option value="Moto">Moto</option>
                  <option value="Bicicleta">Bicicleta</option>
                </select>
              </p>
              <p>
                <button
                  v-on:click="actualizar()"
                  class="w3-button w3-blue w3-padding-large"
                  type="submit"
                >
                  Guardar
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navegacion from "@/components/Navegacion.vue";
import axios from "axios";
import { url_api } from "@/assets/js/Global.js";

export default {
  name: "Clientes",
  props: {
    msg: String,
  },
  components: {
    Navegacion,
  },
  data: function () {
    return {
      //datos vehiculo
      id: "",
      placa: "",
      tipo: "",
      vehiculos: [],

      //buscador
      valor: "",
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
        .get(url_api + "vehiculos.php", config)
        .then((response) => {
          if (response.data.status === "success") {
            this.vehiculos = response.data.datos;
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    buscar: function () {
      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .get(url_api + "vehiculos.php?buscar=" + this.valor, config)
        .then((response) => {
          if (response.data.status === "success") {
            this.vehiculos = response.data.datos;
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar: function () {
      let json = {
        placa: this.placa.toUpperCase(),
        tipo: this.tipo,
      };

      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .put(url_api + "vehiculos.php?id=" + this.id, json, config)
        .then((response) => {
          if (response.data.status === "success") {
            alert(response.data.mensaje);
            this.cancelar();
            this.listar();
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    eliminar: function (objeto) {
      this.id = objeto.id;

      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .delete(url_api + "vehiculos.php?id=" + this.id, config)
        .then((response) => {
          if (response.data.status === "success") {
            alert(response.data.mensaje);
            this.cancelar();
            this.listar();
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cancelar: function () {
      //limpiar todos los campos
      this.id = "";
      this.placa = "";
      this.tipo = "";
      //cerrar modales
      document.getElementById("id01").style.display = "none";
    },

    abrirModalEditar(objeto) {
      //colocar valores
      this.id = objeto.id;
      this.placa = objeto.placa;
      this.tipo = objeto.tipo;
      //abril modal editar
      document.getElementById("id01").style.display = "block";
    },
  },
  mounted: function () {
    this.listar();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

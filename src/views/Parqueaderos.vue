<template>
  <div>
    <Navegacion></Navegacion>

    <!-- formulario -->
    <div class="formulario">
      <div class="w3-card-4">
        <div class="w3-container w3-dark-grey">
          <h3>Ingresar Vehículo</h3>
        </div>

        <form v-on:submit.prevent="ingresarVehiculo()" class="w3-container">
          <p>
            <label class="w3-text-grey"><b>Placa - Serial del vehículo</b></label>
            <a class="btn_eliminar" href="clientes">Registrar</a>
            <input class="w3-input w3-border" v-on:keyup="getParqueaderos()" required maxlength="50" v-model="placa"  type="text" />
          </p>

          <div v-if="parqueaderos.length == 0">
            <div v-if="placa.length > 0">
              <h5>{{mensaje}}</h5>
            </div>
          </div>
          <div v-else>
            <p>
              <label class="w3-text-grey"><b>Seleccione parqueadero</b></label>
              <select class="w3-select w3-border" required v-model="parqueadero">
                <option v-for="item in parqueaderos" :key="item.id" :value="item.parqueadero"> {{ item.parqueadero }} </option>
              </select>
            </p>
            <p>
              <button class="w3-btn w3-blue">Ingresar vehículo</button>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- parqueadero -->
    <br />
    <div class="w3-card-4 parqueadero">
      <div class="w3-container w3-dark-grey">
        <h3>Parqueaderos</h3>
      </div>

      <div class="autos">
        <div v-for="item in automoviles" :key="item.id">

          <div class="tooltip cubiculo" v-if="item.estado == 'Disponible'">
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }} </span>
          </div>

          <div class="tooltip cubiculoOcupado" v-else>
            <span v-if="item.estado == 'No disponible'">Placa: {{ item.placa }} </span>
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }} </span>
            <div v-if="item.estado == 'No disponible'" class="tooltiptext">
              <p>Parqueadero: {{ item.parqueadero }}</p>
              <p>Nombre: {{ item.cliente.nombre }}</p>
              <p>Apellidos: {{ item.cliente.apellidos }}</p>
              <p>N° Documento: {{ item.cliente.numero_documento }}</p>
              <hr />
              <input type="button" v-on:click="moverAuto(item)" class="w3-button w3-blue" value="Mover" />
              <hr />
              <input type="button" v-on:click="terminarServicio(item)" class="w3-button w3-red"
                value="Terminar servicio" />
            </div>
          </div>
        </div>
        <div class="restaurar"></div>
      </div>

      <div class="bicicletas">
        <div v-for="item in bicicletas" :key="item.id">
          <div class="tooltip cubiculo" v-if="item.estado == 'Disponible'">
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }}
            </span>
          </div>

          <div class="tooltip cubiculoOcupado" v-else>
            <span v-if="item.estado == 'No disponible'">Placa: {{ item.placa }}
            </span>
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }}
            </span>
            <div v-if="item.estado == 'No disponible'" class="tooltiptext">
              <p>Parqueadero: {{ item.parqueadero }}</p>
              <p>Nombre: {{ item.cliente.nombre }}</p>
              <p>Apellidos: {{ item.cliente.apellidos }}</p>
              <p>N° Documento: {{ item.cliente.numero_documento }}</p>
              <hr />
              <input type="button" v-on:click="moverBicicleta(item)" class="w3-button w3-blue" value="Mover" />
              <hr />
              <input type="button" v-on:click="terminarServicio(item)" class="w3-button w3-red"
                value="Terminar servicio" />
            </div>
          </div>
        </div>
        <div class="restaurar"></div>
      </div>

      <div class="motos">
        <div v-for="item in motos" :key="item.id">
          <div class="tooltip cubiculo" v-if="item.estado == 'Disponible'">
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }}
            </span>
          </div>

          <div class="tooltip cubiculoOcupado" v-else>
            <span v-if="item.estado == 'No disponible'">Placa: {{ item.placa }}
            </span>
            <span v-if="item.estado == 'Disponible'">{{ item.parqueadero }}
            </span>
            <div v-if="item.estado == 'No disponible'" class="tooltiptext">
              <p>Parqueadero: {{ item.parqueadero }}</p>
              <p>Nombre: {{ item.cliente.nombre }}</p>
              <p>Apellidos: {{ item.cliente.apellidos }}</p>
              <p>N° Documento: {{ item.cliente.numero_documento }}</p>
              <hr />
              <input type="button" v-on:click="moverMoto(item)" class="w3-button w3-blue" value="Mover" />
              <hr />
              <input type="button" v-on:click="terminarServicio(item)" class="w3-button w3-red"
                value="Terminar servicio" />
            </div>
          </div>
        </div>
        <div class="restaurar"></div>
      </div>
    </div>

    <!-- Modal mover  -->
    <div id="id01" class="w3-modal">
      <div class="w3-modal-content">
        <header class="w3-container w3-light-grey">
          <span v-on:click="cancelar()" class="w3-button w3-display-topright">&times;</span>
          <h2>Nuevo Parqueadero</h2>
        </header>
        <div class="w3-container">
          <form v-on:submit.prevent="mover()">
            <p>
              <label class="w3-text-grey"><b>Parqueadero</b></label>
              <select class="w3-select w3-border" required v-model="parqueadero_nuevo">
                <option v-for="item in parqueaderosMover" :value="item.parqueadero" :key="item.id">
                  {{ item.parqueadero }} </option>
              </select>
            </p>
            <p>
              <button class="w3-btn w3-blue">Mover vehículo</button>
            </p>
          </form>
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
    name: "Dashboard",
    props: {
      msg: String,
    },
    components: {
      Navegacion,
    },
    data: function () {
      return {
        //registrar ingreso
        placa: "",
        parqueadero: "",
        mensaje: '',
        parqueaderos: [],


        //zona de parqueo
        automoviles: [],
        bicicletas: [],
        motos: [],

        //mover vehiculo
        parqueaderosMover: [],
        parqueadero_viejo: "",
        parqueadero_nuevo: "",

        //clases
        ocupado: true,
        desocupado: true,
      };
    },

    methods: {
      //obtener todos los parqueaderos disponibles
      getParqueaderos: function () {
        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        if (this.placa != "") {
          axios
            .get(url_api + "parqueaderos.php?placa=" + this.placa.toUpperCase(), config)
            .then((response) => {
              if (response.data.status === "success") {
                this.mensaje = response.data.mensaje;
                this.parqueaderos = response.data.datos;
              } else {
                console.log(response.data.mensaje);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },

      //ingresar un nuevo vehiculos a parquear
      ingresarVehiculo: function () {
        let json = {
          placa: this.placa.toUpperCase(),
          parqueadero: this.parqueadero,
        };

        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .post(url_api + "servicios.php", json, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.listarParqueaderos();
              this.cancelar();
            } else {
              console.log(response.data.mensaje);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      //obtener parqueaderos para automoviles
      listarParqueaderos: function () {
        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .get(url_api + "parqueaderos.php?listar", config)
          .then((response) => {
            if (response.data.status === "success") {
              this.automoviles = response.data.datos.automoviles;
              this.bicicletas = response.data.datos.bicicletas;
              this.motos = response.data.datos.motos;
            } else {
              console.log(response.data.mensaje);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      //ingresar un nuevo vehiculos a parquear
      terminarServicio: function (objeto) {
        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .delete(url_api + "servicios.php?placa=" + objeto.placa, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.cancelar();
              this.listarParqueaderos();
            } else {
              alert(response.data.mensaje);
            }

          })
          .catch((error) => {
            console.log(error);
          });
      },

      moverAuto(objeto) {
        this.parqueadero_viejo = objeto.parqueadero;
        this.parqueaderosMover = this.automoviles;
        document.getElementById("id01").style.display = "block";
      },

      moverBicicleta(objeto) {
        this.parqueadero_viejo = objeto.parqueadero;
        this.parqueaderosMover = this.bicicletas;
        document.getElementById("id01").style.display = "block";
      },

      moverMoto(objeto) {
        this.parqueadero_viejo = objeto.parqueadero;
        this.parqueaderosMover = this.motos;
        document.getElementById("id01").style.display = "block";
      },

      //ingresar un nuevo vehiculos a parquear
      mover: function () {
        let json = {
          parqueadero_viejo: this.parqueadero_viejo,
          parqueadero_nuevo: this.parqueadero_nuevo,
        };

        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        axios
          .put(url_api + "servicios.php", json, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.cancelar();
              this.listarParqueaderos();
            } else {
              console.log(response.data.mensaje);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      //limpiar todos los campos
      cancelar: function () {
        this.placa = "";
        this.parqueadero = "";
        this.mensaje = "";
        this.parqueaderos = [];
        this.parqueaderosMover = [];
        this.parqueadero_viejo = "";
        this.parqueadero_nuevo = "";
        document.getElementById("id01").style.display = "none";
      },
    },
    created() {
      this.listarParqueaderos();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Raleway", Arial, Helvetica, sans-serif;
  }
</style>
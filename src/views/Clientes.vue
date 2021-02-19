<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-container">
      <!-- nuevo cliente -->
      <div class="w3-row">
        <div class="w3-col m4 l3">
          <div class="btn_nuevo">
            <button onclick="document.getElementById('id01').style.display = 'block'" class="w3-button w3-blue">
              + Nuevo Cliente
            </button>
          </div>
        </div>

        <!-- formulario buscar -->
        <form v-on:submit.prevent="buscar()">
          <div class="w3-col m7 l8">
            <div>
              <input class="w3-input w3-border" type="search" v-model="valor" name="" id="" />
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
      <h2>Clientes Registrados</h2>
      <div class="w3-responsive">
        <table class="w3-table-all">
          <tr class="w3-dark-grey">
            <th>Número documento</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Editar</th>
            <th>Agregar Vehículo</th>
            <th>Vehículos</th>
          </tr>
          <tr v-for="item in clientes" :key="item.id">
            <td>{{ item.numero_documento }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.apellidos }}</td>
            <td>
              <button class="w3-button w3-highway-blue" v-on:click="abrirModalEditar(item)">
                Editar
              </button>
            </td>
            <td>
              <button class="w3-button w3-highway-orange" v-on:click="abrirModalAgregar(item)">
                Agregar
              </button>
            </td>
            <td>
              <button class="w3-button w3-highway-green" v-on:click="abrirModalVehiculos(item)">
                Ver
              </button>
            </td>
          </tr>
        </table>
      </div>

      <!-- Modal Nuevo  -->
      <div id="id01" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright">&times;</span>
            <h2>Nuevo Cliente</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="insertar()">
              <p>
                <input v-model="numero_documento" class="w3-input w3-border" maxlength="50" type="text"
                  placeholder="Número Documento " required />
              </p>
              <p>
                <input v-model="nombre" class="w3-input w3-border" type="text" maxlength="50" placeholder="Nombre"
                  required />
              </p>
              <p>
                <input v-model="apellidos" class="w3-input w3-border" type="text" maxlength="50" placeholder="Apellidos"
                  required />
              </p>
              <h4>Datos del vehículo</h4>
              <p>
                <input v-model="placa" class="w3-input w3-border" type="text" maxlength="50"
                  placeholder="Placa - Serial" required />
              </p>

              <p>
                <select class="w3-select w3-border" v-model="tipo">
                  <option value="" disabled selected>Tipo</option>
                  <option value="Automovil">Automóvil</option>
                  <option value="Moto">Moto</option>
                  <option value="Bicicleta">Bicicleta</option>
                </select>
              </p>

              <hr />

              <p>
                <button class="w3-button w3-blue w3-padding-large" type="submit">
                  Guardar
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal Editar  -->
      <div id="id02" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright">&times;</span>
            <h2>Editar Cliente</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="actualizar()">
              <label for="numero_documento">Número de documento </label>
              <p>
                <input v-model="numero_documento" class="w3-input w3-border" maxlength="50" type="text"
                  placeholder="Número Documento " required id="numero_documento" />
              </p>
              <label for="nombre">Nombre</label>
              <p>
                <input v-model="nombre" class="w3-input w3-border" type="text" maxlength="50" placeholder="Nombre"
                  required id="nombre" />
              </p>
              <label for="apellidos">Apellidos</label>
              <p>
                <input v-model="apellidos" class="w3-input w3-border" type="text" maxlength="50" placeholder="Apellidos"
                  required id="apellidos" />
              </p>
              <p>
                <button class="w3-button w3-blue w3-padding-large" type="submit">
                  Guardar
                </button>
                <button v-on:click="eliminar" class="w3-button w3-red w3-padding-large btn_eliminar" type="button">
                  Eliminar
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <!-- modal ver vehiculos -->
      <div id="id03" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright">&times;</span>
            <h2>Vehículos del Cliente</h2>
          </header>
          <div class="w3-container">
            <div class="w3-responsive">
              <table class="w3-table-all">
                <tr class="w3-dark-grey">
                  <th>Placa</th>
                  <th>Tipo</th>
                </tr>
                <tr v-for="item in vehiculos" :key="item.id">
                  <td>{{ item.placa }}</td>
                  <td>{{ item.tipo }}</td>
                </tr>
              </table>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>

      <!-- Modal agregar vehiculo  -->
      <div id="id04" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright">&times;</span>
            <h3>Datos del vehículo</h3>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="agregarVehiculo()">
              <p>
                <input v-model="placa" class="w3-input w3-border" type="text" maxlength="50"
                  placeholder="Placa - Serial" required />
              </p>

              <p>
                <select class="w3-select w3-border" v-model="tipo">
                  <option value="" disabled selected>Tipo</option>
                  <option value="Automovil">Automóvil</option>
                  <option value="Moto">Moto</option>
                  <option value="Bicicleta">Bicicleta</option>
                </select>
              </p>

              <hr />

              <p>
                <button class="w3-button w3-blue w3-padding-large" type="submit">
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
        //datos del cliente
        id: "",
        numero_documento: "",
        nombre: "",
        apellidos: "",
        clientes: [],
        
        //datos vehiculo
        placa: "",
        tipo: "",
        id_cliente: "",
        vehiculos: [],

        //buscador
        valor:'',
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
          .get(url_api + "clientes.php", config)
          .then((response) => {
            if (response.data.status === "success") {
              this.clientes = response.data.datos;
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
          .get(url_api + "clientes.php?buscar="+this.valor, config)
          .then((response) => {
            if (response.data.status === "success") {
              this.clientes = response.data.datos;
            } else {
              console.log(response.data.mensaje);
            }
          })
          .catch((error) => {
            console.log(error);
          });

      },

      insertar: function () {
        let json = {
          numero_documento: this.numero_documento,
          nombre: this.nombre,
          apellidos: this.apellidos,
          placa: this.placa.toUpperCase(),
          tipo: this.tipo,
        };
        var config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        axios
          .post(url_api + "clientes.php", json, config)
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

      actualizar: function () {
        let json = {
          numero_documento: this.numero_documento,
          nombre: this.nombre,
          apellidos: this.apellidos,
        };
        var config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        axios
          .put(url_api + "clientes.php?id=" + this.id, json, config)
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

      eliminar: function () {
        var config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .delete(url_api + "clientes.php?id=" + this.id, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.cancelar();
              this.listar();
            } else {
              alert(response.data.mensaje);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      abrirModalAgregar(objeto) {
        //colocar valores
        this.id = objeto.id;
        //abril modal editar
        document.getElementById("id04").style.display = "block";
      },

      agregarVehiculo: function () {
        let json = {
          placa: this.placa.toUpperCase(),
          tipo: this.tipo,
        };

        var config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .post(url_api + "vehiculos.php?id_cliente=" + this.id, json, config)
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
        this.numero_documento = "";
        this.nombre = "";
        this.apellidos = "";
        this.placa = "";
        this.tipo = "";
        //cerrar modales
        document.getElementById("id01").style.display = "none";
        document.getElementById("id02").style.display = "none";
        document.getElementById("id03").style.display = "none";
        document.getElementById("id04").style.display = "none";
      },

      abrirModalEditar(objeto) {
        //colocar valores
        this.id = objeto.id;
        this.numero_documento = objeto.numero_documento;
        this.nombre = objeto.nombre;
        this.apellidos = objeto.apellidos;
        //abril modal editar
        document.getElementById("id02").style.display = "block";
      },

      abrirModalVehiculos(objeto) {
        //consultar vehiculos
        this.id_cliente = objeto.id;
        this.listarVehiculos();
        //abril modal editar
        document.getElementById("id03").style.display = "block";
      },

      listarVehiculos: function () {
        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .get(url_api + "vehiculos.php?id_cliente=" + this.id_cliente, config)
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
    },
    created: function () {
      this.listar();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
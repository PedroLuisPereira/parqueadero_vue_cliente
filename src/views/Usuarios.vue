<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-container">

      <!-- nuevo cliente -->
      <div class="w3-row">
        <div class="w3-col m4 l3">
          <div class="btn_nuevo">
            <button
              onclick="document.getElementById('id01').style.display = 'block'"
              class="w3-button w3-blue"
            >
              + Nuevo Usuario
            </button>
          </div>
        </div>
        <form v-on:submit.prevent="buscar()">
          <div class="w3-col m7 l8">
            <div>
              <input class="w3-input w3-border" v-model="valor" type="search" name="" id="" />
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
      <!-- fin nuevo Usuario -->

      <hr />

      <!-- listado de usuarios -->
      <div class="tabla_usuarios">
        <h2>Usuarios Registrados</h2>
        <div class="w3-responsive">
          <table class="w3-table-all">
            <tr class="w3-dark-grey">
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Password</th>
            </tr>
            <tr v-for="item in usuarios" :key="item.id">
              <td>{{ item.nombre }}</td>
              <td>{{ item.correo }}</td>
              <td>{{ item.rol }}</td>
              <td>{{ item.estado }}</td>
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
                  class="w3-button w3-highway-orange"
                  v-on:click="abrirModalPassword(item)"
                >
                  Password
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Modal Nuevo  -->
      <div id="id01" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright"
              >&times;</span
            >
            <h2>Nuevo Usuario</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="insertar()">
              <p>
                <input
                  v-model="nombre"
                  class="w3-input w3-border"
                  maxlength="50"
                  type="text"
                  placeholder="Nombre"
                  required
                  autocomplete="off"
                />
              </p>
              <p>
                <input
                  v-model="correo"
                  class="w3-input w3-border"
                  type="email"
                  maxlength="80"
                  placeholder="Correo"
                  required
                  autocomplete="off"
                />
              </p>
              <p>
                <input
                  v-model="contra"
                  class="w3-input w3-border"
                  type="password"
                  maxlength="255"
                  placeholder="Contra"
                  required
                  autocomplete="off"
                />
              </p>

              <p>
                <select class="w3-select w3-border" v-model="rol">
                  <option value="" disabled selected>Rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </p>

              <p>
                <button
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

      <!-- Modal Editar  -->
      <div id="id02" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright"
              >&times;</span
            >
            <h2>Editar Cliente</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="actualizar()">
              <label for="nombre">Nombre</label>
              <p>
                <input
                  v-model="nombre"
                  class="w3-input w3-border"
                  maxlength="50"
                  type="text"
                  placeholder="Nombre"
                  required
                  id="nombre"
                />
              </p>
              <label for="correo">Email</label>
              <p>
                <input
                  v-model="correo"
                  class="w3-input w3-border"
                  type="email"
                  maxlength="80"
                  placeholder="Correo"
                  required
                  id="correo"
                />
              </p>
              <label for="rol">Rol</label>
              <p>
                <select class="w3-select w3-border" v-model="rol">
                  <option value="" disabled selected>Rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </p>

              <label for="rol">Estado</label>
              <p>
                <select class="w3-select w3-border" v-model="estado">
                  <option value="" disabled selected>Estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </p>

              <p>
                <button
                  class="w3-button w3-blue w3-padding-large"
                  type="submit"
                >
                  Guardar
                </button>
                <button
                  class="w3-button w3-red w3-padding-large btn_eliminar"
                  v-on:click="eliminar()"
                  type="button"
                >
                  Eliminar
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal cambiar possword  -->
      <div id="id03" class="w3-modal">
        <div class="w3-modal-content">
          <header class="w3-container w3-light-grey">
            <span v-on:click="cancelar()" class="w3-button w3-display-topright"
              >&times;</span
            >
            <h2>Nueva password</h2>
          </header>
          <div class="w3-container">
            <form v-on:submit.prevent="actualizarPassword()" autocomplete="off">
              <label for="contra">Nueva password</label>
              <p>
                <input
                  v-model="nueva_contra"
                  class="w3-input w3-border"
                  maxlength="255"
                  type="password"
                  placeholder="Nueva password"
                  required
                  id="contra"
                />
              </p>
              <label for="contra1">Confirmar password</label>
              <p>
                <input
                  v-model="confirmar_contra"
                  class="w3-input w3-border"
                  maxlength="255"
                  type="password"
                  placeholder="Confirmar password"
                  required
                  id="contra1"
                />
              </p>
              <p>
                <button
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
  name: "Usuarios",
  data() {
    return {
      id: "",
      nombre: "",
      correo: "",
      rol: "",
      contra: "",
      estado: "",
      nueva_contra: "",
      confirmar_contra: "",
      usuarios: [],
      //buscar
      valor:''
    };
  },
  components: {
    Navegacion,
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
        .get(url_api + "usuarios.php", config)
        .then((response) => {
          if (response.data.status === "success") {
            this.usuarios = response.data.datos;
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
        .get(url_api + "usuarios.php?buscar=" + this.valor, config)
        .then((response) => {
          if (response.data.status === "success") {
            this.usuarios = response.data.datos;
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
        nombre: this.nombre,
        correo: this.correo,
        contra: this.contra,
        rol: this.rol,
      };

      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .post(url_api + "usuarios.php", json, config)
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
        nombre: this.nombre,
        correo: this.correo,
        rol: this.rol,
        estado: this.estado,
      };

      var config = {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .put(url_api + "usuarios.php?id=" + this.id, json, config)
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
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .delete(url_api + "usuarios.php?id=" + this.id, config)
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
      this.nombre = "";
      this.correo = "";
      this.rol = "";
      this.password = "";
      this.password1 = "";
      this.password2 = "";
      this.estado = "";
      //cerrar modales
      document.getElementById("id01").style.display = "none";
      document.getElementById("id02").style.display = "none";
      document.getElementById("id03").style.display = "none";
    },

    abrirModalEditar(objeto) {
      //colocar valores
      this.id = objeto.id;
      this.nombre = objeto.nombre;
      this.correo = objeto.correo;
      this.rol = objeto.rol;
      this.estado = objeto.estado;
      //abril modal editar
      document.getElementById("id02").style.display = "block";
    },

    abrirModalPassword(objeto) {
      //colocar valores
      this.id = objeto.id;

      //abril modal editar
      document.getElementById("id03").style.display = "block";
    },
    actualizarPassword: function () {
      if (this.nueva_contra == this.confirmar_contra) {
        let json = {
          contra: this.nueva_contra,
        };

        var config = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        axios
          .put(url_api + "usuarios.php?password&id=" + this.id, json, config)
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
      } else {
        alert('Cantaseñas no coinciden');
      }
    },
  },
  filters: {
    filtro(valor) {
      return valor;
    },
  },
  created() {},
  mounted() {
    this.listar();
  },
  updated() {},
  destroyed() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
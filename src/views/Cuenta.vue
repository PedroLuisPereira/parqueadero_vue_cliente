<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-content w3-margin-top" style="max-width: 1400px">
      <!-- The Grid -->
      <div class="w3-row-padding">
        <!-- Left Column -->
        <div class="w3-third">
          <div class="w3-white w3-text-grey w3-card-4">
            <div class="w3-display-container">
              <img src="../assets/logo.png" style="width: 100%" alt="Avatar" />
              <div
                class="w3-display-bottomleft w3-container w3-text-black"
              ></div>
            </div>
          </div>

          <!-- End Left Column -->
        </div>

        <!-- Right Column -->
        <div class="w3-twothird">
          <div class="w3-container w3-card w3-white w3-margin-bottom">
            <div class="w3-container">
              <h2>{{ usuario.nombre }}</h2>
              <p>
                <i
                  class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >{{ usuario.correo }}
              </p>
              <p>
                <i
                  class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"
                ></i
                >{{ usuario.rol }}
              </p>
              <hr />
            </div>
          </div>

          <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-grey w3-padding-16">
              <i
                class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"
              ></i
              >Agregar avatar
            </h3>

            <form action="">
              <p>
                <input class="w3-input w3-border" type="file" name="" id="" />
              </p>
              <p>
                <button type="submit" class="w3-button w3-border w3-blue">
                  Agregar
                </button>
              </p>
            </form>
            <hr />
          </div>

          <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-grey w3-padding-16">
              <i
                class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"
              ></i
              >Actualizar password
            </h3>

            <form v-on:submit.prevent="actualizar_contra()">
              <p>
                <label for="">Nueva password</label>
                <input
                  v-model="nueva_contra"
                  class="w3-input w3-border"
                  type="password"
                  name=""
                  id=""
                />
              </p>
              <p>
                <label for="">Confirmar password</label>
                <input
                  v-model="confirmar_contra"
                  class="w3-input w3-border"
                  type="password"
                  name=""
                  id=""
                />
              </p>

              <p>
                <button type="submit" class="w3-button w3-border w3-blue">
                  Guardar
                </button>
              </p>
            </form>
          </div>
          <!-- End Right Column -->
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
  name: "Cuenta",
  props: {
    msg: String,
  },
  components: {
    Navegacion,
  },
  data: function () {
    return {
      usuario: {},
      nueva_contra:'',
      confirmar_contra:'',
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
        .get(url_api + "cuenta.php", config)
        .then((response) => {
          if (response.data.status === "success") {
            this.usuario = response.data.datos;
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nueva_imagen: function () {
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
          .put(url_api + "cuenta.php", json, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.cancelar();
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

    actualizar_contra: function () {
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
          .put(url_api + "cuenta.php", json, config)
          .then((response) => {
            if (response.data.status === "success") {
              alert(response.data.mensaje);
              this.cancelar();
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


    cancelar: function () {
      //limpiar todos los campos
      this.nueva_contra = "";
      this.confirmar_contra = "";
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
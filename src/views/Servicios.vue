<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-container">
      <!-- nuevo cliente -->
      <div class="w3-row">
        <button type="submit" class="w3-button w3-border w3-green">
          Exportar a excel
        </button>
      </div>

      <hr />
      <!-- listado de clientes -->

      <h2>Servicios</h2>
      <div class="w3-responsive">
        <table class="w3-table-all">
          <tr class="w3-dark-grey">
            <th>Placa</th>
            <th>Parqueadero</th>
            <th>Estado</th>
            <th>Hora entrada</th>
            <th>Hora salida</th>
            <th>Minutos</th>
            <th>Valor minuto</th>
            <th>Total</th>
          </tr>
          <tr v-for="item in servicios" :key="item.id">
            <td>{{ item.placa }}</td>
            <td>{{ item.parqueadero }}</td>
            <td v-if="item.estado == 'Activo'" class="estado_v">
              {{ item.estado }}
            </td>
            <td v-else class="estado_t">{{ item.estado }}</td>
            <td>{{ item.hora_entrada }}</td>
            <td>{{ item.hora_salida }}</td>
            <td>{{ item.minutos }}</td>
            <td>{{ item.valor_minuto }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navegacion from "@/components/Navegacion.vue";
import axios from "axios";
import { url_api } from "@/assets/js/Global.js";

export default {
  name: "Servicios",
  props: {
    msg: String,
  },
  components: {
    Navegacion,
  },
  data: function () {
    return {
      servicios: [],
    };
  },
  methods: {
    listar: function () {
      var config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      axios
        .get(url_api + "servicios.php?pagina=1", config)
        .then((response) => {
          if (response.data.status === "success") {
            this.servicios = response.data.datos;
          } else {
            console.log(response.data.mensaje);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.listar();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.estado_t {
  background-color: red;
  color: seashell;
}
.estado_v {
  background-color: green;
  color: seashell;
}
</style>

<template>
  <div>
    <Navegacion></Navegacion>

    <div class="w3-container">
      <form class="w3-container w3-card-4 w3-light-grey">
        <h2>Detalles del vehículo</h2>
        <p>
          <label>Placa</label>
          <input class="w3-input w3-border" v-model="placa" type="text" />
        </p>

        <p>
          <label>Tipo</label>
          <input class="w3-input w3-border" v-model="tipo" type="text" />
        </p>
      </form>
      <p>
        <button type="button" @click="atras()" class="w3-button w3-border w3-blue"> Atras </button>
      </p>
    </div>
  </div>
</template>

<script>
import Navegacion from "@/components/Navegacion.vue";
import axios from "axios";
import { url_api } from "@/assets/js/Global.js";

export default {
  name: "Vehiculo",
  props: {
    msg: String,
  },
  components: {
    Navegacion,
  },
  data: function () {
    return {
      //datos vehiculo
      id: this.$route.params.id,
      placa: "",
      tipo: "",
      vehiculos:''
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
        .get(url_api + "vehiculos.php?id="+this.id, config)
        .then((response) => {
          if (response.data.status === "success") {
            this.placa = response.data.datos[0].placa;
            this.tipo = response.data.datos[0].tipo;
          } else {
            //this.$router.push('/error');
            this.$router.push({ name: 'error' });
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    atras: function(){
      return this.$router.go(-1);
    }
    
  },
  mounted: function () {
    this.listar();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

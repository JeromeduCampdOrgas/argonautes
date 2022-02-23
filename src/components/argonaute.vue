<template>
  <div
    class="container-fluid d-flex justify-content-between"
    style="margin-top: 50px"
  >
    <div class="equipe" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Ajouter un argonaute</h3>
          </div>
          <div class="p-4">
            <form action="">
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  @click="raz"
                />
              </div>
              <div
                class="d-flex flex-row justify-content-between col-12 mx-auto"
              >
                <button
                  class="btn btn-success col-5"
                  type="button"
                  @click="createArgonaute"
                >
                  <span></span> Valider
                </button>
                <span class="alerte" v-if="this.existe"
                  >Cet Argonaute est déjà dans l'équipage</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="equipe" style="margin-top: 15px">
      <h1 class="text-primary">Equipe</h1>
      <div class="container-fluid" style="margin-top: 50px">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th>Nom</th>
              <th>{{ this.allArgonautes.length }} argonautes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="argonaute in this.allArgonautes" :key="argonaute.id">
              <td>{{ argonaute.name }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="editUser"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteArgonaute"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {{ this.argonautes }}
  </div>
</template>

<script>
import store from "../store/index";
import configAxios from "../config/configAxios/configAxios";
export default {
  data() {
    return {
      argonautes: store.state.allArgonautes,
      allArgonautes: [],
      existe: false,
    };
  },
  methods: {
    raz() {
      this.existe = false;
    },
    createArgonaute() {
      let name = document.getElementById("name").value;
      for (let i = 0; i < this.allArgonautes.length; i++) {
        if (this.allArgonautes[i].name == name) {
          return (this.existe = true);
        } else {
          this.allArgonautes = "";
          configAxios.post("create", { name: name }).then(() => {
            configAxios.get(`argonautes`).then((response) => {
              this.allArgonautes = response.data;
              store.dispatch("getArgonautes", this.allArgonautes);
            });
          });
        }
      }
      this.allArgonautes.push(name);
      store.dispatch("getArgonautes", this.allArgonautes);
    },
    deleteArgonaute(e) {
      let toDelete = e.target.parentNode.parentNode.childNodes[0].innerHTML;
      for (let i = 0; i < this.allArgonautes.length; i++) {
        if (this.allArgonautes[i].name == toDelete) {
          let argonauteId = this.allArgonautes[i].id;
          configAxios.delete(`argonaute/${argonauteId}`);
          configAxios.get(`argonautes`).then((response) => {
            this.allArgonautes = response.data;
            store.dispatch("getArgonautes", this.allArgonautes);
            //location.replace("/");
          });
        }
      }
    },
  },
  beforeMount() {
    configAxios.get(`argonautes`).then((response) => {
      this.allArgonautes = response.data;
      store.dispatch("getArgonautes", this.allArgonautes);
    });
  },
};
</script>

<style scoped>
/*form*/
.alerte {
  color: red;
  font-weight: bold;
}
.equipe {
  width: 45%;
}
</style>

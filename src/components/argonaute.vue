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
                <span class="alerte" v-if="this.trouve"
                  >Cet Argonaute est déjà dans l'équipage</span
                >
                <span class="alerte" v-if="!this.nouveau"
                  >Veuillez entrer le nom d'un argonaute</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="equipe" style="margin-top: 15px">
      <h1 class="text-primary">Equipage</h1>
      <div class="container-fluid" style="margin-top: 50px">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>Nom</th>
              <th>{{ this.allArgonautes.length }} argonautes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="argonaute in this.allArgonautes" :key="argonaute.id">
              <td style="text-align: left">
                {{ argonaute.name }}
              </td>
              <span class="inactive"
                ><input type="text" v-model="this.nomToUpdate"
              /></span>
              <td class="actions">
                <div class="active bouton">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="editArgonaute"
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
                </div>

                <div class="inactive bouton">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="updateArgonaute"
                  >
                    Valider
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      trouve: false,
      nouveau: true,
      nomToUpdate: "",
      oldName: "",
      idArgonaute: store.state.idArgonaute,
    };
  },
  methods: {
    raz(e) {
      this.trouve = false;
      this.nouveau = true;
      let inputValue = e.target;
      inputValue.value = "";
    },
    createArgonaute() {
      let toCreate = document.getElementById("name");
      let nomToCreate;
      nomToCreate = toCreate.value[0].toUpperCase() + toCreate.value.slice(1);
      if (!toCreate.value) {
        return (this.nouveau = !this.nouveau);
      } else if (toCreate.value) {
        for (let i = 0; i < this.allArgonautes.length; i++) {
          if (this.allArgonautes[i].name === nomToCreate) {
            return (this.trouve = !this.trouve);
          }
        }
      }

      if (!this.trouve) {
        this.allArgonautes = "";
        configAxios.post("create", { name: nomToCreate }).then(() => {
          configAxios.get(`argonautes`).then((response) => {
            this.allArgonautes = response.data;
            store.dispatch("getArgonautes", this.allArgonautes);
            this.trouve = false;
            this.nouveau = true;

            toCreate.value = "";
          });
        });
      }

      store.dispatch("getArgonautes", this.allArgonautes);
    },
    deleteArgonaute(e) {
      let toDelete =
        e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML;

      for (let i = 0; i < this.allArgonautes.length; i++) {
        if (this.allArgonautes[i].name == toDelete) {
          let argonauteId = this.allArgonautes[i].id;
          configAxios.delete(`argonaute/${argonauteId}`);
          configAxios.get(`argonautes`).then((response) => {
            this.allArgonautes = response.data;
            store.dispatch("getArgonautes", this.allArgonautes);
            location.replace("/");
          });
        }
      }
    },
    editArgonaute(e) {
      this.nomToUpdate =
        e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
      let toUpdate = e.target.parentNode.parentNode.parentNode.childNodes[1];
      let buttonToHide = e.target.parentNode.parentNode.childNodes[0];
      let buttonToShow = e.target.parentNode.parentNode.childNodes[1];
      toUpdate.classList.remove("inactive");
      toUpdate.classList.add("active");
      buttonToHide.classList.remove("active");
      buttonToHide.classList.add("inactive");
      buttonToShow.classList.remove("inactive");
      buttonToShow.classList.add("active");
    },
    updateArgonaute(e) {
      const oldName =
        e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
      let buttonToHide = e.target.parentNode.parentNode.childNodes[0];
      let buttonToShow = e.target.parentNode.parentNode.childNodes[1];
      let toUpdate = e.target.parentNode.parentNode.parentNode.childNodes[1];
      if (this.nomToUpdate == "") {
        alert("Veuillez entrer un nom d'argonaute");
        this.nomToUpdate = oldName;
        return this.nomToUpdate;
      } else if (this.nomToUpdate != "") {
        for (let i = 0; i < this.allArgonautes.length; i++) {
          if (this.allArgonautes[i].name == oldName) {
            let argonauteId = this.allArgonautes[i].id;
            this.idArgonaute = argonauteId;
            store.dispatch("getIdArgonauteUpdating", argonauteId);
          }
          for (let j = 0; j < this.allArgonautes.length; j++) {
            if (
              this.allArgonautes[j].id != this.idArgonaute &&
              this.allArgonautes[j].name == this.nomToUpdate
            ) {
              this.oldName = oldName;
              this.nomToUpdate = oldName;
              alert("Cet argonaute existe déjà");
              return this.nomToUpdate;
            } else {
              for (let j = 0; j < this.allArgonautes.length; j++) {
                if (
                  this.allArgonautes[j].id != this.idArgonaute &&
                  this.allArgonautes[j].name != this.nomToUpdate
                ) {
                  this.nomToUpdate =
                    this.nomToUpdate[0].toUpperCase() +
                    this.nomToUpdate.slice(1);
                  configAxios
                    .put(`argonaute/${this.idArgonaute}`, {
                      name: this.nomToUpdate,
                    })
                    .then(() => {
                      configAxios.get(`argonautes`).then((response) => {
                        this.allArgonautes = response.data;
                        store.dispatch("getArgonautes", this.allArgonautes);
                        toUpdate.classList.remove("inactive");
                        toUpdate.classList.add("inactive");
                        buttonToHide.classList.remove("inactive");
                        buttonToHide.classList.add("active");

                        buttonToShow.classList.remove("active");
                        buttonToShow.classList.add("inactive");
                      });
                    });
                }
              }
            }
          }
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
.active {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.inactive {
  display: none;
}
.bouton {
  margin-right: 25px;
}
td {
  width: 50%;
}
.actions {
  width: 50%;
  margin-left: 100px;
}

@media only screen and (max-width: 883px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
  }
  .equipe {
    width: 100%;
    margin-top: 0;
  }
}
</style>

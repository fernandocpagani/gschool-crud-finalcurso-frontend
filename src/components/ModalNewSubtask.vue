<template>
  <div>

  

    <div class="backdrop-modal" v-if="showModalNewSubtask">
    
      <form id="form">
        {{ taskid }}
<div>
    <input type="name" id="task-name" name="task-name" placeholder="Nome da subtarefa"
        maxlength="30" v-model="subtasktitle">
</div>

<div>
    <input type="name" id="task-description" name="task-description" maxlength="50"
        placeholder="Descrição" v-model="subtaskdescription">
</div>

<div class="buttons">
    <button class="white-button" @click="close()">Cancelar</button>
    <div class="button" @click="createNewSubTask(taskid)">
        <input type="button" class="black-button" value="Criar subtarefa">
    </div>
</div>



</form>
   
  </div>
   
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "ModalNewSubtask",

  data() {
    return {
      modalShowNewSubtask: false,
      modalShow: false,
      title: null,
      description: null,
      date: null,
      users_id: null,
    }
  },

  props: {
    taskid: Number,
    showModalNewSubtask:{
            type: Boolean,
            required:true,
        }
  },

  computed: {
    isLogged() {
      if (localStorage.getItem("user-info")) {
        return true
      } else {
        return this.$router.push({ name: "login" })
      }
    }
  },

  methods: {

    close(){
            this.$emit('closeModal')
            this.$emit('update:showModalNewSubtask', false)            
        },

    async createNewSubTask(id) {
            const data = {
              subtasktitle: this.subtasktitle,
              subtaskdescription: this.subtaskdescription,
                task_id: id,
            }

            axios.post('http://localhost:8000/api/subtask/register', data)
                .then(function (response) {
                    console.log(response);
                    window.location = window.location;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
  }
}

</script>

<style scoped>
body {
  min-height: 100vh;
  display: grid;
  place-content: center;
}

a {
  text-decoration: none;
}

.backdrop-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #0002;
    display: flex;
    align-items: center;
    justify-content: center;
}

#form {
  width: 678px;
  height: 216px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#task-name {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 21px;
  margin-left: 25px;
  border: none;
}

#task-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-top: 15px;
  margin-left: 25px;
  margin-bottom: 20px;
  border: none;
}

.subtask-text {
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    color: red;
    width: 450px;
    margin-left: 20px;
    padding: 0;
    height: 18px;
    width: 450px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 55px;
}

.white-button {
  width: 122px;
  height: 40px;
  border: none;
  background-color: #f7f7f7;
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.07px;
  cursor: pointer;
  text-align: center;
  padding: 12px 0;
  margin-left: 380px;
}

.black-button {
  width: 122px;
  height: 40px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.07px;
  cursor: pointer;
  margin-left: 15px;
}

.buttons {
  border-top: solid 1px #e5e5e5;
  padding: 14px 25px;
}

.btn,
.btn-secondary {
  background-color: transparent;
  border: none;
  color: #81858e;
  font-size: 15px;
}

.btn  img{
  margin-right: 10px;
}

@media(max-width: 490px) {

  form {
    max-width: 470px;
  }

  .white-button {
    margin-left: 150px;
  }

}
</style>
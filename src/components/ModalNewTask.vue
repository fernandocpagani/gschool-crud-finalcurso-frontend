<template>

  <div class="backdrop-modal" v-if="showModalNewTask">

    <div class="modal">

      <form id="form">

        <div>
          <input type="name" id="task-name" name="task-name" placeholder="Nome da tarefa" maxlength="30" v-model="tasktitle">
        </div>

        <div>
          <input type="name" id="task-description" name="task-description" maxlength="50" placeholder="Descrição" v-model="taskdescription">
        </div>

        <div class="button-date">
          <img src="../../public/calendario.svg" alt="">
          <input placeholder="Data de vencimento" class="date" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" v-model="taskdate">
        </div>

        <div class="buttons">
          <button class="white-button" @click="close()">Cancelar</button>
          <div class="button" @click="createTask()">
            <input type="button" class="black-button" value="Criar tarefa">
          </div>
        </div>

      </form>

    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      modalShowNewTask: false,
      title: null,
      description: null,
      date: null,
      users_id: null,
    }
  },

  props: {
    showModalNewTask: {
      type: Boolean,
      required: true,
    }
  },

  methods: {

    close() {
      this.$emit('update:showModalNewTask', false)
    },

    async createTask() {

      const user = JSON.parse(localStorage.getItem("user-info"))
      const data = {
        tasktitle: this.tasktitle,
        taskdescription: this.taskdescription,
        taskfinishdate: this.taskdate,
        users_id: user.user.id,
      }

      axios.post('http://localhost:8000/api/task/register', data)
        .catch(function (error) {
          console.error(error);

        })
        .then((resp) => {
          window.location.reload();
        })
    },
  },
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

.btn {
  border: none;
  color: #81858e;
  font-size: 15px;
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

.button-date {
  margin-left: 25px;
  width: 199px;
  height: 40px;
  box-sizing: border-box;
  border: solid 1px #e5e5e5;
  background-color: #fff;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
}

.button-date img {
  height: 14px;
  width: 14px;
  margin: 13px 14px 10px 13px;
}

.date {
  border: none;
  font-size: 14px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
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
  color: #fff
}

.btn:hover,
.btn-secondary:hover {
  background-color: transparent;
  color: #fff;
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

.modal {
  width: 400px;
  position: relative;
  color: black;
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
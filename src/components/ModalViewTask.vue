<template>

  <div class="backdrop-modal" v-if="showModalViewTask">

    
    <ModalUpdateSubtask @getTasksEmit="getTasks" v-model:showModalUpdateSubtask="showModalUpdateSubtask"
    :subtask="subtaskId"></ModalUpdateSubtask>
    
    <div id="main-container" v-if="showMaincontainer">


      <nav class="view-task-nav">

        <div v-if="task.taskfinishdate >= moment().format('YYYY-MM-DD')">
          <div class="date-view-green">
            <img src="/dataverde.svg" alt="dataverde"><Label>No prazo</Label>
          </div>
        </div>

        <div v-else>
          <div class="date-view-red">
            <img src="/datavermelho.svg" alt="datavermelha">
            <Label>Vencido</Label>
          </div>
        </div>

        <div class="buttons-nav-right">
          <form>

            <div>
              <ul class="main-dropdown">
                <li class="dropdown-hover">
                  <ul class="dropdown">
                    <li class="black-li" @click="copyTask(task.id)"><img src="/copiarlink.svg" alt="copiar link"> Copiar
                      link da tarefa </li>
                    <li class="black-li" @click="duplicateTask(task.id)"><img src="/duplicar.svg" alt="duplicar tarefa">
                      Duplicar tarefa </li>
                    <li class="black-li" @click="printTask(task.id)"> <img src="/imprimir.svg" alt="imprimir"> Imprimir
                      tarefa </li>
                    <li class="red-li" @click="deleteTask(task.id)"><img src="/lixeiravermelha.svg" alt="excluir">
                      Excluir tarefa </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="buttons-nav-view">
              <button class="x"> <img src="/3pontos.svg" alt="3pontos"></button>
              <button class="x" @click="close()"><img src="/x.svg" alt="x"></button>
            </div>

          </form>

        </div>

      </nav>

      <div class="sub-container">

        <div class="left-content">

          <div class="task-view">

            <div>
              <button class="checkbutton" @click="checkTask(task.id)">
                <div v-if="task.taskstatus == 'pending'"> <img src="/public/checkvazio.svg" alt="check"> </div>
                <div v-else> <img src="/checkcheio.svg" alt="check"> </div>
              </button>
            </div>

            <div class="task-field-view">
              <h2 class="title-view">{{ task.tasktitle }}</h2>
              <p class="description">{{ task.taskdescription }}</p>
            </div>

          </div>

          <h3 class="h3-sub-task">Subtarefas</h3>


          <div v-for="(subtask, key) in task.subtasks" :key="key">


            <div class="sub-task" v-if="subtask.task_id == task.id">

              <div>
                <button class="checkbutton" @click="checkSubtask(subtask.id)">
                  <div v-if="subtask.subtaskstatus == 'pending'">
                    <img src="/checkvazio.svg" alt="check">
                  </div>
                  <div v-else>
                    <img src="/checkcheio.svg" alt="check">
                  </div>
                </button>
              </div>

              <div class="sub-task-item">

                <div class="subtask-text">
                  <label class="title-sub-task">{{ subtask.subtasktitle }} </label>
                  <p class="description">{{ subtask.subtaskdescription }}</p>
                </div>

                <div class="menu-tasks">

                  <button  @click="subtaskId = subtask.id, closeAndOpenModal()  " class="button-icon-date"><img
                      src="/lapis.svg" alt="lapis"></button>

                  <button @click="deleteSubTask(subtask.id)"><img class="item-menu-task2" src="/lixeiracinza.svg"
                      alt="excluir"></button>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div class="right-content">

          <h4 class="title-right">Criado em</h4>
          <h5 class="info-black"><img src="/datapreto.svg" alt="calendario-preto">{{
            moment(task.created_at).format('DD/MM/YYYY') }} às {{ moment(created_at).format('HH:mm') }} </h5>

          <h4 class="title-right">Data de vencimento</h4>
          <div v-if="task.taskfinishdate >= moment().format('YYYY-MM-DD')">
            <h5 class="info-green"><img src="/dataverde.svg" alt="calendario-verde">{{
              moment(task.taskfinishdate).format('DD/MM/YYYY') }} </h5>
          </div>

          <div v-else>
            <h5 class="info-red"><img src="/datavermelho.svg" alt="calendario-vermelho">{{
              moment(task.taskfinishdate).format('DD/MM/YYYY') }} </h5>
          </div>

          <h4 class="title-right">Modificado em</h4>
          <h5 class="info-black"><img src="/datapreto.svg" alt="calendario-preto">{{
            moment(task.updated_at).format('DD/MM/YYYY') }} às {{ moment(task.updated_at).format('HH:mm') }} </h5>

          <h4 class="title-right">ID da tarefa</h4>
          <h5 class="info-black">{{ task.id }}</h5>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import ModalUpdateSubtask from './../components/ModalUpdateSubtask.vue'

export default {

  components: {
    ModalUpdateSubtask,
  },

  data() {
    return {
      selectedTask: {},
      selectedSubtask: {},
      tasks: [],
      subtask: {},
      subtasks: [],
      stitle: '',
      id: '',
      tasktitle: '',
      taskdescription: '',
      date: '',
      taskstatus: '',
      subtaskstatus: '',
      showModalUpdateSubtask: false,
      showMaincontainer: true,
    }
  },

  props: {
    task: Object,
    showModalViewTask: {
      type: Boolean,
      required: true,
    },
  },

  mounted() {
    this.date = this.task.date;
    this.taskid = this.task.id;
    this.moment = moment;
  },





  methods: {

    close() {
      this.$emit('update:showModalViewTask', false)
      this.$emit('getTasksEmit')  
    },

    closeAndOpenModal(){
      this.showModalUpdateSubtask = true
      this.showMaincontainer= false      
    },   
     
    async duplicateTask(id){
      const user = JSON.parse(localStorage.getItem("user-info"))
       const data = {
        tasktitle: this.task.tasktitle,
        taskdescription: this.task.taskdescription,
        taskfinishdate: this.task.taskfinishdate,    
        users_id: user.user.id,
      }

      axios.post(`http://127.0.0.1:8000/api/task/${id}/copytask`, data)
      .catch(function (error) {
                    console.error(error);
                    
                })
                .then((resp) => {
                  this.close()
      })
    },


    async checkTask(id) {
      const result = await axios.get(`http://localhost:8000/api/task/${id}`)
      if (result.data.taskstatus == "pending") {
        result = await axios.put(`http://localhost:8000/api/task/${id}/updatetaskstatus`,
          {
            taskstatus: "completed"
          }).then((resp) => {
          this.$emit('getTasksEmit')
          this.close()
      })
      } else {
        result = await axios.put(`http://localhost:8000/api/task/${id}/updatetaskstatus`,
          {
            taskstatus: "pending"
          }).then((resp) => {
          this.$emit('getTasksEmit')
          this.close()
      })
      }
      
    },

    async checkSubtask(id) {
      const result = await axios.get(`http://localhost:8000/api/subtask/${id}`)
      console.log(result.data.subtaskstatus)
      if (result.data.subtaskstatus == "pending") {
        result = await axios.put(`http://localhost:8000/api/subtask/${id}/updatesubtaskstatus`,
          {
            subtaskstatus: "completed"

          })    .then((resp) => {
          this.$emit('getTasksEmit')
          this.close()
      })
      } else {
        result = await axios.put(`http://localhost:8000/api/subtask/${id}/updatesubtaskstatus`,
          {
            subtaskstatus: "pending"
          })
          .then((resp) => {
          this.$emit('getTasksEmit')
          this.close()
      })
      }

    },

    async printTask(id) {
      setTimeout(() => {
        window.print()
      }, 1000);
    },

    async copyTask(id) {
      await navigator.clipboard.writeText(`http://localhost:8080/viewtask/${id}`);
    },

    async deleteTask(taskid) {
      axios.delete(`http://localhost:8000/api/task/${taskid}/delete`)
        .then(() => {
          this.$emit('getTasksEmit')
          this.close()
        })
    },

    async deleteSubTask(id) {
      axios.delete(`http://localhost:8000/api/subtask/${id}/delete`)
        .then(() => {
          this.$emit('getTasksEmit')
          this.close()
        })
    },
  },

}

</script>


<style scoped>
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

#main-container {
  width: 819px;
  height: 613px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: solid 1px #d9d9d9;
  align-items: center;
}

.date-view-green {
  padding: 4px 8px;
  width: 110px;
  background-color: #e5f4f3;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
  color: #009488
}

.date-view-green img {
  width: 13px;
  height: 14.44px;
  margin-right: 10px;
}

.date-view-red {
  padding: 4px 8px;
  width: 110px;
  background-color: #d314081a;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  text-align: left;
  color: #d31408;
}

.date-view-red img {
  width: 13px;
  height: 14.44px;
  margin-right: 10px;
}

.buttons-nav-right {
  align-items: center;
}

.main-dropdown {
  list-style: none;
}

.dropdown-hover {
  position: absolute;
  display: none;
  margin-top: 25px;
  right: 0px;
}

.dropdown {
  list-style: none;
  padding: 30px;
  width: 246px;
  height: 232px;
  position: relative;
  background-color: #fff;
}

form:hover .dropdown-hover {
  display: block;
}

.black-li {
  justify-items: center;
  text-decoration: none;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  cursor: pointer;
}

.black-li img {
  margin-right: 20px;
  width: 17px;
  height: 17px;
}

.red-li {
  text-decoration: none;
  color: #d31408;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  cursor: pointer;
}

.red-li img {
  margin-right: 20px;
  width: 17px;
  height: 17px;
}

.x {
  margin-left: 35px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.sub-container {
  display: flex;
  flex-direction: row;
}

.task-view {
  width: 513px;
  box-sizing: border-box;
  padding: 30px 30px 0px 30px;
  display: flex;
  flex-direction: row;
  transition: .5;
}

.left-content {
  width: 573px;
}

.checkbutton {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.task-field {
  width: 447px;
}

.modal__title {
  font-size: 18px;
  font-weight: 400;
  margin-left: 20px;
  line-height: normal;
  color: #000;
  max-width: 470px;
}

.title-view {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 20px;
}

.description {
  margin-left: 20px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #81858e;
  max-width: 470px;
}

.h3-sub-task {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  border-bottom: solid 1px #e5e5e5;
  color: #000;
  margin-left: 70px;
  margin-top: 38px;
  width: 470px;
  padding-bottom: 15px;
}

.sub-task-content {
  box-sizing: border-box;
  border-top: none;
  margin: 10px 0px;
}

.sub-task {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 0;
  margin-left: 70px;
  width: 480px;
}

.sub-task-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.subtask-text{
  width: 370px;
}

.title-sub-task {
  width: 356px;
  margin-left: 20px;
}

.menu-tasks {
  align-items: center;
  display: none;
  margin: auto 0;
}

.item-menu-task2 {
  padding: 0 11px 0 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.menu-tasks button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.sub-task-item:hover .menu-tasks {
  display: flex;
  flex-direction: row;
}

.right-content {
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 30px;
  width: 246px;
  min-height: 531px;
}

.title-right {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  margin-bottom: 10px;
  color: #81858e;
}

.info-black {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  margin-bottom: 40px;
  color: #000;
}

.info-green {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  margin-bottom: 40px;
  color: #009488;
}

.info-red {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  margin-bottom: 40px;
  color: #d31408;
}

.info-black img,
.info-green img,
.info-red img {
  margin-right: 10px;
}

@media(max-width: 490px) {

  #main-container {
    top: 0;
    transform: translate(-50%, 0);
    width: 489px;
  }

  .title-sub-task {
    width: 305px;
  }

  .right-content {
    width: 489px;
    height: 360px;
  }

  .left-content {
    width: 489px;
  }

  .sub-task,
  .h3-sub-task {
    width: 419px;
  }

  .task {
    width: 429px;
  }

  .right-content h4,
  .right-content h5 {
    text-align: center;
  }

  .sub-container {
    flex-direction: column;
  }

}
</style>
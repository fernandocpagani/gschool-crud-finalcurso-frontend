<template>
    <div class="backdrop-modal" v-if="showModalUpdateTask">

      
      <div id="main-content">
   
    <form>
        <div>
          <input type="name" id="task-name" name="task-name" placeholder="Nome da tarefa" maxlength="35" v-model="title">
        </div>

        <div>
          <input type="name" id="task-description" name="task-description" maxlength="50" placeholder="Descrição"
          v-model="description">
        </div>

        <div class="buttons">
          <button class="white-button" @click="close()">Cancelar</button>
          <div class="button" @click="updateTask(task.id)">
            <input type="button" class="black-button" value="Atualizar tarefa">
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
      modalShowUpdateTask: false,
      title: '',
      description: '',
      taskid: '',   
    }
  },

  props: {
    task: Object,
    showModalUpdateTask:{
            type: Boolean,
            required:true,
        },
  },

  methods: {
    
    close(){       
        this.$emit('update:showModalUpdateTask', false)            
    },

    async updateTask(id) {
            const result = await axios.put(`http://localhost:8000/api/task/${id}/update`,
                {
                    tasktitle: this.title,
                    taskdescription: this.description,
                })
                .then((resp) => {
                  this.subtasktitle = "";
                  this.subtaskdescription = "";
          this.$emit('getTasksEmit')
          this.close()
      })
        },

  },

  watch: {
    showModalUpdateDate(newValue, oldValue) {
      if(newValue){
        this.taskdescription = this.task.taskdescription;
        this.taskdescription = this.task.taskdescription;
      }
    }
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

#main-content {
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

@media(max-width: 490px) {

  form {
    max-width: 470px;
  }

  .white-button {
    margin-left: 150px;
  }

}
</style>
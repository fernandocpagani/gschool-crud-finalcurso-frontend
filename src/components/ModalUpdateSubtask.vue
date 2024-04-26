<template>
  <div>
 
    <div class="backdrop-modal" v-if="showModalUpdateSubtask">

      <form id="form">

        <div>
          <input type="name" id="task-name" name="task-name" placeholder="Nome da tarefa" maxlength="35"
            >
        </div>

        <div>
          <input type="name" id="task-description" name="task-description" maxlength="50" placeholder="Descrição"
            >
        </div>

        <div class="buttons">
          <button class="white-button" @click="close()">Cancelar</button>
          <div class="button" @click="updateSubTask(subtaskid)"> <input type="button" class="black-button-new-subtask"
              value="Atualizar subtarefa"> </div>
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
      modalShowUpdateSubtask: false,
      modalShow: false,
      stitle: null,
      sdescription: null,
      task_id: null,
    }
  },

  props: {
    subtasktitle: String,
    subtaskdescription: String,
    subtaskid: Number,
    showModalUpdateSubtask:{
            type: Boolean,
            required:true,
        }
  },

  methods: {
        
    close(){
            this.$emit('closeModal')
            this.$emit('update:showModalUpdateSubtask', false)            
        },

    async updateSubTask(id) {
      const result = await axios.put(`http://localhost:8000/api/subtask/${id}/update`,
        {
          subtasktitle: this.subtasktitle,
          subtaskdescription: this.subtaskdescription,
        });
      if (result.status == 200) {
        window.location = window.location;
      }
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

.btn {
  border: none;
  color: #81858e;
  font-size: 15px;
  background-color: transparent;
  padding-right: 30px;
}

.btn:hover{
  background-color: transparent;
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

.black-button-new-subtask {
    width: 150px;
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
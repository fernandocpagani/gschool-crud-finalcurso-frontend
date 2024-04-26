<template>
  <div>

    <div class="backdrop-modal" v-if="showModalUpdateDate">

      <form id="form-date">

        <div class="button-date">
          <img src="../../public/calendario.svg" alt="">
          <input placeholder="Data de vencimento" class="date" type="text" onfocus="(this.type='date')"
            onblur="(this.type='text')" id="date" v-model="date">
        </div>

        <div class="buttons-date">
          <button class="white-button" @click="close()">Cancelar</button>
          <div class="button" @click="updateDate(task.id)">
            <input type="button" class="black-button" value="Atualizar data">
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
      modalShowUpdateDate: false,
      date: '',
      taskid: '',
    }
  },

  props: {
    task: Object,
    showModalUpdateDate: {
      type: Boolean,
      required: true,
    }
  },

  methods: {

    close() {
      this.$emit('update:showModalUpdateDate', false)
    },

    async updateDate(id) {
      axios.put(`http://localhost:8000/api/task/${id}/updatedate`, {
        taskfinishdate: this.date,
      })
      .then((resp) => {
          this.$emit('getTasksEmit')
          this.close()
      })
    },

  },
  
  watch: {
    showModalUpdateDate(newValue, oldValue) {
      if(newValue){
        this.date = this.task.taskfinishdate;
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

#form-date {
  width: 678px;
  height: 216px;
  padding-top: 93px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-date {
  margin-left: 25px;
  width: 220px;
  height: 40px;
  box-sizing: border-box;
  border: solid 1px #e5e5e5;
  background-color: #fff;
  margin-bottom: 15px;
  font-size: 14px;
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

.buttons-date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  border-top: solid 1px #e5e5e5;
  padding: 14px 25px;
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

@media(max-width: 490px) {

  form {
    max-width: 470px;
  }

  .white-button {
    margin-left: 150px;
  }

}
</style>
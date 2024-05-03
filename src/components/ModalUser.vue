<template>
  <div>
    <div class="backdrop-modal" v-if="showModalUser">

      <div class="modal">

        <div id="main-content">

          <div class="user-info">

            <h5 class="title">Informações do usuário</h5>

            <h4 class="title-info">Nome completo</h4>
            <h5 class="info-black">{{ fullname }}</h5>

            <h4 class="title-info">E-mail</h4>
            <h5 class="info-black">{{ email }}</h5>

            <h4 class="title-info">Conta criada em</h4>
            <h5 class="info-black"><img src="/calendario.svg" alt="calendario-preto"> {{moment(created).format('DD/MM/YYYY') }}</h5>

            <h4 class="title-info">ID da conta</h4>
            <h5 class="info-black">{{ id }}</h5>

          </div>

          <div class="buttons">
            <button class="black-button" @click="close()">OK</button>
          </div>

        </div>


      </div>

    </div>

  </div>
</template>

<script>

import moment from 'moment'

export default {
  
  data() {
    return {
      modalShowUser: false,
      name: '',
      fullname: '',
      email: '',
      created: '',
      moment: '',
    }
  },

  props: {
    showModalUser: {
      type: Boolean,
      required: true,
    }
  },

  mounted() {
    let user = localStorage.getItem('user-info');
    this.name = JSON.parse(user).user.name[0].toUpperCase();
    this.fullname = JSON.parse(user).user.name;
    this.email = JSON.parse(user).user.email;
    this.created = JSON.parse(user).user.created_at;
    this.id = JSON.parse(user).user.id;
    this.moment = moment;
  },

  methods: {

    close() {
      this.$emit('closeModal')
      this.$emit('update:showModalUser', false)
    },

  }

}

</script>

<style scoped>
.btn,
.btn-black {
  padding: 0;
}

#main-content {
  width: 400px;
  height: 452px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.user-info {
  padding: 30px 30px 0 30px;
}

.title {
  font-size: 24px;
  margin-bottom: 30px;
}

.title-info {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  margin-bottom: 5px;
  color: #81858e;
}

.info-black {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  margin-bottom: 25px;
  color: #000;
}

img {
  padding-right: 10px;
}

.buttons {
  border-top: solid 1px #e5e5e5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
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
  margin: 30px;
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
  
  #main-content{
    top: 40px;
  }
  
}
</style>
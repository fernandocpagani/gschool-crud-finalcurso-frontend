<template>
  <div>
    <div class="backdrop-modal" v-if="showModalInfo">

      <div class="modal">

        <div id="main-content">

          <div class="user-info">

            <h5 class="title">Projeto - Crud de Tarefas</h5>

            <h4 class="title-info">Protótipo criado por</h4>
            <h5 class="info-black">Green</h5>

            <h4 class="title-info">Desenvolvido por</h4>
            <h5 class="info-black">Fernando Códolo Pagani</h5>

            <h4 class="title-info">Linguagens utilizadas</h4>
            <h5 class="info-black2">Frontend: Vue JS</h5>
            <h5 class="info-black">Backend: Laravel PHP</h5>

            <div class="social">
              <a href="https://www.linkedin.com/in/fernandocpagani/" target="_blank"><img src="/linkedin.svg" alt="icone linkedin"></a>
              <a href="https://www.instagram.com/fernandocpagani/" target="_blank"><img src="/instagram.svg" alt="icone instagram"></a>
              <a href="https://www.facebook.com/fernando.codolopagani/" target="_blank"><img src="/facebook.svg" alt="icone facebook"></a>
              <a href="https://github.com/fernandocpagani" target="_blank"><img src="/github.svg" alt="icone gihub"></a>
            </div>

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

export default {

  data() {
    return {
      modalShowInfo: false,

    }
  },

  props: {
    showModalInfo: {
      type: Boolean,
      required: true,
    }
  },

  methods: {

    close() {
      this.$emit('closeModal')
      this.$emit('update:showModalInfo', false)
    },
  }
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

.nav-button2 {
  padding: 0 22.5px 0 35px;
}

#main-content {
  width: 400px;
  height: 495px;
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

.info-black2 {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: left;
  margin-bottom: 5px;
  color: #000;
}

img {
  padding-right: 10px;
}

.social {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 0 20px;
}

.social img {
  width: 40px;
  height: 40px;
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

a {
  background-color: transparent;
}

@media(max-width: 490px) {
  
  #main-content{
    top: 370px;
  }
}

</style>
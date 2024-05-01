<template>
    <nav>

        <div class="nav-content">

            <div class="hand"><img src="/maonavbar.png" alt="mao"></div>

            <div class="menu">
                <img class="nav-add" src="/adicionar.svg" alt="adicionar">
                <ModalNewTask v-model:showModalNewTask="showModalNewTask"></ModalNewTask>
                <button @click="showModalNewTask = true" class="hidden">Criar tarefa</button>

                <ModalUser v-model:showModalUser="showModalUser"></ModalUser>
                <button @click="showModalUser = true" class="button-modal-user first-letter"> {{ name }} </button>

                <ModalInfo v-model:showModalInfo="showModalInfo"></ModalInfo>
                <button @click="showModalInfo = true" class="button-modal-user"> <img class="nav-add" src="/interrogacao.svg" alt="adicionar"></button>

                <img class="nav-button" src="/sino.svg" alt="sino">
                <a v-on:click="logout" href="/" class="out-button">Sair</a>
            </div>

        </div>

    </nav>
</template>

<script>

import ModalNewTask from './../components/ModalNewTask.vue'
import ModalUser from './../components/ModalUser.vue'
import ModalInfo from './../components/ModalInfo.vue'

export default {

    components: {
        ModalNewTask,
        ModalUser,
        ModalInfo
    },
    data() {
        return {
            name: null,
            showModalNewTask: false,
            showModalUser: false,
            showModalInfo: false,
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).user.name[0].toUpperCase();
    },

    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: "login" })
        },

        modalIsClosed() {
            console.log('O modal está fechado!');
        }
    },
}

</script>

<style scoped>

nav {
    background-color: #000;
    width: 100%;
    position: fixed;
    padding: 0 5px;
}

.nav-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    margin: 0 auto;
    max-width: 1280px;
}

.hand {
    font-size: 28px;
    margin-left: 26px;
}

.menu {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.menu:hover .hidden {
    display: block;
    padding: 0;
}

.hidden {
    align-items: center;
    background-color: transparent;
    border: none;
    display: none;
    cursor: pointer;
    color: #fff;
    margin-left: 10px;
}

.nav-add {
    font-size: 14px;
    padding: 0;
}

.nav-button {
    padding: 0 22.5px;
}

.out-button {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    margin: 0 22.5px;
    color: #fff;
    text-decoration: none;
}

.button-modal-user {
    border: none;
    background-color: #000;
    cursor: pointer;
}

.first-letter {
    margin: 0 22.5px;
    height: 30px;
    width: 30px;
    background-color: #009488;
    text-align: center;
    color: #fff;
    font-weight: bold;
    border-radius: 100%;
    font-size: 20px;
    border: none;
    padding: 0;
    cursor: pointer;
}

@media(max-width: 490px) {

    nav {
        max-width: 489px;
        position: fixed;
    }

}
</style>
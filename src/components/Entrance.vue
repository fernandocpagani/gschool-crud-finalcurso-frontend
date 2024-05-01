<template>
    <div>

        <ModalViewTask @getTasksEmit="getTasks" v-model:showModalViewTask="showModalViewTask" :task="selectedTask">
        </ModalViewTask>
        <ModalUpdateTask @getTasksEmit="getTasks" v-model:showModalUpdateTask="showModalUpdateTask"
            :task="selectedTask"></ModalUpdateTask>
        <ModalUpdateDate @getTasksEmit="getTasks" v-model:showModalUpdateDate="showModalUpdateDate"
            :task="selectedTask"></ModalUpdateDate>
        <ModalUpdateSubtask @getTasksEmit="getTasks" v-model:showModalUpdateSubtask="showModalUpdateSubtask"
            :subtask="subtaskId" v-model:showModalViewTask="showModalViewTask"></ModalUpdateSubtask>
        <ModalNewSubtask @getTasksEmit="getTasks" v-model:showModalNewSubtask="showModalNewSubtask"
            :task="selectedTask"></ModalNewSubtask>
        <ModalNewTask @getTasksEmit="getTasks" v-model:showModalNewTask="showModalNewTask" :task="selectedTask">
        </ModalNewTask>

        <div class="full-content">

            <div class="main-content-left">

                <div class="menu-left">
                    <button class="first-menu-button" @click="getTasks()"><img src="../../public/entrada.svg" alt="">Entrada</button>
                    <button class="menu-button" @click="getTasksToday()"><img src="../../public/tarefasdehoje.svg" alt="">Tarefas de hoje</button>
                    <button class="menu-button" @click="getTasksLate()"><img src="../../public/vencidos.svg" alt="">Vencidos</button>
                </div>

                <footer class="footer-item">
                    <h6>Fernando Códolo Pagani </h6>
                    <h6>&copy 2024</h6>
                    <div class="icons">
                        <a href="https://www.linkedin.com/in/fernandocpagani/" target="_blank"><img src="../../public/linkedin.svg" alt="icone linkedin"></a>
                        <a href="https://www.instagram.com/fernandocpagani/" target="_blank"><img src="../../public/instagram.svg" alt="icone instagram"></a>
                        <a href="https://www.facebook.com/fernando.codolopagani/" target="_blank"><img src="../../public/facebook.svg" alt="icone facebook"></a>
                        <a href="https://github.com/fernandocpagani" target="_blank"><img src="../../public/github.svg" alt="icone gihub"></a>
                    </div>

                </footer>

            </div>

            <div class="main-content-right">

                <h3 class="title">Entrada</h3>

                <div v-for="task in tasks" :key="task.id">
                    <div v-if="task.users_id == userId()">

                        <!-- TASKS -->

                        <div class="tasks">

                            <div class="task">

                                <div>
                                    <button class="checkbutton" @click="checkTask(task.id)">
                                        <div v-if="task.taskstatus == 'pending'">
                                            <img src="/checkvazio.svg" alt="check">
                                        </div>
                                        <div v-else>
                                            <img src="/checkcheio.svg" alt="check">
                                        </div>
                                    </button>
                                </div>

                                <div class="task-field">

                                    <button @click="selectedTask = task, showModalViewTask = true" class="tasktitle"> {{task.tasktitle}}</button>
                                    <p class="description">{{ task.taskdescription }}</p>

                                    <div class="date-counter">

                                        <div v-if="task.taskfinishdate >= moment().format('YYYY-MM-DD')">
                                            <div class="green-date">
                                                <img src="/dataverde.svg" alt="">{{
                                                    moment(task.taskfinishdate).format('DD/MM/YYYY') }}
                                            </div>
                                        </div>

                                        <div v-else>
                                            <div class="red-date">
                                                <img src="/datavermelho.svg" alt=""> {{
                                                    moment(task.taskfinishdate).format('DD/MM/YYYY') }}
                                            </div>
                                        </div>

                                        <div class="counter">
                                            {{ task.subtasks.filter(sub => sub.task_id == task.id && sub.subtaskstatus == "completed").length }}/{{ task.subtasks.filter(sub => sub.task_id == task.id).length}}
                                        </div>
                                    </div>

                                </div>

                                <div class="menu-tasks">
                                    <button @click="selectedTask = task, showModalUpdateTask = true" class="button-icon-date"><img src="/lapis.svg" alt="lapis"></button>
                                    <button @click="selectedTask = task, showModalUpdateDate = true" class="button-icon-date-margin"><img src="/calendario.svg" alt="calendario"></button>
                                    <button @click="deleteTask(task.id)" class="trash-button"><img src="/lixeiracinza.svg" alt="excluir"></button>
                                </div>

                            </div>

                            <!-- SUBTASK -->

                            <div class="main-subtask-content">

                                <div v-for="subtask in task.subtasks" :key="task.subtasks.id">

                                    <div class="sub-task-content">

                                        <div class="sub-task">

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

                                            <!-- COLLAPSE SUBTASK -->

                                            <div class="subtask-text">
                                                <button @click="showCollapse(subtask.id)" class="title-subtask">{{subtask.subtasktitle }}</button>
                                                <div class="description-subtask" v-if="collapsesubtask == true && subtask.id == newId">{{subtask.subtaskdescription }}</div>
                                            </div>

                                        </div>

                                        <div class="menu-subtasks">
                                            <button @click="subtaskId = subtask.id, showModalUpdateSubtask = true" class="button-icon-date-margin-subtask"><img src="/lapis.svg" alt="lapis"></button>
                                            <button class="trash-button"> <img src="/lixeiracinza.svg" alt="excluir" @click="deleteSubTask(subtask.id)"></button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="add-task">
                            <button @click="selectedTask = task, showModalNewSubtask = true" class="button-icon-date subtask-text"><img src="/adicionarcinza.svg" alt="adicionar">Criar subtarefa</button>
                        </div>

                    </div>

                </div>

            </div>

        </div>


        <footer class="footer-items">
            <h6>Fernando Códolo Pagani &copy 2024 </h6>
            <div class="icons-footer">
                <a href="https://www.linkedin.com/in/fernandocpagani/" target="_blank"><img src="/linkedin.svg" alt="icone linkedin"></a>
                <a href="https://www.instagram.com/fernandocpagani/" target="_blank"><img src="/instagram.svg"  alt="icone instagram"></a>
                <a href="https://www.facebook.com/fernando.codolopagani/" target="_blank"><img src="/facebook.svg" alt="icone facebook"></a>
                <a href="https://github.com/fernandocpagani" target="_blank"><img src="/github.svg" alt="icone gihub"></a>
            </div>
        </footer>

    </div>
</template>

<script>

import moment from 'moment'
import axios from 'axios'
import ModalUpdateSubtask from './../components/ModalUpdateSubtask.vue'
import ModalUpdateTask from './../components/ModalUpdateTask.vue'
import ModalViewTask from './../components/ModalViewTask.vue'
import ModalUpdateDate from './../components/ModalUpdateDate.vue'
import ModalNewSubtask from '../components/ModalNewSubtask.vue'
import ModalNewTask from '../components/ModalNewTask.vue'

export default {

    components: {
        ModalUpdateSubtask,
        ModalUpdateTask,
        ModalViewTask,
        ModalUpdateDate,
        ModalNewSubtask,
        ModalNewTask,
    },

    data() {
        return {
            selectedTask: {},
            selectedSubtask: {},
            subtaskId: {},
            tasks: [],
            subtask: {},
            subtasks: [],
            subtasktitle: '',
            id: '',
            title: '',
            description: '',
            taskdate: '',
            status: '',
            subtaskstatus: '',
            taskfinishdate: '',
            email: '',
            task: '',
            msg: '',
            showModalViewTask: false,
            showModalUpdateTask: false,
            showModalUpdateDate: false,
            showModalNewSubtask: false,
            showModalUpdateSubtask: false,
            collapsesubtask: false,
            newId: '',
        }
    },

    methods: {
        async showCollapse(id) {
            const newId = id
            if (this.collapsesubtask == true) {
                this.collapsesubtask = false
                this.newId = newId;
            } else {
                this.collapsesubtask = true
                this.newId = newId;
            }
        },

        userId() {
            let userId = JSON.parse(localStorage.getItem('user-info')).user.id;
            return userId
        },

        async checkTask(id) {
            const result = await axios.get(`http://localhost:8000/api/task/${id}`)
            if (result.data.taskstatus == "pending") {
                result = await axios.put(`http://localhost:8000/api/task/${id}/updatetaskstatus`,
                    {
                        taskstatus: "completed"

                    }).then(() => {
                        this.getTasks()
                    })
            } else {
                result = await axios.put(`http://localhost:8000/api/task/${id}/updatetaskstatus`,
                    {
                        taskstatus: "pending"
                    }).then(() => {
                        this.getTasks()
                    })
            }
        },

        async checkSubtask(id) {
            const result = await axios.get(`http://localhost:8000/api/subtask/${id}`)
            if (result.data.subtaskstatus == "pending") {
                result = await axios.put(`http://localhost:8000/api/subtask/${id}/updatesubtaskstatus`,
                    {
                        subtaskstatus: "completed"

                    }).then(() => {
                        this.getTasks()
                    })
            } else {
                result = await axios.put(`http://localhost:8000/api/subtask/${id}/updatesubtaskstatus`,
                    {
                        subtaskstatus: "pending"

                    }).then(() => {
                        this.getTasks()
                    })
            }
        },

        async deleteTask(id) {
            axios.delete(`http://localhost:8000/api/task/${id}/delete`)
                .then(() => {
                    this.getTasks()
                })
        },

        async deleteSubTask(id) {
            axios.delete(`http://localhost:8000/api/subtask/${id}/delete`)
                .then(() => {
                    this.getTasks()
                })
        },

        getTasks() {
            axios
                .get(`http://127.0.0.1:8000/api/task`)
                .then((response) => {
                    this.tasks = response.data
                    this.moment = moment;
                })
        },

        getTasksToday() {
            axios
                .get(`http://127.0.0.1:8000/api/tasktoday`)
                .then((response) => {
                    this.tasks = response.data
                    this.moment = moment;
                })
        },

        getTasksLate() {
            axios
                .get(`http://127.0.0.1:8000/api/tasklate`)
                .then((response) => {
                    this.tasks = response.data
                    this.moment = moment;
                })
        },

    },

    async mounted() {
        this.getTasks();
    },

}

</script>

<style scoped>
.full-content {
    display: flex;
    flex-direction: column;
}

a {
    background-color: transparent;
}

.main-content-left {
    width: 293px;
    height: 100%;
    position: fixed;
    margin-top: 70px;
    background-color: #fafafa;
}

.menu-left {
    width: 293px;
    padding: 0;
}

.first-menu-button {
    background-color: #fafafa;
    border: none;
    font-size: 15px;
    font-weight: 600px;
    line-height: 18.29px;
    margin-left: 46px;
    margin-top: 63px;
    cursor: pointer;
}

.first-menu-button img {
    margin-right: 20px;
}

.menu-button {
    background-color: #fafafa;
    border: none;
    font-size: 15px;
    font-weight: 600px;
    line-height: 18.29px;
    margin-left: 46px;
    margin-top: 45px;
    cursor: pointer;
}

.menu-button img {
    margin-right: 20px;
}

.footer-item {
    left: 82px;
    bottom: 80px;
    position: absolute;
    text-align: center;
    margin: auto 0;
}

.icons img {
    margin-left: 10px;
    margin-bottom: 8px;
    cursor: pointer;
}


.main-content-right {
    box-sizing: border-box;
    padding: 50px 144px 50px 165px;
    background-color: #ffffff;
    margin-top: 70px;
    margin-left: 293px;
}

.title {
    font-size: 24px;
    font-weight: 800;
    line-height: 29px;
    margin-bottom: 30px;
}

.task {
    width: 678px;
    border: solid 1px #e5e5e5;
    box-sizing: border-box;
    padding: 15px 25px;
    display: flex;
    flex-direction: row;
    transition: .5;
}

.checkbutton {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.task-field {
    width: 475px;
    margin-left: 20px;
}

.tasktitle {
    border: none;
    padding: 0 0 10px 0;
    font-size: 16px;
    background-color: transparent;
    cursor: pointer;
}

.title-task {
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
    color: #000;
    text-decoration: none;
}

.card-body {
    padding: 0;
}

.description-subtask {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: #81858e;
    padding-bottom: 0px;
    width: 200px;
    margin-bottom: 0px;
}

.menu-subtasks {
    border: none;
    background-color: transparent;
    display: none;
    align-items: center;
}

.sub-task-content:hover .menu-subtasks {
    display: flex;
    flex-direction: row;
}

.menu-subtasks button {
    border: none;
    background-color: transparent;
}

.red-date {
    font-size: 14px;
    color: #d31408;
    background-color: #d314081a;
    padding: 4px 7px;
    width: 125px;
}

.red-date img {
    margin-right: 10px;
}

.green-date {
    font-size: 14px;
    color: #009488;
    background-color: #e5f4f3;
    padding: 4px 7px;
    width: 125px;
}

.green-date img {
    margin-right: 10px;
}

.description {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
}

.date-counter {
    display: flex;
    flex-direction: row;
}

.counter {
    font-size: 14px;
    font-weight: 400;
    color: #81858e;
    padding: 4px 10px;
}

.menu-tasks {
    display: flex;
    align-items: center;
}

.menu-tasks {
    border: none;
    display: none;
    background-color: transparent;
    cursor: pointer;
}

.task:hover .menu-tasks {
    display: flex;
    flex-direction: row;
}

.button-icon-date {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.button-icon-date-margin {
    padding: 0;
    background-color: transparent;
    border: none;
    margin: 0 30px;
    cursor: pointer;
}

.button-icon-date-margin-subtask {
    padding: 0;
    background-color: transparent;
    border: none;
    margin-right: 30px;
    cursor: pointer;
}

.btn,
.btn-black {
    border: none;
    color: #81858e;
    font-size: 15px;
    padding: 0;
}

.trash-button {
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.btn,
.btn-secondary {
    background-color: transparent;
}

.btn:hover,
.btn-secondary:hover {
    background-color: transparent;
}

.main-subtask-content:hover {
    background-color: #fafafa;
}

.sub-task-content {
    box-sizing: border-box;
    border-left: solid 1px #e5e5e5;
    border-right: solid 1px #e5e5e5;
    border-top: none;
    padding-left: 65px;
    padding-right: 25px;
    display: flex;
    flex-direction: row;
}

.sub-task {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 10px 0;
    align-items: center;
    align-content: center;
    width: 520px
}

.add-task {
    padding: 15px 5px;
    box-sizing: border-box;
    border: solid 1px #e5e5e5;
    color: #81858e;
    font-size: 15px;
    margin-bottom: 20px;
}

.add-task:hover {
    background-color: #fafafa;
}

.task:hover {
    background-color: #fafafa;
}

.subtask-text {
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    color: #81858E;
    width: 450px;
    margin-left: 20px
}

.title-subtask {
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
}

.subtask-text img {
    margin-right: 10px;
}

.btn:hover,
.btn-secondary:hover {
    background-color: transparent;
    color: #81858E;
}

.footer-items {
    display: none;
}

@media(max-width: 490px) {

    .sub-task {
        width: 269px;
    }

    .sub-task-text {
        width: 200px;
    }

    .sub-task-content {
        width: 469px;
    }

    #form,
    #form-date {
        width: 480px;
        margin: auto 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #form-date {
        max-width: 470px;
    }

    .white-button {
        margin-left: 150px;
    }

    .main-content {
        margin-left: 0;
        padding: 50px 0 0 0;
        margin: 140px 10px 10px 10px;
        max-width: 469px;
    }

    .task {
        max-width: 469px;
    }

    .footer-items {
        display: flex;
        flex-direction: row;
        text-align: center;
        position: fixed;
        bottom: 0;
        justify-items: center;
        width: 100%;
        background-color: #fafafa;
        justify-content: space-between;
        padding: 10px 30px 0 30px;
        height: 40px;
        margin: auto 0;
    }

    .icons-footer img {
        margin-left: 10px;
        margin-bottom: 8px;
        cursor: pointer;
    }

    .add-task {
        margin-bottom: 50px;
    }


    .footer-item {
        display: none;
    }

    .main-content {
        height: 50px;
        width: 489px;
        position: fixed;
        top: 70px;
        background-color: #fafafa;
    }

    .menu {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0;
        margin: 0;
        justify-content: space-between;
        padding: 10px 15px;
    }

    .first-menu-button {
        margin: 0;
    }

    .first-menu-button img {
        margin: 0;
        padding-right: 10px;
    }

    .menu-button {
        margin: 0;
    }

    .menu-button img {
        margin: 0;
        padding-right: 10px;
    }
}
</style>
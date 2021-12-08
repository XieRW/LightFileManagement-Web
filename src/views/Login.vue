<template>
    <div id="login">
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="用户名">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input
                        v-model="user.pass"
                        type="password"
                        autocomplete="off"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button  @click="signup">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: 'Login',
        data() {
            return {
                user: {
                    name: '',
                    pass: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
            }
        },
        methods: {
            login() {
                console.log('login!');
                console.log(this);
                // this.$router.push('/home')
            },
            signup() {
                console.log('signup!')
            },
        },

    });
</script>
<style lang="css">
    @import '../assets/css/login.css';

    #login{
        background-image: url(../assets/images/login.png);
        background-color: #37bdfb;
        width: 100%;
        /* background-size: auto; */
        height: 100%;
        position: fixed;
        top: 0;
        /* right: 30%; */
        /* bottom: 20%; */
        left: 0;
        background-size: 40%;
        background-repeat: no-repeat;
        background-position: left;
        overflow: hidden;
    }

    .el-form {
        position: fixed;
        width: 400px;
        right: 20%;
        top: 50vh;
        transform: translateY(-50%);
        border: 2px solid rgba(0, 152, 195, 0.51);
        padding: 20px 40px;
        background: rgb(54 183 250 / 78%);
        box-shadow: 0 0 13px rgb(66 165 211) inset;
    }


</style>

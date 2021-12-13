<template>
    <h1>欢迎登录</h1>
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
    import {defineComponent, getCurrentInstance} from 'vue';
    import th from "element-ui/src/locale/lang/th";

    export default defineComponent({
        name: 'Login',
        setup(){
            const user = {
                name: '',
                pass: '',
            }
            const instance = getCurrentInstance();

            function login() {
                console.log(instance)
                // this.$api.post(window.config.baseURL+'/auth/permit/login').then((res)=>{
                //     console.log(res);
                // })
                // instance.$router.push('/home');
            }
            function signup() {
                console.log('signup!');
                // instance.$router.push('/signup');
            }
            return {
                user,
                login,
                signup
            }
        }
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

    h1 {
        z-index: 1;
        position: fixed;
        right: 50%;
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

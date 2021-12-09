<template>
    <h1>欢迎注册</h1>
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
                <el-button type="primary" @click="signup">注册</el-button>
                <el-button  @click="cancel">取消</el-button>
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
            signup() {
                console.log('signup!');
            },
            cancel() {
                console.log('cancel!');
                this.$router.push('/login')

            },
        },

    });
</script>

<style>
    h1 {
        z-index: 1;
        position: fixed;
        right: 50%;
    }
</style>
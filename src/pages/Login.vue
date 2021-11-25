<template>
  <div class="login-container">
    <div class="eventTop">
<!--      <img src="./assets/images/banner2.png" alt="" />-->
      <div class="bannerTitle">{{ bannerTitle }}</div>
    </div>

    <div class="login-way__container">
      <div class="login-way__container_switch-btns">
        <div
          :class="loginType === 0 ? 'switch-btns__active' : 'switch-btn'"
          @click="switchLoginWay(0)"
        >
          手机验证码登录
        </div>
        <div
          :class="loginType === 1 ? 'switch-btns__active' : 'switch-btn'"
          @click="switchLoginWay(1)"
        >
          随机密码登录
        </div>
      </div>
    </div>
    <ul class="login-form__container">
      <li>
        <van-field v-model="username" type="number" label="手机号" placeholder="请输入手机号" />
        <span
          v-if="loginType === 0"
          class="getCode"
          :style="{ color: username.length === 11 ? '#0091FF' : '' }"
          @click="getCode"
          >{{ codeText }}</span
        >
      </li>
      <li>
        <van-field
          v-model="password"
          type="number"
          :label="loginType === 0 ? '验证码' : '密码'"
          :placeholder="loginType === 0 ? '请输入短信验证码' : '请输入随机密码'"
        />
      </li>
      <li class="secret">
        <van-checkbox v-model="checked" shape="square" checked-color="rgba(0, 148, 238, 1)">
          <span class="p1">我已阅读并同意</span>
        </van-checkbox>
        <span class="p2" @click="toSecret">隐私政策</span>
      </li>
      <div
        :class="
          username.length === 11 && password !== '' ? 'submit-btn_active' : 'submit-btn_default'
        "
        @click="login"
      >
        立即登录
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
// import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';

// export default defineComponent({
//   name: 'Login',
// });
</script>
<style lang="scss">
</style>

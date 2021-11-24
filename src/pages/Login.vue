<template>
  <div class="login-container">
    <div class="eventTop">
      <img src="./assets/images/banner2.png" alt="" />
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
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import { Notify } from 'vant';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import $validate from './assets/js/validate';

export default defineComponent({
  name: 'Login',
  setup() {
    const instance = getCurrentInstance();
    const { $http }: any = instance?.appContext.config.globalProperties;
    const router = useRouter(); // 获取路由器实例
    const route = useRoute(); // 获取路由
    const store = useStore();
    const bannerTitle = ref(''); // 标题
    const loginType = ref(0); // 登录方式 0：验证码登录 1：随机密码登录
    const titleKey = 'WX_TOPNAME';
    let codeText = ref('获取验证码');
    let username = ref('');
    let password = ref('');
    const checked = ref(false);
    let getCodeFlag = ref(true);
    const latencytime = 90;
    // 获取验证码时候要补传的参数
    const params = ref({
      label: '',
      value: '',
      type: 0 // type: 1是任务  2是响应  3是事件
    });

    /**
     * @description 获取页面标题
     */
    function getBannerTitle(key: any) {
      let requestData: any = ref({
        method: 'get',
        service: 'soc',
        url: `/sys/config/infoByKey?key=${key}`,
        dataType: 'json',
        data: {},
      });
      ($http as any)(requestData.value)
        .then((res: any) => {
          if (res.code === 0) {
            bannerTitle.value = res.config.paramValue; // 平台标题
          }
        })
        .catch((error: any) => {
          if (error.code) {
            Notify({
              type: 'danger',
              message: `获取页面标题失败，错误代码${error.code}，错误信息：${error.msg}`,
            });
          }
        });
    }
    /**
     * @description 路由跳转
     */
    function routeSkip(item: string) {
      const paths: string = sessionStorage.getItem('route') ?? '';
      const types = route.query.type || 'HomePage';
      // 用策略模式优化代码,2.7迁移代码
      // 利用Map数据结构储存信息
      const pathType = new Map([
        ['verification', 'verification'], // 信息核实
        ['sjsVerification', 'newsCheck'], // 信息核报
        ['affairs', 'sjsAnnouncement'], // 会议通知
        ['eventDealBulletinApproval', 'leaderCheck'], // 领导审定
        ['scheduling', 'scheduling'], // 值班排班
        ['rollCallOnDuty', 'rollCallName'], // 点名通知
      ]);
      const valueMap = [...pathType.values()];
      const getPath = (key: any) => {
        if (pathType.get(key)) {
          return pathType.get(key); // Map数据结构的get方法，获取key类型的值
        } else {
          return 'eventInformation';
        }
      };
      if (item === '3.0') {
        console.log(paths.replace('/', ''));
        // 3.0登录，且上次访问不是2.7页面时，跳转至上次访问页面
        const pathsOld = paths.replace('/', '');
        if (pathsOld && valueMap.indexOf(pathsOld) < 0 && pathsOld !== 'undefined') {
          router.push({ path: paths });
        } else {
          router.push({ path: '/HomePage' }); // 若上次访问页面为空或是2.7页面时，跳转至首页
        }
      } else if (types === 'scheduling') { // 排班页面携带参数tomorrow
        router.push({
          path: getPath(types),
          query: {
            tomorrow: route.query.tomorrow ? route.query.tomorrow : '',
          },
        });
      } else {
        router.push({
          path: getPath(types),
          query: {},
        });
      }
    }
    /**
     * @description 2.7H5登录后请求，迁移代码
     */
    function loginAfter() {
      // 需要通过字典表接口获取以下getByParentCodes的状态数据，目前为了演示写死，可以用axios与获取详情接口变量{GETDETAIL}并发请求获取数据
      // const pcode = ref({
      //     pcode: 'distribution_status',
      // });
      const requestData: any = ref({
        method: 'post',
        service: 'app',
        url: '/emergency/preparation/h5/getByParentCode',
        data: {
          pcode: 'distribution_status',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      ($http as any)(requestData.value)
        .then((res: any) => {
          if (res.code === 0) {
            localStorage.setItem('getByParentCodes', JSON.stringify(res.data)); // getByParentCodes 登录后返回的数据，主要用到code
          }
        });
      // 事件详细、信息核报数据
      // const param = {
      //     id: route.query.id,
      //     type: route.query.type,
      // };
      const requestDetailData: any = ref({
        method: 'post',
        service: 'app',
        url: '/emergency/preparation/h5/getDetail',
        data: {
          id: route.query.id,
          type: route.query.type,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      ($http as any)(requestDetailData.value)
        .then((res: any) => {
          if (res.code === 0) {
            let data = res.data;
            if (Object.keys(data).length > 0) {
              localStorage.setItem('eventId', data.eventId);
              localStorage.setItem('contactorId', data.contactorId);
              localStorage.setItem('preplanId', data.event.preplanId);
              localStorage.setItem('distributionId', data.id);
            }
            routeSkip('2.7');
          } else {
            Notify({
              type: 'danger',
              message: `登录失败，错误代码${res.status}，错误信息：${res.message}`,
            });
            getCodeFlag.value = false;
          }
        }).catch((error: any) => {
          if (error.status) {
            Notify({
              type: 'danger',
              message: `登录失败，错误代码${error.status}，错误信息：${error.message}`,
            });
          }
        });
    }
    /**
     * @description 登录
     */
    function login() {
      // 验证手机号码是否为空
      if (username.value === '') {
        Notify({
          type: 'warning',
          message: `请输入手机号码`,
        });
        return;
      }

      // 验证验证码/密码是否为空
      if (password.value === '') {
        if (loginType.value === 0) {
          Notify({
            type: 'warning',
            message: `请输入验证码`,
          });
        } else {
          Notify({
            type: 'warning',
            message: `请输入密码`,
          });
        }
        return;
      }

      // 验证手机号码的正确性
      if (!$validate.checkPhone(username.value)) {
        return;
      }

      if (!checked.value) {
        Notify({
          type: 'warning',
          message: `请阅读并同意隐私政策`,
        });
        return;
      }

      let objJSON = new FormData();
      objJSON.append('username', username.value);
      objJSON.append('password', password.value);
      objJSON.append('type', loginType.value.toString());
      let requestData: any = ref({
        method: 'post',
        service: 'login',
        url: '/h5login',
        data: objJSON,
        headers: {
          'Content-Type': 'multipart/form-data ',
        },
      });
      ($http as any)(requestData.value)
        .then((res: any) => {
          if (res.code === 0) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userId', res.userId);
            localStorage.setItem('platformId', res.platformId);
            // 2.7H5添加的存储参数
            localStorage.setItem('savaCode', password.value);
            localStorage.setItem('legacyH5URL', (window as any).config.legacyH5URL);
            const data: any = {
              id: route.query.id,
              code: route.query.code, // 验证码
              type: route.query.type,
            };
            localStorage.setItem('codeData', JSON.stringify(data));
            sessionStorage.setItem('currentId', JSON.parse(JSON.stringify(data)).id);
            localStorage.setItem('accessToken', res.token); // 返回token
            console.log('codeData', localStorage.getItem('codeData'));
            console.log('accessToken', localStorage.getItem('accessToken'));
            const types = route.query.type;
            // 如果有types和id则为2.7登录，继续请求接口
            if (types && route.query.id) {
              loginAfter();
            } else {
              routeSkip('3.0');
            }
          } else {
            Notify({
              type: 'danger',
              message: `登录失败，错误代码${res.code}，错误信息：${res.msg}`,
            });
            getCodeFlag.value = false;
          }
        })
        .catch((error: any) => {
          if (error.code) {
            Notify({
              type: 'danger',
              message: `登录失败，错误代码${error.code}，错误信息：${error.msg}`,
            });
          }
        });
    }

    /**
     * @param {Number} type 0：验证码登录 1：随机密码登录
     * @description 切换登录方式
     */
    function switchLoginWay(type: any) {
      loginType.value = type; // 登录方式
    }

    /**
     * @description 发送验证码倒计时
     */
    function time(wait: any) {
      if (wait == 0) {
        wait = latencytime;
        codeText.value = '重新获取';
        getCodeFlag.value = true;
      } else {
        codeText.value = '等待' + wait + '秒';
        wait--;
        setTimeout(function() {
          time(wait);
        }, 1000);
      }
    }

    /**
     * @description 获取路径携带的参数
     */
    function getPathParams() {
      const path = sessionStorage.getItem('route') || '';
      const paramLabel: any = ref(''); // 字段名称
      const paramValue: any = ref(0); // 字段值
      const paramType: any = ref(0); // paramType: 1是任务  2是响应  3是事件
      // 如果登录后要跳转的是任务详情页面，要把任务id给到后端，后端再去查该用户关联的平台，才能下发获取验证码的短信
      if (path.indexOf('TaskDetail') > -1) {
        paramLabel.value = 'taskDetailId';
        paramValue.value = path.split('/TaskDetail/')[1]
        paramType.value = 1 // 1是任务
      }
      // 如果登录后要跳转的是响应通告页面，要把响应通告记录id给到后端，后端再去查该用户关联的平台，才能下发获取验证码的短信
      if (path.indexOf('Annunciate') > -1) {
        paramLabel.value = 'distributionId';
        paramValue.value = path.split('/Annunciate/')[1]
        paramType.value = 2 // 2是响应
      }
      // 如果登录后要跳转的是现场指挥部页面，要把事件id给到后端，后端再去查该用户关联的平台，才能下发获取验证码的短信
      if (path.indexOf('Headquarters') > -1) {
        paramLabel.value = 'eventId';
        paramValue.value = path.split('/Headquarters/')[1]
        paramType.value = 3 // 3是事件
      }
      // 保存登录链接的参数（对接2.7H5）
      const affairsId: any = route.query.affairsId ? route.query.affairsId : '';
      localStorage.setItem('affairsId', affairsId);
      const contactorId: any = route.query.contactorId ? route.query.contactorId : '';
      localStorage.setItem('contactorMap', contactorId);
      const approvalId: any = route.query.approvalId ? route.query.approvalId : '';
      localStorage.setItem('approvalMap', approvalId);
      // // 11.28新增 事件快报
      const eventDealBulletinId: any = route.query.eventDealBulletinId ? route.query.eventDealBulletinId : '';
      // store.commit('saveBulletin', eventDealBulletinId);
      localStorage.setItem('eventDealBulletinId', eventDealBulletinId);
      // // 值班点名
      const contactRelId: any = route.query.contactRelId ? route.query.contactRelId : '';
      const groupCode: any = route.query.groupCode ? route.query.groupCode : '';
      localStorage.setItem('saveContactRelId', contactRelId);
      localStorage.setItem('saveGroupCode', groupCode);
      Object.assign(params.value, {
        label: paramLabel.value,
        value: paramValue.value,
        type: paramType.value,
      });
    }

    /**
     * @description 获取验证码方法
     */
    function getCode() {
      if (!getCodeFlag.value) return;
      const url = !params.value.label ? `/mail/mailcontactor/getMobileVerificationCode?mobile=${username.value}&loginType=1` : `/mail/mailcontactor/getMobileVerificationCode?mobile=${username.value}&type=${params.value.type}&id=${params.value.value}`
      let requestData: any = ref({
        method: 'get',
        service: 'soc',
        url,
        dataType: 'json',
      });
      ($http as any)(requestData.value)
        .then((res: any) => {
          if (res.code === 0) {
            time(latencytime);
            getCodeFlag.value = false;
          } else {
            Notify({
              type: 'danger',
              message: `获取验证码失败，错误代码${res.code}，错误信息：${res.msg || res.message}`,
            });
            getCodeFlag.value = false;
          }
        })
        .catch((error: any) => {
          if (error.code) {
            Notify({
              type: 'danger',
              message: `获取验证码失败，错误代码${error.code}，错误信息：${error.msg || error.message}`,
            });
          }
        });
    }

    /**
     * @description 跳转到隐私政策
     */
    function toSecret() {
      router.push({
        path: '/Secret',
        query: {
          h5: 'true'
        }
      })
    }

    onMounted(() => {
      getPathParams();
      getBannerTitle(titleKey);
    });

    return {
      login,
      bannerTitle,
      switchLoginWay,
      loginType,
      username,
      password,
      getCode,
      codeText,
      checked,
      toSecret,
    };
  },
});
</script>
<style lang="scss">
@import './assets/css/login.scss';
</style>

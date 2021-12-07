import { Notify } from "vant";


//手机号的正确性
function checkPhone(phoneValue){
  if(!(/^1[3456789]\d{9}$/.test(phoneValue))){
    Notify({
      type: "warning",
      message: `手机号码有误，请重新填写`,
    });
    return false;
  }else{
    return true
  }
}

export default {
  checkPhone
}
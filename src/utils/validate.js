/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
/**
 * 登陆密码
 * @param {*} s
 */
export function isPasswd(s) {
    return /^(?![0-9]$)(?![a-zA-Z]$)[0-9A-Za-z]{6,20}$/.test(s)
}
/**
 * 身份证号
 * @param {*} s
 */
export function isCardId(s) {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(s)
}
/**
 * 邮编
 * @param {*} s
 */
export function isZip(s) {
    return /^[0-9]{6}$/.test(s)
}
/**
 * 收款账户，中英文
 * @param {*} s
 */
export function isCashAccount(s) {
    return /^(?![0-9]$)(?![a-zA-Z]$)[0-9A-Za-z]{6,19}$/.test(s)
}
/**
 * 大于0 两位小数点
 * @param {*} s
 */
export function isPrice(s) {
    return /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/.test(s)
}
/**
 * 大于0 两位小数点
 * @param {*} s
 */
export function testReason(s) {
    return /^[\u4e00-\u9fa5a-zA-Z0-9,!?。！？]+$/.test(s)
}
// 判断纳税号是否正确
// export function checkTaxId(taxId) {
//     var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
//         i, j = regArr.length;
//     for (var i = 0; i < j; i++) {
//         if (regArr[i].test(taxId)) {
//             return true;
//         }
//     }
//     //纳税人识别号格式错误
//     return false;
// }
// 判断25位纳税识别号
export function checkTaxId(s) {
    return /^[A-Z0-9]+$/.test(s)
}
// 路径判断
export function checkUrl(s) {
	return /^http[s]?:\/\/.*/.test(s)
}
// 校验手机号或者座机号
export function checkPhone(mobile){
      var tel = /^0\d{2,3}-?\d{7,8}$/;
      var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
      if(mobile.length == 11){//手机号码
        if(phone.test(mobile)) {
          return true;
        }
      }else if(mobile.length == 13 && mobile.indexOf("-") != -1 ){//电话号码
        if(tel.test(mobile)) {
          return true;
        }
      }
        return false;
    }

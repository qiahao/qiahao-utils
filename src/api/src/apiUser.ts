'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: qiahao
* Date: 2020-02-18 17:24
* Desc:
*/

import request from '../utilsNet';
import { user } from '../utilsNetUrl';

type Login = {
  account: string; // 手机号/邮箱地址
  password: string; // 密码，使用appEncrypt加密
}

type LoginSms = {
  mobileno: string; // 手机号
  smscode: string; // 短信验证码
  imgcode: string; // 图片验证码
  // channel?: string, // 登陆渠道  W：PC端，M：手机端 固定值 不需要传值
}

type Register = {
  mobileno: string; //  手机号
  smscode: string; //  短信验证码
  email: string; //  邮箱地址
  realname: string; //  姓名
  // channel: string; //  登陆渠道 W：PC端，M：手机端 此处为固定值，不传
  password: string; //  登陆渠道 AES加密后
  birthday: string; //  出生年月 格式：yyyy-MM-dd
  agreeConsent: string; //  是否同意款 Y，同意后才能注册, 未同意 请在逻辑中判断处理
}


type SeekPasswordBySms = {
  mobileno: string; // 手机号
  smscode: string; // 短信验证码
  password: string; // 登陆渠道  AES加密
}

type ValidateCaptcha = {
  code: string; // 验证码
  clear?: string; // 是否清空验证码
}
type ValidateSms = {
  code: string; // 短信验证码
  mobileNo: string; // 手机号
  clear?: string; // 是否清空验证码
}
type SendSms = {
  mobileNo: string; // 手机号
  captchaCode: string; // 图片验证码
  smsType: string; // 短信类型 |REG：注册，LOGIN：短信登陆，SEEK：找回密码
}
type ValidateEmail = {
  email: string; // 邮箱地址
}
type GetUserInfo = {
  preHandler: (res?: any) => any
}
type ThirdBind = {
  mobileno: string,
  smscode: string,
  imgcode: string
}
type PutPassword = {
  password: string,
  newpassword: string
}
type PutUserInfo = {
  avator?: string; // 头像 | 可空 | String
  mobileno?: string; // 手机号 | 可空 | String
  email?: string; // 邮箱地址 | 可空 | String
  realname?: string; // 姓名 | 可空 | String
  birthday?: string; // 出生年月 | 可空 | String | 格式：yyyy-MM-dd
  gender?: string; // 性别 | 可空 | String
  nickname?: string; // 呢称 | 可空 | String
  avatar?: string; // 头图 | 可空 | String
  skinItems?:{ // 皮肤问题 | 可空 | json list | 对象内容如下
    cd: string // 皮肤类型CD | 必填 | string
  };
  jobItems?:{ // 职业 | 可空 | json list | 对象内容如下
    cd: string // 职业类型CD | 必填 | string
  };
  likePrdTypeItems?:{ // 关心的产品类型 | 可空 | json list | 对象内容如下
    cd: string // 产品类型类型CD | 必填 | string
  };
}


type SendEmail = {
  email: string, // 邮箱地址
  captchaCode: string, // 图片验证码
  emailType: string, // SEEK-找回密码 BIND-绑定验证
}
type SeekPasswordByEmail = {
  email: string,
  emailcode: string, // 邮箱验证码
  password: string
}
type validateEmailCode = {
  email: string,
  code: string,
  clear?: string
}
type PutUnbindType = {
  type: string; // 类型 | 必填 | String | WECHAT,WEIBO,ALIPAY,QQ
}
type emailCode = {
  email: string; // 邮箱地址 | 必填 | String
  captchaCode: string; // 图片验证码 | 必填 | String
  emailType?: string; // 邮件类型 | 必填 | String |SEEK：找回密码,BIND:绑定验证，MODIFY：修改邮箱地址
}
type validateEmail = {
  email: string; // 邮箱地址 | 必填 | String
  captchaCode: string; // 图片验证码 | 必填 | String
  emailType?: string; // 邮件类型 | 必填 | String |SEEK：找回密码,BIND:绑定验证，MODIFY：修改邮箱地址
}
type validateUserEmail = {
  email: string; // 邮箱地址 | 必填 | String
  code: string; // 邮箱验证码 | 必填 | String
  clear?: string; // 是否清空验证码 | 可空 | String
}
type modifyMobileNo = {
  mobileno: string; // 手机号 | 必填 | String
  smscode: string; // 短信验证码 | 必填 | String
  newMobileno:string; // 新手机号 | 必填 | String
}
type modifyEmail = {
  email: string; // 邮箱 | 必填 | String
  emailcode: string; // 邮箱验证码 | 必填 | String
  newEmail:string; // 新邮箱 | 必填 | String
}


// 账号密码登录
function login(params: Login) {
  return request.post(user.LOGIN, { ...params, channel: 'M' });
}

// 短信登录
function loginSms(params: LoginSms) {
  return request.post(user.LOGIN_SMS, { ...params, channel: 'M' });
}

// 注册

function register(params: Register) {
  return request.post(user.REGISTER, { ...params, channel: 'M' });
}

// 退出
function logout() {
  return request.get(user.LOGOUT);
}

// 短信更新密码
function seekPasswordBySms(params: SeekPasswordBySms) {
  return request.post(user.SMS_SEEK_PASSWORD, params);
}

// 图形验证码验证
function validateCaptcha(params: ValidateCaptcha) {
  return request.post(user.VALIDATE_CAPTCHA, params);
}

// 短信验证码验证
function validateSms(params: ValidateSms) {
  return request.post(user.VALIDATE_SMS, params);
}

// 发送短信
function sendSms(params: SendSms) {
  return request.post(user.ACTIVATION_SMS, params);
}

// 会员信息
function getUserInfo(options?: GetUserInfo) {
  return request.get(user.USER, null, options);
}

// 第三方登录绑定手机号
function thirdBind(params: ThirdBind, options?) {
  return request.post(user.THIRDBIND, params, options);
}

// 修改密码
function PutPassword(params: PutPassword) {
  return request.post(user.CHANGEPASSOWRD, params);
}

// 图形验证码
function GetCaptcha() {
  return request.post(user.GETCAPTCHA);
}

// 发送邮箱验证码
function sendEmailCode(params: SendEmail) {
  return request.post(user.ACTIVATION_EMAIL, params);
}

// 邮箱验证码验证
function validateEmailCode(params: validateEmailCode) {
  return request.get(user.VALIDATE_EMAIL_CODE, params);
}

// 邮箱找回密码
function seekPasswordByEmail(params: SeekPasswordByEmail) {
  return request.post(user.EMAIL_SEEK_PASSWORD, params);
}

// 修改会员信息
function PutUserInfo(params: PutUserInfo) {
  return request.post(user.PUT_USER_INFO,{...params});
}

// 解除第三方绑定
function PutUnbind(type:string) {
  return request.del(user.PUT_UNBIND(type));
}

// 查询第三方绑定信息
function GetBindInfo() {
  return request.get(user.GET_BIND_INFO);
}

// 查询第三方绑定信息
function GetEmailCode(params: emailCode) {
  return request.post(user.GET_EMAIL_CODE,{...params});
}

// 查询第三方绑定信息
function GetValidateEmail(params: validateEmail) {
  return request.get(user.GET_VALIDATE_EMAIL,{...params});
}

// 邮箱验证码验证
function validateEmail(params: validateUserEmail) {
  return request.get(user.GET_VALIDATE_EMAIL,{...params});
}

// 修改手机号
function PutMobileNo(params: modifyMobileNo) {
  return request.post(user.PUT_MOBILENO,{...params});
}

// 修改邮箱
function PutEmail(params: modifyEmail) {
  return request.post(user.PUT_EMAIL,{...params});
}

export default {
  login,
  loginSms,
  validateCaptcha,
  validateSms,
  sendSms,
  getUserInfo,
  register,
  logout,
  seekPasswordBySms,
  thirdBind,
  PutPassword,
  GetCaptcha,
  sendEmailCode,
  validateEmailCode,
  seekPasswordByEmail,
  PutUserInfo,
  GetBindInfo,
  PutUnbind,
  GetEmailCode,
  GetValidateEmail,
  validateEmail,
  PutMobileNo,
  PutEmail
};

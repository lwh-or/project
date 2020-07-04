<template>
  <div class="form">
    <!-- 头部文字 -->
    <slot name="title"></slot>
    <!-- 手机号 -->
    <slot name="phone"></slot>
    <!-- 登录密码 -->
    <slot name="Password"></slot>

    <!-- 设置登录密码 -->
    <slot name="loginPassword"></slot>
    <!-- 再次输入登录密码 -->
    <slot name="pwaPassword"></slot>
    <!-- 短信验证码 -->
    <slot name="note"></slot>
    <!-- 邀请码 -->
    <slot name="Inbox"></slot>
    <!-- 输入新密码 -->
    <slot name="NewPassword"></slot>
    <!-- 按钮 -->
    <slot></slot>
    <slot name="button"></slot>
    <!-- 其他 -->
    <slot name="box"></slot>
    <!-- 底部文字 -->
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: 'Forms'
}
</script>


<style lang="less" scoped>
.form {
}
</style>
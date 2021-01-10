<template>
  <div class="login-page">
    <div class="login-card">
      <Form
        ref="formInline"
        :model="formInfo"
        :rules="ruleInline"
        :label-width="80"
      >
        <FormItem prop="username" label="用户名">
          <Input
            type="text"
            v-model="formInfo.username"
            placeholder="Username"
          />
        </FormItem>
        <br />
        <FormItem prop="password" label="密码">
          <Input
            type="password"
            v-model="formInfo.password"
            placeholder="Password"
          />
        </FormItem>
        <br />
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')"
            >登录
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInfo: {
        username: "admin",
        password: "123456"
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store.dispatch("Login", this.formInfo).then(() => {
            this.$router.push({
              path: "/",
              query: this.$route.query
            });
            this.$Message.success("Success!");
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  padding-top: 200px;

  .login-card {
    padding: 24px;
    width: 600px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>

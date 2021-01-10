export default {
  title: "管理后台",
  production:
    process.env.NODE_ENV === "production" &&
    process.env.VUE_APP_PREVIEW !== "true"
};

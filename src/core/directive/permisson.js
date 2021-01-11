import Vue from "vue";

const localPermissions = [];
/**权限指令**/
const has = Vue.directive("has", {
  bind(el, binding) {
    if (!localPermissions.includes(binding.value)) {
      el.innerHTML = "<p class='no-auth-tip'>无权限</p>";
    }
  }
});

// 权限检查方法
Vue.prototype.$_has = function(value) {
  return this.$store.getters.permissions.includes(value);
};
function setPermissions(ps) {
  Array.prototype.push.apply(localPermissions, ps);
}
export { has, setPermissions };

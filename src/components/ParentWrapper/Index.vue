<template>
  <router-view />
</template>

<script>
export default {
  name: "ParentWrapper",
  mounted() {
    console.log("ParentWrapper");
  }
};
</script>

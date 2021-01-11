<template>
  <div class="layout-base" :class="cStyle">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <Button @click="Logout">退出登陆</Button>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu :active-name="$store.getters.active" theme="light" width="auto">
            <div v-for="menu in $store.getters.menus" :key="menu.path">
              <MenuItem
                v-if="!menu.children || menu.children.length === 0"
                :name="menu.path"
                :key="menu.path"
                @click.native="goto(menu)"
              >
                {{ menu.meta.title }}
              </MenuItem>
              <Submenu v-else :name="menu.path" @click.native="goto(menu)">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  {{ menu.meta.title }}
                </template>
                <MenuItem
                  v-for="item in menu.children"
                  :name="item.path"
                  :key="item.path"
                  @click.native="goto(item)"
                >
                  {{ item.meta.title }}
                </MenuItem>
              </Submenu>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <Breadcrumb :style="{ margin: '24px 0' }">
            <BreadcrumbItem v-for="bc in breadcrumbs" :key="bc"
              >{{ bc }}
            </BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{
              padding: '12px',
              minHeight: 'calc(100vh - 157px)',
              background: '#fff'
            }"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { extractParents } from "@/utils/util";

export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$store.getters.menus);
  },
  methods: {
    goto(menu) {
      this.$router.push(menu.path);
    },
    Logout() {
      this.$store.dispatch("doLogout").then(() => {
        this.$nextTick(() => {
          window.location.reload();
        });
      });
    }
  },
  computed: {
    breadcrumbs() {
      const _path = this.$store.getters.active;
      const _menus = this.$store.getters.menus;
      const bs = extractParents(_menus)(_path);
      return bs.map(x => x.meta.title);
    },
    cStyle() {
      const { path } = this.$route;
      return {
        [path.replace(/\/|\./g, "_")]: true
      };
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
  text-align: right;
}
</style>

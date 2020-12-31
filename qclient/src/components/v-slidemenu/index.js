import { mapState } from "vuex";
export default {
  name: "v-slideMneu",
  render(h) {
    return (
      <Menu
        active-name={this.activeName}
        theme="light"
        width="auto"
        open-names={this.openNames}
      >
        {this.menus.map((item) => {
          if (item.children) {
            return (
              <Submenu name={item.title}>
                <template slot="title">
                  <Icon type={item.icon}></Icon>
                  {item.title}
                </template>
                {item.children.map((sub) => {
                  return <MenuItem name={sub.name} to={sub.path}>{sub.title}</MenuItem>;
                })}
              </Submenu>
            );
          } else {
            return (
              <MenuItem name={item.name} to={item.path}>
                <Icon type={item.icon}></Icon>
                {item.title}
              </MenuItem>
            );
          }
        })}
      </Menu>
    );
  },
  data() {
    return {
      activeName: "",
      openNames: ["home"],
    };
  },
  computed: {
    ...mapState("menu", ["menus"]),
  },
  mounted() {
    this.activeName = this.$route.name
  },
};

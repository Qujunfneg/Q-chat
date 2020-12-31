export default {
  data() {
    return {
      columns: [],
      tableData: [],
      showIndex: true,
      current:1,
      pageSize:10
    };
  },
  mounted() {
    if (this.showIndex) {
      this.columns.unshift({
        type: "index",
        width: 60,
        align: "center",
      });
    }
  },
  methods: {
    pageChange(){
        
    }
  },
};

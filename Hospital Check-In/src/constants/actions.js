import Search from "../components/Search";

const actions = {
  search: {
    name: "Search",
    component: Search
  },
  check_in: {
    name: "Check-in",
    link: "/entity/check_in/new"
  },
  check_out: {
    name: "Check-out",
    link: "/entity/check_out/new"
  }
};

export default actions;

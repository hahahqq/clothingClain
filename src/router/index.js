import routes from './routers'
import VueRouter from "vue-router";

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
   let user = JSON.parse(sessionStorage.getItem("userFZBInfo"));
   if (!user && to.path != "/login") {
      next({ path: "/login" });
   } else {
      next();
   }
});


export default router

import Router from "./core/router";
import { NewsDtailView, NewsFeedView } from "./page";
import Store from "./store";

const store = new Store();
const router: Router = new Router();
const newsFeedView = new NewsFeedView("root", store);
const newsDetailView = new NewsDtailView("root", store);

router.setDefaultPage(newsFeedView);
router.addRoutePath("/page/", newsFeedView);
router.addRoutePath("/show/", newsDetailView);

router.route();

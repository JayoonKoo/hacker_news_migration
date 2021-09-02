import { Store } from "./types";
import Router from "./core/router";
import { NewsDtailView, NewsFeedView } from "./page";

export const store: Store = {
  currentPage: 1,
  feeds: [],
};

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root");
const newsDetailView = new NewsDtailView("root");

router.setDefaultPage(newsFeedView);
router.addRoutePath("/page/", newsFeedView);
router.addRoutePath("/show/", newsDetailView);

router.route();

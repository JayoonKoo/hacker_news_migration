import View from "../core/view";
import { NewsDetailApi } from "../core/api";
import { NewsDetail, NewsComment } from "../types";

const template = `
<div class="bg-gray-600 min-h-screen pb-8">
	<div class="bg-white text-xl">
		<div class="mx-auto px-4">
			<div class="flex justify-between items-center py-6">
				<div class="flex justify-start">
					<h1 class="font-extrabold">Hacker News</h1>
				</div>
				<div class="items-center justify-end">
					<a href="#/page/{{__currentPage__}}" class="text-gray-500">
						<i class="fa fa-times"></i>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="h-full border rounded-xl bg-white m-6 p-4 ">
		<h2>{{__title__}}</h2>
		<div class="text-gray-400 h-20">
			{{__content__}}
		</div>

		{{__comments__}}

	</div>
</div>
`;

export default class NewsDtailView extends View {
  constructor(containerId: string) {
    super(containerId, template);
  }

  render() {
    const id = location.hash.substr(7);
    const api = new NewsDetailApi();
    const newsDetail: NewsDetail = api.getData(id);

    for (let i = 0; i < window.store.feeds.length; i++) {
      if (window.store.feeds[i].id === Number(id)) {
        window.store.feeds[i].read = true;
        break;
      }
    }

    this.setTmeplateData("comments", this.makeComent(newsDetail.comments));
    this.setTmeplateData("currentPage", String(window.store.currentPage));
    this.setTmeplateData("title", newsDetail.title);
    this.setTmeplateData("content", newsDetail.content);

    this.updateView();
  }

  private makeComent(comments: NewsComment[]): string {
    for (let i = 0; i < comments.length; i++) {
      const comment: NewsComment = comments[i];
      const { level, user, time_ago, content } = comment;
      this.addHtml(`
				<div style="padding-left: ${level * 40}px;" class="mt-4">
					<div class="text-gray-400">
						<i class="fa fa-sort-up mr-2"></i>
						<strong>${user}</strong> ${time_ago}
					</div>
					<p class="text-gray-700">${content}</p>
				</div>
			`);

      if (comment.comments.length > 0) {
        this.addHtml(this.makeComent(comment.comments));
      }
    }

    return this.getHtml();
  }
}

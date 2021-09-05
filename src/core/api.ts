import { NewsFeed, NewsDetail } from "../types/";
import { NEWS_URL, CONTENT_URL } from "../config";

export class Api {
  private xhr: XMLHttpRequest;
  private url: string;

  constructor(url: string) {
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  protected getRequestWithXHR<AjaxResponse>(
    cb: (data: AjaxResponse) => void
  ): void {
    this.xhr.open("GET", this.url);
    this.xhr.send();
    this.xhr.addEventListener("load", () => {
      cb(JSON.parse(this.xhr.response) as AjaxResponse);
    });
  }

  protected getRequestWithPromise<PromiseResponse>(
    cb: (data: PromiseResponse) => void
  ): void {
    fetch(this.url)
      .then((response) => response.json())
      .then(cb)
      .catch(() => console.log("데이터를 불러올수 없습니다."));
  }
}

export class NewsFeedApi extends Api {
  constructor() {
    super(NEWS_URL);
  }

  getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }

  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  constructor(id: string) {
    super(CONTENT_URL.replace("@id", id));
  }

  getDataWithXHR(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }

  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}

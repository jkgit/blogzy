import http from "./http-common";
class PostService {
  getAll(page) {
     if (!page)
      page = 0;
     return http.get("/posts?p="+page);
     }
  get(id) {
     return http.get(`/posts/${id}`);
     }
  create(data) {
     return http.post("/posts", data);
     }
  update(id, data) {
     return http.put(`/posts/${id}`, data);
     }
  delete(id) {
     return http.delete(`/posts/${id}`);
     }
}
export default new PostService();

http.interceptors.request.use(config => {
  config.headers.common['Authorization'] = localStorage.getItem("token");
  return config;
});
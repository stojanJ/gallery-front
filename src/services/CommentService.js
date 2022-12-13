import { httpService } from "./HttpService";

class CommentService {
    constructor() {
        this.axiosInstance = httpService.axiosInstance;
        this.setAxiosAuthorizationHeader();
      }
  
      setAxiosAuthorizationHeader(tokenParam = null) {
          let token = tokenParam ? tokenParam : localStorage.getItem("token");
      
          if (token) {
            this.axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
          }
        }

  async getAll() {
    const response = await this.axiosInstance.get("/comment");
    return response.data;
  }
  
  
  async get(id) {
    const response = await this.axiosInstance.get(`/comment/${id}`);
    return response.data;
  }
  async add(urls, id) {
    const response = await this.axiosInstance.post('/comment', urls);
    return response.data;
  }
  

  async delete(id) {
    const response = await this.axiosInstance.delete(`/comment/${id}`);
    return response.data;
  }
 
}

export const commentService = new CommentService();
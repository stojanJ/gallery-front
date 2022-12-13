import { httpService } from "./HttpService";

class ImageService {
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
    const response = await this.axiosInstance.get("/images");
    return response.data;
  }


  async get(id) {
    const response = await this.axiosInstance.get(`/images/${id}`);
    return response.data;
  }
  async add(urls, id) {
    const response = await this.axiosInstance.post('/images', {urls});
    return response.data;
  }
  

  async delete(id) {
    const response = await this.axiosInstance.delete(`/images/${id}`);
    return response.data;
  }
 
}

export const imageService = new ImageService();
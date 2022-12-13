import { httpService }  from "./HttpService";
    
 class GalleryService {
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
    const response = await  this.axiosInstance.get("/gallery");
    return response.data;
  }

  async get(id) {
    const response = await  this.axiosInstance.get(`/gallery/${id}` );
    return response.data;
  }

  async add(newGallery) {
    const response = await  this.axiosInstance.post('/gallery', newGallery);
    return response.data;
  }
  async edit(id, newGallery) {
    try {
      const { data } = await  this.axiosInstance.put(`/gallerys/${id}`, newGallery);

      return data;
    } catch (error) {
    }

    return null;
  }

  async getGallerisByUserId(userId) {
    const response = await  this.axiosInstance.get(`gallery/users/${userId}`);
    return response.data;
  }

  async delete(id) {
    const response = await  this.axiosInstance.delete(`/gallerys/${id}`);
    return response.data;
  }
  async addComment(GalleryId, comment){
    const response = await  this.axiosInstance.post(`/gallerys/${GalleryId}/comments`,comment,GalleryId);
    return response.data;
  }

}

export const galleryService = new GalleryService();
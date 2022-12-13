import { httpService } from "./HttpService";

class AuthService {
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

  async register(data) {
    const response = await this.axiosInstance.post("/register", data);
    localStorage.setItem("token", response.data.authorisation.token);
    this.setAxiosAuthorizationHeader(response.data.authorisation.token);

    return response;
  }

  async login(data) {
    const response = await this.axiosInstance.post("/login", data);
    localStorage.setItem("token", response.data.authorisation.token);
    this.setAxiosAuthorizationHeader(response.data.authorisation.token);
    return response;
  }
  

  async logout(data) {
    const response = await this.axiosInstance.post("/logout", data);
    this.setAxiosAuthorizationHeader('');

    return response;
  }

  async refresh() {
    const response = await this.axiosInstance.post("/refresh");
    localStorage.setItem("token", response.data.authorisation.token);
    this.setAxiosAuthorizationHeader(response.data.authorisation.token);

    return response;
  }
  async getAll() {
    const response = await this.axiosInstance.get("/authors");
    return response.data;
  }
}

export const authService = new AuthService();
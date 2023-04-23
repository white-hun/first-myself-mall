import axios from "axios";

export default class ProductClient {
  async product() {
    return axios.get("/data/products.json");
  }
}

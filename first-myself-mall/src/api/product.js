export default class Product {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  async test() {
    return this.#testProduct();
  }

  async #testProduct() {
    return this.apiClient.product().then((res) => res?.data?.items);
  }
}

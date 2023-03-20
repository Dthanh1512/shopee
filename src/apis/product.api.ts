import { Product, ProductList } from './../types/product.type'
import { ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/ultis.type'

const URL = 'products'
const productApi = {
  getProduct: (params: ProductListConfig) =>
    http.get<SuccessResponse<ProductList>>(URL, {
      params
    }),
  getProductDetail: (id: string) => {
    http.get<SuccessResponse<Product>>(`{URL}/${id}`)
  }
}
export default productApi

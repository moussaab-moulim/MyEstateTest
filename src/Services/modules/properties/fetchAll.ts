import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Property } from '.'

interface PropertyResponse {
  count: number
  response: Property[]
}
export default (build: EndpointBuilder<any, any, any>) =>
  build.query<PropertyResponse, void>({
    query: () => ({
      url: '/properties/getAll',
      method: 'POST',
    }),
    transformResponse: (response, meta, arg) => {
      const customResponse: PropertyResponse = {
        count: response.count,
        response: response.response.map((res: any) => ({
          ...res,
          features: JSON.parse(res.features),
          images: JSON.parse(res.images),
        })),
      }
      return customResponse
    },
  })

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetKpisResponse, GetProductsResponse } from './types'

const getBaseUrl = () => import.meta.env.BASE_URL

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseUrl(),
    }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis",
            providesTags: ["Kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products",
            providesTags: ["Products"]
        })
    })
})

export const { useGetKpisQuery, useGetProductsQuery } = api
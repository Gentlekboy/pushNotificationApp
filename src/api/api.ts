import {BASE_URL} from "@env";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import {GetPointOfInterest, SendPushRequest, SendPushResponse} from "./types";
import {BaseQueryFn, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";

const baseQueryWithLogging: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  // Log the request details
  console.log(`[[${api.endpoint} Request]]`, args);

  const result = await fetchBaseQuery({baseUrl: BASE_URL})(
    args,
    api,
    extraOptions,
  );

  // Log the response details
  console.log(`[[${api.endpoint} Response]]`, result);

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithLogging,
  endpoints: builder => ({
    getPointOfInterest: builder.query<GetPointOfInterest, void>({
      query: () => "admin/pois",
    }),
    sendPush: builder.mutation<SendPushResponse, SendPushRequest>({
      query: (body: SendPushRequest) => ({
        url: "notifications/send-push",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {useLazyGetPointOfInterestQuery, useSendPushMutation} = api;

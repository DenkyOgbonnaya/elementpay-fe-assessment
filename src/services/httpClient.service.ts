// define common helper methods for making http requests

import httpClient from "@/libs/axios.lib";

export const handleGetRequest = async <T>(payload: string): Promise<T> => {
  const { data } = await httpClient.get(payload);
  return data;
};

export const handlePostRequest = async <T, G>(
  path: string,
  payload: T
): Promise<G> => {
  const { data } = await httpClient.post(`${path}`, payload);
  return data;
};
export const handlePutRequest = async <T, G>(
  path: string,
  payload: T
): Promise<G> => {
  const { data } = await httpClient.put(`${path}`, payload);
  return data;
};
export const handlePatchRequest = async <T, G>(
  path: string,
  payload: T
): Promise<G> => {
  const { data } = await httpClient.patch(`${path}`, payload);

  return data;
};
export const handleDeleteRequest = async <T>(payload: string): Promise<T> => {
  const { data } = await httpClient.delete(`${payload}`);
  return data;
};

import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { v4 as uuid4 } from "uuid";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export interface requestStateSchema {
  isFetching: boolean;
  statusClass: string;
  errorMessage: string | null;
  progress: number | null;
  cancelToken: null; //本專案保留但不實作取消功能
}

export const initState: requestStateSchema = {
  isFetching: false,
  statusClass: "bg-blue-500",
  errorMessage: null,
  progress: null,
  cancelToken: null,
};

const useHttpHandler = () => {
  const [requestState, setRequestState] =
    useState<requestStateSchema>(initState);
  let userId = localStorage.getItem("userId");
  if (!userId) {
    const newId: string = uuid4();
    userId = newId;
    localStorage.setItem("userId", userId);
  }

  const fetchData = async (url: string) => {
    try {
      setRequestState({ ...initState, isFetching: true });
      const response: AxiosResponse = await axios.get(API_URL + url);
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-green-500",
        isFetching: false,
      }));
      return response.data;
    } catch (error) {
      console.error(error);
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-red-500",
        errorMessage:
          error instanceof AxiosError
            ? error.response?.data?.message ||
              "Something went wrong when fetching the data."
            : "Occurred an error when fetching the data.",
        isFetching: false,
      }));
    }
  };

  const postData = async (url: string, body: object) => {
    try {
      setRequestState({ ...initState, isFetching: true });
      const response: AxiosResponse = await axios.post(API_URL + url, body, {
        headers: {
          "Content-Type": "application/json",
          "X-User": userId,
        },
      });
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-green-500",
        isFetching: false,
      }));
      return response.data;
    } catch (error) {
      console.error(error);
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-red-500",
        errorMessage:
          error instanceof AxiosError
            ? error.response?.data?.message ||
              "Something went wrong when sending the data."
            : "Occurred an error when sending the data.",
        isFetching: false,
      }));
    } finally {
      setRequestState((prev) => ({ ...prev, isFetching: false }));
    }
  };

  const postFile = async (url: string, file: File) => {
    try {
      setRequestState({ ...initState, isFetching: true });
      const formData = new FormData();
      formData.append("file", file);
      const response: AxiosResponse = await axios.post(
        API_URL + url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (
              progressEvent.total !== null &&
              progressEvent.total !== undefined
            ) {
              const uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setRequestState((prev) => ({
                ...prev,
                progress: uploadProgress,
              }));
            }
          },
        }
      );
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-green-500",
        isFetching: false,
      }));
      return response.data;
    } catch (error) {
      console.error(error);
      setRequestState((prev) => ({
        ...prev,
        statusClass: "bg-red-500",
        errorMessage:
          error instanceof AxiosError
            ? error.response?.data?.message ||
              "Something went wrong when fetching the file."
            : "Occurred an error when fetching the file.",
        isFetching: false,
      }));
    } finally {
      setRequestState((prev) => ({ ...prev, isFetching: false }));
    }
  };

  return { requestState, setRequestState, fetchData, postData, postFile };
};
export default useHttpHandler;

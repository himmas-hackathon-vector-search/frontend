import { useState } from "react";
import axios, { AxiosResponse } from "axios";

const useHttpHandler = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<object | null>(null);

  const fetchData = async (url: string) => {
    try {
      setIsFetching(true);
      setErrorMessage(null);
      const response: AxiosResponse = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong when fetching the data."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const postData = async (url: string, body: object) => {
    try {
      setIsFetching(true);
      setErrorMessage(null);
      const response: AxiosResponse = await axios.post(url, body);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong when sending the data."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const postFile = async (url: string, file: File) => {
    try {
      setIsFetching(true);
      setErrorMessage(null);
      const formData = new FormData();
      formData.append("file", file);
      const response: AxiosResponse = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong when sending the file."
      );
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, errorMessage, data, fetchData, postData, postFile };
};
export default useHttpHandler;

import { useState, useEffect } from "react";
import * as TYPES from "../types";
import axios from "axios";

export const useFetch = (method: string, url: string, body?: {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<TYPES.ContactProps[]>([]);
  const [serverError, setServerError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const resp = await axios({
          method,
          url,
          data: body,
        });
        const data = await resp?.data;

        setContacts(data);
      } catch (error) {
        console.log(error);
        setServerError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { isLoading, contacts, serverError };
};

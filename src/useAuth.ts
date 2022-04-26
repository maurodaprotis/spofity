import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const API_URL = "http://localhost:8888/.netlify/functions";

export const useAuth = (code: string) => {
  console.log("🚀 ~ file: useAuth.ts ~ line 7 ~ useAuth ~ code", code);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((json) => {
        setAccessToken(json.accessToken);
        setRefreshToken(json.refreshToken);
        setExpiresIn(json.expiresIn);

        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      fetch(`${API_URL}/refresh`, {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .then((json) => {
          setAccessToken(json.accessToken);
          setExpiresIn(json.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return {
    accessToken,
  };
};

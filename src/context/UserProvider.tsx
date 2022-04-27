import { createContext, useEffect, useState } from "react";
import { Login } from "../components/Login";
import { API_URL } from "../constants";

export const AuthContext = createContext<{ accessToken: string | null }>({
  accessToken: null,
});

/*
 * The Auth Provider would act as a gateway for the login process.
 */
export const AuthProvider = ({
  code,
  children,
}: {
  code: string | null;
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  /*
   * Handle the login flow
   * Once Spotify give us a valid code we can use it to obtain an access token
   */
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

        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        window.location.replace("/");
      });
  }, [code]);

  /*
   * Handle token refresh when the access token expires
   */
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
          window.location.replace("/");
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
      }}
    >
      {code && accessToken ? children : <Login />}
    </AuthContext.Provider>
  );
};

import { useAuth } from "./useAuth";

export const Dashboard = ({ code }: { code: string }) => {
  const { accessToken } = useAuth(code);
  return (
    <div className="bg-green-500">
      <h1>Dashboard {code}</h1>
      <h2>Access Token:{accessToken}</h2>
    </div>
  );
};

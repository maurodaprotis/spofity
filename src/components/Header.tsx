import { useUser } from "../hooks/useUser";
import { Logo } from "./Logo";

export const Header = () => {
  const { data: user } = useUser();

  return (
    <header className="w-full h-16 p-4 flex justify-between">
      <div className="flex h-8">
        <Logo />
      </div>
      <div className="flex items-center justify-between">
        <div className="mr-3">{user?.display_name}</div>
        <img
          className="h-8 w-8 rounded-full bg-gray-200 shadow-inner"
          src={user?.images[0].url}
          alt={user?.display_name}
        ></img>
      </div>
    </header>
  );
};

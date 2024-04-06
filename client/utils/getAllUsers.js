import { path } from "./apiRoutes";

export const getAllUsers = async () => {
  const res = await fetch(`${path}users`, {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "success") return data.users;
  return null;
};

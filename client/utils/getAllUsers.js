export const getAllUsers = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/users", {
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status === "success") return data.users;
  return null;
};

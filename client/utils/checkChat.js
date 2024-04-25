import { path } from "./apiRoutes";

export const checkChat = async (currentUserId, userId) => {
  console.log(currentUserId);
  console.log(userId);
  const res = await fetch(`${path}chats/checkChat`, {
    method: "POST",
    body: JSON.stringify({
      sender: currentUserId,
      receiver: userId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

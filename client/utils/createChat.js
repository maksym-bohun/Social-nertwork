import { path } from "./apiRoutes";

export const createChat = async (
  currentUserId,
  userId,
  message,
  type = "text"
) => {
  const res = await fetch(`${path}chats/`, {
    method: "POST",
    body: JSON.stringify({
      sender: currentUserId,
      receiver: userId,
      lastMessage: message,
      lastMessageIsPost: type === "post",
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();
  return data.chat;
};

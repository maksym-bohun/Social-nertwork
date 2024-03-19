const postImage = (file, setAvatar) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "social-network");
  data.append("cloud_name", "dtmb4jiv4");
  fetch("https://api.cloudinary.com/v1_1/dtmb4jiv4/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      setAvatar(data.secure_url);
    })
    .catch((err) => console.log("Err ", err));
};

export default postImage;

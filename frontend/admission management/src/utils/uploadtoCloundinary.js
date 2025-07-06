// src/utils/uploadToCloudinary.js

export const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "test01"); // Replace with your actual preset
    formData.append("folder", media/counsel); // Optional: Cloudinary folder
  
    const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }
  
    return data.secure_url;
  };
  
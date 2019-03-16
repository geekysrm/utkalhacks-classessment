const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "marvellous",
  api_key: "635633423554395",
  api_secret: "_Zrw18PrULBIZvWcCCpF4mjujho"
});

// const uploadImage = image => {
//   cloudinary.v2.uploader.upload(image, (error, result) => {
//     const uploadedUrl = result.url;
//     return uploadedUrl;
//   });
// };

function uploadImage(image) {
  console.log(image);
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (error, result) => {
      console.log(result);
      const uploadedUrl = result.url;
      resolve(uploadedUrl);
      // reject(error);
    });
    // xhr.onload = () => resolve(xhr.responseText);
    // xhr.onerror = () => reject(xhr.statusText);
    // xhr.send();
  });
}

module.exports = uploadImage;

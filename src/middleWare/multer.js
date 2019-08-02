import multer from "multer";
import s3Storage from "multer-sharp-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY
});

const multerPhoto = multer({
  storage: s3Storage({
    s3,
    Acl: "public-read",
    Bucket: "gaegosu/photo",
    resize: {
      width: 600,
      heigth: 600
    }
  })
});

const uploadPhoto = multerPhoto.single("photo");

export default uploadPhoto;

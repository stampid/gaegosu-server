import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  accessKeyId: process.env.AWS_KEY
});

const multerPhoto = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "gaegosu/photo"
  })
});

const multerProfile = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "gaegosu/profile"
  })
});

export const uploadPhoto = multerPhoto.single("photo");

export const uploadProfile = multerProfile.single("profile");

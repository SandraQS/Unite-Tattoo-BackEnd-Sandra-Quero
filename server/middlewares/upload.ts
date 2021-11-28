import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);

      const newFilename = `${
        req.body.tattooStyles
      }-${Date.now()}-${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
  limits: {
    fileSize: 8000000,
  },
});

export default upload;

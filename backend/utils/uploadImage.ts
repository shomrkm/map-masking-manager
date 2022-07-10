import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const MAX_FILE_SIZE: number = 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}${ext}`);
    req.params.filename = `${req.params.id}${ext}`;
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
    file.mimetype !== 'image/png' &&
    file.mimetype !== 'image/jpg' &&
    file.mimetype !== 'image/jpeg'
  ) {
    cb(null, false);
    return cb(new Error('Avatar image allows only png/jpg/jpeg format'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

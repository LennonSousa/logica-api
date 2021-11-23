import fs from 'fs';
import multer from "multer";
import path from 'path';

type uploadType = "notes" | "stores" | "projects" | "incomings";

export function UploadsConfig(type: uploadType) {
    const config = {
        storage: multer.diskStorage({
            destination: function (req, _file, cb) {
                const { id } = req.params;

                const dirPath = path.join(__dirname, '..', '..', process.env.UPLOADS_DIR, type, type !== 'stores' && id ? id : '');

                try {
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath)
                    }
                } catch (err) {
                    console.error(err);
                }

                cb(null, dirPath);
            },
            filename: (_request, file, cb) => {
                const fileName = `${Date.now()}-${file.originalname}`;

                cb(null, fileName);
            }
        }),
        limits: {
            fileSize: 200 * 1024 * 1024,
        }
    }

    return multer(config);
};
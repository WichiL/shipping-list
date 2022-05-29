import AvatarModel from "../graphql/models/UsersAvatars/UsersAvatarsModel";
import shortid from "shortid";
import moment from "moment";
import fs from "fs";
import path from "path";

export const UploadAvatar = async ({ file, transaction, idAvatar }: any) => {
  try {
    const { createReadStream, mimetype, filename } = await file;

    if (!mimetype.includes("image")) {
      return false;
    }

    const extension = filename.slice(
      ((filename.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const newFileName = `${shortid()}_${moment().format(
      "YYYYMMDDhmmss"
    )}.${extension}`;

    const stream = createReadStream();
    const pathName = path.join(
      __dirname,
      `./../../public/avatars/${newFileName}`
    );
    await stream.pipe(fs.createWriteStream(pathName));

    await AvatarModel.update(
      {
        avatar_url: newFileName,
      },
      { where: { id: idAvatar }, transaction }
    );

    // if (tmpName) {
    //   const pathName = path.join(__dirname, `./../../public/tmp/${filename}`);
    //   fs.unlinkSync(pathName);
    // }
    return true;
  } catch (error) {
    await transaction.rollback();
    return false;
  }
};

export const DeletePreviousAvatar = async ({ previous }: any) => {
  try {
    const pathName = path.join(__dirname, `./../../public/avatars/${previous}`);
    fs.unlinkSync(pathName);
    return true;
  } catch (e) {
    return false;
  }
};

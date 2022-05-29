"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePreviousAvatar = exports.UploadAvatar = void 0;
const UsersAvatarsModel_1 = __importDefault(require("../graphql/models/UsersAvatars/UsersAvatarsModel"));
const shortid_1 = __importDefault(require("shortid"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UploadAvatar = ({ file, transaction, idAvatar }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { createReadStream, mimetype, filename } = yield file;
        if (!mimetype.includes("image")) {
            return false;
        }
        const extension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
        const newFileName = `${(0, shortid_1.default)()}_${(0, moment_1.default)().format("YYYYMMDDhmmss")}.${extension}`;
        const stream = createReadStream();
        const pathName = path_1.default.join(__dirname, `./../../public/avatars/${newFileName}`);
        yield stream.pipe(fs_1.default.createWriteStream(pathName));
        yield UsersAvatarsModel_1.default.update({
            avatar_url: newFileName,
        }, { where: { id: idAvatar }, transaction });
        // if (tmpName) {
        //   const pathName = path.join(__dirname, `./../../public/tmp/${filename}`);
        //   fs.unlinkSync(pathName);
        // }
        return true;
    }
    catch (error) {
        yield transaction.rollback();
        return false;
    }
});
exports.UploadAvatar = UploadAvatar;
const DeletePreviousAvatar = ({ previous }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pathName = path_1.default.join(__dirname, `./../../public/avatars/${previous}`);
        fs_1.default.unlinkSync(pathName);
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.DeletePreviousAvatar = DeletePreviousAvatar;

import { RequestHandlerWithFiles } from "../../types/express";
import catchAsync from "../../utility/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utility/sendResponse";
import { RequestHandler } from "express";
// import BlogServices from "./settings.services";
// import AppError from "../../app/error/AppError";
import GenericService from "../../utility/genericService.helpers";
// import Blog from "./settings.model";
// import { idConverter } from "../../utility/idConverter";
// import NotificationServices from "../notification/notification.service";
import SettingsServices from "./settings.services";
import { ISettings } from "./settings.interface";
import Settings from "./settings.model";

const upsertSettings: RequestHandlerWithFiles = catchAsync(async (req, res) => {
  // console.log("Upsert Settings Inputs:", {
  //   body: req.body,
  //   files: req.files,
  //   user: req.user,
  //   headers: req.headers,
  // });

  // if (!req.user._id) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Admin is required");
  // }
  // req.body.data.admin = req.user._id;

  const result = await SettingsServices.upsertSettingsIntoDb(req.body.data);

  // await NotificationServices.sendNoification({
  //   ownerId: req.user?._id,
  //   key: "notification",
  //   data: {
  //     id: result.settings?._id.toString(),
  //     message: `${req.body?.type} upserted successfully`,
  //   },
  //   receiverId: [req.user?._id],
  //   notifyAdmin: true,
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "successfully upserted Settings",
    data: result,
  });
});

// const getBlog: RequestHandler = catchAsync(async (req, res) => {
//   const { authorId } = req.body.data;
//   if (!authorId) {
//     throw new AppError(httpStatus.NOT_FOUND, `Author:${authorId} not found`);
//   }
//   const result = await GenericService.findResources<IBlog>(
//     Blog,
//     await idConverter(authorId)
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Successfully retrieved blog",
//     data: result,
//   });
// });

const getSettings: RequestHandler = catchAsync(async (req, res) => {
  const result = await GenericService.findAllResources<ISettings>(
    Settings,
    req.query,
    ["type", "content"]
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Successfully retrieved all settings",
    data: result,
  });
});

// const updateBlog: RequestHandler = catchAsync(async (req, res) => {
//   if (!req.user) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
//   }
//   const vendor = req.user?._id;
//   console.log("userId: ", vendor.toString());

//   if (!vendor) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Vendor ID is required", "");
//   }
//   req.body.data.author = vendor;
//   const result = await BlogServices.updateBlogIntoDb(req.body.data);

//   await NotificationServices.sendNoification({
//     ownerId: req.user?._id,
//     key: "notification",
//     data: {
//       id: result.blog?._id.toString(),
//       message: `A blog updated`,
//     },
//     receiverId: [req.user?._id],
//     notifyAdmin: true,
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "successfully updated blog",
//     data: result,
//   });
// });

// const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
//   if (!req.user) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated", "");
//   }
//   const vendor = req.user?._id;
//   console.log("userId: ", vendor.toString());
//   if (!vendor) {
//     throw new AppError(httpStatus.NOT_FOUND, "Author ID is required", "");
//   }
//   const { blogId } = req.body.data;
//   if (!blogId) {
//     throw new AppError(httpStatus.NOT_FOUND, "blogId is required", "");
//   }

//   req.body.data.author = vendor;
//   const result = await GenericService.deleteResources<IBlog, "author">(
//     Blog,
//     blogId,
//     await idConverter(vendor),
//     "author"
//   );

//   await NotificationServices.sendNoification({
//     ownerId: req.user?._id,
//     key: "notification",
//     data: {
//       message: `A blog deleted`,
//     },
//     receiverId: [req.user?._id],
//     notifyAdmin: true,
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "successfully deleted a blog",
//     data: result,
//   });
// });

// const deleteAllBlog: RequestHandler = catchAsync(async (req, res) => {
//   console.log("BlogController.createNewGame - Inputs:", {
//     body: req.body.data,
//     headers: req.headers,
//   });

//   const result = await BlogServices.deleteAllBlogIntoDb();
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "All blogs deleted perfectly",
//     data: result,
//   });
// });

const SettingsController = {
  upsertSettings,
  getSettings,
  // getAllBlog,
  // updateBlog,
  // deleteBlog,
  // deleteAllBlog,
};

export default SettingsController;

const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path');

const multipartUpload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './uploads');},
    filename: function (req, file, callback) { callback(null, Date.now() +path.extname(file.originalname)) }})
}).single('bookCover');

const adminController = require('../app/controllers/AdminController');
const middlewareController = require('../app/controllers/middlewareController');

                            // QUẢN LÝ SÁCH
// khôi phục sách từ thùng rác
router.patch('/book/:id/restore',middlewareController.verifyTokenAndAdminAuth, adminController.restoreBook);
// hành động select các checkbox từ form sách
router.post('/book/handle-form-action',middlewareController.verifyTokenAndAdminAuth, adminController.handleFormAction);
// hành động select các checkbox từ form thùng rác
router.post(
    '/book/handle-form-trash-action',
    adminController.handleFormTrashAction,middlewareController.verifyTokenAndAdminAuth,
);
// Hiển thị danh sách sách
router.get('/book', middlewareController.verifyTokenAndAdminAuth, adminController.listBook);
// Thùng rác
router.get('/book/trash', adminController.trashBook);
// thêm mới sách tại form input vao DB
router.post('/book/createBookData',middlewareController.verifyTokenAndAdminAuth, multipartUpload , adminController.createBookData);
// Xóa mềm sách với id => vào thùng rác
router.delete('/book/:id/delete',middlewareController.verifyTokenAndAdminAuth, adminController.deleteBook);
// xóa vĩnh viễn sách
router.delete('/book/:id/delete/force',middlewareController.verifyTokenAndAdminAuth, adminController.forceDeleteBook);
// sửa sách => form sửa sach
router.get('/book/:id/edit',middlewareController.verifyTokenAndAdminAuth, adminController.editBook);
// Sửa sách với id
router.put('/book/:id',middlewareController.verifyTokenAndAdminAuth, adminController.updateBook);
// thêm sách
router.get('/book/create',middlewareController.verifyTokenAndAdminAuth, adminController.createBook);




                            // QUẢN LÝ CHAPTER
// hiển thị list chapter
router.get('/chapter',middlewareController.verifyTokenAndAdminAuth, adminController.chapter);
//hiển thị form thêm mới chapter
router.get('/chapter/create',middlewareController.verifyTokenAndAdminAuth, adminController.createChapter);
// submit lưu data chapter mới tại form vào db
router.post('/chapter/createChapterData',middlewareController.verifyTokenAndAdminAuth, adminController.createChapterData);
// Xóa mềm sách với id => vào thùng rác
router.delete('/chapter/:id/delete',middlewareController.verifyTokenAndAdminAuth, adminController.deleteChapter);
// xóa vĩnh viễn sách
router.delete('/chapter/:id/delete/force',middlewareController.verifyTokenAndAdminAuth, adminController.forceDeleteChapter);
// khôi phục sách từ thùng rác
router.patch('/chapter/:id/restore',middlewareController.verifyTokenAndAdminAuth, adminController.restoreChapter);
// Thùng rác
router.get('/chapter/trash',middlewareController.verifyTokenAndAdminAuth, adminController.trashChapter);
// hành động select các checkbox từ form sách
router.post('/chapter/handle-form-action',middlewareController.verifyTokenAndAdminAuth, adminController.handleFormActionChapter);
// hành động select các checkbox từ form thùng rác
router.post(
    '/chapter/handle-form-trash-action', middlewareController.verifyTokenAndAdminAuth,
    adminController.handleFormTrashActionChapter,
);
// sửa sách => form sửa sach
router.get('/chapter/:id/edit', middlewareController.verifyTokenAndAdminAuth, adminController.editChapter);
// Sửa sách với id
router.put('/chapter/:id', middlewareController.verifyTokenAndAdminAuth, adminController.updateChapter);



                                // QUẢN LÝ GENRE
// hiển thị list genre
router.get('/genre', middlewareController.verifyTokenAndAdminAuth, adminController.genre);
//hiển thị form thêm mới genre
router.get('/genre/create', middlewareController.verifyTokenAndAdminAuth, adminController.createGenre);
// submit lưu data genre mới tại form vào db
router.post('/genre/createGenreData', middlewareController.verifyTokenAndAdminAuth, adminController.createGenreData);
// Xóa mềm thể loại với id => vào thùng rác
router.delete('/genre/:id/delete', middlewareController.verifyTokenAndAdminAuth, adminController.deleteGenre);
// Thùng rác
router.get('/genre/trash', middlewareController.verifyTokenAndAdminAuth, adminController.trashGenre);
// xóa vĩnh viễn sách
router.delete('/genre/:id/delete/force', middlewareController.verifyTokenAndAdminAuth, adminController.forceDeleteGenre);

// sửa sách => form sửa sach
router.get('/genre/:id/edit', middlewareController.verifyTokenAndAdminAuth, adminController.editGenre);
// Sửa sách với id
router.put('/genre/:id', middlewareController.verifyTokenAndAdminAuth, adminController.updateGenre);
// khôi phục sách từ thùng rác
router.patch('/genre/:id/restore', middlewareController.verifyTokenAndAdminAuth, adminController.restoreGenre);
// hành động select các checkbox từ form thể loại
router.post('/genre/handle-form-action', middlewareController.verifyTokenAndAdminAuth, adminController.handleFormActionGenre);
// hành động select các checkbox từ form thùng rác
router.post(
    '/genre/handle-form-trash-action', middlewareController.verifyTokenAndAdminAuth,
    adminController.handleFormTrashActionGenre,
);

                 // QUẢN LÝ User
// hiển thị list User
router.get('/user', middlewareController.verifyTokenAndAdminAuth, adminController.user);
// Xóa mềm thể loại với id => vào thùng rác
router.delete('/user/:id/delete',middlewareController.verifyTokenAndAdminAuth, adminController.deleteUser);
// Thùng rác
router.get('/user/trash',middlewareController.verifyTokenAndAdminAuth, adminController.trashUser);
// xóa vĩnh viễn sách
router.delete('/user/:id/delete/force',middlewareController.verifyTokenAndAdminAuth, adminController.forceDeleteUser);

// khôi phục sách từ thùng rác
router.patch('/user/:id/restore',middlewareController.verifyTokenAndAdminAuth, adminController.restoreUser);
// hành động select các checkbox từ form thể loại
router.post('/user/handle-form-action-user',middlewareController.verifyTokenAndAdminAuth, adminController.handleFormActionUser);
// hành động select các checkbox từ form thùng rác
router.post(
    '/user/handle-form-trash-action',middlewareController.verifyTokenAndAdminAuth,
    adminController.handleFormTrashActionUser,
);

// sửa sách => form sửa sach
router.get('/user/:id/edit',middlewareController.verifyTokenAndAdminAuth, adminController.editUser);
// Sửa sách với id
router.put('/user/:id',middlewareController.verifyTokenAndAdminAuth, adminController.updateUser);


router.get('/',middlewareController.verifyTokenAndAdminAuth, adminController.index);

module.exports = router;

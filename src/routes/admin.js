const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const adminController = require('../app/controllers/AdminController');

                            // QUẢN LÝ SÁCH
// khôi phục sách từ thùng rác
router.patch('/book/:id/restore', adminController.restoreBook);
// hành động select các checkbox từ form sách
router.post('/book/handle-form-action', adminController.handleFormAction);
// hành động select các checkbox từ form thùng rác
router.post(
    '/book/handle-form-trash-action',
    adminController.handleFormTrashAction,
);
// Hiển thị danh sách sách
router.get('/book', adminController.listBook);
// Thùng rác
router.get('/book/trash', adminController.trashBook);
// thêm mới sách tại form input vao DB
router.post('/book/createBookData', upload.single('bookCover'), adminController.createBookData);
// Xóa mềm sách với id => vào thùng rác
router.delete('/book/:id/delete', adminController.deleteBook);
// xóa vĩnh viễn sách
router.delete('/book/:id/delete/force', adminController.forceDeleteBook);
// sửa sách => form sửa sach
router.get('/book/:id/edit', adminController.editBook);
// Sửa sách với id
router.put('/book/:id', adminController.updateBook);
// thêm sách
router.get('/book/create', adminController.createBook);




                            // QUẢN LÝ CHAPTER
// hiển thị list chapter
router.get('/chapter', adminController.chapter);
//hiển thị form thêm mới chapter
router.get('/chapter/create', adminController.createChapter);
// submit lưu data chapter mới tại form vào db
router.post('/chapter/createChapterData', adminController.createChapterData);
// Xóa mềm sách với id => vào thùng rác
router.delete('/chapter/:id/delete', adminController.deleteChapter);
// xóa vĩnh viễn sách
router.delete('/chapter/:id/delete/force', adminController.forceDeleteChapter);
// khôi phục sách từ thùng rác
router.patch('/chapter/:id/restore', adminController.restoreChapter);
// Thùng rác
router.get('/chapter/trash', adminController.trashChapter);
// hành động select các checkbox từ form sách
router.post('/chapter/handle-form-action', adminController.handleFormActionChapter);
// hành động select các checkbox từ form thùng rác
router.post(
    '/chapter/handle-form-trash-action',
    adminController.handleFormTrashActionChapter,
);
// sửa sách => form sửa sach
router.get('/chapter/:id/edit', adminController.editChapter);
// Sửa sách với id
router.put('/chapter/:id', adminController.updateChapter);



                                // QUẢN LÝ GENRE
// hiển thị list genre
router.get('/genre', adminController.genre);
//hiển thị form thêm mới genre
router.get('/genre/create', adminController.createGenre);
// submit lưu data genre mới tại form vào db
router.post('/genre/createGenreData', adminController.createGenreData);
// Xóa mềm thể loại với id => vào thùng rác
router.delete('/genre/:id/delete', adminController.deleteGenre);
// Thùng rác
router.get('/genre/trash', adminController.trashGenre);
// xóa vĩnh viễn sách
router.delete('/genre/:id/delete/force', adminController.forceDeleteGenre);

// sửa sách => form sửa sach
router.get('/genre/:id/edit', adminController.editGenre);
// Sửa sách với id
router.put('/genre/:id', adminController.updateGenre);
// khôi phục sách từ thùng rác
router.patch('/genre/:id/restore', adminController.restoreGenre);
// hành động select các checkbox từ form thể loại
router.post('/genre/handle-form-action', adminController.handleFormActionGenre);
// hành động select các checkbox từ form thùng rác
router.post(
    '/genre/handle-form-trash-action',
    adminController.handleFormTrashActionGenre,
);

                 // QUẢN LÝ User
// hiển thị list User
router.get('/user', adminController.user);
// Xóa mềm thể loại với id => vào thùng rác
router.delete('/user/:id/delete', adminController.deleteUser);
// Thùng rác
router.get('/user/trash', adminController.trashUser);
// xóa vĩnh viễn sách
router.delete('/user/:id/delete/force', adminController.forceDeleteUser);

// khôi phục sách từ thùng rác
router.patch('/user/:id/restore', adminController.restoreUser);
// hành động select các checkbox từ form thể loại
router.post('/user/handle-form-action-user', adminController.handleFormActionUser);
// hành động select các checkbox từ form thùng rác
router.post(
    '/user/handle-form-trash-action',
    adminController.handleFormTrashActionUser,
);

// sửa sách => form sửa sach
router.get('/genre/:id/edit', adminController.editGenre);
// Sửa sách với id
router.put('/genre/:id', adminController.updateGenre);


router.get('/', adminController.index);

module.exports = router;

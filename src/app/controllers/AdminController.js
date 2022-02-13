const Chapter = require('../model/Chapters');
const Book = require('../model/Books');
const Genres = require('../model/Genres');
const User = require('../model/Users');
const PAGE_SIZE = 5;
class NewsController {
    // [GET] /admin
    index(req, res) {
        res.render('admin/homeAdmin');
    }
    // [GET] /admin/book
    listBook(req, res, next) {
        var page = req.query.page;
        if(page){
            page = parseInt(page);
            if(page< 1){
                page = 1;
            }
            var skip = (page - 1) * PAGE_SIZE;
        }
        let bookQuery = Book.find({}).lean().skip(skip).limit(PAGE_SIZE);
        
        if(req.query.hasOwnProperty('_sort')){
            bookQuery = bookQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([Book.find({}).lean(), Book.countDocumentsDeleted()])
            .then(([books, deleteCount]) =>
                res.render('admin/book', {
                    deleteCount,
                    books,
                }),
            )
            .catch(next);
    }

    // [GET] /admin/book/:id/edit
    editBook(req, res, next) {
        Promise.all([Book.findById(req.params.id).lean(), Genres.find().lean()])
            .then(([book, genre]) =>
                res.render('admin/editBook', {
                    genre,
                    book,
                }),
            )
            .catch(next);
    }

    // [PUT] /admin/book/:id
    updateBook(req, res, next) {
        const formData = req.body;
        formData.bookCover = `/img/${req.file.filename}.png`;
        // http://10.0.2.2:3000
        // const book = new Book(formData);
        Book.findByIdAndUpdate({ _id: req.params.id }, formData)
            .then(() => res.redirect('/admin/book'))
            .catch(next);
    }

    // [GET] /admin/book/create
    createBook(req, res, next) {
        Genres.find({}).lean()
            .then((genre) => {
                res.render('admin/createBook', { genre });
            })
            .catch(next);
    }

    // [POST] /courses/store
    createBookData(req, res, next) {
        const formData = req.body;
        formData.bookCover = `/img/${req.file.filename}.png`;
        // http://10.0.2.2:3000
        const book = new Book(formData);
        book.save()
            .then(() => res.redirect('/admin/book'))
            .catch((err) => {});
    }

    // [DELETE] /admin/book/:id/delete
    deleteBook(req, res, next) {
        Book.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/book/:id/delete/force
    forceDeleteBook(req, res, next) {
        Book.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/book/trash
    trashBook(req, res, next) {
        Book.findDeleted({})
            .lean()
            .then((books) => {
                res.render('admin/trash-book', { books });
            })
            .catch(next);
    }

    // [PATCH] /admin/book/:id/restore
    restoreBook(req, res, next) {
        Book.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/book/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Book.delete({ _id: { $in: req.body.bookIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [POST] /admin/book/handle-form-trash-action
    handleFormTrashAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Book.deleteMany({ _id: { $in: req.body.bookIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Book.restore({ _id: { $in: req.body.bookIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [GET] /admin/chapter
    chapter(req, res, next) {
        var page = req.query.page;
        if(page){
            page = parseInt(page);
            if(page< 1){
                page = 1;
            }
            var skip = (page - 1) * PAGE_SIZE;
        }
        let chapterQuery = Chapter.find({}).lean().skip(skip).limit(PAGE_SIZE);
        
        if(req.query.hasOwnProperty('_sort')){
            chapterQuery = chapterQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([chapterQuery ,Book.find({}).lean(), Chapter.countDocumentsDeleted()])
            .then(([chapters,books, deleteCount]) =>
                res.render('admin/chapter', {
                    deleteCount,
                    books,
                    chapters
                }),
            )
            .catch(next);
    }

    // [GET] admin/chapter/create
    createChapter(req, res, next) {
        Book.find({}).lean()
            .then((books) => {
                res.render('admin/createChapter', { books });
            })
            .catch(next);
    }

    // [POST] admin/chapter/createChapterData
    createChapterData(req, res, next) {
        const formData = req.body;
        const chapter = new Chapter(formData);
        chapter.save()
            .then(() => res.redirect('/admin/chapter'))
            .catch((err) => {});
    }

    // [DELETE] /admin/chapter/:id/delete
    deleteChapter(req, res, next) {
        // res.json(req.params.id )
        Chapter.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/chapter/trash
    trashChapter(req, res, next) {
        Chapter.findDeleted({})
            .lean()
            .then((chapters) => {
                res.render('admin/trash-chapter', { chapters });
            })
            .catch(next);
    }

    // [PATCH] /admin/book/:id/restore
    restoreChapter(req, res, next) {
        Chapter.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/chapter/:id/delete/force
    forceDeleteChapter(req, res, next) {
        Chapter.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/chapter/handle-form-action-chapter
    handleFormActionChapter(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Chapter.delete({ _id: { $in: req.body.chapterIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [POST] /admin/chapter/handle-form-trash-action-chapter
    handleFormTrashActionChapter(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Chapter.deleteMany({ _id: { $in: req.body.chapterIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Chapter.restore({ _id: { $in: req.body.chapterIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [GET] /admin/chapter/:id/edit
    editChapter(req, res, next) {
        Chapter.findById(req.params.id)
            .lean()
            .then((chapter) => {
                res.render('admin/editChapter', { chapter });
            })
            .catch(next);
    }

    // [PUT] /admin/chapter/:id
    updateChapter(req, res, next) {
        Chapter.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/chapter'))
            .catch(next);
    }

                    // Quản lý thể loại
    // [GET] /admin/chapter
    genre(req, res, next) {
        let genresQuery = Genres.find({}).lean();
        
        if(req.query.hasOwnProperty('_sort')){
            genresQuery = genresQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([genresQuery, Genres.countDocumentsDeleted()])
            .then(([genres, deleteCount]) =>
                res.render('admin/genre', {
                    deleteCount,
                    genres,
                }),
            )
            .catch(next);
    }
    
    // [GET] admin/genre/create
    createGenre(req, res, next) {
        res.render('admin/createGenre');
    }

    // [POST] admin/genre/createGenreData
    createGenreData(req, res, next) {
        const formData = req.body;
        const genre = new Genres(formData);
        genre.save()
            .then(() => res.redirect('/admin/genre'))
            .catch((err) => {});
    }

    // [DELETE] /admin/chapter/:id/delete
    deleteGenre(req, res, next) {
        // res.json(req.params.id )
        Genres.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/chapter/trash
    trashGenre(req, res, next) {
        Genres.findDeleted({})
            .lean()
            .then((genre) => {
                res.render('admin/trash-genre', { genre });
            })
            .catch(next);
    }

    // [DELETE] /admin/genre/:id/delete/force
    forceDeleteGenre(req, res, next) {
        Genres.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/genre/:id/edit
    editGenre(req, res, next) {
        Genres.findById(req.params.id)
            .lean()
            .then((genre) => {
                res.render('admin/editGenre', { genre });
            })
            .catch(next);
    }

    // [PUT] /admin/genre/:id
    updateGenre(req, res, next) {
        Genres.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/genre'))
            .catch(next);
    }
    
    // [PATCH] /admin/genre/:id/restore
    restoreGenre(req, res, next) {
        Genres.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/genre/handle-form-action-genre
    handleFormActionGenre(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Genres.delete({ _id: { $in: req.body.genreIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [POST] /admin/genre/handle-form-trash-action-genre
    handleFormTrashActionGenre(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Genres.deleteMany({ _id: { $in: req.body.genreIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Genres.restore({ _id: { $in: req.body.genreIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
                    // Quản lý User
    user(req, res, next) {
        var page = req.query.page;
        if(page){
            page = parseInt(page);
            if(page< 1){
                page = 1;
            }
            var skip = (page - 1) * PAGE_SIZE;
        }
        
        let userQuery = User.find({}).lean()
            .skip(skip).limit(PAGE_SIZE);
        
        if(req.query.hasOwnProperty('_sort')){
            userQuery = userQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([userQuery, User.countDocumentsDeleted()])
            .then(([users, deleteCount]) =>
                res.render('admin/user', {
                    deleteCount,
                    users,
                }),
            )
            .catch(next);
    }
    // [DELETE] /admin/book/:id/delete
    deleteUser(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [GET] /admin/book/trash
    trashUser(req, res, next) {
        User.findDeleted({})
            .lean()
            .then((users) => {
                res.render('admin/trash-user', { users });
            })
            .catch(next);
    }

    // [DELETE] /admin/book/:id/delete/force
    forceDeleteUser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/book/handle-form-action
    handleFormActionUser(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                User.delete({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // [PATCH] /admin/book/:id/restore
    restoreUser(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /admin/book/handle-form-trash-action
    handleFormTrashActionUser(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                User.deleteMany({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                User.restore({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

}
module.exports = new NewsController();

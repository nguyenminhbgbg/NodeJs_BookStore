
class NewsController {
    // [GET] /news
    index(req, res){
        res.render('news');
    }

    // [GET] detail new/:slug
    show(req, res){
        res.send('NEW DETAIL!!!');
    }
}
module.exports = new NewsController;
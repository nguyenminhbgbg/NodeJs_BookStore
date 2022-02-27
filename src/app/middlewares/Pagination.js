module.exports = function SortMiddleware(req, res , next) {
    res.locals._pagination = {
        enabled: false,
        page: 1 ,
    };
    if(req.query.hasOwnProperty('_pagination')){
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = res.query.column;
        // res.locals._sort.type = res.query.type;

        Object.assign(res.locals._pagination, {
            enabled: true,
            page : req.query.page,
        })
    }
    next();
}

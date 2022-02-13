module.exports = function SortMiddleware(req, res , next) {
    res.locals._pagination = {
        enabled: false,
        column: 'default',
        page: 'default'
    };
    if(req.query.hasOwnProperty('_pagination')){
        Object.assign(res.locals._sort, {
            enabled: true,
            page : req.query.page,
            column : req.query.column,
        })
    }

    next();
}

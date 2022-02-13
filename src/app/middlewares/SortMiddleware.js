module.exports = function SortMiddleware(req, res , next) {
    res.locals._sort = {
        enabled: false,
        column: 'default',
        type: 'default'
    };
    if(req.query.hasOwnProperty('_sort')){
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = res.query.column;
        // res.locals._sort.type = res.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type : req.query.type,
            column : req.query.column,
        })
    }

    next();
}

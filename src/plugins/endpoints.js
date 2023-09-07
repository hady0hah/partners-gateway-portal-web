let endpoints = {
    'po_list': {
        'url': 'private/po/list'
    },
    'marketing_statuses': {
        'url': 'private/formstatus/list'
    }
    ,
    'deal': {
        'list' : 'private/deals/list',
        'form': 'private/form/deal',
        'add': 'private/deal/add',
        'edit': 'private/deals/edit?id=',
        'show': 'private/deals/show?id='
    },
    'po': {
        'form': 'private/form/po'
    },
    'forecasting': {
        'list': 'private/fr/list',
        'form': 'private/form/business/review/forecasting',
        'add': 'private/form/business/review/forecasting',
        'show': 'private/fr/:id/show'
    },
    'qbr': {
        'list': 'private/qb/list',
        'form': 'private/form/business/review/quarterly',
        'add': 'private/form/business/review/quarterly',
    },
    'how_to': {
        'url': 'private/how-to-guides'
    },
    'welcome_page': {
        'url': 'private/welcome-page'
    },
    'marketing_material': {
        'url': 'private/marketing_material/list'
    },
    'price_discounts': {
        'url': 'private/pricelists'
    },
    'products_technical': {
        'url': 'private/product_materials/list'
    },
    'mdf': {
        'form': 'private/form/mdf'
    },
    resolve(url, params) {
        let _url = url
        for (let [k, v] of Object.entries(params)) {
            _url = _url.replace(':' + k, v)
        }
        return _url
    },
}

export default endpoints

let endpoints = {
    'marketing_statuses': {
        'url': 'private/formstatus/list'
    }
    ,
    'deal': {
        'list' : 'private/deals/list',
        'form': 'private/form/deal',
        'add': 'private/deal/add',
        'edit': 'private/deals/edit?id=:id',
        'show': 'private/deals/show?id=:id'
    },
    'po': {
      'list' : 'private/po/list',
      'form': 'private/form/po',
      'add': 'private/po/add',
      'edit': 'private/po/:id/edit',
      'show': 'private/po/:id/show'
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
        'form': 'private/form/mdf',
        'add' : 'private/mdf/save',
        'edit' : 'private/mdf/:id/edit',
        'show' : 'private/mdf/:id/show',
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

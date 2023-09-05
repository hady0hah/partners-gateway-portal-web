let endpoints = {
    'po_list': {
        'url': 'private/po/list'
    },
    'deal_list': {
        'url': 'private/deals/list'
    },
    'marketing_statuses': {
        'url': 'private/formstatus/list'
    }
    ,
    'deal_form': {
        'url': 'private/form/deal'
    },
    'deal_add': {
        'url': 'private/deal/add'
    },
    'deal_edit': {
        'url': 'private/deals/edit?id='
    },
    'po_form': {
        'url': 'private/form/po'
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

    resolve(url, params) {
        let _url = url
        for(let [k, v] of Object.entries(params)) {
            _url = _url.replace(':'+k,v)
        }
        return _url
    }
}

export default endpoints

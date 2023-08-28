import { VTextField } from 'vuetify/lib';
// import { VDatePicker } from 'vuetify/lib';
import { VSelect } from 'vuetify/lib';
import { VTextarea } from 'vuetify/lib';
import DatePicker from './DatePicker'

let map = {
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType': {
        'component': VTextField
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\NumberType': {
        'component': VTextField
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextAreaType': {
        'component': VTextarea
    },
    'date': {
        'component': DatePicker
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\DateType': {
        'component': DatePicker
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\ChoiceType': {
        'component': VSelect
    },
    'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType': {
        'component': VSelect
    },
}

export default map
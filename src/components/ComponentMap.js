import { VTextField } from 'vuetify/lib';
// import { VDatePicker } from 'vuetify/lib';
import { VSelect } from 'vuetify/lib';
import { VTextarea } from 'vuetify/lib';
import DatePicker from './DatePicker'
import VNumber from "@/components/VNumber";
import DealStatuses from "@/components/DealStatuses";
import FormCollection from './FormCollection';
import VYesNoOther from "@/components/VYesNoOther";

let map = {
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType': {
        'component': VTextField
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\NumberType': {
        'component': VNumber
    },
    'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextareaType': {
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
    'Sonata\\AdminBundle\\Form\\Type\\CollectionType' : {
        'component': FormCollection
    },
    'program_view|dealStatus':{
      'component': DealStatuses
    },
    'program_view|technicalPresentationOption':{
    'component': VYesNoOther
    },
}

export default map

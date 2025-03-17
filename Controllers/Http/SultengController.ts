import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import _ from 'lodash'
import moment from 'moment'

export default class SultengController {
  private getMerek(kd_merk: string) {
    const merek = [
      {
        kd_merk: '813',
        mrk_desc: 'A35',
      },
      {
        kd_merk: '001',
        mrk_desc: 'ACADIAN',
      },
      {
        kd_merk: '744',
        mrk_desc: 'ACCUVIEW',
      },
      {
        kd_merk: '634',
        mrk_desc: 'ADIPUTRO',
      },
      {
        kd_merk: '642',
        mrk_desc: 'ADIVA',
      },
      {
        kd_merk: '003',
        mrk_desc: 'ADLY',
      },
      {
        kd_merk: '004',
        mrk_desc: 'AEOLUS',
      },
      {
        kd_merk: '005',
        mrk_desc: 'AGUSTA',
      },
      {
        kd_merk: '006',
        mrk_desc: 'AICHI',
      },
      {
        kd_merk: '745',
        mrk_desc: 'AIRMAN',
      },
      {
        kd_merk: '007',
        mrk_desc: 'AJS',
      },
      {
        kd_merk: '008',
        mrk_desc: 'ALBION',
      },
      {
        kd_merk: '009',
        mrk_desc: 'ALFAROMEO',
      },
      {
        kd_merk: '818',
        mrk_desc: 'ALLROAD2.7BITURBO',
      },
      {
        kd_merk: '819',
        mrk_desc: 'ALLROAD2.7TQUATTROHSTIPTRONIC',
      },
      {
        kd_merk: '820',
        mrk_desc: 'ALLROAD2.7TQUATTROTIPTRONIC',
      },
      {
        kd_merk: '821',
        mrk_desc: 'ALLROADQUATTROV.62.7',
      },
      {
        kd_merk: '010',
        mrk_desc: 'ALPINO',
      },
      {
        kd_merk: '011',
        mrk_desc: 'AMCPACER',
      },
      {
        kd_merk: '012',
        mrk_desc: 'AMERICAN',
      },
      {
        kd_merk: '617',
        mrk_desc: 'AMZ',
      },
      {
        kd_merk: '013',
        mrk_desc: 'APPKTM',
      },
      {
        kd_merk: '014',
        mrk_desc: 'APRILIA',
      },
      {
        kd_merk: '015',
        mrk_desc: 'ARDIE',
      },
      {
        kd_merk: '016',
        mrk_desc: 'ARIEL',
      },
      {
        kd_merk: '017',
        mrk_desc: 'ARO',
      },
      {
        kd_merk: '018',
        mrk_desc: 'ARROW',
      },
      {
        kd_merk: '822',
        mrk_desc: 'ARYA2500cc',
      },
      {
        kd_merk: '019',
        mrk_desc: 'ASCONA',
      },
      {
        kd_merk: '020',
        mrk_desc: 'ASIA',
      },
      {
        kd_merk: '021',
        mrk_desc: 'ASIANA',
      },
      {
        kd_merk: '022',
        mrk_desc: 'ASIASTAR',
      },
      {
        kd_merk: '023',
        mrk_desc: 'ASPIRAX',
      },
      {
        kd_merk: '024',
        mrk_desc: 'ASTONMARTIN',
      },
      {
        kd_merk: '025',
        mrk_desc: 'ASTRO',
      },
      {
        kd_merk: '026',
        mrk_desc: 'ATHEY',
      },
      {
        kd_merk: '747',
        mrk_desc: 'ATLASCOPCO',
      },
      {
        kd_merk: '027',
        mrk_desc: 'AUDI',
      },
      {
        kd_merk: '028',
        mrk_desc: 'AUPA',
      },
      {
        kd_merk: '029',
        mrk_desc: 'AUSTIN',
      },
      {
        kd_merk: '616',
        mrk_desc: 'AUTOCAR',
      },
      {
        kd_merk: '645',
        mrk_desc: 'AUTOGAS',
      },
      {
        kd_merk: '030',
        mrk_desc: 'AVADA',
      },
      {
        kd_merk: '031',
        mrk_desc: 'AWO',
      },
      {
        kd_merk: '032',
        mrk_desc: 'AYS',
      },
      {
        kd_merk: '033',
        mrk_desc: 'BAGIRUS',
      },
      {
        kd_merk: '034',
        mrk_desc: 'BAJAJ',
      },
      {
        kd_merk: '035',
        mrk_desc: 'BALADA',
      },
      {
        kd_merk: '036',
        mrk_desc: 'BANERAS',
      },
      {
        kd_merk: '037',
        mrk_desc: 'BASTERI',
      },
      {
        kd_merk: '038',
        mrk_desc: 'BATAFUS',
      },
      {
        kd_merk: '039',
        mrk_desc: 'BATTLE',
      },
      {
        kd_merk: '040',
        mrk_desc: 'BAZZHIGU',
      },
      {
        kd_merk: '041',
        mrk_desc: 'BEDFORD',
      },
      {
        kd_merk: '655',
        mrk_desc: 'BEIBEN',
      },
      {
        kd_merk: '042',
        mrk_desc: 'BEIJET',
      },
      {
        kd_merk: '043',
        mrk_desc: 'BEIJING',
      },
      {
        kd_merk: '044',
        mrk_desc: 'BEJO',
      },
      {
        kd_merk: '045',
        mrk_desc: 'BELLET',
      },
      {
        kd_merk: '046',
        mrk_desc: 'BEMBIE',
      },
      {
        kd_merk: '637',
        mrk_desc: 'BEML',
      },
      {
        kd_merk: '748',
        mrk_desc: 'BEMO',
      },
      {
        kd_merk: '652',
        mrk_desc: 'BENELLI',
      },
      {
        kd_merk: '749',
        mrk_desc: 'BENSON',
      },
      {
        kd_merk: '047',
        mrk_desc: 'BENTLEY',
      },
      {
        kd_merk: '048',
        mrk_desc: 'BERLIET',
      },
      {
        kd_merk: '049',
        mrk_desc: 'BERUANG',
      },
      {
        kd_merk: '816',
        mrk_desc: 'BESTELWAGON2x4M/T',
      },
      {
        kd_merk: '050',
        mrk_desc: 'BHAMAPEUGEOT',
      },
      {
        kd_merk: '513',
        mrk_desc: 'BIMA',
      },
      {
        kd_merk: '051',
        mrk_desc: 'BIMANTARA',
      },
      {
        kd_merk: '437',
        mrk_desc: 'BITTELI',
      },
      {
        kd_merk: '052',
        mrk_desc: 'BLITZER',
      },
      {
        kd_merk: '610',
        mrk_desc: 'BLUEBIRD',
      },
      {
        kd_merk: '750',
        mrk_desc: 'BMC',
      },
      {
        kd_merk: '053',
        mrk_desc: 'BMCTZER',
      },
      {
        kd_merk: '054',
        mrk_desc: 'BMW',
      },
      {
        kd_merk: '055',
        mrk_desc: 'BOBCAT',
      },
      {
        kd_merk: '056',
        mrk_desc: 'BOMAG',
      },
      {
        kd_merk: '057',
        mrk_desc: 'BORGWARD',
      },
      {
        kd_merk: '602',
        mrk_desc: 'BOSICH',
      },
      {
        kd_merk: '058',
        mrk_desc: 'BOSOWA',
      },
      {
        kd_merk: '059',
        mrk_desc: 'BOSOWA-HYOSUNG',
      },
      {
        kd_merk: '060',
        mrk_desc: 'BOSS',
      },
      {
        kd_merk: '061',
        mrk_desc: 'BOSSINI',
      },
      {
        kd_merk: '062',
        mrk_desc: 'BRIDGESTONE',
      },
      {
        kd_merk: '826',
        mrk_desc: 'BRIXTON',
      },
      {
        kd_merk: '063',
        mrk_desc: 'BSA',
      },
      {
        kd_merk: '587',
        mrk_desc: 'BT',
      },
      {
        kd_merk: '064',
        mrk_desc: 'BUCEGI',
      },
      {
        kd_merk: '804',
        mrk_desc: 'BUCHER',
      },
      {
        kd_merk: '588',
        mrk_desc: 'BUFALO',
      },
      {
        kd_merk: '065',
        mrk_desc: 'BUGATI',
      },
      {
        kd_merk: '066',
        mrk_desc: 'BUICK',
      },
      {
        kd_merk: '067',
        mrk_desc: 'BUNGERS',
      },
      {
        kd_merk: '068',
        mrk_desc: 'BUSHIDO',
      },
      {
        kd_merk: '828',
        mrk_desc: 'BYD',
      },
      {
        kd_merk: '442',
        mrk_desc: 'CA25',
      },
      {
        kd_merk: '075',
        mrk_desc: 'CADERICKBROUGH',
      },
      {
        kd_merk: '069',
        mrk_desc: 'CADILLAC',
      },
      {
        kd_merk: '070',
        mrk_desc: 'CAGIVA',
      },
      {
        kd_merk: '641',
        mrk_desc: 'CAMC',
      },
      {
        kd_merk: '071',
        mrk_desc: 'CAPRY',
      },
      {
        kd_merk: '072',
        mrk_desc: 'CARAVAS',
      },
      {
        kd_merk: '600',
        mrk_desc: 'CARGO',
      },
      {
        kd_merk: '073',
        mrk_desc: 'CARNERDENVER',
      },
      {
        kd_merk: '618',
        mrk_desc: 'CASE',
      },
      {
        kd_merk: '590',
        mrk_desc: 'CASE821',
      },
      {
        kd_merk: '074',
        mrk_desc: 'CATERPILLAR',
      },
      {
        kd_merk: '076',
        mrk_desc: 'CELLOMOSQUITO',
      },
      {
        kd_merk: '077',
        mrk_desc: 'CHANGAN',
      },
      {
        kd_merk: '078',
        mrk_desc: 'CHEROKEE',
      },
      {
        kd_merk: '550',
        mrk_desc: 'CHERY',
      },
      {
        kd_merk: '079',
        mrk_desc: 'CHEVROLET',
      },
      {
        kd_merk: '080',
        mrk_desc: 'CHRYSLER',
      },
      {
        kd_merk: '611',
        mrk_desc: 'CHRYSLERJEEP',
      },
      {
        kd_merk: '081',
        mrk_desc: 'CHUNLAN',
      },
      {
        kd_merk: '560',
        mrk_desc: 'CINZOU',
      },
      {
        kd_merk: '082',
        mrk_desc: 'CITROEN',
      },
      {
        kd_merk: '083',
        mrk_desc: 'CLARK',
      },
      {
        kd_merk: '825',
        mrk_desc: 'CLEVELANDCYCLEWERKS',
      },
      {
        kd_merk: '084',
        mrk_desc: 'COMBAT',
      },
      {
        kd_merk: '085',
        mrk_desc: 'CONSUL',
      },
      {
        kd_merk: '086',
        mrk_desc: 'CONTESSA',
      },
      {
        kd_merk: '604',
        mrk_desc: 'CONVAIR',
      },
      {
        kd_merk: '605',
        mrk_desc: 'COPCO',
      },
      {
        kd_merk: '087',
        mrk_desc: 'CYRUS',
      },
      {
        kd_merk: '088',
        mrk_desc: 'DAC',
      },
      {
        kd_merk: '752',
        mrk_desc: 'DAEWO',
      },
      {
        kd_merk: '089',
        mrk_desc: 'DAEWOO',
      },
      {
        kd_merk: '090',
        mrk_desc: 'DAF',
      },
      {
        kd_merk: '091',
        mrk_desc: 'DAIHATSU',
      },
      {
        kd_merk: '092',
        mrk_desc: 'DAIHEIYO',
      },
      {
        kd_merk: '093',
        mrk_desc: 'DAIMLER',
      },
      {
        kd_merk: '094',
        mrk_desc: 'DAST',
      },
      {
        kd_merk: '095',
        mrk_desc: 'DATFA',
      },
      {
        kd_merk: '096',
        mrk_desc: 'DATSUN',
      },
      {
        kd_merk: '097',
        mrk_desc: 'DAYANG',
      },
      {
        kd_merk: '810',
        mrk_desc: 'DEMAG',
      },
      {
        kd_merk: '445',
        mrk_desc: 'DEMAK',
      },
      {
        kd_merk: '811',
        mrk_desc: 'DESOTO',
      },
      {
        kd_merk: '803',
        mrk_desc: 'DFSK',
      },
      {
        kd_merk: '446',
        mrk_desc: 'DIABLO',
      },
      {
        kd_merk: '100',
        mrk_desc: 'DIAMOND',
      },
      {
        kd_merk: '101',
        mrk_desc: 'DINASTI',
      },
      {
        kd_merk: '102',
        mrk_desc: 'DKW',
      },
      {
        kd_merk: '103',
        mrk_desc: 'DODGE',
      },
      {
        kd_merk: '495',
        mrk_desc: 'DONGFENG',
      },
      {
        kd_merk: '753',
        mrk_desc: 'DOOSAN',
      },
      {
        kd_merk: '562',
        mrk_desc: 'DORKAS',
      },
      {
        kd_merk: '104',
        mrk_desc: 'DOUGLASS',
      },
      {
        kd_merk: '754',
        mrk_desc: 'DRACO',
      },
      {
        kd_merk: '105',
        mrk_desc: 'DRESSTA',
      },
      {
        kd_merk: '106',
        mrk_desc: 'DUCATI',
      },
      {
        kd_merk: '596',
        mrk_desc: 'DUTA',
      },
      {
        kd_merk: '447',
        mrk_desc: 'DYNAPAC',
      },
      {
        kd_merk: '448',
        mrk_desc: 'EFG',
      },
      {
        kd_merk: '107',
        mrk_desc: 'ELECTRIC',
      },
      {
        kd_merk: '614',
        mrk_desc: 'ELKHART',
      },
      {
        kd_merk: '597',
        mrk_desc: 'EMOTO',
      },
      {
        kd_merk: '756',
        mrk_desc: 'ERF',
      },
      {
        kd_merk: '651',
        mrk_desc: 'ESEMKA',
      },
      {
        kd_merk: '108',
        mrk_desc: 'EXPRESS',
      },
      {
        kd_merk: '109',
        mrk_desc: 'FALCON',
      },
      {
        kd_merk: '110',
        mrk_desc: 'FANTUZI',
      },
      {
        kd_merk: '111',
        mrk_desc: 'FARGO',
      },
      {
        kd_merk: '112',
        mrk_desc: 'FARM',
      },
      {
        kd_merk: '113',
        mrk_desc: 'FAUND',
      },
      {
        kd_merk: '743',
        mrk_desc: 'FAW',
      },
      {
        kd_merk: '114',
        mrk_desc: 'FERRARI',
      },
      {
        kd_merk: '115',
        mrk_desc: 'FETIM',
      },
      {
        kd_merk: '116',
        mrk_desc: 'FIAT',
      },
      {
        kd_merk: '117',
        mrk_desc: 'FODEN',
      },
      {
        kd_merk: '118',
        mrk_desc: 'FORD',
      },
      {
        kd_merk: '119',
        mrk_desc: 'FORGLAND',
      },
      {
        kd_merk: '757',
        mrk_desc: 'FORLAND',
      },
      {
        kd_merk: '631',
        mrk_desc: 'FOTON',
      },
      {
        kd_merk: '656',
        mrk_desc: 'FOTONAUMAN',
      },
      {
        kd_merk: '582',
        mrk_desc: 'FRANNA',
      },
      {
        kd_merk: '120',
        mrk_desc: 'FREIGHT',
      },
      {
        kd_merk: '121',
        mrk_desc: 'FREIGHTLINER',
      },
      {
        kd_merk: '613',
        mrk_desc: 'FRIGTER',
      },
      {
        kd_merk: '591',
        mrk_desc: 'FT',
      },
      {
        kd_merk: '122',
        mrk_desc: 'FUJICO',
      },
      {
        kd_merk: '123',
        mrk_desc: 'FUKUDA',
      },
      {
        kd_merk: '124',
        mrk_desc: 'FURUKAWA',
      },
      {
        kd_merk: '657',
        mrk_desc: 'FUSO',
      },
      {
        kd_merk: '125',
        mrk_desc: 'GARDERLANCER',
      },
      {
        kd_merk: '126',
        mrk_desc: 'GARUDA',
      },
      {
        kd_merk: '127',
        mrk_desc: 'GARWOOD',
      },
      {
        kd_merk: '128',
        mrk_desc: 'GASTAVA',
      },
      {
        kd_merk: '129',
        mrk_desc: 'GAZ',
      },
      {
        kd_merk: '131',
        mrk_desc: 'GAZPRAHA',
      },
      {
        kd_merk: '130',
        mrk_desc: 'GAZA',
      },
      {
        kd_merk: '649',
        mrk_desc: 'GAZGAS',
      },
      {
        kd_merk: '760',
        mrk_desc: 'GEELY',
      },
      {
        kd_merk: '132',
        mrk_desc: 'GEMINI',
      },
      {
        kd_merk: '133',
        mrk_desc: 'GENERAL',
      },
      {
        kd_merk: '635',
        mrk_desc: 'GILERA',
      },
      {
        kd_merk: '134',
        mrk_desc: 'GINAF',
      },
      {
        kd_merk: '135',
        mrk_desc: 'GIZO',
      },
      {
        kd_merk: '136',
        mrk_desc: 'GLADIATOR',
      },
      {
        kd_merk: '137',
        mrk_desc: 'GMC',
      },
      {
        kd_merk: '138',
        mrk_desc: 'GOEBELVOUS',
      },
      {
        kd_merk: '620',
        mrk_desc: 'GOLDENDRAGON',
      },
      {
        kd_merk: '139',
        mrk_desc: 'GOTTWALD',
      },
      {
        kd_merk: '140',
        mrk_desc: 'GRANDSURYA',
      },
      {
        kd_merk: '141',
        mrk_desc: 'GRANDIA',
      },
      {
        kd_merk: '603',
        mrk_desc: 'GREATDANE',
      },
      {
        kd_merk: '621',
        mrk_desc: 'GREATWALL',
      },
      {
        kd_merk: '142',
        mrk_desc: 'GROVC',
      },
      {
        kd_merk: '143',
        mrk_desc: 'GROVE',
      },
      {
        kd_merk: '144',
        mrk_desc: 'HADASACHS',
      },
      {
        kd_merk: '145',
        mrk_desc: 'HAIHONG',
      },
      {
        kd_merk: '453',
        mrk_desc: 'HALLA',
      },
      {
        kd_merk: '625',
        mrk_desc: 'HAMM',
      },
      {
        kd_merk: '146',
        mrk_desc: 'HAMMW',
      },
      {
        kd_merk: '147',
        mrk_desc: 'HANSAGOLIATH',
      },
      {
        kd_merk: '148',
        mrk_desc: 'HAOTIAN',
      },
      {
        kd_merk: '454',
        mrk_desc: 'HAOTIN',
      },
      {
        kd_merk: '149',
        mrk_desc: 'HAPPY',
      },
      {
        kd_merk: '150',
        mrk_desc: 'HARLEYDAVIDSON',
      },
      {
        kd_merk: '151',
        mrk_desc: 'HARRY',
      },
      {
        kd_merk: '606',
        mrk_desc: 'HASCAR',
      },
      {
        kd_merk: '152',
        mrk_desc: 'HATSUDA',
      },
      {
        kd_merk: '153',
        mrk_desc: 'HEALEY',
      },
      {
        kd_merk: '814',
        mrk_desc: 'HEALEYSP',
      },
      {
        kd_merk: '607',
        mrk_desc: 'HEIL',
      },
      {
        kd_merk: '154',
        mrk_desc: 'HEIMAN',
      },
      {
        kd_merk: '155',
        mrk_desc: 'HELICAK',
      },
      {
        kd_merk: '156',
        mrk_desc: 'HELLA',
      },
      {
        kd_merk: '157',
        mrk_desc: 'HERCULES',
      },
      {
        kd_merk: '158',
        mrk_desc: 'HEROPUNCH',
      },
      {
        kd_merk: '159',
        mrk_desc: 'HILMAN',
      },
      {
        kd_merk: '160',
        mrk_desc: 'HINO',
      },
      {
        kd_merk: '161',
        mrk_desc: 'HITACHI',
      },
      {
        kd_merk: '162',
        mrk_desc: 'HMW',
      },
      {
        kd_merk: '163',
        mrk_desc: 'HOFFMAN',
      },
      {
        kd_merk: '455',
        mrk_desc: 'HOIST',
      },
      {
        kd_merk: '164',
        mrk_desc: 'HOKAIDO',
      },
      {
        kd_merk: '165',
        mrk_desc: 'HOKIDA',
      },
      {
        kd_merk: '166',
        mrk_desc: 'HOLDEN',
      },
      {
        kd_merk: '167',
        mrk_desc: 'HONDA',
      },
      {
        kd_merk: '805',
        mrk_desc: 'HONGYAN',
      },
      {
        kd_merk: '168',
        mrk_desc: 'HONLEI',
      },
      {
        kd_merk: '169',
        mrk_desc: 'HONZU',
      },
      {
        kd_merk: '170',
        mrk_desc: 'HOREG',
      },
      {
        kd_merk: '630',
        mrk_desc: 'HOWO',
      },
      {
        kd_merk: '809',
        mrk_desc: 'HTM',
      },
      {
        kd_merk: '761',
        mrk_desc: 'HUANG',
      },
      {
        kd_merk: '762',
        mrk_desc: 'HUAXIA',
      },
      {
        kd_merk: '171',
        mrk_desc: 'HUDSON',
      },
      {
        kd_merk: '172',
        mrk_desc: 'HUMBER',
      },
      {
        kd_merk: '173',
        mrk_desc: 'HUMMER',
      },
      {
        kd_merk: '763',
        mrk_desc: 'HUNLEI',
      },
      {
        kd_merk: '592',
        mrk_desc: 'HUSQAVARNA',
      },
      {
        kd_merk: '174',
        mrk_desc: 'HUSQIVARNA',
      },
      {
        kd_merk: '175',
        mrk_desc: 'HYOSUNG',
      },
      {
        kd_merk: '176',
        mrk_desc: 'HYSTER',
      },
      {
        kd_merk: '177',
        mrk_desc: 'HYUNDAI',
      },
      {
        kd_merk: '764',
        mrk_desc: 'IHI',
      },
      {
        kd_merk: '178',
        mrk_desc: 'IHINDAI',
      },
      {
        kd_merk: '179',
        mrk_desc: 'IKARUS',
      },
      {
        kd_merk: '765',
        mrk_desc: 'IMPRESSIVEZ',
      },
      {
        kd_merk: '180',
        mrk_desc: 'INDIAN',
      },
      {
        kd_merk: '181',
        mrk_desc: 'INDOKAR',
      },
      {
        kd_merk: '643',
        mrk_desc: 'INFINITI',
      },
      {
        kd_merk: '182',
        mrk_desc: 'INGERSOLLRAND',
      },
      {
        kd_merk: '457',
        mrk_desc: 'INSPIRA',
      },
      {
        kd_merk: '183',
        mrk_desc: 'INTERNATIONAL',
      },
      {
        kd_merk: '458',
        mrk_desc: 'ISAPPORO',
      },
      {
        kd_merk: '184',
        mrk_desc: 'ISHIKAWAJIMA',
      },
      {
        kd_merk: '185',
        mrk_desc: 'ISUZU',
      },
      {
        kd_merk: '186',
        mrk_desc: 'ITALJET',
      },
      {
        kd_merk: '187',
        mrk_desc: 'IVECO',
      },
      {
        kd_merk: '188',
        mrk_desc: 'JAGUAR',
      },
      {
        kd_merk: '766',
        mrk_desc: 'JAMES',
      },
      {
        kd_merk: '189',
        mrk_desc: 'JAMUS',
      },
      {
        kd_merk: '190',
        mrk_desc: 'JATAYU',
      },
      {
        kd_merk: '191',
        mrk_desc: 'JAWA',
      },
      {
        kd_merk: '767',
        mrk_desc: 'JBC',
      },
      {
        kd_merk: '192',
        mrk_desc: 'JEEP',
      },
      {
        kd_merk: '193',
        mrk_desc: 'JEIFANG',
      },
      {
        kd_merk: '194',
        mrk_desc: 'JETWIN',
      },
      {
        kd_merk: '459',
        mrk_desc: 'JHONDEER',
      },
      {
        kd_merk: '195',
        mrk_desc: 'JHONDOERE',
      },
      {
        kd_merk: '196',
        mrk_desc: 'JIALING',
      },
      {
        kd_merk: '197',
        mrk_desc: 'JIANSHE',
      },
      {
        kd_merk: '198',
        mrk_desc: 'JIEDA',
      },
      {
        kd_merk: '199',
        mrk_desc: 'JINHAO',
      },
      {
        kd_merk: '200',
        mrk_desc: 'JINCHENG',
      },
      {
        kd_merk: '461',
        mrk_desc: 'JINLING',
      },
      {
        kd_merk: '636',
        mrk_desc: 'JOHNDEERE',
      },
      {
        kd_merk: '768',
        mrk_desc: 'JRD',
      },
      {
        kd_merk: '201',
        mrk_desc: 'JRDCHENG',
      },
      {
        kd_merk: '202',
        mrk_desc: 'JUMBO',
      },
      {
        kd_merk: '203',
        mrk_desc: 'JUPITER',
      },
      {
        kd_merk: '204',
        mrk_desc: 'JUVE',
      },
      {
        kd_merk: '205',
        mrk_desc: 'KAISAR',
      },
      {
        kd_merk: '206',
        mrk_desc: 'KAISER',
      },
      {
        kd_merk: '555',
        mrk_desc: 'KAITO',
      },
      {
        kd_merk: '207',
        mrk_desc: 'KALMAR',
      },
      {
        kd_merk: '208',
        mrk_desc: 'KANCIL',
      },
      {
        kd_merk: '209',
        mrk_desc: 'KANZEN',
      },
      {
        kd_merk: '653',
        mrk_desc: 'KARATE',
      },
      {
        kd_merk: '462',
        mrk_desc: 'KARCHER',
      },
      {
        kd_merk: '210',
        mrk_desc: 'KASEA',
      },
      {
        kd_merk: '211',
        mrk_desc: 'KASIMA',
      },
      {
        kd_merk: '212',
        mrk_desc: 'KATO',
      },
      {
        kd_merk: '213',
        mrk_desc: 'KAWASAKI',
      },
      {
        kd_merk: '214',
        mrk_desc: 'KENTWORTH',
      },
      {
        kd_merk: '215',
        mrk_desc: 'KIA',
      },
      {
        kd_merk: '216',
        mrk_desc: 'KIMSUNG',
      },
      {
        kd_merk: '769',
        mrk_desc: 'KIOTI',
      },
      {
        kd_merk: '217',
        mrk_desc: 'KOBELCO',
      },
      {
        kd_merk: '463',
        mrk_desc: 'KOENIGSEGG',
      },
      {
        kd_merk: '218',
        mrk_desc: 'KOKOHFU',
      },
      {
        kd_merk: '219',
        mrk_desc: 'KOMARI',
      },
      {
        kd_merk: '220',
        mrk_desc: 'KOMATSU',
      },
      {
        kd_merk: '221',
        mrk_desc: 'KRAZ',
      },
      {
        kd_merk: '222',
        mrk_desc: 'KTM',
      },
      {
        kd_merk: '464',
        mrk_desc: 'KUBOTA',
      },
      {
        kd_merk: '608',
        mrk_desc: 'KUMBONG',
      },
      {
        kd_merk: '223',
        mrk_desc: 'KUTAMA',
      },
      {
        kd_merk: '224',
        mrk_desc: 'KYMCO',
      },
      {
        kd_merk: '225',
        mrk_desc: 'KYOTO',
      },
      {
        kd_merk: '226',
        mrk_desc: 'LAIBAOCHI',
      },
      {
        kd_merk: '227',
        mrk_desc: 'LAMBHORGHINI',
      },
      {
        kd_merk: '633',
        mrk_desc: 'LAMBORGHINI',
      },
      {
        kd_merk: '228',
        mrk_desc: 'LAMBRETA',
      },
      {
        kd_merk: '465',
        mrk_desc: 'LANDINI',
      },
      {
        kd_merk: '770',
        mrk_desc: 'LANDINIA',
      },
      {
        kd_merk: '229',
        mrk_desc: 'LANDROVER',
      },
      {
        kd_merk: '489',
        mrk_desc: 'LEXUS',
      },
      {
        kd_merk: '230',
        mrk_desc: 'LEYLAND',
      },
      {
        kd_merk: '771',
        mrk_desc: 'LIEBHER',
      },
      {
        kd_merk: '231',
        mrk_desc: 'LIEBHERR',
      },
      {
        kd_merk: '232',
        mrk_desc: 'LIFAN',
      },
      {
        kd_merk: '233',
        mrk_desc: 'LIGER',
      },
      {
        kd_merk: '467',
        mrk_desc: 'LINCOLN',
      },
      {
        kd_merk: '468',
        mrk_desc: 'LINDE',
      },
      {
        kd_merk: '234',
        mrk_desc: 'LINKBELT',
      },
      {
        kd_merk: '626',
        mrk_desc: 'LIUGONG',
      },
      {
        kd_merk: '629',
        mrk_desc: 'LMG',
      },
      {
        kd_merk: '646',
        mrk_desc: 'LML',
      },
      {
        kd_merk: '235',
        mrk_desc: 'LONCIN',
      },
      {
        kd_merk: '236',
        mrk_desc: 'LONCINI',
      },
      {
        kd_merk: '237',
        mrk_desc: 'LONDONTAXIS',
      },
      {
        kd_merk: '238',
        mrk_desc: 'LONGMA',
      },
      {
        kd_merk: '239',
        mrk_desc: 'LORAIN',
      },
      {
        kd_merk: '772',
        mrk_desc: 'LOTUS',
      },
      {
        kd_merk: '240',
        mrk_desc: 'LOWTON',
      },
      {
        kd_merk: '609',
        mrk_desc: 'LUFKIN',
      },
      {
        kd_merk: '648',
        mrk_desc: 'M-BIZ',
      },
      {
        kd_merk: '241',
        mrk_desc: 'MACHLESS',
      },
      {
        kd_merk: '773',
        mrk_desc: 'MACK',
      },
      {
        kd_merk: '242',
        mrk_desc: 'MACKLESS',
      },
      {
        kd_merk: '243',
        mrk_desc: 'MAGIRUS',
      },
      {
        kd_merk: '244',
        mrk_desc: 'MAHATOR',
      },
      {
        kd_merk: '245',
        mrk_desc: 'MAHINDRA',
      },
      {
        kd_merk: '246',
        mrk_desc: 'MAICO',
      },
      {
        kd_merk: '632',
        mrk_desc: 'MAK',
      },
      {
        kd_merk: '247',
        mrk_desc: 'MAN',
      },
      {
        kd_merk: '248',
        mrk_desc: 'MANDIRI',
      },
      {
        kd_merk: '469',
        mrk_desc: 'MANITOWOC',
      },
      {
        kd_merk: '249',
        mrk_desc: 'MASERATI',
      },
      {
        kd_merk: '250',
        mrk_desc: 'MASINDO',
      },
      {
        kd_merk: '470',
        mrk_desc: 'MASSEYFERGUSON',
      },
      {
        kd_merk: '774',
        mrk_desc: 'MATCHLESS',
      },
      {
        kd_merk: '251',
        mrk_desc: 'MATRA',
      },
      {
        kd_merk: '601',
        mrk_desc: 'MAXMA',
      },
      {
        kd_merk: '252',
        mrk_desc: 'MAYBACH',
      },
      {
        kd_merk: '253',
        mrk_desc: 'MAZDA',
      },
      {
        kd_merk: '800',
        mrk_desc: 'MCLAREN',
      },
      {
        kd_merk: '254',
        mrk_desc: 'MEGURO',
      },
      {
        kd_merk: '255',
        mrk_desc: 'MERCEDESBENZ',
      },
      {
        kd_merk: '256',
        mrk_desc: 'MERCURY',
      },
      {
        kd_merk: '257',
        mrk_desc: 'MG',
      },
      {
        kd_merk: '827',
        mrk_desc: 'MIGO',
      },
      {
        kd_merk: '258',
        mrk_desc: 'MILLENIUM',
      },
      {
        kd_merk: '599',
        mrk_desc: 'MINERVA',
      },
      {
        kd_merk: '491',
        mrk_desc: 'MINI',
      },
      {
        kd_merk: '259',
        mrk_desc: 'MINICOOPER',
      },
      {
        kd_merk: '260',
        mrk_desc: 'MINICAR',
      },
      {
        kd_merk: '775',
        mrk_desc: 'MITISUBISHI',
      },
      {
        kd_merk: '261',
        mrk_desc: 'MITSUBISHI',
      },
      {
        kd_merk: '639',
        mrk_desc: 'MMC',
      },
      {
        kd_merk: '262',
        mrk_desc: 'MOBET',
      },
      {
        kd_merk: '263',
        mrk_desc: 'MOBILLETE',
      },
      {
        kd_merk: '264',
        mrk_desc: 'MOCIN',
      },
      {
        kd_merk: '265',
        mrk_desc: 'MODENAS',
      },
      {
        kd_merk: '573',
        mrk_desc: 'MONSTRAC',
      },
      {
        kd_merk: '624',
        mrk_desc: 'MONTRADA',
      },
      {
        kd_merk: '266',
        mrk_desc: 'MORIN',
      },
      {
        kd_merk: '267',
        mrk_desc: 'MORINA',
      },
      {
        kd_merk: '268',
        mrk_desc: 'MORRIS',
      },
      {
        kd_merk: '269',
        mrk_desc: 'MOSKVICH',
      },
      {
        kd_merk: '270',
        mrk_desc: 'MOTOACE',
      },
      {
        kd_merk: '271',
        mrk_desc: 'MOTOGUZZI',
      },
      {
        kd_merk: '272',
        mrk_desc: 'MOTORA',
      },
      {
        kd_merk: '273',
        mrk_desc: 'MOTORI',
      },
      {
        kd_merk: '274',
        mrk_desc: 'MULTICAR',
      },
      {
        kd_merk: '275',
        mrk_desc: 'MVAGUSTA',
      },
      {
        kd_merk: '276',
        mrk_desc: 'MYPET',
      },
      {
        kd_merk: '778',
        mrk_desc: 'MZ',
      },
      {
        kd_merk: '277',
        mrk_desc: 'NANFANG',
      },
      {
        kd_merk: '278',
        mrk_desc: 'NANKING',
      },
      {
        kd_merk: '279',
        mrk_desc: 'NASH',
      },
      {
        kd_merk: '280',
        mrk_desc: 'NASHA',
      },
      {
        kd_merk: '779',
        mrk_desc: 'NEMESIS',
      },
      {
        kd_merk: '281',
        mrk_desc: 'NEWHOLLAND',
      },
      {
        kd_merk: '282',
        mrk_desc: 'NEWHOLLANDWHE',
      },
      {
        kd_merk: '472',
        mrk_desc: 'NICHIO',
      },
      {
        kd_merk: '473',
        mrk_desc: 'NICHIONIPPON',
      },
      {
        kd_merk: '283',
        mrk_desc: 'NIGATA',
      },
      {
        kd_merk: '284',
        mrk_desc: 'NISSAN',
      },
      {
        kd_merk: '285',
        mrk_desc: 'NORTON',
      },
      {
        kd_merk: '574',
        mrk_desc: 'NOZOMI',
      },
      {
        kd_merk: '286',
        mrk_desc: 'NSU',
      },
      {
        kd_merk: '287',
        mrk_desc: 'NUSANTARA',
      },
      {
        kd_merk: '288',
        mrk_desc: 'O&K',
      },
      {
        kd_merk: '289',
        mrk_desc: 'OPEL',
      },
      {
        kd_merk: '290',
        mrk_desc: 'OSHKOSH',
      },
      {
        kd_merk: '538',
        mrk_desc: 'OTONAS',
      },
      {
        kd_merk: '291',
        mrk_desc: 'OTTAWA',
      },
      {
        kd_merk: '292',
        mrk_desc: 'P&H',
      },
      {
        kd_merk: '293',
        mrk_desc: 'PACCARD',
      },
      {
        kd_merk: '294',
        mrk_desc: 'PANDA',
      },
      {
        kd_merk: '295',
        mrk_desc: 'PANONIA',
      },
      {
        kd_merk: '296',
        mrk_desc: 'PATRIA',
      },
      {
        kd_merk: '297',
        mrk_desc: 'PERKASA',
      },
      {
        kd_merk: '474',
        mrk_desc: 'PERKIN',
      },
      {
        kd_merk: '298',
        mrk_desc: 'PETERBILT',
      },
      {
        kd_merk: '299',
        mrk_desc: 'PEUGEOT',
      },
      {
        kd_merk: '300',
        mrk_desc: 'PGO',
      },
      {
        kd_merk: '301',
        mrk_desc: 'PIAGGIO',
      },
      {
        kd_merk: '302',
        mrk_desc: 'PLAYMOUTH',
      },
      {
        kd_merk: '782',
        mrk_desc: 'PLYMOUTH',
      },
      {
        kd_merk: '303',
        mrk_desc: 'POINTER',
      },
      {
        kd_merk: '304',
        mrk_desc: 'PONTIAC',
      },
      {
        kd_merk: '305',
        mrk_desc: 'PORSCHE',
      },
      {
        kd_merk: '306',
        mrk_desc: 'PRISMA',
      },
      {
        kd_merk: '307',
        mrk_desc: 'PROTON',
      },
      {
        kd_merk: '308',
        mrk_desc: 'PUCH',
      },
      {
        kd_merk: '309',
        mrk_desc: 'PUCHSTEYER',
      },
      {
        kd_merk: '475',
        mrk_desc: 'PWH',
      },
      {
        kd_merk: '733',
        mrk_desc: 'QESTAR',
      },
      {
        kd_merk: '310',
        mrk_desc: 'QINGQI',
      },
      {
        kd_merk: '311',
        mrk_desc: 'QUZZO',
      },
      {
        kd_merk: '312',
        mrk_desc: 'RAMBLER',
      },
      {
        kd_merk: '313',
        mrk_desc: 'RANGEROVER',
      },
      {
        kd_merk: '314',
        mrk_desc: 'REBER',
      },
      {
        kd_merk: '315',
        mrk_desc: 'RENAULT',
      },
      {
        kd_merk: '316',
        mrk_desc: 'RENAULTBERLIET',
      },
      {
        kd_merk: '638',
        mrk_desc: 'REO',
      },
      {
        kd_merk: '783',
        mrk_desc: 'ROLLROYCE',
      },
      {
        kd_merk: '317',
        mrk_desc: 'ROLLSROYCE',
      },
      {
        kd_merk: '318',
        mrk_desc: 'ROMAN',
      },
      {
        kd_merk: '319',
        mrk_desc: 'ROSEN',
      },
      {
        kd_merk: '320',
        mrk_desc: 'ROVER',
      },
      {
        kd_merk: '321',
        mrk_desc: 'ROYAL',
      },
      {
        kd_merk: '322',
        mrk_desc: 'ROYALENFIELD',
      },
      {
        kd_merk: '323',
        mrk_desc: 'RUBBER',
      },
      {
        kd_merk: '324',
        mrk_desc: 'SAAB',
      },
      {
        kd_merk: '478',
        mrk_desc: 'SAKAI',
      },
      {
        kd_merk: '623',
        mrk_desc: 'SAKALINO',
      },
      {
        kd_merk: '325',
        mrk_desc: 'SAMSUNG',
      },
      {
        kd_merk: '326',
        mrk_desc: 'SANYANG',
      },
      {
        kd_merk: '327',
        mrk_desc: 'SANEX',
      },
      {
        kd_merk: '328',
        mrk_desc: 'SANTAIWONG',
      },
      {
        kd_merk: '784',
        mrk_desc: 'SANY',
      },
      {
        kd_merk: '329',
        mrk_desc: 'SANYA',
      },
      {
        kd_merk: '330',
        mrk_desc: 'SATO',
      },
      {
        kd_merk: '471',
        mrk_desc: 'SAVIEN',
      },
      {
        kd_merk: '331',
        mrk_desc: 'SCAMEL',
      },
      {
        kd_merk: '332',
        mrk_desc: 'SCANIA',
      },
      {
        kd_merk: '333',
        mrk_desc: 'SCEPER',
      },
      {
        kd_merk: '334',
        mrk_desc: 'SCODA',
      },
      {
        kd_merk: '335',
        mrk_desc: 'SCONA',
      },
      {
        kd_merk: '002',
        mrk_desc: 'SEDAN',
      },
      {
        kd_merk: '336',
        mrk_desc: 'SEDDON',
      },
      {
        kd_merk: '337',
        mrk_desc: 'SELTECH',
      },
      {
        kd_merk: '338',
        mrk_desc: 'SEMERU',
      },
      {
        kd_merk: '647',
        mrk_desc: 'SHAANXI',
      },
      {
        kd_merk: '577',
        mrk_desc: 'SHAMO',
      },
      {
        kd_merk: '339',
        mrk_desc: 'SHANGHAI',
      },
      {
        kd_merk: '627',
        mrk_desc: 'SHANTUI',
      },
      {
        kd_merk: '340',
        mrk_desc: 'SHIFENG',
      },
      {
        kd_merk: '670',
        mrk_desc: 'SHINJIN',
      },
      {
        kd_merk: '341',
        mrk_desc: 'SHIRA',
      },
      {
        kd_merk: '342',
        mrk_desc: 'SHUNDA',
      },
      {
        kd_merk: '343',
        mrk_desc: 'SHUNLI',
      },
      {
        kd_merk: '344',
        mrk_desc: 'SIGRA',
      },
      {
        kd_merk: '345',
        mrk_desc: 'SIMCA',
      },
      {
        kd_merk: '346',
        mrk_desc: 'SINA',
      },
      {
        kd_merk: '806',
        mrk_desc: 'SINOTRUK',
      },
      {
        kd_merk: '503',
        mrk_desc: 'SKODA',
      },
      {
        kd_merk: '479',
        mrk_desc: 'SKYJACK',
      },
      {
        kd_merk: '808',
        mrk_desc: 'SMSPORT',
      },
      {
        kd_merk: '347',
        mrk_desc: 'SMART',
      },
      {
        kd_merk: '650',
        mrk_desc: 'SOIB',
      },
      {
        kd_merk: '515',
        mrk_desc: 'SONI',
      },
      {
        kd_merk: '594',
        mrk_desc: 'SP',
      },
      {
        kd_merk: '348',
        mrk_desc: 'SPARTA',
      },
      {
        kd_merk: '349',
        mrk_desc: 'SPARTAADLER',
      },
      {
        kd_merk: '350',
        mrk_desc: 'SRIKANDI',
      },
      {
        kd_merk: '351',
        mrk_desc: 'SSANGYONG',
      },
      {
        kd_merk: '352',
        mrk_desc: 'STANDART',
      },
      {
        kd_merk: '353',
        mrk_desc: 'STARWAY',
      },
      {
        kd_merk: '619',
        mrk_desc: 'STEELBROS',
      },
      {
        kd_merk: '354',
        mrk_desc: 'STEYER',
      },
      {
        kd_merk: '355',
        mrk_desc: 'STUDEBAKER',
      },
      {
        kd_merk: '356',
        mrk_desc: 'SUBARU',
      },
      {
        kd_merk: '357',
        mrk_desc: 'SUMIMOTO',
      },
      {
        kd_merk: '786',
        mrk_desc: 'SUMITOMO',
      },
      {
        kd_merk: '787',
        mrk_desc: 'SUMO',
      },
      {
        kd_merk: '358',
        mrk_desc: 'SUMOMOTO',
      },
      {
        kd_merk: '359',
        mrk_desc: 'SUNBEAM',
      },
      {
        kd_merk: '360',
        mrk_desc: 'SUNDIRO',
      },
      {
        kd_merk: '361',
        mrk_desc: 'SUPERBOSS',
      },
      {
        kd_merk: '362',
        mrk_desc: 'SUPERSTAR',
      },
      {
        kd_merk: '363',
        mrk_desc: 'SUZIKA',
      },
      {
        kd_merk: '364',
        mrk_desc: 'SUZUKI',
      },
      {
        kd_merk: '365',
        mrk_desc: 'SWAN',
      },
      {
        kd_merk: '578',
        mrk_desc: 'SYM',
      },
      {
        kd_merk: '366',
        mrk_desc: 'TAHWA',
      },
      {
        kd_merk: '788',
        mrk_desc: 'TADA',
      },
      {
        kd_merk: '367',
        mrk_desc: 'TADANO',
      },
      {
        kd_merk: '368',
        mrk_desc: 'TAJIMA',
      },
      {
        kd_merk: '612',
        mrk_desc: 'TALBERT',
      },
      {
        kd_merk: '369',
        mrk_desc: 'TATA',
      },
      {
        kd_merk: '370',
        mrk_desc: 'TAUNUS',
      },
      {
        kd_merk: '815',
        mrk_desc: 'TAWON',
      },
      {
        kd_merk: '371',
        mrk_desc: 'TCM',
      },
      {
        kd_merk: '372',
        mrk_desc: 'TERBERG',
      },
      {
        kd_merk: '789',
        mrk_desc: 'TEREX',
      },
      {
        kd_merk: '595',
        mrk_desc: 'TERREX',
      },
      {
        kd_merk: '829',
        mrk_desc: 'TESLA',
      },
      {
        kd_merk: '373',
        mrk_desc: 'THAMES',
      },
      {
        kd_merk: '374',
        mrk_desc: 'TIGER',
      },
      {
        kd_merk: '375',
        mrk_desc: 'TIMBERJACK',
      },
      {
        kd_merk: '376',
        mrk_desc: 'TIMOR',
      },
      {
        kd_merk: '580',
        mrk_desc: 'TMA',
      },
      {
        kd_merk: '377',
        mrk_desc: 'TOHATSU',
      },
      {
        kd_merk: '378',
        mrk_desc: 'TOKYO',
      },
      {
        kd_merk: '504',
        mrk_desc: 'TORINDO',
      },
      {
        kd_merk: '824',
        mrk_desc: 'TORROT',
      },
      {
        kd_merk: '379',
        mrk_desc: 'TOSSA',
      },
      {
        kd_merk: '483',
        mrk_desc: 'TOWED',
      },
      {
        kd_merk: '380',
        mrk_desc: 'TOYOPET',
      },
      {
        kd_merk: '512',
        mrk_desc: 'TOYOSON',
      },
      {
        kd_merk: '381',
        mrk_desc: 'TOYOTA',
      },
      {
        kd_merk: '382',
        mrk_desc: 'TRACTOR',
      },
      {
        kd_merk: '383',
        mrk_desc: 'TRIUMPH',
      },
      {
        kd_merk: '384',
        mrk_desc: 'TURBO',
      },
      {
        kd_merk: '622',
        mrk_desc: 'TVS',
      },
      {
        kd_merk: '799',
        mrk_desc: 'TVSKING',
      },
      {
        kd_merk: '385',
        mrk_desc: 'TWA',
      },
      {
        kd_merk: '640',
        mrk_desc: 'UDTRUCK',
      },
      {
        kd_merk: '790',
        mrk_desc: 'UDTRUCKS',
      },
      {
        kd_merk: '386',
        mrk_desc: 'UNIMOG',
      },
      {
        kd_merk: '387',
        mrk_desc: 'UNIVERSAL',
      },
      {
        kd_merk: '798',
        mrk_desc: 'URAL',
      },
      {
        kd_merk: '388',
        mrk_desc: 'VALIANT',
      },
      {
        kd_merk: '389',
        mrk_desc: 'VALMET',
      },
      {
        kd_merk: '390',
        mrk_desc: 'VANGUARD',
      },
      {
        kd_merk: '391',
        mrk_desc: 'VANGUARDVAK',
      },
      {
        kd_merk: '392',
        mrk_desc: 'VARIA',
      },
      {
        kd_merk: '393',
        mrk_desc: 'VAUXHAL',
      },
      {
        kd_merk: '394',
        mrk_desc: 'VENUS',
      },
      {
        kd_merk: '395',
        mrk_desc: 'VESPA',
      },
      {
        kd_merk: '396',
        mrk_desc: 'VIAR',
      },
      {
        kd_merk: '397',
        mrk_desc: 'VICTORIA',
      },
      {
        kd_merk: '791',
        mrk_desc: 'VICTORY',
      },
      {
        kd_merk: '398',
        mrk_desc: 'VIVA',
      },
      {
        kd_merk: '399',
        mrk_desc: 'VIVAMAS',
      },
      {
        kd_merk: '400',
        mrk_desc: 'VOLKSWAGEN',
      },
      {
        kd_merk: '401',
        mrk_desc: 'VOLVO',
      },
      {
        kd_merk: '402',
        mrk_desc: 'WAGONER',
      },
      {
        kd_merk: '403',
        mrk_desc: 'WANGGUAN',
      },
      {
        kd_merk: '404',
        mrk_desc: 'WASTERNSTAR',
      },
      {
        kd_merk: '405',
        mrk_desc: 'WAVE',
      },
      {
        kd_merk: '598',
        mrk_desc: 'WAW',
      },
      {
        kd_merk: '792',
        mrk_desc: 'WESTERNSTAR',
      },
      {
        kd_merk: '659',
        mrk_desc: 'WESTSTARMAXUS',
      },
      {
        kd_merk: '406',
        mrk_desc: 'WIDECO',
      },
      {
        kd_merk: '407',
        mrk_desc: 'WILLYS',
      },
      {
        kd_merk: '408',
        mrk_desc: 'WINS',
      },
      {
        kd_merk: '409',
        mrk_desc: 'WOLGA',
      },
      {
        kd_merk: '487',
        mrk_desc: 'WRANGLER',
      },
      {
        kd_merk: '410',
        mrk_desc: 'WULING',
      },
      {
        kd_merk: '411',
        mrk_desc: 'WUYANG',
      },
      {
        kd_merk: '628',
        mrk_desc: 'XCMG',
      },
      {
        kd_merk: '793',
        mrk_desc: 'XCMGBRAND',
      },
      {
        kd_merk: '412',
        mrk_desc: 'XENA',
      },
      {
        kd_merk: '794',
        mrk_desc: 'XGMA',
      },
      {
        kd_merk: '795',
        mrk_desc: 'XIAGONG',
      },
      {
        kd_merk: '413',
        mrk_desc: 'XIANGJIANG',
      },
      {
        kd_merk: '414',
        mrk_desc: 'XIHU',
      },
      {
        kd_merk: '415',
        mrk_desc: 'XINDONGLI',
      },
      {
        kd_merk: '417',
        mrk_desc: 'XINBAO',
      },
      {
        kd_merk: '416',
        mrk_desc: 'XINGFU',
      },
      {
        kd_merk: '418',
        mrk_desc: 'XIONGFENG',
      },
      {
        kd_merk: '419',
        mrk_desc: 'YALE',
      },
      {
        kd_merk: '420',
        mrk_desc: 'YAMAGUCHI',
      },
      {
        kd_merk: '421',
        mrk_desc: 'YAMAHA',
      },
      {
        kd_merk: '557',
        mrk_desc: 'YAMASITA',
      },
      {
        kd_merk: '796',
        mrk_desc: 'YANMAR',
      },
      {
        kd_merk: '422',
        mrk_desc: 'YASUKA',
      },
      {
        kd_merk: '797',
        mrk_desc: 'YAZUKI',
      },
      {
        kd_merk: '423',
        mrk_desc: 'YINGXIANG',
      },
      {
        kd_merk: '424',
        mrk_desc: 'YIYING',
      },
      {
        kd_merk: '425',
        mrk_desc: 'YORIKO',
      },
      {
        kd_merk: '426',
        mrk_desc: 'YUEJIN',
      },
      {
        kd_merk: '427',
        mrk_desc: 'YXMOT',
      },
      {
        kd_merk: '428',
        mrk_desc: 'ZEALSUN',
      },
      {
        kd_merk: '644',
        mrk_desc: 'ZELE',
      },
      {
        kd_merk: '823',
        mrk_desc: 'ZEROENGINEERING',
      },
      {
        kd_merk: '429',
        mrk_desc: 'ZESTAPA',
      },
      {
        kd_merk: '430',
        mrk_desc: 'ZETOR',
      },
      {
        kd_merk: '431',
        mrk_desc: 'ZETSTAR',
      },
      {
        kd_merk: '432',
        mrk_desc: 'ZHONGYU',
      },
      {
        kd_merk: '654',
        mrk_desc: 'ZNA',
      },
      {
        kd_merk: '433',
        mrk_desc: 'ZODIAC',
      },
      {
        kd_merk: '434',
        mrk_desc: 'ZONGSHEN',
      },
      {
        kd_merk: '435',
        mrk_desc: 'ZUNDAP',
      },
    ]

    return _.find(merek, { kd_merk })
  }

  private getModel(kd_jenis: string) {
    const model = [
      {
        id_model: 1,
        id_jns_bpkb: 1,
        kd_jenis: '101',
        model_desc: 'SEDAN',
      },
      {
        id_model: 2,
        id_jns_bpkb: 2,
        kd_jenis: '202',
        model_desc: 'BUS',
      },
      {
        id_model: 3,
        id_jns_bpkb: 1,
        kd_jenis: '103',
        model_desc: 'MINIBUS',
      },
      {
        id_model: 4,
        id_jns_bpkb: 1,
        kd_jenis: '102',
        model_desc: 'JEEP',
      },
      {
        id_model: 5,
        id_jns_bpkb: 3,
        kd_jenis: '301',
        model_desc: 'PICK UP',
      },
      {
        id_model: 6,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRUCK',
      },
      {
        id_model: 7,
        id_jns_bpkb: 3,
        kd_jenis: '351',
        model_desc: 'LIGHT TRUCK',
      },
      {
        id_model: 8,
        id_jns_bpkb: 3,
        kd_jenis: '404',
        model_desc: 'TRUCK BOX',
      },
      {
        id_model: 9,
        id_jns_bpkb: 3,
        kd_jenis: '435',
        model_desc: 'TRUCK TANGKI',
      },
      {
        id_model: 10,
        id_jns_bpkb: 3,
        kd_jenis: '439',
        model_desc: 'TRUCK TRONTON',
      },
      {
        id_model: 11,
        id_jns_bpkb: 3,
        kd_jenis: '411',
        model_desc: 'TRUCK CRANE',
      },
      {
        id_model: 12,
        id_jns_bpkb: 3,
        kd_jenis: '305',
        model_desc: 'DOUBLE CABIN',
      },
      {
        id_model: 13,
        id_jns_bpkb: 3,
        kd_jenis: '437',
        model_desc: 'TRUCK TRAILER',
      },
      {
        id_model: 14,
        id_jns_bpkb: 3,
        kd_jenis: '452',
        model_desc: 'MIXER TRONTON',
      },
      {
        id_model: 15,
        id_jns_bpkb: 3,
        kd_jenis: '428',
        model_desc: 'LODGING TRUCK',
      },
      {
        id_model: 16,
        id_jns_bpkb: 3,
        kd_jenis: '432',
        model_desc: 'TRUCK TANDUM',
      },
      {
        id_model: 17,
        id_jns_bpkb: 3,
        kd_jenis: '429',
        model_desc: 'PRIME MOVER',
      },
      {
        id_model: 18,
        id_jns_bpkb: 3,
        kd_jenis: '417',
        model_desc: 'TRUCK DUMP',
      },
      {
        id_model: 19,
        id_jns_bpkb: 2,
        kd_jenis: '201',
        model_desc: 'MICROBUS',
      },
      {
        id_model: 20,
        id_jns_bpkb: 4,
        kd_jenis: '702',
        model_desc: 'SEPEDA MOTOR R3',
      },
      {
        id_model: 27,
        id_jns_bpkb: 3,
        kd_jenis: '352',
        model_desc: 'LIGHT TRUCK BOX',
      },
      {
        id_model: 28,
        id_jns_bpkb: 3,
        kd_jenis: '303',
        model_desc: 'PICK UP BOX',
      },
      {
        id_model: 29,
        id_jns_bpkb: 3,
        kd_jenis: '459',
        model_desc: 'TRUCK MIXER',
      },
      {
        id_model: 31,
        id_jns_bpkb: 3,
        kd_jenis: '436',
        model_desc: 'TRACTOR HEAD',
      },
      {
        id_model: 32,
        id_jns_bpkb: 3,
        kd_jenis: '449',
        model_desc: 'TRONTON DUMP',
      },
      {
        id_model: 33,
        id_jns_bpkb: 3,
        kd_jenis: '455',
        model_desc: 'TANGKI TRONTON',
      },
      {
        id_model: 35,
        id_jns_bpkb: 3,
        kd_jenis: '353',
        model_desc: 'LIGHT TRUCK DUMP',
      },
      {
        id_model: 36,
        id_jns_bpkb: 4,
        kd_jenis: '701',
        model_desc: 'SOLO',
      },
      {
        id_model: 39,
        id_jns_bpkb: 4,
        kd_jenis: '701',
        model_desc: 'SPORT',
      },
      {
        id_model: 40,
        id_jns_bpkb: 4,
        kd_jenis: '701',
        model_desc: 'TRAIL',
      },
      {
        id_model: 42,
        id_jns_bpkb: 4,
        kd_jenis: '701',
        model_desc: 'SCOOTER',
      },
      {
        id_model: 307,
        id_jns_bpkb: 3,
        kd_jenis: '357',
        model_desc: 'LIGHT TRUCK TANGKI',
      },
      {
        id_model: 308,
        id_jns_bpkb: 8,
        kd_jenis: '514',
        model_desc: 'AMBULANCE',
      },
      {
        id_model: 309,
        id_jns_bpkb: 8,
        kd_jenis: '515',
        model_desc: 'AMBULANCE',
      },
      {
        id_model: 310,
        id_jns_bpkb: 3,
        kd_jenis: '355',
        model_desc: 'LIGHT TRUCK CRANE',
      },
      {
        id_model: 311,
        id_jns_bpkb: 3,
        kd_jenis: '360',
        model_desc: 'LIGHT TRUCK MIXER',
      },
      {
        id_model: 314,
        id_jns_bpkb: 3,
        kd_jenis: '301',
        model_desc: 'DOUBLE CABIN',
      },
      {
        id_model: 315,
        id_jns_bpkb: 3,
        kd_jenis: '361',
        model_desc: 'LIGHT TRUCK DEREK',
      },
      {
        id_model: 316,
        id_jns_bpkb: 2,
        kd_jenis: '358',
        model_desc: 'MICROBUS',
      },
      {
        id_model: 318,
        id_jns_bpkb: 1,
        kd_jenis: '311',
        model_desc: 'STATION WAGON',
      },
      {
        id_model: 319,
        id_jns_bpkb: 3,
        kd_jenis: '365',
        model_desc: 'BESTLEWAGON',
      },
      {
        id_model: 320,
        id_jns_bpkb: 8,
        kd_jenis: '516',
        model_desc: 'RANSUS TAHANAN',
      },
      {
        id_model: 321,
        id_jns_bpkb: 1,
        kd_jenis: '308',
        model_desc: 'MINIBUS (EX PICKUP)',
      },
      {
        id_model: 322,
        id_jns_bpkb: 3,
        kd_jenis: '409',
        model_desc: 'CONGCRETE PUMP',
      },
      {
        id_model: 323,
        id_jns_bpkb: 3,
        kd_jenis: '414',
        model_desc: 'TRUCK DEREK',
      },
      {
        id_model: 324,
        id_jns_bpkb: 3,
        kd_jenis: '306',
        model_desc: 'DELIVERY VAN',
      },
      {
        id_model: 325,
        id_jns_bpkb: 3,
        kd_jenis: '302',
        model_desc: 'BESTLEWAGON',
      },
      {
        id_model: 326,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRACKTOR HEAD',
      },
      {
        id_model: 329,
        id_jns_bpkb: 8,
        kd_jenis: '510',
        model_desc: 'RANSUS PEMADAM',
      },
      {
        id_model: 330,
        id_jns_bpkb: 3,
        kd_jenis: '304',
        model_desc: 'DOUBLE CABIN',
      },
      {
        id_model: 331,
        id_jns_bpkb: 3,
        kd_jenis: '307',
        model_desc: 'PICK UP',
      },
      {
        id_model: 332,
        id_jns_bpkb: 3,
        kd_jenis: '309',
        model_desc: 'PICK UP TANGKI',
      },
      {
        id_model: 333,
        id_jns_bpkb: 3,
        kd_jenis: '310',
        model_desc: 'PICK UP DEREK',
      },
      {
        id_model: 335,
        id_jns_bpkb: 3,
        kd_jenis: '354',
        model_desc: 'LIGHT TRUCK KARGO',
      },
      {
        id_model: 336,
        id_jns_bpkb: 3,
        kd_jenis: '359',
        model_desc: 'LIGHT TRUCK TRONTON',
      },
      {
        id_model: 337,
        id_jns_bpkb: 3,
        kd_jenis: '362',
        model_desc: 'LIGHT TRUCK CAR CARRIER',
      },
      {
        id_model: 338,
        id_jns_bpkb: 3,
        kd_jenis: '363',
        model_desc: 'LIGHT TRUCK TANDUM BAK',
      },
      {
        id_model: 339,
        id_jns_bpkb: 3,
        kd_jenis: '364',
        model_desc: 'LIGHT TRUCK DELIVERY VAN',
      },
      {
        id_model: 347,
        id_jns_bpkb: 3,
        kd_jenis: '368',
        model_desc: 'LIGHT TRUCK BESI',
      },
      {
        id_model: 348,
        id_jns_bpkb: 3,
        kd_jenis: '366',
        model_desc: 'LIGHT TRUCK BAK TERBUKA',
      },
      {
        id_model: 349,
        id_jns_bpkb: 3,
        kd_jenis: '367',
        model_desc: 'LIGHT TRUCK BAK KAYU',
      },
      {
        id_model: 350,
        id_jns_bpkb: 3,
        kd_jenis: '369',
        model_desc: 'LIGHT TRUCK LODGING',
      },
      {
        id_model: 351,
        id_jns_bpkb: 3,
        kd_jenis: '370',
        model_desc: 'LIGHT TRUCK TRACTOR HEAD',
      },
      {
        id_model: 352,
        id_jns_bpkb: 3,
        kd_jenis: '371',
        model_desc: 'LIGHT TRUCK TRAILER',
      },
      {
        id_model: 353,
        id_jns_bpkb: 3,
        kd_jenis: '372',
        model_desc: 'LIGHT TRUCK RIVER CONTAINER',
      },
      {
        id_model: 354,
        id_jns_bpkb: 3,
        kd_jenis: '402',
        model_desc: 'TRUCK BESTELWAGON',
      },
      {
        id_model: 355,
        id_jns_bpkb: 3,
        kd_jenis: '403',
        model_desc: 'TRUCK BEVERAGE RACK',
      },
      {
        id_model: 356,
        id_jns_bpkb: 3,
        kd_jenis: '405',
        model_desc: 'TRUCK BUCK EQ CABLE',
      },
      {
        id_model: 357,
        id_jns_bpkb: 3,
        kd_jenis: '406',
        model_desc: 'TRUCK CAR CARRIER',
      },
      {
        id_model: 358,
        id_jns_bpkb: 3,
        kd_jenis: '407',
        model_desc: 'TRUCK COMPACTOR',
      },
      {
        id_model: 359,
        id_jns_bpkb: 3,
        kd_jenis: '408',
        model_desc: 'TRUCK CONGCRETE MIXRER',
      },
      {
        id_model: 360,
        id_jns_bpkb: 3,
        kd_jenis: '410',
        model_desc: 'TRUCK CONTENSIONER',
      },
      {
        id_model: 361,
        id_jns_bpkb: 3,
        kd_jenis: '412',
        model_desc: 'TRUCK CRAWLER',
      },
      {
        id_model: 362,
        id_jns_bpkb: 3,
        kd_jenis: '413',
        model_desc: 'TRUCK DELIVERY VAN',
      },
      {
        id_model: 363,
        id_jns_bpkb: 3,
        kd_jenis: '416',
        model_desc: 'TRUCK DRILLING',
      },
      {
        id_model: 364,
        id_jns_bpkb: 3,
        kd_jenis: '418',
        model_desc: 'TRUCK DUMP CRANE',
      },
      {
        id_model: 365,
        id_jns_bpkb: 3,
        kd_jenis: '419',
        model_desc: 'TRUCK DUMP TANDON',
      },
      {
        id_model: 366,
        id_jns_bpkb: 3,
        kd_jenis: '420',
        model_desc: 'TRUCK DUMP TERTUTUP',
      },
      {
        id_model: 367,
        id_jns_bpkb: 3,
        kd_jenis: '421',
        model_desc: 'TRUCK GANDENGAN',
      },
      {
        id_model: 368,
        id_jns_bpkb: 3,
        kd_jenis: '422',
        model_desc: 'TRUCK GRADER',
      },
      {
        id_model: 369,
        id_jns_bpkb: 3,
        kd_jenis: '423',
        model_desc: 'TRUCK KARGO',
      },
      {
        id_model: 370,
        id_jns_bpkb: 3,
        kd_jenis: '424',
        model_desc: 'TRUCK KARGO CRANE',
      },
      {
        id_model: 371,
        id_jns_bpkb: 3,
        kd_jenis: '425',
        model_desc: 'TRUCK LENGER',
      },
      {
        id_model: 372,
        id_jns_bpkb: 3,
        kd_jenis: '426',
        model_desc: 'TRUCK LOAD RAK',
      },
      {
        id_model: 373,
        id_jns_bpkb: 3,
        kd_jenis: '427',
        model_desc: 'TRUCK LOADING',
      },
      {
        id_model: 374,
        id_jns_bpkb: 3,
        kd_jenis: '430',
        model_desc: 'TRUCK RVR CONTAINER',
      },
      {
        id_model: 375,
        id_jns_bpkb: 3,
        kd_jenis: '431',
        model_desc: 'TRUCK SLEEP WAGON',
      },
      {
        id_model: 376,
        id_jns_bpkb: 3,
        kd_jenis: '433',
        model_desc: 'TRUCK TANDUM  BOX/DELVAN/BESTELWAGON',
      },
      {
        id_model: 377,
        id_jns_bpkb: 3,
        kd_jenis: '434',
        model_desc: 'TRUCK TANDUM TANGKI',
      },
      {
        id_model: 378,
        id_jns_bpkb: 3,
        kd_jenis: '438',
        model_desc: 'TRUCK TANGGA',
      },
      {
        id_model: 379,
        id_jns_bpkb: 3,
        kd_jenis: '440',
        model_desc: 'TRONTON BESTELWAGON',
      },
      {
        id_model: 380,
        id_jns_bpkb: 3,
        kd_jenis: '441',
        model_desc: 'TRONTON  BOX/DELVAN/BESTELWAGON',
      },
      {
        id_model: 381,
        id_jns_bpkb: 3,
        kd_jenis: '442',
        model_desc: 'TRONTON KARGO',
      },
      {
        id_model: 382,
        id_jns_bpkb: 3,
        kd_jenis: '443',
        model_desc: 'TRONTON CONCRETE PUMMP',
      },
      {
        id_model: 383,
        id_jns_bpkb: 3,
        kd_jenis: '444',
        model_desc: 'TRONTON CRANE',
      },
      {
        id_model: 384,
        id_jns_bpkb: 3,
        kd_jenis: '445',
        model_desc: 'TRONTON DELIVERY VAN',
      },
      {
        id_model: 385,
        id_jns_bpkb: 3,
        kd_jenis: '446',
        model_desc: 'TRONTON DEREK',
      },
      {
        id_model: 386,
        id_jns_bpkb: 3,
        kd_jenis: '448',
        model_desc: 'TRONTON DUMP  BOX/DELVAN/BESTELWAGON',
      },
      {
        id_model: 387,
        id_jns_bpkb: 3,
        kd_jenis: '450',
        model_desc: 'TRONTON GANDENGAN',
      },
      {
        id_model: 388,
        id_jns_bpkb: 3,
        kd_jenis: '451',
        model_desc: 'TRONTON LODGING',
      },
      {
        id_model: 389,
        id_jns_bpkb: 3,
        kd_jenis: '453',
        model_desc: 'TRONTON RVR CONTAIN ER  ',
      },
      {
        id_model: 390,
        id_jns_bpkb: 3,
        kd_jenis: '454',
        model_desc: 'TRONTON TANDUM',
      },
      {
        id_model: 391,
        id_jns_bpkb: 3,
        kd_jenis: '456',
        model_desc: 'TRONTON TRACTOR HEAD',
      },
      {
        id_model: 392,
        id_jns_bpkb: 3,
        kd_jenis: '457',
        model_desc: 'TRONTON TRAILER',
      },
      {
        id_model: 393,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRUCK TRONTON',
      },
      {
        id_model: 394,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRUCK MIXER',
      },
      {
        id_model: 395,
        id_jns_bpkb: 3,
        kd_jenis: '351',
        model_desc: 'LIGHT TRUCK MIXER',
      },
      {
        id_model: 396,
        id_jns_bpkb: 3,
        kd_jenis: '351',
        model_desc: 'LIGHT TRUCK DUMP',
      },
      {
        id_model: 397,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRUCK DUMP',
      },
      {
        id_model: 398,
        id_jns_bpkb: 3,
        kd_jenis: '653',
        model_desc: 'TRACKTOR HEAD',
      },
      {
        id_model: 399,
        id_jns_bpkb: 3,
        kd_jenis: '704',
        model_desc: 'BLIND VAN',
      },
      {
        id_model: 400,
        id_jns_bpkb: 3,
        kd_jenis: '401',
        model_desc: 'TRUCK TRAILER',
      },
      {
        id_model: 401,
        id_jns_bpkb: 8,
        kd_jenis: '512',
        model_desc: 'RANSUS LTRUCK SAMPAH',
      },
      {
        id_model: 402,
        id_jns_bpkb: 8,
        kd_jenis: '504',
        model_desc: 'RANSUS JENAZAH',
      },
      {
        id_model: 404,
        id_jns_bpkb: 3,
        kd_jenis: '306',
        model_desc: 'PICK UP DELIVERY VAN',
      },
      {
        id_model: 407,
        id_jns_bpkb: 8,
        kd_jenis: '511',
        model_desc: 'RANSUS PEMADAM',
      },
      {
        id_model: 408,
        id_jns_bpkb: 3,
        kd_jenis: '460',
        model_desc: 'TRUCK DROOP SIDE',
      },
      {
        id_model: 414,
        id_jns_bpkb: 3,
        kd_jenis: '106',
        model_desc: 'MINIBUS DELIVERY VAN',
      },
      {
        id_model: 415,
        id_jns_bpkb: 3,
        kd_jenis: '203',
        model_desc: 'MICROBUS DELIVERY VAN',
      },
      {
        id_model: 416,
        id_jns_bpkb: 3,
        kd_jenis: '628',
        model_desc: 'TRUCK SELF LOADER',
      },
      {
        id_model: 417,
        id_jns_bpkb: 3,
        kd_jenis: '464',
        model_desc: 'TRUCK BAK BESI',
      },
      {
        id_model: 420,
        id_jns_bpkb: 8,
        kd_jenis: '312',
        model_desc: 'RANSUS PICK UP PEMADAM API',
      },
      {
        id_model: 431,
        id_jns_bpkb: 3,
        kd_jenis: '707',
        model_desc: 'PICK UP  FLAT DECK',
      },
      {
        id_model: 432,
        id_jns_bpkb: 3,
        kd_jenis: '710',
        model_desc: 'TRONTON FLAT DECK',
      },
      {
        id_model: 433,
        id_jns_bpkb: 3,
        kd_jenis: '709',
        model_desc: 'TRUCK FLAT DECK',
      },
      {
        id_model: 434,
        id_jns_bpkb: 3,
        kd_jenis: '708',
        model_desc: 'LIGHT TRUCK FLAT DECK',
      },
      {
        id_model: 437,
        id_jns_bpkb: 8,
        kd_jenis: '711',
        model_desc: 'SKY LIFT',
      },
      {
        id_model: 438,
        id_jns_bpkb: 3,
        kd_jenis: '351',
        model_desc: 'AMR ROLL',
      },
      {
        id_model: 439,
        id_jns_bpkb: 3,
        kd_jenis: '313',
        model_desc: 'PICK UP ARM ROLL',
      },
      {
        id_model: 440,
        id_jns_bpkb: 3,
        kd_jenis: '373',
        model_desc: 'LIGHT TRUCK ARM ROLL',
      },
      {
        id_model: 441,
        id_jns_bpkb: 3,
        kd_jenis: '465',
        model_desc: 'TRUCK ARM ROLL',
      },
      {
        id_model: 442,
        id_jns_bpkb: 3,
        kd_jenis: '466',
        model_desc: 'TRONTON ARM ROLL',
      },
      {
        id_model: 446,
        id_jns_bpkb: 8,
        kd_jenis: '502',
        model_desc: 'RANSUS KESEHATAN',
      },
      {
        id_model: 447,
        id_jns_bpkb: 8,
        kd_jenis: '107',
        model_desc: 'RANSUS JEEP AMBULANCE',
      },
      {
        id_model: 448,
        id_jns_bpkb: 3,
        kd_jenis: '714',
        model_desc: 'TRUCK LADBAK',
      },
      {
        id_model: 449,
        id_jns_bpkb: 3,
        kd_jenis: '743',
        model_desc: 'LIGHT TRUCK LAD BAK',
      },
    ]

    return _.find(model, { kd_jenis })
  }

  public async pkb({ request, response }: HttpContextContract) {
    const Schema = schema.create({
      kota: schema.string({
        escape: true,
        trim: true,
      }),
      no: schema.number(),
      zona: schema.string({
        escape: true,
        trim: true,
      }),
    })

    try {
      const payload = await request.validate({
        schema: Schema,
      })

      const nopol = payload.kota + payload.no + payload.zona

      const getInfoPkbKendaraanQuery = await Database.rawQuery('sp_pkb_new @nopol=?', [nopol])
      const getInfoPkbKendaraan = getInfoPkbKendaraanQuery[0]

      if (!getInfoPkbKendaraan.knd_nama === null) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const getInfoPkb = await Database.query()
        .from('_vlds_soc_infopkb')
        .where('knd_nopol', nopol)
        .orderBy('knd_thn_buat', 'desc')
        .first()

      if (!getInfoPkb) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const hideLastCharacter = (str: string, len: number = 5) => {
        return str.substring(0, str.length - len) + [...Array(len + 1)].join('X')
      }

      /** KALKULASI TOTAL */
      const total =
        getInfoPkbKendaraan.Tsw +
        getInfoPkbKendaraan.Tpkb +
        getInfoPkbKendaraan.tgdsw +
        getInfoPkbKendaraan.tgsw

      const pkbPokok = getInfoPkbKendaraan.pkb_p + getInfoPkbKendaraan.pkb_t
      const pkbDenda = getInfoPkbKendaraan.pkb_pd + getInfoPkbKendaraan.pkb_td
      const swdPokok =
        getInfoPkbKendaraan.sw0 +
        getInfoPkbKendaraan.sw1 +
        getInfoPkbKendaraan.sw2 +
        getInfoPkbKendaraan.sw3 +
        getInfoPkbKendaraan.sw4
      const swdDenda =
        getInfoPkbKendaraan.dd0 +
        getInfoPkbKendaraan.dd1 +
        getInfoPkbKendaraan.dd2 +
        getInfoPkbKendaraan.dd3 +
        getInfoPkbKendaraan.dd4

      const data = {
        kendaraan: {
          merk: getInfoPkb.mrk_desc.trim(),
          tahun: getInfoPkb.knd_thn_buat.trim(),
          model: getInfoPkb.tpe_desc.trim(),
          warna: getInfoPkb.knd_warna.trim(),
          no_rangka: hideLastCharacter(getInfoPkb.knd_rangka.trim()),
          no_mesin: hideLastCharacter(getInfoPkb.knd_mesin.trim()),
          no_polisi: getInfoPkb.knd_nopol.trim(),
        },
        pajak: {
          pkb: {
            pok: parseInt(pkbPokok),
            den: parseInt(pkbDenda),
          },
          swd: {
            pok: swdPokok,
            den: swdDenda,
          },
          adm: {
            stnk: parseInt(getInfoPkbKendaraan.adm_stnk),
            tnkb: parseInt(getInfoPkbKendaraan.adm_tnkb),
          },
          total: parseInt(total),
          tgl_pajak: moment(getInfoPkbKendaraan.sd).format('DD-MM-YYYY'),
          tgl_stnk: moment(getInfoPkb.knd_sd_stnk).format('DD-MM-YYYY'),
          milik: parseInt(getInfoPkb.knd_milik_ke),
          wilayah: getInfoPkb.drv_desc.trim(),
          keterangan: '-',
        },
      }

      return response.ok(data)
    } catch (err) {
      return response.badRequest({
        e: err.message,
        message: 'Bad Request',
      })
    }
  }
}

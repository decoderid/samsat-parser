import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /** ZONA */
  Route.get('zona', ({ response }) => {
    const items = [
      { label: 'Banten', value: 'banten', disabled: false },
      { label: 'Bengkulu', value: 'bengkulu', disabled: false },
      { label: 'Gorontalo', value: 'gorontalo', disabled: false },
      { label: 'Kalimantan Barat', value: 'kalbar', disabled: false },
      { label: 'Kalimantan Timur', value: 'kaltim', disabled: false },
      { label: 'Kalimantan Utara', value: 'kaltara', disabled: false },
      { label: 'Kalimantan Selatan', value: 'kalsel', disabled: false },
      { label: 'Kepulauan Riau', value: 'kepri', disabled: false },
      { label: 'Jambi', value: 'jambi', disabled: false },
      { label: 'Jawa Barat', value: 'jabar', disabled: false },
      { label: 'Jawa Tengah', value: 'jateng', disabled: false },
      { label: 'Jawa Timur', value: 'jatim', disabled: false },
      { label: 'Lampung', value: 'lampung', disabled: false },
      { label: 'Maluku Utara', value: 'malut', disabled: false },
      { label: 'Nusa Tenggara Barat', value: 'ntb', disabled: false },
      { label: 'Papua', value: 'papua', disabled: false },
      { label: 'Sulawesi Tengah', value: 'sulteng', disabled: false },
      { label: 'Sulawesi Utara', value: 'sulut', disabled: false },
      { label: 'Sumatera Barat', value: 'sumbar', disabled: false },
      { label: 'Sumatera Selatan', value: 'sumsel', disabled: false },
      { label: 'Yogyakarta', value: 'diy', disabled: false },
    ]

    return response.ok(items)
  })

  /** BANTEN */
  Route.post('banten/pkb', 'BantenController.pkb')

  /** DIY */
  Route.post('diy/pkb', 'DiyController.pkb')

  /** JABAR */
  Route.post('jabar/pkb', 'JabarController.pkb')

  /** JATENG */
  Route.post('jateng/pkb', 'JatengController.pkb')

  /** KALBAR */
  Route.post('kalbar/pkb', 'KalbarController.pkb')

  /** KALTIM*/
  Route.post('kaltim/pkb', 'KaltimController.pkb')

  /** SULTENG */
  Route.post('sulteng/pkb', 'SultengController.pkb')

  /** NTB */
  Route.post('ntb/pkb', 'NtbController.pkb')

  /** JAMBI */
  Route.post('jambi/pkb', 'JambiController.pkb')

  /** PAPUA */
  Route.post('papua/pkb', 'PapuaController.pkb')

  /** MALUT */
  Route.post('malut/pkb', 'MalutController.pkb')      

  /** KALTARA */
  Route.post('kaltara/pkb', 'KaltaraController.pkb')

  /** SULAWESI UTARA */
  Route.post('sulut/pkb', 'SulutController.pkb')

  /** LAMPUNG */
  Route.post('lampung/pkb', 'LampungController.pkb')  

  /** SUMSEL */
  Route.post('sumsel/pkb', 'SumselController.pkb')  

  /** SUMBAR */
  Route.post('sumbar/pkb', 'SumbarController.pkb')  
  
  /** KEPRI */
  Route.post('kepri/pkb', 'KepriController.pkb')  

  /** KALSEL */
  Route.post('kalsel/pkb', 'KalselController.pkb')  

  /** JATIM */
  Route.post('jatim/pkb', 'JatimController.pkb')

  /** BENGKULU */
  Route.post('bengkulu/pkb', 'BengkuluController.pkb')  

  /** GORONTALO */
  Route.post('gorontalo/pkb', 'GorontaloController.pkb')    

}).prefix('v1')

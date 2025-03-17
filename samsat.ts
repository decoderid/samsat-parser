/**
 * Ini adalah proyek saya dari tahun 2022-2024 dalam melakukan teknik pengecekan kendaraan di seluruh Indonesia, dengan berbagai metode seperti SSL unpinning, DOM parser, dan MITM.
 * Proyek ini saya publikasikan untuk keperluan pribadi, perusahaan, atau instansi.
 * Segala bentuk penyalahgunaan kode di luar tanggung jawab saya.
 * Lisensi ini mengizinkan siapa saja untuk menggunakan, memodifikasi, dan mendistribusikan proyek ini dengan tetap menghormati ketentuan yang telah disebutkan.
 */

import crypto from 'crypto'
import { DateTime } from 'luxon'
import https from 'https'
import axios from 'axios'
import { ParseGorontalo, ParseJabar, ParseJambi, ParseJatim, ParseKalsel, ParseKaltim, ParseKepri, ParseLampung, ParseMalut, ParseNtb, ParsePapua, ParseSumbar, ParseSumsel } from './DomParser'
import qs from 'node:querystring'
import moment from 'moment'
import Jimp from 'jimp'
import tesseract from 'node-tesseract-ocr'

/** CONFIG */
const config = {
  auth: {
    type: 'basic',
    username: '5mbr_4ndr0_v201',
    password: '54mb4r4@pl0pd',
  },
  api: {
    prefix: '5mbr4ndro',
    separator: '@',
  },
}

/** AXIOS INSTANCE */
const instance = {
  banten: axios.create({
    baseURL: 'http://api.samsatbanten.net/mobile',
    timeout: 10000,
    headers: {
      'User-Agent': 'okhttp/3.10.0',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }),
  diy: axios.create({
    baseURL: 'http://36.66.168.197:8484/esamsatnas',
    timeout: 10000,
    headers: {
      'User-Agent': 'okhttp/3.10.0',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }),
  jabar: axios.create({
    baseURL: 'https://sambara.bapenda.jabarprov.go.id/sambara_v2/api/v2.0',
    timeout: 10000,
    auth: {
      username: config.auth.username,
      password: config.auth.password,
    },
    headers: {
      'User-Agent': 'okhttp/3.2.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  sambara: axios.create({
    baseURL: 'https://sambara.bapenda.jabarprov.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://sambara.bapenda.jabarprov.go.id',
      'Referer': 'https://sambara.bapenda.jabarprov.go.id/sambara_lite_plopd/landing'
    }
  }),
  kalbar: axios.create({
    baseURL: 'http://36.66.239.162:8181/simakda',
    timeout: 10000,
    headers: {
      'User-Agent': 'okhttp/3.10.0',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }),
  kaltim: axios.create({
    baseURL: 'http://simpator.kaltimprov.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }),
  jateng: axios.create({
    baseURL: 'http://sakpole.bapenda.jatengprov.go.id:9990',
    timeout: 10000
  }),
  ntb: axios.create({
    baseURL: 'https://bappenda.ntbprov.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://bappenda.ntbprov.go.id/infopkb'
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }),
  jambi: axios.create({
    baseURL: 'http://jambisamsat.net',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://jambisamsat.net/infopkb.html'
    },
  }),
  papua: axios.create({
    baseURL: 'http://180.250.219.60:81',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://180.250.219.60:81/cekpajak'
    },
  }),
  malut: axios.create({
    baseURL: 'https://esamsat.malutprov.go.id/kiosk',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://esamsat.malutprov.go.id/kiosk/kiosk.aspx'
    },
  }), 
  kaltara: axios.create({
    baseURL: 'http://android.bpprdku.net',
    timeout: 10000,
    headers: {
      'User-Agent': 'okhttp/3.10.0'
    },
  }),  
  sulut: axios.create({
    baseURL: 'http://dispenda.sulutprov.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'C#'
    },
  }),    
  lampung: axios.create({
    baseURL: 'http://pkb.bapenda.lampungprov.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }),      
  sumsel: axios.create({
    baseURL: 'http://180.250.50.197:8932',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G975N Build/N2G48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }),   
  kepri: axios.create({
    baseURL: 'http://203.130.248.194:81',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G975N Build/N2G48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    },
  }), 
  sumbar: axios.create({
    baseURL: 'http://182.253.192.82',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G975N Build/N2G48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36'
    },
  }),  
  kalsel: axios.create({
    baseURL: 'http://36.92.22.4',
    timeout: 10000,
    headers: {
      'User-Agent': 'okhttp/3.10.0',
    },
  }),
  jatim: axios.create({
    baseURL: 'https://info.dipendajatim.go.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G975N Build/N2G48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36'
    }
  }),
  bengkulu: axios.create({
    baseURL: 'https://samsat.bengkuluprov.go.id',
    timeout: 10000,
    headers: {
      'Authorization': 'bd_d15yiA9q9zayp3AEk0MzGorlIIhlAK4Bqtha',
      'User-Agent': 'okhttp/5.0.0-alpha.3'
    }
  }),
  gorontalo: axios.create({
    baseURL: 'https://portal.banksulutgo.co.id',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; SM-G975N Build/N2G48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })         
}

/**
 *
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
const banten = async (kota: string, no: string, zona: string) => {
  const body = {
    no_polisi: kota.toUpperCase() + no + zona.toUpperCase(),
  }

  try {
    const response = await instance.banten.post('/get-tagihan', body)

    if (!response.data.success) {
      return {
        status: false,
      }
    }

    return {
      status: true,
      data: response.data.data,
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
const diy = async (kota: string, no: string, zona: string) => {
  const params = {
    nopolisi: kota.toUpperCase() + zona.toUpperCase() + no,
  }

  try {
    const response = await instance.diy.get('/r_infopkbad.php', { params })

    if (response.data.match(/<status>(.*)<\/status>/)) {
      return {
        status: false,
      }
    }

    const singleToDouble = response.data.replace(/\'/g, '"').trim()
    const clean = singleToDouble.replace('\n\n', '').trim()
    const json = JSON.parse(clean)
    const data = json.result[0]

    return {
      status: true,
      data: data,
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
const jabar = async (warna: string, kota: string, no: string, zona: string) => {
  /** GENERATE API KEY */
  const generateApiKey = () => {
    const time = DateTime.now().toFormat('yyyyMMddHH')
    const plain = config.api.prefix + config.api.separator + time
    return crypto.createHash('md5').update(plain).digest('hex')
  }

  // console.log(generateApiKey())

  const body = {
    kode_plat: warna,
    no_polisi: kota.toUpperCase() + '-' + zona.toUpperCase() + '-' + no,
  }

  const params = new URLSearchParams(body)

  try {
    const response = await instance.jabar.post('/sambara_inquiryfull', params, {
      headers: {
        'MST-API-KEY': generateApiKey(),
      },
    })

    if (response.data.kd_status.toUpperCase() === 'E') {
      return {
        status: false,
      }
    }

    return {
      status: true,
      data: response.data.data[0],
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const sambara = async (warna: string, kota: string, no: string, zona: string) => {
  
  const body = {
    nopol1: kota.toLocaleLowerCase(),
    nopol2: no,
    nopol3: zona,
    kode_plat: warna,
    secure: ''
  }

  const params = new URLSearchParams(body)

  try {
    const response = await instance.sambara.post('/sambara_lite_plopd/landing/cariInfoPkb/', params.toString())

    return ParseJabar(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
const kalbar = async (kota: string, no: string, zona: string) => {
  const params = {
    nopol: kota.toUpperCase() + no + zona.toUpperCase(),
  }

  try {
    const response = await instance.kalbar.get('/infopajak.php', { params })

    if (response.data?.row) {
      return {
        status: false,
      }
    }

    return {
      status: true,
      data: response.data,
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const kaltim = async (kota: string, no: string, zona: string) => {
  const params = new URLSearchParams({
    kt: kota.toUpperCase(),
    nomor: no,
    seri: zona.toUpperCase()
  })

  try {
    const response = await instance.kaltim.post('/cari.php', params.toString())
    return ParseKaltim(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const jateng = async (kota: string, no: string, zona: string) => {
  const params = {
    na: kota.toUpperCase(),
    nb: no,
    nc: zona.toUpperCase(),
    key: "TkVXIFNBS1BPTEU="
  }

  try {
    const response = await instance.jateng.post('/info/kendaraan/api/api_req_info_pajak ', params, {
      headers: {
        'User-Agent': 'Dart/2.16 (dart:io)',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': JSON.stringify(params).length
      }
    })

    if (response.data.Status !== "000") {
      return {
        status: false
      }
    }
    return {
      status: true,
      data: response.data
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const ntb = async (kota: string, no: string, zona: string) => {
  
  const params = {
    kd: kota,
    no: no,
    wil: zona
  }

  try {
    const response = await instance.ntb.get('/info', { params })

    return ParseNtb(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const jambi = async (kota: string, no: string, zona: string) => {
  
  const params = new URLSearchParams({
    no_polisi: kota.toUpperCase() + no + zona.toUpperCase(),
    nm_pemilik: '',
    tg_akhir_pkb: '',
    tg_akhir_stnk: ''
  })

  try {
    const response = await instance.jambi.post('/infopkb.php', params.toString())

    return ParseJambi(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const papua = async (warna: string, kota: string, no: string, zona: string) => {
  
  const params = {
    nopol: kota.toUpperCase() + no + zona.toUpperCase(),
    plat: warna
  }

  try {
    const response = await instance.papua.get('/cekpajak/cetaksimulasi.php', {params})

    return ParsePapua(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const malut = async (kota: string, no: string, zona: string) => {
  
  const query = qs.parse('__VIEWSTATE=%2FwEPDwUKMTMxNzQyNTU1OA9kFgJmD2QWBAIBD2QWAmYPZBYCZg8WAh4EVGV4dAUVZS1TQU1TQVQgTWFsdWt1IFV0YXJhZAIDD2QWAgIBD2QWAgIBD2QWDAIBDw8WAh8ABTNBbmp1bmdhbiBJbmZvcm1hc2kgVGVycGFkdTxicj5lLVNBTVNBVCBNYWx1a3UgVXRhcmFkZAIDDw8WAh8AZWRkAgcPEA8WBh4NRGF0YVRleHRGaWVsZAUETmFtYR4ORGF0YVZhbHVlRmllbGQFBEtvZGUeC18hRGF0YUJvdW5kZ2QQFRAOS2VuZGFyYWFuIEJhcnUMRGFmdGFyIFVsYW5nFERhZnRhciBVbGFuZyA1IFRhaHVuGERhZnRhciBVbGFuZyBTVE5LIEhpbGFuZwxNdXRhc2kgTWFzdWsNTXV0YXNpIEtlbHVhchdEYWZ0YXIgVWxhbmcgQmFsaWsgTmFtYQtIaWJhaCBXYXJpcwlFa3MgVGFrc2kXTXV0YXNpIE1hc3VrIEJhbGlrIE5hbWELVWJhaCBCZW50dWsLR2FudGkgTWVzaW4OVWJhaCBXYXJuYSBUTksJRWtzIENDL0NEDkVrcyBQZW1lcmludGFoDUVrcyBUTkkvUG9scmkVEAgxMTExMjEzMQYyMTExMzEGMjIxMTMxBjIzMTEzMQYzMTExMzEGMzIxMTMxCDQxMTEyMjMxCDQyMTEyMjMxCDQzMTEyMjMxCDQ0MTEyMjMxCDUxMTEyMTMxCDUyMTEyMTMxBjUzMTEzMQg2MTExMjEzMQg2MjExMjIzMQg2MzExMjEzMRQrAxBnZ2dnZ2dnZ2dnZ2dnZ2dnFgECAWQCCQ8PFgIfAAUGMjExMTMxZGQCDw9kFhwCAQ9kFgQCAw8PFgIfAAUCREdkZAIHDw8WAh4LTmF2aWdhdGVVcmwFLmphdmFzY3JpcHQ6T3BlbktCKCdDb250ZW50UGxhY2VIb2xkZXIxX3R4dE5QJylkZAIDDw8WAh4HVmlzaWJsZWhkFgQCBQ8WAh4FdmFsdWVkZAIHDw8WAh8EBVJqYXZhc2NyaXB0Ok9wZW5UaXBlKCdDb250ZW50UGxhY2VIb2xkZXIxX3R4dFRpcGUnLCdDb250ZW50UGxhY2VIb2xkZXIxX3R4dFRpcGVJRCcpZGQCBQ8PFgIfBWhkFhACAw8PFgIfAAUCREdkZAIFDxYCHwZkZAIHDw8WAh8EBTZqYXZhc2NyaXB0Ok9wZW5CYXlhcignQ29udGVudFBsYWNlSG9sZGVyMV90eHROUEJheWFyJylkZAINDxYCHwZkZAIPDw8WAh8EBTBqYXZhc2NyaXB0Ok9wZW5OSUsoJ0NvbnRlbnRQbGFjZUhvbGRlcjFfdHh0TklLJylkZAITDxYCHwZkZAIVDw8WAh8EBTZqYXZhc2NyaXB0Ok9wZW5SYW5na2EoJ0NvbnRlbnRQbGFjZUhvbGRlcjFfdHh0UmFuZ2thJylkZAIZDxAPFgYfAQUETmFtYR8CBQRLb2RlHwNnZBAVCxEtIEthbnRvciBTQU1TQVQgLQ9IYWxtYWhlcmEgQmFyYXQRSGFsbWFoZXJhIFNlbGF0YW4QSGFsbWFoZXJhIFRlbmdhaA9IYWxtYWhlcmEgVGltdXIPSGFsbWFoZXJhIFV0YXJhDktlcHVsYXVhbiBTdWxhDEtvdGEgVGVybmF0ZRVLb3RhIFRpZG9yZSBLZXB1bGF1YW4NUHVsYXUgTW9yb3RhaQ1QdWxhdSBUYWxpYWJ1FQsAAzYyNAM2MjcDNjI1AzYyOQM2MjYDNjI4AzYzNwM2MzgDNjMwAzYzMRQrAwtnZ2dnZ2dnZ2dnZxYBZmQCCQ8PFgIfAAUSQ2VrIFRpcGUgS2VuZGFyYWFuZGQCDQ8QDxYCHgdDaGVja2VkaGRkZGQCDw8QDxYCHwdoZGRkZAIRDxAPFgIfB2hkZGRkAhMPEA8WAh8HaGRkZGQCFQ8PFgIfAAUOU3RhdHVzIExheWFuYW5kZAIXDw8WAh8ABQpQZW5lcmltYWFuZGQCGQ8PFgIfAAUNUHJvc2VkdXIgU1ROS2RkAhsPDxYCHwAFD1Byb3NlZHVyIE11dGFzaWRkAh0PDxYCHwAFDkluZm9ybWFzaSBCUEtCZGQCHw8PFgIfAAUMSmFzYSBSYWhhcmphZGQCEQ9kFgQCLw9kFgICAQ9kFgYCAw8QZGQWAWZkAgUPEGRkFgBkAgcPEGRkFgFmZAIzD2QWAgIBD2QWBgIHDxBkZBYBZmQCCQ8QZGQWAQIBZAITD2QWCAIBDxBkZBYAZAIFDxBkZBYBZmQCBw8QZGQWAWZkAgkPEGRkFgBkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBSNfY3RsMDpDb250ZW50UGxhY2VIb2xkZXIxOmltYlNlYXJjaJpnlWq8eOzSibrEK0jwBgPTUUuEw%2Fga9OUiNAydwrPP&__VIEWSTATEGENERATOR=BF811102&__EVENTVALIDATION=%2FwEdABx5Rs3RwAYKY11hWH8jrlvrc7X0epcxboPZjRzQKaWu%2FpK%2BN5%2FW2hPWtvcEn87WJa3dDDixyCZwnPZeTwnr1m38bjncrtmLA9TQDmxDznUKxwrogfDm1yEd8NfuOoWtcSYKKOVbJzIaZaRKTut%2BJ4zgIhP2TrdGi3ljqVV8XwJngMBK1Y5imK3yzw2%2F2cO0Q5lJVStL3Gv5GSZ86IBOZpiz4c4L0XeYsSc%2FexrLRNU39uavEFOz3L8NlYJCcOBy%2Be15R2b%2BAzhtvhRPNCi7v%2FGvuLwYkL2EvoyBxrKdhjnruyNgx5FYY8VJvcBrN%2Fgjr%2BVVTT8pJ4n%2B04dnG7kL5YbNKqzRBFRdkUWsH4WZmyv4xpUyYAoIgQQq%2B63OL3HzrTnMuSU2nj8mJObsC%2FIBULOfqmXcfyiHjF3FXkx5%2FIWo4MOhlkha2HnWgqtNP9%2B1LnCd7fwvwqcajKbpij8xfFJT3r8vpx2l1b%2BkiWei0%2F61%2FR1hjBwxgTftLFRLqLiBxX4CsUcFQuGVl6iMsPSFGeLL3T7EbdL13wRfbkD6q6%2BMm0yObqsh9WvbwQbFEecmJbIGS71CL5H16sFa6TVRXL8EY0vpFB6ULT0%2BAWfsMGSmz6%2Bdh05o%2BCL2RLdjMxTLSC4%3D&_ctl0%3AContentPlaceHolder1%3AddlFlow=211131&_ctl0%3AContentPlaceHolder1%3AtxtNP=5377LE&_ctl0%3AContentPlaceHolder1%3AimbSearch.x=0&_ctl0%3AContentPlaceHolder1%3AimbSearch.y=0&_ctl0%3AContentPlaceHolder1%3AtxtTipe=')
  
  /** INJECT DISINI */
  query['_ctl0:ContentPlaceHolder1:txtNP'] = no + zona.toLocaleUpperCase()

  const params = new URLSearchParams(query)


  try {
    const response = await instance.malut.post('/kiosk.aspx', params.toString())

    return ParseMalut(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const kaltara = async (kota: string, no: string, zona: string) => {
  
  const params = {
    na: kota.toUpperCase(),
    nb: no,
    nc: zona.toUpperCase()
  }

  try {
    const response = await instance.kaltara.get('/infopkb.php', { params })

    if (response.data.length === 0) {
      return {
        status: false
      }
    }

    const data = response.data[0]

    if (!data.NO_RANGKA) {
      return {
        status: false
      }
    }

    return {
      status: true,
      data
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const sulut = async (kota: string, no: string, zona: string) => {
  
  const params = {
    user: 'd45kfjwoefk',
    pwd: 'adfsdwr39034jfkrle',
    nopol: kota.toUpperCase() + ' ' + no.toString() + ' ' + zona.toLocaleUpperCase(),
    plat: '01'
  }

  try {
    const response = await instance.sulut.post('/derrpa/asmp22/xcv4ugid8jw0jOFkr89J3z.php', params)

    if(!response.data?.itemkb) {
      return {
        status: false
      }
    }
    
    return {
      status: true,
      data: response.data.itemkb[0]
    }

  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const lampung = async (kota: string, no: string, zona: string) => {
  
  const params = new URLSearchParams({
    t: no,
    b: zona.toUpperCase(),
    nilaiCaptcha: ''
  })

  try {
    const response = await instance.lampung.post('/pkb/hasil.php', params.toString())

    return ParseLampung(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const sumsel = async (kota: string, no: string, zona: string) => {
  
  const params = {
    nopol: no,
    seri: zona.toUpperCase()
  }

  try {
    const response = await instance.sumsel.get('/esamsat/infopajakkendaraan.php', { params })

    return ParseSumsel(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const kepri = async (kota: string, no: string, zona: string) => {
  
  const params = {
    NOPOL: kota.toLocaleUpperCase() + no.toString() + zona.toUpperCase(),
    _: moment.now()
  }

  try {
    const response = await instance.kepri.get('/info/ranmor.php', { params })

    return ParseKepri(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const sumbar = async (kota: string, no: string, zona: string) => {
  
  const params = {
    tnkb: kota.toLocaleUpperCase() + ' ' + no.toString() + ' ' + zona.toUpperCase()
  }

  try {
    const response = await instance.sumbar.get('/pkb/info.php', { params })

    return ParseSumbar(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const kalsel = async (kota: string, no: string, zona: string) => {
  
  const params = {
    nopol: kota.toLocaleUpperCase() + no.toString() + zona.toUpperCase()
  }

  try {
    const response = await instance.kalsel.get('/infosvc2/index.php', { params })
    return ParseKalsel(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
 }

 /**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const jatim = async (kota: string, no: string, zona: string) => {

  const paramsCaptcha = {
    act: 'captcha'
  }

  const getSession = await instance.jatim.get('/logic_pkb.php', {
    params: paramsCaptcha,
    validateStatus: () => true
  })

  const setCookie = getSession?.headers['set-cookie'][0]
  const matchSession = setCookie.match(/PHPSESSID=(.*?); path=\//i)

  if (!matchSession) {
    return 
  }

  const session = matchSession[1].trim()

  const getImage = getSession.data.match(/<img class="img-thumbnail" src="(.*?)"\/>/i)

  if (!getImage) {
    return
  }

  const image = getImage[1].trim()

  /** RESOLVE IMAGE */
  const editImage = await Jimp.read({
    url: instance.jatim.defaults.baseURL + image,
    headers: {
      'Cookie': 'PHPSESSID=' + session
    }
  })

  const img = await editImage.scale(4).rgba(false).greyscale().contrast(0.6).getBufferAsync(Jimp.MIME_JPEG)

  /** RESOLVE CAPTCHA */
  const resolveImage = await tesseract.recognize(img)
  
  const params = new URLSearchParams({
    nopol: kota.toLocaleUpperCase() + no.toString() + zona.toUpperCase(),
    code: resolveImage.trim()
  })

  try {
    const response = await instance.jatim.post('/logic_pkb.php?act=cek', params.toString(), {
      headers: {
        'Cookie': 'PHPSESSID=' + session
      }
    })

    if (response.data.id === 0) {
      return {
        code: 0,
        status: false
      }
    }

    return ParseJatim(response.data.html)
  } catch (err) {
    return Promise.reject(err)
  }
 }

/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const bengkulu = async (kota: string, no: string, zona: string) => {
  
  const params = {
    jdata: 'pkb',
    nopol: kota.toLocaleUpperCase() + (zona.length === 1 ? (zona.toUpperCase() + ' ') : zona.toUpperCase()) + no.toString()
  }

  try {
    const response = await instance.bengkulu.post('/isb/json/samsat_cek', params)

    if (!response.data.status) {
      return {
        status: false
      }
    }

    return {
      status: true,
      data: response.data.data
    }
  } catch (err) {
    return Promise.reject(err)
  }
 }


/**
 *
 * @param {string} warna 1 = hitam, 2 = merah, 3 = kuning
 * @param {string} kota B,D,K,A
 * @param {string} no 4122
 * @param {string} zona ACX,KI,ACR
 * @returns
 */
 const gorontalo = async (kota: string, no: string, zona: string, code: string) => {
  
  const params = {
    q: code,
    r: kota.toLocaleUpperCase() + no.toString() + zona.toString(),
    s: ''
  }

  try {
    const response = await instance.gorontalo.get('/bsgmobile/getDetilPkb.php', { params })

    if (response.data.status === 'false') {
      return {
        status: false
      }
    }

    return ParseGorontalo(response.data.data[0].Token)
  } catch (err) {
    return Promise.reject(err)
  }
 }

export { banten, diy, jabar, jateng, kalbar, kaltim, sambara, ntb, jambi, papua, malut, kaltara, sulut, lampung, sumsel, kepri, sumbar, kalsel, jatim, bengkulu, gorontalo }

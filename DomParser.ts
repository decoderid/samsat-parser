/**
 * Ini adalah proyek saya dari tahun 2022-2024 dalam melakukan teknik pengecekan kendaraan di seluruh Indonesia, dengan berbagai metode seperti SSL unpinning, DOM parser, dan MITM.
 * Proyek ini saya publikasikan untuk keperluan pribadi, perusahaan, atau instansi.
 * Segala bentuk penyalahgunaan kode di luar tanggung jawab saya.
 * Lisensi ini mengizinkan siapa saja untuk menggunakan, memodifikasi, dan mendistribusikan proyek ini dengan tetap menghormati ketentuan yang telah disebutkan.
 */

import _ from 'lodash'
import { parse } from "parse5"
import { queryAll } from 'parse5-query-domtree'
import { parse as nodeHtmlParser } from 'node-html-parser';

const hideLastCharacter = (str: string, len: number = 5) => {
    return str.substring(0, str.length - len) + [...Array(len + 1)].join('X')
  }

export const ParseKaltim = (html: string) => {
    const document =  parse(html)
    const inputs = queryAll(document).getElementsByTagName('input', 'type')

    const data = _.filter(inputs.map(i => {
        if (i.getAttribute('type') === 'text') {
            const id = i.getAttribute('id')
            const name = i.getAttribute('name')
            const value = (i.getAttribute('value')).trim()
            return {
                id,
                name,
                value
            }
        }
    }))

    const reduce = _.chain(data).keyBy('name').mapValues('value').value()

    if (reduce.noka.length <= 5) {
        return {
            status: false
        }
    }

    const result = {
        ...reduce,
        noka: hideLastCharacter(reduce.noka),
        nosin: hideLastCharacter(reduce.nosin),
        milik: parseInt(reduce.milik),
        pkb_pok: parseInt(reduce.pkb_pok.replace(/\D+/g, '')),
        pkb_den: parseInt(reduce.pkb_den.replace(/\D+/g, '')),
        swd_pok: parseInt(reduce.swd_pok.replace(/\D+/g, '')),
        swd_den: parseInt(reduce.swd_den.replace(/\D+/g, '')),
        pnbp: parseInt(reduce.pnbp.replace(/\D+/g, '')),
        tnkb: parseInt(reduce.tnkb.replace(/\D+/g, '')),
        total: parseInt(reduce.total.replace(/\D+/g, ''))
    }

    return {
        status: true,
        data: result
    }
}

export const ParseJabar = (html: string) => {
    const document =  nodeHtmlParser(html)
    // const inputs = queryAll(document).getElementsByTagName('td')

    const data = _.filter(_.map(document.getElementsByTagName('table'), (table, KTable) => {
        return _.filter(_.map(table.getElementsByTagName('tr'), (tr, KTr) => {
            const td = tr.getElementsByTagName('td')

            if (td.length < 3) {
                return null
            }


            const name = td[0].text.trim().replace(/\s/g, '_').toLowerCase()
            const value = td[2].text.trim()


            return {name,value}
        }))
    }))

    let mergeData =  _.chain(_.flatten(data)).keyBy('name').mapValues('value').value()

    if (mergeData.no_rangka === '') {
        return {
            status: false
        }
    }

    return {
        status: true,
        data: mergeData
    }
}

export const ParseNtb = (html: string) => {
    const document =  nodeHtmlParser(html)

    const table = document.querySelector('table')

    const data = _.map(table?.getElementsByTagName('tr'), (tr, KTr) => {
        const name = tr.querySelector('th').text.trim().replace(/\s/g, '_').toLowerCase()
        const value = tr.querySelector('td').text.trim().replace(/^:\s?/i, '')
        return {name, value}
    })

    const mergeData = _.chain(data).keyBy('name').mapValues('value').value()

    return {
        status: true,
        data: mergeData
    }
}

export const ParseJambi = (html: string) => {
    const document =  nodeHtmlParser(html)

    const table = document.querySelector('table')

    const data = _.map(table?.getElementsByTagName('tr'), (tr, KTr) => {
        const td = tr.querySelectorAll('td')
        const name = td[0].text.trim().replace(/\s|\.|\//g, '_').toLowerCase().replace(/\_\_/g, '')
        const value = td[2].text.trim()
        return {name, value}
    })

    if (data.length === 0) {
        return {
            status: false
        }
    }

    const row = _.map(document.querySelectorAll('div.row'))

    const pkb = row[1].getElementsByTagName('p')
    const swd = row[2].getElementsByTagName('p')

    const mergeData = _.chain(data).keyBy('name').mapValues('value').value()
    
    return {
        status: true,
        data: {
            ...mergeData,
            pkb_c: {
                pok: pkb[0].text,
                den: pkb[1].text,
                total: pkb[2].text
            },
            swd_c: {
                pok: swd[0].text,
                den: swd[1].text,
                total: swd[2].text
            }
        }
    }
}

export const ParsePapua = (html: string) => {
    const document =  nodeHtmlParser(html)

    const table = document.querySelectorAll('table')
    const inner = table[1].getElementsByTagName('tr')

    const data = _.filter(_.map(inner, (tr, KTr) => {
        if (KTr > 7) {
            return null 
        }
        
        const td = tr.querySelectorAll('td')
        const name = td[0].text.trim().replace(/\s/g, '_').toLowerCase()
        const value = td[2].text.trim()

        return {name, value}
    }))

    const mergeData = _.chain(data).keyBy('name').mapValues('value').value()

    if (mergeData.tipe_kb === '') {
        return {
            status: false
        }
    }

    const pkb = inner[11].querySelectorAll('td')
    const swd = inner[12].querySelectorAll('td')
    const total = inner[13].querySelectorAll('td')

    return {
        status: true,
        data: {
            ...mergeData,
            pkb: {
                pok: pkb[1].text,
                den: pkb[2].text,
                total: pkb[3].text
            },
            swd: {
                pok: swd[1].text,
                den: swd[2].text,
                total: swd[3].text
            },
            total: total[3].text
        }
    }
}

export const ParseMalut = (html: string) => {

    const document =  nodeHtmlParser(html)
    const table = document.querySelector('table.bgcolor_header_master')

    if (!table) {
        return {
            status: false
        }
    }

    const merek = table?.getElementById('ContentPlaceHolder1_lblMerk').text.trim()
    const model = table?.getElementById('ContentPlaceHolder1_lblTipeKend').text.trim()
    const tahun = table?.getElementById('ContentPlaceHolder1_lblThnBuat').text.trim()
    const milik = table?.getElementById('ContentPlaceHolder1_lblKendKe').text.trim()
    const tgl_pajak = table?.getElementById('ContentPlaceHolder1_txtPer1').text.trim()
    const tgl_stnk = table?.getElementById('ContentPlaceHolder1_txtPer2').text.trim()
    const pkb_pok = table?.getElementById('ContentPlaceHolder1_lblPajakPKB').text.trim()
    const pkb_den = table?.getElementById('ContentPlaceHolder1_lblDendaPKB').text.trim()
    const bbn_pok = table?.getElementById('ContentPlaceHolder1_lblPajakBBN').text.trim()
    const bbn_den = table?.getElementById('ContentPlaceHolder1_lblDendaBBN').text.trim()
    const swd_pok = table?.getElementById('ContentPlaceHolder1_lblPajakSWD').text.trim()
    const swd_den = table?.getElementById('ContentPlaceHolder1_lblDendaSWD').text.trim()
    const adm_stnk_pok = table?.getElementById('ContentPlaceHolder1_txtAdmSTNK').text.trim()
    const adm_stnk_den = table?.getElementById('ContentPlaceHolder1_txtDendaSTNK').text.trim()
    const adm_tnkb_pok = table?.getElementById('ContentPlaceHolder1_txtAdmTNKB').text.trim()
    const adm_tnkb_den = table?.getElementById('ContentPlaceHolder1_txtDendaTNKB').text.trim()
    const total = table?.getElementById('ContentPlaceHolder1_lblTotalJumlah').text.trim()

    return {
        status: true,
        data: {
            merek,
            model,
            tahun,
            milik,
            tgl_pajak,
            tgl_stnk,
            pkb_pok,
            pkb_den,
            bbn_pok,
            bbn_den,
            swd_pok,
            swd_den,
            adm_stnk_pok,
            adm_stnk_den,
            adm_tnkb_pok,
            adm_tnkb_den,
            total
        }
    }
}

export const ParseLampung = (html: string) => {
    // return html

    const document =  nodeHtmlParser(html)
    const table = document.querySelector('div#hasil')

    if (!table) {
        return {
            status: false
        }
    }
    
    const innerHtml = table.innerHTML

    /** LETS REGEX */
    const nopol = innerHtml.match(/Nomor\s?Polisi\s+?:(.*?)<br>/i)
    const milik = innerHtml.match(/Kendaraan\s?Ke\s+?<b>(.*?)<\/b>/i)
    const merek = innerHtml.match(/Merk\s+?:\s+?<b>(.*?)<\/b>/i)
    const warna = innerHtml.match(/Warna\s?Kendaraan\s?:\s+?<b>(.*?)<\/b>/i)
    const model = innerHtml.match(/Type\s+?:\s+?<b>(.*?)<\/b>/i)
    const tahun = innerHtml.match(/Tahun\s+?:\s+?<b>(.*?)<\/b>/i)
    const jatuh_tempo = innerHtml.match(/Jatuh\s+?Tempo\s+?PKB\s+?:\s+?(.*?)<br>/i)
    const tgl_stnk = innerHtml.match(/Tanggal\s+?STNK\s+?Berlaku\s+?Sampai\s+?:\s+?(.*?)<br>/i)

    const pkb_pok = innerHtml.match(/Jumlah\s+?Total\s+?Pokok\s+?PKB\s+?:\s+?Rp\.\s+?(.*?)<br>/i)
    const pkb_den = innerHtml.match(/Jumlah\s+?Total\s+?Denda\s+?PKB\s+?:\s+?Rp\.\s+?(.*?)<br>/i)
    const swd_pok = innerHtml.match(/Jumlah\s+?Total\s+?Pokok\s+?SWDKLLJ\s+?:\s+?Rp\.\s+?(.*?)<br>/i)
    const swd_den = innerHtml.match(/Jumlah\s+?Total\s+?Denda\s+?SWDKLLJ\s+?:\s+?Rp\.\s+?(.*?)<br>/i)
    const total = innerHtml.match(/Jumlah\s+?Bayar\s+?:\s+?<b>Rp\.\s+?(.*?)<\/b>/i)

    return {
        status: true,
        data: {
            nopol: nopol[1].trim(),
            milik: milik[1].trim(),
            merek: merek[1].trim(),
            warna: warna[1].trim(),
            model: model[1].trim(),
            tahun: tahun[1].trim(),
            jatuh_tempo: jatuh_tempo[1].trim(),
            tgl_stnk: tgl_stnk[1].trim(),
            pkb_pok: pkb_pok[1].trim(),
            pkb_den: pkb_den[1].trim(),
            swd_pok: swd_pok[1].trim(),
            swd_den: swd_den[1].trim(),
            total: total[1].trim()
        }
    }
}

export const ParseSumsel = (html: string) => {
    const document =  nodeHtmlParser(html)

    const table = document.querySelector('table[width="100%"][border="0"]')

    const data = _.filter(_.map(table?.getElementsByTagName('tr'), (tr, KTr) => {
        const td = tr.querySelectorAll('td.style17')

        if (td.length < 3) {
            return null
        }

        const name = td[1].text.trim().toLocaleLowerCase().replace(/\s|\s+|\(|\)/ig, '_')
        const value = td[2].text.trim().replace(': ', '')
        
        return {name, value}
    }))

    if (data.length < 6) {
        return {
            status: false
        }
    }

    const mergeData = _.chain(data).keyBy('name').mapValues('value').value()

    return {
        status: true,
        data: mergeData
    }
}

export const ParseKepri = (raw: string) => {

    if (!raw.match(/^READY-/i,)) {
        return {
            status: false
        }
    }

    const params = raw.split(',')
    
    const tgl_stnk = params[1].replace(/\[|\]/g, '').trim()
    const mereks = params[2].replace(/\[|\]/g, '').trim().split(' ')
    const merek = mereks[0].trim()
    const model = mereks.slice(1).join(' ').trim()
    const tahun = params[4].replace(/\[|\]/g, '').trim()
    const warna = params[5].replace(/\[|\]/g, '').trim()
    const no_rangka = params[6].replace(/\[|\]/g, '').trim()
    const no_mesin = params[7].replace(/\[|\]/g, '').trim()
    const pajak = params[11].replace(/\[|\]/g, '').trim()

    // PKB 26-09-2023 : 4.362.800<br>DENDA PKB 26-09-2023 : 174.500<br>JR 26-09-2023 : 143.000<br>DENDA JR 26-09-2023 : 35.000<br>PENGURANGAN : 174.500<br>
    const tgl_pajak = pajak.match(/PKB\s+?(.*?)\s+?\:/i)
    const pkb_pok = pajak.match(/PKB\s+?.*?\s+?\:(.*?)<br>/i)
    const pkb_den = pajak.match(/DENDA\s+?PKB\s+?.*?\s+?\:(.*?)<br>/i)
    const swd_pok = pajak.match(/JR\s+?.*?\s+?\:(.*?)<br>/i)
    const swd_den = pajak.match(/DENDA\s+?JR\s+?.*?\s+?\:(.*?)<br>/i)
    const pnpb_tnkb = pajak.match(/PNBP\s+?TNKB\s+?.*?\s+?\:(.*?)<br>/i)
    const pnpb_stnk = pajak.match(/PNBP\s+?STKN\s+?.*?\s+?\:(.*?)<br>/i)

    const total = params[12].replace(/\[|\]/g, '').trim()

    return {
        status: true,
        data: {
            pkb_pok: pkb_pok ? pkb_pok[1].trim() : '0',
            pkb_den: pkb_den ? pkb_den[1].trim() : '0',
            swd_pok: swd_pok ? swd_pok[1].trim() : '0',
            swd_den: swd_den ? swd_den[1].trim() : '0',
            pnpb_tnkb: pnpb_tnkb ? pnpb_tnkb[1].trim() : '0',
            pnpb_stnk: pnpb_stnk ? pnpb_stnk[1].trim() : '0',
            tgl_pajak: tgl_pajak ? tgl_pajak[1].trim() : '-',
            tgl_stnk,
            merek,
            model,
            tahun,
            warna,
            no_rangka,
            no_mesin,
            total
        }
    }
}

export const ParseSumbar = (data: any) => {
    if (!data?.GetDataRanmor) {
        return {
            status: false
        }
    }

    // REMAPPING
    const output = _.transform(data.GetDataRanmor[0], (result, val, key) => {
        result[key.toLocaleLowerCase().replace(/\s|\s+/g, '')] = val.trim()
    })

    return {
        status: true,
        data: output
    }
}

export const ParseKalsel = (data: any) => {
    const getKeys = Object.keys(data)

    const mappingData = _.filter(_.map(getKeys, i => {
        if (data[i].length === 0) {
            return null
        }

        return data[i]
    }))

    if (mappingData.length === 0) {
        return {
            status: false
        }
    }

    if (!_.isObject(mappingData[0])) {
        return {
            status: false
        }
    }

    return {
        status: true,
        data: mappingData[0][0]
    }
}

export const ParseJatim = (html: string) => {
    const document =  nodeHtmlParser(html)

    const tables = document.querySelectorAll('table')

    if (tables.length === 0) {
        return {
            code: 0,
            status: false
        }
    }

    const data = _.map(tables, table => {
        return _.map(table.getElementsByTagName('tr'), (tr, Trk) => {
            const td = tr.querySelectorAll('td')
            const name = td[0].text.trim().replace(/\s|\//g, '_').toLowerCase()
            const value = td[1].text.trim().replace(/^:\s?/i, '')

            return {name, value}
        })
    })

    const mergeData = _.chain(_.flatten(data)).keyBy('name').mapValues('value').value()

    return {
        code: 1,
        status: true,
        data: mergeData
    }
}

export const ParseGorontalo = (html: string) => {

    const seplit = html.split(';')
    
    const data = _.filter(_.map(seplit, i => {
        const clean = i.split(':')

        if (clean.length < 2) {
            return null
        }

        const name = clean[0].trim().replace(/\s|\//g, '_').toLowerCase()
        const value = clean[1].trim().replace('/0', '')

        return {name, value}
    }))

    const mergeData = _.chain(data).keyBy('name').mapValues('value').value()

    return {
        status: true,
        data: mergeData
    }
}

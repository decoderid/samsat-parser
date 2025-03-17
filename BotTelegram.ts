/**
 * Ini adalah proyek saya dari tahun 2022-2024 dalam melakukan teknik pengecekan kendaraan di seluruh Indonesia, dengan berbagai metode seperti SSL unpinning, DOM parser, dan MITM.
 * Proyek ini saya publikasikan untuk keperluan pribadi, perusahaan, atau instansi.
 * Segala bentuk penyalahgunaan kode di luar tanggung jawab saya.
 * Lisensi ini mengizinkan siapa saja untuk menggunakan, memodifikasi, dan mendistribusikan proyek ini dengan tetap menghormati ketentuan yang telah disebutkan.
 */

import { Markup, Telegraf } from 'telegraf';
import { fmt, bold, italic } from 'telegraf/format';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3334/v1',
    timeout: 60000,
    headers: {
        'User-Agent': 'BotTelegram/v1.0'
    }
})

const toRupiah = (angka) => {
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp'+rupiah.split('',rupiah.length-1).reverse().join('');
}

const parseNoPol = (str) => {
    const check = str.trim().match(/(?<kota>[a-z]{1,2})(?<no>[0-9]{1,4})(?<zona>[a-z]{1,3})/im)
    if (!check) {
        throw new Error('Format Nomor Polisi Salah')
    }
    return check.groups
}

const getInfo = async (provinsi, nopol) => {
    try {
        const response = await instance.post(`/${provinsi}/pkb`, parseNoPol(nopol))
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

const bot = new Telegraf('SILAHKAN ISI TOKEN');

const wilayah = [
    'banten',
    'diy',
    'jabar', 'jateng',
    'jambi',
    'kalbar', 'kaltim', 'kaltara',
    'kepri',
    'lampung',
    'malut',
    'ntb',
    'papua',
    'sulteng',
    'sulut',
    'sumbar',
    'sumsel'
]

const replyMarkup = [
    Markup.button.url('Donasi', 'https://trakteer.id/decoderid/tip?quantity=1'),
    Markup.button.url('Playstore', 'https://play.google.com/store/apps/details?id=id.zeroday.cpk&hl=id')
]

bot.command(['start', 'help'], async (ctx) => {

    await ctx.reply(fmt`
${bold`Cek Pajak Kendaraan`}
${italic`by ${bold`Zero-Day.ID`}`}

${bold`Format`}: <wilayah>@<nomor polisi>
${bold`Contoh`}: jabar@D12345ABC

Wilayah yang tersedia untuk saat ini:

- ${bold`Banten (perintah: banten@nopol)`}
- ${bold`Jawa Barat (perintah: jabar@nopol)`}
- ${bold`Jawa Tengah (perintah: jateng@nopol)`}
- ${bold`Jambi (perintah: jambi@nopol)`}
- ${bold`Kalimantan Barat (perintah: kalbar@nopol)`}
- ${bold`Kalimantan Timur (perintah: kaltim@nopol)`}
- ${bold`Kalimantan Utara (perintah: kaltara@nopol)`}
- ${bold`Kepulauan Riau (perintah: kepri@nopol)`}
- ${bold`Lampung (perintah: lampung@nopol)`}
- ${bold`Maluku Utara (perintah: malut@nopol)`}
- ${bold`Nusa Tenggara Barat (perintah: ntb@nopol)`}
- ${bold`Papua (perintah: papua@nopol)`}
- ${bold`Sulawesi Tengah (perintah: sulteng@nopol)`}
- ${bold`Sulawesi Utara (perintah: sulut@nopol)`}
- ${bold`Sumatera Barat (perintah: sumbar@nopol)`}
- ${bold`Sumatera Selatan (perintah: sumsel@nopol)`}
- ${bold`Yogyakarta (perintah: diy@nopol)`}

Catatan:
${italic`Silahkan gunakan bot ini sebagaimana mestinya`}
`, Markup.inlineKeyboard(replyMarkup))
});

bot.on('text', async (ctx) => {
    console.log('[Logger]:', ctx.message.from.first_name, typeof ctx.message.from.username === 'undefined' ? 'Unknown' : ctx.message.from.username, ctx.message.text)

    const parseCommand = ctx.message.text.split('@')
    if (parseCommand.length < 2) {
        return
    }

    
    const provinsi = parseCommand[0].toLowerCase()
    const nopol = parseCommand[1].toUpperCase()

    if (!wilayah.includes(provinsi)) {
        return await ctx.reply(fmt`Upss.. untuk saat ini wilayah ${bold`${provinsi.toUpperCase()} belum tersedia`}`)
    }

    try {

        const { kendaraan, pajak } = await getInfo(provinsi, nopol)

            await ctx.reply(fmt`
${bold`Cek Pajak Kendaraan`}
${italic`by ${bold`Zero-Day.ID`}`}

${bold`====== INFO KENDARAAN ======`}
MERK : ${bold`${kendaraan.merk}`}
MODEL : ${bold`${kendaraan.model}`}
TAHUN : ${bold`${kendaraan.tahun}`}
WARNA : ${bold`${kendaraan.warna}`}
NO POLISI : ${bold`${kendaraan.no_polisi}`}
NO RANGKA : ${bold`${kendaraan.no_rangka}`}
NO MESIN : ${bold`${kendaraan.no_mesin}`}

${bold`====== INFO PNBP ======`}
MLIK KE : ${bold`${pajak.milik.toString()}`}
WILAYAH : ${bold`${pajak.wilayah}`}
TGL PAJAK : ${bold`${pajak.tgl_pajak}`}
TGL STNK : ${bold`${pajak.tgl_stnk}`}
PKB POK : ${bold`${toRupiah(pajak.pkb.pok.toString())}`}
PKB DEN : ${bold`${toRupiah(pajak.pkb.den.toString())}`}
SWDKLLJ POK : ${bold`${toRupiah(pajak.swd.pok.toString())}`}
SWDKLLJ DEN : ${bold`${toRupiah(pajak.swd.den.toString())}`}
PNBP STNK : ${bold`${toRupiah(pajak.adm.stnk.toString())}`}
PNBP DEN : ${bold`${toRupiah(pajak.adm.tnkb.toString())}`}
TOTAL : ${bold`${toRupiah(pajak.total.toString())}`}

Catatan:
${italic`Silahkan gunakan bot ini sebagaimana mestinya`}
            `, Markup.inlineKeyboard(replyMarkup))
    } catch (err) {
        console.log('[Error]:', err.message)
        await ctx.reply('Periksa kembali Format dengan benar')
    }
});

bot.action('donasi', async (ctx) => {
    await ctx.reply('--- Terimakasih ---')
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

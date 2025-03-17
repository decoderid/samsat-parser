import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { jambi } from 'App/Library/Samsat'

export default class JambiController {
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

      const getInfoPkb = await jambi(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merek.trim(),
          tahun: getInfoPkb.data.tahun.trim(),
          model: getInfoPkb.data.model_tipe.trim(),
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_c.pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.pkb_c.den.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swd_c.pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.swd_c.den.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pnbp_stnk.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.pnbp_tnkb.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.total.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tglakhir_pkb_yl_,
          tgl_stnk: getInfoPkb.data.tglakhir_stnk,
          milik: 0,
          wilayah: getInfoPkb.data.lokasi_bayar_yl_.trim(),
          keterangan: '-',
        },
      }

      return response.ok(data)
    } catch (err) {
      return response.badRequest({
        message: 'Bad Request'
      })
    }
  }
}

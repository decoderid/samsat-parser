import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { bengkulu } from 'App/Library/Samsat'

export default class BengkuluController {
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

      const getInfoPkb = await bengkulu(payload.kota, payload.no.toString(), payload.zona) 

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.nm_merek_kb.trim(),
          tahun: getInfoPkb.data.th_buatan.trim(),
          model: getInfoPkb.data.nm_model_kb.trim(),
          warna: getInfoPkb.data.warna_kb.trim(),
          no_rangka: getInfoPkb.data.no_chasis.trim(),
          no_mesin: getInfoPkb.data.no_mesin.trim(),
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.w_total_pkb_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.w_total_pkb_den.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.w_total_swd_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.w_total_swd_den.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pnbp_stnk.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.pnbp_bpkb.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.w_amount.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tg_akhir_pkb,
          tgl_stnk: getInfoPkb.data.tg_akhir_stnkb,
          milik: 0,
          wilayah: '-',
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

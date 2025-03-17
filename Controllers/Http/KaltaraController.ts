import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { kaltara } from 'App/Library/Samsat'

export default class PapuaController {
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

      const getInfoPkb = await kaltara(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.NM_MEREK_KB.trim(),
          tahun: getInfoPkb.data.TH_BUATAN.trim(),
          model: getInfoPkb.data.NM_MODEL_KB.trim(),
          warna: getInfoPkb.data.WARNA_KB.trim(),
          no_rangka: getInfoPkb.data.NO_RANGKA.trim(),
          no_mesin: getInfoPkb.data.NO_MESIN.trim(),
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.PKB_POK.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.PKB_DEN.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.SWD_POK.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.SWD_DEN.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.BEA_ADM_STNK.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.BEA_ADM_TNKB.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.TOTAL_BAYAR.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.TG_AKHIR_PAJAK,
          tgl_stnk: getInfoPkb.data.TG_AKHIR_STNKB,
          milik: parseInt(getInfoPkb.data.MILIK_KE),
          wilayah: getInfoPkb.data.KD_WIL.trim(),
          keterangan: getInfoPkb.data.DESKRIPSI.trim(),
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

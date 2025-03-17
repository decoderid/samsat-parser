import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { malut } from 'App/Library/Samsat'

export default class MalutController {
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

      const getInfoPkb = await malut(payload.kota, payload.no.toString(), payload.zona)

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
          model: getInfoPkb.data.model.trim(),
          warna: '-',
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.pkb_den.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swd_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.swd_den.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.adm_stnk_pok.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.adm_tnkb_pok.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.total.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_pajak,
          tgl_stnk: getInfoPkb.data.tgl_stnk,
          milik: parseInt(getInfoPkb.data.milik),
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

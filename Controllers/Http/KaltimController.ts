import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { kaltim } from 'App/Library/Samsat'

export default class KaltimController {
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

      const getInfoPkb = await kaltim(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merk.trim(),
          tahun: getInfoPkb.data.thn.trim(),
          model: getInfoPkb.data.tipe.trim(),
          warna: '-',
          no_rangka: getInfoPkb.data.noka.trim(),
          no_mesin: getInfoPkb.data.nosin.trim(),
          no_polisi: payload.kota + payload.no + payload.zona,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_pok),
            den: parseInt(getInfoPkb.data.pkb_den),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swd_pok),
            den: parseInt(getInfoPkb.data.swd_den),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pnbp),
            tnkb: parseInt(getInfoPkb.data.tnkb),
          },
          total: parseInt(getInfoPkb.data.total),
          tgl_pajak: getInfoPkb.data.tg_pkb,
          tgl_stnk: getInfoPkb.data.tg_stnk,
          milik: getInfoPkb.data.milik,
          wilayah: '-',
          keterangan: '-',
        },
      }

      return response.ok(data)
    } catch (err) {
      return response.badRequest({
        message: 'Bad Request',
      })
    }
  }
}

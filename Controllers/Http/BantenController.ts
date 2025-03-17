import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { banten } from 'App/Library/Samsat'

export default class BantenController {
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

      const getInfoPkb = await banten(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.nm_op.trim(),
          tahun: getInfoPkb.data.tahun_produksi.trim(),
          model: getInfoPkb.data.model_op.trim(),
          warna: getInfoPkb.data.warna_tnkb.trim(),
          no_rangka: getInfoPkb.data.no_rangka.trim(),
          no_mesin: getInfoPkb.data.no_mesin.trim(),
          no_polisi: getInfoPkb.data.no_polisi.trim(),
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pokok_pkb),
            den: parseInt(getInfoPkb.data.denda_pkb),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.pokok_swd),
            den: parseInt(getInfoPkb.data.denda_swd),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pokok_adm_stnk),
            tnkb: parseInt(getInfoPkb.data.pokok_adm_tnkb),
          },
          total: parseInt(getInfoPkb.data.jumlah),
          tgl_pajak: getInfoPkb.data.tgl_lama,
          tgl_stnk: getInfoPkb.data.tgl_baru,
          milik: getInfoPkb.data.milik_ke,
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

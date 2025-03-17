import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { diy } from 'App/Library/Samsat'

export default class DiyController {
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

      const getInfoPkb = await diy(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.nmmerekkb.trim(),
          tahun: getInfoPkb.data.tahunkb.trim(),
          model: getInfoPkb.data.nmmodelkb.trim(),
          warna: '-',
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: payload.kota + ' ' + payload.no.toString() + ' ' + payload.zona,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb || 0),
            den: parseInt(getInfoPkb.data.pkbden || 0),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swdkllj || 0),
            den: parseInt(getInfoPkb.data.swdden || 0),
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.pkbswd || 0),
          tgl_pajak: getInfoPkb.data.tgakhirpkb,
          tgl_stnk: '-',
          milik: '-',
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

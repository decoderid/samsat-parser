import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { kalbar } from 'App/Library/Samsat'

export default class KalbarController {
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

      const getInfoPkb = await kalbar(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merek.trim(),
          tahun: getInfoPkb.data.th_rakit.trim(),
          model: getInfoPkb.data.type.trim(),
          warna: '-',
          no_rangka: getInfoPkb.data.no_chasis.trim(),
          no_mesin: getInfoPkb.data.no_mesin.trim(),
          no_polisi: getInfoPkb.data.nopol.trim(),
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_pok.trim()),
            den: parseInt(getInfoPkb.data.pkb_den.trim()),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swd_pok.trim()),
            den: parseInt(getInfoPkb.data.swd_den.trim()),
          },
          adm: {
            stnk: '-',
            tnkb: '-',
          },
          total: parseInt(getInfoPkb.data.jumlah.trim()),
          tgl_pajak: getInfoPkb.data.masa_pajak,
          tgl_stnk: getInfoPkb.data.masa_stnk,
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

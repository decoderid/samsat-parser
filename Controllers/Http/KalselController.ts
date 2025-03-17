import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { kalsel } from 'App/Library/Samsat'

export default class KalselController {
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

      const getInfoPkb = await kalsel(payload.kota, payload.no.toString(), payload.zona) 

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merk.trim(),
          tahun: getInfoPkb.data.tahunbuat.trim(),
          model: getInfoPkb.data.tipe.trim(),
          warna: getInfoPkb.data.tnkb.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkbpokok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.denda.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.pokok_swd.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.denda_swd.replace(/\D+/g, '')),
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.totalpajak),
          tgl_pajak: '-',
          tgl_stnk: getInfoPkb.data.masalaku,
          milik: 0,
          wilayah: '-',
          keterangan: getInfoPkb.data.keterangan.trim(),
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

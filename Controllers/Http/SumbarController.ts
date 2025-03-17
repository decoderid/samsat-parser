import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { sumbar } from 'App/Library/Samsat'

export default class SumbarController {
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

      const getInfoPkb = await sumbar(payload.kota, payload.no.toString(), payload.zona) 

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
          model: getInfoPkb.data.tipe.trim(),
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkbpokok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.pkbdenda.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swdklljpokok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.swdklljdenda.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.admstnk.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.admtnkb.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.jumlah.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tglpajak,
          tgl_stnk: getInfoPkb.data.tglstnk,
          milik: 0,
          wilayah: '-',
          keterangan: getInfoPkb.data.keterangan,
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

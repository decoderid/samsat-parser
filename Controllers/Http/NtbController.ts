import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { ntb } from 'App/Library/Samsat'

export default class NtbController {
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

      const getInfoPkb = await ntb(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merek.trim(),
          tahun: getInfoPkb.data.tahun_buat.trim(),
          model: getInfoPkb.data.tipe_kendaraan.trim(),
          warna: getInfoPkb.data.warna_kendaraan.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: 0,
            den: 0,
          },
          swd: {
            pok: 0,
            den: 0,
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.pajak_kendaraan_bermotor.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.masalaku_pajak,
          tgl_stnk: getInfoPkb.data.masalaku_stnk,
          milik: 0,
          wilayah: getInfoPkb.data.lokasi_kendaraan.trim(),
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

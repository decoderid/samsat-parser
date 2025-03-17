import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { sumsel } from 'App/Library/Samsat'

export default class SumselController {
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

      const getInfoPkb = await sumsel(payload.kota, payload.no.toString(), payload.zona) 

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merk.trim(),
          tahun: getInfoPkb.data.tahun_pembuatan.trim(),
          model: getInfoPkb.data.model.trim(),
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: '-',
          no_mesin: getInfoPkb.data.no_mesin.trim(),
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pokok_pkb.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.denda_pkb.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.pokok_swdkllj.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.denda_swdkllj.replace(/\D+/g, '')),
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.total_pajak.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_awal_pkb,
          tgl_stnk: getInfoPkb.data.tgl_akhir_pkb,
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

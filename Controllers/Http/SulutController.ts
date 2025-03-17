import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { sulut } from 'App/Library/Samsat'

export default class SulutController {
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

      const getInfoPkb = await sulut(payload.kota, payload.no.toString(), payload.zona) 

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const splitMerek = getInfoPkb.data.merek.split('-')
      const merek = splitMerek[0].trim()
      const model = splitMerek.slice(1).join(' ').trim()

      const data = {
        kendaraan: {
          merk: merek,
          tahun: getInfoPkb.data.thn_buat.trim(),
          model: model,
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.ttlpkb.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.denda.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.ttlswdkllj.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.dendasw.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.stnk.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.tnkb.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.jumlah.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_byr,
          tgl_stnk: getInfoPkb.data.rtglb,
          milik: parseInt(getInfoPkb.data.milik_ke),
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

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { jatim } from 'App/Library/Samsat'

export default class JatimController {
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

      let getInfoPkb

      let counter =  1

      do {
        getInfoPkb = await jatim(payload.kota, payload.no.toString(), payload.zona)

        if (getInfoPkb?.code === 1) {
            break;
        }

        counter++

      } while (counter <= 3)
      
      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan atau Gagal memproses Data',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merk.trim(),
          tahun: getInfoPkb.data.tahun_buat.trim(),
          model: getInfoPkb.data.type.trim(),
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb.replace(/\D+/g, '')),
            den: 0,
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swdkllj.replace(/\D+/g, '')),
            den: 0,
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.total_jumlah.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_masa_pajak,
          tgl_stnk: getInfoPkb.data.tgl_masa_stnk,
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

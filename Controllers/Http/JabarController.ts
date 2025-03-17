import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { sambara } from 'App/Library/Samsat'

export default class JabarController {
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

      interface InfoPKB {
        status: boolean
        data?: any
      }

      let getInfoPkb: InfoPKB

      getInfoPkb = await sambara('1', payload.kota, payload.no.toString(), payload.zona)
      if (!getInfoPkb.status) {
        getInfoPkb = await sambara('2', payload.kota, payload.no.toString(), payload.zona)
        if (!getInfoPkb.status) {
          getInfoPkb = await sambara('3', payload.kota, payload.no.toString(), payload.zona)
        }
      }

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merk.trim(),
          tahun: getInfoPkb.data.tahun.trim(),
          model: getInfoPkb.data.model.trim(),
          warna: getInfoPkb.data.warna.trim(),
          no_rangka: getInfoPkb.data.no_rangka.trim(),
          no_mesin: getInfoPkb.data.no_mesin.trim(),
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.pkb_den.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swdkllj_pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.swdkllj_den.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pnbp_stnk.replace(/\D+/g, '')),
            tnkb: parseInt(getInfoPkb.data.pnbp_tnkb.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.total.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_pajak,
          tgl_stnk: getInfoPkb.data.tgl_stnk,
          milik: parseInt(getInfoPkb.data.milik_ke),
          wilayah: getInfoPkb.data.keterangan.trim(),
          keterangan: getInfoPkb.data.keterangan === null ? '-' : getInfoPkb.data.keterangan.trim(),
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

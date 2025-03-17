import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { papua } from 'App/Library/Samsat'

export default class PapuaController {
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

      getInfoPkb = await papua('01', payload.kota, payload.no.toString(), payload.zona)
      if (!getInfoPkb.status) {
        getInfoPkb = await papua('02', payload.kota, payload.no.toString(), payload.zona)
        if (!getInfoPkb.status) {
          getInfoPkb = await papua('03', payload.kota, payload.no.toString(), payload.zona)
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
          merk: getInfoPkb.data.merek.trim(),
          tahun: getInfoPkb.data.tahun_buat.trim(),
          model: getInfoPkb.data.tipe_kb.trim(),
          warna: getInfoPkb.data.warna_kb.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb.pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.pkb.den.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swd.pok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.swd.den.replace(/\D+/g, '')),
          },
          adm: {
            stnk: 0,
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.total.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_akhir_stnk,
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

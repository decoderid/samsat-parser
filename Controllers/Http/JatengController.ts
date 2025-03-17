import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { jateng } from 'App/Library/Samsat'

export default class JatengController {
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

      const getInfoPkb = await jateng(payload.kota, payload.no.toString(), payload.zona)

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const data = {
        kendaraan: {
          merk: getInfoPkb.data.merek.trim(),
          tahun: getInfoPkb.data.thn_buat.trim(),
          model: getInfoPkb.data.tipe.trim(),
          warna: getInfoPkb.data.model.trim(),
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: payload.kota + payload.no + payload.zona,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.total_pkb_pokok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.total_pkb_denda.replace(/\D+/g, '')),
          },
          swd: {
            pok: parseInt(getInfoPkb.data.total_jr_pokok.replace(/\D+/g, '')),
            den: parseInt(getInfoPkb.data.total_jr_denda.replace(/\D+/g, '')),
          },
          adm: {
            stnk: parseInt(getInfoPkb.data.pnbp.replace(/\D+/g, '')),
            tnkb: 0,
          },
          total: parseInt(getInfoPkb.data.total.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.tgl_jatuh_tempo,
          tgl_stnk: getInfoPkb.data.tgl_stnk,
          milik: parseInt(getInfoPkb.data.milikke.trim()),
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

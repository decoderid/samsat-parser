import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { gorontalo } from 'App/Library/Samsat'

export default class BengkuluController {
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

      /** NOTE DATA BERDASARKAN KABUPATEN **/

      /**
       * A = Gorontalo
       * C = Kab Boalemo
       * E = Kab Bone Bolango
       * B = Kab Gorontalo
       * F = Kab Gorontalo Utara
       * D = Kab Pohuwato
       */

      // PARSING THE DATA

      const getZonaCode = (zona: string) => {
        const firstLetter = zona.substring(0, 1).toUpperCase()

        let output = '131'
        switch(firstLetter) {
            case 'A': output = '131'; break;
            case 'B': output = '141'; break;
            case 'C': output = '161'; break;
            case 'D': output = '171'; break;
            case 'E': output = '151'; break;
            case 'F': output = '181'; break;
            case 'J': output = '131'; break;
        }

        return output
      }

      const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, getZonaCode(payload.zona)) // gorontalo
    //   const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, '141') // kab gorontalo
    //   const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, '151') // kab bone bolango
    //   const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, '161') // kab boalemo
    //   const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, '171') // kab pohuwato
    //   const getInfoPkb = await gorontalo(payload.kota, payload.no.toString(), payload.zona, '181') // kab gorontalo utara

      if (!getInfoPkb.status) {
        return response.notFound({
          message: 'Kendaraan Tidak Ditemukan',
        })
      }

      const nopol = payload.kota.toUpperCase() + payload.no.toString() + payload.zona.toUpperCase()

      const data = {
        kendaraan: {
          merk: '-',
          tahun: '-',
          model: '-',
          warna: '-',
          no_rangka: '-',
          no_mesin: '-',
          no_polisi: nopol,
        },
        pajak: {
          pkb: {
            pok: parseInt(getInfoPkb.data.pkb_den.replace(/\D+/g, '')),
            den: 0
          },
          swd: {
            pok: parseInt(getInfoPkb.data.swdkllj_den.replace(/\D+/g, '')),
            den: 0
          },
          adm: {
            stnk: 0,
            tnkb: parseInt(getInfoPkb.data.pnbp.replace(/\D+/g, '')),
          },
          total: parseInt(getInfoPkb.data.tot_bayar.replace(/\D+/g, '')),
          tgl_pajak: getInfoPkb.data.jth_tempo,
          tgl_stnk: '-',
          milik: 0,
          wilayah: getInfoPkb.data.biller.trim(),
          keterangan: '-',
        },
      }

      return response.ok(data)
    } catch (err) {
      return response.badRequest({
        message: 'Bad Request',
        err: err.message
      })
    }
  }
}

const MTProto   = require('@mtproto/core')
const TempStor  = require('@mtproto/core/src/storage/temp')
const { sleep } = require('@mtproto/core/src/utils/common')

class API {
  constructor(id, hash) {
    this.mtproto = new MTProto({
      api_id: id, api_hash: hash,
      storageOptions: {instance: TempStor}
    })
  }

  async call(method, params, options = {}) {
    try {
      return await this.mtproto.call(method, params, options)
    } catch (error) {
      console.log(`${method} error:`, error)

      if (error.error_code === 420) {
        await sleep(1000 * Number(
          error.error_message.split('FLOOD_WAIT_')[1]
        ))
        return this.call(method, params, options)
      }

      if (error.error_code === 303) {
        const [type, dcIdAsString] = error.error_message.split('_MIGRATE_')
        const dcId = Number(dcIdAsString)

        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId)
        } else {
          Object.assign(options, { dcId })
        }

        return this.call(method, params, options)
      }

      return Promise.reject(error)
    }
  }
}

const api = new API()

module.exports = api

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
      const result = await this.mtproto.call(method, params, options)

      return result
    } catch (error) {
      console.log(`${method} error:`, error)

      const { error_code, error_message } = error

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1])
        const ms = seconds * 1000

        await sleep(ms)

        return this.call(method, params, options)
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_')

        const dcId = Number(dcIdAsString)

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
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

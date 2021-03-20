import listAPI from '@/api/index'

export default function axios (context, inject) {
  const instanceAxios = context.$axios.create()

  instanceAxios.onResponse(response => response.data)

  const instanceAPI = {}
  Object.entries(listAPI(instanceAxios)).forEach(([apiKey, value]) => {
    instanceAPI[apiKey] = value
  })

  inject('api', instanceAPI)
}

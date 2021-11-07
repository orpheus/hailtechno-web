import { useMutation } from 'react-query'
import getAccountApi from 'Apis/account/get-account-api'

export default function useAccountSearch () {
  const [searchAccounts, searchAccountsQuery] = useMutation(async id => {
    return await getAccountApi(encodeURIComponent(id))
  }, {
    onSuccess: data => {
      // console.log('Success', data)
    },
    onError: (err, id) => {
      console.error(`Failed to search for: ${encodeURIComponent(id)}: ${err.message}`)
    }
  })

  return {
    searchAccounts,
    searchAccountsQuery
  }
}

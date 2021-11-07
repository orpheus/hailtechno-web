import { useQuery } from 'react-query'
import getAccountApi from 'Apis/account/get-account-api'

export default function useAccountQuery (id) {
  const safeID = encodeURIComponent(id)
  const { data: account, ...accountQuery } = useQuery(['account', safeID], () => getAccountApi(safeID))
  return {
    account,
    accountQuery
  }
}

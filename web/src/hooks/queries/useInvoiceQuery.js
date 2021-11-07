import { useQuery } from 'react-query'
import getInvoicesApi from 'Apis/invoice/get-invoices-api'

export default function useInvoiceQuery () {
  const { data: invoices, ...invoiceQuery } = useQuery('invoices', getInvoicesApi, {
    staleTime: 5 * 60 * 1000
  })

  return {
    invoices,
    invoiceQuery
  }
}

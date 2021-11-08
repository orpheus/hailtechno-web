import { useQuery } from 'react-query'
import getVideo from 'Apis/core/get-invoices-api'

export default function useInvoiceQuery () {
  const { data: invoices, ...invoiceQuery } = useQuery('invoices', getVideo, {
    staleTime: 5 * 60 * 1000
  })

  return {
    invoices,
    invoiceQuery
  }
}

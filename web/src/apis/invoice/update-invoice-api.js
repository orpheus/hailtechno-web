import { putRequest } from 'Utility/request-wrapper'
import { invoiceController } from 'Constants/urls'

/**
 * @param invoice
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function updateInvoiceApi (invoice, options) {
  return putRequest({
    route: `${invoiceController}/${invoice.id}`,
    data: invoice,
    ...options
  })
}

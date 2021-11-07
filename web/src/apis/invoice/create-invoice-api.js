import { invoiceController } from 'Constants/urls'
import { post } from 'Utility/request-wrapper'

/**
 * @param invoice
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function createInvoiceApi (invoice, options) {
  return post({
    route: invoiceController,
    data: invoice,
    ...options
  })
}

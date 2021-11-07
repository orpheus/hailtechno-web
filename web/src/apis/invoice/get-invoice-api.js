import { invoiceController } from 'Constants/urls'
import { get } from 'Utility/request-wrapper'

/**
 * @param id
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function getInvoiceApi (id, options) {
  return get({
    route: `${invoiceController}/${id}`,
    ...options
  })
}

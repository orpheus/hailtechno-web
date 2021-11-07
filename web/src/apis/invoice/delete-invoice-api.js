import { invoiceController } from 'Constants/urls'
import { deleteRequest } from 'Utility/request-wrapper'

/**
 * @param id
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function deleteInvoiceApi (id, options) {
  return deleteRequest({
    route: `${invoiceController}/${id}`,
    ...options
  })
}

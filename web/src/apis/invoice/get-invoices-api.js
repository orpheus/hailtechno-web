import { invoiceController } from 'Constants/urls'
import { get } from 'Utility/request-wrapper'

/**
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function getInvoicesApi (options) {
  return get({
    route: invoiceController,
    ...options
  })
}

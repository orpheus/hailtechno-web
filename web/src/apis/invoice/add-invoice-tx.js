import { addTxController } from 'Constants/urls'
import { post } from 'Utility/request-wrapper'

/**
 * @param invoiceData
 * @param options
 * @returns {Promise<undefined|*>}
 */
export default function addInvoiceTx (invoiceData, options) {
  return post({
    route: addTxController,
    data: invoiceData,
    ...options
  })
}

export const url = `${process.env.PAYMENTS_SERVICE_HOST}:${process.env.PAYMENTS_SERVICE_PORT}`
const root = `${url}/api`

// toDo: NEED LOGIN AUTH SERVER URL
export const loginController = `${url}/api/login`

export const accountController = `${root}/account`
export const banksController = `${root}/banks`
export const invoiceController = `${root}/invoice`
export const transactionController = `${root}/transaction`
export const txReportController = `${root}/transaction/report/csv`
export const txReversalController = id => `${root}/transaction/${id}/reverse`
export const imageController = id => `${root}/image/${id}`
export const userController = `${root}/user`
export const partyController = `${root}/party`
export const partiesController = `${root}/parties`
export const permissionsController = `${root}/permissions`
export const resetPasswordController = `${userController}/resetPassword`
export const setPasswordController = `${userController}/setPassword`

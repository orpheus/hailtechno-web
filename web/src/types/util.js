import PropTypes from 'prop-types'

export const oneOf = items => PropTypes.oneOf(items)
export const arrayOf = items => PropTypes.arrayOf(items)
export const List = i => arrayOf(i)
export const obj = obj => PropTypes.shape(obj)
export const String = PropTypes.string
export const Number = PropTypes.number
export const Boolean = PropTypes.bool
export const UUID = String
export const Float = Number
export const Long = Number
export const Int = Number
export const OffsetDateTime = String

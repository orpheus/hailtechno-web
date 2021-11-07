import DateTime from 'luxon/src/datetime.js'

export function currentFullDate () {
  return DateTime.now().toLocaleString(DateTime.DATE_FULL)
}

export function fullDateFromIso (isoDate) {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL)
}

export function localeDate (date) {
  return (new Date(date)).toLocaleDateString('en-ZM', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function monthDayYear (date) {
  return DateTime.fromISO(date.toISOString()).toFormat('MM-dd-yyyy')
}

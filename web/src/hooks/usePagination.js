import { useState, useEffect } from 'react'

export default function usePagination ({
  page: _page = 0,
  rowsPerPage: _rowsPerPage = 5,
  rows = []
}) {
  const [page, setPage] = useState(_page)
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPage)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const _handleChangePage = (newPage) => {
    if (newPage < 0) return
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const activeRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  useEffect(() => {
    setRowsPerPage(_rowsPerPage)
  }, [_rowsPerPage])

  useEffect(() => {
    if (rows.length < page * rowsPerPage) {
      let x = rows.length / rowsPerPage
      if (x > 1) {
        x = Math.ceil(x)
      } else x = 1
      setPage(
        x - 1
      )
    }
  }, [rows, page, rowsPerPage])

  function handleChangePage (amt) {
    return () => {
      if (page + amt < 0) return

      const total = rows.length
      const maxPage = total / rowsPerPage

      if (page + amt >= maxPage) return

      _handleChangePage(page + amt)
    }
  }

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    activeRows
  }
}

import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from "prop-types"


export default function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {

    const pagesCount = Math.ceil(itemsCount / pageSize)
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1)

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => (
                        <li key={page}
                            className={page === currentPage ? "page-item active" : "page-item"}>
                            <Link className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )

}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired ,
    pageSize: PropTypes.number.isRequired ,
    onPageChange: PropTypes.func.isRequired ,
    currentPage: PropTypes.number.isRequired
}

import React from 'react'

export default function TableHeader({sortColumn , columns , onSort}) {

    const raiseSort = (path) => {
        const prevSortColumn = { ...sortColumn }
        if (prevSortColumn.path === path) {
            prevSortColumn.order = prevSortColumn.order === 'asc' ? 'desc' : 'asc'
        } else {
            prevSortColumn.path = path
            prevSortColumn.order = 'asc'
        }
        onSort(prevSortColumn)
    }

    const renderSortIcon = (column)=>{
        if(column.path !== sortColumn.path){
            return null
        }
        if(sortColumn.order === 'asc'){
            return <i className="fa fa-sort-asc"/>
        }
        return <i className="fa fa-sort-desc"/>
    }

    return (
        <thead>
            <tr>
                {columns.map((column)=>(
                    <th key={column.path || column.key} style={{ cursor: 'pointer' }} 
                    onClick={() => raiseSort(column.path)}>
                        {column.lable}{renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

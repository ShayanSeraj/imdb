import React from 'react'

export default function ListGroup({ items, textProperty, valueProperty, onItemSelect, selectedGenres }) {
    return (
        <ul className="list-group">
            {items.map(item => (
                <li onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    className={item === selectedGenres ? 'list-group-item active' : 'list-group-item'}
                    style={{cursor : 'pointer'}}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: "_id"
}

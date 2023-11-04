import React from 'react'

export default function Like(props) {

    let classes = " text-danger fa fa-heart"
    if (!props.liked) {
        classes += "-o"
    }

    return (
        <React.Fragment>
            <i className={classes} style={{ cursor: 'pointer' }}
                aria-hidden='true' onClick={props.onLike}></i>
        </React.Fragment>
    )
}

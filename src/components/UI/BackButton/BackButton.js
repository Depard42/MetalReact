import "./BackButton.css"

function BackButton(props)
{
    return (
        <div className='backbutton' onClick={props.onClick}>
            <i className="fas fa-arrow-left"></i>
        </div>
    )
}

export default BackButton
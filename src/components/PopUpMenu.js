import React from "react";
import './PopUpMenu.modul.css'




export default function PopUpMenu(props)
{
    const closeFun = props.closeFun;
    const Bottom = props.bottom;
    const column = props.column || false;
    const classNames = 'PopUpMenuVariants' + (column ? " column" : "");
    var trigger = props.trigger;
    
    

    function close()
    {
        closeFun();
    }

    return (
        trigger && (
            <div>
                <div className="PopUpMenuBG">
                    <div 
                        className='PopUpMenuCloseArea'
                        onClick={close}
                    ></div>
                    <div className='PopUpMenu'>
                        <div className="close_button">
                            <i className="fas fa-xmark"
                                onClick={close}
                            ></i>
                        </div>
                        <div className={classNames}>
                            {props.children}
                        </div>
                        <div className='PopUpMenuBottom'>
                            {Bottom && <Bottom></Bottom>}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

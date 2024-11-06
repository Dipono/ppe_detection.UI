import '../styles/Popup.css'
function Popup(props) {
    return (props.trigger) ? (
        <div className="register-popup">
            <div className="register-popup-inner">
                
                <div className="popup-header">
                <h4 style={{marginLeft:'40px'}}>All Today Cases</h4>
                <h4 id='cancel' onClick={() => props.setTrigger(false)}>X</h4>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;
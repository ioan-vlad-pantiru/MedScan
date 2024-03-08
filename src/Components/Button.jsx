import './Button.css'


function Button({onClick, style, className, icon, children, type}) {

    return (
      <button className={"button " + className} style={style} onClick={() => onClick()} type={type}>
        <p>{children}</p>
        {icon}
      </button>
    )
  }
  
  export default Button
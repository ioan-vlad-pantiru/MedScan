import './InputField.css';

function InputField({value, setValue, className, label, type, labelPos}) {
    return (
    <div className='input-field-container' style={labelPos=="side" ? {flexDirection: "row", alignItems: "center"} : {flexDirection: "column"}}>
        <label className='input-field-label'>{label}</label>
        <input type={type} name={label} className={"input-field " + className} value={value} onChange={(e)=>setValue(e.target.value)}/>
    </div>
    )
}
  
  export default InputField
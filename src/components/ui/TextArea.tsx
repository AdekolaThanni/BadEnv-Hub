import React from 'react'

function TextArea(props: {containerClassName?: string, label: string, value: string, name: string, key: string, placeholder: string, handleValueChange: any, className: string, optional?: boolean}) {

    return (
      <div className={`flex flex-col gap-3 ${props.containerClassName}`}>
          {/* label */}
          <label htmlFor={props.name} className="capitalize font-semibold text-[18px]">{props.label} <span className="opacity-70 font-normal">{props.optional ? "(optional)" : ""}</span></label>
  
          {/* input */}
          <textarea onChange={(e: any) => {
          props.handleValueChange(e.target.value)
        }} value={props.value} maxLength={400} placeholder={props.placeholder} name={props.name} className={`py-3 px-4 rounded-[8px] border border-[rgba(108,108,108,1)] bg-transparent placeholder={props.placeholder ${props.className}`} />
      </div>
    )
  }
  
  export default TextArea;
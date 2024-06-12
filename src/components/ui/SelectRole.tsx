import React from 'react'

function SelectRole(props: {handleValueChange: any, value: any[], className?: string}) {
    const [dropdownVisible, setDropdownVisible] = React.useState(false);

    const allRoles = React.useMemo(() => [
        "Alpha",
        "Beta",
        "Omega"
    ], []);


  return (
    <div className={`relative ${props.className}`}>
        {/* field input */}
        <div onClick={() => setDropdownVisible(prevState => !prevState)} className="hover:opacity-70 duration-200 flex items-center justify-between py-3 px-4 border border-[rgba(108,108,108,1)] rounded-[6px]">
            <span className="">Role</span>

            <svg className={`${!dropdownVisible ? "rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15.5L12 8L20 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        {/* modal */}
        {dropdownVisible && <div className="rounded-[6px] absolute top-[110%] left-0 w-full bg-[rgba(39,39,39,1)] py-4 space-y-2 z-[10] cursor-pointer">
            {allRoles.map(role => {
                const roleActive = props.value.some(cat => cat === role)

                return <div key={role} className="flex items-center gap-4 px-4  py-2 hover:bg-[#ffffff30] duration-75" onClick={() =>  props.handleValueChange("role", roleActive ? props.value.filter((cat: string) => cat !== role) : [...props.value, role])}>
                    {/* mark icon */}
                    <div className="w-5 h-5 rounded-[6px] border border-[rgba(166,166,166,1)] flex items-center justify-center">
                        {roleActive && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6663 3.5L5.24967 9.91667L2.33301 7" stroke="#FFD600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        }
                    </div>

                    {/* title */}
                    <p className="">{role}</p>
                </div>
            })}
        </div>}
    </div>
  )
}

export default SelectRole;
import React from 'react';
import countries from "@/lib/countries"

function SelectLocation(props: {handleValueChange: any, className?: string, hideTitle?: boolean, value?: any}) {
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    const countriesToSearch = React.useMemo(() => countries.filter(country => country.name.toLowerCase().startsWith(searchValue.toLowerCase())), [searchValue])

  return (
    <div className={`relative ${props.className}`}>
        {/* title */}
        {!props.hideTitle && <p className="font-semibold mb-2 text-[18px]">Location <span className='opacity-60'>(optional)</span></p>}

        {/* field input */}
        <div onClick={() => setDropdownVisible(prevState => !prevState)} className="hover:opacity-70 duration-200 flex items-center justify-between py-3 px-4 border border-[rgba(108,108,108,1)] rounded-[6px]">
            {props.value?.country && <div className="flex items-center gap-4">
                {/* flag */}
                <span className="">{props.value.flag}</span>

                {/* country */}
                <span className="">{props.value.country}</span>
            </div>}

            {!props.value?.country && <span>Location</span>}

            <svg className={`${!dropdownVisible ? "rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15.5L12 8L20 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        {/* modal */}
        {dropdownVisible && <div className="rounded-[6px] max-h-[350px] flex flex-col absolute top-[110%] left-0 w-full bg-[rgba(39,39,39,1)] py-4 space-y-2 z-[10] cursor-pointer">
            {/* search bar */}
            <div className="flex items-center border-b border-b-[#ffffff30] px-3 pb-2 gap-2">
                {/* search icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff30" d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"/></svg>

                <input value={searchValue} onChange={(e: any) => setSearchValue(e.target.value)} type="text" className="bg-transparent flex-grow placeholder:text-[#ffffff30]" placeholder='Search Country'/>
            </div>

            <div className="flex-grow overflow-y-scroll">
                {countriesToSearch.map(country => {
                    return <div key={country.name} className="flex items-center gap-4 px-4  py-2 hover:bg-[#ffffff30] duration-75" onClick={() => props.handleValueChange("location", {country: country.name, flag: country.emoji})}>
                        {/* country emoji */}
                        <span className="">{country.emoji}</span>

                        {/* title */}
                        <p className="">{country.name}</p>
                    </div>
                })}
            </div>
        </div>}
    </div>
  )
}

export default SelectLocation
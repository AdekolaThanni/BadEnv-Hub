import categories from '@/utils/categories';
import React from 'react'

function SelectCategory(props: {handleValueChange: any, value: any[], hideTitle?: boolean, className?: string}) {
    const [dropdownVisible, setDropdownVisible] = React.useState(false);

  return (
    <div className={`relative ${props.className}`}>
        {/* title */}
        {!props.hideTitle && <p className="font-semibold mb-2 text-[18px]">Choose Your Category</p>}

        {/* field input */}
        <div onClick={() => setDropdownVisible(prevState => !prevState)} className="hover:opacity-70 duration-200 flex items-center justify-between py-3 px-4 border border-[rgba(108,108,108,1)] rounded-[6px]">
            <span className="">Category</span>

            <svg className={`${!dropdownVisible ? "rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 15.5L12 8L20 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        {/* selected categories */}
        {!props.hideTitle && Boolean(props.value?.length) && <div className="mt-3 flex items-center flex-wrap gap-3 w-[80%]">{props.value?.map(catTitle => {
            const catData = categories.find(c => c.title === catTitle);

            return <p style={{backgroundColor: catData?.colorCode}} className={`px-3 py-1 rounded-full`}>{catData?.title}</p> 
        })}</div>}

        {/* modal */}
        {dropdownVisible && <div className="rounded-[6px] absolute top-[110%] left-0 w-full bg-[rgba(39,39,39,1)] py-4 space-y-2 z-[10] cursor-pointer h-[220px] overflow-y-scroll custom-scrollbar">
            {categories.map((category: any) => {
                const categoryActive = props.value.some(cat => cat === category.title)

                return <div key={category.title} className="flex items-center gap-4 px-4  py-2 hover:bg-[#ffffff10] duration-75" onClick={() => props.handleValueChange("category", categoryActive ? props.value.filter((cat: string) => cat !== category.title) : [...props.value, category.title])}>
                    {/* mark icon */}
                    <div className="w-5 h-5 rounded-[6px] border border-[rgba(166,166,166,1)] flex items-center justify-center">
                        {categoryActive && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6663 3.5L5.24967 9.91667L2.33301 7" stroke="#FFD600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        }
                    </div>

                    {/* title */}
                    <p style={{backgroundColor: category.colorCode}} className={`px-3 py-1 rounded-full`}>{category.title}</p>
                </div>
            })}
        </div>}
    </div>
  )
}

export default SelectCategory
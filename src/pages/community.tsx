import AppLayout from '@/components/AppLayout';
import SelectCategory from '@/components/ui/SelectCategory';
import SelectLocation from '@/components/ui/SelectLocation';
// import SelectRole from '@/components/ui/SelectRole';
import getAllUsers from '@/fetchers/getAllUsers';
import categories from '@/utils/categories';
import React from 'react';

function Community() {
    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchInputValue, setSearchInputValue] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    // const [role, setRole] = React.useState<string[] >([]);
    const [country, setCountry] = React.useState<{country: string, flag: string} | null>(null);

    const handleGetAllUsers = async () => {
        try {
            setIsLoading(true);

            const users = await getAllUsers();

            setUsers(users);
        } catch (error: any) {
            console.error("Error with fetching all users --->>>", error.messaage)
        } finally {
            setIsLoading(false)
        }
    }

    const usersProcessedResult = React.useMemo(() => {

        let aggregatedResult = users;

        // search name
        if (searchInputValue) {
            aggregatedResult = aggregatedResult.filter((user: any) => user.profile.username?.toLowerCase().startsWith(searchInputValue.toLowerCase()))
        }

        // fiter based on category
        if (selectedCategory.length) {
            aggregatedResult = aggregatedResult.filter((user: any) => user.profile.category?.some((userCategory: string) => selectedCategory.includes(userCategory)));
        }

        // filter based on role
        // aggregatedResult = aggregatedResult.filter()

        // filter based on country
        if (country) {
            aggregatedResult = aggregatedResult.filter((user: any) => user.profile.location?.country === country.country);
        }

        return aggregatedResult;
    }, [users, searchInputValue, JSON.stringify(selectedCategory), JSON.stringify(country)])

    React.useEffect(() => {
        handleGetAllUsers();
    }, [])

  return (
    <AppLayout>
        <div className="">
            {/* title */}
            <h1 className="uppercase font-boold text-[26px]">All Holders {!isLoading && Boolean(users.length) && <span className="text-[#FFD600] ml-3 inline-block">{users.length}</span>} </h1>

            {/* filter */}
            <div className="flex gap-3 mt-8 md:flex-col">
                {/* search bar */}
                <div className="mr-auto border border-[#6C6C6C] py-2 px-2.5 rounded-[4px] flex items-center gap-2.5 w-[300px] md:max-w-[600px]">
                    {/* search icon */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000666667 8.316 0 6.5C0 4.68333 0.629333 3.146 1.888 1.888C3.14667 0.63 4.684 0.000666667 6.5 0C8.31667 0 9.85433 0.629333 11.113 1.888C12.3717 3.14667 13.0007 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C11 5.25 10.5627 4.18767 9.688 3.313C8.81333 2.43833 7.75067 2.00067 6.5 2C5.25 2 4.18767 2.43767 3.313 3.313C2.43833 4.18833 2.00067 5.25067 2 6.5C2 7.75 2.43767 8.81267 3.313 9.688C4.18833 10.5633 5.25067 11.0007 6.5 11Z" fill="#6C6C6C"/>
                    </svg>

                    {/* searchInput */}
                    <input value={searchInputValue} onChange={(e: any) => setSearchInputValue(e.target.value)} type="text" className="focus-outline:none bg-transparent placeholder:text-[#6C6C6C] text-white flex-grow" placeholder='Search by username'/>
                </div>

                <div className="ml-auto flex items-center gap-2.5 basis-[600px] md:basis-0 md:w-full">
                    {/* Category filter */}
                    <SelectCategory handleValueChange={(_: string, value: any) => {setSelectedCategory(value)}} value={selectedCategory} className="flex-grow text-[#ffffff80]" hideTitle={true}/>


                    {/* Role filter */}
                    {/* <SelectRole handleValueChange={(_: string, value: any) => {setRole(value)}} value={role} className="flex-grow text-[#ffffff80] md:ml-auto"/> */}


                    {/* Country filter */}
                    <SelectLocation handleValueChange={(_: string, value: any) => {setCountry({country: value.country, flag: value.flag})}} value={country} className="flex-grow text-[#ffffff80]" hideTitle={true}/>
                
                </div>
            </div>

            
            
            <div className="grid grid-cols-[repeat(auto-fit_,minmax(300px,_1fr))] gap-10 mt-8">
                {/* all users fetched */}
                {isLoading && [1,2,3,4,5,6,7,8,9,10].map(cardId => <div key={cardId} className="w-full h-[358px] bg-[#161616] animate-[pulse_1.2s_linear_infinite]"></div>)}

                {!isLoading && Boolean(usersProcessedResult.length) && usersProcessedResult.map((user: any) => <div key={user.id} className="w-full flex flex-col items-center p-5 shadow-[2px_2px_0px_#FFE50060] rounded-[8px] border border-[#4C4C4C] bg-[#161616]">
                    {/* user pfp */}
                    <img src={user.profile.pfpUrl || "/assets/images/pfp.png"} alt="User avatar" className="w-[100px] h-[100px] rounded-full mb-5" />

                    {/* username */}
                    <p className="uppercase font-bold text-[22px] mb-3">{user.profile.username || "Anonymous"}</p>

                    {/* category */}
                    <div className="flex items-center mb-2 gap-2">
                        {Boolean(user.profile.category?.length) && <div className={`px-3 py-1 rounded-full font-semibol`} style={{backgroundColor: categories.find(cat => cat.title === user.profile.category[0])?.colorCode}}>{user.profile.category[0]}</div>}
                        {Boolean(user.profile.category?.length > 1) && <div className={`px-3 py-1 rounded-full font-semibol`} style={{backgroundColor: categories.find(cat => cat.title === user.profile.category[1])?.colorCode}}>{user.profile.category[1]}</div>}
                        {Boolean(user.profile.category?.length > 1) && <span className="">+{user.profile.category.length - 2}</span>}
                    </div>

                    {/* role and country */}
                    <div className="flex items-center mb-10 gap-1 text-[16px]">
                        {/* role */}
                        {/* <div className="bg-[#4C4C4C] px-3 py-1 rounded-full font-semibold">Alpha</div> */}

                        {/* country */}
                        {user.profile.location?.country &&  <div className="bg-[#4C4C4C] px-3 py-1 rounded-full font-semibold">{user.profile.location?.flag} {user.profile.location?.country}</div> }
                    </div>

                    {/* winnings */}
                    <div className="self-start flex flex-col mt-auto">
                        {/* balance */}
                        <div className="flex items-center gap-1">
                            {/* dollar icon */}
                            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.58203 7.07422C5.58203 7.45508 5.89453 7.5332 7.56445 7.5918V5.92188C5.94336 6.07812 5.58203 6.66406 5.58203 7.07422ZM12.6133 11.4883C12.6133 11.0488 12.3105 10.9316 10.4453 10.8535V12.6797C12.2812 12.4844 12.6133 11.8691 12.6133 11.4883ZM0.357422 11.4297H5.38672C5.38672 11.918 5.77734 12.4453 7.56445 12.6602V10.7461C5.06445 10.6191 3.26758 10.2676 2.18359 9.69141C1.09961 9.11523 0.552734 8.16797 0.552734 6.84961C0.552734 4.35938 3.00391 2.93359 7.56445 2.70898V0.667969H10.4453V2.71875C14.752 2.93359 17.3887 4.18359 17.3887 6.97656H12.3594C12.3594 6.53711 11.7246 6.21484 10.4453 6.00977V7.69922C14.9277 7.9043 17.6426 8.4707 17.6426 11.3809C17.6426 14.457 15.0742 15.7363 10.4453 15.9121V17.9531H7.56445V15.9219C2.92578 15.7461 0.347656 14.7695 0.357422 11.4297Z" fill="#FFD600"/>
                            </svg>

                            <span className="font-bold">{user.totalEarned}</span>
                        </div>

                        {/* bounty points */}
                        <div className="flex items-center gap-1">
                            {/* bounty icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.17578L15.9583 11.9991L20.9062 8.11689L18.9271 17.8224H5.07292L3.09375 8.11689L8.04167 11.9991L12 6.17578Z" fill="#FFD600" stroke="#FFD600" stroke-width="1.82692" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.034 11.6818C17.7461 11.4483 16.3878 13.0107 15.8131 13.6669C15.2023 12.9977 13.5715 11.7241 13.3877 11.9737C13.2038 12.2233 14.5178 13.9977 14.8884 14.6594C14.6823 15.3017 13.8054 17.0123 14.025 17.1311C14.2446 17.2499 15.5253 15.9958 16.1215 15.4574C16.8205 15.7817 18.0422 16.3604 18.1573 16.158C18.2725 15.9556 17.1842 14.9449 16.636 14.3091C17.2733 13.3685 18.2422 11.8507 18.034 11.6818Z" fill="black" stroke="black" stroke-width="1.04866"/>
                            </svg>

                            <span className="font-bold">{user.points}</span>
                        </div>
                    </div>
                </div>)}

                {!isLoading && !Boolean(usersProcessedResult.length) && <p className="uppercase font-bold w-full text-[30px]">No Users found</p>}
            </div>
        </div>
    </AppLayout>
  )
}

export default Community;
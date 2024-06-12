import React from 'react';
import TextInput from './ui/TextInput';
import TextArea from './ui/TextArea';
import SelectCategory from './ui/SelectCategory';
import SelectLocation from './ui/SelectLocation';
import { useWallet } from '@solana/wallet-adapter-react';
import NFTRoundedCard from './NFTRoundedCard';
import Image from './ui/Image';
import toast from 'react-hot-toast';
import { useUser } from '@/contexts/UserProvider';
import getUser from '@/fetchers/getUser';
import updateUserProfile from '@/fetchers/updateUserProfile';

function UserProfileForm(props: {profileIsNew : boolean}) {
    const {user,setUser, walletNFTs} = useUser();

    const [defaultValue, setDefaultValue] = React.useState({});

    const [currPFPDisplayInd, setCurrPFPDisplayInd] = React.useState(0)

    const [formData, setFormData] = React.useState<{
        username?: any,
        bio?: any,
        location?: any,
        category?: any,
        pfpUrl?: any,
        xLink?: any,
        instagramLink?: any,
        personalLink?: any,
    }>({pfpUrl: "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeielr6axrkbmcn6ozd5li3tp5f6ax2r6ryvfrszvh2wfz3jwcjao7y.ipfs.nftstorage.link%2F1599.png%3Fext%3Dpng"});

    const [loading, setLoading] = React.useState(false);
    const {publicKey} = useWallet();

  
    const handleFormValueChange = (key: string, value: any) => {
        setFormData((prevState) => ({...prevState, [key]: value}));
    }

    React.useEffect(() => {
        const currentDefaultValue = {
            username: user.profile?.username || "",
            bio: user.profile?.bio || "",
            location: user.profile?.location || {},
            category: user.profile?.category || [],
            pfpUrl: user.profile?.pfpUrl || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeielr6axrkbmcn6ozd5li3tp5f6ax2r6ryvfrszvh2wfz3jwcjao7y.ipfs.nftstorage.link%2F1599.png%3Fext%3Dpng",
            xLink: user.profile?.xLink || "",
            instagramLink: user.profile?.instagramLink || "",
            personalLink: user.profile?.personalLink || "",
        };
        setDefaultValue(currentDefaultValue)
        setFormData(currentDefaultValue)
    }, [user])


    const saveProfile = async () => {
        try {
            setLoading(true)

            const message = await updateUserProfile(user.id, {...formData, pfpUrl: (formData as any).pfpUrl || user.profile?.pfpUrl || "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeielr6axrkbmcn6ozd5li3tp5f6ax2r6ryvfrszvh2wfz3jwcjao7y.ipfs.nftstorage.link%2F1599.png%3Fext%3Dpng"}, props.profileIsNew);

            const userNewData = await getUser(user.id);
            setUser(userNewData)

            toast.success(message);
        } catch (error: any) {
          toast.error("Error saving profile:" + error.message);
        } finally {
            setLoading(false)
        }
    };
  
    const handleEditProfile = async (event: any) => {
      event.preventDefault();
  
      await saveProfile();
    }

    const changesMade = React.useMemo(() => {
        return JSON.stringify(defaultValue) !== JSON.stringify(formData)
    }, [formData])

  return (
    <form onSubmit={handleEditProfile} className="flex flex-col gap-5 flex-grow">
            <div className="flex gap-5 xl:flex-col xl:items-center flex-grow overflow-y-scroll">
                {/* pfp picker */}
                <div className="p-8 space-y-3 bg-[#161616] rounded-[12px] xl:w-full flex flex-col items-center">
                    {/* image */}
                    <Image imageSrc={formData.pfpUrl} imageAlt='' width="320px" height="320px" className='' />

                    {publicKey && <>
                        {/* picker */}
                        {Boolean(walletNFTs.length) && (() => {
                            const numPartitions = Math.ceil(walletNFTs.length / 4);


                            
                            return  <>
                            <div className="flex flex-wrap items-center justify-center gap-4 w-full mt-6 mb-4 overflow-x-hidden">
                                {/* left arrow */}
                                <svg onClick={() => setCurrPFPDisplayInd(prevState => (prevState > 0) ? prevState - 1 : prevState)} className='shrink-0' width="12" height="21" viewBox="0 0 12 21" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="white" d="M11.3329 0.99916C11.176 0.840993 10.9894 0.715453 10.7838 0.629781C10.5781 0.544109 10.3576 0.5 10.1348 0.5C9.91201 0.5 9.69145 0.544109 9.48581 0.629781C9.28017 0.715453 9.09353 0.840993 8.93666 0.99916L0.49916 9.43666C0.340993 9.59353 0.215453 9.78017 0.12978 9.98581C0.0441083 10.1914 0 10.412 0 10.6348C0 10.8576 0.0441083 11.0781 0.12978 11.2838C0.215453 11.4894 0.340993 11.676 0.49916 11.8329L8.93666 20.2704C9.09353 20.4286 9.28017 20.5541 9.48581 20.6398C9.69145 20.7255 9.91201 20.7696 10.1348 20.7696C10.3576 20.7696 10.5781 20.7255 10.7838 20.6398C10.9894 20.5541 11.176 20.4286 11.3329 20.2704C11.4911 20.1135 11.6166 19.9269 11.7023 19.7213C11.788 19.5156 11.8321 19.2951 11.8321 19.0723C11.8321 18.8495 11.788 18.6289 11.7023 18.4233C11.6166 18.2177 11.4911 18.031 11.3329 17.8742L4.07666 10.6348L11.3329 3.39541C11.4911 3.23853 11.6166 3.0519 11.7023 2.84626C11.788 2.64062 11.8321 2.42005 11.8321 2.19728C11.8321 1.97451 11.788 1.75395 11.7023 1.54831C11.6166 1.34267 11.4911 1.15603 11.3329 0.99916Z"/>
                                </svg>

                                <div className="relative flex-grow h-[58px] overflow-x-hidden">
                                    {Array.from({length: numPartitions}).map((_, ind) => <div className='absolute top-0 left-0 flex items-center justify-center gap-3 duration-200 w-full' style={{
                                        transform: `translateX(${(100 * (currPFPDisplayInd - ind))}%)`
                                    }}>
                                        {walletNFTs.slice(0 + (4 * ind), 4 + (4 * ind)).map((nft: any, i: any) => (
                                            <NFTRoundedCard
                                                nft={nft}
                                                key={nft.mintAddress}
                                                index={i}
                                                onCardClick={(imageSrc: string) => {
                                                    handleFormValueChange("pfpUrl", imageSrc)
                                                }}
                                                width={58}
                                                height={58}
                                                activePfp={formData.pfpUrl}
                                            />
                                        ))}
                                    </div>)}
                                </div>

                                {/* right arrow */}
                                <svg onClick={() => setCurrPFPDisplayInd(prevState => (prevState < numPartitions - 1) ? prevState + 1 : prevState)} className='shrink-0'  width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.66709 0.99916C0.823965 0.840993 1.0106 0.715453 1.21624 0.629781C1.42188 0.544109 1.64245 0.5 1.86522 0.5C2.08799 0.5 2.30855 0.544109 2.51419 0.629781C2.71983 0.715453 2.90647 0.840993 3.06334 0.99916L11.5008 9.43666C11.659 9.59353 11.7845 9.78017 11.8702 9.98581C11.9559 10.1914 12 10.412 12 10.6348C12 10.8576 11.9559 11.0781 11.8702 11.2838C11.7845 11.4894 11.659 11.676 11.5008 11.8329L3.06334 20.2704C2.90647 20.4286 2.71983 20.5541 2.51419 20.6398C2.30855 20.7255 2.08799 20.7696 1.86522 20.7696C1.64245 20.7696 1.42188 20.7255 1.21624 20.6398C1.0106 20.5541 0.823965 20.4286 0.66709 20.2704C0.508924 20.1135 0.383384 19.9269 0.297711 19.7213C0.212039 19.5156 0.167931 19.2951 0.167931 19.0723C0.167931 18.8495 0.212039 18.6289 0.297711 18.4233C0.383384 18.2177 0.508924 18.031 0.66709 17.8742L7.92334 10.6348L0.66709 3.39541C0.508924 3.23853 0.383384 3.0519 0.297711 2.84626C0.212039 2.64062 0.167931 2.42005 0.167931 2.19728C0.167931 1.97451 0.212039 1.75395 0.297711 1.54831C0.383384 1.34267 0.508924 1.15603 0.66709 0.99916Z" fill="white"/>
                                </svg>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-3">
                                {Array.from({length: numPartitions}).map((_, ind) => <div onClick={() => setCurrPFPDisplayInd(ind)} className={`w-3 h-3 rounded-full ${currPFPDisplayInd === ind ?  "bg-[#FFD600]" : "bg-[#ffffff50]"}`}></div>)}
                            </div>
                        </>})()
                           
                        }


                        {!Boolean(walletNFTs.length) && <p className=''>You have no BadEnv NFT in your wallet. <a href="https://magiceden.io/marketplace/bad_environment_club" target='_blank' className="text-[#FFD600]">Get here</a></p>}
                    </>}

                    {!publicKey && <p className=''>Select a Wallet where you have a BadEnv NFT.</p>}
                </div>

                {/* user details */}
                <div className="flex lg:flex-col gap-9 bg-[#161616] p-8 rounded-[12px] flex-grow xl:w-full">
                    {/* First block */}
                    <div className="space-y-5 flex flex-col flex-grow">
                        <TextInput value={formData.username} label="Username" name="username" key="username" placeholder='Username' handleValueChange={(value: string) => handleFormValueChange("username", value)}/>
                        <SelectCategory value={formData.category} handleValueChange={(key: string, value: any) => handleFormValueChange(key, value)}/>
                        <TextArea value={formData.bio}  className="h-[120px]" label="Bio" name="bio" key="bio" optional={true} placeholder='Description for your profile' handleValueChange={(value: string) => handleFormValueChange("bio", value)}/>

                        {/* max characters */}
                        <span className="opacity-70 mt-auto self-end">max 400 symbols</span>
                    </div>

                    {/* divider */}
                    <svg width="1" height="402" preserveAspectRatio="none" className="self-center lg:hidden" viewBox="0 0 1 402" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="2.18557e-08" x2="0.499982" y2="402" stroke="#4C4C4C"/>
                    </svg>

                    {/* second block */}
                    <div className="space-y-5 flex-grow">
                        {/* location */}
                        <SelectLocation value={formData.location} handleValueChange={(key: string, value: any) => handleFormValueChange(key, value)}/>
                        <TextInput value={formData.xLink}  label="X link" name="xLink" key="xLink" placeholder='https://x.com/username' handleValueChange={(value: string) => handleFormValueChange("xLink", value)}/>
                        <TextInput value={formData.instagramLink}  label="Instagram Link" optional={true} name="instagramLink" key="instagramLink" placeholder='https://instagram.com/username' handleValueChange={(value: string) => handleFormValueChange("instagramLink", value)}/>
                        <TextInput value={formData.personalLink}  label="Personal Link" optional={true} name="personalLink" key="personalLink" placeholder='https://' handleValueChange={(value: string) => handleFormValueChange("personalLink", value)}/>
                    </div>
                </div>
            </div>

            <div className={`self-end space-x-4 flex items-center gap-2 ${!props.profileIsNew && !changesMade && "opacity-50"}`}>
                {props.profileIsNew && <button type='submit' className="min-w-[150px] hover:opacity-70 duration-200 border border-white bg-transparent rounded-[4px] text-white py-2.5 px-4 flex items-center justify-center">
                        <span className="">Create Profile</span>
                        {loading && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                    }</button>
}
                {!props.profileIsNew && <>
                    {/* discard */}
                    <button disabled={!changesMade} onClick={() => setFormData(defaultValue)} className="hover:opacity-70 duration-200 border border-white bg-transparent rounded-[4px] text-white py-2.5 px-4">Discard</button>

                    {/* save changes */}
                    <button disabled={!changesMade} type="submit" className="min-w-[150px] hover:opacity-70 duration-200 py-2.5 px-4 bg-[rgba(235,33,46,1)] gap-2 text-white rounded-[4px] flex items-center justify-center">
                        <span className="">Save Changes</span>
                        {loading && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                    }</button>
                </>}
            </div>
        </form>
  )
}

export default UserProfileForm;
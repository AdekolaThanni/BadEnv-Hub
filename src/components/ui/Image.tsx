import React from 'react'

function Image(props: {imageSrc: string, imageAlt: string, width: string, height: string, className: string, showAnimation?: boolean}) {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState("");

    React.useEffect(() => {
        setImageSrc(props.imageSrc)
    }, [props.imageSrc])


    const handleImageOnLoad = () => {
        setImageLoaded(true)
    }

  return (
    <>
            <div style={{width: props.width, height: props.height}} className={`w-[${props.width}] h-[${props.height}] bg-[#ffffff20] inline-block ${props.className} ${props.showAnimation && "animate-[pulse_1.2s_linear_infinite]"} ${imageLoaded && "hidden"}`}></div>
            <img onLoad={handleImageOnLoad} style={{width: props.width, height: props.height}} src={imageSrc} alt={props.imageAlt} className={`!w-[${props.width}] !h-[${props.height}] ${props.className} ${!imageLoaded && "hidden"}`} />
        
    </>
  )
}

export default Image
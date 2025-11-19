import { FC, useState } from 'react'
import { Image, Skeleton, Icon, Text, ResponsiveValue } from '@chakra-ui/react'
import { FaRegImage } from "react-icons/fa";

interface CustomImageProps {
    sizeClassName: string,
    src: string,
    alt: string,
    filter?: string,
    animationClassName?: string,
    objectFit?: ResponsiveValue<unknown>
}

const CustomImage : FC<CustomImageProps> = ({ sizeClassName, src, alt, filter, animationClassName, objectFit }) => {
    
    const [previewIsLoad, setPreviewIsLoad] = useState<boolean>(false)

    return(
        <>
            {
                !previewIsLoad && (
                    <div className={`${sizeClassName} relative border-[3px] border-dashed border-[#7777773b]`}>
                        <Skeleton
                        variant="shine"
                        css={{
                            "--start-color": "#01366A90",
                            "--end-color": "#fff"
                        }}
                        className={sizeClassName}
                        />
        
                        <div className={`top-0 absolute ${sizeClassName} flex justify-center items-center`}>
                            <div className='flex flex-col items-center gap-1 z-20'>
                                <Icon color="#7777773b" fontSize="2rem" as={FaRegImage} />
                                <Text color="#77777750" fontSize="0.9rem">Загрузка изображения..</Text>
                            </div>
                        </div>
                    </div>
                )
            }
        
            <Image
            hidden={!previewIsLoad}
            className={`${sizeClassName} ${animationClassName}`}
            src={src}
            alt={alt}
            objectFit={ objectFit ? objectFit : "cover" }
            onLoad={() => setPreviewIsLoad(true)}
            filter={filter}
            />
        </>
    )
}

export default CustomImage
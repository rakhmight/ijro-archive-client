import { Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'

const Empty : FC<EmptyProps> = ({ icon, title, subtitle }) => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-center gap-2.5 border-dashed border border-[#66666675] cursor-pointer'>
            <Icon as={icon} color='#666' fontSize='18px'/>

            <div className='text-center'>
                <Text color='#666'>{title}</Text>
                {
                    subtitle && (
                        <Text color='#666' fontSize='0.8em'>{subtitle}</Text>
                    )
                }
            </div>
        </div>
    )
}

export default Empty
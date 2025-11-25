import { FC } from 'react'
import { Divider, Heading, Icon, Text } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'

const WarningBlock : FC = () => {
    return(
        <div className='flex gap-2.5 border-[1px] p-[10px] border-[#cfb103] border-dashed'>
            <div className='flex h-full items-center justify-center p-[10px]'>
                <Icon as={IoWarningOutline} color='#cfb103' fontSize='1.5rem' />
            </div>
    
            <div>
                <Divider orientation='vertical' borderColor='var(--gray-color)' />
            </div>
    
            <div>
                <Heading fontSize='1rem' color="#cfb103">Внимание!</Heading>
                <Text color='#000'>Вы уверены, что хотите удалить данные? Данный процесс не обратим.</Text>
            </div>
        </div>
    )
}

export default WarningBlock
import { Icon, IconButton, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaDownload } from 'react-icons/fa6'

interface CardProps {
    
}

const Card : FC<CardProps> = () => {
    return(
        <div className='flex flex-col w-[280px] border-[2px] border-[var(--dark-main-color)] rounded hover:shadow-xl transition-all'>

            <div className='relative p-[30px] border-b-[1px] border-[var(--dark-main-color)] flex items-center justify-center'>
                <Icon
                fontSize='5rem'
                color='var(--special-color)'
                as={
                    
                }
                />

                <div className='absolute right-[10px] bottom-[10px]'>
                    <IconButton
                    isRound={true}
                    variant='outline'
                    colorScheme='facebook'
                    aria-label='download'
                    fontSize='20px'
                    icon={<Icon as={FaDownload} />}
                    />
                </div>
            </div>

            <div className='px-[15px] py-[10px] bg-[var(--main-color)]'>
                <Text fontSize='0.95rem' color='#fff'>Новый Узбекистан 20202025.jpeg</Text>
                <Text fontSize='0.9rem' color='#aaa'>18.11.2025 13:43</Text>
            </div>
        </div>
    )
}

export default Card
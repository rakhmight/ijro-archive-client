import { Icon, MenuItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { MdDeleteOutline } from 'react-icons/md'

interface CtxMenuDeleteProps {
    openModal: (mode: string, id: string) => void
    file: File
}

const MenuDelete : FC<CtxMenuDeleteProps> = ({ openModal, file }) => {
    
    return(
        <MenuItem onClick={ () => openModal('delete', file.id) } icon={<Icon color='var(--red-color)' as={MdDeleteOutline} />}>
            <Text color='#888'>Удалить</Text>
        </MenuItem>
    )
}

export default MenuDelete
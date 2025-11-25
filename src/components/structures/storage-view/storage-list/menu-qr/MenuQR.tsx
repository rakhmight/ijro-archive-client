import { Icon, MenuItem, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { MdQrCodeScanner } from "react-icons/md";

interface CtxMenuDeleteProps {
    openModal: (mode: string, id: string) => void
    file: File
}

const MenuQR : FC<CtxMenuDeleteProps> = ({ openModal, file }) => {
    
    return(
        <MenuItem onClick={ () => openModal('qr', file.id) } icon={<Icon color='var(--main-color)' as={MdQrCodeScanner} />}>
            <Text color='#000'>QR-код</Text>
        </MenuItem>
    )
}

export default MenuQR
import { useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react'
import MenuQRModal from './MenuQRModal';

interface CtxMenuDeleteWrapProps {
    show: boolean,
    fileID: string
}

const MenuQRWrap : FC<CtxMenuDeleteWrapProps> = ({ show, fileID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => onOpen, [show])
    
    return(
        <MenuQRModal state={isOpen} handler={onClose} fileID={fileID} />
    )
}

export default MenuQRWrap
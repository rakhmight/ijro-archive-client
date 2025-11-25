import { useDisclosure } from '@chakra-ui/react';
import { FC, useEffect } from 'react'
import MenuDeleteModal from './MenuDeleteModal';

interface CtxMenuDeleteWrapProps {
    show: boolean,
    fileID: string,
    unAuth: () => void
}

const MenuDeleteWrap : FC<CtxMenuDeleteWrapProps> = ({ show, fileID, unAuth }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => onOpen, [show])
    
    return(
        <MenuDeleteModal state={isOpen} handler={onClose} fileID={fileID} unAuth={unAuth} />
    )
}

export default MenuDeleteWrap
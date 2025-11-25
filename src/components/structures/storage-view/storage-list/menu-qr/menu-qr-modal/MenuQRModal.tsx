import { useSelector } from 'react-redux'
import ModalTemplate from '../../../../../../components/ui/modal-template/ModalTempalte'
import { Button, Icon, Input, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { RootState } from '../../../../../../store'
import QRCode from "react-qr-code";
import { MdQrCodeScanner } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

interface CtxMenuDeleteModalProps {
    fileID: string
}

const CtxMenuQRModal : FC<NavigationModalProps&CtxMenuDeleteModalProps> = ({state, handler, fileID}) => {
    
    const { files, params } = useSelector((state:RootState)=>state)

    const [fileName, setFileName] = useState<string>('')

    const handleClose = () => {
        handler()
    }

    const copyToClipboard = async (textToCopy: string) => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                fallbackCopyToClipboard(textToCopy); 
            }
        } catch (err) {
            console.error('Failed to copy text to clipboard:', err);
        }
    }

    function fallbackCopyToClipboard(text: string) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    const modalData = {
        state,
        handler: handleClose,
        icon: MdQrCodeScanner,
        title: 'QR-код',
        iColor: '#888',
        titleColor: 'var(--main-color)'
    }

    useEffect(() => {
        const target = files.files.find(f => f.id == fileID)
        if(target) setFileName(target.name)
    }, [params.switcher])

    return(
        <ModalTemplate { ...modalData }>
            <div className='flex flex-col gap-[25px] max-h-[450px] overflow-y-auto pr-1.5 relative text-[0.95rem]'>
                <div className='w-full flex flex-col items-center gap-[20px]'>
                    <QRCode
                    value={`${params.serverBase}/public/${fileName}`}
                    fgColor='var(--dark-main-color)'
                    size={200}
                    />

                    <Text color='var(--main-color)'>{ fileName }</Text>
                </div>

                <div className='flex'>
                    <Input value={`${params.serverBase}/public/${fileName}`} isReadOnly={true} />
                    <Button
                    onClick={() => copyToClipboard(`${params.serverBase}/public/${fileName}`)}
                    colorScheme='main'>
                        <Icon as={FaCopy} />
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    )
}

export default CtxMenuQRModal
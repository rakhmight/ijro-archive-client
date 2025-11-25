import { useSelector } from 'react-redux'
import ModalTemplate from '../../../../../../components/ui/modal-template/ModalTempalte'
import WarningBlock from '../../../../../../components/ui/warning-block/WarningBlock'
import { useAppToast } from '../../../../../../hooks/useAppToast/useAppToast'
import { Button, Icon, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { RootState } from '../../../../../../store'

interface CtxMenuDeleteModalProps {
    fileID: string
}

const CtxMenuDeleteModal : FC<NavigationModalProps&CtxMenuDeleteModalProps> = ({state, handler, fileID}) => {
    
    const { files } = useSelector((state:RootState)=>state)
            
    const { showToast } = useAppToast()

    const [fileName, setFileName] = useState<string>('')
    const [inputsIsDisabled, setInputsIsDisabled] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClose = () => {
        handler()
    }

    const modalData = {
        state,
        handler: handleClose,
        icon: FaRegTrashAlt,
        title: 'Удаление файла',
        iColor: '#888',
        titleColor: 'var(--red-color)'
    }

    useEffect(() => {

        const target = files.files.find(f => f.id == fileID)
        if(target) setFileName(target.name)
    }, [])

    const deleteFileMethod = async () => {

    }

    return(
        <ModalTemplate { ...modalData }>
            <div className='flex flex-col gap-[25px] max-h-[450px] overflow-y-auto pr-1.5 relative text-[0.95rem]'>

                <div className='flex items-center gap-1.5'>
                    <Icon as={FaRegTrashAlt} color='var(--red-color)'  />
                    <Text color='#000'>Удаление файла: <span className='text-[var(--red-color)]'>{ fileName }</span></Text>
                </div>
                
                <WarningBlock />
                
                <div>
                    <Button
                    colorScheme='whiteAlpha'
                    variant='outline'
                    color='var(--red-color)'
                    size='md'
                    width="100%"
                    onClick={() => {}}
                    isDisabled={inputsIsDisabled}
                    isLoading={isLoading}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </ModalTemplate>
    )
}

export default CtxMenuDeleteModal
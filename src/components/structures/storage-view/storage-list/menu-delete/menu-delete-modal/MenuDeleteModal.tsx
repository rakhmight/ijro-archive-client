import { useSelector } from 'react-redux'
import ModalTemplate from '../../../../../../components/ui/modal-template/ModalTempalte'
import WarningBlock from '../../../../../../components/ui/warning-block/WarningBlock'
import { useAppToast } from '../../../../../../hooks/useAppToast/useAppToast'
import { Button, Icon, Text } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { RootState } from '../../../../../../store'
import { makeReq } from '../../../../../../utils/makeReq'
import { ToastColorScheme, ToastStatus } from '../../../../../../hooks/useAppToast/enums'
import { useActions } from '../../../../../../hooks/use-actions/UseActions'

interface CtxMenuDeleteModalProps {
    fileID: string,
    unAuth: () => void
}

const MenuDeleteModal : FC<NavigationModalProps&CtxMenuDeleteModalProps> = ({state, handler, fileID, unAuth}) => {
    
    const { files, params } = useSelector((state:RootState)=>state)
    const { deleteFile, switchActionSwitcher } = useActions()
            
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
    }, [params.switcher])

    const deleteFileMethod = async () => {

        const fileTarget = files.files.find(f => f.id == fileID)

        if(fileTarget){
            try {
                const fileData = await makeReq(`${params.serverAddress}/files/${fileTarget.id}`, 'DELETE')
                
                if(fileData){
                     if(fileData.statusCode == 200) {
                        deleteFile(fileTarget.id)
                        switchActionSwitcher()
                        showToast({
                            title: 'Файл удалён',
                            status: ToastStatus.Info,
                            colorScheme: ToastColorScheme.Info
                        })
                        handleClose()
                    } else {
                        if(fileData.statusCode == 401){
                            unAuth()
                        } else if(fileData.statusCode == 500){
                            showToast({
                                title: 'Ошибка на стороне сервера',
                                status: ToastStatus.Error,
                                colorScheme: ToastColorScheme.Error
                            })
                        }
                    }
                    
                }
            } catch (error) {
                return showToast({
                    title: 'Север не отвечает',
                    status: ToastStatus.Error,
                    colorScheme: ToastColorScheme.Error
                })
            }
        }
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
                    onClick={deleteFileMethod}
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

export default MenuDeleteModal
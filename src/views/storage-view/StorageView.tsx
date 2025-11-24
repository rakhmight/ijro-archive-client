import StorageLayout from '../../components/layouts/storage-layout/StorageLayout'
import { Button, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { FiLayout, FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
import { FaFilter, FaRegFileImage, FaFileVideo, FaFileWord, FaFileExcel, FaFilePdf, FaFile, FaDownload, FaUpload } from "react-icons/fa6";
import { FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown } from 'react-icons/fa';
import CustomImage from '../../components/ui/custom-image/CustomImage';
import { PiDoor, PiDoorOpenFill } from "react-icons/pi";
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { makeReq } from '../../utils/makeReq';
import { ToastColorScheme, ToastStatus } from '../../hooks/useAppToast/enums';
import { useAppToast } from '../../hooks/useAppToast/useAppToast';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/use-actions/UseActions';
import { getFullTime } from '../../utils/getDate';
import Empty from '../../components/ui/empty/Empty';
import { GiCobweb } from "react-icons/gi";

const StorageView : FC = () => {

    const { params, session, files } = useSelector((state:RootState)=>state)
    const { setSessionID, setSessionToken, setFiles, addFile } = useActions()
    const navigate = useNavigate()
    const { showToast } = useAppToast()

    const filePickerRef = useRef()
    
    const [checkIsDone, setCheckIsDone] = useState(false)

    const [listMode, setListMode] = useState('list')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedSort, setSelectedSort] = useState('a-z')
    
    const [changeDoor, setChangeDoor] = useState<boolean>(false)

    const menu = [
        { label: 'Карточки', value: 'card', icon: LuLayoutGrid },
        { label: 'Список', value: 'list', icon: LuLayoutList }
    ]

    const filters = [
        { label: 'Все файлы', value: 'all', icon: FaFile },
        { label: 'Фотографии', value: 'photo', icon: FaRegFileImage },
        { label: 'Видео', value: 'video', icon: FaFileVideo },
        { label: 'Word', value: 'word', icon: FaFileWord },
        { label: 'Excel', value: 'excel', icon: FaFileExcel },
        { label: 'PDF-файлы', value: 'pdf', icon: FaFilePdf },
        { label: 'Иные файлы', value: 'file', icon: FaFile }
    ]

    const sorting = [
        { label: 'По порядку', value: 'a-z', icon: FaSortAlphaDown },
        { label: 'В обратном', value: 'z-a', icon: FaSortAlphaUp },
    ]

    const exit = async () => {

    }

    const calcHeight = () => {
        const screenHeight = window.innerHeight;

        const headerHeight = document.getElementById('header');
        const panelHeight = document.getElementById('panel');
        const listElm = document.getElementById('list');

        if(headerHeight && panelHeight && listElm){
            const listHeight = screenHeight - (headerHeight.offsetHeight + panelHeight.offsetHeight + 60)

            listElm.style.height = `${listHeight}px`
        }
    }

    const downloadFile = async (name: string) => {        
        async function downloadFileWithHeaders(url, fileName, headers = {}) {
            try {
                const response = await fetch(url, {
                method: 'GET', // Or 'POST' if your server expects it
                headers: new Headers(headers) // Create a Headers object from your custom headers
                });

                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob(); // Get the response as a Blob

                // Create a temporary anchor element to trigger the download
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = fileName; // Set the desired filename for the download
                document.body.appendChild(a);
                a.click(); // Programmatically click the anchor to initiate download
                document.body.removeChild(a); // Clean up the temporary element
                URL.revokeObjectURL(a.href); // Release the object URL
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }

        const fileUrl = `${ params.serverBase }/public/${name}`; // Replace with your file URL
        const downloadFileName = name;
        const customHeaders = {
        'id': session.id,
        'token': session.token
        };

        downloadFileWithHeaders(fileUrl, downloadFileName, customHeaders);
    }

    const handleFileUpload = async (event) => {
        const formData = new FormData()
        formData.append('file', event.target.files[0])

        try{
            const fileData = await makeReq(`${params.serverAddress}/files`, 'POST', formData, {
                id: session.id,
                token: session.token
            }, true)

            console.log(fileData);

            if(fileData){
                if(fileData.statusCode == 200) {
                    addFile(fileData.data)
                    showToast({
                        title: 'Новый файл загружен',
                        status: ToastStatus.Success,
                        colorScheme: ToastColorScheme.Success
                    })
                } else {
                    if(fileData.statusCode == 401){
                        unAuth()
                    } else if(fileData.statusCode == 400){
                        showToast({
                            title: 'Неверный формат запроса',
                            status: ToastStatus.Error,
                            colorScheme: ToastColorScheme.Error
                        })
                    } else if(fileData.statusCode == 413){
                        showToast({
                            title: 'Слишком большой файл',
                            status: ToastStatus.Warnig,
                            colorScheme: ToastColorScheme.Warnig
                        })
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

    const unAuth = () => {
        localStorage.removeItem('sessionID')
        localStorage.removeItem('sessionToken')
        setSessionID('')
        setSessionToken('')

        navigate('/')

        return showToast({
            title: 'Вы не авторизованы',
            status: ToastStatus.Error,
            colorScheme: ToastColorScheme.Error
        })
    }

    useEffect(() => {

        if(!session.id && !session.token){
            navigate('/')
            return
        }
        
        const checkAccess = async () => {
            console.log(session.id);
            
            try {
                const checkData = await makeReq(`${params.serverAddress}/check`, 'GET', {}, {
                    id: session.id,
                    token: session.token
                })

                if(checkData){
                    if(checkData.statusCode == 401){
                        unAuth()
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
        
        checkAccess()
        .then(async () => {
            setCheckIsDone(true)
            calcHeight()

            try {
                
                const filseData =  await makeReq(`${params.serverAddress}/files`, 'GET', {}, {
                    id: session.id,
                    token: session.token
                })

                if(filseData){
                    if(filseData.statusCode == 200){
                        setFiles(filseData.data)
                    } else {
                        if(filseData.statusCode == 401){
                            unAuth()
                        }  else if(filseData.statusCode == 500){
                            return showToast({
                                title: 'Внутренние неполадки сервера',
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

            window.addEventListener('resize', function() {
                calcHeight()
            });
        })
    }, [])

    return(
        <StorageLayout>
            <main className='relative grid grid-cols-[400px_auto]'>
                <div></div>
                <div className='w-[400px] h-[100vh] p-[30px] bg-[var(--main-color)] fixed flex flex-col justify-between'>
                    <div className='flex flex-col gap-[30px]'>
                        <div className='flex flex-col gap-[15px]'>
                            
                            <div className='flex gap-[15px]'>
                                
                                <CustomImage
                                sizeClassName='w-[50px] mt-[4px]'
                                src='/images/logo.png'
                                alt=''
                                />
                                
                                <div>
                                    <Heading color='#fff' size='md'>Ijro archive UZ</Heading>
                                    <Text color="#999">Облачное хранилище</Text>
                                </div>
                            </div>

                            <div className='w-full'>
                                <Button className='w-full' colorScheme='whiteAlpha' onClick={() => filePickerRef.current.click()}>
                                    <div className='flex items-center gap-[5px]'>
                                        <Icon as={FaUpload} />
                                        <Text>Загрузить файл</Text>
                                    </div>
                                </Button>
                                <input
                                ref={filePickerRef}
                                type="file"
                                style={{ opacity: 0, display: 'none' }}
                                onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                        
                        <div>

                            {
                                filters.map((filter, i) => (
                                    <div
                                    key={i}
                                    className={` ${selectedFilter == filter.value ? 'bg-[#ffffff41]' : 'hover:bg-[#ffffff17]'} w-full flex items-center gap-[20px] px-[10px] p-[7px] rounded hover:cursor-pointer`}
                                    onClick={() => setSelectedFilter(filter.value)}
                                    >
                                        <Icon color='#fff' as={filter.icon} />
                                        <Text color='#fff' fontSize='1.1rem'>{ filter.label }</Text>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    <div className='flex items-center gap-[15px]'>
                        <IconButton
                        isRound={true}
                        variant='outline'
                        colorScheme={ changeDoor ? 'facebook': 'whiteAlpha'}
                        aria-label='Done'
                        size='sm'
                        fontSize='16px'
                        icon={<Icon as={changeDoor ? PiDoorOpenFill : PiDoor } />}
                        onMouseEnter={() => setChangeDoor(true)}
                        onMouseLeave={() => setChangeDoor(false)}
                        onClick={exit}
                        />

                        <Text color='#999'>Выйти</Text>
                    </div>
                </div>


                <div className='flex flex-col gap-[30px]'>
                    <div id='header' className='p-[30px] w-full bg-[var(--dark-main-color)] border-l-[1px] border-[grey] flex justify-between items-center'>
                        <Heading color='#fff' size='md'>Все файлы</Heading>

                        <Menu>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton size='sm' as={Button} rightIcon={<Icon as={isOpen ? IoIosArrowUp : IoIosArrowDown} />}>
                                        <Icon as={FiLayout} />
                                    </MenuButton>
                                    <MenuList>
                                        {
                                            menu.map((item, i) => (
                                                <MenuItem
                                                key={i}
                                                className='flex items-center justify-between'
                                                onClick={() => setListMode(item.value)}
                                                >
                                                    <div className='flex items-center gap-[5px]'>
                                                        <Icon as={item.icon} />
                                                        <Text>{ item.label }</Text>
                                                    </div>

                                                    {
                                                        listMode == item.value && (
                                                            <Icon as={MdOutlineDone} />
                                                        )
                                                    }
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </div>

                    <div id='panel' className='mx-[30px] p-[30px] bg-[var(--block-bg)] rounded flex justify-between items-center'>
                        <div className='w-[50%]'>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <Icon as={FiSearch} color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Поиск' />
                            </InputGroup>
                        </div>

                        <div className='flex gap-[20px]'>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton size='sm' as={Button} rightIcon={<Icon as={isOpen ? IoIosArrowUp : IoIosArrowDown} />}>
                                            <Icon as={FaFilter} />
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                filters.map((item, i) => (
                                                    <MenuItem
                                                    key={i}
                                                    className='flex items-center justify-between'
                                                    onClick={() => setSelectedFilter(item.value)}
                                                    >
                                                        <div className='flex items-center gap-[5px]'>
                                                            <Icon as={item.icon} />
                                                            <Text>{ item.label }</Text>
                                                        </div>

                                                        {
                                                            selectedFilter == item.value && (
                                                                <Icon as={MdOutlineDone} />
                                                            )
                                                        }
                                                    </MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </>
                                )}
                            </Menu>

                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton size='sm' as={Button} rightIcon={<Icon as={isOpen ? IoIosArrowUp : IoIosArrowDown} />}>
                                            <Icon as={FaSortAmountDown} />
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                sorting.map((item, i) => (
                                                    <MenuItem
                                                    key={i}
                                                    className='flex items-center justify-between'
                                                    onClick={() => setSelectedSort(item.value)}
                                                    >
                                                        <div className='flex items-center gap-[5px]'>
                                                            <Icon as={item.icon} />
                                                            <Text>{ item.label }</Text>
                                                        </div>

                                                        {
                                                            selectedSort == item.value && (
                                                                <Icon as={MdOutlineDone} />
                                                            )
                                                        }
                                                    </MenuItem>
                                                ))
                                            }
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>

                    <div id="list" className={`h-[600px] mx-[30px] p-[30px] bg-[var(--block-bg)] rounded ${ files.files.length ? 'flex justify-fit flex-wrap gap-[30px]' : '' } overflow-y-auto`}>

                        {
                            files.files.length == 0 && (
                                <Empty
                                icon={GiCobweb}
                                title="Файлов нет"
                                subtitle="Вы можете загрузить сюда новые файлы"
                                />
                            )
                        }

                        {
                            files.files.map(file => (
                                <div key={file.id} className='h-[232px] flex flex-col w-[280px] border-[2px] border-[var(--dark-main-color)] rounded hover:shadow-xl transition-all'>

                                    <div className='relative p-[30px] border-b-[1px] border-[var(--dark-main-color)] flex items-center justify-center'>
                                        <Icon fontSize='5rem' as={FaFile} color='var(--special-color)' />

                                        <div className='absolute right-[10px] bottom-[10px]'>
                                            <IconButton
                                            isRound={true}
                                            variant='outline'
                                            colorScheme='facebook'
                                            aria-label='download'
                                            fontSize='20px'
                                            icon={<Icon as={FaDownload} />}
                                            onClick={ () => downloadFile(file.name) }
                                            />
                                        </div>
                                    </div>

                                    <div className='h-full px-[15px] py-[10px] bg-[var(--main-color)]'>
                                        <Tooltip label={ file.name }>
                                            <Text className='two-line-clamp' fontSize='0.95rem' color='#fff'>{ file.name }</Text>
                                        </Tooltip>
                                        <Text fontSize='0.9rem' color='#aaa'>{ getFullTime(file.createdAt) }</Text>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </main>
        </StorageLayout>
    )
}

export default StorageView
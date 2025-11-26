import StorageLayout from '../../components/layouts/storage-layout/StorageLayout'
import { Button, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, Spinner, MenuGroup  } from '@chakra-ui/react'
import { FC, useEffect, useRef, useState } from 'react'
import { FiLayout, FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { MdClose, MdOutlineDone } from "react-icons/md";
import { FaFilter, FaRegFileImage, FaFileVideo, FaFileWord, FaFileExcel, FaFilePdf, FaFile, FaDownload, FaUpload } from "react-icons/fa6";
import { FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';
import CustomImage from '../../components/ui/custom-image/CustomImage';
import { PiDoor, PiDoorOpenFill } from "react-icons/pi";
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { makeReq } from '../../utils/makeReq';
import { ToastColorScheme, ToastStatus } from '../../hooks/useAppToast/enums';
import { useAppToast } from '../../hooks/useAppToast/useAppToast';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/use-actions/UseActions';
import { getFullTime } from '../../utils/getDate';
import Empty from '../../components/ui/empty/Empty';
import { GiCobweb } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import MenuDelete from '../../components/structures/storage-view/storage-list/menu-delete/MenuDelete';
import MenuQR from '../../components/structures/storage-view/storage-list/menu-qr/MenuQR';
import MenuDeleteWrap from '../../components/structures/storage-view/storage-list/menu-delete/menu-delete-modal/MenuDeleteWrap';
import MenuQRWrap from '../../components/structures/storage-view/storage-list/menu-qr/menu-qr-modal/MenuQRWrap';
import { FileStatus, FileType } from '../../store/files/enums';
import { formatBytes } from "bytes-formatter";
import { getFileType } from '../../utils/getFileType';
import FilePreview from "reactjs-file-preview";

const StorageView : FC = () => {

    const { params, files } = useSelector((state:RootState)=>state)
    const { setFiles, addFile, switchSwitcher, updateFile, deleteFile, changeStatus, switchActionSwitcher } = useActions()
    const navigate = useNavigate()
    const { showToast } = useAppToast()

    const filePickerRef = useRef()
    
    const [checkIsDone, setCheckIsDone] = useState(false)

    const [search, setSearch] = useState<string>('')
    const [listMode, setListMode] = useState(params.isMobile ? 'list' : 'card')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedSort, setSelectedSort] = useState(false)
    const [selectedSortByName, setSelectedSortByName] = useState(null)
    const [selectedSortByDate, setSelectedSortByDate] = useState(null)
    const [selectedSortBySize, setSelectedSortBySize] = useState(null)
    
    const [changeDoor, setChangeDoor] = useState<boolean>(false)
    
    const [fileID, setFileID] = useState<string>('')
    const [showQRModal, setShowQRModal] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const [filesList, setFilesList] = useState<Array<File>>([])

    useEffect(() => {        
        if(!search) setFilesList(files.files)
        else {
            const filesTarget = files.files.filter(f => {
                const fName = f.name.toLowerCase()
                if(fName.includes(search.toLowerCase())) return f
            })

            setFilesList(filesTarget)
        }
    }, [search, checkIsDone, params.actionSwitcher])

    useEffect(()=> {
        if(selectedSortByName){
            setSelectedSort(true)
            const filesListCopy = [...filesList]

            if(selectedSortByName == 'a-z'){
                filesListCopy.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            } else {
                filesListCopy.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
            }

            setFilesList(filesListCopy)
        }
    }, [selectedSortByName])

    useEffect(()=> {
        if(selectedSortByDate){
            setSelectedSort(true)
            const filesListCopy = [...filesList]

            if(selectedSortByDate == 'a-z'){
                filesListCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            } else {
                filesListCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            }

            setFilesList(filesListCopy)
        }
    }, [selectedSortByDate])

    useEffect(()=> {
        if(selectedSortBySize){
            setSelectedSort(true)
            const filesListCopy = [...filesList]

            if(selectedSortBySize == 'a-z'){
                filesListCopy.sort((a, b) => b.size - a.size)
            } else {
                filesListCopy.sort((a, b) => a.size - b.size)
            }

            setFilesList(filesListCopy)
        }
    }, [selectedSortBySize])

    
    useEffect(()=> {
        if(selectedFilter){
            
            if(selectedFilter == 'all') setFilesList(files.files)
            else {
                const filesListCopy = files.files
                const filteredFiles = filesListCopy.filter(f => getFileType(f.name) == selectedFilter)
                
                setFilesList(filteredFiles)
            }
        }
    }, [selectedFilter])

    const cancelSort = () => {
        setSelectedSort(false)
        setSelectedSortByName(null)
        setSelectedSortByDate(null)
        setSelectedSortBySize(null)

        setFilesList(files.files)
    }
    
    const cancelFilter = () => {
        setSelectedFilter('all')

        setFilesList(files.files)
    }

    const menu = [
        { label: 'Карточки', value: 'card', icon: LuLayoutGrid },
        { label: 'Список', value: 'list', icon: LuLayoutList }
    ]

    const filters = [
        { label: 'Все файлы', value: 'all', icon: FaFile },
        { label: 'Фотографии', value: FileType.Photo, icon: FaRegFileImage },
        { label: 'Видео', value: FileType.Video, icon: FaFileVideo },
        { label: 'Word', value: FileType.Word, icon: FaFileWord },
        { label: 'Excel', value: FileType.Excel, icon: FaFileExcel },
        { label: 'PDF-файлы', value: FileType.Pdf, icon: FaFilePdf },
        { label: 'Иные файлы', value: FileType.File, icon: FaFile }
    ]

    const sorting = [
        { label: 'По порядку', value: 'a-z', icon: FaSortAlphaDown },
        { label: 'В обратном', value: 'z-a', icon: FaSortAlphaUp },
    ]
    const sortingNum = [
        { label: 'По порядку', value: 'a-z', icon: FaSortNumericDown },
        { label: 'В обратном', value: 'z-a', icon: FaSortNumericUp },
    ]

    const exit = async () => {        
        try {
            
            const logoutData =  await makeReq(`${params.serverAddress}/auth/logout`, 'POST', {})

            if(logoutData){
                if(logoutData.statusCode == 200){
                    navigate('/')

                    showToast({
                        title: 'Вы вышли из системы',
                        status: ToastStatus.Info,
                        colorScheme: ToastColorScheme.Info
                    })
                } else {
                    if(logoutData.statusCode == 401){
                        unAuth()
                    }  else if(logoutData.statusCode == 500){
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

    const downloadFile = async (name: string, id: string) => {
        
        changeStatus({ status: FileStatus.Download, id })
        showToast({
            title: 'Файл выгружается',
            description: 'Подождите, это может занять время',
            status: ToastStatus.Info,
            colorScheme: ToastColorScheme.Info
        })

        async function downloadFileWithHeaders(url:string, fileName:string, headers = {}) {
            try {
                const response = await fetch(url, {
                method: 'GET', // Or 'POST' if your server expects it
                headers: new Headers(headers) // Create a Headers object from your custom headers
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob(); // Get the response as a Blob

                if(blob){
                    // Create a temporary anchor element to trigger the download
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = fileName; // Set the desired filename for the download
                    document.body.appendChild(a);
                    a.click(); // Programmatically click the anchor to initiate download
                    document.body.removeChild(a); // Clean up the temporary element
                    URL.revokeObjectURL(a.href); // Release the object URL
                    
                    changeStatus({ status: FileStatus.Done, id })
                    showToast({
                        title: 'Файл скачен!',
                        description: fileName,
                        status: ToastStatus.Success,
                        colorScheme: ToastColorScheme.Success
                    })
                }

            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }

        const fileUrl = `${ params.serverBase }/public/${name}`; // Replace with your file URL
        const downloadFileName = name;

        downloadFileWithHeaders(fileUrl, downloadFileName);
    }

    const handleFileUpload = async (event) => {
        const formData = new FormData()
        formData.append('file', event.target.files[0])        

        const newFileTempID = Date.now() + ''
        addFile({
            id: newFileTempID,
            name: event.target.files[0].name,
            size: event.target.files[0].size,
            createdAt: event.target.files[0].lastModified,
            status: FileStatus.Load,
            type: getFileType(event.target.files[0].name)
        } as File)
        switchActionSwitcher()
        
        showToast({
            title: 'Файл загружается',
            description: 'Не обновляйте и не закрывайте страницу',
            status: ToastStatus.Info,
            colorScheme: ToastColorScheme.Info
        })

        try{
            const fileData = await makeReq(`${params.serverAddress}/files`, 'POST', formData, true)

            if(fileData){
                if(fileData.statusCode == 200) {
                    updateFile({
                        tempID: newFileTempID,
                        id: fileData.data.id,
                        createdAt: fileData.data.createdAt
                    })
                    showToast({
                        title: 'Новый файл загружен',
                        status: ToastStatus.Success,
                        colorScheme: ToastColorScheme.Success
                    })
                    switchActionSwitcher()
                } else {
                    deleteFile(newFileTempID)
                    switchActionSwitcher()
                    if(fileData.statusCode == 401){
                        unAuth()
                    } else if(fileData.statusCode == 400){
                        showToast({
                            title: 'Неверный формат запроса',
                            status: ToastStatus.Error,
                            colorScheme: ToastColorScheme.Error
                        })
                    } else if(fileData.statusCode == 424){
                        showToast({
                            title: 'Вы уже загружали файл',
                            description: 'Нельзя загружать дубликаты файлов',
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
            deleteFile(newFileTempID)
            switchActionSwitcher()
            return showToast({
                title: 'Север не отвечает',
                status: ToastStatus.Error,
                colorScheme: ToastColorScheme.Error
            })
        }
    }

    const unAuth = () => {
        navigate('/')

        return showToast({
            title: 'Вы не авторизованы',
            status: ToastStatus.Error,
            colorScheme: ToastColorScheme.Error
        })
    }

    const openModal = (mode:string, id: string) => {        
        if(mode == 'qr') setShowQRModal(!showQRModal)
        else if(mode == 'delete') setShowDeleteModal(!showDeleteModal)

        if(id){ 
            setFileID(id)
            switchSwitcher()
        }
    }


    useEffect(() => {        
        const checkAccess = async () => {            
            try {
                const checkData = await makeReq(`${params.serverAddress}/check`, 'GET')

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
            calcHeight()

            try {
                
                const filseData =  await makeReq(`${params.serverAddress}/files`, 'GET')

                if(filseData){
                    if(filseData.statusCode == 200){
                        setCheckIsDone(true)
                        setFiles(filseData.data.map((f: File) => {
                            return {
                                ...f,
                                status: FileStatus.Done,
                                type: getFileType(f.name)
                            }
                        }))
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
            <main className={`relative ${ params.isMobile ? '' : 'grid grid-cols-[400px_auto]' }`}>

                {
                    !params.isMobile && (
                        <>
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
                                    colorScheme='whiteAlpha'
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
                        </>
                    )
                }


                <div className={ params.isMobile ? '' : 'flex flex-col gap-[30px]' }>
                    <div id='header' className={`${ params.isMobile ? 'p-[15px]' : 'p-[30px]' } w-full bg-[var(--dark-main-color)] border-l-[1px] border-[grey] flex justify-between items-center`}>
                        <Heading color='#fff' size='md'>Все файлы</Heading>

                        {
                            !params.isMobile ? (
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
                            ) : (
                                
                                <div>
                                    <Button size={ params.isMobile ? 'sm' : 'md' } className='w-full' colorScheme='whiteAlpha' onClick={() => filePickerRef.current.click()}>
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
                            )
                        }
                    </div>

                    <div id='panel' className={`${ params.isMobile ? 'p-[15px]' : 'mx-[30px] p-[30px]' } bg-[var(--block-bg)] rounded flex justify-between items-center`}>
                        <div className='w-[50%]'>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <Icon as={FiSearch} color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Поиск' value={search} onChange={(e) => setSearch(e.target.value)} />
                            </InputGroup>
                        </div>

                        <div className='flex gap-[20px]'>
                            {/* Filter */}
                            <div className='flex items-center gap-[5px]'>
                                
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
                                {
                                    selectedFilter && selectedFilter != 'all' && (                                
                                        <Tooltip label="Очистить фильтр">
                                            <Icon className='hover:cursor-pointer' color='#777' as={MdClose} onClick={cancelFilter} />
                                        </Tooltip>
                                    )
                                }
                            </div>

                            {/* Sorting */}
                            <div className='flex items-center gap-[5px]'>
                                <Menu>
                                    {({ isOpen }) => (
                                        <>
                                            <MenuButton size='sm' as={Button} rightIcon={<Icon as={isOpen ? IoIosArrowUp : IoIosArrowDown} />}>
                                                <Icon as={FaSortAmountDown} />
                                            </MenuButton>
                                            <MenuList>
                                                
                                                <MenuGroup title='По названию' color='#777'>
                                                    {
                                                        sorting.map((item, i) => (
                                                            <MenuItem
                                                            key={i}
                                                            className='flex items-center justify-between'
                                                            onClick={() => setSelectedSortByName(item.value)}
                                                            >
                                                                <div className='flex items-center gap-[5px]'>
                                                                    <Icon as={item.icon} />
                                                                    <Text>{ item.label }</Text>
                                                                </div>

                                                                {
                                                                    selectedSortByName == item.value && (
                                                                        <Icon as={MdOutlineDone} />
                                                                    )
                                                                }
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </MenuGroup>
                                                <MenuGroup title='По дате' color='#777'>
                                                    {
                                                        sortingNum.map((item, i) => (
                                                            <MenuItem
                                                            key={i}
                                                            className='flex items-center justify-between'
                                                            onClick={() => setSelectedSortByDate(item.value)}
                                                            >
                                                                <div className='flex items-center gap-[5px]'>
                                                                    <Icon as={item.icon} />
                                                                    <Text>{ item.label }</Text>
                                                                </div>

                                                                {
                                                                    selectedSortByDate == item.value && (
                                                                        <Icon as={MdOutlineDone} />
                                                                    )
                                                                }
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </MenuGroup>
                                                <MenuGroup title='По размеру' color='#777'>
                                                    {
                                                        sortingNum.map((item, i) => (
                                                            <MenuItem
                                                            key={i}
                                                            className='flex items-center justify-between'
                                                            onClick={() => setSelectedSortBySize(item.value)}
                                                            >
                                                                <div className='flex items-center gap-[5px]'>
                                                                    <Icon as={item.icon} />
                                                                    <Text>{ item.label }</Text>
                                                                </div>

                                                                {
                                                                    selectedSortBySize == item.value && (
                                                                        <Icon as={MdOutlineDone} />
                                                                    )
                                                                }
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </MenuGroup>
                                            </MenuList>
                                        </>
                                    )}
                                </Menu>
                                
                                {
                                    selectedSort && (                                
                                        <Tooltip label="Очистить сортировку">
                                            <Icon className='hover:cursor-pointer' color='#777' as={MdClose} onClick={cancelSort} />
                                        </Tooltip>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div id="list" className={`h-[600px] ${ params.isMobile ? '' : 'mx-[30px] p-[30px]' } overflow-x-hidden bg-[var(--block-bg)] rounded ${ filesList.length && listMode =='card' ? 'grid grid-cols-5 gap-[30px]' : '' } overflow-y-auto`}>

                        {
                            !checkIsDone && (
                                <div className='w-full h-full flex flex-col items-center justify-center gap-2.5 border-dashed border border-[#66666675] cursor-pointer'>
                                    <Spinner color='#777' />
                                    <Text color='#777' fontSize='0.9rem'>Идёт загрузка данных..
                                    </Text>
                                </div>
                            )
                        }

                        {
                            filesList.length == 0 && checkIsDone && (
                                <Empty
                                icon={GiCobweb}
                                title="Файлов нет"
                                subtitle="Вы можете загрузить сюда новые файлы"
                                />
                            )
                        }

                        {
                            listMode == 'card' ? (
                                <>
                                
                                    {
                                        filesList.map(file => (
                                            <div key={file.id} className='h-[270px] grid grid-rows-[180px_auto] border-[2px] border-[var(--dark-main-color)] rounded hover:shadow-xl transition-all'>

                                                <div className='relative p-[15px] border-b-[1px] border-[var(--dark-main-color)] flex items-center justify-center'>

                                                    {
                                                        file.status == FileStatus.Load ? (
                                                            <Spinner size='xl' color='var(--main-color)' />
                                                        ) : (
                                                            <>
                                                                {
                                                                    file.type == FileType.Photo || file.type == FileType.Video || file.type == FileType.Pdf ? (
                                                                            <FilePreview preview={`${ params.serverBase }/public/${file.name}`} />
                                                                    ) : (
                                                                        <Icon fontSize='5rem' as={file.type == FileType.Excel ? FaFileExcel : file.type == FileType.Word ? FaFileWord :  FaFile} color='var(--special-color)' />
                                                                    )
                                                                    
                                                                }
                                                            </>
                                                        )
                                                    }

                                                    {
                                                        file.status != FileStatus.Done && (
                                                            <div className='absolute left-[10px] bottom-[10px] flex items-center gap-[5px]'>
                                                                <Spinner size='sm' color='var(--main-color)' />
                                                                <Icon as={file.status == FileStatus.Load ? FaUpload : FaDownload} color='var(--main-color)' />
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        file.status != FileStatus.Load && (
                                                            <div className='absolute right-[10px] bottom-[10px]'>
                                                                <Menu>
                                                                    <MenuButton
                                                                        as={IconButton}
                                                                        aria-label='Options'
                                                                        icon={<Icon as={BsThreeDots} />}
                                                                        variant='outline'
                                                                        rounded='full'
                                                                        colorScheme='main'
                                                                    />
                                                                    <MenuList>
                                                                        <MenuItem
                                                                        icon={<Icon color='var(--main-color)' as={FaDownload}/>}
                                                                        onClick={() => downloadFile(file.name, file.id) }
                                                                        >
                                                                        Скачать
                                                                        </MenuItem>

                                                                        <MenuQR openModal={openModal} file={file} />                                                    
                                                                        <MenuDelete openModal={openModal} file={file} />
                                                                    </MenuList>
                                                                </Menu>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className='px-[15px] py-[10px] bg-[var(--main-color)]'>
                                                    <Tooltip label={ file.name }>
                                                        <Text className='two-line-clamp' fontSize='0.95rem' color='#fff'>{ file.name }</Text>
                                                    </Tooltip>
                                                    <Text fontSize='0.9rem' color='#aaa'>{ getFullTime(file.createdAt) } ({formatBytes(file.size)})</Text>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                {
                                    filesList.length && (
                                        <table className={`${ params.isMobile ? 'text-[0.75rem]' : '' } table`}>
                                            <thead>
                                                <tr>
                                                    {
                                                        !params.isMobile && (
                                                            <>
                                                                <th className={ params.isMobile ? 'w-[20px]' : 'w-[50px]' }>#</th>
                                                                <th className={ params.isMobile ? 'w-[20px]' : 'w-[50px]' }>/</th>
                                                            </>
                                                        )
                                                    }
                                                    <th>Название файла</th>
                                                    <th className={ params.isMobile ? 'w-[70px]' : 'w-[200px]' }>Дата загрузки</th>
                                                    <th className={ params.isMobile ? 'w-[70px]' : 'w-[150px]' }>Размер файла</th>
                                                    <th className={ params.isMobile ? 'w-[50px]' : 'w-[120px] text-center' }>Действия</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    filesList.map((file, i) => (
                                                        <tr key={file.id}>
                                                            {
                                                                !params.isMobile && (
                                                                    <>
                                                                        <td className='w-[50px]'>{ i+1 }</td>
                                                                        <td className='w-[50px]'>
                                                                            
                                                                            <Icon fontSize='1.1rem' as={file.type == FileType.Excel ? FaFileExcel : file.type == FileType.Video ? FaFileVideo : file.type == FileType.Pdf ? FaFilePdf : file.type == FileType.Photo ? FaRegFileImage : file.type == FileType.Word ? FaFileWord :  FaFile} color='var(--special-color)' />
                                                                        </td>
                                                                    </>
                                                                )
                                                            }
                                                            <td className='flex items-center gap-[5px]'>
                                                                { file.name }
                                                                {
                                                                    
                                                                    file.status == FileStatus.Load && (
                                                                        <Spinner size='sm' color='var(--main-color)' />
                                                                    )
                                                                }
                                                            </td>
                                                            <td className={ params.isMobile ? 'w-[70px] bg-[#fff]' : 'w-[200px]' }>{ getFullTime(file.createdAt) }</td>
                                                            <td className={ params.isMobile ? 'w-[70px] bg-[#fff]' : 'w-[150px]' }>{ formatBytes(file.size) }</td>
                                                            <td className={ params.isMobile ? 'w-[50px] bg-[#fff]' : 'w-[120px] text-center' }>
                                                                <div className='flex justify-center'>
                                                                    <Menu>
                                                                        <MenuButton
                                                                            as={IconButton}
                                                                            aria-label='Options'
                                                                            icon={<Icon as={BsThreeDots} />}
                                                                            variant='outline'
                                                                            rounded='full'
                                                                            colorScheme='main'
                                                                            size='sm'
                                                                        />
                                                                        <MenuList>
                                                                            <MenuItem
                                                                            icon={<Icon color='var(--main-color)' as={FaDownload}/>}
                                                                            onClick={() => downloadFile(file.name, file.id) }
                                                                            >
                                                                            Скачать
                                                                            </MenuItem>

                                                                            <MenuQR openModal={openModal} file={file} />                                                    
                                                                            <MenuDelete openModal={openModal} file={file} />
                                                                        </MenuList>
                                                                    </Menu>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }
                                </>
                            )
                        }

                    </div>

                    {
                        params.isMobile && (
                            <div className='w-full h-full flex mt-[15px]'>
                                <div className='flex items-center gap-[15px] ml-[15px]'>   
                                    <IconButton
                                    isRound={true}
                                    variant='outline'
                                    colorScheme='whiteAlpha'
                                    aria-label='Done'
                                    size='sm'
                                    fontSize='16px'
                                    icon={<Icon as={changeDoor ? PiDoorOpenFill : PiDoor } />}
                                    onMouseEnter={() => setChangeDoor(true)}
                                    onMouseLeave={() => setChangeDoor(false)}
                                    onClick={exit}
                                    />

                                    <Text color='#fff'>Выйти</Text>
                                </div>
                            </div>
                        )
                    }
                </div>

                
                    
                <MenuDeleteWrap show={showDeleteModal} fileID={fileID} unAuth={unAuth} />
                <MenuQRWrap show={showQRModal} fileID={fileID} />
            </main>
        </StorageLayout>
    )
}

export default StorageView
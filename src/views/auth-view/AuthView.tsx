import { FC, useEffect, useState } from 'react'
import { Heading, Text, Divider, InputGroup, Input, InputRightElement, Button, Icon } from "@chakra-ui/react"
import AuthLayout from '../../components/layouts/auth-layout/AuthLayout'
import CustomImage from '../../components/ui/custom-image/CustomImage'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { makeReq } from '../../utils/makeReq'
import { useAppToast } from '../../hooks/useAppToast/useAppToast'
import { ToastColorScheme, ToastStatus } from '../../hooks/useAppToast/enums'
import { useActions } from '../../hooks/use-actions/UseActions'

const AuthView : FC = () => {

    const { params, session } = useSelector((state:RootState)=>state)
    const { setSessionID, setSessionToken } = useActions()
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    
    const [show, setShow] = useState(false)
    const [blockBtn, setBlockBtn] = useState(true)
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false)
    const handleClick = () => setShow(!show)

    const [password, setPassword] = useState('')

    const auth = async () => {
        if(password){
            setBlockBtn(true)

            try {
                const sessionData = await makeReq(`${params.serverAddress}/auth/signin`, 'POST', {
                    data: {
                        password
                    }
                })

                if(sessionData){
                    if(sessionData.statusCode == 200){

                        if(sessionData.data){
                            setSessionID(sessionData.data.id)
                            setSessionToken(sessionData.data.token)

                            localStorage.setItem('sessionID', sessionData.data.id)
                            localStorage.setItem('sessionToken', sessionData.data.token)

                            showToast({
                                title: 'Успешный вход',
                                status: ToastStatus.Success,
                                colorScheme: ToastColorScheme.Success
                            })

                            setTimeout(() => navigate('/storage'), 1000)
                        }
                    } else {
                        setBlockBtn(false)
                        if(sessionData.statusCode == 404){                            
                            setPasswordIsInvalid(true)
                            return showToast({
                                title: 'Неверный пароль',
                                status: ToastStatus.Error,
                                colorScheme: ToastColorScheme.Error
                            })
                        } else if(sessionData.statusCode == 500){
                            return showToast({
                                title: 'Внутренние неполадки сервера',
                                status: ToastStatus.Error,
                                colorScheme: ToastColorScheme.Error
                            })
                        }
                    }
                }
            } catch (error) {
                setBlockBtn(false)
                return showToast({
                    title: 'Север не отвечает',
                    status: ToastStatus.Error,
                    colorScheme: ToastColorScheme.Error
                })
            }
        }
    }

    useEffect(() => {
        setPasswordIsInvalid(false)        
        if(password) setBlockBtn(false)
        else setBlockBtn(true)
    }, [password])

    useEffect(() => {
        console.log(session.id);
        
        if(session.id && session.token){
            navigate('/storage')
        }
    }, [])
  
    return(
        <AuthLayout>
            <div className='grid grid-cols-[1fr_1fr] w-full'>

                <div className='w-full h-[100vh] bg-[var(--main-color)] flex justify-center items-center'>
                    <div className='flex flex-col gap-[30px]'>
                        <CustomImage
                        sizeClassName=''
                        src='/images/cloud-hosting.png'
                        alt=''
                        />

                        <div>
                            <Heading fontSize='3xl' fontWeight='bold' color="#fff" textAlign='center'>IJRO ARCHIVE UZ</Heading>
                            <Text color="#999" textAlign='center'>Облачное хранилище</Text>
                        </div>
                    </div>
                </div>


                <div className='w-full h-full flex justify-center items-center'>
                    <div className='bg-[var(--block-bg)] p-[30px] rounded w-[25vw] flex flex-col gap-[30px]'>
                        <div className='w-full flex flex-col gap-[10px]'>
                            <Heading fontSize='xl' fontWeight='bold' color="var(--special-color)" textAlign='center'>Вход</Heading>
                            <Divider />
                        </div>

                        <div>
                            <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Введите пароль'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                isInvalid={passwordIsInvalid}
                            />
                            <InputRightElement width='4.5rem'>
                                <Icon as={show ? FaEyeSlash : FaEye } onClick={handleClick} />
                            </InputRightElement>
                            </InputGroup>
                        </div>
                        
                        <div className='w-full'>
                            <Button
                            width='100%'
                            colorScheme='main'
                            onClick={auth}
                            isDisabled={blockBtn}
                            >
                                <Text>Войти в хранилище</Text>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </AuthLayout>
    )
}

export default AuthView
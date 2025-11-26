import { FC, PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const GeneralLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {

    const { params } = useSelector((state:RootState)=>state)
    
    return (
        <div className={`w-full h-[100vh] relative ${ params.isMobile ? 'bg-[var(--dark-main-color)]' : 'bg-[var(--bg-color)]' }`}>
            { children }
        </div>
    )
}

export default GeneralLayout
import { ToastPosition, useToast } from "@chakra-ui/react"
import { ToastColorScheme, ToastStatus } from "./enums"

interface AppToastProps {
    title: string,
    status: ToastStatus | undefined,
    colorScheme: ToastColorScheme,
    description?: string
}

interface AppToastI {
    (props: AppToastProps): void
}

export const useAppToast = () => {
    
    const toast = useToast()
    
    const toastGeneral:{position:ToastPosition, variant: string,size: string, duration: number, containerStyle: Object} = {
        position: 'bottom-right',
        size: 'sm',
        variant: 'left-accent',
        duration: 5000,
        containerStyle: {
            fontSize: '0.9rem',
            width: '320px',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            zIndex: 999,
            color: '#fff',
            fontWeight: '100'
        }
    }

    const showToast: AppToastI = ({title, status, colorScheme, description}) => {
                
        toast({
            ...toastGeneral,
            title,
            description: description ? description : '',
            status,
            colorScheme
        })
    }

    return { showToast }
}
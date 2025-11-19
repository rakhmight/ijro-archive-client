import { FC, PropsWithChildren } from 'react'
import styles from './AuthLayout.module.css'

const AuthLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {

    return (
        <div className={styles.layout}>
            { children }
        </div>
    )
}

export default AuthLayout
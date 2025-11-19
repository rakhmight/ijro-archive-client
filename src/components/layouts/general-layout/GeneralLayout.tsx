import { FC, PropsWithChildren } from 'react'
import styles from './GeneralLayout.module.css'

const GeneralLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {

    return (
        <div className={styles.layout}>
            { children }
        </div>
    )
}

export default GeneralLayout
import { FC, PropsWithChildren } from 'react'
import styles from './StorageLayout.module.css'

const StorageLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {

    return (
        <div className={styles.layout}>
            { children }
        </div>
    )
}

export default StorageLayout
import { actions as paramsActions } from "../../store/params/params.slice"
import { actions as filesActions } from "../../store/files/files.slice"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

const rootActions = {
    ...paramsActions,
    ...filesActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => 
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}
import { actions as paramsActions } from "../../store/params/params.slice"
import { actions as filesActions } from "../../store/files/files.slice"
import { actions as sessionActions } from "../../store/session/session.slice"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

const rootActions = {
    ...paramsActions,
    ...sessionActions,
    ...filesActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => 
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}
import { useSnackbar, VariantType, WithSnackbarProps, enqueueSnackbar } from 'notistack'
import React from 'react'

export const SnackbarUtilsConfigurator = () => {
    useSnackbarRef = useSnackbar()
    return null
}

export default {
    success(msg) {
        this.toast(msg, 'success')
    },
    warning(msg) {
        this.toast(msg, 'warning')
    },
    info(msg) {
        this.toast(msg, 'info')
    },
    error(msg) {
        this.toast(msg, 'error')
    },
    toast(msg, variant) {
        enqueueSnackbar(msg, {
            variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }
}
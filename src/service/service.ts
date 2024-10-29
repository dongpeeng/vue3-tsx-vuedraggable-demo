import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import { useUserStore } from '@/store/user/user'
// import { useUISettingStore } from '@/store/ui-setting/ui-setting'
import qs from 'qs'
import _ from 'lodash'
import cookies from 'js-cookie'
// import router from '@/router'
import utils from '@/utils'
import { errorNotification } from '@/utils/common'

// const userStore = useUserStore()
// const uiSettingStore = useUISettingStore()

/**
 * @description Log and display errors
 * @param {Error} error Error object
 */
const handleError = (res: AxiosResponse<any, any>) => {
    errorNotification({
        content: res.data.msg || '错误请求!'
    })
    // window.$message.error(res.data.msg)
}

const baseRequestConfig: AxiosRequestConfig = {
    // timeout: uiSettingStore.getApiTimer ? uiSettingStore.getApiTimer : 120000,
    timeout: 120000,
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    }
}

const service = axios.create(baseRequestConfig)

const err = (err: AxiosError): Promise<AxiosError> => {
    // if (err.response?.status === 401 || err.response?.status === 504) {
    //     userStore.setSessionId('')
    //     userStore.setSecurityConfigType('')
    //     userStore.setUserInfo({})
    //     userStore.setBaseResDir('')
    //     userStore.setBaseUdfDir('')
    //     router.push({ path: '/login' })
    // }
    if (err.response?.status === 400) {
        const data: any = err.response.data
        errorNotification({
            content: data?.message || '错误请求!'
        })
    } else if (err.response?.status === 404) {
        errorNotification({ content: '未找到该资源!' })
    } else if (err.response?.status === 408) {
        errorNotification({ content: '请求超时!' })
    } else if (err.response?.status >= 500) {
        errorNotification({ content: '服务器错误!' })
    } else {
        errorNotification({ content: err?.message })
    }

    return Promise.reject(err)
}

service.interceptors.request.use((config: AxiosRequestConfig<any>) => {
   
    config.headers = config.headers || {}
    // config.headers.sessionId = userStore.getSessionId
    config.headers.originalUrl = window.location.href
 
        config.transformRequest = (params) => {
            if (_.isPlainObject(params)) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            } else {
                return params
            }
        }
    if (
        config.method === 'post' &&
        (config.url.indexOf('event/apiserver') > -1 ||
            config.url.indexOf('ops/apiserver') > -1)
    ) {
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    const language = cookies.get('language')
    if (language) config.headers.language = language

    return config
}, err)

// The response to intercept
service.interceptors.response.use((res: AxiosResponse) => {
    // No code will be processed
    if (res.data.code === undefined) {
        return res.data
    }
    switch (res.data.code) {
        case 0:
            return res.data.data
        case 40001:
            window.location.href = res.data.redirectUrl
        default:
            handleError(res)
            throw new Error()
    }
}, err)

export { service as axios }

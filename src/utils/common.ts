import { createDiscreteApi } from 'naive-ui'

const { notification } = createDiscreteApi(['notification'])

interface Notification {
    title?: string
    content: string
    duration?: number
}

const pagination = {
    defaultPage: 1,
    defaultPageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 50, 100],
    prefix({ itemCount }) {
        return `共${itemCount}条`
    }
}

const errorNotification = (data: Notification) =>
    notification.error({
        title: data?.title ? data?.title : '请求失败',
        content: data.content,
        duration: data.duration || 10000,
        keepAliveOnHover: true
    })

const hasDisplayNone = (element) => {
    // 检查元素直接样式是否有 display: none

    if (window.getComputedStyle(element).display === 'none') {
        if (element.className.includes('n-base-selection-input-tag'))
            return false

        return true
    }

    for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i]
        if (hasDisplayNone(child)) {
            return true
        }
    }
    return false
}
export { pagination, errorNotification, hasDisplayNone }

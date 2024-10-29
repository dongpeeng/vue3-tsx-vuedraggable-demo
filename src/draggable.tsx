import { defineComponent, reactive, ref } from 'vue'

import { useDraggable } from 'vue-draggable-plus'
import { VueDraggable, DraggableEvent } from 'vue-draggable-plus'
const BaseForm = defineComponent({
    name: 'BaseForm',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        isClone: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const formRef = ref()
        const els = ref()
        const lists = reactive({ value: props.list || [] })
        function onUpdate() {
            console.log('update')
        }
        function onAdd() {
            console.log('add')
        }
        function onRemove() {
            console.log('remove')
        }
        function onStart(event: DraggableEvent) {
            console.log('开始拖拽')
        }

        function onEnd(event: DraggableEvent) {
            console.log('拖拽结束')
        }
        function clone(element: Record<'name' | 'id', string>) {
            const len = props.list?.length
            console.log(len, 'clone')

            return {
                name: `${element.name}-clone-${len}`,
                id: `${element.id}-clone-${len}`
            }
        }

        return {
            formRef,
            onUpdate,
            onAdd,
            lists,
            onRemove,
            clone,
            onStart,
            onEnd
        }
    },
    render() {
        const {
            list,
            lists,
            onUpdate,
            onAdd,
            onRemove,
            clone,
            isClone,
            onStart,
            onEnd
        } = this

        return (
            <VueDraggable
                class='form-list'
                v-model={lists.value}
                animation='150'
                clone={isClone ? clone : () => {}}
                sort={false}
                group={
                    isClone
                        ? { name: 'people', pull: 'clone', put: false }
                        : 'people'
                }
            >
                {list.map((item, index) => {
                    return (
                        <div key={item?.id} class='form-item-drag'>
                            <div class='form-item'>{item.name}</div>
                            <div class='form-item'>{item.id}</div>
                        </div>
                    )
                })}
            </VueDraggable>
        )
    }
})

export default BaseForm

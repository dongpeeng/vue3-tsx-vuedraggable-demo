import {
    computed,
    defineComponent,
    onMounted,
    ref,
    reactive,
    toRefs,
    watch,
    getCurrentInstance
} from 'vue'

import { VueDraggable, DraggableEvent } from 'vue-draggable-plus'
import Draggable from './draggable'
const App = defineComponent({
    name: 'App',
    setup() {
        const formRef = ref()
        const list1 = ref([
            {
                name: 'Joao',
                id: 1
            },
            {
                name: 'Jean',
                id: 2
            },
            {
                name: 'Johanna',
                id: 3
            },
            {
                name: 'Juan',
                id: 4
            }
        ])
        const list2 = ref(
            list1.value.map((item) => ({
                name: `${item.name}-2`,
                id: `${item.id}-2`
            }))
        )

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
            const len = list2.value.length
            return {
                name: `${element.name}-clone-${len}`,
                id: `${element.id}-clone-${len}`
            }
        }

        onMounted(() => {})

        return {
            formRef,
            list1,
            list2,
            onUpdate,
            onAdd,
            onRemove,
            clone,
            onStart,
            onEnd
        }
    },
    render() {
        const { list1, list2 } = this
        return (
            <div class='form-container'>
                <Draggable list={list1} isClone={true} ref='lists1' />
                <Draggable list={list2} ref='lists2' />
            </div>
        )
    }
})

export default App

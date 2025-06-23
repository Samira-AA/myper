import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import './style.css'

// PrimeVue Theme
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// PrimeVue Components
import Button from 'primevue/button'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Card from 'primevue/card'
import Toolbar from 'primevue/toolbar'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: false
        }
    },
    ripple: true
})

app.use(router)
app.use(createPinia())
app.use(ToastService)
app.use(ConfirmationService)

// Register PrimeVue components
app.component('PvButton', Button)
app.component('PvColumn', Column)
app.component('PvConfirmDialog', ConfirmDialog)
app.component('PvDataTable', DataTable)
app.component('PvDialog', Dialog)
app.component('PvInputText', InputText)
app.component('PvToast', Toast)
app.component('PvProgressSpinner', ProgressSpinner)
app.component('PvMessage', Message)
app.component('PvCard', Card)
app.component('PvToolbar', Toolbar)

app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import { router } from './router'
import { store } from './store'

import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'

createApp(App).use(store).use(router).mount('#app')


const app = createApp(App)
app.use(router)
app.use(store)

app.component(BaseCard);
app.component(BaseButton);
app.component(BaseBadge);

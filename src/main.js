import { createApp } from 'vue';
import { defineAsyncComponent } from 'vue';

import router             from './router.js';
import store              from './store/index.js';
import App                from './App.vue';
import BaseCard           from './components/ui/BaseCard.vue';
import BaseContactCard    from './components/ui/BaseContactCard.vue';
import BaseDescCard       from './components/ui/BaseDescCard.vue';
import BaseButton         from './components/ui/BaseButton.vue';
import BaseContactButton  from './components/ui/BaseContactButton.vue';
import BaseLogButton      from './components/ui/BaseLogButton.vue';
import BaseRequestButton  from './components/ui/BaseRequestButton.vue';
import BaseBadge          from './components/ui/BaseBadge.vue';

const BaseSpinner = defineAsyncComponent(() =>  import('./components/ui/BaseSpinner.vue'));
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-contactcard', BaseContactCard);
app.component('base-desccard', BaseDescCard);
app.component('base-button', BaseButton);
app.component('base-contactbutton', BaseContactButton);
app.component('base-logbutton', BaseLogButton);
app.component('base-requestbutton', BaseRequestButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');

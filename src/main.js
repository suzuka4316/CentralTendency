import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/index.js";

import BaseCard from "@/components/BaseCard.vue";
import BaseButton from "@/components/BaseButton.vue";

const app = createApp(App);

app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);

app.mount("#app");

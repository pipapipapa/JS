import { MainPage } from "./pages/main/index.js";
import { Data } from "./sequence-data/data.js";

const root = document.getElementById('root');
export const sequenceData = new Data();

if (root){
    const mainPage = new MainPage(root);
    mainPage.render();
}
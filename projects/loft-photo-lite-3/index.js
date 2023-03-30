import pages from './pages.js';
import mainPage from './mainPage.js';
import loginPage from './loginPage.js';
import './styles.css';

pages.openPage('login');
console.log('ok');
loginPage.handleEvents();
mainPage.handleEvents();

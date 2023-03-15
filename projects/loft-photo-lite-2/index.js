import pages from './pages.js';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

function getRandomElement(array){
  const index = Math.round(Math.random() * (array.length - 1));
  return array[index];
}

document.addEventListener('click', () => {
  
  pages.openPage(getRandomElement(pageNames));
});

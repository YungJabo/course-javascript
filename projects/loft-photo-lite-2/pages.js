const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    for(var item in pagesMap){
      var close = document.querySelector(pagesMap[item]);
      close.classList.add("hidden");
    }
    var open = document.querySelector(`.page-${name}`);
    console.log('.'+name);
    open.classList.remove('hidden');
  },
};

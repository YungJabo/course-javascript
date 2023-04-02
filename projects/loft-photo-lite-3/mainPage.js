import model from './model.js';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');
    const footerPhoto = document.querySelector('.component-footer-photo');

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url(${url})`;
    footerPhoto.style.backgroundImage = `url('${model.me.photo_50}')`;
    
  },

  handleEvents() {
    let start;

    document.querySelector('.component-photo').addEventListener('touchstart', (e)=>{
      e.preventDefault();
      start = e.changedTouches[0].pageY;
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e)=>{
      const raz = e.changedTouches[0].pageY - start;

      if(raz<0){
        await this.getNextPhoto();
      }
    });
  },
};

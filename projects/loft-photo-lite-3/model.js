const APP_ID = 51594010;

export default {
  getRandomElement(array) {
    if(!array.length){
      console.error('Пустой массив');
    }
    const index = Math.round(Math.random() * (array.length - 1));

    return array[index];

  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return {friend, id: photo.id, url: size.url};
  },

  findSize(photo){
    const size = photo.sizes.find((size) => size.width >= 360);
    return size;
  },

  callApi(method, params){
    params.v = params.v || '5.120';

    return new Promise((resolve, reject) =>{
      VK.api(method, params, (response)=> {
        if(response.error){
          reject(new Error (response.error.error_msg));
        }
        else{
          resolve(response.response);
        }
      });
    });
  },

  login() {
    return new Promise((resolve,reject) => {
      VK.init({
        apiId: APP_ID,
      });

      VK.Auth.login((response) => {
        if(response.session){
          resolve(response);
        }
        else{
          console.error(response);
          reject(response); 
        }
      })
    })
  },

  getPhotos(owner){
    const params = {
      owner_id: owner,
    };

    return this.callApi('photos.getAll', params);
  },
  init() {
    this.photoCache = {},
    this.friends =  this.getFriends();
  },

  photoCache:{},
  getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos =  this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
  getFriends(){
    const params = {
      fields: ['photo_50', 'photo_100'],
    };

    return this.callApi('friends.get', params);
  },
};

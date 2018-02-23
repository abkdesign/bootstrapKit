import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
// APP STATE 
// MAX nest 3 times
let store ={};
console.log('localStorage', loadState());
  if (loadState() !== undefined){
    store = loadState();
    console.log('Loading localstorage');
  }else{
    console.log('Loading inital state');
     store = {
      counter: 0,
      person: {
        name: "alex",
        job: "webmaster",
        bio: "being the best",
        city: "copenhagen",
        links: {
          academind: 'https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w',
          wesbos: 'https://www.youtube.com/user/wesbos/videos'
        }
      },
      beer: {
        name: `IPA`,
        brewery: `Skovlyst`,
        keywords: ['pale', 'cloudy', 'spiced', 'oak']
      }
    };
  } 
function localStorage(state){
  document.addEventListener('state',throttle(()=>{
    saveState(state);
    console.log('localStorage', loadState());
  }),1000);
}
export { store, localStorage};
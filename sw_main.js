if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    //register service worker
    navigator.serviceWorker
      .register('./sw_cached_site.js')
      .then(reg => console.log('registered'))
      .catch(err => console.log(err));
  });
}
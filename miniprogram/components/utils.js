export function debounce (callback,delay,isImmediate){
  var timer;
  return function () {
    var ctx = this;
    var args = arguments;
    timer && clearTimeout(timer);
    if (isImmediate) {
      if (!timer) {
        callback.apply(ctx, args)
        timer = null
      }
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }else {
      timer = setTimeout(function () {
        callback.apply(ctx,args)
      },delay)
    }
  }
}


!function(){
  let container = document.querySelector('#code');
  let styleTag = document.querySelector('#styleTag');
  function writeCode(prefix,code,fn){
    //前缀，代码，回调
    let n=0;
    var duration = 100;
    let id = setTimeout(function again(){
      n+=1;
      container.innerHTML = code.substring(0,n);
      styleTag.innerHTML = code.substring(0,n);
      container.scrollTop = container.scrollHeight;
      if(n<code.length){
        id =setTimeout(again,duration);
      }
      else{
        fn && fn.call();
      }
      //不用clear，因为调用一次之后自动clear。
    },duration)

    $('.actions').on("click","button",function(e){
      let $button = $(e.currentTarget);    //获取正在监听的，这里是button
      let speed = $button.attr('data-speed');
      console.log(speed);
      $button.addClass('active').siblings('.active').removeClass('active');
      switch(speed){
        case 'slow':
        duration = 80;
        break;
        case 'quick':
        duration = 8;
        break;
        case 'done':
        //中断，不会重新开始window.clearTimeout(id);
          container.innerHTML = code;
          styleTag.innerHTML = code;
          container.scrollTop = container.scrollHeight;
          n=code.length;   //避免再次调用setTimeout
        break;
      }
    })
    // let skipAnime = document.getElementsByClassName('demo-1')[0];
    // skipAnime.addEventListener('click',function(){
    //   if(n>= code.length){ return }
    //   if(id){clearInterval(id)}
    //   container.innerHTML = code;
    //   styleTag.innerHTML = code;
    //   container.scrollTop = container.scrollHeight;
    // },false);
    //setInterval只会读取一次规定循环执行时间，所以要调速需要使用setTimeout
    // let id = setInterval(()=>{
    //   n+=1;
    //   container.innerHTML = code.substring(0,n);
    //   styleTag.innerHTML = code.substring(0,n);
    //   container.scrollTop = container.scrollHeight;
    //   if(n >= code.length){
    //     window.clearInterval(id);
    //     fn && fn.call();
    //   }
    // },8)
    

  }
  let code = `
  /*欢迎来到sofia's home*/
  /*主页放点什么呢？*/
  /*不如向你介绍一下我github的头像？*/
  /*喏！它就长成下面这个样子啦*/
  /*先来一个脸吧~*/
  .wrapper {
    background: #FFF090;
  }
  /*它有一只像小狗一样的小鼻子*/
  .nose {
    width: 22px;
    height: 18px;
    border-radius: 11px;
    border-width: 10px 12px;
    border-style: solid;
    border-color: #483000 transparent transparent;
    position: absolute;
    left: 50%;
    /* 左侧对齐中线，需要再向左偏移宽度的一半*/
    top: 48px;
    transform: translate(-50%);
    /* 也可以用 margin-left: 11px; 给出一个已经算好的宽度*/
  }
  /*圆圆的眼睛*/
  .eye {
    width: 49px;
    height: 49px;
    background: #483000;
    position: absolute;
    border-radius: 50%;
  }
  
  .eye::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: white;
    position: absolute;
    border-radius: 50%;
    left: 7px;
    top: 1.5px;
    border: 2px solid #483000;
  }
  
  .eye-left {
    right: 50%;
    margin-right: 90px;
  }
  
  .eye-right {
    left: 50%;
    margin-left: 90px;
    visibility: visible;
  }
  
  /*还有高原红！哈哈！*/
  .face {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #F0C090;
    position: absolute;
    top: 105px;
  }
  
  .face-left {
    right: 50%;
    margin-right: 116px;
  }
  
  .face-right {
    left: 50%;
    margin-left: 116px;
  }
  /*嘴巴不张开的时候有点像小兔子*/
  .upperLip {
    width: 64px;
    height: 15px;
    border: 3px solid #483000;
    position: absolute;
    top: 72px;
  }
  
  .upperLip-left {
    right: 50%;
    border-bottom-left-radius: 42% 100%;
    /*单独指定某个角时，用空格分隔两个值，而非/  */
    border-top: none;
    border-right: none;
    transform: rotate(-15deg);
  }
  
  .upperLip-right {
    left: 50%;
    border-bottom-right-radius: 42% 100%;
    /*单独指定某个角时，用空格分隔两个值，而非/  */
    border-top: none;
    border-left: none;
    transform: rotate(15deg);
  }
  /*这就是它!咦？好像很眼熟嘛？！*/
  /*用鼠标滑过它的胖脸试试？*/
  /*或者拿出你的手指按住它的胖脸~~*/
  `
  writeCode('',code,skipAnimate);

}.call()

function skipAnimate(){
var audio = document.getElementsByTagName("audio")[0];

// 兼容移动端touchstart和touchend
if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)){
  $('.wrapper').on(
    'touchstart',
    function(e) {
      e.preventDefault();
      audio.currentTime = 0.5;
      audio.play();
      $('.blink').css('visibility', 'visible');
      $('.eye-left').css('visibility', 'hidden');
    }
  );
  $('.wrapper').on('touchend',function(e) {
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
          e.preventDefault();
      }
    }
    audio.pause();
    audio.currentTime = 0.5;
    $('.blink').css('visibility', 'hidden');
    $('.eye-left').css('visibility', 'visible');
  });
} else {
  $('.wrapper').mouseover(function() {
    audio.currentTime = 0.5;
    audio.play();
    $('.blink').css('visibility', 'visible');
    $('.eye-left').css('visibility', 'hidden');
  });
  
  $('.wrapper').mouseout(function() {
    audio.pause();
    audio.currentTime = 0.5;
    $('.blink').css('visibility', 'hidden');
    $('.eye-left').css('visibility', 'visible');
  });
}
}



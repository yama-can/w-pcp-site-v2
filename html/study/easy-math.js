function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
let element,
  q = 0,
  questions = [],
  point = 0,
  start
function keyEvent(e){
  console.log(e.key);
  if(e.key == 'Enter'){
    try{
      document.querySelector('.enter').click();
    }catch(e){
    }
  }else{
    document.addEventListener('keydown', keyEvent);
  }
}
function draw() {
  document.addEventListener('keydown', keyEvent);
  if (q == 10) {
    element.innerHTML =
      "<h1>結果</h1><h2 style='color:green'>正解:" +
      point +
      "<h2><h2 style='color:red'>不正解:" +
      (10 - point) +
      '</h2><h2>時間:' +
      (new Date(new Date() - start).getSeconds() - 11) +
      '秒</h2><button class="startbutton">もう一回！！</button>'
    document
      .querySelector('.startbutton')
      .addEventListener('click', function () {
        element.innerHTML = '<h1>スタート！！</h1>'
        point = 0;
        start = new Date()
        window.setTimeout(function () {
          draw()
        }, 1000)
      })
    return
  }
  let pls = '+'
  if (getRandomInt(2) == 0) pls = '-'
  let b1 = getRandomInt(1000),
    b2 = getRandomInt(100)
  if (pls == '-' && b1 < b2) {
    let bb1 = b1
    b1 = b2
    b2 = bb1
  }
  let answer = b1 + b2
  if (pls == '-') answer = b1 - b2
  questions.push({ pls: pls, v1: b1, v2: b2, ans: answer })
  element.innerHTML =
    '<h1>' +
    (q + 1) +
    '問目 ' +
    '</h1><h2>' +
    questions[q].v1 +
    ' ' +
    questions[q].pls +
    ' ' +
    questions[q].v2 +
    "</h2><input type='number' class='ans'><button class='enter'>決定</button>"
  document.querySelector('.ans').select();
  document.querySelector('.enter').addEventListener('click', function () {
    if (document.querySelector('.ans').value == questions[q].ans) {
      point++
      element.innerHTML = "<h1 style='color: green'>正解！！</h1>"
    } else {
      element.innerHTML = "<h1 style='color:red'>不正解…</h1>"
    }
    q++
    window.setTimeout(draw, 1000)
  })
}
document.addEventListener('DOMContentLoaded', function () {
  element = document.getElementsByClassName('game')[0]
  element.innerHTML = "<button class='startbutton'>スタート</button>"
  document.querySelector('.startbutton').addEventListener('click', function () {
    element.innerHTML = '<h1>スタート！！</h1>'
    window.setTimeout(function () {
      draw()
      start = new Date()
    }, 1000)
  })
})

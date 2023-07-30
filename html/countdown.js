let countdown
let brinknum = 0;
const brinktiming = [true,false,true,true,false,true,false,false,false,true,false];
let undertime = new Date(new Date(2023, 8, 30, 0).getTime() - new Date().getTime(),)
document.addEventListener('DOMContentLoaded', function () {
  countdown = document.querySelector('div.countdown')
})
const colors = [
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
  'lightgreen',
]
function tocolor(num, l, m) {
  let v = '' + num
  for (let i = 0; i < l - v.length; i++) {
    v = '0' + v
  }
  return v
}
window.setInterval(function () {
  let m = tocolor(undertime.getMonth(), 2),
    d = tocolor(undertime.getDate(), 2),
    h = tocolor(undertime.getHours(), 2),
    min = tocolor(undertime.getMinutes(), 2),
    s = tocolor(undertime.getSeconds(), 2),
    ss = tocolor(Math.floor(undertime.getMilliseconds() / 10), 2)
  countdown.innerHTML =
    '<h1><font class="l2">あと </font><font class="num">' +
    m +
    '</font><font class="l">ヶ月 </font><font class="num">' +
    d +
    '</font><font class="l">日 </font><font class="num">' +
    h +
    '</font><font class="l num">:</font><font class="num">' +
    min +
    '</font><font class="l num">:</font><font class="num">' +
    s +
    '</font><font class="l num">.</font><font class="num">' +
    ss +
    '</font></h1><br><p><font class="num">' +
    m +
    '</font><font class="l n14"> months </font><font class="num">' +
    d +
    '</font><font class="l n14"> days </font><font class="num">' +
    h +
    '</font><font class="l n14"> hours </font><font class="num">' +
    min +
    '</font><font class="l n14"> minutes </font><font class="num">' +
    s +
    '</font><font class="l n14">.</font><font class="num">' +
    ss +
    '</font><font class="l n14"> seconds </font>' +
    '<font class="l2 n14"> left </font></p>'
  undertime = new Date(new Date(2023, 8, 30, 0).getTime() - new Date().getTime(),)
}, 10)

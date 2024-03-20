window.addEventListener("load", function () {
  let AutoPlay;
  let count = 1;
  let box = document.querySelector(".col .leftbox");
  let ul = box.firstElementChild;
  let ol = box.querySelector("ol");
  let p = box.querySelector("p");
  // 获取移动距离
  let wide = ul.children[0].offsetWidth;
  p.innerHTML = ul.children[0].querySelector("img").getAttribute("alt");
  // 启动轮播图
  start();

  // 动态生成小圆圈，并添加事件和排他思想
  for (let i = 0; i < ul.children.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("value", i);
    ol.appendChild(li);

    li.addEventListener("mouseover", function () {
      for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "on";
      let title = ul.children[i].querySelector("img").getAttribute("alt");
      p.innerHTML = title;
      let index = this.getAttribute("value");
      ul.style.left = -index * wide + "px";
    });

    li.addEventListener("mouseout", function () {
      let index = parseInt(this.getAttribute("value"));
      count = index + 1;
    });
  }
  ol.children[0].className = "on";

  //深克隆第一个li节点
  let first = ul.children[0].cloneNode(true);
  ul.appendChild(first);

  // 鼠标移入移出 启动/暂停 轮播图
  box.addEventListener("mouseover", function () {
    clearInterval(AutoPlay);
    AutoPlay = null;
  });

  box.addEventListener("mouseout", function () {
    start();
  });

  // 简单缓动动画
  function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var step = (target - obj.offsetLeft) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.offsetLeft == target) {
        clearInterval(obj.timer);
        callback && callback();
      } else {
        obj.style.left = obj.offsetLeft + step + "px";
      }
    }, 10);
  }

  //   开始播放
  function start() {
    AutoPlay = setInterval(function () {
      if (count == ul.children.length) {
        count = 1;
        ul.style.left = 0 + "px";
      }
      animate(ul, -count * wide);
      for (let i = 0; i < ol.children.length; i++) {
        if (count < ul.children.length) {
          ol.children[i].className = "";
        }
      }
      if (count < ol.children.length) {
        ol.children[count].className = "on";
        let title = ul.children[count].querySelector("img").getAttribute("alt");
        p.innerHTML = title;
      } else if (count >= ol.children.length) {
        ol.children[0].className = "on";
        let title = ul.children[0].querySelector("img").getAttribute("alt");
        p.innerHTML = title;
      }
      count++;
    }, 2000);
  }
});

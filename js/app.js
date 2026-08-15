(function () {
  "use strict";

  var DATA = window.GAME_DATA;
  var SAVE_KEY = "linyuan_old_pc_v2";

  var state = { flags: {} };
  var winCounter = 0;
  var zCounter = 100;
  var windows = {};

  /* ---------------- 存档 ---------------- */
  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) state.flags = JSON.parse(raw);
    } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state.flags)); } catch (e) {}
  }
  function flag(name) { return !!state.flags[name]; }
  function setFlag(name) {
    state.flags[name] = true;
    save();
  }

  /* ---------------- 工具 ---------------- */
  function $(sel) { return document.querySelector(sel); }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }

  function rot13(s) {
    return s.replace(/[A-Za-z]/g, function (c) {
      var base = c <= "Z" ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    });
  }
  function caesarDecode(s, shift) {
    var n = (parseInt(shift, 10) || 0) % 26;
    return s.replace(/[A-Za-z]/g, function (c) {
      var base = c <= "Z" ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base - n + 26) % 26 + base);
    });
  }
  function b64decode(s) {
    try {
      var bin = atob(s.trim());
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder("utf-8").decode(bytes);
    } catch (e) { return ""; }
  }
  function morseDecode(s) {
    var table = {
      "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
      ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
      ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F",
      "--.": "G", "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L",
      "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R",
      "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X",
      "-.--": "Y", "--..": "Z"
    };
    return s.trim().split(/\s+/).map(function (m) {
      return table[m] !== undefined ? table[m] : "?";
    }).join("");
  }

  /* ---------------- 窗口管理 ---------------- */
  function createWindow(opts) {
    winCounter++;
    var id = "win" + winCounter;
    var w = el(
      '<div class="window" id="' + id + '" style="left:' + (80 + (winCounter * 24) % 200) + "px;top:" + (50 + (winCounter * 20) % 180) + 'px;width:' + (opts.width || 460) + "px;" + (opts.height ? "height:" + opts.height + "px" : "") + '">' +
        '<div class="win-titlebar"><span class="win-title">' + opts.title + "</span>" +
          '<span class="win-btn" data-act="min">_</span>' +
          '<span class="win-btn" data-act="max">&#9649;</span>' +
          '<span class="win-btn close" data-act="close">&#10005;</span></div>' +
        '<div class="win-body"></div>' +
      "</div>"
    );
    $("#windows").appendChild(w);
    windows[id] = { title: opts.title, minimized: false };
    addTaskButton(id);

    w.querySelector(".win-titlebar").addEventListener("mousedown", function (e) {
      if (e.target.getAttribute("data-act")) return;
      bringToFront(id);
      startDrag(w, e);
    });
    w.querySelector('[data-act="close"]').addEventListener("click", function () { closeWindow(id); });
    w.querySelector('[data-act="min"]').addEventListener("click", function () { minimizeWindow(id); });
    w.querySelector('[data-act="max"]').addEventListener("click", function () { maximizeWindow(id); });
    w.addEventListener("mousedown", function () { bringToFront(id); });

    bringToFront(id);
    return w;
  }
  function bringToFront(id) {
    zCounter++;
    var w = document.getElementById(id);
    if (!w) return;
    w.style.zIndex = zCounter;
    w.classList.remove("inactive");
    w.classList.add("active");
    Object.keys(windows).forEach(function (k) {
      if (k !== id) {
        var w2 = document.getElementById(k);
        if (w2 && !w2.classList.contains("hidden")) { w2.classList.remove("active"); w2.classList.add("inactive"); }
      }
    });
    refreshTaskButtons(id);
  }
  function startDrag(w, e) {
    var rect = w.getBoundingClientRect();
    var dx = e.clientX - rect.left, dy = e.clientY - rect.top;
    function move(ev) {
      var x = Math.min(Math.max(ev.clientX - dx, -rect.width + 60), window.innerWidth - 60);
      var y = Math.min(Math.max(ev.clientY - dy, 0), window.innerHeight - 60);
      w.style.left = x + "px";
      w.style.top = y + "px";
    }
    function up() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }
  function closeWindow(id) {
    var w = document.getElementById(id);
    if (w) w.remove();
    delete windows[id];
    refreshTaskButtons(null);
  }
  function minimizeWindow(id) {
    var w = document.getElementById(id);
    if (!w) return;
    w.classList.add("hidden");
    windows[id].minimized = true;
    refreshTaskButtons(id);
  }
  function maximizeWindow(id) {
    var w = document.getElementById(id);
    if (!w) return;
    if (w.dataset.max === "1") {
      var o = JSON.parse(w.dataset.orig);
      w.style.left = o.left;
      w.style.top = o.top;
      w.style.width = o.width;
      w.style.height = o.height;
      delete w.dataset.max;
      return;
    }
    w.dataset.orig = JSON.stringify({
      left: w.style.left, top: w.style.top, width: w.style.width, height: w.style.height
    });
    var tw = $("#taskbar") ? $("#taskbar").offsetHeight : 30;
    w.style.left = "0px";
    w.style.top = "0px";
    w.style.width = window.innerWidth + "px";
    w.style.height = (window.innerHeight - tw) + "px";
    w.dataset.max = "1";
  }
  function restoreWindow(id) {
    var w = document.getElementById(id);
    if (!w) return;
    w.classList.remove("hidden");
    windows[id].minimized = false;
    bringToFront(id);
  }
  function addTaskButton(id) {
    var b = el('<button class="task-btn">' + windows[id].title + "</button>");
    b.id = "task-" + id;
    b.addEventListener("click", function () {
      if (windows[id].minimized) restoreWindow(id);
      else if (document.getElementById(id).classList.contains("hidden")) restoreWindow(id);
      else minimizeWindow(id);
    });
    $("#task-windows").appendChild(b);
  }
  function refreshTaskButtons(activeId) {
    Object.keys(windows).forEach(function (k) {
      var b = document.getElementById("task-" + k);
      if (b) b.classList.toggle("active", k === activeId && !windows[k].minimized);
    });
  }

  /* ---------------- 提示系统 ---------------- */
  function hintLevel() {
    var n = 0;
    if (flag("chatRead")) n++;
    if (flag("diaryUnlocked")) n++;
    if (flag("blogSource")) n++;
    if (flag("partA")) n++;
    if (flag("caesarSolved")) n++;
    if (flag("partB")) n++;
    return n;
  }
  function showHelp() {
    var n = hintLevel();
    var h = DATA.hintLevels[n] || DATA.hintLevels[DATA.hintLevels.length - 1];
    $("#help-text").innerHTML = "<b>当前进度：" + n + "/6</b><br>" + h.text;
    $("#help-dialog").classList.remove("hidden");
  }

  function toast(msg) {
    var d = el(
      '<div class="dialog"><div class="dialog-box" style="width:360px;">' +
        '<div class="dialog-title">系统提示</div>' +
        '<div class="dialog-body">' + msg + "</div>" +
        '<button class="xp-btn" id="toast-ok">知道了</button>' +
      "</div></div>"
    );
    document.body.appendChild(d);
    d.querySelector("#toast-ok").addEventListener("click", function () { d.remove(); });
  }

  /* ---------------- 密码校验 ---------------- */
  function askPassword(title, correct, onOk, extraHint) {
    var d = el(
      '<div class="dialog">' +
        '<div class="dialog-box">' +
          '<div class="dialog-title">' + title + " - 需要密码</div>" +
          '<div class="dialog-body">' + (extraHint || "请输入密码：") +
            '<div style="margin-top:10px;"><input class="xp-input" id="pw-input" type="text" maxlength="12" placeholder="密码" style="width:150px;"></div>' +
            '<div id="pw-err" style="color:#c00;font-size:12px;min-height:16px;margin-top:4px;"></div>' +
          "</div>" +
          '<button class="xp-btn" id="pw-ok">确定</button>' +
          '<button class="xp-btn" id="pw-cancel">取消</button>' +
        "</div>" +
      "</div>"
    );
    document.body.appendChild(d);
    var input = d.querySelector("#pw-input");
    function check() {
      var v = input.value.trim().toUpperCase().replace(/\s+/g, "");
      if (v === correct.toUpperCase().replace(/\s+/g, "")) {
        d.remove();
        onOk();
      } else {
        input.classList.add("wrong");
        d.querySelector("#pw-err").textContent = "密码错误。再想想。";
        setTimeout(function () { input.classList.remove("wrong"); }, 400);
      }
    }
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check(); });
    d.querySelector("#pw-ok").addEventListener("click", check);
    d.querySelector("#pw-cancel").addEventListener("click", function () { d.remove(); });
    input.focus();
  }

  /* ---------------- 应用：记事本 ---------------- */
  function openNotepad(title, content, extra) {
    var w = createWindow({ title: title, width: 500, height: 380 });
    var body = w.querySelector(".win-body");
    body.innerHTML = '<pre style="white-space:pre-wrap;font-family:Consolas,monospace;font-size:13px;line-height:1.7;margin:0;">' + content + "</pre>";
    if (extra) body.appendChild(extra);
  }

  /* ---------------- 应用：资源管理器布局 ---------------- */
  function expLayout(navHtml, mainHtml) {
    return el('<div class="xp-exp"><div class="xp-side">' + navHtml + '</div><div class="xp-main">' + mainHtml + '</div></div>');
  }
  function showSysInfo() {
    var d = el(
      '<div class="dialog"><div class="dialog-box">' +
        '<div class="dialog-title">系统属性</div>' +
        '<div class="dialog-body" style="font-size:12px;">' +
          "计算机：林远的电脑<br>处理器：Intel Pentium 4, 2.40GHz<br>内存：512MB<br>" +
          "操作系统：Microsoft Windows XP Professional (2003)<br><br><span style='color:#999;'>主机名：LINYUAN-PC</span>" +
        "</div>" +
        '<button class="xp-btn" id="si-ok">确定</button>' +
      "</div></div>"
    );
    document.body.appendChild(d);
    d.querySelector("#si-ok").addEventListener("click", function () { d.remove(); });
  }

  /* ---------------- 应用：我的电脑 ---------------- */
  function openMyComputer() {
    var w = createWindow({ title: "我的电脑", width: 500, height: 380 });
    var body = w.querySelector(".win-body");
    var layout = expLayout(
      '<h4>系统任务</h4><div class="nav-item" data-nav="sysinfo">查看系统信息</div>' +
      '<h4>其他位置</h4><div class="nav-item" data-nav="mydocs">我的文档</div><div class="nav-item" data-nav="recycle">回收站</div>' +
      '<h4>详细信息</h4><div class="nav-item">本地磁盘 (C:)</div>',
      '<div class="file-list">' +
        '<div class="file-item" data-f="c"><span>&#128187;</span> 本地磁盘 (C:)</div>' +
        '<div class="file-item" data-f="readme"><span>&#128193;</span> readme.txt</div>' +
      "</div>"
    );
    body.appendChild(layout);
    body.querySelector('[data-nav="sysinfo"]').addEventListener("click", showSysInfo);
    body.querySelector('[data-nav="mydocs"]').addEventListener("click", openMyDocs);
    body.querySelector('[data-nav="recycle"]').addEventListener("click", openRecycle);
    body.querySelector('[data-f="c"]').addEventListener("click", openCDrive);
    body.querySelector('[data-f="readme"]').addEventListener("click", function () {
      openNotepad("readme.txt", DATA.files.readme.content);
    });
  }

  function openCDrive() {
    var w = createWindow({ title: "本地磁盘 (C:)", width: 500, height: 380 });
    var body = w.querySelector(".win-body");
    var layout = expLayout(
      '<h4>系统任务</h4><div class="nav-item" data-nav="space">查看磁盘空间</div>' +
      '<h4>其他位置</h4><div class="nav-item" data-nav="pc">我的电脑</div><div class="nav-item" data-nav="recycle">回收站</div>' +
      '<h4>详细信息</h4><div class="nav-item">已用 12.4GB / 共 40GB</div>',
      '<div class="file-list">' +
        '<div class="file-item" data-f="morse"><span>&#128225;</span> 摩尔斯速查表.txt</div>' +
        '<div class="file-item" data-f="secret"><span>&#128274;</span> 机密</div>' +
        '<div class="file-item" data-f="program"><span>&#128193;</span> Program Files</div>' +
      "</div>"
    );
    body.appendChild(layout);
    body.querySelector('[data-nav="space"]').addEventListener("click", function () {
      toast("本地磁盘 (C:)<br>容量：40 GB<br>已用：12.4 GB<br>可用：27.6 GB");
    });
    body.querySelector('[data-nav="pc"]').addEventListener("click", openMyComputer);
    body.querySelector('[data-nav="recycle"]').addEventListener("click", openRecycle);
    body.querySelector('[data-f="morse"]').addEventListener("click", function () {
      openNotepad("摩尔斯速查表.txt", DATA.files.morse.content);
    });
    body.querySelector('[data-f="secret"]').addEventListener("click", function () {
      if (flag("secretUnlocked")) openSecretFolder();
      else askPassword("机密", "THEFORUM", function () {
        setFlag("secretUnlocked");
        openSecretFolder();
      }, "这是一个加密文件夹。<br>密码线索在博客的「原文件」注释里。<br>输入时不区分大小写、可带空格。");
    });
    body.querySelector('[data-f="program"]').addEventListener("click", function () {
      alert("访问被拒绝。\n\n错误信息：你没有权限查看此文件夹。");
    });
  }

  function openSecretFolder() {
    var w = createWindow({ title: "机密", width: 500, height: 360 });
    var body = w.querySelector(".win-body");
    var layout = expLayout(
      '<h4>文件夹任务</h4><div class="nav-item" data-nav="note">查看便签</div>' +
      '<h4>其他位置</h4><div class="nav-item" data-nav="pc">我的电脑</div><div class="nav-item" data-nav="c">本地磁盘 (C:)</div>',
      '<div class="file-list">' +
        '<div class="file-item" data-f="a"><span>&#128274;</span> 密文A.txt</div>' +
        '<div class="file-item" data-f="note"><span>&#128221;</span> 便签.txt</div>' +
      "</div>"
    );
    body.appendChild(layout);
    body.querySelector('[data-nav="note"]').addEventListener("click", function () {
      openNotepad("便签.txt", "提醒自己：\n\n两段密文都解开后，用 ROT13 分别解码，再把文字拼起来读。\n（另一段在老周的论坛帖子里。）");
    });
    body.querySelector('[data-nav="pc"]').addEventListener("click", openMyComputer);
    body.querySelector('[data-nav="c"]').addEventListener("click", openCDrive);
    body.querySelector('[data-f="a"]').addEventListener("click", function () {
      openNotepad("密文A.txt", DATA.files.secret_a.content);
    });
    body.querySelector('[data-f="note"]').addEventListener("click", function () {
      openNotepad("便签.txt", "提醒自己：\n\n两段密文都解开后，用 ROT13 分别解码，再把文字拼起来读。\n（另一段在老周的论坛帖子里。）");
    });
  }

  /* ---------------- 应用：我的文档 ---------------- */
  function openMyDocs() {
    var w = createWindow({ title: "我的文档", width: 400 });
    var body = w.querySelector(".win-body");
    body.innerHTML =
      '<div class="file-list">' +
        '<div class="file-item" data-f="blog"><span>&#127760;</span> 博客.html</div>' +
        '<div class="file-item" data-f="diary"><span>&#128220;</span> 加密日记.txt</div>' +
        '<div class="file-item" data-f="album"><span>&#128444;</span> 相册</div>' +
      "</div>";

    body.querySelector('[data-f="blog"]').addEventListener("click", function () { openBlog(); });
    body.querySelector('[data-f="diary"]').addEventListener("click", function () { openDiary(); });
    body.querySelector('[data-f="album"]').addEventListener("click", function () {
      openAlbum();
    });
  }

  function openBlog() {
    var w = createWindow({ title: "博客.html - 记事本", width: 560, height: 440 });
    var body = w.querySelector(".win-body");
    var srcVisible = false;
    var holder = el("<div></div>");
    holder.innerHTML = DATA.files.blog.content;
    var btn = el('<button class="xp-btn" style="margin-bottom:4px;">查看原文件</button>');
    var tip = el('<div style="color:#777;font-size:11px;margin-bottom:8px;">「原文件」= 用记事本打开这个网页能看到的内容。注释藏在 &lt;!-- --&gt; 之间。</div>');
    var srcBox = el('<pre style="display:none;white-space:pre-wrap;font-family:Consolas,monospace;font-size:11px;line-height:1.6;background:#f4f4f4;padding:8px;border:1px solid #ccc;max-height:280px;overflow:auto;"></pre>');
    srcBox.textContent = DATA.files.blog.source;
    btn.addEventListener("click", function () {
      srcVisible = !srcVisible;
      srcBox.style.display = srcVisible ? "block" : "none";
      btn.textContent = srcVisible ? "收起原文件" : "查看原文件";
      if (srcVisible) setFlag("blogSource");
    });
    body.appendChild(btn);
    body.appendChild(tip);
    body.appendChild(srcBox);
    body.appendChild(holder);
  }

  function openDiary() {
    if (!flag("diaryUnlocked")) {
      askPassword("加密日记.txt", "8012", function () {
        setFlag("diaryUnlocked");
        openNotepad("加密日记.txt", DATA.files.diary.content,
          el('<div style="margin-top:8px;color:#777;font-size:11px;">日记末尾的乱码，可能是某种编码。</div>'));
      }, DATA.files.diary.hint);
    } else {
      openNotepad("加密日记.txt", DATA.files.diary.content,
        el('<div style="margin-top:8px;color:#777;font-size:11px;">日记末尾的乱码，可能是某种编码。</div>'));
    }
  }

  /* ---------------- 应用：聊天记录 ---------------- */
  function openChat() {
    var w = createWindow({ title: "聊天记录 - 林远×老周 (2008-07)", width: 480, height: 460 });
    var body = w.querySelector(".win-body");
    var html = '<div class="chat-wrap">';
    DATA.chat.forEach(function (m) {
      var cls = m.from === "lin" ? "mine" : "other";
      var text = m.morse ? '<span class="morse-line">' + m.text + "</span>" : m.text;
      html += '<div class="chat-line ' + cls + '"><div class="chat-name">' + m.name + "</div>" +
        '<div class="chat-bubble">' + text + "</div></div>";
    });
    html += "</div>";
    body.innerHTML = html;
    setFlag("chatRead");
  }

  /* ---------------- 应用：回收站 ---------------- */
  function openRecycle() {
    var w = createWindow({ title: "回收站", width: 500, height: 340 });
    var body = w.querySelector(".win-body");
    var layout = expLayout(
      '<h4>回收站任务</h4><div class="nav-item" data-nav="empty">清空回收站</div>' +
      '<h4>其他位置</h4><div class="nav-item" data-nav="pc">我的电脑</div><div class="nav-item" data-nav="c">本地磁盘 (C:)</div>',
      '<div class="file-list">' +
        '<div class="file-item" data-f="note"><span>&#128211;</span> 被删除的笔记.txt <span style="color:#999;font-size:11px;">（已恢复）</span></div>' +
      "</div>"
    );
    body.appendChild(layout);
    body.querySelector('[data-nav="empty"]').addEventListener("click", function () {
      alert("回收站是空的？\n\n……不对，有个文件在。你最好把它恢复。");
    });
    body.querySelector('[data-nav="pc"]').addEventListener("click", openMyComputer);
    body.querySelector('[data-nav="c"]').addEventListener("click", openCDrive);
    body.querySelector('[data-f="note"]').addEventListener("click", function () {
      openNotepad("被删除的笔记.txt", DATA.files.recycle_note.content);
    });
  }

  /* ---------------- 应用：相册 ---------------- */
  function openAlbum() {
    var w = createWindow({ title: "相册", width: 460, height: 400 });
    var body = w.querySelector(".win-body");
    var html = '<div class="photo-grid">';
    DATA.album.photos.forEach(function (p, i) {
      html += '<div class="photo" data-i="' + i + '">' +
        '<div class="photo-img" style="background:' + p.color + ";\">" + p.icon + "</div>" +
        '<div class="photo-cap">' + p.title + "</div></div>";
    });
    html += "</div>";
    body.innerHTML = html;
    body.querySelectorAll(".photo").forEach(function (ph) {
      ph.addEventListener("click", function () {
        var p = DATA.album.photos[+ph.getAttribute("data-i")];
        var propsHtml = "";
        Object.keys(p.props || {}).forEach(function (k) {
          propsHtml += "<div><b>" + k + "：</b><span class='rot13-hint'>" + p.props[k] + "</span></div>";
          if (k === "说明") setFlag("photo3Props");
        });
        var d = el(
          '<div class="dialog"><div class="dialog-box">' +
            '<div class="dialog-title">' + p.title + "</div>" +
            '<div class="dialog-body">' +
              '<div style="font-size:52px;text-align:center;background:' + p.color + ';border:1px solid #ccc;padding:10px;margin-bottom:10px;">' + p.icon + "</div>" +
              "<p>" + p.desc + "</p>" +
              (propsHtml ? '<div class="photo-props" style="margin-top:10px;border-top:1px solid #ccc;padding-top:8px;">' + propsHtml + "</div>" : "") +
              (Object.keys(p.props || {}).length ? '<div style="color:#888;font-size:11px;margin-top:6px;">认真看看那个"说明"。</div>' : "") +
            "</div>" +
            '<button class="xp-btn" id="pd-ok">关闭</button>' +
          "</div></div>"
        );
        document.body.appendChild(d);
        d.querySelector("#pd-ok").addEventListener("click", function () { d.remove(); });
      });
    });
  }

  /* ---------------- 应用：浏览器 ---------------- */
  var browserPages = {
    forumIndex: function () {
      var html = '<div class="browser-title">时光论坛</div>' +
        '<div style="color:#888;font-size:11px;margin-bottom:10px;">成立于1999年 · 会员 1,204 人 · 帖子 9,871</div>';
      DATA.forum.posts.forEach(function (p) {
        html += '<div style="margin-bottom:8px;"><span style="color:#999;">[' + p.date + "]</span> " +
          '<span class="link" data-post="' + p.id + '">' + p.title + "</span>" +
          '<span style="color:#999;font-size:11px;"> · ' + p.author + " · 回复" + p.replies + "</span></div>";
      });
      html += '<div style="color:#888;font-size:11px;margin-top:12px;">友情链接：无。</div>';
      return html;
    },
    forumPost: function (id) {
      setFlag("forumPost");
      return DATA.forum.postBody;
    },
  };

  function openBrowser(page) {
    var w = createWindow({ title: "Internet Explorer", width: 600, height: 460 });
    var body = w.querySelector(".win-body");
    var addr = el('<input class="xp-input" value="about:favorites" readonly style="width:100%;">');
    var view = el('<div class="browser-body"></div>');
    function go(p) {
      if (typeof p === "number") {
        view.innerHTML = browserPages.forumPost(p);
        addr.value = "时光论坛 › 帖子 #" + p;
      } else if (p === "forum") {
        view.innerHTML = browserPages.forumIndex();
        addr.value = "收藏夹 › 时光论坛";
      } else if (p === "home") {
        view.innerHTML = '<div class="browser-title">我的收藏夹</div>' +
          '<div class="file-list">' +
            '<div class="file-item"><span>&#11088;</span> <span class="link" data-go="forum">时光论坛</span></div>' +
            '<div class="file-item"><span>&#11088;</span> <span class="link" data-go="blog">林远的博客</span></div>' +
            '<div class="file-item"><span>&#11088;</span> <span class="link">百度一下</span> <span style="color:#999;font-size:11px;">（无法访问）</span></div>' +
          "</div>";
        addr.value = "about:favorites";
      }
      view.querySelectorAll(".link").forEach(function (l) {
        l.addEventListener("click", function () {
          var go2 = l.getAttribute("data-go");
          var post = l.getAttribute("data-post");
          if (post) go(+post);
          else if (go2 === "forum") go("forum");
          else if (go2 === "blog") openBlog();
        });
      });
    }
    var bar = el('<div class="browser-bar"><span style="color:#555;">收藏夹</span> <button class="xp-btn" style="padding:2px 10px;">打开</button></div>');
    bar.querySelector("button").addEventListener("click", function () { go("home"); });
    body.appendChild(bar);
    body.appendChild(addr);
    body.appendChild(view);
    go(page || "home");
  }

  /* ---------------- 应用：解码器 ---------------- */
  function openDecoder() {
    var w = createWindow({ title: "解码器", width: 500, height: 520 });
    var body = w.querySelector(".win-body");
    var tabs = ["摩尔斯", "Base64", "ROT13", "凯撒"];
    var html = '<div class="decoder-tabs">';
    tabs.forEach(function (t, i) {
      html += '<div class="tab' + (i === 0 ? " active" : "") + '" data-tab="' + i + '">' + t + "</div>";
    });
    html += "</div>";

    function tabHtml(i) {
      var out = '<div class="decoder-tab' + (i === 0 ? " active" : "") + '" data-pane="' + i + '">' +
        '<textarea id="dc-in' + i + '" placeholder="把要解码的内容粘贴到这里…"></textarea>' +
        '<div style="margin:6px 0;">' +
          (i === 3 ? '<label style="font-size:12px;margin-right:6px;">位移（往回收的位数）：</label><input class="xp-input" id="dc-shift" type="number" value="0" style="width:70px;margin-right:12px;">' : "") +
          '<button class="xp-btn" data-decode="' + i + '" style="padding:3px 14px;">解码</button>' +
        "</div>" +
        '<div class="decoder-out" id="dc-out' + i + '">结果会显示在这里</div>';
      if (i === 3) {
        out += '<div class="morse-table">凯撒密码：把每个字母在字母表上移动固定位数。位移可能是几？线索也许就在聊天记录里。</div>';
      }
      return out + "</div>";
    }
    html += tabHtml(0) + tabHtml(1) + tabHtml(2) + tabHtml(3);
    body.innerHTML = html;

    body.querySelectorAll(".tab").forEach(function (t) {
      t.addEventListener("click", function () {
        body.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
        body.querySelectorAll(".decoder-tab").forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
        body.querySelector('[data-pane="' + t.getAttribute("data-tab") + '"]').classList.add("active");
      });
    });
    body.querySelectorAll("[data-decode]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-decode");
        var input = document.getElementById("dc-in" + i).value;
        var out = document.getElementById("dc-out" + i);
        var res = "";
        if (i === 0) res = morseDecode(input);
        else if (i === 1) res = b64decode(input);
        else if (i === 2) res = rot13(input);
        else res = caesarDecode(input, document.getElementById("dc-shift").value);
        out.textContent = res || "（无法解码，检查输入）";
        if (i === 2) {
          var t = res.trim();
          if (t === DATA.truthA) {
            setFlag("partA");
            toast(flag("partB") ? "真相的两半都解开了！" : "这是真相的前半段。<br>另一半，在老周挂在论坛里的那个帖子上。");
            if (flag("partB")) startEnding();
          } else if (t === DATA.truthB) {
            setFlag("partB");
            toast(flag("partA") ? "真相的两半都解开了！" : "这是真相的后半段。<br>前半段，在老宅那台电脑的C盘「机密」文件夹里。");
            if (flag("partA")) startEnding();
          }
        }
        if (i === 3 && res.trim() === "LOG INTO THE FORUM") setFlag("caesarSolved");
      });
    });
  }

  /* ---------------- 结局 ---------------- */
  function startEnding() {
    if (flag("endingShown")) return;
    setFlag("endingShown");
    var box = $("#ending-text");
    var text = DATA.endingText;
    $("#ending").classList.remove("hidden");
    $("#taskbar").classList.add("hidden");
    var i = 0;
    var timer = setInterval(function () {
      i += 3;
      box.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(timer);
        $("#ending").querySelector(".ending-btns").classList.remove("hidden");
      }
    }, 40);
  }

  /* ---------------- 应用：线索本 / 案件简报 ---------------- */
  function openClueLog() {
    var w = createWindow({ title: "线索本", width: 440, height: 420 });
    var body = w.querySelector(".win-body");
    var html = '<div style="font-size:12px;color:#666;margin-bottom:8px;">调查进度：' + hintLevel() + "/6</div>";
    html += '<div class="file-list">';
    DATA.clueLog.forEach(function (c, i) {
      var done = i === 0 || flag(c.flag);
      var icon = done ? "✔️" : "➜";
      var cls = done ? "clue-done" : "clue-next";
      html += '<div class="file-item ' + cls + '" style="align-items:flex-start;"><span>' + icon + "</span><span>" + c.text + "</span></div>";
    });
    html += "</div>";
    body.innerHTML = html;
  }

  function openIntro() {
    var d = el(
      '<div class="dialog"><div class="dialog-box" style="width:440px;">' +
        '<div class="dialog-title">案件简报</div>' +
        '<div class="dialog-body" style="white-space:pre-wrap;">' + DATA.introText + "</div>" +
        '<button class="xp-btn" id="intro-ok" style="margin-right:12px;">开始调查</button>' +
      "</div></div>"
    );
    document.body.appendChild(d);
    d.querySelector("#intro-ok").addEventListener("click", function () { d.remove(); });
  }

  /* ---------------- 桌面 ---------------- */
  function initDesktop() {
    document.querySelectorAll(".desk-icon").forEach(function (ic) {
      var app = ic.getAttribute("data-app");
      ic.addEventListener("click", function () {
        document.querySelectorAll(".desk-icon").forEach(function (x) { x.classList.remove("selected"); });
        ic.classList.add("selected");
      });
      ic.addEventListener("dblclick", function () { openApp(app); });
    });
  }

  function openApp(app) {
    switch (app) {
      case "mycomputer": openMyComputer(); break;
      case "mydocs": openMyDocs(); break;
      case "chat": openChat(); break;
      case "recycle": openRecycle(); break;
      case "browser": openBrowser("home"); break;
      case "decoder": openDecoder(); break;
      case "cluelog": openClueLog(); break;
      case "intro": openIntro(); break;
    }
  }

  /* ---------------- 任务栏 / 开始菜单 ---------------- */
  function initTaskbar() {
    $("#btn-start").addEventListener("click", function () {
      $("#startmenu").classList.toggle("hidden");
    });
    document.querySelectorAll(".sm-item[data-open]").forEach(function (it) {
      it.addEventListener("click", function () {
        $("#startmenu").classList.add("hidden");
        openApp(it.getAttribute("data-open"));
      });
    });
    $("#sm-help").addEventListener("click", function () {
      $("#startmenu").classList.add("hidden");
      showHelp();
    });
    $("#sm-restart").addEventListener("click", function () {
      $("#startmenu").classList.add("hidden");
      if (confirm("重新启动将清空所有进度，确定吗？")) {
        localStorage.removeItem(SAVE_KEY);
        location.reload();
      }
    });
    $("#sm-logoff").addEventListener("click", function () {
      $("#startmenu").classList.add("hidden");
      showLogin();
    });
    $("#sm-shutdown").addEventListener("click", function () {
      $("#startmenu").classList.add("hidden");
      $("#sm-restart").click();
    });
    $("#help-close").addEventListener("click", function () {
      $("#help-dialog").classList.add("hidden");
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#startmenu") && !e.target.closest("#btn-start")) {
        $("#startmenu").classList.add("hidden");
      }
    });
    updateClock();
    setInterval(updateClock, 1000);
  }
  function updateClock() {
    var d = new Date();
    $("#clock").textContent =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }

  /* ---------------- 开机流程 ---------------- */
  function runBoot() {
    var bios = $("#bios");
    var i = 0;
    var lines = DATA.bootLines;
    var timer = setInterval(function () {
      if (i < lines.length) {
        bios.textContent += lines[i] + "\n";
        i++;
      } else {
        clearInterval(timer);
        fillBar();
      }
    }, 260);
    document.addEventListener("click", function () {
      clearInterval(timer);
      if (i < lines.length) {
        bios.textContent = lines.join("\n") + "\n";
        i = lines.length;
        fillBar();
      }
    });
  }
  function fillBar() {
    var bar = $("#xpbar-fill");
    var p = 0;
    var timer = setInterval(function () {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(showLogin, 400);
      }
      bar.style.width = Math.min(p, 100) + "%";
    }, 120);
  }
  function showLogin() {
    $("#boot").classList.add("hidden");
    $("#login").classList.remove("hidden");
    $("#desktop").classList.add("hidden");
    $("#taskbar").classList.add("hidden");
  }
  function showDesktop() {
    $("#login").classList.add("hidden");
    $("#desktop").classList.remove("hidden");
    $("#taskbar").classList.remove("hidden");
    initDesktop();
    initTaskbar();
    if (!flag("introShown")) {
      setFlag("introShown");
      openIntro();
    }
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    load();
    $("#btn-login").addEventListener("click", showDesktop);
    $("#btn-close-end").addEventListener("click", function () {
      $("#ending").classList.add("hidden");
      $("#taskbar").classList.remove("hidden");
    });
    $("#btn-restart").addEventListener("click", function () {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    });
    runBoot();
  }

  init();
})();
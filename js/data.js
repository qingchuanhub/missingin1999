window.GAME_DATA = {

  bootLines: [
    "AMI BIOS (C) 2003 American Megatrends, Inc.",
    "CPU : Intel Pentium 4 2.4GHz",
    "Memory Test : 524288K OK",
    "Detecting IDE drives...",
    "Primary Master: MAXTOR 6L080J4 40GB",
    "Loading Windows XP Professional...",
    "运行命令：c:\\windows\\system32\\explorer.exe",
    "欢迎回来。",
  ],

  files: {
    "blog": {
      name: "博客.html",
      icon: "🌐",
      title: "林远的博客 - 2008",
      content: `
        <div class="browser-title">林远的博客</div>
        <div style="color:#888;font-size:11px;">2008年6月21日 · 只有自己看得到的日记</div>
        <p>最近认识了一个网友，老周。这人神神秘秘的，总爱发些点划电报码，说是老毛病改不掉。</p>
        <p>他说他懂电脑，还说想帮我查点事。我总觉得，他好像特别了解我，像……像我认识很久的人。</p>
        <p style="color:#777;">对了，老周昨天说，他给我留了个谜语，藏在这个网页的"文件"里。<br>我只会用记事本，不会什么网页。真奇怪，他说"文件"。</p>
        <p style="color:#999;font-size:12px;">（页脚小字：本博客由记事本手写生成，无任何后台。）</p>`,
      source: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head><meta charset="gb2312"><title>林远的博客</title></head>
<body>
<h1>林远的博客</h1>
<p>2008年6月21日 · 只有自己看得到的日记</p>
<p>最近认识了一个网友，老周。这人神神秘秘的，总爱发些点划电报码，说是老毛病改不掉。</p>
<p>他说他懂电脑，还说想帮我查点事。我总觉得，他好像特别了解我，像……像我认识很久的人。</p>
<p>（页脚小字：本博客由记事本手写生成，无任何后台。）</p>
<!--
  凯撒暗语：QTL NSYT YMJ KTWZR
  提示：位移值，老周在聊天记录里提过。用解码器的「凯撒」解开它。
  机密文件夹的密码：GUR SBEHZ
  （GUR SBEHZ 是一串 ROT13。解开后去空格、转大写。）
  MTk5OeW5tDfmnIg35pel77yM6ICB5a6F44CC6ICB5ZGo5rKh5pyJ6K+06LCO77yM5LuW55yL5Yiw55qE77yM5piv5Y+m5LiA5Liq5Lq644CC （这是一段彩蛋，解码后是另一个秘密。）
-->
</body>
</html>`
    },

    "diary": {
      name: "加密日记.txt",
      icon: "📝",
      needPassword: true,
      hint: "密码为4位数字。<br>老周说过：密码老规矩，电码。",
      content: `
2008年7月7日 夜

我可能惹上麻烦了。

老周说，1999年暑假，有个和我长得一模一样的人，在老宅附近出现过。
那个人是谁？我1999年明明在省城念书，火车票还压在相册里。

老周说："你确定，那是你？"

我不知道。我打算去论坛查查1999年的帖子。

如果这日记被人看到——老周，你知道该做什么。

55yL5Y2a5a6i55qE5Y6f5paH5Lu2`
    },

    "recycle_note": {
      name: "被删除的笔记.txt",
      icon: "🗒️",
      content: `
7月8日

老周从来不发照片。他说他摄像头坏了。
九年了，我居然从来没怀疑过。

今天老周说了一句话，让我后背发凉——
他说："阿远，1999年我在老宅见过你。那时候……你在省城吧？"

他连这个都知道。
他知道得，太多了。`
    },

    "readme": {
      name: "readme.txt",
      icon: "📄",
      content: `
这台电脑的主人已经很久没有打开它了。

如果你迷路了，试试：
1. 博客的"原文件"
2. 我的电脑 → C盘
3. 回收站
4. 相册
5. 论坛

真相被拆成了两半，藏在这台电脑里。
别相信任何自称"林远"的人。`
    },

    "morse": {
      name: "摩尔斯速查表.txt",
      icon: "📡",
      content: `
摩尔斯电码速查表（老周年轻时当电报员用的那份，1999年油印）

数字：
0 = -----
1 = .----
2 = ..---
3 = ...--
4 = ....-
5 = .....
6 = -....
7 = --...
8 = ---..
9 = ----.

字母：
A=.-   B=-...   C=-.-.   D=-..   E=.    F=..-.
G=--.   H=....   I=..    J=.---   K=-.-   L=.-..
M=--   N=-.     O=---   P=.--.   Q=--.-  R=.-.
S=...   T=-     U=..-   V=...-   W=.--   X=-..-
Y=-.--  Z=--..

（摘自老周随身携带的旧册子。）`
    },

    "secret_a": {
      name: "密文A.txt",
      icon: "🔐",
      content: `
【机密 · 真相的第一部分】

以下是真相的一半。用解码器的 ROT13 解开。

GUR ERNY YVALHNA ARIRE INAVFURQ. VA 1999 NA VZCBFGRE GBBX UVF CYNPR. VA 2008 GUR VZCBFGRE ENA NJNL NTNVA.

另一半，在老周挂在论坛里的那个帖子上。
两半拼在一起，才是全部真相。`
    },
  },

  chat: [
    { from: "lin", name: "林远", text: "老周，你说的那件事，我想了一夜。" },
    { from: "zhou", name: "老周", text: "想通了？" },
    { from: "lin", name: "林远", text: "想不通。1999年我明明在省城，火车票就在相册里。" },
    { from: "zhou", name: "老周", text: "阿远，我打电报出身，最擅长符号。听好——" },
    { from: "zhou", name: "老周", text: "---.. ----- .---- ..---", morse: true },
    { from: "zhou", name: "老周", text: "对了，我传暗语有个老习惯——字母往后推五格。你记住。" },
    { from: "lin", name: "林远", text: "……这是啥？" },
    { from: "zhou", name: "老周", text: "生日礼物，密码老规矩。你生日那天，自己会用到。" },
    { from: "lin", name: "林远", text: "老周，你到底是干嘛的？" },
    { from: "zhou", name: "老周", text: "一个……认识你很久的人。" },
    { from: "lin", name: "林远", text: "？？" },
    { from: "zhou", name: "老周", text: "7月7日，论坛见。" },
  ],

  album: {
    name: "相册",
    photos: [
      { title: "火车票 1999.06.28", icon: "🎫", color: "#f4d9c8",
        desc: "1999年暑假的火车票，省城→家。票面日期：1999年6月28日。", props: {} },
      { title: "老宅合影 1999", icon: "🏚️", color: "#cfcfe8",
        desc: "黑白照片，老宅门口，两个小男孩。照片背面写着：左：我，右：老周。", props: {} },
      { title: "老周发来的照片 2008", icon: "⬛", color: "#222",
        desc: "一张全黑的图片。老周说这是他那边晚上拍的。", props: {
          "拍摄时间": "2008-07-06 23:59",
          "尺寸": "640×480",
          "说明": "GUR SBEHZ CBFG VF UVF OVEGUQNL" } },
      { title: "毕业照 2003", icon: "🎓", color: "#d8e8d8",
        desc: "省城高中毕业照。第三排左边第三个是我。", props: {} },
    ],
  },

  forum: {
    posts: [
      { id: 1, author: "夜猫", title: "收音机里的杂音", date: "2008-06-30", replies: 3 },
      { id: 2, author: "咕咕", title: "2008年还活着的老网站", date: "2008-07-02", replies: 7 },
      { id: 19990707, author: "老周", title: "1999年7月7日，老宅的那个人", date: "2008-07-10", replies: 12 },
    ],
    postBody: `
<div class="browser-title">时光论坛 › 老照片版块 › 1999年7月7日，老宅的那个人</div>
<div style="color:#888;font-size:11px;">楼主 老周 发表于 2008-07-10 21:47 · 回复 12</div>
<p>1999年7月7日，我在老宅见过一个人。他说他叫林远。</p>
<p>可那时候，他应该在省城念书——火车票在相册里，日期1999年6月28日。</p>
<p>……但我就是见过他。</p>
<p>如果那个叫"林远"的人看到这条，记得，你生日那天，我给你的东西。</p>
<p style="font-family:Consolas,monospace;">VS LBH NER ERNQVAT GUVF, V NZ YVALHNA. YNBMUBH VF ZL NYVNF. GUR PBZCHGRE VF SEBZ ZR. PBZR SVAQ ZR.</p>
<p style="color:#999;font-size:12px;">（这是真相的后半段。前半段在老宅那台电脑的C盘「机密」文件夹里。两半都用 ROT13 解开，拼在一起才是全部。）</p>
<p style="color:#999;font-size:12px;">（本版规则：禁止发广告，禁止讨论2046年之后的事。）</p>`,
  },

  truthA: "THE REAL LINYUAN NEVER VANISHED. IN 1999 AN IMPOSTER TOOK HIS PLACE. IN 2008 THE IMPOSTER RAN AWAY AGAIN.",
  truthB: "IF YOU ARE READING THIS, I AM LINYUAN. LAOZHOU IS MY ALIAS. THE COMPUTER IS FROM ME. COME FIND ME.",

  endingText: `屏幕安静了几秒。

桌面上弹出一个新窗口——一封没有发件人的邮件：

——————————————————
阿远：

如果你能看到这封邮件，说明你已经把所有散落的碎片拼在了一起。

真正的林远从未失踪。
1999年，有个人顶替他，活了九年。
2008年，那个人又跑了——所有人都以为"林远失踪了"。

可失踪的从来不是林远。

老周，是我。
这台电脑，是我寄给你的。

1999年7月7日，我在老宅见过那个人。
我真的见过他。

来找我。
—— 林远（老周）
——————————————————

窗口下方，附着一个地址：
「老宅，东边第三扇窗，窗台上有一盆枯死的仙人掌。」
「撬开它。仙人掌盆底下，压着一张2026年的车票。」

原来，那台电脑寄出的时候，
车票，就已经买好了。

—— 完 ——`,

  introText: `案件简报
失踪案 · 编号 1999-0707

【案情】
你的哥哥林远，2008年7月失踪，至今九年。
今天，你收到一个匿名包裹，里面是一台旧电脑——寄件人自称"老周"。

【任务】
在这台电脑里找到真相。所有线索都在电脑里。

【调查技巧】
• 桌面图标就是线索，双击打开
• 线索可能藏在：文件内容、聊天记录、图片属性、回收站、C盘文件夹
• 有些"乱码"文字，可以用桌面上的【解码器】解开
• 真相被拆成了两半，散落在这台电脑里
• 卡住了？打开【线索本】看进度，或点开始菜单的【帮助】`,

  clueLog: [
    { flag: "start", text: "双击桌面图标开始调查。建议顺序：聊天记录 → 我的电脑(C盘) → 我的文档。桌面上的【解码器】能解开各种乱码。" },
    { flag: "chatRead", text: "【聊天记录】里，老周发了一串点划符号——摩尔斯电码。速查表在【我的电脑】→ C盘里。用【解码器】把电码解成数字。" },
    { flag: "diaryUnlocked", text: "【加密日记】已解锁。日记末尾的 base64 乱码，用【解码器】解开，它会告诉你去哪。" },
    { flag: "blogSource", text: "日记指向博客的【原文件】。注释里有两处暗语：一处 ROT13 是 C盘「机密」文件夹的密码，一处凯撒指向论坛。" },
    { flag: "partA", text: "已拿到真相的前半段。下一步：凯撒解出的 LOG INTO THE FORUM 指向【时光论坛】的帖子。" },
    { flag: "caesarSolved", text: "凯撒暗语指向【时光论坛】。打开浏览器 → 收藏夹 → 时光论坛，找到老周的帖子。" },
    { flag: "partB", text: "真相的两半都解开了。用【解码器】的 ROT13 分别解出两段密文，拼在一起就是全部真相。" },
    { flag: "endingShown", text: "真相已揭开。彩蛋：回头再看一次博客的【原文件】注释。" },
  ],

  hintLevels: [
    { min: 0, text: "这台电脑是失踪多年的哥哥林远寄来的。双击桌面图标开始调查。建议顺序：聊天记录 → 我的电脑(C盘) → 我的文档。桌面上的【线索本】会记录你的进度。" },
    { min: 1, text: "聊天记录里老周发了一串点划符号——那是摩尔斯电码。速查表在【我的电脑】→ C盘里。打开【解码器】的摩尔斯页，把电码粘贴进去解码，得到一个4位数字密码。" },
    { min: 2, text: "用4位数字打开【我的文档】里的加密日记。日记末尾的 base64 乱码，用【解码器】解出，它会指引你下一步去哪。" },
    { min: 3, text: "日记指引你去看博客的【原文件】（=用记事本打开网页文件看到的内容，注释在 <!-- --> 里）。注释里有两处暗语：一处 ROT13 是【我的电脑】→ C盘「机密」文件夹的密码；一处凯撒（位移值老周在聊天里提过）指向论坛。" },
    { min: 4, text: "用密码打开 C盘 的「机密」文件夹，里面有真相的一半（ROT13）。另一半在论坛帖子里。" },
    { min: 5, text: "凯撒解出的 LOG INTO THE FORUM 指向【时光论坛】。打开浏览器 → 收藏夹 → 时光论坛，找到老周的帖子，末尾是真相的另一半（ROT13）。" },
    { min: 6, text: "两段密文都用【解码器】的 ROT13 解开。分别解出后，拼在一起就是全部真相。" },
  ],
};

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
  如果你能看到这里，说明你不只是随便看看。
  相册密码：9 0 7 2
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

55yL5Y2a5a6i55qE5rqQ5Luj56CB`
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
1. 博客的"查看源代码"
2. 回收站
3. 相册
4. 论坛

别相信任何自称"林远"的人。`
    },
  },

  chat: [
    { from: "lin", name: "林远", text: "老周，你说的那件事，我想了一夜。" },
    { from: "zhou", name: "老周", text: "想通了？" },
    { from: "lin", name: "林远", text: "想不通。1999年我明明在省城，火车票就在相册里。" },
    { from: "zhou", name: "老周", text: "阿远，我打电报出身，最擅长符号。听好——" },
    { from: "zhou", name: "老周", text: "---.. ----- .---- ..---", morse: true },
    { from: "lin", name: "林远", text: "……这是啥？" },
    { from: "zhou", name: "老周", text: "生日礼物，密码老规矩。你生日那天，自己会用到。" },
    { from: "lin", name: "林远", text: "老周，你到底是干嘛的？" },
    { from: "zhou", name: "老周", text: "一个……认识你很久的人。" },
    { from: "lin", name: "林远", text: "？？" },
    { from: "zhou", name: "老周", text: "7月7日，论坛见。" },
  ],

  album: {
    name: "相册",
    password: "9072",
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
<p style="font-family:Consolas,monospace;">GUR ERNY YVALHNA ARIRE INAVFURQ. VA 1999 NA VZCBFGRE GBBX UVF CYNPR. VA 2008 GUR VZCBFGRE ENA NJNL NTNVA. VS LBH NER ERNQVAT GUVF, V NZ YVALHNA. YNBMUBH VF ZL NYVNF. GUR PBZCHGRE VF SEBZ ZR. PBZR SVAQ ZR.</p>
<p style="color:#999;font-size:12px;">（本版规则：禁止发广告，禁止讨论2046年之后的事。）</p>`,
    truthPlain: "THE REAL LINYUAN NEVER VANISHED. IN 1999 AN IMPOSTER TOOK HIS PLACE. IN 2008 THE IMPOSTER RAN AWAY AGAIN. IF YOU ARE READING THIS, I AM LINYUAN. LAOZHOU IS MY ALIAS. THE COMPUTER IS FROM ME. COME FIND ME.",
  },

  endingText: `屏幕安静了几秒。

桌面上弹出一个新窗口——一封没有发件人的邮件：

——————————————————
阿远：

如果你能看到这封邮件，说明你已经找到了所有的路标。

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

  hintLevels: [
    { min: 0, text: "这台电脑是失踪多年的哥哥林远寄来的。双击桌面图标开始调查。建议顺序：聊天记录 → 我的文档 → 回收站。别忘了桌面上的「解码器」。" },
    { min: 1, text: "聊天记录里老周发了一串点划符号——那是摩尔斯电码。打开「解码器」的摩尔斯标签页，把电码粘贴进去解码，会得到一个4位数字。博客里说过老周爱发电报码。" },
    { min: 2, text: "用解码出的4位数字打开「我的文档」里的加密日记。日记最后有一串 base64 乱码，用「解码器」的 Base64 标签页解出来，会指引你去某个地方。" },
    { min: 3, text: "日记指引你去「博客的源代码」。打开博客.html，点窗口里的「查看源代码」按钮，仔细读 HTML 注释——里面有相册密码。" },
    { min: 4, text: "用密码打开相册，查看每张照片的属性。有一张照片的「说明」是 ROT13 编码，用「解码器」解码它，会告诉你下一步去哪。" },
    { min: 5, text: "打开浏览器，进收藏夹里的「时光论坛」，找到老周发的帖子。帖子最后有一串英文乱码，用「解码器」的 ROT13 解出来，就是真相。" },
  ],
};

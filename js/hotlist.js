// hotlist.js

// 使用测试数据生成热播榜内容
// 数据按分组存放，这里构造两组测试数据
const testGroups = {
  "1.13-1.19": [
    {
      title: "Love Beyond Doubt",
      video: "https://cdn.cocomovie.top/Love Beyond Doubt.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675c1310295dd",
      thumb: "0/G1.webp"
    },
    {
      title: "The Hero Uncovered",
      video: "https://cdn.cocomovie.top/The Hero Uncovered.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675bf06832bf5",
      thumb: "0/G2.webp"
    },
    {
      title: "CEO's Cupid Kid",
      video: "https://cdn.cocomovie.top/CEO's Cupid Kid.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675be88f7b775",
      thumb: "0/G3.webp"
    },
    {
      title: "Vampire's Remedy",
      video: "https://cdn.cocomovie.top/Vampire's Remedy.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675ba42f7d5b9",
      thumb: "0/G4.webp"
    },
    {
      title: "CEO's Love Chase",
      video: "https://cdn.cocomovie.top/CEO's Love Chase.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675b9b100d503",
      thumb: "0/G6.webp"
    },
    {
      title: "Family Rescue Gone Wrong",
      video: "https://cdn.cocomovie.top/Family Rescue Gone Wrong.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675b9b28293a7",
      thumb: "0/G7.webp"
    },
    {
      title: "Secretly Wed To a Tycoon",
      video: "https://cdn.cocomovie.top/Secretly Wed To a Tycoon.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675b9b3da493a",
      thumb: "0/G8.webp"
    }
  ],
  "12.9-12.15": [
    {
      title: "When Jasmines Bloom",
      video: "https://cdn.cocomovie.top/When Jasmines Bloom.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675b9b4febf96",
      thumb: "0/G9.webp"
    },
    {
      title: "Quit Job, Married Boss",
      video: "https://cdn.cocomovie.top/Quit Job, Married Boss.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675bbfbcee66f",
      thumb: "0/G10.webp"
    },
    {
      title: "Divorce Does Me Good",
      video: "https://cdn.cocomovie.top/Divorce Does Me Good.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675bbfd65e185",
      thumb: "0/G11.webp"
    },
    {
      title: "Swap Life With The Tycoon",
      video: "https://cdn.cocomovie.top/Swap Life With The Tycoon.mp4",
      commission: "https://short.kalostv.com/api/short/jump/675bc00b37985",
      thumb: "0/G12.webp"
    }
  ]
};

// 生成热播榜页面内容，每个剧集条目按以下结构生成：
//
// 序号.剧集名称（加粗）
// 剧集封面图（点击后跳转到佣金链接）
// “预览”按钮（点击后跳转到预览页面）
// 热度图标区域（显示 5 个小 hot.webp 图标）
// hotlist.js

function generateHotList() {
  const container = document.getElementById('hotListContainer');
  container.innerHTML = '';

  // 检查全局变量 hotlistData 是否存在
  if (typeof hotlistData === "undefined") {
    container.innerHTML = "<p>没有热播数据</p>";
    return;
  }

  // 遍历 hotlistData 对象，hotlistData 的键为周组（例如 "1.13-1.19"）
  for (const weekRange in hotlistData) {
    // 创建分组模块
    const weekSection = document.createElement('div');
    weekSection.className = 'week-section';

    // 分组标题
    const weekTitle = document.createElement('h2');
    weekTitle.className = 'week-title';
    weekTitle.innerText = `周热门榜单 ${weekRange}`;
    weekSection.appendChild(weekTitle);

    // 创建剧集列表容器
    const listContainer = document.createElement('div');

    // 遍历该组内的剧集（注意数据已经按预处理排序好，序号从 1 开始）
    hotlistData[weekRange].forEach((episode, index) => {
      const item = document.createElement('div');
      item.className = 'episode-item';

      // 第一行：序号和剧集名称
      const header = document.createElement('div');
      header.className = 'episode-header';

      const indexSpan = document.createElement('span');
      indexSpan.className = 'episode-index';
      indexSpan.innerText = (index + 1) + '.';
      header.appendChild(indexSpan);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'episode-title';
      titleDiv.innerText = episode.id;
      // 点击剧集名称跳转到佣金链接
      titleDiv.style.cursor = 'pointer';
      titleDiv.onclick = function () {
        window.open(episode.commission, '_blank');
      };
      header.appendChild(titleDiv);
      item.appendChild(header);

      // 第二行：剧集封面图、预览按钮、热度图标
      const body = document.createElement('div');
      body.className = 'episode-body';

      // 封面图区域：点击后跳转到佣金链接
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'episode-thumbnail';
      thumbDiv.onclick = function () {
        window.open(episode.commission, '_blank');
      };
      const thumbImg = document.createElement('img');
      thumbImg.src = episode.thumb;
      thumbImg.alt = episode.id;
      thumbImg.loading = 'lazy';
      thumbDiv.appendChild(thumbImg);
      body.appendChild(thumbDiv);

      // 预览按钮区域：点击后跳转到预览页面，并传递视频链接
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'episode-controls';
      const previewBtn = document.createElement('button');
      previewBtn.className = 'preview-btn';
      previewBtn.innerText = 'preview';
      previewBtn.onclick = function (e) {
        e.stopPropagation();
        window.location.href = 'videoPlayer.html?videoUrl=' + encodeURIComponent(episode.video);
      };
      controlsDiv.appendChild(previewBtn);
      body.appendChild(controlsDiv);

      // 热度图标区域：显示的图标个数根据预处理数据中的 heat 值
      const hotDiv = document.createElement('div');
      hotDiv.className = 'episode-hot';
      for (let i = 0; i < episode.heat; i++) {
        const hotImg = document.createElement('img');
        hotImg.src = 'hot.webp';
        hotImg.alt = 'hot';
        hotDiv.appendChild(hotImg);
      }
      body.appendChild(hotDiv);

      item.appendChild(body);
      listContainer.appendChild(item);
    });

    weekSection.appendChild(listContainer);
    container.appendChild(weekSection);
  }
}

// 初始化生成页面内容
document.addEventListener("DOMContentLoaded", function () {
  generateHotList();
});


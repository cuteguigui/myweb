
	/**
	* obj: 
	* imgArr 图片数组
	* imgWidth 图片宽度
	* aniTime 动画切换时间
	* intervalTime 停留的时间
	* scale 图片缩放
	* autoplay 是否自动播放
	* gap 图片之间间隔
	*/
	function Swiper(obj) {
		this.imgArr = obj.imgArr || [];
		this.scale = obj.scale || 0.8; // 图片缩放值
		this.gap = obj.gap; // 图片未缩放状态下图片之间的间隔

		// 移动端
		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		   this.containerWidth = document.body.clientWidth; // 轮播图盒子宽度
		}else{
			// PC端：动态调整宽度
            if (window.innerWidth > 1200) {
                this.containerWidth = window.innerWidth * 0.8; // 占屏幕宽度80%
            } else {
                this.containerWidth = 800; // 平板及普通桌面端宽度
            }

		}
		this.imgWidth = window.innerWidth > 768 ? 300 : 200; // 桌面端图片宽度300px，移动端200px
		this.aniTime = obj.aniTime || 500;
		this.intervalTime = this.aniTime + obj.intervalTime || 2000;
		this.nowIndex =3;
		this.imgDoms = document.getElementsByClassName('swiper-slide' + obj.clsSuffix);
		this.mainDom = document.getElementsByClassName('swiper-main' + obj.clsSuffix)[0];
		this.listDoms = document.getElementsByClassName('swiper-list' + obj.clsSuffix)[0];
		this.activeDom = this.imgDoms[0];
		this.autoplay = obj.autoplay;

		this.listDoms.style.width = `${this.containerWidth}px`;

		this.timer; // 自动播放的定时器
		this.prev = Date.now();

		this.diffLen = (this.containerWidth - this.imgWidth - (this.gap * 2)) / 2;
  		this.clsSuffix = obj.clsSuffix
	}
 
	Swiper.prototype.init = function () {
		this.eventBind();
	
		// 确保轮播图数据已经加载
		if (!this.imgArr || this.imgArr.length === 0) {
			console.error('轮播图数据为空，无法初始化！');
			return;
		}
	
		let resImgArr;
		if (this.imgArr.length > 2) {
			resImgArr = [this.imgArr[this.imgArr.length - 2], this.imgArr[this.imgArr.length - 1], ...this.imgArr, this.imgArr[0], this.imgArr[1]];
			this.mainDom.style.left = `${-(2 * this.imgWidth + this.gap - this.diffLen)}px`;
			this.mainDom.style.width = `${(this.imgArr.length + 2) * (this.imgWidth + (this.gap / 2))}px`;
		} else {
			this.nowIndex = 0;
			resImgArr = [...this.imgArr];
		}
	
		// 动态生成图片 HTML
		let str = '';
		resImgArr.forEach((item, index) => {
			str += `
				<a href="${item.url}" target="_blank">
					<img class="swiper-slide${this.clsSuffix}" style="width: ${this.imgWidth}px;" src="${item.imgPath}" alt="Video Thumbnail"/>
				</a>
			`;
		});
	
		// 插入到轮播图容器
		this.mainDom.innerHTML = str;
	
		this.setScale();
		if (this.autoplay) {
			this.timer = setInterval(this.nextSlider.bind(this, this.aniTime), this.intervalTime);
		}
	
		console.log('轮播图初始化完成');
	};
	
			let str = '';
			resImgArr.forEach((item, index) => {
				str += `
					<a href="${item.url}" target="_blank">
						<img class="swiper-slide${this.clsSuffix}" style="width: ${this.imgWidth}px;" src="${item.imgPath}" alt="Video Thumbnail"/>
					</a>
				`;
			});			
			this.mainDom.innerHTML = str;
			this.setScale();
			if (this.autoplay) {
				this.timer = setInterval(this.nextSlider.bind(this, this.aniTime), this.intervalTime);
			}
		},
		setScale: function() {
			// 堆叠式
			if (this.gap < 0) {

				for (let i = 0; i < this.imgDoms.length; i++) {
					if (this.imgArr.length ===2) {
						this.imgDoms[0].style.left = `${(this.containerWidth/4) - (this.imgWidth/2)}px`;
						this.imgDoms[1].style.left = `${(this.containerWidth/4)*3 - (this.imgWidth/2)}px`;
					} else if (this.imgArr.length ===1) {
						this.imgDoms[i].style.left = `${(this.containerWidth/2) - (this.imgWidth/2)}px`;
					} else {
						this.imgDoms[i].style.left = `${(i - 1) * (this.imgWidth + this.gap)}px`;
					}


					if (i === this.nowIndex) {
						this.imgDoms[i].style.transform = 'scale(1)';
						this.imgDoms[i].style.zIndex = '1001';
					} else if (i < this.nowIndex) {
						this.imgDoms[i].style.transform = `scale(${1 - ((this.nowIndex - i) * 0.2)})`;
						this.imgDoms[i].style.zIndex = 1000 - ((this.nowIndex - i));
					} else if (i > this.nowIndex) {
						this.imgDoms[i].style.transform = `scale(${1 - ((i - this.nowIndex) * 0.2)})`;
						this.imgDoms[i].style.zIndex = 1000 - (i - this.nowIndex);
					}
				}
			} else {
			// 卡片式
				for (let i = 0; i < this.imgDoms.length; i++) {
					if (this.imgArr.length ===2) {
						this.imgDoms[0].style.left = `${(this.containerWidth/4) - (this.imgWidth/2)}px`;
						this.imgDoms[1].style.left = `${(this.containerWidth/4)*3 - (this.imgWidth/2)}px`;
					} else if (this.imgArr.length ===1) {
						this.imgDoms[i].style.left = `${(this.containerWidth/2) - (this.imgWidth/2)}px`;
					} else {
						this.imgDoms[i].style.left = `${(i - 1) * (this.imgWidth + this.gap)}px`;
					}
					if (i === this.nowIndex) {
						this.imgDoms[i].style.transform = 'scale(1)';
					} else {
						this.imgDoms[i].style.transform = `scale(${this.scale})`;
					}
				}
			}
		},
		prevSlider: function(aniTime) {
			if (this.imgArr.length ===2) {
				this.nowIndex = this.nowIndex ? 0 : 1;
				this.setScale()
			} else if (this.imgArr.length ===1) {
				return;
			} else {
				this.nowIndex--;
				this.mainDom.style.transition = `left ${aniTime/1000}s`
				this.mainDom.style.left = `${parseInt(this.mainDom.style.left)+(this.gap + this.imgWidth)}px`;
				if (this.nowIndex === 1) {
					this.setScale()
					setTimeout(function() {
						this.nowIndex = (this.imgArr.length+1);
						this.setScale()
						this.mainDom.style.transitionProperty = 'none';
						this.mainDom.style.left = `${-(parseInt(this.imgDoms[this.nowIndex].style.left) - this.diffLen - this.gap)}px`;
					}.bind(this), aniTime)
				} else {
					this.setScale()
				}
			}
		},
		nextSlider: function(aniTime) {
			if (this.imgArr.length ===2) {
				this.nowIndex = this.nowIndex ? 0 : 1;
				this.setScale()
			} else if (this.imgArr.length ===1) {
				return;
			} else {
				if (this.nowIndex >=2) {	
					this.mainDom.style.transition = `left ${aniTime/1000}s`
					this.mainDom.style.left = `${parseInt(this.mainDom.style.left)-(this.gap + this.imgWidth)}px`;
					// this.mainDom.style.left = `${this.gap + this.imgWidth}px`;
				}
				if (this.nowIndex === (this.imgArr.length+1)) {
					this.nowIndex = (this.imgArr.length+2);
					this.setScale()
					setTimeout(function() {
						this.nowIndex = 2;
						this.setScale()
						this.mainDom.style.transitionProperty = 'none';
						this.mainDom.style.left = `${-(this.imgWidth - this.diffLen)}px`;
					}.bind(this), aniTime)
				} else {
					this.nowIndex++;
					this.setScale()
				}
			}
		},
		eventBind: function() {	
			let that = this;

			document.getElementById('next' + this.clsSuffix).onmouseover = function () {
				clearInterval(that.timer);
			}
			document.getElementById('next' + this.clsSuffix).onmouseout = function () {
				that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
			}
			document.getElementById('next' + this.clsSuffix).onclick = function () {
				that.throttle(that.nextSlider, 300, 300);
			}


			document.getElementById('prev' + this.clsSuffix).onmouseover = function () {
				clearInterval(that.timer);
			}
			document.getElementById('prev' + this.clsSuffix).onmouseout = function () {
				that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
			}
			document.getElementById('prev' + this.clsSuffix).onclick = function() {
				that.throttle(that.prevSlider, 300, 300);
			}

			this.mainDom.addEventListener('touchstart', function(e) {
				clearInterval(that.timer);
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
			})
			this.mainDom.addEventListener('touchmove', function(e) {
				clearInterval(that.timer);
				that.endX = e.changedTouches[0].clientX;
				that.endY = e.changedTouches[0].clientY;
			})
			this.mainDom.addEventListener('touchend', function(e) {
				if (!that.mainDom.style.transition) {
					that.mainDom.style.transition = `left ${that.aniTime / 1000}s`
				}
				let angle = that.angle({ X: that.startX, Y: that.startY }, { X: that.endX, Y: that.endY });
				if (Math.abs(angle) > 30) return;
			    if (that.endX > that.startX){ // 右滑
			    	that.prevSlider(that.aniTime);
			    } else { // 左滑
			    	that.nextSlider(that.aniTime);
			    }
				that.timer = setInterval(that.nextSlider.bind(that, that.aniTime), that.intervalTime);
				
			})
		},
		// 节流：时间戳版
		throttle(handle, delay, val) {
            var now = Date.now();
            if (now - this.prev >= delay) {
                handle.call(this, val);
                this.prev = Date.now();
            }
		},
		/**
		* 计算滑动角度
		* @param {Object} start 起点坐标
		* @param {Object} end 终点坐标
		*/
		angle: function (start, end) {
		    var _X = end.X - start.X,
		      _Y = end.Y - start.Y
		    //返回角度 /Math.atan()返回数字的反正切值
		    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
		}
	}
// main.js

// 函数：记录页面视图
function trackPageView() {
	if (typeof gtag === 'function') {
	  gtag('event', 'page_view', {
		page_path: window.location.pathname + window.location.search
	  });
	}
  }
  
  // 在页面加载时记录初始页面视图
  window.addEventListener('load', () => {
	trackPageView();
  });
  
  // 监听URL变化（使用History API）
  (function() {
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;
  
	history.pushState = function(...args) {
	  originalPushState.apply(history, args);
	  window.dispatchEvent(new Event('locationchange'));
	};
  
	history.replaceState = function(...args) {
	  originalReplaceState.apply(history, args);
	  window.dispatchEvent(new Event('locationchange'));
	};
  
	window.addEventListener('popstate', () => {
	  window.dispatchEvent(new Event('locationchange'));
	});
  })();
  
  // 在URL变化时记录页面视图
  window.addEventListener('locationchange', () => {
	trackPageView();
  });

// 搜索筛选功能
function filterThumbnails() {
    const input = document.getElementById("searchInput").value.toLowerCase(); // 获取输入框的值并转为小写
    const thumbnails = document.querySelectorAll(".thumbnail"); // 获取所有缩略图

    thumbnails.forEach(thumbnail => {
        const title = thumbnail.getAttribute("data-title").toLowerCase(); // 获取 data-title 属性并转为小写
        if (title.includes(input)) {
            thumbnail.style.display = ""; // 显示匹配的项
        } else {
            thumbnail.style.display = "none"; // 隐藏不匹配的项
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const swiperData = [
        { 
            type: 'image', 
            url: 'https://short.kalostv.com/api/short/jump/675c53f73a3c9', 
            imgPath: 'ii1.webp', 
            title: '示例图片1' 
        },
        { 
            type: 'video', 
            url: 'https://www.youtube.com/embed/OZy89jnBgs8', 
            thumbnail: 'https://img.youtube.com/vi/OZy89jnBgs8/hqdefault.jpg', 
            title: '示例视频1' 
        },
        { 
            type: 'video', 
            url: 'https://www.youtube.com/embed/9r9GriQ294o', 
            thumbnail: 'https://img.youtube.com/vi/9r9GriQ294o/hqdefault.jpg', 
            title: '示例视频2' 
        },
        { 
            type: 'video', 
            url: 'https://www.youtube.com/embed/Fxf5VOikNF0', 
            thumbnail: 'https://img.youtube.com/vi/Fxf5VOikNF0/hqdefault.jpg', 
            title: '示例视频3' 
        },
        { 
            type: 'image', 
            url: 'https://short.kalostv.com/api/short/jump/675c8297121ed', 
            imgPath: 'ii5.webp', 
            title: '示例图片2' 
        },
        { 
            type: 'image', 
            url: 'https://short.kalostv.com/api/short/jump/675c52b1b2dd8', 
            imgPath: 'ii6.webp', 
            title: '示例图片3' 
        },
    ];

    // 初始化 Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 如果需要分页器，可以启用以下选项
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        // },
        lazy: {
            loadPrevNext: true,
        },
    });

    // 动态生成轮播图内容
    const swiperWrapper = document.getElementById('swiper-wrapper');

    swiperData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        if (item.type === 'video') {
            // 使用自定义图片作为视频的封面，点击后弹出 YouTube 视频
            slide.innerHTML = `
                <a href="${item.url}" class="video-link" target="_blank">
                    <img data-src="${item.thumbnail}" class="swiper-lazy" alt="${item.title}">
                    <div class="swiper-lazy-preloader"></div>
                </a>
            `;
        } else if (item.type === 'image') {
            // 普通图片轮播项
            slide.innerHTML = `
                <a href="${item.url}" target="_blank">
                    <img data-src="${item.imgPath}" class="swiper-lazy" alt="${item.title}">
                    <div class="swiper-lazy-preloader"></div>
                </a>
            `;
        }

        swiperWrapper.appendChild(slide);
    });

    // 启用 Swiper 的懒加载功能
    swiper.lazy.load();

    // 点击视频封面后替换为嵌入的视频
    swiperWrapper.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'img' && target.parentElement.classList.contains('video-link')) {
            const parentLink = target.parentElement;
            const href = parentLink.getAttribute('href');

            // 检查是否是 YouTube 视频嵌入链接
            if (href.includes('youtube.com/embed/')) {
                // 创建 iframe 元素
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', href + '?autoplay=1');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', 'true');
                iframe.style.width = '100%';
                iframe.style.height = '100%';

                // 替换图片为视频
                parentLink.innerHTML = '';
                parentLink.appendChild(iframe);
            }
        }
    });
});

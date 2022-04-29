<template>
  <!-- 页眉 -->
  <div id="page">
    <div id="header">
        <div class="header">
            <div class="header-left">
                <div class="logo">
                    <img src="../assets/RHlogo.png">
                </div>
                <div class="nav">
                    <a href="http://localhost:8080/#/topics">热门话题</a>
                    <a href="https://readhub.cn/daily">每日早报</a>
                    <a href="https://readhub.cn/news">科技动态</a>
                    <a href="https://readhub.cn/tech">技术资讯</a>
                </div>
            </div>
            <div class="header-right">
                <div class="search">
                    <van-icon name="search" style="margin-top: 16px; cursor: pointer;" size="28" @click="showPopup" />
                    <van-popup v-model="show" position="top" :style="{ height: '5%' }">
                        <div class="header">
                            <div class="logo">
                                <img src="../assets/RHlogo.png">
                            </div>
                                <van-search
                                 v-model="value"
                                 placeholder="请输入搜索关键词"
                                 @search="onSearch"
                                />
                        </div>
                    </van-popup>
                </div>
                <div class="login">
                    <a href="https://passport.nocode.com/wechat?callback=https%3A%2F%2Freadhub.cn%2Ftopics&appname=readhub">登录</a>
                </div>
            </div>
        </div>
    </div>
    <!-- 主体内容 -->
    <div id='contents'>
        <div class="contents-in">
            <!-- 新闻内容 -->
            <div class="contents-left">
                <div class="news-short" v-for="(item, index) in data" :class="[isActive===item.id?'news-long':'news-short']" :key="index" @click="changeCss(item.id)">
                    <div v-if="isActive!=item.id" class="short">
                        <div class="newsheader">
                            <a :href="['https://readhub.cn/topic/' + item.id]" target="_blank">{{ item.title }}</a>
                            <span class='time'>{{ timegap(item.publishDate) }}</span>
                        </div>
                        <span>{{ item.summary }}</span>
                    </div>
                    <div v-show="isActive==item.id" class="long">
                        <div class="newsheader">
                            <a :href="['https://readhub.cn/topic/' + item.id]" target="_blank">{{ item.title }}</a>
                            <span class='time'>{{ timegap(item.publishDate) }}</span>
                        </div>
                        <span>{{ item.summary }}</span>
                        <div class="item-style">
                            <ul style="list-style-type: circle;">
                                <li  v-for="(news, newsindex) in item.newsArray" :key="newsindex" style="margin-left: 20px;">
                                    <span style="margin-right: 10px;">
                                        <a :href="news.url" target="_blank">{{ news.title }}</a>
                                    </span>
                                    <span style="color: grey;">{{ news.siteName }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="topic-check">
                            <div @click="topic_check(item.id)">
                                <span>查看话题</span>
                                <span>
                                    <van-icon name="arrow" />
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- 赞助商 -->
            <div class="contents-right">
                <div class="sponsertext">
                    <p style="margin-top: 0px;">年度赞助商</p>
                </div>
                <div class="sponser">
                    <van-grid icon-size="18" gutter="5" clickable :column-num="2">
                        <van-grid-item v-for="(item, index) in sponsorArr" :key="index" @click="openSponsor(item.surl)" >
                            <img :src="item.addr">
                        </van-grid-item>
                    </van-grid>
                </div>
                <div class="weixin">
                    <img src='../assets/weixin.png' style="border: 1px solid grey;">
                </div>
            </div>
        </div>
    </div>
    <div v-show="bttFlag" class="backtotop" @click="backTop">
        <img src="../assets/backtoTop.png">
    </div>
  </div>
</template>

<script>

export default {
    name:'topics',
    data(){
        return{
            sponsorArr:[
                {addr: require('../assets/sponsor/sponsor1.png'), surl:'https://www.zsxq.com/'},
                {addr: require('../assets/sponsor/sponsor2.png'), surl:'https://b.geekbang.org/?utm_source=readhub&utm_medium=pc&utm_campaign=readhubpromotion&gk_source=2021082001_readhub_pc'},
                {addr: require('../assets/sponsor/sponsor3.png'), surl:'https://www.gaopinimages.com/index'},
                {addr: require('../assets/sponsor/sponsor4.png'), surl:'https://mp.weixin.qq.com/s/rtMZ3uNjn4jEWJaLrlh1XA'},
                {addr: require('../assets/sponsor/sponsor5.png'), surl:'http://shangjiadao.com/?from=readhub'},
                {addr: require('../assets/sponsor/sponsor6.png'), surl:'https://www.orvibo.com/'},
                {addr: require('../assets/sponsor/sponsor7.png'), surl:'https://www.youzan.com/?from_source=budian_wmkj_0_0'},
                {addr: require('../assets/sponsor/sponsor8.png'), surl:'https://shop196130.m.youzan.com/v2/showcase/homepage?alias=nre994n7&sf'},
                {addr: require('../assets/sponsor/sponsor9.png'), surl:'https://hd.hstong.com/hd/marketing2020/zh-ipo/?_scnl=ZGFvMmVibTU'},
            ],

            value: '',

            bttFlag: true,

            show: false,

            isActive: '',

            data: [],
            
            // timeNow: new Date().toISOString(),
            // time: getTime(),

            // test_text: '阿格拉瓦尔能告诉员工们最确定的一件事是：在亿万富翁马斯克对推特的私有化交易完成后，推特的未来会怎么样仍难确定 ... 只能说，这些问题现任 CEO 阿格拉瓦尔不知道答案，推特员工也不清楚，推特的用户更是只能看看热闹，「世界城市广场」会变成什么样，只能等着看马斯克的改造了 ... 在职场匿名社区 Blind 上，有一则对 200 名推特员工的小调查'
            // ,

            // newsArray: [
            //     {"url":"https://www.tmtpost.com/nictation/6090794.html", "title":"学大教育一季度净利117.1万元，同比下滑78.18%", "siteName":"钛媒体"},
            //     {"url":"https://www.jiemodui.com/N/131813.html", "title":"学大教育2021年营收25.29亿元，2022年Q1营收4.97亿元", "siteName":"芥末堆"},
            //     {"url":"https://www.chinaventure.com.cn/news/78-20220427-368588.html", "title":"你说我一个给孩子补习的，怎么就卖起咖啡了呢？", "siteName":"投中网"}
            // ],

        }
    },

    created: function(){
         
    },

    mounted: function(){
        this.getdata();
        // this.getTime();
        window.addEventListener('scroll', this.scrollToTop);
    },

    destroyed: function(){
        window.removeEventListener('scroll', this.scrollToTop);
    },

    methods:{
        showPopup(){
            this.show = !this.show;
        },

        onSearch(val){
            window.location.href = ['https://readhub.cn/search?query=' + val];
        },

        openSponsor(surl){
            let href = surl;
            window.open(href, '_blank');
        },

        changeCss(id){
            if(this.isActive!=id){
                this.isActive = id;
            }else{
                this.isActive = '';
            }
            // console.log(this.isActive);
        },
        
        getdata(){
            this.$axios({
                method: "GET",
                url: 'https://api.readhub.cn/topic',
            }).then(response=>{
                this.data = response.data.data;
                // console.log(this.data);
            });
        },

        backTop(){
            document.documentElement.scrollTop = 0;
        },

        scrollToTop(){
            let that = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            that.scrollTop = scrollTop;
            if(that.scrollTop>1000){
                that.bttFlag = true;
            }else{
                that.bttFlag = false;
            }
        },

        timegap(date){
            let timeNow = new Date();
            let pubdate = new Date(date);

            let x = timeNow.getTime();
            let y = pubdate.getTime();
            let z = 0
            let res = x-y;

            if(res < 60000){
                return '刚刚';
            }else if(res < 3600000 && res >= 60000){
                z = Math.floor(res / 60000);
                return z.toString() + '分钟前';
            }else if (res < 86400000 && res >= 3600000){
                z = Math.floor(res / 3600000);
                return z.toString() + '小时前';
            }else if(res < 2626560000 && res >= 86400000){
                z = Math.floor(res / 86400000);
                return z.toString() + '天前'; 
            }

        },

        

        // getTime(){
        //     setTimeout(console.log(this.timeNow), 50000);
        // },

        // test(){
        //     this.$axios({
        //         //请求类型
        //         method: "GET",
        //         //url
        //         url: 'https://api.readhub.cn/topic',
        //     }).then(response=>{
        //         this.news_data = response.data;
        //         console.log(this.news_data.data);
        //     });
        // },

        topic_check(topicurl){
            let href = 'https://readhub.cn/topic/' + topicurl;
            window.open(href, '_blank');
        },

    }
}
</script>

<style scoped>
@import "../assets/css/main.css";
</style>
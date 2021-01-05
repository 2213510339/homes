/**
 * @file constants/constants.js
 * @author zhangzhe
 */

import {utils} from 'baidu-acu-react-common';
import moment from 'moment';
import 'moment/locale/zh-cn';

const Enum = utils.Enum;

export const MAX_PAGE_SIZE = 1000000;
export const INIT_PAGE_SIZE = 10;
export const DEFAULT_LIST_PARAMS = {
    pageNo: 1,
    pageSize: 10
};
let end = moment().subtract(1, 'quarters').endOf('quarter');
export const DateRanges = {
    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    '最近7天': [moment().subtract(6, 'days'), moment()],
    '上周': [moment().subtract(1, 'weeks').startOf('week'), moment().subtract(1, 'weeks').endOf('week')],
    '本月': [moment().startOf('month'), moment()],
    '上个月': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    '上个季度': [moment().subtract(1, 'quarters').startOf('quarter'), end]
};
export const STATUS_TYPE = new Enum(
    {alias: 'NORMAL', text: '一般', value: 'normal'},
    {alias: 'UNAVAILABLE', text: '无效', value: 'unavailable'},
    {alias: 'ERROR', text: '错误', value: 'error'},
    {alias: 'LOADING', text: '加载中', value: 'loading'},
    {alias: 'WARNING', text: '警告', value: 'warning'}
);
export let StatusType = new Enum(
    {alias: 'NORMAL', text: '一般', value: 'normal'},
    {alias: 'UNAVAILABLE', text: '无效', value: 'unavailable'},
    {alias: 'ERROR', text: '错误', value: 'error'},
    {alias: 'WARNING', text: '警告', value: 'warning'}
);
export const PLAN_STATUS = new Enum(
    {alias: 'ENABLED', text: '启用', value: 'ENABLED', className: STATUS_TYPE.NORMAL},
    {alias: 'DISABLED', text: '暂停', value: 'DISABLED', className: STATUS_TYPE.ERROR},
    {alias: 'EXPIRED', text: '失效', value: 'EXPIRED', className: STATUS_TYPE.UNAVAILABLE},
    {alias: 'DELETED', text: '已删除', value: 'DELETED', className: STATUS_TYPE.UNAVAILABLE},
    {alias: 'IDLE', text: '闲置', value: 'IDLE', className: STATUS_TYPE.WARNING}
);


export let AUDIT_STATUS = new Enum(
    {alias: 'IN_PROGRESS', text: '审核中', value: 'IN_PROGRESS', className: STATUS_TYPE.WARNING},
    {alias: 'PASSED', text: '审核通过', value: 'PASSED', className: STATUS_TYPE.NORMAL},
    {alias: 'FAILED', text: '审核拒绝', value: 'FAILED', className: STATUS_TYPE.ERROR}
);

export const BID_TYPE = new Enum(
    {alias: 'CPM', value: 'CPM', text: 'CPM', index: 0, units: '元/千次展现'},
    {alias: 'OCPM', value: 'OCPM', text: 'oCPM', index: 1, units: '元/点击'},
    {alias: 'CPC', value: 'CPC', text: 'CPC', index: 2, units: '元/点击'},
    {alias: 'CPD', value: 'CPD', text: 'CPD', index: 3, units: '元/下载'},
    {alias: 'CPT', value: 'CPT', text: 'CPT', index: 4, units: '元/天'}
);

export const AdviewType = new Enum(
    {alias: 'WEB', value: 'WEB', text: 'Web', index: 0},
    {alias: 'WAP', value: 'WAP', text: 'Wap', index: 1},
    {alias: 'APP', value: 'APP', text: 'App', index: 2}
);

// Fixme(chenzhengli01): exists in be and database(table idea_type_elements) at the same time
export let IDEA_TYPE = new Enum(
    {alias: 'IMAGE', value: 'IMAGE', text: '图片', index: 0, icon: 'image'},
    {alias: 'FLASH', value: 'FLASH', text: 'Flash', index: 1, icon: 'flash'},
    {alias: 'VIDEO', value: 'VIDEO', text: '视频', index: 2, icon: 'video-circle'},
    {alias: 'AUDIO', value: 'AUDIO', text: '音频', index: 3, icon: 'audio'},
    {alias: 'NATIVE', value: 'NATIVE', text: '原生', index: 4, icon: 'native-ads'},
    // For jin ri tou tiao.
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_LARGE', value: 'JIN_RI_TOU_TIAO_FEED_LP_LARGE', text: '今日头条-头条/西瓜信息流大图落地页',
        index: 5, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_SMALL', value: 'JIN_RI_TOU_TIAO_FEED_LP_SMALL', text: '今日头条-信息流小图落地页',
        index: 6, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_GROUP', value: 'JIN_RI_TOU_TIAO_FEED_LP_GROUP', text: '今日头条-信息流组图落地页',
        index: 7, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_LARGE', value: 'JIN_RI_TOU_TIAO_FEED_APP_LARGE', text: '今日头条-头条/西瓜信息流大图应用下载',
        index: 8, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_SMALL', value: 'JIN_RI_TOU_TIAO_FEED_APP_SMALL', text: '今日头条-头条信息流小图应用下载',
        index: 9, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_GROUP', value: 'JIN_RI_TOU_TIAO_FEED_APP_GROUP', text: '今日头条-头条信息流组图应用下载',
        index: 10, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_VIDEO', value: 'JIN_RI_TOU_TIAO_FEED_LP_VIDEO', text: '今日头条-头条/西瓜信息流落地页视频',
        index: 11, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_VIDEO', value: 'JIN_RI_TOU_TIAO_FEED_APP_VIDEO', text: '今日头条-头条/西瓜信息流应用下载视频',
        index: 12, icon: 'native-ads'},
    // For bike, only in fe
    {alias: 'BIKE_NATIVE', value: 'BIKE_NATIVE', text: '原生', index: 13, icon: 'native-ads'},
    // For guang dian tong
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_1136', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_1136',
        text: '联盟开屏1图2文640*1136', index: 14, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_960', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_960',
        text: '联盟开屏1图2文640*960', index: 15, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_320_480', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_320_480',
        text: '联盟开屏1图2文320*480', index: 16, icon: 'native-ads'},

    {alias: 'LIAN_MENG_NATIVE_1200_800', value: 'LIAN_MENG_NATIVE_1200_800', text: '联盟原生1200*800',
        index: 17, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_1280_720', value: 'LIAN_MENG_NATIVE_1280_720', text: '联盟原生1280*720',
        index: 18, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_1200_627', value: 'LIAN_MENG_NATIVE_1200_627', text: '联盟原生1200*627',
        index: 19, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_800_1200', value: 'LIAN_MENG_NATIVE_800_1200', text: '联盟原生800*1200',
        index: 20, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_IMAGE_DATA_VIDEO_640_360', value: 'LIAN_MENG_NATIVE_IMAGE_DATA_VIDEO_640_360',
        text: '联盟原生2图2文1视频640*360', index: 21, icon: 'native-ads'},

    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_300_250', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_300_250',
        text: '联盟插屏图片300*250', index: 22, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_600_500', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_600_500',
        text: '联盟插屏图片600*500', index: 23, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_DATA_72_72', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_DATA_72_72',
        text: '联盟插屏1图2文72*72', index: 24, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_640_960', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_640_960',
        text: '联盟插屏图片640*960', index: 25, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_320_480', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_320_480',
        text: '联盟插屏图片320*480', index: 26, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_VIDEO_600_500', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_VIDEO_600_500',
        text: '联盟插屏1图1视频600*500', index: 27, icon: 'native-ads'},

    {alias: 'LIAN_MENG_BANNER_IMAGE_640_100', value: 'LIAN_MENG_BANNER_IMAGE_640_100', text: '联盟banner图片640*100',
        index: 28, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_240_38', value: 'LIAN_MENG_BANNER_IMAGE_240_38', text: '联盟banner图片240*38',
        index: 29, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_480_75', value: 'LIAN_MENG_BANNER_IMAGE_480_75', text: '联盟banner图片480*75',
        index: 30, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_320_50', value: 'LIAN_MENG_BANNER_IMAGE_320_50', text: '联盟banner图片320*50',
        index: 31, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_DATA_72_72', value: 'LIAN_MENG_BANNER_IMAGE_DATA_72_72', text: '联盟banner1图2文72*72',
        index: 32, icon: 'native-ads'},

    {alias: 'LIAN_MENG_BANNER_DATA', value: 'LIAN_MENG_BANNER_DATA', text: '联盟banner2文',
        index: 33, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_640_960', value: 'LIAN_MENG_STARTUP_IMAGE_640_960', text: '联盟开屏图片640*960',
        index: 34, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_320_480', value: 'LIAN_MENG_STARTUP_IMAGE_320_480', text: '联盟开屏图片320*480',
        index: 35, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_640_1136', value: 'LIAN_MENG_STARTUP_IMAGE_640_1136', text: '联盟开屏图片640*1136',
        index: 36, icon: 'native-ads'},

    {alias: 'BES_NATIVE_PC_IMAGE_TEXT', value: 'BES_NATIVE_PC_IMAGE_TEXT', text: 'BES原生PC图文信息流',
        index: 37, icon: 'native-ads'},
    {alias: 'BES_NATIVE_APP_IMAGE_TEXT', value: 'BES_NATIVE_APP_IMAGE_TEXT', text: 'BES原生APP图文信息流',
        index: 38, icon: 'native-ads'}
);

export let IDEA_SLOT_TYPE_STATUS = new Enum(
    {alias: 'DISABLED', value: 'DISABLED', text: '不限制', index: 0},
    {alias: 'ENABLED', value: 'ENABLED', text: '设置', index: 1},
);

export let SLOT_TYPE = new Enum(
    {alias: 'FIXED', value: 'FIXED', text: '固定横幅'},
    {alias: 'STARTUP', value: 'STARTUP', text: '开屏'},
    {alias: 'INTERSTITIAL', value: 'INTERSTITIAL', text: '插屏'},
    {alias: 'VIDEO', value: 'VIDEO', text: '视频'},
    {alias: 'FEED', value: 'FEED', text: '信息流'},
    {alias: 'FLOATING', value: 'FLOATING', text: '悬浮横幅'}
);

export let BizImgAssetType = new Enum(
    {alias: 'iconImage', value: 1, text: 'Icon', index: 0, name: 'iconImage', type: 'img'},
    {alias: 'logoImage', value: 2, text: 'Logo', index: 1, name: 'logoImage', type: 'img'},
    {alias: 'mainImage', value: 3, text: '主图片', index: 2, name: 'mainImage', type: 'img'},
    {alias: 'mainImage2', value: 4, text: '图片二', index: 3, name: 'mainImage2', type: 'img'},
    {alias: 'mainImage3', value: 5, text: '图片三', index: 4, name: 'mainImage3', type: 'img'},
    {alias: 'mainImage4', value: 6, text: '图片四', index: 5, name: 'mainImage4', type: 'img'},
    {alias: 'mainImage5', value: 7, text: '图片五', index: 6, name: 'mainImage5', type: 'img'},
    {alias: 'mainImage6', value: 8, text: '图片六', index: 7, name: 'mainImage6', type: 'img'},
    {alias: 'mainImage7', value: 9, text: '图片七', index: 8, name: 'mainImage7', type: 'img'},
    {alias: 'mainImage8', value: 10, text: '图片八', index: 9, name: 'mainImage8', type: 'img'},
    {alias: 'mainImage9', value: 11, text: '图片九', index: 10, name: 'mainImage9', type: 'img'},
    {alias: 'mainImage10', value: 12, text: '图片十', index: 11, name: 'mainImage10', type: 'img'},
    {alias: 'flash', value: 13, text: 'Flash', index: 12, name: 'flash', type: 'flash'},
    {alias: 'video', value: 14, text: '视频', index: 13, name: 'video', type: 'video'},
    {alias: 'audio', value: 15, text: '音频', index: 14, name: 'audio', type: 'audio'},
);

export let BizDataAssetType = new Enum(
    {type: 'title', alias: 'TITLE', value: 0, text: '标题', index: 0, name: 'title', placeholder: '素材的标题'},
    {type: 'data', alias: 'SPONSORED', value: 1, text: '赞助商', index: 1, name: 'sponsored', placeholder: ''},
    {type: 'data', alias: 'DESC', value: 2, text: '描述', index: 2, name: 'desc', placeholder: '素材的描述'},
    {type: 'data', alias: 'RATING', value: 3, text: '评分', index: 3, name: 'rating', placeholder: ''},
    {type: 'data', alias: 'LIKES', value: 4, text: '好评数', index: 4, name: 'likes', placeholder: ''},
    {type: 'data', alias: 'DOWNLOADS', value: 5, text: '下载量', index: 5, name: 'downloads', placeholder: ''},
    {type: 'data', alias: 'PRICE', value: 6, text: '原始价格', index: 6, name: 'price', placeholder: ''},
    {type: 'data', alias: 'SALEPRICE', value: 7, text: '打折价格', index: 7, name: 'salePrice', placeholder: ''},
    {type: 'data', alias: 'PHONE', value: 8, text: '联系电话', index: 8, name: 'phone', placeholder: ''},
    {type: 'data', alias: 'ADDRESS', value: 9, text: '联系地址', index: 9, name: 'address', placeholder: ''},
    {type: 'data', alias: 'DESC2', value: 10, text: '补充描述', index: 10, name: 'desc2', placeholder: ''},
    {type: 'data', alias: 'DISPLAYURL', value: 11, text: '展示链接', index: 11, name: 'displayUrl', placeholder: ''},
    {type: 'data', alias: 'SOURCE', value: 13, text: '来源', index: 12, name: 'source', placeholder: '素材的来源'},
    {type: 'data', alias: 'IS_INAPP', value: 14, text: '点击后行为', index: 13, name: 'isInapp',
        placeholder: '0为系统原生打开,1为webview打开'},
    {type: 'data', alias: 'APP_TYPE', value: 15, text: 'APP的类型', index: 14, name: 'appType',
        placeholder: 'ios或android'},
    {type: 'data', alias: 'APP_NAME', value: 16, text: 'APP的名字', index: 15, name: 'appName', placeholder: ''},
    {type: 'data', alias: 'DOWNLOAD_URL', value: 17, text: 'APP下载链接', index: 16, name: 'downloadUrl',
        placeholder: '应用下载必填'},
    {type: 'data', alias: 'ITUNES_ID', value: 18, text: 'ITunes ID', index: 17, name: 'itunesId',
        placeholder: 'iOS,选填'},
    {type: 'data', alias: 'OPEN_URL', value: 19, text: '打开应用URL', index: 18, name: 'openUrl', placeholder: '选填'},
    {type: 'data', alias: 'IPA_URL', value: 20, text: 'iOS越狱链接', index: 19, name: 'ipaUrl', placeholder: 'iOS,选填'},
    {type: 'data', alias: 'PACKAGE_NAME', value: 21, text: '安卓APP包名', index: 20, name: 'packageName',
        placeholder: '选填'},
    {type: 'data', alias: 'CALL_TO_ACTION', value: 22, text: '按钮文本', index: 21, name: 'callToAction',
        placeholder: ''},
    {type: 'data', alias: 'BRAND_NAME', value: 23, text: '品牌名称', index: 22, name: 'brandName', placeholder: ''},
);

export let ImgMimes = new Enum(
    {type: 'JPG', alias: 'JPG', value: 'image/jpeg', text: 'JPG', index: 0},
    {type: 'PNG', alias: 'PNG', value: 'image/png', text: 'PNG', index: 1},
    {type: 'GIF', alias: 'GIF', value: 'image/gif', text: 'GIF', index: 2}
);

export let VideoMimes = new Enum(
    {type: 'MP4', alias: 'MP4', value: 'video/mp4', text: 'MP4', index: 0},
    {type: 'FLV', alias: 'FLV', value: 'video/x-flv', text: 'FLV', index: 1}
);

export let FlashMimes = new Enum(
    {type: 'Flash', alias: 'Flash', value: 'application/x-shockwave-flash', text: 'Flash', index: 0}
);

export let AudioMimes = new Enum(
    {type: 'MP3', alias: 'MP3', value: 'audio/mpeg', text: 'MP3', index: 0}
);
export const BILL_TYPE = new Enum(
    {alias: 'CHARGE', value: 'CHARGE', text: '消费'},
    {alias: 'RECHARGE', value: 'RECHARGE', text: '充值'},
    {alias: 'WITHDRAW', value: 'WITHDRAW', text: '退款'}
);

export let OptimizedType = new Enum(
    {alias: 'CLICK', value: 'CLICK', text: '更多点击', index: 0}
);

export let OsType = new Enum(
    {alias: 'WINDOWS', value: 'WINDOWS', text: 'Windows', diff: 'Windows', index: 0},
    {alias: 'MAC', value: 'MAC', text: 'Mac', diff: 'Mac', index: 1},
    {alias: 'LINUX', value: 'LINUX', text: 'Linux', diff: 'Linux', index: 2},
    {alias: 'IOS', value: 'IOS', text: 'iOS', diff: 'iOS', index: 3},
    {alias: 'ANDROID', value: 'ANDROID', text: 'Android', diff: 'Android', index: 4},
    {alias: 'WIN_PHONE', value: 'WIN_PHONE', text: 'Windows Phone', diff: 'Windows Phone', index: 5}
);

export let CarrierType = new Enum(
    {alias: 'DIANXIN', value: 'DIANXIN', text: '电信', diff: '电信', index: 0},
    {alias: 'YIDONG', value: 'YIDONG', text: '移动', diff: '移动', index: 1},
    {alias: 'LIANTONG', value: 'LIANTONG', text: '联通', diff: '联通', index: 2},
    {alias: 'WANGTONG', value: 'WANGTONG', text: '网通', diff: '网通', index: 3}
);

export let AdxType = new Enum(
    {alias: 'BES', value: 'bes', text: 'BES', url: 'Bes'},
    {alias: 'MEIZU', value: 'meizu', text: '魅族', url: 'Meizu'},
    {alias: 'CLOUD_ADX', value: 'cloud_adx', text: '营销云ADX', url: 'CloudAdx'},
    {alias: 'A5', value: 'a5', text: 'A5', url: 'A5'},
    {alias: 'ADROI', value: 'adroi', text: '卓易', url: 'Adroi'},
    {alias: 'JIA_TOU', value: 'jia_tou', text: '佳投', url: 'JIaTou'},
    {alias: 'JIN_RI_TOU_TIAO', value: 'jin_ri_tou_tiao', text: '今日头条', url: 'Jinritoutiao'},
    {alias: 'CLOUD_SSP', value: 'cloud_ssp', text: '营销云SSP', url: 'CLoudSsp'},
    {alias: 'WANKA', value: 'wanka', text: '玩咖', url: 'Wanka'},
    {alias: 'RUANGAO', value: 'ruanggao', text: '软告', url: 'RuanGao'},
    {alias: 'FENGHUANG', value: 'fenghuang', text: '凤凰网', url: 'FengHuangWang'},
    {alias: 'ADVIEW', value: 'adview', text: 'ADVIEW', url: 'AdView'},
    {alias: 'SMAATO', value: 'smaato', text: 'SMAATO', url: 'Smaato'},
    {alias: 'GUANG_DIAN_TONG', value: 'guangdiantong', text: '广点通', url: 'GuangDianTong'},
    {alias: 'JUGAO', value: 'jugao', text: '聚告', url: 'JuGao'},
    {alias: 'MEI_SHU', value: 'meishu', text: '美数', url: 'MeiShu'},
    {alias: 'ZHI_HU', value: 'zhihu', text: '知乎', url: 'ZhiHu'}
);

export let ConnectionType = new Enum(
    {alias: 'WIFI', value: 'WIFI', text: 'Wifi'},
    {alias: '_2G', value: '_2G', text: '2G'},
    {alias: '_3G', value: '_3G', text: '3G'},
    {alias: '_4G', value: '_4G', text: '4G'}
);

export let UserIdentificationType = new Enum(
    {alias: 'USER_ID', value: 1, text: '用户ID', index: 0},
    {alias: 'USER_TAG', value: 2, text: '用户标签', index: 1}
);

export let IdeaSlot = new Enum(
    {alias: 'BANNER', value: 'BANNER', text: '横幅'},
    {alias: 'OPEN_SCREEN', value: 'OPEN_SCREEN', text: '开屏'},
    {alias: 'INNER_SCREEN', value: 'INNER_SCREEN', text: '插屏'},
    {alias: 'VIDEO', value: 'VIDEO', text: '视频'},
    {alias: 'MESSAGE_FLOW', value: 'MESSAGE_FLOW', text: '信息流'},
    {alias: 'BIKE', value: 'BIKE', text: '单车'}
);

export let BrowserType = new Enum(
    {alias: 'IE', value: 'IE', text: 'IE', diff: 'IE', index: 0},
    {alias: 'CHROME', value: 'CHROME', text: 'Chrome', diff: 'Chrome', index: 1},
    {alias: 'FIREFOX', value: 'FIREFOX', text: 'Firefox', diff: 'Firefox', index: 2},
    {alias: 'SAFARI', value: 'SAFARI', text: 'Safari', diff: 'Safari', index: 3},
    {alias: 'OPERA', value: 'OPERA', text: 'Opera', diff: 'Opera', index: 4},
    {alias: 'EDGE', value: 'EDGE', text: 'Edge', diff: 'Edge', index: 5},
    {alias: 'WECHAT', value: 'WECHAT', text: '微信', diff: '微信', index: 6},
    {alias: 'QQ', value: 'QQ', text: 'QQ', diff: 'QQ', index: 7},
    {alias: '_360', value: '_360', text: '360', diff: '360', index: 8},
    {alias: 'UC', value: 'UC', text: 'UC', diff: 'UC', index: 9},
    {alias: 'SOUGOU', value: 'SOUGOU', text: '搜狗', diff: '搜狗', index: 10},
    {alias: 'MAXTHON', value: 'MAXTHON', text: '傲游', diff: '傲游', index: 11}
);

export const OsArray = [
    {alias: 'WINDOWS', value: 'WINDOWS', text: 'Windows', diff: 'Windows', index: 0},
    {alias: 'MAC', value: 'MAC', text: 'Mac', diff: 'Mac', index: 1},
    {alias: 'LINUX', value: 'LINUX', text: 'Linux', diff: 'Linux', index: 2},
    {alias: 'IOS', value: 'IOS', text: 'iOS', diff: 'iOS', index: 3},
    {alias: 'ANDROID', value: 'ANDROID', text: 'Android', diff: 'Android', index: 4},
    {alias: 'WIN_PHONE', value: 'WIN_PHONE', text: 'Windows Phone', diff: 'Windows Phone', index: 5}
];

export const ConnectionArray = [
    {alias: 'WIFI', value: 'WIFI', text: 'Wifi'},
    {alias: '_2G', value: '_2G', text: '2G'},
    {alias: '_3G', value: '_3G', text: '3G'},
    {alias: '_4G', value: '_4G', text: '4G'}
];

export const CarrierArray = [
    {alias: 'DIANXIN', value: 'DIANXIN', text: '电信', diff: '电信', index: 0},
    {alias: 'YIDONG', value: 'YIDONG', text: '移动', diff: '移动', index: 1},
    {alias: 'LIANTONG', value: 'LIANTONG', text: '联通', diff: '联通', index: 2},
    {alias: 'WANGTONG', value: 'WANGTONG', text: '网通', diff: '网通', index: 3}
];

export const BrowserArray = [
    {alias: 'IE', value: 'IE', text: 'IE', diff: 'IE', index: 0},
    {alias: 'CHROME', value: 'CHROME', text: 'Chrome', diff: 'Chrome', index: 1},
    {alias: 'FIREFOX', value: 'FIREFOX', text: 'Firefox', diff: 'Firefox', index: 2},
    {alias: 'SAFARI', value: 'SAFARI', text: 'Safari', diff: 'Safari', index: 3},
    {alias: 'OPERA', value: 'OPERA', text: 'Opera', diff: 'Opera', index: 4},
    {alias: 'EDGE', value: 'EDGE', text: 'Edge', diff: 'Edge', index: 5},
    {alias: 'WECHAT', value: 'WECHAT', text: '微信', diff: '微信', index: 6},
    {alias: 'QQ', value: 'QQ', text: 'QQ', diff: 'QQ', index: 7},
    {alias: '_360', value: '_360', text: '360', diff: '360', index: 8},
    {alias: 'UC', value: 'UC', text: 'UC', diff: 'UC', index: 9},
    {alias: 'SOUGOU', value: 'SOUGOU', text: '搜狗', diff: '搜狗', index: 10},
    {alias: 'MAXTHON', value: 'MAXTHON', text: '傲游', diff: '傲游', index: 11}
];

export const LevelOneDimsTreeSelect = [
    {value: 'DATE', title: '时间', key: 'DATE',
        children: [{value: 'DAY', key: 'DAY', title: '天'}, {value: 'PART', key: 'PART', title: '时段'}],
        multi: false},
    {value: 'USER', key: 'USER', title: '广告主', children: [], multi: true},
    {value: 'CREATIVE_TYPE', key: 'CREATIVE_TYPE', title: '创意类型', children: [
        {value: '1', key: 'CREATIVE1', title: 'IMAGE'},
        {value: '2', key: 'CREATIVE2', title: 'FLASH'},
        {value: '3', key: 'CREATIVE3', title: 'VIDEO'},
        {value: '4', key: 'CREATIVE4', title: 'NATIVE'},
        {value: '5', key: 'CREATIVE5', title: 'TEXT'},
        {value: '6', key: 'CREATIVE6', title: 'IMAGE_TEXT'}
    ], multi: true},
    {value: 'PROV', key: 'PROV', title: '地域', children: [], multi: true},
    {value: 'DEVICE', key: 'DEVICE', title: '设备', multi: true,
        children: [
            {value: '0', key: 'DEVICE0', title: 'PC'},
            {value: '1', key: 'DEVICE1', title: 'PHONE'},
            {value: '2', key: 'DEVICE2', title: 'TABLET'}
        ]
    },
    {value: 'ADX', key: 'ADX', title: 'ADX', children: [], multi: true},
    {value: 'ADVIEW_TYPE', key: 'ADVIEW_TYPE', title: '流量类型', children: [
        {value: '0', key: 'ADVIEW0', title: 'WEB'},
        {value: '1', key: 'ADVIEW1', title: 'WAP'},
        {value: '2', key: 'ADVIEW2', title: 'APP'}
    ], multi: true},
    {value: 'TAG_ID', key: 'TAG_ID', title: '广告位ID(全部)', children: [], multi: false}
];

export let MonitorRealtimeItem = new Enum(
    {alias: 'QPA', text: '竞价请求数', value: 'qps', unit: '次'},
    {alias: 'BIDPS', text: '参与竞价数', value: 'bidps', unit: '次'},
    {alias: 'IMPPS', text: '展现次数', value: 'impps', unit: '次'},
    {alias: 'CLICKPS', text: '点击次数', value: 'clickps', unit: '次'},
    {alias: 'COSTPS', text: '消费金额', value: 'costps', unit: '元'}
);

export const TYPE_SOURCE = new Enum(
    {alias: 'ALL', text: '全部', value: 'ALL'},
    {alias: 'SYSTEM', text: '系统内置', value: 'SYSTEM'},
    {alias: 'CUSTOM', text: '自主创建', value: 'CUSTOM'}
);
export let WordCreateType = new Enum(
    {alias: 'ALL', text: '全部', value: 'ALL'},
    {
        alias: 'SYSTEM',
        value: 'SYSTEM',
        text: '系统内置',
        index: 0
    },
    {
        alias: 'CUSTOM',
        value: '1',
        text: '自定义',
        index: 1
    }
);
export const TYPE_STATUS = new Enum(
    {alias: 'ALL', text: '全部', value: 'ALL'},
    {alias: 'ENABLED', text: '启用', value: 'ENABLED', className: STATUS_TYPE.NORMAL},
    {alias: 'DISABLED', text: '暂停', value: 'DISABLED', className: STATUS_TYPE.ERROR}
);

export const adxDetailTabConfig = {
    BES: ['report', 'userAudit', 'ideaAudit'],
    ADROI: [],
    ADVIEW: ['ideaAudit'],
    CLOUD_ADX: [],
    FENGHUANG: [],
    JIA_TOU: [],
    JIN_RI_TOU_TIAO: ['ideaAudit'],
    RUANGAO: [],
    WANKA: ['userAudit', 'ideaAudit'],
    MEIZU: [],
    A5: [],
    CLOUD_SSP: [],
    SMAATO: [],
    GUANG_DIAN_TONG: ['report', 'userAudit', 'ideaAudit'],
    JUGAO: ['report', 'ideaAudit'],
    MEI_SHU: ['userAudit', 'ideaAudit'],
    ZHI_HU: ['videoAudit', 'ideaAudit'],
    UNKNOW: []
};
export const adxTypeOptions = {
    BES: {
        besDspId: 'long',
        token: 'string',
        encryptionKey: 'string',
        integrityKey: 'string',
        enableDynamicCreative: 'boolean'
    },
    ADROI: {
        encryptionKey: 'string',
        integrityKey: 'string'
    },
    ADVIEW: {
        adviewDspId: 'string',
        channel: 'long',
        accessKey: 'string',
        encryptionKey: 'string',
        integrityKey: 'string'
    },
    CLOUD_ADX: {
        encryptionKey: 'string',
        integrityKey: 'string',
        needDirectLanding: 'boolean'
    },
    FENGHUANG: {
        priceToken: 'string'
    },
    JIA_TOU: {
        encryptionKey: 'string'
    },
    JIN_RI_TOU_TIAO: {
        userIdentification: 'int',
        accountId: 'long',
        jrttDspId: 'long',
        jrttOrderGroupId: 'long',
        token: 'string',
        encryptionKey: 'string',
        integrityKey: 'string',
        dealId: 'long'
    },
    RUANGAO: {
        priceToken: 'string'
    },
    WANKA: {
        wankaDspId: 'long',
        token: 'string',
        encryptionKey: 'string',
        integrityKey: 'string'
    },
    MEIZU: {},
    A5: {},
    CLOUD_SSP: {},
    SMAATO: {
        exchangeRate: 'float'
    },
    GUANG_DIAN_TONG: {
        gdtDspId: 'long',
        token: 'string',
        priceToken: 'string'
    },
    JUGAO: {
        jugaoDspId: 'string',
        publicKey: 'string'
    },
    MEI_SHU: {
        meishuDspId: 'long',
        token: 'string',
        priceToken: 'string'
    },
    ZHI_HU: {
        zhihuDspId: 'long',
        encryptionKey: 'string',
        integrityKey: 'string'
    }
};
export let AdxAdvertiserStatus = new Enum(
    // For Bes
    {alias: 'NOTSUBMITED', text: '未发起', value: 'NOTSUBMITED', klass: '', operate: ['audit']},
    {alias: 'AUDITING', text: '审核中', value: 'AUDITING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'PASS', text: '通过', value: 'PASS', klass: STATUS_TYPE.NORMAL, operate: []},
    {alias: 'REFUSED', text: '拒绝', value: 'REFUSED', klass: STATUS_TYPE.ERROR, operate: ['audit']},

    // For GuangDianTong
    {alias: 'PREPARING', text: '准备中', value: 'PREPARING', klass: '', operate: ['audit']},
    {alias: 'PENDING', text: '待审核', value: 'PENDING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'APPROVED', text: '通过', value: 'APPROVED', klass: STATUS_TYPE.NORMAL, operate: []},
    {alias: 'REJECTED', text: '拒绝', value: 'REJECTED', klass: STATUS_TYPE.ERROR, operate: ['audit']},
    {alias: 'CREATE_REFUSED', text: '提交失败', value: 'CREATE_REFUSED', klass: STATUS_TYPE.ERROR, operate: ['audit']},

    // for MeiShu
    {alias: 'IN_PROGRESS', text: '审核中', value: 'IN_PROGRESS', klass: StatusType.WARNING, operate: []},
    {alias: 'NOT_SUBMITED', text: '未发起', value: 'NOT_SUBMITED', klass: '', operate: ['audit']},
    {alias: 'PASSED', text: '通过', value: 'PASSED', klass: STATUS_TYPE.NORMAL, operate: []},

    // for ZhiHu
    {alias: 'REFUSE', text: '拒绝', value: 'REFUSE', klass: STATUS_TYPE.ERROR, operate: ['audit']},
    {alias: 'WAITING', text: '审核中', value: 'WAITING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'NOT_SUBMIT', text: '未发起', value: 'NOT_SUBMIT', klass: '', operate: ['audit']},

);

export let AdxCreativeStatus = new Enum(
    // For Bes
    {alias: 'NOTSUBMITED', text: '未发起', value: 'NOTSUBMITED', klass: '', operate: ['audit']},
    {alias: 'AUDITING', text: '审核中', value: 'AUDITING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'PASS', text: '通过', value: 'PASS', klass: STATUS_TYPE.NORMAL, operate: []},
    {alias: 'REFUSED', text: '拒绝', value: 'REFUSED', klass: STATUS_TYPE.ERROR, operate: ['audit']},

    // For GuangDianTong
    {alias: 'PREPARING', text: '准备中', value: 'PREPARING', klass: '', operate: ['audit']},
    {alias: 'PENDING', text: '待审核', value: 'PENDING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'APPROVED', text: '通过', value: 'APPROVED', klass: STATUS_TYPE.NORMAL, operate: []},
    {alias: 'REJECTED', text: '拒绝', value: 'REJECTED', klass: STATUS_TYPE.ERROR, operate: ['audit']},

    {alias: 'CREATE_REFUSED', text: '提交失败', value: 'CREATE_REFUSED', klass: STATUS_TYPE.ERROR, operate: ['audit']},

    // for Meishu
    {alias: 'IN_PROGRESS', text: '审核中', value: 'IN_PROGRESS', klass: StatusType.WARNING, operate: []},
    {alias: 'NOT_SUBMITED', text: '未发起', value: 'NOT_SUBMITED', klass: '', operate: ['audit']},
    {alias: 'PASSED', text: '通过', value: 'PASSED', klass: STATUS_TYPE.NORMAL, operate: []},

    // for ZhiHu
    {alias: 'REFUSE', text: '拒绝', value: 'REFUSE', klass: STATUS_TYPE.ERROR, operate: ['audit']},
    {alias: 'WAITING', text: '审核中', value: 'WAITING', klass: STATUS_TYPE.WARNING, operate: []},
    {alias: 'NOT_SUBMIT', text: '未发起', value: 'NOT_SUBMIT', klass: '', operate: ['audit']},


);
export let AdxVideoStatus = new Enum(
    {alias: 'SUCCESS', text: '上传成功', value: 'SUCCESS', klass: STATUS_TYPE.NORMAL, operate: []},
    {alias: 'FAILED', text: '上传失败', value: 'FAILED', klass: STATUS_TYPE.ERROR, operate: []},
    {alias: 'PROCESSING', text: '转码中', value: 'PROCESSING', klass: STATUS_TYPE.WARNING, operate: []}
);
export let IdeaType = new Enum(
    {alias: 'IMAGE', value: 'IMAGE', text: '图片', index: 0, icon: 'image'},
    {alias: 'FLASH', value: 'FLASH', text: 'Flash', index: 1, icon: 'flash'},
    {alias: 'VIDEO', value: 'VIDEO', text: '视频', index: 2, icon: 'video-circle'},
    {alias: 'AUDIO', value: 'AUDIO', text: '音频', index: 3, icon: 'audio'},
    {alias: 'NATIVE', value: 'NATIVE', text: '原生', index: 4, icon: 'native-ads'},
    // For jin ri tou tiao.
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_LARGE', value: 'JIN_RI_TOU_TIAO_FEED_LP_LARGE',
        text: '今日头条-头条/西瓜信息流大图落地页', index: 5, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_SMALL', value: 'JIN_RI_TOU_TIAO_FEED_LP_SMALL',
        text: '今日头条-信息流小图落地页', index: 6, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_GROUP', value: 'JIN_RI_TOU_TIAO_FEED_LP_GROUP',
        text: '今日头条-信息流组图落地页', index: 7, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_LARGE', value: 'JIN_RI_TOU_TIAO_FEED_APP_LARGE',
        text: '今日头条-头条/西瓜信息流大图应用下载', index: 8, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_SMALL', value: 'JIN_RI_TOU_TIAO_FEED_APP_SMALL',
        text: '今日头条-头条信息流小图应用下载', index: 9, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_GROUP', value: 'JIN_RI_TOU_TIAO_FEED_APP_GROUP',
        text: '今日头条-头条信息流组图应用下载', index: 10, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_LP_VIDEO', value: 'JIN_RI_TOU_TIAO_FEED_LP_VIDEO',
        text: '今日头条-头条/西瓜信息流落地页视频', index: 11, icon: 'native-ads'},
    {alias: 'JIN_RI_TOU_TIAO_FEED_APP_VIDEO', value: 'JIN_RI_TOU_TIAO_FEED_APP_VIDEO',
        text: '今日头条-头条/西瓜信息流应用下载视频', index: 12, icon: 'native-ads'},

    // For guang dian tong
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_1136', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_1136',
        text: '联盟开屏1图2文640*1136', index: 14, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_960', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_640_960',
        text: '联盟开屏1图2文640*960', index: 15, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_DATA_320_480', value: 'LIAN_MENG_STARTUP_IMAGE_DATA_320_480',
        text: '联盟开屏1图2文320*480', index: 16, icon: 'native-ads'},

    {alias: 'LIAN_MENG_NATIVE_1200_800', value: 'LIAN_MENG_NATIVE_1200_800', text: '联盟原生1200*800',
        index: 17, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_1280_720', value: 'LIAN_MENG_NATIVE_1280_720', text: '联盟原生1280*720',
        index: 18, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_1200_627', value: 'LIAN_MENG_NATIVE_1200_627', text: '联盟原生1200*627',
        index: 19, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_800_1200', value: 'LIAN_MENG_NATIVE_800_1200', text: '联盟原生800*1200',
        index: 20, icon: 'native-ads'},
    {alias: 'LIAN_MENG_NATIVE_IMAGE_DATA_VIDEO_640_360', value: 'LIAN_MENG_NATIVE_IMAGE_DATA_VIDEO_640_360',
        text: '联盟原生2图2文1视频640*360', index: 21, icon: 'native-ads'},

    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_300_250', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_300_250',
        text: '联盟插屏图片300*250', index: 22, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_600_500', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_600_500',
        text: '联盟插屏图片600*500', index: 23, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_DATA_72_72', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_DATA_72_72',
        text: '联盟插屏1图2文72*72', index: 24, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_640_960', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_640_960',
        text: '联盟插屏图片640*960', index: 25, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_320_480', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_320_480',
        text: '联盟插屏图片320*480', index: 26, icon: 'native-ads'},
    {alias: 'LIAN_MENG_INTERSTITIAL_IMAGE_VIDEO_600_500', value: 'LIAN_MENG_INTERSTITIAL_IMAGE_VIDEO_600_500',
        text: '联盟插屏1图1视频600*500', index: 27, icon: 'native-ads'},

    {alias: 'LIAN_MENG_BANNER_IMAGE_640_100', value: 'LIAN_MENG_BANNER_IMAGE_640_100', text: '联盟banner图片640*100',
        index: 28, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_240_38', value: 'LIAN_MENG_BANNER_IMAGE_240_38', text: '联盟banner图片240*38',
        index: 29, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_480_75', value: 'LIAN_MENG_BANNER_IMAGE_480_75', text: '联盟banner图片480*75',
        index: 30, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_320_50', value: 'LIAN_MENG_BANNER_IMAGE_320_50', text: '联盟banner图片320*50',
        index: 31, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_IMAGE_DATA_72_72', value: 'LIAN_MENG_BANNER_IMAGE_DATA_72_72',
        text: '联盟banner1图2文72*72', index: 32, icon: 'native-ads'},
    {alias: 'LIAN_MENG_BANNER_DATA', value: 'LIAN_MENG_BANNER_DATA', text: '联盟banner2文', index: 33, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_640_960', value: 'LIAN_MENG_STARTUP_IMAGE_640_960',
        text: '联盟开屏图片640*960', index: 34, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_320_480', value: 'LIAN_MENG_STARTUP_IMAGE_320_480', text: '联盟开屏图片320*480',
        index: 35, icon: 'native-ads'},
    {alias: 'LIAN_MENG_STARTUP_IMAGE_640_1136', value: 'LIAN_MENG_STARTUP_IMAGE_640_1136',
        text: '联盟开屏图片640*1136', index: 36, icon: 'native-ads'},

    {alias: 'BES_NATIVE_PC_IMAGE_TEXT', value: 'BES_NATIVE_PC_IMAGE_TEXT', text: 'BES原生PC图文信息流',
        index: 37, icon: 'native-ads'},
    {alias: 'BES_NATIVE_APP_IMAGE_TEXT', value: 'BES_NATIVE_APP_IMAGE_TEXT', text: 'BES原生APP图文信息流',
        index: 38, icon: 'native-ads'},
    // for 知乎
    {alias: 'ZHI_HU_FEED', value: 'ZHI_HU_FEED', text: '(知乎)随动信息流',
        index: 39, icon: 'native-ads'},
    {alias: 'ZHI_HU_GIF_KP', value: 'ZHI_HU_GIF_KP', text: '(知乎)GIF开屏',
        index: 40, icon: 'native-ads'},
    {alias: 'ZHI_HU_STATIC_KP', value: 'ZHI_HU_STATIC_KP', text: '(知乎)静态开屏',
        index: 41, icon: 'native-ads'},
    {alias: 'ZHI_HU_SAN_TU', value: 'ZHI_HU_SAN_TU', text: '(知乎)三图',
        index: 42, icon: 'native-ads'},
    {alias: 'ZHI_HU_VIDEO', value: 'ZHI_HU_VIDEO', text: '(知乎)视频',
        index: 43, icon: 'native-ads'},
    {alias: 'ZHI_HU_VIDEO_KP', value: 'ZHI_HU_VIDEO_KP', text: '(知乎)视频开屏',
        index: 44, icon: 'native-ads'},

    // for 美数
    {alias: 'MEISHU_ONE_IMG_TITLE', value: 'MEISHU_ONE_IMG_TITLE', text: '(美数)一图一文',
        index: 45, icon: 'native-ads'},
    {alias: 'MEISHU_TWO_IMG_TITLE', value: 'MEISHU_TWO_IMG_TITLE', text: '(美数)两图一文',
        index: 46, icon: 'native-ads'},
    {alias: 'MEISHU_THREE_IMG_TITLE', value: 'MEISHU_THREE_IMG_TITLE', text: '(美数)三图一文',
        index: 47, icon: 'native-ads'},
    {alias: 'MEISHU_IMG_TITLE_CONTENT', value: 'MEISHU_IMG_TITLE_CONTENT', text: '(美数)图文摘要',
        index: 48, icon: 'native-ads'},
    {alias: 'MEISHU_NATIVE_VIDEO', value: 'MEISHU_NATIVE_VIDEO', text: '(美数)原生信息流视频',
        index: 49, icon: 'native-ads'},
    {alias: 'MEISHU_AUDIO_SLICE', value: 'MEISHU_AUDIO_SLICE', text: '(美数)音频贴片',
        index: 50, icon: 'native-ads'},
    {alias: 'MEISHU_VIDEO_SLICE', value: 'MEISHU_VIDEO_SLICE', text: '(美数)激励视频',
        index: 51, icon: 'native-ads'},

    // for 一点资讯
    {alias: 'YIDIAN_FEED_BIG_IMG', value: 'YIDIAN_FEED_BIG_IMG', text: '(一点资讯)信息流展示图文类大图',
        index: 52, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_SMALL_IMG', value: 'YIDIAN_FEED_SMALL_IMG', text: '(一点资讯)信息流展示图文类小图',
        index: 53, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_IMG_GROUP', value: 'YIDIAN_FEED_IMG_GROUP', text: '(一点资讯)信息流展示图文类组图',
        index: 54, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DL_BIG_IMG', value: 'YIDIAN_FEED_DL_BIG_IMG', text: '(一点资讯)信息流下载类大图',
        index: 55, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DL_SMALL_IMG', value: 'YIDIAN_FEED_DL_SMALL_IMG', text: '(一点资讯)信息流下载类小图',
        index: 56, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DL_IMG_GROUP', value: 'YIDIAN_FEED_DL_IMG_GROUP', text: '(一点资讯)信息流下载类组图',
        index: 57, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DL_ICON', value: 'YIDIAN_FEED_DL_ICON', text: '(一点资讯)信息流下载类图标',
        index: 58, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_VIDEO', value: 'YIDIAN_FEED_VIDEO', text: '(一点资讯)信息流Video',
        index: 59, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DIAL_BIG_IMG', value: 'YIDIAN_FEED_DIAL_BIG_IMG', text: '(一点资讯)信息流电话拨打类大图',
        index: 60, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DIAL_SMALL_IMG', value: 'YIDIAN_FEED_DIAL_SMALL_IMG', text: '(一点资讯)信息流电话拨打类小图',
        index: 61, icon: 'native-ads'},
    {alias: 'YIDIAN_FEED_DIAL_IMG_GROUP', value: 'YIDIAN_FEED_DIAL_IMG_GROUP', text: '(一点资讯)信息流电话拨打类组图',
        index: 62, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_SMALL_IMG', value: 'YIDIAN_ARTICLE_SMALL_IMG', text: '(一点资讯)文章页展示图文类小图',
        index: 63, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_IMG_GROUP', value: 'YIDIAN_ARTICLE_IMG_GROUP', text: '(一点资讯)文章页展示图文类组图',
        index: 64, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_DL_SMALL_IMG', value: 'YIDIAN_ARTICLE_DL_SMALL_IMG', text: '(一点资讯)文章页下载类小图',
        index: 65, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_DIAL_BIG_IMG', value: 'YIDIAN_ARTICLE_DIAL_BIG_IMG', text: '(一点资讯)文章页电话拨打类大图',
        index: 66, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_DIAL_SMALL_IMG', value: 'YIDIAN_ARTICLE_DIAL_SMALL_IMG', text: '(一点资讯)文章页电话拨打类小图',
        index: 67, icon: 'native-ads'},
    {alias: 'YIDIAN_ARTICLE_DIAL_IMG_GROUP', value: 'YIDIAN_ARTICLE_DIAL_IMG_GROUP', text: '(一点资讯)文章页电话拨打类组图',
        index: 68, icon: 'native-ads'},

    // for 知乎
    {alias: 'ZHI_HU_BIG_IMAGE', value: 'ZHI_HU_BIG_IMAGE', text: '(知乎)大图',
        index: 69, icon: 'native-ads'},
    {alias: 'ZHI_HU_SMALL_IMAGE', value: 'ZHI_HU_SMALL_IMAGE', text: '(知乎)小图',
        index: 70, icon: 'native-ads'},
    {alias: 'ZHI_HU_TEXT', value: 'ZHI_HU_TEXT', text: '(知乎)文字',
        index: 71, icon: 'native-ads'},

    {alias: 'YIDIAN_ARTICLE_BIG_IMG', value: 'YIDIAN_ARTICLE_BIG_IMG', text: '(一点资讯)文章页展示图文类大图',
        index: 72, icon: 'native-ads'},
    {alias: 'ZHI_HU_IMAGE', value: 'ZHI_HU_IMAGE', text: '(知乎)图片',
        index: 73, icon: 'native-ads'}
    // 后续如果新增在此添加创意类型
);
export let ImageAssetType = new Enum(
    {alias: 'iconImage', value: 1, text: 'Icon', index: 0, name: 'iconImage', adxName: 'icon_img', type: 'image'},
    {alias: 'logoImage', value: 2, text: 'Logo', index: 1, name: 'logoImage', adxName: 'logo_img', type: 'image'},
    {alias: 'mainImage', value: 3, text: '主图片', index: 2, name: 'mainImage', adxName: 'main_img', type: 'image'},
    {alias: 'mainImage2', value: 4, text: '图片二', index: 3, name: 'mainImage2', adxName: 'main_img_2', type: 'image'},
    {alias: 'mainImage3', value: 5, text: '图片三', index: 4, name: 'mainImage3', adxName: 'main_img_3', type: 'image'},
    {alias: 'mainImage4', value: 6, text: '图片四', index: 5, name: 'mainImage4', adxName: 'main_img_4', type: 'image'},
    {alias: 'mainImage5', value: 7, text: '图片五', index: 6, name: 'mainImage5', adxName: 'main_img_5', type: 'image'},
    {alias: 'mainImage6', value: 8, text: '图片六', index: 7, name: 'mainImage6', adxName: 'main_img_6', type: 'image'},
    {alias: 'mainImage7', value: 9, text: '图片七', index: 8, name: 'mainImage7', adxName: 'main_img_7', type: 'image'},
    {alias: 'mainImage8', value: 10, text: '图片八', index: 9, name: 'mainImage8', adxName: 'main_img_8',
        type: 'image'},
    {alias: 'mainImage9', value: 11, text: '图片九', index: 10, name: 'mainImage9', adxName: 'main_img_9', type: 'image'},
    {alias: 'mainImage10', value: 12, text: '图片十', index: 11, name: 'mainImage10',
        adxName: 'main_img_10', type: 'image'},

    {alias: 'flash', value: 13, text: 'Flash', index: 12, name: 'flash', adxName: 'flash', type: 'flash'},
    {alias: 'video', value: 14, text: '视频', index: 13, name: 'video', adxName: 'video', type: 'video'},
    {alias: 'audio', value: 15, text: '音频', index: 14, name: 'audio', adxName: 'audio', type: 'audio'},
);

export let ImgThumbnailPriorityType = new Enum( // 缩略图优先级： 视频>主图片>图片二（二至十)>icon>logo
    {alias: 'video', value: 'video', adxName: 'video', field: 'media_cover_page', index: 0},
    {alias: 'mainImage', value: 'mainImage', adxName: 'main_img', field: 'url', index: 1},
    {alias: 'mainImage2', value: 'mainImage2', adxName: 'main_img_2', field: 'url', index: 2},
    {alias: 'mainImage3', value: 'mainImage3', adxName: 'main_img_3', field: 'url', index: 3},
    {alias: 'mainImage4', value: 'mainImage4', adxName: 'main_img_4', field: 'url', index: 4},
    {alias: 'mainImage5', value: 'mainImage5', adxName: 'main_img_5', field: 'url', index: 5},
    {alias: 'mainImage6', value: 'mainImage6', adxName: 'main_img_6', field: 'url', index: 6},
    {alias: 'mainImage7', value: 'mainImage7', adxName: 'main_img_7', field: 'url', index: 7},
    {alias: 'mainImage8', value: 'mainImage8', adxName: 'main_img_8', field: 'url', index: 8},
    {alias: 'mainImage9', value: 'mainImage9', adxName: 'main_img_9', field: 'url', index: 9},
    {alias: 'mainImage10', value: 'mainImage10', adxName: 'main_img_10', field: 'url', index: 10},
    {alias: 'iconImage', value: 'iconImage', adxName: 'icon_img', field: 'url', index: 11},
    {alias: 'logoImage', value: 'logoImage', adxName: 'logo_img', field: 'url', index: 12}
);

export let TargetingInputType = new Enum(
    {alias: 'SINGLE', value: 'SINGLE', text: '单选', index: 0},
    {alias: 'MULTIPLE', value: 'MULTIPLE', text: '多选', index: 1},
    {alias: 'FILE', value: 'FILE', text: 'txt文件', index: 2},
);

export let TargetingFilterType = new Enum(
    {alias: 'TARGET_BLOCK', value: 'TARGET_BLOCK', text: '黑/白名单', index: 0},
    {alias: 'TARGET', value: 'TARGET', text: '仅白名单', index: 1},
    {alias: 'BLOCK', value: 'BLOCK', text: '仅黑名单', index: 2},
);
export let targetingList = [
    {text: '地域', value: 'PROV'},
    {text: '日期', value: 'DATE'},
    {text: '星期', value: 'WEEK'},
    {text: '操作系统', value: 'OS_TYPE'},
    {text: '运营商', value: 'CARRIER_TYPE'},
    {text: '浏览器', value: 'BROWSER'}
    // {text: '商圈', value: 'CROWD'},
];
export let ClusterStatus = new Enum(
    {alias: 'WAITING_DEPLOY', text: '待部署', value: 'WAITING_DEPLOY',
        klass: StatusType.WARNING, operate: ['view', 'update', 'delete', 'deploy']},
    {alias: 'DEPLOYING', text: '部署中', value: 'DEPLOYING', klass: StatusType.WARNING, operate: ['view']},
    {alias: 'STOPPED', text: '已停止', value: 'STOPPED',
        klass: StatusType.UNAVAILABLE, operate: ['view', 'start', 'update', 'delete']},
    {alias: 'STARTING', text: '启动中', value: 'STARTING', klass: StatusType.WARNING, operate: ['view']},
    {alias: 'RUNNING', text: '运行中', value: 'RUNNING', klass: StatusType.NORMAL, operate: ['view', 'stop']},
    {alias: 'STOPPING', text: '停止中', value: 'STOPPING', klass: StatusType.WARNING, operate: ['view']},
    {alias: 'CHECKING', text: '监测中', value: 'CHECKING', klass: StatusType.WARNING, operate: ['view']},
    {alias: 'ABNORMAL', text: '异常', value: 'ABNORMAL',
        klass: StatusType.UNAVAILABLE, operate: ['view', 'start', 'stop', 'update', 'delete', 'deploy']}
);
export let ClusterMonitorItem = new Enum(
    {alias: 'LATENCY', text: '竞价请求平均延时', value: 'latency', unit: 'us'},
    {alias: 'LATENCY_PERCENTILES', text: '竞价请求延时分位值', value: 'latency_percentiles', unit: 'us'},
    {alias: 'QPS', text: '竞价请求QPS', value: 'qps', unit: '个/s'},
    {alias: 'CPU', text: 'cpu使用量', value: 'cpu', unit: '核数'},
    {alias: 'MEM', text: '内存使用量', value: 'mem', unit: 'Bytes'},
    {alias: 'IOREAD', text: 'IO读入量', value: 'ioread', unit: 'Bytes'},
    {alias: 'IOWRITE', text: 'IO写出量', value: 'iowrite', unit: 'Bytes'}
);
export let ClusterOpStatus = new Enum(
    {alias: 'SUCCESS', text: '成功', value: 'SUCCESS', klass: StatusType.NORMAL},
    {alias: 'FAILED', text: '失败', value: 'FAILED', klass: StatusType.ERROR}
);
export let ClusterOp = new Enum(
    {alias: 'START', text: '启动实例', value: 'start'},
    {alias: 'STOP', text: '停止实例', value: 'stop'},
    {alias: 'DEPLOY', text: '部署实例', value: 'deploy'},
    {alias: 'UPDATE', text: '更新实例', value: 'update'},
    {alias: 'DELETE', text: '删除实例', value: 'delete'}
);
export let ManualAuditStatus = new Enum(
    {alias: 'ALL', text: '全部', value: 'ALL', klass: StatusType.NORMAL, operate: []},
    {alias: 'IN_PROGRESS', text: '审核中', value: 'IN_PROGRESS', klass: StatusType.WARNING, operate: []},
    {alias: 'PASSED', text: '通过', value: 'PASSED', klass: StatusType.NORMAL, operate: []},
    {alias: 'FAILED', text: '拒绝', value: 'FAILED', klass: StatusType.ERROR, operate: []}
);
export let IdeaCommonElements = new Enum(
    {alias: 'ideaName', value: 'ideaName', text: '创意名称', index: 0},
    {alias: 'ideaType', value: 'ideaType', text: '创意类型', index: 1},
    {alias: 'ideaSlots', value: 'ideaSlots', text: '广告位', index: 2},
    {alias: 'landingPage', value: 'landingPage', text: '落地页', index: 3},
    {alias: 'impMonitorUrls', value: 'impMonitorUrls', text: '展示监控URL', index: 4},
    {alias: 'clickMonitorUrls', value: 'clickMonitorUrls', text: '点击监控URL', index: 5},
);
export let DataAssetType = new Enum(
    {alias: 'TITLE', value: 1, text: '标题', index: 0, name: 'title'},
    {alias: 'DESC', value: 2, text: '描述', index: 1, name: 'desc'},
    {alias: 'SOURCE', value: 3, text: '来源', index: 2, name: 'source'},
    {alias: 'IS_INAPP', value: 4, text: '点击后行为', index: 3, name: 'isInapp'},
    {alias: 'APP_TYPE', value: 5, text: 'APP的类型', index: 4, name: 'appType'},
    {alias: 'APP_NAME', value: 6, text: 'APP的名字', index: 5, name: 'appName'},
    {alias: 'DOWNLOAD_URL', value: 7, text: 'APP下载链接', index: 6, name: 'downloadUrl'},
    {alias: 'ITUNES_ID', value: 8, text: 'ITunes ID', index: 7, name: 'itunesId'},
    {alias: 'OPEN_URL', value: 9, text: '打开应用URL', index: 8, name: 'openUrl'},
    {alias: 'IPA_URL', value: 10, text: 'iOS越狱链接', index: 9, name: 'ipaUrl'},
    {alias: 'PACKAGE_NAME', value: 11, text: '安卓APP包名', index: 10, name: 'packageName'},
    {alias: 'RATING', value: 12, text: '评分', index: 11, name: 'rating'},
    {alias: 'LIKES', value: 13, text: '好评数', index: 12, name: 'likes'},
    {alias: 'DOWNLOADS', value: 14, text: '下载量', index: 13, name: 'downloads'},
    {alias: 'CALL_TO_ACTION', value: 15, text: '按钮文本', index: 14, name: 'callToAction'},
    {alias: 'SPONSORED', value: 16, text: '赞助商', index: 15, name: 'sponsored'},
    {alias: 'PRICE', value: 17, text: '原始价格', index: 16, name: 'price'},
    {alias: 'SALE_PRICE', value: 18, text: '打折价格', index: 17, name: 'salePrice'},
    {alias: 'PHONE', value: 19, text: '联系电话', index: 18, name: 'phone'},
    {alias: 'ADDRESS', value: 20, text: '地址', index: 19, name: 'address'},
    {alias: 'DESC2', value: 21, text: '补充描述', index: 20, name: 'desc2'},
    {alias: 'DISPLAY_URL', value: 22, text: '原始价格', index: 21, name: 'displayUrl'},
    {alias: 'BRAND_NAME', value: 23, text: '品牌名称', index: 22, name: 'brandName'}
);
export let IsInappType = new Enum(
    {value: 0, alias: 0, text: '系统原生打开', index: 0},
    {value: 1, alias: 1, text: 'webview打开', index: 1}
);
export let Advertiser_Status = new Enum(
    {alias: 'ENABLED', value: 'ENABLED', text: '启用', klass: StatusType.NORMAL},
    {alias: 'DISABLED', value: 'DISABLED', text: '暂停', klass: StatusType.UNAVAILABLE},
    {alias: 'ARREARS', value: 'ARREARS', text: '欠费', klass: StatusType.WARNING}
);
export let AdvertiserAuditStatus = new Enum(
    {alias: '', value: '', text: '全部', klass: StatusType.NORMAL},
    {alias: 0, value: 0, text: '审核通过', klass: StatusType.NORMAL},
    {alias: 2, value: 2, text: '审核未通过', klass: StatusType.UNAVAILABLE},
    {alias: 1, value: 1, text: '未审核', klass: StatusType.WARNING}
);
export let ExpStatus = new Enum(
    {alias: 'ENABLED', text: '启用中', value: 'ENABLED', klass: StatusType.NORMAL},
    {alias: 'SUCCESS', text: '成功', value: 'SUCCESS', klass: StatusType.NORMAL},
    {alias: 'FAILED', text: '失败', value: 'FAILED', klass: StatusType.ERROR},
    {alias: 'WAITING', text: '待加载', value: 'WAITING', klass: StatusType.WARNING},
    {alias: 'UPDATING', text: '待更新', value: 'UPDATING', klass: StatusType.WARNING},
    {alias: 'UNKNOWN', text: '未知', value: 'UNKNOWN', klass: StatusType.UNAVAILABLE},
    {alias: 'DISABLED', text: '暂停', value: 'DISABLED', klass: StatusType.UNAVAILABLE}
);
export let OverviewItem = new Enum(
    {alias: 'REVENUE', text: '收入', value: 'revenue', legend: '总收入', legendvalue: 'revenueSum', unit: '元',
        format: 'money', index: 0},
    {alias: 'COST', text: '支出', value: 'cost', legend: '总支出', legendvalue: 'costSum', unit: '元',
        format: 'money', index: 1},
    {alias: 'PROFIT', text: '利润', value: 'profit', legend: '总利润', legendvalue: 'profitSum', unit: '元',
        format: 'money', index: 2},
    {alias: 'PROFITRATE', text: '利润率', value: 'profitRate', legend: '平均利润率', legendvalue: 'profitRateSum',
        unit: '%', format: 'percent', index: 3},
    {alias: 'IMP', text: '展现数', value: 'imp', legend: '总展现数', legendvalue: 'impSum', unit: '次',
        format: 'frequency', index: 4},
    {alias: 'CLICK', text: '点击数', value: 'click', legend: '总点击数', legendvalue: 'clickSum', unit: '次',
        format: 'frequency', index: 5},
    {alias: 'DOWNLOAD', text: '下载数', value: 'download', legend: '总下载数', legendvalue: 'downloadSum', unit: '次',
        format: 'frequency', index: 6},
    {alias: 'CPM', text: 'CPM', value: 'cpm', legend: '平均CPM', legendvalue: 'cpmSum', unit: '元',
        format: 'money', index: 7},
    {alias: 'CPC', text: 'CPC', value: 'cpc', legend: '平均CPC', legendvalue: 'cpcSum', unit: '元',
        format: 'money', index: 8}
);
export let dashboardItem = new Enum(
    {alias: 'REVENUE', text: '收入', value: 'revenue', unit: '元'},
    {alias: 'COST', text: '支出', value: 'cost', unit: '元'},
    {alias: 'PROFIT', text: '利润', value: 'profit', unit: '元'},
    {alias: 'PROFIT_RATE', text: '利润率', value: 'profitRate', unit: '%'},
    {alias: 'IMP', text: '展现数', value: 'imp', unit: '次'},
    {alias: 'CLICK', text: '点击数', value: 'click', unit: '次'},
    {alias: 'DOWNLOAD', text: '下载数', value: 'download', unit: '次'},
    {alias: 'CPM', text: 'CPM', value: 'cpm', unit: '元'},
    {alias: 'CPC', text: 'CPC', value: 'cpc', unit: '元'}
);
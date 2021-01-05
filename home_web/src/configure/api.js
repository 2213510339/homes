/**
 * @file API接口集合
 * @author shj
 */

export default {
    // login
    userLogin: '/api/dsp/v1/auth/login',
    userLogout: '/api/dsp/v1/auth/logout',
    dspbizSystemConstants: '/api/system/constants',
    // index
    dspPaloOverviewStatistics: '/api/dsp/v3/palo/overview/statistics',
    dspOverviewAudit: '/api/dsp/v3/overview/audit',
    dspPaloDailyChart: '/api/dsp/v3/palo/daily/chart',
    dspOverviewTop: '/api/dsp/v3/overview/top',
    // report
    dspPaloStatistics: '/api/dsp/v3/palo/statistics',
    dspPaloDailyList: '/api/dsp/v3/palo/daily/list',

    dspAdvlibAdvertiserList: '/api/dsp/v1/adlib/advertiser/list',
    dspAdvlibAdvertiserDelete: '/api/dsp/v1/adlib/advertiser/delete',
    dspAdvlibAdvertiserCreate: '/api/dsp/v1/adlib/advertiser/create',
    dspAdvlibAdvertiserDetail: '/api/dsp/v1/adlib/advertiser/detail',
    dspAdvlibAdvertiserUpdate: '/api/dsp/v1/adlib/advertiser/update',

    dspClusterBidderList: '/api/dsp/v1/cluster/bidder/list',
    dspClusterBidderStop: '/api/dsp/v1/cluster/bidder/stop',
    dspClusterBidderStart: '/api/dsp/v1/cluster/bidder/start',
    dspClusterBidderDelete: '/api/dsp/v1/cluster/bidder/delete',
    dspClusterBidderCreate: '/api/dsp/v1/cluster/bidder/create',
    dspClusterBidderDetail: '/api/dsp/v1/cluster/bidder/detail',
    dspClusterBidderUpdate: '/api/dsp/v1/cluster/bidder/update',
    dspClusterBidderDeploy: '/api/dsp/v1/cluster/bidder/deploy',
    dspClusterBidderCommonDetail: '/api/dsp/v1/cluster/bidder/common/detail',
    dspClusterBidderCommonUpdate: '/api/dsp/v1/cluster/bidder/common/update',

    dspClusterOpList: '/api/dsp/v1/cluster/history/list',
    dspClustorMonitorRealtimelatency: '/api/dsp/v1/cluster/bidder/monitor/latency',
    dspClustorMonitorRealtimelatency_percentiles: '/api/dsp/v1/cluster/bidder/monitor/latency_percentiles',
    dspClustorMonitorRealtimeqps: '/api/dsp/v1/cluster/bidder/monitor/qps',
    dspClustorMonitorRealtimecpu: '/api/dsp/v1/cluster/bidder/monitor/cpu',
    dspClustorMonitorRealtimemem: '/api/dsp/v1/cluster/bidder/monitor/mem',
    dspClustorMonitorRealtimeioread: '/api/dsp/v1/cluster/bidder/monitor/ioread',
    dspClustorMonitorRealtimeiowrite: '/api/dsp/v1/cluster/bidder/monitor/iowrite',
    dspClustorMonitorFuzzyQuery: ' /api/dsp/v1/cluster/bidder/monitor/fuzzy_query',
    dspClustorMonitorFuzzyMonitor: '/api/dsp/v1/cluster/bidder/monitor/fuzzy_monitor',
    dspClustorGenerateEncryptKey: '/api/common/v1/generateEncryptKey',

    dspMonitorOverviewDaily: '/api/dsp/v1/monitor/overview/daily',
    dspMonitorOverviewDailyList: '/api/dsp/v1/monitor/overview/daily/list',
    dspMonitorFlowRegionList: '/api/dsp/v1/monitor/flow/region/provlist',
    dspMonitorFlowSiteList: '/api/dsp/v1/monitor/flow/site/list',
    dspMonitorFlowAdxList: '/api/dsp/v1/monitor/flow/adx/list',
    dspMonitorFlowAdviewList: '/api/dsp/v1/monitor/flow/adview/list',
    dspAdlibRegionConf: '/api/common/v1/regionconf',

    dspMonitorAdlibAdvertiserList: '/api/dsp/v1/monitor/adlib/advertiser/list',
    dspMonitorAdlibCreativetypeList: '/api/dsp/v1/monitor/adlib/creativetype/list',

    // 实时监控
    dspMonitorRealtimeqps: '/api/dsp/v1/monitor/rt/qps',
    dspMonitorRealtimebidps: '/api/dsp/v1/monitor/rt/bidps',
    dspMonitorRealtimeimpps: '/api/dsp/v1/monitor/rt/impps',
    dspMonitorRealtimeclickps: '/api/dsp/v1/monitor/rt/clickps',
    dspMonitorRealtimecostps: '/api/dsp/v1/monitor/rt/costps',

    // Bes
    dspAdxBesConfigDetail: '/api/dsp/v1/adx/bes/config/detail',
    dspAdxBesConfigUpdate: '/api/dsp/v1/adx/bes/config/update',
    dspAdxBesAdvertiserList: '/api/dsp/v1/adx/bes/advertiser/list',
    dspAdxBesAdvertiserSubmit: '/api/dsp/v1/adx/bes/advertiser/submit',
    dspAdxBesCreativeList: '/api/dsp/v1/adx/bes/creative/list',
    dspAdxBesCreativeSubmit: '/api/dsp/v1/adx/bes/creative/submit',
    dspAdxBesReportList: '/api/dsp/v1/adx/bes/report/rtb',

    // 今日头条
    dspAdxToutiaoConfigDetail: '/api/dsp/v1/adx/jinritoutiao/config/detail',
    dspAdxToutiaoConfigUpdate: '/api/dsp/v1/adx/jinritoutiao/config/update',
    dspAdxToutiaoCreativeList: '/api/dsp/v1/adx/jinritoutiao/creative/list',
    dspAdxToutiaoCreativeSubmit: '/api/dsp/v1/adx/jinritoutiao/creative/submit',

    // 玩咖
    dspAdxWankaConfigDetail: '/api/dsp/v1/adx/wanka/config/detail',
    dspAdxWankaConfigUpdate: '/api/dsp/v1/adx/wanka/config/update',
    dspAdxWankaAdvertiserList: '/api/dsp/v1/adx/wanka/advertiser/list',
    dspAdxWankaAdvertiserSubmit: '/api/dsp/v1/adx/wanka/advertiser/submit',
    dspAdxWankaCreativeList: '/api/dsp/v1/adx/wanka/creative/list',
    dspAdxWankaCreativeSubmit: '/api/dsp/v1/adx/wanka/creative/submit',

    // AdView
    dspAdxAdViewConfigDetail: '/api/dsp/v1/adx/adview/config/detail',
    dspAdxAdViewConfigUpdate: '/api/dsp/v1/adx/adview/config/update',
    dspAdxAdViewCreativeList: '/api/dsp/v1/adx/adview/creative/list',
    dspAdxAdViewCreativeSubmit: '/api/dsp/v1/adx/adview/creative/submit',

    // 广点通
    // dspAdxGuangDianTongConfigDetail: '/api/dsp/v3/adx/guangdiantong/config/detail',
    // dspAdxGuangDianTongConfigUpdate: '/api/dsp/v3/adx/guangdiantong/config/update',
    dspAdxGuangDianTongAdvertiserList: '/api/dsp/v3/adx/guangdiantong/advertiser/list',
    dspAdxGuangDianTongAdvertiserSubmit: '/api/dsp/v3/adx/guangdiantong/advertiser/submit',
    dspAdxGuangDianTongCreativeList: '/api/dsp/v3/adx/guangdiantong/creative/list',
    dspAdxGuangDianTongCreativeSubmit: '/api/dsp/v3/adx/guangdiantong/creative/submit',
    dspAdxGuangDianTongReportList: '/api/dsp/v3/adx/guangdiantong/report/rtb',

    // 聚告
    dspAdxJuGaoCreativeList: '/api/dsp/v3/adx/jugao/creative/list',
    dspAdxJuGaoCreativeSubmit: '/api/dsp/v3/adx/jugao/creative/submit',
    dspAdxJuGaoReportList: '/api/dsp/v3/adx/jugao/report/rtb',

    dspAdxList: '/api/dsp/v1/adx/list',
    dspAdxConfigList: '/api/dsp/v1/adx/config/list',
    dspAdxConfigDelete: '/api/dsp/v1/adx/config/delete',
    dspAdxConfigCreate: '/api/dsp/v1/adx/config/create',

    dspAuditCreativeList: '/api/dsp/v1/audit/creative/list',
    dspAuditCreativeAudit: '/api/dsp/v1/audit/creative/audit',
    dspAuditCreativeAuditV3: '/api/dsp/v3/audit/creative/audit',
    dspAuditCreativeDetail: '/api/dsp/v1/audit/creative/detail',
    dspAuditCreativeDetailV3: '/api/dsp/v3/audit/creative/detail',
    dspAuditIdeaDetail: '/api/dsp/v1/audit/idea/detail',
    dspAuditMessageList: '/api/dsp/v1/audit/failMsg/list',
    dspAuditMessageListV3: '/api/dsp/v3/audit/failMsg/list',
    dspAuditMessageCreate: '/api/dsp/v1/audit/failMsg/create',
    dspAuditMessageUpdate: '/api/dsp/v1/audit/failMsg/update',
    dspAuditMessageDelete: '/api/dsp/v1/audit/failMsg/delete',
    dspAuditMessageAll: '/api/dsp/v1/audit/failMsg/all',
    dspUserList: '/api/dsp/v3/adlib/user/list',
    dspAuditCreativeCount: '/api/dsp/v3/audit/creative/count',
    dspAuditLogList: '/api/dsp/v3/audit/log/list',

    dspAuditAdvertiserList: '/api/dsp/v3/audit/advertiser/list',
    dspAuditAdvertiserAuditV3: '/api/dsp/v3/audit/advertiser/audit',
    dspAuditAdvertiserDetailV3: '/api/dsp/v3/audit/advertiser/detail',

    dspExperimentLayersList: '/api/dsp/v1/experiment/layers/list',
    dspExperimentLayersDelete: '/api/dsp/v1/experiment/layers/delete',
    dspExperimentLayersCreate: '/api/dsp/v1/experiment/layers/create',
    dspExperimentLayersDetail: '/api/dsp/v1/experiment/layers/detail',
    dspExperimentLayersUpdate: '/api/dsp/v1/experiment/layers/update',
    dspExperimentExpsCreate: '/api/dsp/v1/experiment/exps/create',
    dspExperimentExpsDelete: '/api/dsp/v1/experiment/exps/delete',
    dspExperimentExpsUpdate: '/api/dsp/v1/experiment/exps/update',
    dspExperimentExpsDetail: '/api/dsp/v1/experiment/exps/detail',
    dspExperimentMonitorDiff: '/api/dsp/v1/experiment/monitor/diff',
    dspExperimentLayersArgs: '/api/dsp/v1/experiment/layers/args',
    dspExperimentExpsFlags: '/api/dsp/v1/experiment/exps/flags',

    dspExperimentMonitorDetail: '/api/dsp/v1/experiment/monitor/detail',

    dspSystemOperationUpdate: '/api/dsp/v3/system/operation/update',
    dspSystemOperationDetail: '/api/dsp/v3/system/operation/detail',

    dspSystemCustomizationUpdate: '/api/dsp/v3/system/customization/update',
    dspSystemCustomizationDetail: '/api/dsp/v3/system/customization/detail',

    dspDashboardDailyChart: '/api/dsp/v3/dashboard/daily/chart',
    dspDashboardDailyList: '/api/dsp/v3/dashboard/daily/list',
    dspDashboardStatistics: '/api/dsp/v3/dashboard/statistics',

    dspOverviewStatistics: '/api/dsp/v3/overview/statistics',
    dspOverviewPolygon: '/api/dsp/v3/overview/polygon',

    dspDashboardFinanceChart: '/api/dsp/v3/dashboard/finance/chart',
    dspDashboardMetricList: '/api/dsp/v3/dashboard/metric/list',

    dspDashboardDimensionChart: '/api/dsp/v3/dashboard/dimension/chart',

    dspDashboardAdvertiserList: '/api/dsp/v3/adlib/user/list',
    dspDashboardAdxList: '/api/dsp/v1/adx/valid',

    dspDashboardDailyListDownload: '/api/dsp/v3/dashboard/daily/list/download',
    dspSystemconf: '/api/common/v1/systemconf',
    dspAuditMessageCreateV3: '/api/dsp/v3/audit/failMsg/create',

    // ADX
    dspAdxTypeListV3: '/api/dsp/v3/adx/type/list',
    dspAdxListV3: '/api/dsp/v3/adx/list',
    dspAdxDetailV3: '/api/dsp/v3/adx/detail',
    dspAdxCreateV3: '/api/dsp/v3/adx/create',
    dspAdxDeleteV3: '/api/dsp/v3/adx/delete',
    dspAdxEnable: '/api/dsp/v3/adx/enable',
    dspAdxDisable: '/api/dsp/v3/adx/disable',
    dspAdxUpdate: '/api/dsp/v3/adx/update',

    // 系统设置 - 自定义定向
    dspTargetingCreate: '/api/common/v3/targeting/create',
    dspTargetingUpdate: '/api/common/v3/targeting/update',
    dspTargetingList: '/api/common/v3/targeting/list',
    dspTargetingDelete: '/api/common/v3/targeting/delete',
    dspTargetingEnable: '/api/common/v3/targeting/start',
    dspTargetingDisable: '/api/common/v3/targeting/stop',
    dspTargetingDetail: '/api/common/v3/targeting/detail',
    dspTargetingStatistic: '/api/common/v3/targeting/statistic',
    dspSystemTargetingDetail: '/api/dsp/v3/system/targeting/detail',
    dspSystemTargetingUpdate: '/api/dsp/v3/system/targeting/update',

    dspAdlibIdeaQueryV3: '/api/dsp/v3/adlib/idea/query',
    dspDebugStart: '/api/dsp/v1/debug/start',
    dspDebugFilter: '/api/dsp/v1/debug/filter',
    dspDebugDumpGap: '/api/dsp/v1/debug/dump/gap',
    // 系统设置 - 创意类型
    dspIdeaTypeCreate: '/api/dsp/v3/adlib/idea/elements/create',
    dspIdeaTypeUpdate: '/api/dsp/v3/adlib/idea/elements/update',
    dspIdeaTypeList: '/api/dsp/v3/adlib/idea/elements/list',
    dspIdeaTypeDelete: '/api/dsp/v3/adlib/idea/elements/delete',
    dspIdeaTypeEnable: '/api/dsp/v3/adlib/idea/elements/enable',
    dspIdeaTypeDisable: '/api/dsp/v3/adlib/idea/elements/disable',
    dspIdeaTypeDetail: '/api/dsp/v3/adlib/idea/elements/detail',

    // 自定义统计
    dspCustomReportCreate: '/api/dsp/v3/report/task/create',
    dspCustomReportCheck: '/api/dsp/v3/report/task/check',
    dspCustomReportQuery: '/api/dsp/v3/report/task/query',
    dspCustomReportDownload: '/api/dsp/v3/report/task/download',
    dspReportTemplateCreate: '/api/dsp/v3/report/template/create',
    dspReportTemplateUpdate: '/api/dsp/v3/report/template/update',
    dspReportTemplateDetail: '/api/dsp/v3/report/template/detail',
    dspReportTemplateList: '/api/dsp/v3/report/template/list',
    dspReportTemplateDelete: '/api/dsp/v3/report/template/delete',
    dspReportTemplateAll: '/api/dsp/v3/report/template/all',

    // 系统设置 - 动态词包
    dspWordBagList: '/api/dsp/v3/adlib/word/list',
    dspWordBagEnable: '/api/dsp/v3/adlib/word/enable',
    dspWordBagDisable: '/api/dsp/v3/adlib/word/disable',
    dspWordBagDelete: '/api/dsp/v3/adlib/word/delete',
    dspWordBagCreate: '/api/dsp/v3/adlib/word/create',
    dspWordBagUpdate: '/api/dsp/v3/adlib/word/update',
    dspWordBagDetail: '/api/dsp/v3/adlib/word/detail',

    dspAdlibUnitConfigRegion: '/api/common/v1/regionconf',
    dspAdlibUnitConfigBusinessCenter: '/api/common/v1/businesscenter/conf',

    dspExperimentLayersListV3: '/api/dsp/v3/experiment/layers/list',
    dspExperimentLayersAllV3: '/api/dsp/v3/experiment/layers/all',
    dspExperimentLayersDetailV3: '/api/dsp/v3/experiment/layers/detail',
    dspExperimentLayersCreateV3: '/api/dsp/v3/experiment/layers/create',
    dspExperimentLayersUpdateV3: '/api/dsp/v3/experiment/layers/update',
    dspExperimentMonitorDetailV3: '/api/dsp/v3/experiment/monitor/detail',
    dspExperimentMonitorDiffV3: '/api/dsp/v3/experiment/monitor/diff',
    dspExperimentLayersDeleteV3: '/api/dsp/v3/experiment/layers/delete',
    dspExperimentLayersDisableV3: '/api/dsp/v3/experiment/layers/disable',
    dspExperimentLayersEnableV3: '/api/dsp/v3/experiment/layers/enable',
    dspExperimentLayersStopV3: '/api/dsp/v3/experiment/layers/stop',
    dspExperimentLayersStartV3: '/api/dsp/v3/experiment/layers/start',

    dspPaloDailyListDownload: '/api/dsp/v3/palo/daily/list/download',
    dspPaloFinanceChart: '/api/dsp/v3/palo/finance/chart',
    dspPaloMetricList: '/api/dsp/v3/palo/metric/list',
    dspPaloDimensionChart: '/api/dsp/v3/palo/dimension/chart'
};

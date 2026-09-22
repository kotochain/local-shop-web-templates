/**
 * 行业配置：一套模板，5 个行业版本。
 *
 * 客户只需要改这个文件就能换行业：
 *   1. 改文案（companyName / slogan / heroSub / trustBadges / services / cases / testimonials / contact）
 *   2. 改配色（theme 里的 9 个色值，会注入到页面根节点的 CSS 变量上）
 *   3. 想新增行业：复制一个对象，改 id 后加进 industries 数组即可。
 *
 * 字段说明：
 *   id          URL 标识，通过 ?industry=renovation 访问
 *   name        行业名称（用于切换器与后台识别）
 *   short       切换器上的短标签
 *   companyName 公司 / 门店名称
 *   slogan      一句话价值主张（首屏大标题）
 *   heroSub     首屏副标题
 *   trustBadges 首屏信任标签
 *   theme       配色（brand 主色 / brandDark 深色 / brandSoft 浅色 / accent 点缀 / bg 背景 / cardBg 卡片 / text 正文 / muted 次要 / border 描边）
 *   services    服务项目（4 个）
 *   cases       案例展示（6 个）
 *   testimonials 客户评价（3 条）
 *   contact     联系方式
 */

const renovation = {
  id: 'renovation',
  name: '装修装饰',
  short: '装修',
  companyName: '鼎盛装饰工程',
  slogan: '一次装修，住得安心十年',
  heroSub:
    '专注整体家装与局部改造 12 年，自有设计团队与施工队，报价一次给全、过程零增项，水电隐蔽工程质保 5 年。',
  trustBadges: ['已服务 1200+ 客户', '自有施工队 86 人', '水电质保 5 年', '零增项承诺'],
  theme: {
    brand: '#A9643B',
    brandDark: '#7A4425',
    brandSoft: '#F3E4D6',
    accent: '#C97B3C',
    bg: '#FBF8F5',
    cardBg: '#FFFFFF',
    text: '#2B2119',
    muted: '#7A6A5C',
    border: '#EAE0D6',
  },
  services: [
    {
      title: '整体家装',
      desc: '从量房、设计到施工交付一站式负责，含主材选型与预算控制，毛坯到拎包入住最快 45 天。',
      emoji: '🏠',
    },
    {
      title: '局部改造',
      desc: '厨房翻新、卫生间改造、旧房刷新，不动结构也能焕然一新，最快 7 天完工，完工即入住。',
      emoji: '🔨',
    },
    {
      title: '水电工程',
      desc: '强弱电分离、走顶不走地，全程拍照留档并出具水电走向图，隐蔽工程质保 5 年。',
      emoji: '⚡',
    },
    {
      title: '免费量房',
      desc: '设计师上门实测尺寸，出具平面方案与精准报价单，量房不满意不收取任何费用。',
      emoji: '📐',
    },
  ],
  cases: [
    {
      title: '南山·现代简约三居',
      desc: '108㎡ 三居，打通客厅与阳台，全屋无主灯设计，工期 52 天，客户自住至今零返修。',
      tag: '整体家装',
    },
    {
      title: '福田·老房全屋翻新',
      desc: '20 年旧房翻新，重排水电、拆改格局，保留原木地板，预算控制在 18 万以内。',
      tag: '旧房改造',
    },
    {
      title: '罗湖·厨房卫生间改造',
      desc: '7 天完成厨卫翻新，独立防水闭水试验 48 小时，交付后 1 年内无渗漏反馈。',
      tag: '局部改造',
    },
    {
      title: '宝安·新中式四居',
      desc: '定制整墙收纳与实木线条，木作全部工厂预制现场拼装，工期压缩 12 天。',
      tag: '整体家装',
    },
    {
      title: '龙华·小户型扩容',
      desc: '56㎡ 两居改三居，利用层高做收纳夹层，实测使用面积提升 21%。',
      tag: '空间优化',
    },
    {
      title: '龙岗·别墅整装',
      desc: '三层别墅整装，含中央空调与全屋智能布线，分阶段验收 6 次，一次交付。',
      tag: '别墅整装',
    },
  ],
  testimonials: [
    {
      name: '陈先生',
      role: '南山·108㎡ 三居业主',
      content:
        '对比了 4 家公司，只有鼎盛敢把材料品牌和单价写进报价单。施工期间每天发进度照片，最后结算和最初报价一分不差。',
      stars: 5,
    },
    {
      name: '李女士',
      role: '福田·老房翻新业主',
      content:
        '老房子问题多，设计师帮我们重新排了水电和动线，住了半年越住越顺手。有问题打电话，当天就有人上门处理。',
      stars: 5,
    },
    {
      name: '王经理',
      role: '某科技公司行政负责人',
      content:
        '办公室装修给了三套方案可选，施工全程没影响我们正常办公，工期比合同约定的还提前了 4 天。',
      stars: 4,
    },
  ],
  contact: {
    phone: '0755-8888 6666',
    wechat: '鼎盛装饰（微信号：dszs_8888）',
    address: '深圳市南山区科技园南路 88 号鼎盛大厦 2 楼',
    license: '营业执照号：91440300MA5XXXXXXX',
  },
};

const law = {
  id: 'law',
  name: '律师事务所',
  short: '律所',
  companyName: '正衡律师事务所',
  slogan: '专业，守护您的每一分权益',
  heroSub:
    '民商事诉讼、合同审查、劳动仲裁、企业法律顾问。执业律师平均从业 10 年以上，一案一策，收费透明、先评估后签约。',
  trustBadges: ['执业律师 32 位', '累计办案 2600+ 件', '胜诉率 92%', '首咨询免费'],
  theme: {
    brand: '#1B2A4A',
    brandDark: '#121E36',
    brandSoft: '#E8ECF3',
    accent: '#C9A227',
    bg: '#F7F8FA',
    cardBg: '#FFFFFF',
    text: '#16202F',
    muted: '#6B7484',
    border: '#E2E6EE',
  },
  services: [
    {
      title: '民商事诉讼',
      desc: '合同纠纷、债权债务、房产争议、股权纠纷，从证据梳理到出庭全程代理，先评估胜诉可能再签约。',
      emoji: '⚖️',
    },
    {
      title: '合同审查',
      desc: '起草与审查各类商务合同，标注风险条款并给出修改建议，常规合同 24 小时内交付。',
      emoji: '📄',
    },
    {
      title: '劳动仲裁',
      desc: '违法解除、加班费、工伤赔偿、竞业限制，代理仲裁与诉讼全流程，劳动者与企业双向服务。',
      emoji: '👥',
    },
    {
      title: '企业法律顾问',
      desc: '年度顾问服务：日常法律咨询、制度合规体检、函件代发，按月出具风险提示报告。',
      emoji: '🏢',
    },
  ],
  cases: [
    {
      title: '买卖合同纠纷追款',
      desc: '为制造企业追回拖欠货款 386 万元，从立案到执行回款仅用时 4 个月。',
      tag: '民商事诉讼',
    },
    {
      title: '群体性劳动仲裁',
      desc: '代理 27 名员工集体仲裁，最终调解结案，人均获赔金额高于初始诉求 15%。',
      tag: '劳动仲裁',
    },
    {
      title: '股权转让纠纷',
      desc: '梳理三年往来账目与股东会决议，成功主张股权转让协议无效，为客户挽回损失 520 万元。',
      tag: '股权纠纷',
    },
    {
      title: '连锁品牌合同体系搭建',
      desc: '为连锁餐饮品牌定制加盟合同、供应链协议模板库，年度合同纠纷数量下降 70%。',
      tag: '法律顾问',
    },
    {
      title: '知识产权侵权维权',
      desc: '取证 40 余处侵权销售链接，诉前调解下架全部侵权商品并获赔 62 万元。',
      tag: '知识产权',
    },
    {
      title: '建筑工程款纠纷',
      desc: '通过司法鉴定确认工程量，二审改判支持全部工程款及利息共计 1180 万元。',
      tag: '建筑工程',
    },
  ],
  testimonials: [
    {
      name: '周先生',
      role: '某制造企业负责人',
      content:
        '货款拖了两年，正衡接手后先帮我们把证据链补齐，四个月就执行到位。最难得的是每一步都会提前告诉我们可能的风险。',
      stars: 5,
    },
    {
      name: '刘女士',
      role: '劳动争议当事人',
      content:
        '被违法辞退那会儿很无助，律师把能主张的每一项都算得清清楚楚，最后调解拿到的比我预想的多不少。',
      stars: 5,
    },
    {
      name: '吴总',
      role: '连锁餐饮品牌创始人',
      content:
        '签了年度顾问之后，合同先过法务再盖章，这两年基本没再出过纠纷。费用固定，预算很好控。',
      stars: 4,
    },
  ],
  contact: {
    phone: '0755-8826 1188',
    wechat: '正衡律所（微信号：zhengheng_law）',
    address: '深圳市福田区中心四路 1 号嘉里建设广场 T3 座 22 层',
    license: '执业许可证号：31440300MDXXXXXXX',
  },
};

const photography = {
  id: 'photography',
  name: '摄影工作室',
  short: '摄影',
  companyName: '拾光映像摄影工作室',
  slogan: '把这一刻，拍成值得收藏的样子',
  heroSub:
    '婚纱摄影、商业产品、人像写真、活动跟拍。独立摄影师一对一服务，全画幅设备拍摄，底片全送，精修不满意重修。',
  trustBadges: ['拍摄 3000+ 场次', '独立摄影师 8 位', '底片全送', '精修不满意重修'],
  theme: {
    brand: '#1A1A1A',
    brandDark: '#080808',
    brandSoft: '#2E2E2E',
    accent: '#E4E4E4',
    bg: '#141414',
    cardBg: '#1E1E1E',
    text: '#F5F5F5',
    muted: '#9A9A9A',
    border: '#2E2E2E',
  },
  services: [
    {
      title: '婚纱摄影',
      desc: '全天跟拍 + 外景双机位，含造型指导与精修 60 张，底片全部赠送，支持异地拍摄。',
      emoji: '💍',
    },
    {
      title: '商业产品',
      desc: '静物棚拍与场景图，含白底图、详情图、短视频素材，电商与品牌方长期合作可签年框。',
      emoji: '📷',
    },
    {
      title: '人像写真',
      desc: '个人形象照、闺蜜写真、全家福，摄影师现场引导动作，不用摆拍也能拍出自然状态。',
      emoji: '🎞️',
    },
    {
      title: '活动跟拍',
      desc: '发布会、年会、展会、婚礼纪实，双机位覆盖，48 小时内出精修预览图。',
      emoji: '🎬',
    },
  ],
  cases: [
    {
      title: '海岸线婚纱外景',
      desc: '黄昏时段逆光拍摄，双机位 6 小时跟拍，交付精修 82 张，客户二刷推荐 3 对新人。',
      tag: '婚纱摄影',
    },
    {
      title: '轻奢饰品产品图',
      desc: '棚拍 + 场景图共 120 张，统一冷调光影，直接用于详情页与小红书投放。',
      tag: '商业产品',
    },
    {
      title: '职场形象照系列',
      desc: '为 40 人团队拍摄统一形象照，含妆造与后期统一调色，半天完成全部拍摄。',
      tag: '人像写真',
    },
    {
      title: '品牌发布会纪实',
      desc: '新品发布会全程跟拍，双机位 5 小时，当日出 30 张速修图供媒体发稿。',
      tag: '活动跟拍',
    },
    {
      title: '家庭纪实一日',
      desc: '上门记录一天生活日常，不摆拍不设限，交付 200+ 张底片与 45 张精修。',
      tag: '家庭纪实',
    },
    {
      title: '咖啡品牌空间图',
      desc: '门店自然光拍摄，兼顾空间氛围与菜单产品，成片用于大众点评与外卖平台。',
      tag: '空间摄影',
    },
  ],
  testimonials: [
    {
      name: '林小姐',
      role: '婚纱照客户',
      content:
        '本来就很不自然，摄影师一直在聊天引导，最后选片的时候几乎每张都想留。底片当天就拷给我们了。',
      stars: 5,
    },
    {
      name: '赵女士',
      role: '某饰品品牌主理人',
      content:
        '图拍完直接上架，转化率比之前自己拍的高了一截。现在每季度新品都会约他们，风格也稳定。',
      stars: 5,
    },
    {
      name: '孙先生',
      role: '科技公司市场负责人',
      content:
        '发布会当晚就拿到了速修图，赶上了第二天一早的发稿节奏，沟通效率非常高。',
      stars: 4,
    },
  ],
  contact: {
    phone: '0755-8633 2020',
    wechat: '拾光映像（微信号：shiguang_image）',
    address: '深圳市南山区蛇口价值工厂 B 栋 305 室',
    license: '营业执照号：91440300MA5YYYYYYY',
  },
};

const training = {
  id: 'training',
  name: '培训机构',
  short: '培训',
  companyName: '知行学堂',
  slogan: '让每一次学习，都看得见成长',
  heroSub:
    '少儿编程、成人英语、职业技能、1v1 辅导。小班制 8 人封顶，全职教师 + 学情周报，首次课不满意全额退款。',
  trustBadges: ['在读学员 3800+', '全职教师 120 位', '平均提分 26 分', '不满意可退费'],
  theme: {
    brand: '#2563EB',
    brandDark: '#1D4ED8',
    brandSoft: '#E6EEFF',
    accent: '#0EA5A4',
    bg: '#F7F9FD',
    cardBg: '#FFFFFF',
    text: '#14203A',
    muted: '#64748B',
    border: '#E3E9F5',
  },
  services: [
    {
      title: '少儿编程',
      desc: 'Scratch 入门到 Python 进阶，项目式教学，每学期完成 4 个可展示作品，含赛事辅导。',
      emoji: '🧩',
    },
    {
      title: '成人英语',
      desc: '口语、职场商务、考级冲刺三类班型，外教 + 中教双师，每周 3 次开口练习打卡。',
      emoji: '🔤',
    },
    {
      title: '职业技能',
      desc: '数据分析、短视频运营、电商实操，课程对接真实项目，结课即可产出作品集。',
      emoji: '📈',
    },
    {
      title: '1v1 辅导',
      desc: '按学情诊断定制提分方案，匹配同层次教师，每周出具学情报告并向家长同步。',
      emoji: '🎯',
    },
  ],
  cases: [
    {
      title: '少儿编程暑期班',
      desc: '48 名学员完成 4 个作品，12 人晋级市级创意编程大赛，家长满意度 98%。',
      tag: '少儿编程',
    },
    {
      title: '成人英语口语突破',
      desc: '24 周小班课，学员平均口语评测等级提升 2 档，6 人通过外企面试。',
      tag: '成人英语',
    },
    {
      title: '中考冲刺 1v1',
      desc: '30 名初三学员平均提分 26 分，最高单科提升 41 分，全部达成目标校分数线。',
      tag: '1v1 辅导',
    },
    {
      title: '数据分析就业班',
      desc: '4 个月全日制实训，结课学员 3 个月内就业率 86%，平均薪资涨幅 32%。',
      tag: '职业技能',
    },
    {
      title: '短视频运营实操营',
      desc: '带学员从 0 起号，结课时人均账号涨粉 2000+，2 名学员实现首月变现。',
      tag: '职业技能',
    },
    {
      title: '小学奥数思维班',
      desc: '8 人小班分层教学，一学期后校内数学平均分提升 12 分，续报率 91%。',
      tag: '素养课程',
    },
  ],
  testimonials: [
    {
      name: '张女士',
      role: '六年级学生家长',
      content:
        '最满意的是每周的学情报告，哪些知识点没掌握写得明明白白。孩子从抗拒编程到主动做作品，变化挺大的。',
      stars: 5,
    },
    {
      name: '何先生',
      role: '成人英语学员',
      content:
        '上班族最怕坚持不下来，这里的打卡机制和老师跟进很到位，半年下来开会终于敢开口了。',
      stars: 5,
    },
    {
      name: '郭同学',
      role: '数据分析就业班学员',
      content:
        '课程全是真实项目，面试时直接拿作品集讲，两周就拿到了 offer，比自己摸索快太多。',
      stars: 4,
    },
  ],
  contact: {
    phone: '0755-8654 7788',
    wechat: '知行学堂（微信号：zhixing_xuetang）',
    address: '深圳市南山区粤海街道科苑路 15 号科兴科学园 C 栋 4 层',
    license: '办学许可证号：教民 144030570000XXX',
  },
};

const restaurant = {
  id: 'restaurant',
  name: '餐饮门店',
  short: '餐饮',
  companyName: '老灶记·柴火菜',
  slogan: '一口热菜，一份家里的味道',
  heroSub:
    '每日现炒、食材当天直采，招牌柴火土鸡日均售出 200 份。堂食大厅、独立包间、团餐宴席、外卖配送全支持。',
  trustBadges: ['开业 8 年', '日均接待 300+ 位', '大众点评 4.8 分', '独立包间 6 间'],
  theme: {
    brand: '#C0392B',
    brandDark: '#96281B',
    brandSoft: '#F7E7D5',
    accent: '#E8A33D',
    bg: '#FFFBF5',
    cardBg: '#FFFFFF',
    text: '#33241C',
    muted: '#7C6A5C',
    border: '#F0E2D2',
  },
  services: [
    {
      title: '招牌柴火菜',
      desc: '柴火土鸡、腊味合蒸、手工豆腐等 38 道家常热菜，明档现炒，食材当天直采不隔夜。',
      emoji: '🍲',
    },
    {
      title: '就餐环境',
      desc: '大厅 42 桌 + 卡座区，复古砖墙与暖光照明，适合家庭聚餐与朋友小聚。',
      emoji: '🪑',
    },
    {
      title: '包间预订',
      desc: '6 间独立包间，可容纳 8-20 人，配独立空调与投影，商务宴请、生日聚会可选套餐。',
      emoji: '🏮',
    },
    {
      title: '外卖配送',
      desc: '3 公里内 30 分钟送达，保温包装 + 密封餐盒，支持团餐配送与定点自提。',
      emoji: '🛵',
    },
  ],
  cases: [
    {
      title: '招牌柴火土鸡',
      desc: '散养土鸡配柴火慢炖 40 分钟，日均售出 200 份，大众点评推荐菜第一名。',
      tag: '招牌菜',
    },
    {
      title: '大厅堂食区',
      desc: '42 张餐桌分区排布，高峰等位不超过 15 分钟，翻台与安静区互不干扰。',
      tag: '就餐环境',
    },
    {
      title: '20 人家庭包间',
      desc: '独立包间配圆桌与投影，可办生日宴与家宴，含专属服务员与套餐定制。',
      tag: '包间',
    },
    {
      title: '企业团餐配送',
      desc: '为园区 12 家企业提供日常团餐，日均 400 份，准时送达率 99.2%。',
      tag: '团餐',
    },
    {
      title: '外卖爆品套餐',
      desc: '两荤一素一人食套餐，月销 6800 单，保温包装好评率 96%。',
      tag: '外卖',
    },
    {
      title: '腊味年礼礼盒',
      desc: '年节礼盒含自制腊味与手工酱菜，单季售出 3000 盒，支持企业团购定制。',
      tag: '节日礼盒',
    },
  ],
  testimonials: [
    {
      name: '黄先生',
      role: '周边社区居民',
      content:
        '带家里人来吃了三年，菜量实在、口味稳定，孩子就认这口柴火鸡。老板记得我们的口味偏好。',
      stars: 5,
    },
    {
      name: '徐女士',
      role: '企业行政',
      content:
        '公司聚餐订了最大的包间，菜是提前配好的套餐，上菜节奏控制得很好，结束后还帮忙打包。',
      stars: 5,
    },
    {
      name: '范先生',
      role: '外卖常客',
      content:
        '点过几十次外卖，包装一直很稳，送到还是热的。出餐快，午高峰基本 20 多分钟就到。',
      stars: 4,
    },
  ],
  contact: {
    phone: '0755-2661 5577',
    wechat: '老灶记订餐（微信号：laozaoji_dingcan）',
    address: '深圳市南山区南山大道 1088 号南园枫叶大厦 1 层 102 号',
    license: '营业执照号：91440300MA5ZZZZZZZ',
  },
};

/** 全部行业配置（顺序即切换器上的展示顺序）。 */
export const industries = [renovation, law, photography, training, restaurant];

/** 默认行业（URL 没有带参数或参数非法时使用）。 */
export const defaultIndustryId = 'renovation';

/**
 * 根据行业 id 获取配置。
 * @param {string} industryId 行业 id
 * @returns {object} 命中的配置，未命中返回默认配置
 */
export function getIndustryById(industryId) {
  const matched = industries.find((item) => item.id === industryId);
  return matched || industries.find((item) => item.id === defaultIndustryId) || industries[0];
}

export default industries;

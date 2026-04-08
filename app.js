const LANGUAGE_STORAGE_KEY = "wish-orbit-language";
const PASSED_STORAGE_KEY = "wish-orbit-passed";
const MAP_HOME_PADDING = { top: 28, right: 0, bottom: 170, left: 0 };
const INITIAL_GLOBE_ZOOM = 1.6;
const COMPOSER_MAP_DEFAULT = { center: [105, 28], zoom: 2.25 };

const STRINGS = {
  zh: {
    htmlLang: "zh-CN",
    metaDescription: "Wish Orbit 是一个围绕地图发布愿望、通过匹配帮助别人实现愿望，并逐步解锁更多发布额度的愿望交换应用。",
    brandSubtitle: "让愿望带着地点，被刚好的人看见。",
    authButton: "登录 / 注册",
    openComposerButton: "发布愿望",
    mapHeroEyebrow: "Map Home",
    mapHeroTitle: '<span class="hero-title-line">把愿望放到地球上</span><span class="hero-title-line">让善意找到它</span>',
    mapHeroText: "每个愿望都可以绑定真实地点，被看见、被回应，也被真正完成。",
    heroCreateButton: "发布新愿望",
    heroAuthButton: "登录后开始匹配",
    quotaLabel: "可发布额度",
    quotaInfoAria: "额度规则说明",
    quotaTooltip: "初始有 3 个发布额度。每帮助别人完成 1 个愿望，就会增加 1 个额度；已发布但未完成的愿望会占用额度。",
    helpedLabel: "已帮助完成",
    matchedLabel: "活跃匹配",
    mapPanelEyebrow: "Wish Globe",
    mapPanelTitle: "愿望地球",
    mapNoticeDefault: "每一个光点，都是一个等待回应的愿望。点开它，看看你能否成为实现它的阿拉丁灯神吧！",
    mapNoticeComposer: "在下方小地图点选具体位置，把你的愿望放到真实世界里。",
    myOrbitTitle: "我的愿望",
    discoverTitle:
      "<span class=\"hero-title-line\">有些愿望</span><span class=\"hero-title-line\">不是你去寻找</span><span class=\"hero-title-line\">而是它刚好来到你面前</span>",
    discoverText: "系统会顺着你的偏好，把别人的愿望悄悄送来。向左回应，向右略过；那些让你停下来的片刻，也许就是命运在轻轻敲门。",
    passButton: "略过",
    helpButton: "申请帮助",
    incomingTitle: "收到的申请",
    pendingTitle: "等待对方确认",
    threadsTitle: "聊天列表",
    chatPlaceholder: "先从左侧选择一个匹配，或者先去发现页申请帮助。",
    chatInput: "输入一条消息，推动这个愿望往前走。",
    sendMessageButton: "发送",
    profileActivityTitle: "你的愿望轨迹",
    profileNickname: "昵称",
    profileEmail: "邮箱",
    profileLocation: "位置",
    profileLocationUnset: "还没有设定常用地点",
    profileEditEyebrow: "About You",
    profileEditTitle: "个人信息",
    profileAvatarUpload: "上传头像",
    profileAvatarRemove: "移除头像",
    profileUseCurrentLocation: "读取本地位置",
    profileSave: "保存修改",
    profileSaving: "保存中...",
    profileUpdated: "个人信息已经更新。",
    profileLocationHint: "你也可以手动填写常用地点，或者直接读取本地位置。",
    geolocationUnsupported: "当前浏览器不支持读取本地位置。",
    geolocationDenied: "没有拿到位置权限，请检查浏览器设置。",
    geolocationLooking: "正在读取你当前位置...",
    profileCredits: "当前发布额度",
    profileLanguage: "偏好语言",
    profilePostedCount: "已发布",
    profileMatchedCount: "已匹配",
    profileCompletedCount: "已完成",
    profileFilterPosted: "已发布",
    profileFilterRequested: "已申请",
    profileFilterMatched: "已匹配",
    profileFilterIncoming: "待我回应",
    profileFilterCompleted: "已完成",
    profileNoPosted: "你还没有发布任何愿望。",
    profileNoRequested: "你还没有向别人发出过帮助申请。",
    profileNoMatched: "一旦匹配成功，聊天会先出现在这里。",
    profileNoIncoming: "暂时还没有人向你的愿望发来新的申请。",
    profileNoCompleted: "完成后的愿望和聊天，会留在这里。",
    tabMap: "地球",
    tabDiscover: "发现",
    tabInbox: "聊天",
    tabProfile: "我的",
    authTitle: "登录之后，你的愿望、匹配和聊天就会真正保存下来。",
    authText: "这里已经接上真实后端和数据库。你可以注册新账号，也可以先用演示账号体验完整流程。",
    loginTab: "登录",
    registerTab: "注册",
    authNameLabel: "昵称",
    authEmailLabel: "邮箱",
    authPasswordLabel: "密码",
    authSubmitLogin: "登录",
    authSubmitRegister: "注册账号",
    authNamePlaceholder: "给自己起个名字",
    authPasswordPlaceholder: "至少 6 位",
    demoHint: "演示密码",
    composerTitle: "发布一个新的愿望",
    composerEditTitle: "编辑这个愿望",
    wishTitleLabel: "愿望标题",
    wishDescriptionLabel: "愿望内容",
    wishPlaceLabel: "地点名称",
    wishPlacePlaceholder: "例如 南京 · 玄武湖",
    placeHelperText: "输入地点名称后点搜索定位，或者直接在下方地图上点选。",
    placeSearchButton: "搜索定位",
    searchingPlace: "定位中...",
    placeSearchPrompt: "先输入一个地点名称，再帮你定位。",
    placeSearchNoResults: "没找到这个地点，试试写得更具体一点。",
    placeSearchFailed: "地点搜索失败了，请稍后再试。",
    placeSearchPicked: "已经先帮你定位到最接近的结果，也可以在下面换一个。",
    placeReverseLooking: "正在识别这个位置...",
    placeReversePicked: "已经根据地图位置更新地点名称。",
    composerMapTitle: "在地图上点选具体位置",
    coordinateLabel: "已选坐标",
    coordinateUnset: "尚未点选具体地点",
    coordinateHint: "在上方地图点一下就能选择具体位置，地点名称写你想让别人看到的地名。",
    publishWishButton: "发布到地球",
    saveWishButton: "保存修改",
    detailTitle: "愿望详情",
    refreshButton: "刷新",
    noWishes: "暂时还没有愿望。",
    noMyWishes: "你还没有发布任何愿望，点右上角就能发布第一个。",
    noIncoming: "当别人申请帮助你的愿望时，会出现在这里。",
    noPending: "你申请帮助但还没被确认的愿望，会出现在这里。",
    noThreads: "一旦愿望进入匹配或完成状态，对话就会出现在这里。",
    noDetail: "没有找到这条愿望。",
    noDiscover: "现在没有新的公开愿望可以发现了，稍后再来看看。",
    openDetail: "打开详情",
    editWish: "编辑",
    deleteWish: "删除",
    openChat: "打开聊天",
    requestHelp: "申请帮助",
    approveHelp: "确认匹配",
    completeMatch: "标记已完成",
    unmatch: "解除匹配",
    ownerThreadsTitle: "我发布的愿望",
    helperThreadsTitle: "我匹配的愿望",
    completedThreadsTitle: "已完成的",
    noOwnerThreads: "你发布的愿望一旦匹配成功，会出现在这里。",
    noHelperThreads: "你帮助别人的愿望一旦匹配成功，会出现在这里。",
    noCompletedThreads: "完成后的聊天会继续留在这里，方便你回看。",
    cancelledState: "已解除",
    pendingState: "等待确认",
    matchedState: "已匹配",
    completedState: "已完成",
    openState: "进行中",
    translationOriginal: "原文 · {language}",
    translationAuto: "自动译自 {language}",
    showOriginal: "查看原文",
    showTranslated: "返回译文",
    detailOwner: "发布者",
    detailPlace: "地点",
    detailStatus: "状态",
    completionTitle: "愿望已完成",
    completionText: "这条愿望已经被标记为完成。你们刚刚把一个原本停留在对话里的愿望，真正往前推了一步。",
    completionCredit: "你的发布额度已更新，现在可以继续把新的愿望放到地球上。",
    completionAction: "继续看看",
    confirmCompleteTitle: "确认完成这个愿望？",
    confirmCompleteText: "一旦标记完成，这段匹配会进入已完成分组，并保留聊天记录。",
    confirmCompleteAction: "确认完成",
    confirmCancelAction: "再想想",
    unmatchConfirmTitle: "确认解除这段匹配？",
    unmatchConfirmText: "解除后，这段匹配会结束，聊天会从当前列表中移除，愿望会重新回到可被回应的状态。",
    unmatchDone: "这段匹配已经解除。",
    deleteWishConfirmTitle: "确认删除这个愿望？",
    deleteWishConfirmText: "删除后，这条愿望和它当前收到的未匹配申请都会一起消失，这个操作不能撤回。",
    wishUpdated: "愿望已经更新。",
    wishDeleted: "愿望已经删除。",
    incomingRequestsLabel: "待你确认的申请",
    noIncomingForWish: "这条愿望暂时还没有收到新的帮助申请。",
    activeMatchLabel: "当前匹配",
    profileGuestTitle: "先登录，才能把你的愿望、匹配和聊天真正保存下来。",
    profileGuestAction: "现在登录",
    profileLogout: "退出登录",
    guestToast: "请先登录，再继续这个操作。",
    wishCreated: "愿望已经发布到地球上了。",
    requestSent: "帮助申请已经发出，等待对方确认。",
    requestApproved: "匹配已经确认，现在可以聊天了。",
    matchCompleted: "这个愿望已被标记为完成，你的额度也会随之更新。",
    messageSent: "消息已发送。",
    signedOut: "已退出登录。",
    errorFallback: "出了点问题，请稍后再试。",
    composerNeedLocation: "请先在地图上点一个位置。",
    authDemoPrefix: "演示账号",
    refreshing: "刷新中...",
    byOwner: "发布者：{name}",
    locatedAt: "落点：{place}",
    threadWith: "你和 {name}",
    messageAuto: "自动译自 {language}",
    chatReadOnly: "这个匹配已经完成，聊天现在是只读的。",
    languageZh: "中文",
    languageEn: "English",
    closeAria: "关闭"
  },
  en: {
    htmlLang: "en",
    metaDescription: "Wish Orbit is a full-stack wish exchange app where people pin wishes to the globe, match with helpers, and chat after approval.",
    brandSubtitle: "Let wishes carry a place and find the people meant to see them.",
    authButton: "Sign In / Register",
    openComposerButton: "Post a Wish",
    mapHeroEyebrow: "Map Home",
    mapHeroTitle: '<span class="hero-title-line">Place wishes on Earth</span><span class="hero-title-line">Let kindness find them</span>',
    mapHeroText: "Every wish is pinned to a real place so it can be seen, answered, and actually completed.",
    heroCreateButton: "Post a Wish",
    heroAuthButton: "Sign in to match",
    quotaLabel: "Available Credits",
    quotaInfoAria: "Credit rules",
    quotaTooltip: "You start with 3 posting credits. Each time you help complete someone else's wish, you gain 1 more credit. Any wish you've posted and not completed yet still uses one credit.",
    helpedLabel: "Completed Helps",
    matchedLabel: "Active Matches",
    mapPanelEyebrow: "Wish Globe",
    mapPanelTitle: "Wishes In Motion",
    mapNoticeDefault: "Each light is a real wish waiting for a reply. Open one and see whether you can help it happen.",
    mapNoticeComposer: "Pick the exact location on the mini map below and place your wish in the real world.",
    myOrbitTitle: "My Wishes",
    discoverTitle:
      "<span class=\"hero-title-line\">Some wishes</span><span class=\"hero-title-line\">are not the ones</span><span class=\"hero-title-line\">you go looking for</span><span class=\"hero-title-line\">They simply arrive for you</span>",
    discoverText: "The app follows your preferences and quietly brings someone else's wish to you. Swipe left to answer, swipe right to let it pass. The ones that make you pause may be fate knocking softly.",
    passButton: "Pass",
    helpButton: "Offer Help",
    incomingTitle: "Incoming Requests",
    pendingTitle: "Waiting on Reply",
    threadsTitle: "Conversations",
    chatPlaceholder: "Choose a matched wish on the left, or visit Discover to send a help request first.",
    chatInput: "Write a message and move this wish forward.",
    sendMessageButton: "Send",
    profileActivityTitle: "Your Wish Orbit",
    profileNickname: "Name",
    profileEmail: "Email",
    profileLocation: "Location",
    profileLocationUnset: "No usual place yet",
    profileEditEyebrow: "About You",
    profileEditTitle: "Profile Details",
    profileAvatarUpload: "Upload Avatar",
    profileAvatarRemove: "Remove Avatar",
    profileUseCurrentLocation: "Use Current Location",
    profileSave: "Save Changes",
    profileSaving: "Saving...",
    profileUpdated: "Your profile has been updated.",
    profileLocationHint: "You can type a usual place manually, or read your current local location.",
    geolocationUnsupported: "This browser cannot read your local location.",
    geolocationDenied: "Location access was denied. Please check your browser settings.",
    geolocationLooking: "Reading your current location...",
    profileCredits: "Posting Credits",
    profileLanguage: "Preferred Language",
    profilePostedCount: "Posted",
    profileMatchedCount: "Matched",
    profileCompletedCount: "Completed",
    profileFilterPosted: "Posted",
    profileFilterRequested: "Requested",
    profileFilterMatched: "Matched",
    profileFilterIncoming: "Needs Reply",
    profileFilterCompleted: "Completed",
    profileNoPosted: "You have not posted any wishes yet.",
    profileNoRequested: "You have not sent any help requests yet.",
    profileNoMatched: "Matched wishes will show up here.",
    profileNoIncoming: "No one is waiting for your reply right now.",
    profileNoCompleted: "Completed wishes and chats stay here.",
    tabMap: "Globe",
    tabDiscover: "Discover",
    tabInbox: "Inbox",
    tabProfile: "Profile",
    authTitle: "Once you sign in, your wishes, matches, and chats are saved for real.",
    authText: "This version already uses a real backend and database. Create a fresh account or try one of the seeded demo accounts.",
    loginTab: "Sign In",
    registerTab: "Register",
    authNameLabel: "Name",
    authEmailLabel: "Email",
    authPasswordLabel: "Password",
    authSubmitLogin: "Sign In",
    authSubmitRegister: "Create Account",
    authNamePlaceholder: "Choose a display name",
    authPasswordPlaceholder: "At least 6 characters",
    demoHint: "Demo password",
    composerTitle: "Post a New Wish",
    composerEditTitle: "Edit this wish",
    wishTitleLabel: "Wish Title",
    wishDescriptionLabel: "Wish Details",
    wishPlaceLabel: "Place Name",
    wishPlacePlaceholder: "For example: Xuanwu Lake, Nanjing",
    placeHelperText: "Type a place name and search for it, or just tap the mini map below.",
    placeSearchButton: "Search Place",
    searchingPlace: "Locating...",
    placeSearchPrompt: "Enter a place name first so I can locate it.",
    placeSearchNoResults: "Nothing matched that place. Try a more specific name.",
    placeSearchFailed: "Place lookup failed. Please try again shortly.",
    placeSearchPicked: "I pinned the closest result first. You can still choose another one below.",
    placeReverseLooking: "Looking up this location...",
    placeReversePicked: "The place name was updated from the map selection.",
    composerMapTitle: "Pick the exact spot on the map",
    coordinateLabel: "Selected coordinates",
    coordinateUnset: "No exact location chosen yet",
    coordinateHint: "Click on the map above to choose the exact spot. The place name is what other people will see.",
    publishWishButton: "Publish to Earth",
    saveWishButton: "Save changes",
    detailTitle: "Wish Detail",
    refreshButton: "Refresh",
    noWishes: "No wishes yet.",
    noMyWishes: "You haven't posted a wish yet. Use the button in the top right to create the first one.",
    noIncoming: "When someone offers help on your wishes, their requests will appear here.",
    noPending: "Any help requests you've sent but haven't been approved yet will appear here.",
    noThreads: "Once a wish is matched or completed, its conversation will appear here.",
    noDetail: "That wish could not be found.",
    noDiscover: "There are no new public wishes to discover right now. Check back soon.",
    openDetail: "Open Details",
    editWish: "Edit",
    deleteWish: "Delete",
    openChat: "Open Chat",
    requestHelp: "Offer Help",
    approveHelp: "Approve Match",
    completeMatch: "Mark Complete",
    unmatch: "Unmatch",
    ownerThreadsTitle: "Wishes I posted",
    helperThreadsTitle: "Wishes I matched",
    completedThreadsTitle: "Completed",
    noOwnerThreads: "Matched threads for wishes you posted will appear here.",
    noHelperThreads: "Matched threads for wishes you offered help on will appear here.",
    noCompletedThreads: "Completed conversations stay here so you can revisit them.",
    cancelledState: "Unmatched",
    pendingState: "Pending",
    matchedState: "Matched",
    completedState: "Completed",
    openState: "Open",
    translationOriginal: "Original · {language}",
    translationAuto: "Auto-translated from {language}",
    showOriginal: "Show Original",
    showTranslated: "Back to Translation",
    detailOwner: "Owner",
    detailPlace: "Place",
    detailStatus: "Status",
    completionTitle: "Wish completed",
    completionText: "This wish has now been marked complete. A conversation has just moved one step closer to becoming real.",
    completionCredit: "Your posting credit has been refreshed, so you can place another wish on the globe.",
    completionAction: "Keep exploring",
    confirmCompleteTitle: "Mark this wish as complete?",
    confirmCompleteText: "Once confirmed, this match moves into the completed section and the conversation stays available to read.",
    confirmCompleteAction: "Confirm completion",
    confirmCancelAction: "Not yet",
    unmatchConfirmTitle: "End this match?",
    unmatchConfirmText: "Ending it closes the match, removes it from your active list, and returns the wish to an open state.",
    unmatchDone: "This match has been ended.",
    deleteWishConfirmTitle: "Delete this wish?",
    deleteWishConfirmText: "Deleting it removes the wish and any pending requests attached to it. This cannot be undone.",
    wishUpdated: "Your wish has been updated.",
    wishDeleted: "Your wish has been deleted.",
    incomingRequestsLabel: "Requests waiting for you",
    noIncomingForWish: "This wish doesn't have any new help requests yet.",
    activeMatchLabel: "Active Match",
    profileGuestTitle: "Sign in first to actually save your wishes, matches, and chat threads.",
    profileGuestAction: "Sign in now",
    profileLogout: "Sign Out",
    guestToast: "Please sign in before doing that.",
    wishCreated: "Your wish has been published to the globe.",
    requestSent: "Your help request has been sent. Now you're waiting for the owner.",
    requestApproved: "The match is approved. You can start chatting now.",
    matchCompleted: "This wish is marked complete and your credit count has been refreshed.",
    messageSent: "Message sent.",
    signedOut: "You have been signed out.",
    errorFallback: "Something went wrong. Please try again.",
    composerNeedLocation: "Please choose a location on the map first.",
    authDemoPrefix: "Demo account",
    refreshing: "Refreshing...",
    byOwner: "Owner: {name}",
    locatedAt: "Pinned at {place}",
    threadWith: "You and {name}",
    messageAuto: "Auto-translated from {language}",
    chatReadOnly: "This match has been completed, so the thread is now read-only.",
    languageZh: "Chinese",
    languageEn: "English",
    closeAria: "Close"
  }
};

const state = {
  language: localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "zh",
  currentUser: null,
  data: null,
  selectedWishId: null,
  activeView: "map",
  activeMatchId: null,
  activeThread: null,
  profileFilter: "posted",
  profileAvatarDraft: null,
  detailWish: null,
  detailWishId: null,
  authMode: "login",
  wishDisplayModes: {},
  passedWishIds: loadPassedWishIds(),
  draftCoordinate: null,
  editingWishId: null,
  composerMap: null,
  composerMapReady: false,
  composerMarker: null,
  placeSearchResults: [],
  map: null,
  mapReady: false,
  globeSpinFrame: null,
  globeSpinLastTime: 0,
  globeSpinPauseUntil: 0,
  routeApplied: false,
  chatPollTimer: null
};

const ui = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  applyStaticText();
  autosizeChatInput();
  initMap();
  loadBootstrap();
});

function cacheElements() {
  ui.metaDescription = document.getElementById("metaDescription");
  ui.languageToggleButton = document.getElementById("languageToggleButton");
  ui.authButton = document.getElementById("authButton");
  ui.openComposerButton = document.getElementById("openComposerButton");
  ui.heroCreateButton = document.getElementById("heroCreateButton");
  ui.heroAuthButton = document.getElementById("heroAuthButton");
  ui.refreshButton = document.getElementById("refreshButton");
  ui.views = document.querySelectorAll(".view");
  ui.tabButtons = document.querySelectorAll(".tab-button");
  ui.quotaValue = document.getElementById("quotaValue");
  ui.helpedValue = document.getElementById("helpedValue");
  ui.matchedValue = document.getElementById("matchedValue");
  ui.mapMyWishes = document.getElementById("mapMyWishes");
  ui.discoverDeck = document.getElementById("discoverDeck");
  ui.incomingRequests = document.getElementById("incomingRequests");
  ui.pendingMatches = document.getElementById("pendingMatches");
  ui.matchThreads = document.getElementById("matchThreads");
  ui.chatHeader = document.getElementById("chatHeader");
  ui.chatMessages = document.getElementById("chatMessages");
  ui.chatForm = document.getElementById("chatForm");
  ui.chatInput = document.getElementById("chatInput");
  ui.profileSummary = document.getElementById("profileSummary");
  ui.profileFilters = document.getElementById("profileFilters");
  ui.profileActivityList = document.getElementById("profileActivityList");
  ui.mapNotice = document.getElementById("mapNotice");
  ui.toastRegion = document.getElementById("toastRegion");
  ui.worldMap = document.getElementById("worldMap");
  ui.authModal = document.getElementById("authModal");
  ui.closeAuthButton = document.getElementById("closeAuthButton");
  ui.authForm = document.getElementById("authForm");
  ui.authNameField = document.getElementById("authNameField");
  ui.authNameInput = document.getElementById("authNameInput");
  ui.authEmailInput = document.getElementById("authEmailInput");
  ui.authPasswordInput = document.getElementById("authPasswordInput");
  ui.authSubmitButton = document.getElementById("authSubmitButton");
  ui.authTabs = document.querySelectorAll(".auth-tab");
  ui.demoAccounts = document.getElementById("demoAccounts");
  ui.composerModal = document.getElementById("composerModal");
  ui.closeComposerButton = document.getElementById("closeComposerButton");
  ui.wishForm = document.getElementById("wishForm");
  ui.wishTitleInput = document.getElementById("wishTitleInput");
  ui.wishDescriptionInput = document.getElementById("wishDescriptionInput");
  ui.wishPlaceInput = document.getElementById("wishPlaceInput");
  ui.placeSearchButton = document.getElementById("placeSearchButton");
  ui.placeHelperText = document.getElementById("placeHelperText");
  ui.placeSearchMeta = document.getElementById("placeSearchMeta");
  ui.placeSearchResults = document.getElementById("placeSearchResults");
  ui.composerMap = document.getElementById("composerMap");
  ui.selectedCoordinates = document.getElementById("selectedCoordinates");
  ui.detailModal = document.getElementById("detailModal");
  ui.closeDetailButton = document.getElementById("closeDetailButton");
  ui.detailBody = document.getElementById("detailBody");
  ui.completionModal = document.getElementById("completionModal");
  ui.closeCompletionButton = document.getElementById("closeCompletionButton");
  ui.completionBody = document.getElementById("completionBody");
  ui.confirmModal = document.getElementById("confirmModal");
  ui.closeConfirmButton = document.getElementById("closeConfirmButton");
  ui.confirmBody = document.getElementById("confirmBody");
  ui.passButton = document.getElementById("passButton");
  ui.helpButton = document.getElementById("helpButton");
}

function bindEvents() {
  ui.languageToggleButton.addEventListener("click", toggleLanguage);
  ui.authButton.addEventListener("click", () => (state.currentUser ? setActiveView("profile") : openAuth("login")));
  ui.openComposerButton.addEventListener("click", openComposer);
  ui.heroCreateButton.addEventListener("click", openComposer);
  ui.heroAuthButton.addEventListener("click", () => (state.currentUser ? setActiveView("discover") : openAuth("login")));
  ui.refreshButton.addEventListener("click", async () => {
    showToast(t("refreshing"));
    await loadBootstrap();
  });
  ui.closeAuthButton.addEventListener("click", closeAuth);
  ui.closeComposerButton.addEventListener("click", closeComposer);
  ui.closeDetailButton.addEventListener("click", closeDetail);
  ui.closeCompletionButton.addEventListener("click", closeCompletion);
  ui.closeConfirmButton.addEventListener("click", closeConfirm);
  ui.authForm.addEventListener("submit", submitAuth);
  ui.wishForm.addEventListener("submit", submitWish);
  ui.placeSearchButton.addEventListener("click", searchComposerPlace);
  ui.chatForm.addEventListener("submit", sendChatMessage);
  ui.chatInput.addEventListener("input", autosizeChatInput);
  ui.passButton.addEventListener("click", passTopDiscoverWish);
  ui.helpButton.addEventListener("click", requestTopDiscoverWish);
  ui.authTabs.forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });
  ui.tabButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
  });
  ui.mapMyWishes.addEventListener("click", handleAction);
  ui.discoverDeck.addEventListener("click", handleAction);
  ui.incomingRequests.addEventListener("click", handleAction);
  ui.pendingMatches.addEventListener("click", handleAction);
  ui.matchThreads.addEventListener("click", handleAction);
  ui.chatHeader.addEventListener("click", handleAction);
  ui.profileSummary.addEventListener("click", handleAction);
  ui.profileSummary.addEventListener("change", handleProfileSummaryChange);
  ui.profileFilters.addEventListener("click", handleAction);
  ui.profileActivityList.addEventListener("click", handleAction);
  ui.detailBody.addEventListener("click", handleAction);
  ui.completionBody.addEventListener("click", handleAction);
  ui.confirmBody.addEventListener("click", handleAction);
  ui.demoAccounts.addEventListener("click", handleAction);
  ui.placeSearchResults.addEventListener("click", handleAction);
  ui.authModal.addEventListener("click", (event) => {
    if (event.target === ui.authModal) closeAuth();
  });
  ui.composerModal.addEventListener("click", (event) => {
    if (event.target === ui.composerModal) closeComposer();
  });
  ui.detailModal.addEventListener("click", (event) => {
    if (event.target === ui.detailModal) closeDetail();
  });
  ui.completionModal.addEventListener("click", (event) => {
    if (event.target === ui.completionModal) closeCompletion();
  });
  ui.confirmModal.addEventListener("click", (event) => {
    if (event.target === ui.confirmModal) closeConfirm();
  });
}

function autosizeChatInput() {
  if (!ui.chatInput) return;
  ui.chatInput.style.height = "0px";
  const nextHeight = Math.min(Math.max(ui.chatInput.scrollHeight, 26), 180);
  ui.chatInput.style.height = `${nextHeight}px`;
}

function initMap() {
  state.map = new maplibregl.Map({
    container: "worldMap",
    center: [18, 22],
    zoom: INITIAL_GLOBE_ZOOM,
    minZoom: 0.55,
    maxZoom: 3.4,
    pitch: 20,
    bearing: -22,
    maxPitch: 34,
    attributionControl: false,
    style: "https://demotiles.maplibre.org/style.json"
  });

  state.map.addControl(
    new maplibregl.NavigationControl({
      showCompass: false,
      visualizePitch: true
    }),
    "bottom-right"
  );

  state.map.addControl(
    new maplibregl.AttributionControl({
      compact: true
    }),
    "bottom-right"
  );

  state.map.on("style.load", () => {
    state.map.setProjection({ type: "globe" });
    applyGlobeTheme();
  });

  state.map.on("load", () => {
    state.map.jumpTo({
      center: [18, 22],
      zoom: INITIAL_GLOBE_ZOOM,
      pitch: 20,
      bearing: -22,
      padding: MAP_HOME_PADDING
    });
    syncGlobeHaloScale();
    state.mapReady = true;
    renderMapMarkers();
    startGlobeSpin();
  });

  state.map.on("zoom", syncGlobeHaloScale);
  state.map.on("move", syncGlobeHaloScale);

  ["dragstart", "zoomstart", "rotatestart", "pitchstart", "mousedown", "touchstart"].forEach((eventName) => {
    state.map.on(eventName, pauseGlobeSpin);
  });

  state.map.on("click", (event) => {
    if (!ui.composerModal.classList.contains("hidden")) {
      state.draftCoordinate = {
        lat: Number(event.lngLat.lat.toFixed(4)),
        lng: Number(event.lngLat.lng.toFixed(4))
      };
      renderCoordinate();
      ui.mapNotice.textContent = t("mapNoticeComposer");
    }
  });
}

function applyGlobeTheme() {
  ensureCountryBoundaryGlowLayer();
  setLayerPaint("background", "background-color", "#020914");
  setLayerPaint("coastline", "line-color", "#9dddea");
  setLayerPaint("coastline", "line-opacity", 0.82);
  setLayerPaint("countries-fill", "fill-color", chinaAwareFillExpression());
  setLayerPaint("countries-fill", "fill-opacity", 0.72);
  setLayerPaint("countries-boundary-glow", "line-color", "rgba(157, 221, 234, 0.34)");
  setLayerPaint("countries-boundary-glow", "line-opacity", 0.7);
  setLayerPaint("countries-boundary", "line-color", "rgba(187, 239, 247, 0.9)");
  setLayerPaint("countries-boundary", "line-opacity", 0.82);
  setLayerPaint("countries-boundary", "line-width", [
    "interpolate",
    ["linear"],
    ["zoom"],
    1,
    0.45,
    6,
    0.8,
    14,
    2.2,
    22,
    4
  ]);
  setLayerPaint("geolines", "line-color", "rgba(157, 221, 234, 0.04)");
  setLayerPaint("geolines", "line-opacity", 0.02);
  setLayerPaint("crimea-fill", "fill-color", "#1a4060");
  setLayerLayout("geolines-label", "visibility", "none");
  setLayerLayout("countries-label", "visibility", "none");
}

function chinaAwareFillExpression() {
  return [
    "case",
    chinaTaiwanCountryMatchExpression(),
    "#1a4060",
    [
      "interpolate",
      ["linear"],
      ["coalesce", ["get", "MAPCOLOR7"], 1],
      1,
      "#143149",
      2,
      "#173954",
      3,
      "#1a4060",
      4,
      "#204765",
      5,
      "#24435f",
      6,
      "#15354f",
      7,
      "#1a3c57"
    ]
  ];
}

function chinaTaiwanCountryMatchExpression() {
  return [
    "any",
    [
      "match",
      ["coalesce", ["get", "ADM0_A3"], ["get", "ISO_A3"], ["get", "WB_A3"], ""],
      ["CHN", "TWN"],
      true,
      false
    ],
    [
      "match",
      ["coalesce", ["get", "ISO_A2"], ["get", "ISO_A2_EH"], ""],
      ["CN", "TW"],
      true,
      false
    ],
    [
      "match",
      ["coalesce", ["get", "NAME_EN"], ["get", "ADMIN"], ["get", "NAME"], ["get", "name_en"], ["get", "name"], ""],
      ["China", "Taiwan", "People's Republic of China", "Taiwan Province of China", "Taiwan, Province of China", "中国", "台湾"],
      true,
      false
    ]
  ];
}

function ensureCountryBoundaryGlowLayer() {
  if (!state.map || state.map.getLayer("countries-boundary-glow")) return;
  state.map.addLayer(
    {
      id: "countries-boundary-glow",
      type: "line",
      source: "maplibre",
      "source-layer": "countries",
      paint: {
        "line-color": "rgba(157, 221, 234, 0.34)",
        "line-opacity": 0.7,
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          1,
          3,
          6,
          6,
          14,
          13,
          22,
          20
        ],
        "line-blur": 1.8
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    },
    "countries-boundary"
  );
}

function setLayerPaint(layerId, property, value) {
  if (!state.map || !state.map.getLayer(layerId)) return;
  state.map.setPaintProperty(layerId, property, value);
}

function setLayerLayout(layerId, property, value) {
  if (!state.map || !state.map.getLayer(layerId)) return;
  state.map.setLayoutProperty(layerId, property, value);
}

function startGlobeSpin() {
  stopGlobeSpin();
  state.globeSpinLastTime = 0;
  const step = (timestamp) => {
    if (!state.map) return;
    if (!state.globeSpinLastTime) {
      state.globeSpinLastTime = timestamp;
    }
    const delta = (timestamp - state.globeSpinLastTime) / 1000;
    state.globeSpinLastTime = timestamp;

    if (state.activeView === "map" && Date.now() >= state.globeSpinPauseUntil) {
      const center = state.map.getCenter();
      state.map.jumpTo({
        center: [center.lng - delta * 1.8, center.lat],
        zoom: state.map.getZoom(),
        bearing: state.map.getBearing(),
        pitch: state.map.getPitch(),
        padding: MAP_HOME_PADDING
      });
    }

    state.globeSpinFrame = window.requestAnimationFrame(step);
  };

  state.globeSpinFrame = window.requestAnimationFrame(step);
}

function stopGlobeSpin() {
  if (!state.globeSpinFrame) return;
  window.cancelAnimationFrame(state.globeSpinFrame);
  state.globeSpinFrame = null;
}

function pauseGlobeSpin() {
  state.globeSpinPauseUntil = Date.now() + 7000;
}

function syncGlobeHaloScale() {
  if (!state.map || !ui.worldMap) return;
  const zoom = state.map.getZoom();
  const delta = zoom - INITIAL_GLOBE_ZOOM;
  const haloScale = Math.min(1.34, Math.max(1.04, 1.08 + delta * 0.18));
  const shadowScale = Math.min(1.22, Math.max(0.94, 1 + delta * 0.12));
  const haloOpacity = Math.min(1.12, Math.max(0.9, 1 + delta * 0.06));
  ui.worldMap.style.setProperty("--globe-halo-scale", haloScale.toFixed(3));
  ui.worldMap.style.setProperty("--globe-shadow-scale", shadowScale.toFixed(3));
  ui.worldMap.style.setProperty("--globe-halo-opacity", haloOpacity.toFixed(3));
}

async function loadBootstrap() {
  try {
    const data = await api(`/api/bootstrap?language=${state.language}`);
    state.data = data;
    state.currentUser = data.currentUser;
    state.profileAvatarDraft = data.currentUser?.avatarDataUrl || "";

    if (!state.selectedWishId) {
      state.selectedWishId = data.wishes[0]?.id ?? null;
    } else if (!data.wishes.some((wish) => wish.id === state.selectedWishId)) {
      state.selectedWishId = data.wishes[0]?.id ?? null;
    }

    if (state.currentUser) {
      if (!state.activeMatchId) {
        state.activeMatchId = data.activeMatches[0]?.id ?? null;
      } else if (!data.activeMatches.some((match) => match.id === state.activeMatchId)) {
        state.activeMatchId = data.activeMatches[0]?.id ?? null;
      }
    } else {
      state.activeMatchId = null;
      state.activeThread = null;
      state.profileAvatarDraft = null;
      stopChatPolling();
    }

    renderApp();

    if (!state.routeApplied) {
      state.routeApplied = true;
      const params = new URLSearchParams(window.location.search);
      const wishId = Number(params.get("wish"));
      if (wishId) {
        openDetail(wishId);
      }
    }

    if (state.currentUser && state.activeMatchId) {
      await loadThread(state.activeMatchId, { silent: true });
      startChatPolling();
    } else {
      renderChatThread();
    }
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

function renderApp() {
  applyStaticText();
  renderStats();
  renderMapMarkers();
  renderMyWishes(ui.mapMyWishes, state.data?.myWishes || [], { emptyKey: "noMyWishes" });
  renderDiscoverDeck();
  renderIncomingRequests();
  renderPendingMatches();
  renderThreads();
  renderProfile();
  if (state.detailWish) {
    renderDetail();
  }
}

function applyStaticText() {
  document.documentElement.lang = t("htmlLang");
  ui.metaDescription.setAttribute("content", t("metaDescription"));
  document.getElementById("brandSubtitle").textContent = t("brandSubtitle");
  ui.languageToggleButton.textContent = state.language === "zh" ? "EN" : "中";
  ui.authButton.textContent = state.currentUser ? state.currentUser.name : t("authButton");
  ui.openComposerButton.textContent = t("openComposerButton");
  document.getElementById("mapHeroEyebrow").textContent = t("mapHeroEyebrow");
  document.getElementById("mapHeroTitle").innerHTML = t("mapHeroTitle");
  document.getElementById("mapHeroText").textContent = t("mapHeroText");
  ui.heroCreateButton.textContent = t("heroCreateButton");
  ui.heroAuthButton.textContent = state.currentUser ? t("tabDiscover") : t("heroAuthButton");
  document.getElementById("quotaLabel").textContent = t("quotaLabel");
  document.getElementById("quotaInfoButton").setAttribute("aria-label", t("quotaInfoAria"));
  document.getElementById("quotaTooltip").textContent = t("quotaTooltip");
  document.getElementById("helpedLabel").textContent = t("helpedLabel");
  document.getElementById("matchedLabel").textContent = t("matchedLabel");
  document.getElementById("mapPanelEyebrow").textContent = t("mapPanelEyebrow");
  document.getElementById("mapPanelTitle").textContent = t("mapPanelTitle");
  if (ui.composerModal.classList.contains("hidden")) {
    ui.mapNotice.textContent = t("mapNoticeDefault");
  } else {
    ui.mapNotice.textContent = t("mapNoticeComposer");
  }
  document.getElementById("myOrbitTitle").textContent = t("myOrbitTitle");
  document.getElementById("discoverTitle").innerHTML = t("discoverTitle");
  document.getElementById("discoverText").textContent = t("discoverText");
  ui.passButton.textContent = t("passButton");
  ui.helpButton.textContent = t("helpButton");
  document.getElementById("incomingTitle").textContent = t("incomingTitle");
  document.getElementById("pendingTitle").textContent = t("pendingTitle");
  document.getElementById("threadsTitle").textContent = t("threadsTitle");
  ui.chatInput.placeholder = t("chatInput");
  autosizeChatInput();
  document.getElementById("sendMessageButton").textContent = t("sendMessageButton");
  document.getElementById("profileActivityEyebrow").textContent = state.language === "zh" ? "Orbit Activity" : "Orbit Activity";
  document.getElementById("profileActivityTitle").textContent = t("profileActivityTitle");
  document.getElementById("tabMap").textContent = t("tabMap");
  document.getElementById("tabDiscover").textContent = t("tabDiscover");
  document.getElementById("tabInbox").textContent = t("tabInbox");
  document.getElementById("tabProfile").textContent = t("tabProfile");
  document.getElementById("authTitle").textContent = t("authTitle");
  document.getElementById("authText").textContent = t("authText");
  document.getElementById("loginTab").textContent = t("loginTab");
  document.getElementById("registerTab").textContent = t("registerTab");
  document.getElementById("authNameLabel").textContent = t("authNameLabel");
  document.getElementById("authEmailLabel").textContent = t("authEmailLabel");
  document.getElementById("authPasswordLabel").textContent = t("authPasswordLabel");
  ui.authNameInput.placeholder = t("authNamePlaceholder");
  ui.authPasswordInput.placeholder = t("authPasswordPlaceholder");
  document.getElementById("composerTitle").textContent = state.editingWishId ? t("composerEditTitle") : t("composerTitle");
  document.getElementById("wishTitleLabel").textContent = t("wishTitleLabel");
  document.getElementById("wishDescriptionLabel").textContent = t("wishDescriptionLabel");
  document.getElementById("wishPlaceLabel").textContent = t("wishPlaceLabel");
  ui.wishPlaceInput.placeholder = t("wishPlacePlaceholder");
  ui.placeHelperText.textContent = t("placeHelperText");
  ui.placeSearchButton.textContent = ui.placeSearchButton.disabled ? t("searchingPlace") : t("placeSearchButton");
  document.getElementById("composerMapTitle").textContent = t("composerMapTitle");
  document.getElementById("coordinateLabel").textContent = t("coordinateLabel");
  document.getElementById("coordinateHint").textContent = t("coordinateHint");
  document.getElementById("publishWishButton").textContent = state.editingWishId ? t("saveWishButton") : t("publishWishButton");
  document.getElementById("detailTitle").textContent = t("detailTitle");
  document.getElementById("completionTitle").textContent = t("completionTitle");
  document.getElementById("confirmTitle").textContent = t("confirmCompleteTitle");
  ui.refreshButton.textContent = t("refreshButton");
  document.getElementById("closeAuthButton").setAttribute("aria-label", t("closeAria"));
  document.getElementById("closeComposerButton").setAttribute("aria-label", t("closeAria"));
  document.getElementById("closeDetailButton").setAttribute("aria-label", t("closeAria"));
  document.getElementById("closeCompletionButton").setAttribute("aria-label", t("closeAria"));
  document.getElementById("closeConfirmButton").setAttribute("aria-label", t("closeAria"));
  setAuthMode(state.authMode, { silent: true });
  renderCoordinate();
  renderDemoAccounts();
}

function renderStats() {
  const stats = state.data?.stats || { availableCredits: 3, completedHelpCount: 0, matchedCount: 0 };
  ui.quotaValue.textContent = String(stats.availableCredits);
  ui.helpedValue.textContent = String(stats.completedHelpCount);
  ui.matchedValue.textContent = String(stats.matchedCount);
}

function renderMapMarkers() {
  if (!state.map || !state.mapReady || !state.data) return;
  const markerData = buildWishMarkerGeoJSON(state.data.wishes);

  if (state.map.getSource("wish-markers")) {
    state.map.getSource("wish-markers").setData(markerData);
    return;
  }

  state.map.addSource("wish-markers", {
    type: "geojson",
    data: markerData
  });

  state.map.addLayer({
    id: "wish-markers-halo",
    type: "circle",
    source: "wish-markers",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        12,
        2,
        18,
        3.4,
        22
      ],
      "circle-color": markerColorExpression(0.18),
      "circle-blur": 0.2,
      "circle-opacity": 0.78,
      "circle-stroke-width": 1,
      "circle-stroke-color": markerColorExpression(0.28)
    }
  });

  state.map.addLayer({
    id: "wish-markers-core",
    type: "circle",
    source: "wish-markers",
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        5,
        2,
        7,
        3.4,
        8
      ],
      "circle-color": markerColorExpression(),
      "circle-stroke-width": 3,
      "circle-stroke-color": "rgba(250, 247, 240, 0.92)"
    }
  });

  ["wish-markers-halo", "wish-markers-core"].forEach((layerId) => {
    state.map.on("click", layerId, (event) => {
      const wishId = Number(event.features?.[0]?.properties?.id);
      if (!wishId) return;
      const wish = state.data?.wishes.find((item) => item.id === wishId);
      if (!wish) return;
      state.selectedWishId = wish.id;
      openDetail(wish.id);
    });

    state.map.on("mouseenter", layerId, () => {
      state.map.getCanvas().style.cursor = "pointer";
    });

    state.map.on("mouseleave", layerId, () => {
      state.map.getCanvas().style.cursor = "";
    });
  });
}

function buildWishMarkerGeoJSON(wishes) {
  return {
    type: "FeatureCollection",
    features: wishes.map((wish) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [wish.lng, wish.lat]
      },
      properties: {
        id: wish.id,
        status: wish.status
      }
    }))
  };
}

function markerColorExpression(alpha) {
  const accent = alpha ? `rgba(255, 132, 89, ${alpha})` : "#ff8459";
  const sea = alpha ? `rgba(97, 205, 225, ${alpha})` : "#61cde1";
  const mint = alpha ? `rgba(141, 226, 189, ${alpha})` : "#8de2bd";
  return [
    "match",
    ["get", "status"],
    "matched",
    sea,
    "completed",
    mint,
    accent
  ];
}

function renderMyWishes(container, wishes, { emptyKey }) {
  if (!wishes.length) {
    container.innerHTML = `<div class="empty-state">${t(emptyKey)}</div>`;
    return;
  }
  const orderedWishes = [...wishes].sort(compareMyWishOrder);
  container.innerHTML = orderedWishes
    .map((wish) =>
      wishCardHTML(wish, {
        showOwner: false,
        actionButtons: wish.canManage
          ? [
              { action: "edit-wish", value: wish.id, label: t("editWish") },
              { action: "delete-wish-confirm", value: wish.id, label: t("deleteWish") },
            ]
          : [],
      })
    )
    .join("");
}

function compareMyWishOrder(left, right) {
  const statusDiff = myWishStatusRank(left.status) - myWishStatusRank(right.status);
  if (statusDiff !== 0) return statusDiff;

  const leftTime = Date.parse(left.createdAt || "") || 0;
  const rightTime = Date.parse(right.createdAt || "") || 0;
  return rightTime - leftTime;
}

function myWishStatusRank(status) {
  if (status === "matched") return 1;
  if (status === "completed") return 2;
  return 0;
}

function renderDiscoverDeck() {
  const wishes = getDiscoverQueue();
  if (!wishes.length) {
    ui.discoverDeck.innerHTML = `<div class="empty-state">${t("noDiscover")}</div>`;
    return;
  }
  ui.discoverDeck.innerHTML = wishes
    .slice(0, 3)
    .map((wish, index) => {
      const copy = resolveWishCopy(wish);
      return `
        <article class="wish-deck-card" data-depth="${index}">
          <div class="wish-card-head">
            <div>
              <p class="eyebrow">${escapeHtml(t("detailOwner"))}</p>
              <strong>${escapeHtml(wish.owner.name)}</strong>
            </div>
            ${statusPill(wish.status)}
          </div>
          <h3>${escapeHtml(copy.title)}</h3>
          <p class="wish-card-meta">${escapeHtml(t("locatedAt", { place: wish.place }))}</p>
          <p class="wish-deck-body">${escapeHtml(copy.description)}</p>
          ${translationFooterHTML(wish)}
          <div class="wish-card-actions">
            <button class="ghost-button" type="button" data-action="open-detail" data-value="${wish.id}">${t("openDetail")}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderIncomingRequests() {
  const matches = state.data?.incomingRequests || [];
  if (!matches.length) {
    ui.incomingRequests.innerHTML = `<div class="empty-state">${t("noIncoming")}</div>`;
    return;
  }
  ui.incomingRequests.innerHTML = matches.map(matchCardHTML).join("");
}

function renderPendingMatches() {
  const matches = state.data?.pendingMatches || [];
  if (!matches.length) {
    ui.pendingMatches.innerHTML = `<div class="empty-state">${t("noPending")}</div>`;
    return;
  }
  ui.pendingMatches.innerHTML = matches.map(matchCardHTML).join("");
}

function renderThreads() {
  const matches = state.data?.activeMatches || [];
  const ownerMatches = matches.filter((match) => match.status === "matched" && match.viewerRole === "owner");
  const helperMatches = matches.filter((match) => match.status === "matched" && match.viewerRole === "helper");
  const completedMatches = matches.filter((match) => match.status === "completed");

  if (!ownerMatches.length && !helperMatches.length && !completedMatches.length) {
    ui.matchThreads.innerHTML = `<div class="empty-state">${t("noThreads")}</div>`;
    return;
  }

  ui.matchThreads.innerHTML = [
    threadSectionHTML(t("ownerThreadsTitle"), ownerMatches, t("noOwnerThreads")),
    threadSectionHTML(t("helperThreadsTitle"), helperMatches, t("noHelperThreads")),
    threadSectionHTML(t("completedThreadsTitle"), completedMatches, t("noCompletedThreads")),
  ].join("");
}

function renderChatThread() {
  if (!state.currentUser) {
    ui.chatHeader.innerHTML = `<div class="empty-state">${t("guestToast")}</div>`;
    ui.chatMessages.innerHTML = "";
    ui.chatForm.classList.add("hidden");
    autosizeChatInput();
    return;
  }

  if (!state.activeThread) {
    ui.chatHeader.innerHTML = `<div class="empty-state">${t("chatPlaceholder")}</div>`;
    ui.chatMessages.innerHTML = "";
    ui.chatForm.classList.add("hidden");
    autosizeChatInput();
    return;
  }

  const { match, messages } = state.activeThread;
  const wishTitle = resolveMatchTitle(match);
  ui.chatHeader.innerHTML = `
    <div class="thread-row">
      <div>
        <p class="eyebrow">${escapeHtml(match.otherUser.name)}</p>
        <h3>${escapeHtml(wishTitle)}</h3>
      </div>
      <div class="wish-card-actions">
        <button class="ghost-button" type="button" data-action="open-detail" data-value="${match.wish.id}">${t("openDetail")}</button>
        ${match.status === "matched" ? `<button class="ghost-button" type="button" data-action="unmatch-confirm" data-value="${match.id}">${t("unmatch")}</button>` : ""}
        ${match.status === "matched" && match.viewerRole === "owner" ? `<button class="primary-button" type="button" data-action="complete-match" data-value="${match.id}">${t("completeMatch")}</button>` : ""}
      </div>
    </div>
  `;
  ui.chatMessages.innerHTML = messages.length
    ? messages.map(messageHTML).join("")
    : `<div class="empty-state">${t("chatPlaceholder")}</div>`;
  ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight;
  ui.chatForm.classList.remove("hidden");
  autosizeChatInput();
}

function threadSectionHTML(title, matches, emptyText) {
  return `
    <section class="thread-group">
      <div class="thread-group-head">
        <p class="eyebrow">${escapeHtml(title)}</p>
      </div>
      ${
        matches.length
          ? matches.map(threadItemHTML).join("")
          : `<div class="empty-state thread-empty-state">${escapeHtml(emptyText)}</div>`
      }
    </section>
  `;
}

function threadItemHTML(match) {
  const title = resolveMatchTitle(match);
  return `
    <article class="thread-item ${state.activeMatchId === match.id ? "thread-item-active" : ""}" data-action="select-match" data-value="${match.id}">
      <div class="thread-row">
        <strong class="thread-item-title">${escapeHtml(title)}</strong>
        ${statusPill(match.status)}
      </div>
      <p class="thread-item-meta">${escapeHtml(t("threadWith", { name: match.otherUser.name }))}</p>
      <p class="thread-item-body">${escapeHtml(match.latestMessage?.translatedBody || match.latestMessage?.originalBody || "")}</p>
    </article>
  `;
}

function renderProfile() {
  if (!state.currentUser) {
    state.profileAvatarDraft = null;
    ui.profileSummary.innerHTML = `
      <div class="empty-state">
        <p>${t("profileGuestTitle")}</p>
        <div class="wish-card-actions">
          <button class="primary-button" type="button" data-action="open-auth">${t("profileGuestAction")}</button>
        </div>
      </div>
    `;
    ui.profileFilters.innerHTML = "";
    ui.profileActivityList.innerHTML = `<div class="empty-state">${t("profileGuestTitle")}</div>`;
    return;
  }

  const sections = buildProfileSections();
  const availableKeys = sections.map((section) => section.key);
  if (!availableKeys.includes(state.profileFilter)) {
    state.profileFilter = "posted";
  }
  if (state.profileAvatarDraft === null) {
    state.profileAvatarDraft = state.currentUser.avatarDataUrl || "";
  }

  ui.profileSummary.innerHTML = profileSummaryHTML(sections);
  renderProfileActivity(sections);
}

function buildProfileSections() {
  const posted = [...(state.data?.myWishes || [])].sort(compareMyWishOrder);
  const requested = [...(state.data?.pendingMatches || [])];
  const matched = [...(state.data?.activeMatches || [])].filter((match) => match.status === "matched");
  const incoming = [...(state.data?.incomingRequests || [])];
  const completed = [...(state.data?.activeMatches || [])].filter((match) => match.status === "completed");

  return [
    { key: "posted", label: t("profileFilterPosted"), count: posted.length, items: posted, emptyText: t("profileNoPosted") },
    { key: "requested", label: t("profileFilterRequested"), count: requested.length, items: requested, emptyText: t("profileNoRequested") },
    { key: "matched", label: t("profileFilterMatched"), count: matched.length, items: matched, emptyText: t("profileNoMatched") },
    { key: "incoming", label: t("profileFilterIncoming"), count: incoming.length, items: incoming, emptyText: t("profileNoIncoming") },
    { key: "completed", label: t("profileFilterCompleted"), count: completed.length, items: completed, emptyText: t("profileNoCompleted") },
  ];
}

function renderProfileActivity(sections = buildProfileSections()) {
  const activeSection = sections.find((section) => section.key === state.profileFilter) || sections[0];
  ui.profileFilters.innerHTML = sections.map(profileFilterButtonHTML).join("");
  ui.profileActivityList.innerHTML = activeSection.items.length
    ? activeSection.items.map((item) => profileActivityCardHTML(activeSection.key, item)).join("")
    : `<div class="empty-state">${escapeHtml(activeSection.emptyText)}</div>`;
}

function profileSummaryHTML(sections) {
  const currentUser = state.currentUser;
  const location = deriveProfileLocation();
  const avatarMarkup = profileAvatarMarkup(currentUser);
  const stats = state.data?.stats || { availableCredits: 3 };
  const postedCount = sections.find((section) => section.key === "posted")?.count ?? 0;
  const matchedCount = sections.find((section) => section.key === "matched")?.count ?? 0;
  const completedCount = sections.find((section) => section.key === "completed")?.count ?? 0;

  return `
    <form class="profile-editor-form">
      <div class="profile-identity">
        <div class="profile-avatar-shell">
          ${avatarMarkup}
          <input id="profileAvatarInput" class="hidden" type="file" accept="image/*" />
          <input id="profileAvatarDataInput" type="hidden" value="${escapeHtml(state.profileAvatarDraft || "")}" />
        </div>
        <div class="profile-identity-copy">
          <p class="eyebrow">${escapeHtml(t("profileEditEyebrow"))}</p>
          <h3>${escapeHtml(t("profileEditTitle"))}</h3>
          <p class="subtle-line">${escapeHtml(t("profileLocationHint"))}</p>
        </div>
      </div>
      <div class="wish-card-actions profile-avatar-actions">
        <label class="ghost-button profile-avatar-trigger" for="profileAvatarInput">${escapeHtml(t("profileAvatarUpload"))}</label>
        <button class="ghost-button" type="button" data-action="remove-profile-avatar">${t("profileAvatarRemove")}</button>
      </div>
      <div class="profile-form-grid">
        <label>
          <span>${escapeHtml(t("profileNickname"))}</span>
          <input id="profileNameInput" type="text" maxlength="80" value="${escapeHtml(currentUser.name)}" />
        </label>
        <label>
          <span>${escapeHtml(t("profileEmail"))}</span>
          <div class="profile-static-field">${escapeHtml(currentUser.email)}</div>
        </label>
        <label>
          <span>${escapeHtml(t("profileLanguage"))}</span>
          <select id="profileLanguageInput">
            <option value="zh" ${currentUser.preferredLanguage === "zh" ? "selected" : ""}>${escapeHtml(t("languageZh"))}</option>
            <option value="en" ${currentUser.preferredLanguage === "en" ? "selected" : ""}>${escapeHtml(t("languageEn"))}</option>
          </select>
        </label>
        <label>
          <span>${escapeHtml(t("profileLocation"))}</span>
          <input id="profileLocationInput" type="text" maxlength="180" value="${escapeHtml(location)}" />
          <input id="profileLocationLatInput" type="hidden" value="${currentUser.locationLat ?? ""}" />
          <input id="profileLocationLngInput" type="hidden" value="${currentUser.locationLng ?? ""}" />
        </label>
      </div>
      <div class="wish-card-actions">
        <button class="ghost-button" type="button" data-action="use-current-location">${t("profileUseCurrentLocation")}</button>
        <button class="primary-button" type="button" data-action="save-profile">${t("profileSave")}</button>
      </div>
    </form>
    <div class="profile-stat-grid">
      <article class="profile-stat-card">
        <span>${escapeHtml(t("profileCredits"))}</span>
        <strong>${escapeHtml(String(stats.availableCredits ?? 3))}</strong>
      </article>
      <article class="profile-stat-card">
        <span>${escapeHtml(t("profilePostedCount"))}</span>
        <strong>${escapeHtml(String(postedCount))}</strong>
      </article>
      <article class="profile-stat-card">
        <span>${escapeHtml(t("profileMatchedCount"))}</span>
        <strong>${escapeHtml(String(matchedCount))}</strong>
      </article>
      <article class="profile-stat-card">
        <span>${escapeHtml(t("profileCompletedCount"))}</span>
        <strong>${escapeHtml(String(completedCount))}</strong>
      </article>
    </div>
    <div class="wish-card-actions">
      <button class="ghost-button" type="button" data-action="logout">${t("profileLogout")}</button>
    </div>
  `;
}

function profileAvatarMarkup(currentUser) {
  const avatarDataUrl = state.profileAvatarDraft || currentUser.avatarDataUrl || "";
  if (avatarDataUrl) {
    return `<img class="profile-avatar-image" src="${escapeHtml(avatarDataUrl)}" alt="${escapeHtml(currentUser.name)}" />`;
  }
  return `<div class="profile-avatar" aria-hidden="true">${escapeHtml(avatarInitials(currentUser.name))}</div>`;
}

function profileFilterButtonHTML(section) {
  return `
    <button
      class="profile-filter-button ${state.profileFilter === section.key ? "profile-filter-button-active" : ""}"
      type="button"
      data-action="profile-filter"
      data-value="${section.key}"
    >
      <span>${escapeHtml(section.label)}</span>
      <strong>${escapeHtml(String(section.count))}</strong>
    </button>
  `;
}

function profileActivityCardHTML(type, item) {
  if (type === "posted") {
    const actionButtons = [{ action: "open-detail", value: item.id, label: t("openDetail") }];
    if (item.canManage) {
      actionButtons.push({ action: "edit-wish", value: item.id, label: t("editWish") });
      actionButtons.push({ action: "delete-wish-confirm", value: item.id, label: t("deleteWish") });
    }
    return wishCardHTML(item, { showOwner: false, actionButtons });
  }
  return matchCardHTML(item);
}

function deriveProfileLocation() {
  if (state.currentUser?.locationLabel) return state.currentUser.locationLabel;
  const latestWish = [...(state.data?.myWishes || [])].sort((left, right) => {
    const leftTime = Date.parse(left.createdAt || "") || 0;
    const rightTime = Date.parse(right.createdAt || "") || 0;
    return rightTime - leftTime;
  })[0];
  if (latestWish?.place) return latestWish.place;

  const firstMatchPlace = state.data?.activeMatches?.[0]?.wish?.place;
  return firstMatchPlace || t("profileLocationUnset");
}

function avatarInitials(name) {
  const clean = (name || "").trim();
  if (!clean) return "WO";
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

function renderDemoAccounts() {
  const accounts = state.data?.demoAccounts || [];
  ui.demoAccounts.innerHTML = accounts
    .map(
      (account) => `
        <div class="demo-account">
          <div>
            <strong>${escapeHtml(account.name)}</strong>
            <p class="subtle-line">${escapeHtml(account.email)} · ${escapeHtml(t("demoHint"))}: ${escapeHtml(account.passwordHint)}</p>
          </div>
          <button class="ghost-button" type="button" data-action="use-demo" data-email="${account.email}" data-password="${account.passwordHint}">${t("authDemoPrefix")}</button>
        </div>
      `
    )
    .join("");
}

function renderCoordinate() {
  ui.selectedCoordinates.textContent = state.draftCoordinate
    ? `${state.draftCoordinate.lat}, ${state.draftCoordinate.lng}`
    : t("coordinateUnset");
}

function renderPlaceSearchMeta(message = "") {
  ui.placeSearchMeta.textContent = message;
}

function renderPlaceSearchResults() {
  const results = state.placeSearchResults || [];
  ui.placeSearchResults.innerHTML = results
    .map(
      (result, index) => `
        <button class="place-result-button" type="button" data-action="pick-search-place" data-value="${index}">
          <strong>${escapeHtml(result.label)}</strong>
          <span>${escapeHtml(result.displayName)}</span>
        </button>
      `
    )
    .join("");
}

function clearComposerPlaceAssist() {
  state.placeSearchResults = [];
  renderPlaceSearchMeta("");
  renderPlaceSearchResults();
}

function applyComposerPlaceResult(result, { focusMap = true, updateInput = true, metaMessage = "" } = {}) {
  if (!result) return;
  if (updateInput) {
    ui.wishPlaceInput.value = result.label;
  }
  state.draftCoordinate = {
    lat: Number(Number(result.lat).toFixed(4)),
    lng: Number(Number(result.lng).toFixed(4)),
  };
  renderCoordinate();
  syncComposerDraftMarker();
  if (focusMap) {
    state.composerMap?.jumpTo({
      center: [state.draftCoordinate.lng, state.draftCoordinate.lat],
      zoom: 10.6,
    });
  }
  if (metaMessage) {
    renderPlaceSearchMeta(metaMessage);
  }
}

function renderDetail() {
  const wish = state.detailWish;
  if (!wish) {
    ui.detailBody.innerHTML = `<div class="empty-state">${t("noDetail")}</div>`;
    return;
  }
  const copy = resolveWishCopy(wish);
  const incomingRequests = wish.incomingRequests || [];
  ui.detailBody.innerHTML = `
    <section class="wish-card">
      <div class="wish-card-head">
        <div>
          <h4 class="wish-card-title">${escapeHtml(copy.title)}</h4>
          <p class="wish-card-meta">${escapeHtml(t("byOwner", { name: wish.owner.name }))}</p>
        </div>
        ${statusPill(wish.status)}
      </div>
      <p class="wish-card-body">${escapeHtml(copy.description)}</p>
      ${translationFooterHTML(wish)}
      <div class="detail-meta">
        <span class="translate-badge">${escapeHtml(`${t("detailPlace")}: ${wish.place}`)}</span>
        <span class="translate-badge">${escapeHtml(`${t("detailStatus")}: ${statusLabel(wish.status)}`)}</span>
      </div>
      <div class="wish-card-actions">
        <button class="ghost-button" type="button" data-action="center-on-map" data-value="${wish.id}">${t("tabMap")}</button>
        ${
          wish.canManage
            ? `<button class="ghost-button" type="button" data-action="edit-wish" data-value="${wish.id}">${t("editWish")}</button>`
            : ""
        }
        ${
          wish.canManage
            ? `<button class="ghost-button" type="button" data-action="delete-wish-confirm" data-value="${wish.id}">${t("deleteWish")}</button>`
            : ""
        }
        ${
          wish.canRequestHelp
            ? `<button class="primary-button" type="button" data-action="request-help" data-value="${wish.id}">${t("requestHelp")}</button>`
            : ""
        }
        ${
          wish.viewerMatchId && wish.viewerMatchStatus === "matched"
            ? `<button class="primary-button" type="button" data-action="open-chat" data-value="${wish.viewerMatchId}">${t("openChat")}</button>`
            : ""
        }
      </div>
    </section>
    <section class="wish-card">
      <div class="panel-head compact-head">
        <div>
          <p class="eyebrow">${t("incomingRequestsLabel")}</p>
          <h4>${t("incomingTitle")}</h4>
        </div>
      </div>
      ${
        incomingRequests.length
          ? incomingRequests.map(matchCardHTML).join("")
          : `<div class="empty-state">${t("noIncomingForWish")}</div>`
      }
    </section>
  `;
}

function wishCardHTML(wish, { showOwner = true, actionButtons = [] } = {}) {
  const copy = resolveWishCopy(wish);
  return `
    <article class="wish-card">
      <div class="wish-card-head">
        <div>
          <h4 class="wish-card-title">${escapeHtml(copy.title)}</h4>
          <p class="wish-card-meta">${escapeHtml(showOwner ? t("byOwner", { name: wish.owner.name }) : t("locatedAt", { place: wish.place }))}</p>
        </div>
        ${statusPill(wish.status)}
      </div>
      <p class="wish-card-body">${escapeHtml(copy.description)}</p>
      ${translationFooterHTML(wish)}
      <div class="wish-card-actions">
        ${actionButtons
          .map(
            (button) =>
              `<button class="${button.primary ? "primary-button" : "ghost-button"}" type="button" data-action="${button.action}" data-value="${button.value}">${escapeHtml(button.label)}</button>`
          )
          .join("")}
        ${
          !actionButtons.length
            ? `<button class="ghost-button" type="button" data-action="open-detail" data-value="${wish.id}">${t("openDetail")}</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function matchCardHTML(match) {
  return `
    <article class="wish-card">
      <div class="wish-card-head">
        <div>
          <h4 class="wish-card-title">${escapeHtml(resolveMatchTitle(match))}</h4>
          <p class="wish-card-meta">${escapeHtml(match.otherUser.name)}</p>
        </div>
        ${statusPill(match.status)}
      </div>
      <p class="wish-card-meta">${escapeHtml(match.wish.place)}</p>
      <div class="wish-card-actions">
        <button class="ghost-button" type="button" data-action="open-detail" data-value="${match.wish.id}">${t("openDetail")}</button>
        ${
          match.status === "pending" && match.viewerRole === "owner"
            ? `<button class="primary-button" type="button" data-action="approve-request" data-value="${match.id}">${t("approveHelp")}</button>`
            : ""
        }
        ${
          match.status === "matched" || match.status === "completed"
            ? `<button class="primary-button" type="button" data-action="open-chat" data-value="${match.id}">${t("openChat")}</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function messageHTML(message) {
  const copy = message.translatedBody || message.originalBody;
  return `
    <article class="chat-bubble ${message.isMine ? "chat-bubble-mine" : ""}">
      <div class="chat-bubble-copy">${escapeHtml(copy)}</div>
      <div class="chat-bubble-meta">
        ${escapeHtml(message.sender.name)} · ${escapeHtml(formatDate(message.createdAt))}
        ${message.translatedBody ? ` · ${escapeHtml(t("messageAuto", { language: languageLabel(message.sourceLanguage) }))}` : ""}
      </div>
    </article>
  `;
}

function translationFooterHTML(wish) {
  const copy = resolveWishCopy(wish);
  if (!wish.hasTranslation) {
    return `
      <div class="wish-card-footer">
        <span class="translate-badge">${escapeHtml(t("translationOriginal", { language: languageLabel(wish.sourceLanguage) }))}</span>
      </div>
    `;
  }

  const label = copy.useOriginal
    ? t("translationOriginal", { language: languageLabel(wish.sourceLanguage) })
    : t("translationAuto", { language: languageLabel(wish.sourceLanguage) });

  return `
    <div class="wish-card-footer">
      <span class="translate-badge">${escapeHtml(label)}</span>
      <button class="text-link" type="button" data-action="toggle-original" data-value="${wish.id}">
        ${copy.useOriginal ? escapeHtml(t("showTranslated")) : escapeHtml(t("showOriginal"))}
      </button>
    </div>
  `;
}

function resolveWishCopy(wish) {
  const useOriginal = state.wishDisplayModes[wish.id] === "original" || !wish.hasTranslation;
  return {
    title: useOriginal ? wish.originalTitle : wish.translatedTitle,
    description: useOriginal ? wish.originalDescription : wish.translatedDescription,
    useOriginal
  };
}

function resolveMatchTitle(match) {
  return state.language === match.wish.sourceLanguage || !match.wish.translatedTitle
    ? match.wish.originalTitle
    : match.wish.translatedTitle;
}

function statusPill(status) {
  const css =
    status === "matched" ? "status-matched" : status === "completed" ? "status-completed" : status === "pending" ? "status-pending" : "status-open";
  return `<span class="status-pill ${css}">${escapeHtml(statusLabel(status))}</span>`;
}

function statusLabel(status) {
  if (status === "cancelled") return t("cancelledState");
  if (status === "matched") return t("matchedState");
  if (status === "completed") return t("completedState");
  if (status === "pending") return t("pendingState");
  return t("openState");
}

function getDiscoverQueue() {
  const wishes = state.data?.discoverWishes || [];
  return wishes.filter((wish) => !state.passedWishIds.includes(wish.id));
}

function setActiveView(viewName) {
  state.activeView = viewName;
  ui.views.forEach((view) => {
    view.classList.toggle("view-active", view.dataset.view === viewName);
  });
  ui.tabButtons.forEach((button) => {
    button.classList.toggle("tab-button-active", button.dataset.viewTarget === viewName);
  });
  if (viewName === "map") {
    pauseGlobeSpin();
    setTimeout(() => {
      state.map?.resize();
      state.map?.jumpTo({
        center: state.map.getCenter(),
        zoom: state.map.getZoom(),
        pitch: state.map.getPitch(),
        bearing: state.map.getBearing(),
        padding: MAP_HOME_PADDING
      });
    }, 120);
  }
}

function openAuth(mode = "login") {
  setAuthMode(mode, { silent: true });
  ui.authModal.classList.remove("hidden");
  ui.authModal.setAttribute("aria-hidden", "false");
}

function closeAuth() {
  ui.authModal.classList.add("hidden");
  ui.authModal.setAttribute("aria-hidden", "true");
}

function setAuthMode(mode, { silent = false } = {}) {
  state.authMode = mode === "register" ? "register" : "login";
  ui.authTabs.forEach((button) => {
    button.classList.toggle("auth-tab-active", button.dataset.authMode === state.authMode);
  });
  ui.authNameField.classList.toggle("hidden", state.authMode !== "register");
  ui.authSubmitButton.textContent = state.authMode === "register" ? t("authSubmitRegister") : t("authSubmitLogin");
  if (!silent) {
    ui.authNameInput.value = "";
    ui.authPasswordInput.value = "";
  }
}

function openComposer() {
  if (!requireAuth()) return;
  state.editingWishId = null;
  state.draftCoordinate = null;
  clearComposerPlaceAssist();
  renderCoordinate();
  ui.wishForm.reset();
  ui.composerModal.classList.remove("hidden");
  ui.composerModal.setAttribute("aria-hidden", "false");
  ui.mapNotice.textContent = t("mapNoticeComposer");
  applyStaticText();
  ensureComposerMap();
  requestAnimationFrame(() => {
    state.composerMap?.resize();
    syncComposerDraftMarker();
    state.composerMap?.jumpTo({
      center: COMPOSER_MAP_DEFAULT.center,
      zoom: COMPOSER_MAP_DEFAULT.zoom
    });
  });
}

function closeComposer() {
  ui.composerModal.classList.add("hidden");
  ui.composerModal.setAttribute("aria-hidden", "true");
  state.editingWishId = null;
  state.draftCoordinate = null;
  clearComposerPlaceAssist();
  renderCoordinate();
  ui.mapNotice.textContent = t("mapNoticeDefault");
  applyStaticText();
}

function openEditWish(wishId) {
  if (!requireAuth()) return;
  const wish = state.data?.myWishes?.find((item) => item.id === wishId);
  if (!wish || wish.status !== "open") return;

  state.editingWishId = wish.id;
  state.draftCoordinate = {
    lat: Number(wish.lat),
    lng: Number(wish.lng),
  };
  clearComposerPlaceAssist();
  ui.wishTitleInput.value = wish.originalTitle;
  ui.wishDescriptionInput.value = wish.originalDescription;
  ui.wishPlaceInput.value = wish.place;
  renderCoordinate();
  ui.composerModal.classList.remove("hidden");
  ui.composerModal.setAttribute("aria-hidden", "false");
  ui.mapNotice.textContent = t("mapNoticeComposer");
  applyStaticText();
  ensureComposerMap();
  requestAnimationFrame(() => {
    state.composerMap?.resize();
    syncComposerDraftMarker();
    state.composerMap?.jumpTo({
      center: [wish.lng, wish.lat],
      zoom: 7.2
    });
  });
}

function ensureComposerMap() {
  if (state.composerMap || !ui.composerMap) return;
  state.composerMap = new maplibregl.Map({
    container: "composerMap",
    center: COMPOSER_MAP_DEFAULT.center,
    zoom: COMPOSER_MAP_DEFAULT.zoom,
    minZoom: 1.4,
    maxZoom: 15,
    attributionControl: false,
    style: "https://demotiles.maplibre.org/style.json"
  });

  state.composerMap.addControl(
    new maplibregl.NavigationControl({
      showCompass: false,
      visualizePitch: false
    }),
    "bottom-right"
  );

  state.composerMap.on("load", () => {
    state.composerMapReady = true;
    syncComposerDraftMarker();
  });

  state.composerMap.on("click", (event) => {
    state.draftCoordinate = {
      lat: Number(event.lngLat.lat.toFixed(4)),
      lng: Number(event.lngLat.lng.toFixed(4))
    };
    renderCoordinate();
    syncComposerDraftMarker();
    reverseLookupComposerLocation();
  });
}

async function searchComposerPlace() {
  const query = ui.wishPlaceInput.value.trim();
  if (!query) {
    renderPlaceSearchMeta(t("placeSearchPrompt"));
    ui.wishPlaceInput.focus();
    return;
  }

  ui.placeSearchButton.disabled = true;
  ui.placeSearchButton.textContent = t("searchingPlace");
  renderPlaceSearchMeta(t("searchingPlace"));
  state.placeSearchResults = [];
  renderPlaceSearchResults();

  try {
    const response = await api(`/api/places/search?q=${encodeURIComponent(query)}&language=${state.language}`);
    const results = response.results || [];
    state.placeSearchResults = results;
    renderPlaceSearchResults();

    if (!results.length) {
      renderPlaceSearchMeta(t("placeSearchNoResults"));
      return;
    }

    applyComposerPlaceResult(results[0], { metaMessage: t("placeSearchPicked") });
  } catch (error) {
    renderPlaceSearchMeta(error.message || t("placeSearchFailed"));
  } finally {
    ui.placeSearchButton.disabled = false;
    ui.placeSearchButton.textContent = t("placeSearchButton");
  }
}

async function reverseLookupComposerLocation() {
  if (!state.draftCoordinate) return;
  renderPlaceSearchMeta(t("placeReverseLooking"));
  try {
    const response = await api(
      `/api/places/reverse?lat=${encodeURIComponent(state.draftCoordinate.lat)}&lng=${encodeURIComponent(state.draftCoordinate.lng)}&language=${state.language}`
    );
    if (!response.place) {
      renderPlaceSearchMeta("");
      return;
    }
    state.placeSearchResults = [response.place];
    renderPlaceSearchResults();
    applyComposerPlaceResult(response.place, {
      focusMap: false,
      updateInput: true,
      metaMessage: t("placeReversePicked")
    });
  } catch (_error) {
    renderPlaceSearchMeta("");
  }
}

function syncComposerDraftMarker() {
  if (!state.composerMap || !state.composerMapReady) return;
  if (!state.draftCoordinate) {
    state.composerMarker?.remove();
    state.composerMarker = null;
    return;
  }

  if (!state.composerMarker) {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "composer-picker-marker";
    marker.setAttribute("aria-label", "Selected location");
    marker.innerHTML = `<span class="composer-picker-marker-core"></span><span class="composer-picker-marker-ring"></span>`;
    state.composerMarker = new maplibregl.Marker({ element: marker, anchor: "center" })
      .setLngLat([state.draftCoordinate.lng, state.draftCoordinate.lat])
      .addTo(state.composerMap);
  } else {
    state.composerMarker.setLngLat([state.draftCoordinate.lng, state.draftCoordinate.lat]);
  }
}

async function openDetail(wishId) {
  try {
    const response = await api(`/api/wishes/${wishId}?language=${state.language}`);
    state.detailWish = response.wish;
    state.detailWishId = wishId;
    renderDetail();
    ui.detailModal.classList.remove("hidden");
    ui.detailModal.setAttribute("aria-hidden", "false");
    syncWishQuery(wishId);
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

function closeDetail() {
  ui.detailModal.classList.add("hidden");
  ui.detailModal.setAttribute("aria-hidden", "true");
  state.detailWish = null;
  state.detailWishId = null;
  syncWishQuery(null);
}

function openCompletion(result) {
  ui.completionBody.innerHTML = `
    <section class="wish-card completion-summary-card">
      <div class="panel-head compact-head">
        <div>
          <p class="eyebrow">${escapeHtml(result.ownerName)}</p>
          <h4>${escapeHtml(result.title)}</h4>
        </div>
        ${statusPill("completed")}
      </div>
      <p class="wish-card-body">${escapeHtml(t("completionText"))}</p>
      <div class="detail-meta">
        <span class="translate-badge">${escapeHtml(t("completionCredit"))}</span>
      </div>
      <div class="wish-card-actions">
        <button class="primary-button" type="button" data-action="close-completion">${t("completionAction")}</button>
      </div>
    </section>
  `;
  ui.completionModal.classList.remove("hidden");
  ui.completionModal.setAttribute("aria-hidden", "false");
}

function closeCompletion() {
  ui.completionModal.classList.add("hidden");
  ui.completionModal.setAttribute("aria-hidden", "true");
  ui.completionBody.innerHTML = "";
}

function openConfirm(config) {
  document.getElementById("confirmTitle").textContent = config.title;
  ui.confirmBody.innerHTML = `
    <section class="wish-card completion-summary-card">
      <p class="wish-card-body">${escapeHtml(config.text)}</p>
      <div class="wish-card-actions">
        <button class="ghost-button" type="button" data-action="close-confirm">${t("confirmCancelAction")}</button>
        <button class="primary-button" type="button" data-action="${config.action}" data-value="${config.value}">${escapeHtml(config.actionLabel)}</button>
      </div>
    </section>
  `;
  ui.confirmModal.classList.remove("hidden");
  ui.confirmModal.setAttribute("aria-hidden", "false");
}

function closeConfirm() {
  ui.confirmModal.classList.add("hidden");
  ui.confirmModal.setAttribute("aria-hidden", "true");
  ui.confirmBody.innerHTML = "";
}

async function submitAuth(event) {
  event.preventDefault();
  try {
    const payload =
      state.authMode === "register"
        ? {
            name: ui.authNameInput.value.trim(),
            email: ui.authEmailInput.value.trim(),
            password: ui.authPasswordInput.value,
            preferredLanguage: state.language
          }
        : {
            email: ui.authEmailInput.value.trim(),
            password: ui.authPasswordInput.value
          };

    const endpoint = state.authMode === "register" ? "/api/auth/register" : "/api/auth/login";
    await api(endpoint, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    closeAuth();
    await loadBootstrap();
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function submitWish(event) {
  event.preventDefault();
  if (!requireAuth()) return;
  if (!state.draftCoordinate) {
    showToast(t("composerNeedLocation"));
    return;
  }
  const isEditing = Boolean(state.editingWishId);
  try {
    await api(state.editingWishId ? `/api/wishes/${state.editingWishId}` : "/api/wishes", {
      method: state.editingWishId ? "PATCH" : "POST",
      body: JSON.stringify({
        title: ui.wishTitleInput.value.trim(),
        description: ui.wishDescriptionInput.value.trim(),
        place: ui.wishPlaceInput.value.trim(),
        language: state.language,
        lat: state.draftCoordinate.lat,
        lng: state.draftCoordinate.lng
      })
    });
    closeComposer();
    await loadBootstrap();
    showToast(t(isEditing ? "wishUpdated" : "wishCreated"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function deleteWish(wishId) {
  if (!requireAuth()) return;
  try {
    await api(`/api/wishes/${wishId}`, { method: "DELETE" });
    closeDetail();
    closeComposer();
    await loadBootstrap();
    showToast(t("wishDeleted"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function requestWishHelp(wishId) {
  if (!requireAuth()) return;
  try {
    await api(`/api/wishes/${wishId}/requests`, {
      method: "POST"
    });
    await loadBootstrap();
    if (state.detailWishId === wishId) {
      await openDetail(wishId);
    }
    showToast(t("requestSent"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function approveMatch(matchId) {
  if (!requireAuth()) return;
  try {
    const response = await api(`/api/matches/${matchId}/approve`, { method: "POST" });
    await loadBootstrap();
    showToast(t("requestApproved"));
    setActiveView("inbox");
    state.activeMatchId = response.match.id;
    await loadThread(response.match.id);
    if (state.detailWishId) {
      await openDetail(state.detailWishId);
    }
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function saveProfile() {
  if (!requireAuth()) return;
  const nameInput = document.getElementById("profileNameInput");
  const languageInput = document.getElementById("profileLanguageInput");
  const locationInput = document.getElementById("profileLocationInput");
  const locationLatInput = document.getElementById("profileLocationLatInput");
  const locationLngInput = document.getElementById("profileLocationLngInput");
  if (!nameInput || !languageInput || !locationInput) return;

  const saveButton = ui.profileSummary.querySelector('[data-action="save-profile"]');
  if (saveButton) {
    saveButton.disabled = true;
    saveButton.textContent = t("profileSaving");
  }

  try {
    const preferredLanguage = languageInput.value === "en" ? "en" : "zh";
    const response = await api("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({
        name: nameInput.value.trim(),
        preferredLanguage,
        avatarDataUrl: state.profileAvatarDraft || "",
        locationLabel: locationInput.value.trim(),
        locationLat: locationLatInput?.value || null,
        locationLng: locationLngInput?.value || null,
      })
    });
    state.currentUser = response.currentUser;
    if (state.language !== preferredLanguage) {
      state.language = preferredLanguage;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, preferredLanguage);
    }
    await loadBootstrap();
    showToast(t("profileUpdated"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  } finally {
    if (saveButton) {
      saveButton.disabled = false;
      saveButton.textContent = t("profileSave");
    }
  }
}

function handleProfileSummaryChange(event) {
  if (event.target.id === "profileAvatarInput") {
    const [file] = event.target.files || [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.profileAvatarDraft = typeof reader.result === "string" ? reader.result : "";
      const hiddenInput = document.getElementById("profileAvatarDataInput");
      if (hiddenInput) hiddenInput.value = state.profileAvatarDraft;
      renderProfile();
    };
    reader.readAsDataURL(file);
    return;
  }

  if (event.target.id === "profileLocationInput") {
    const locationLatInput = document.getElementById("profileLocationLatInput");
    const locationLngInput = document.getElementById("profileLocationLngInput");
    if (locationLatInput) locationLatInput.value = "";
    if (locationLngInput) locationLngInput.value = "";
  }
}

async function useCurrentLocation() {
  if (!navigator.geolocation) {
    showToast(t("geolocationUnsupported"));
    return;
  }

  showToast(t("geolocationLooking"));
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = Number(position.coords.latitude.toFixed(6));
      const lng = Number(position.coords.longitude.toFixed(6));
      const locationLatInput = document.getElementById("profileLocationLatInput");
      const locationLngInput = document.getElementById("profileLocationLngInput");
      const locationInput = document.getElementById("profileLocationInput");

      if (locationLatInput) locationLatInput.value = String(lat);
      if (locationLngInput) locationLngInput.value = String(lng);

      try {
        const response = await api(`/api/places/reverse?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&language=${state.language}`);
        if (response.place && locationInput) {
          locationInput.value = response.place.label;
        }
      } catch (_error) {
        if (locationInput && !locationInput.value.trim()) {
          locationInput.value = `${lat}, ${lng}`;
        }
      }
    },
    (error) => {
      if (error?.code === error.PERMISSION_DENIED) {
        showToast(t("geolocationDenied"));
      } else {
        showToast(t("errorFallback"));
      }
    },
    { enableHighAccuracy: true, timeout: 12000 }
  );
}

async function completeMatch(matchId) {
  if (!requireAuth()) return;
  try {
    const currentMatch =
      state.activeThread?.match?.id === matchId
        ? state.activeThread.match
        : state.data?.activeMatches?.find((match) => match.id === matchId);
    await api(`/api/matches/${matchId}/complete`, { method: "POST" });
    await loadBootstrap();
    if (state.activeMatchId === matchId) {
      await loadThread(matchId);
    }
    showToast(t("matchCompleted"));
    closeDetail();
    if (currentMatch) {
      openCompletion({
        title: resolveMatchTitle(currentMatch),
        ownerName: currentMatch.otherUser.name
      });
    }
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function unmatch(matchId) {
  if (!requireAuth()) return;
  try {
    await api(`/api/matches/${matchId}/unmatch`, { method: "POST" });
    await loadBootstrap();
    if (state.activeMatchId === matchId) {
      state.activeThread = null;
      state.activeMatchId = state.data?.activeMatches?.[0]?.id ?? null;
      if (state.activeMatchId) {
        await loadThread(state.activeMatchId, { silent: true });
      } else {
        renderThreads();
        renderChatThread();
      }
    }
    showToast(t("unmatchDone"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function loadThread(matchId, { silent = false } = {}) {
  if (!matchId || !state.currentUser) return;
  try {
    const response = await api(`/api/matches/${matchId}/messages?language=${state.language}`);
    state.activeMatchId = matchId;
    state.activeThread = response;
    renderThreads();
    renderChatThread();
  } catch (error) {
    if (!silent) {
      showToast(error.message || t("errorFallback"));
    }
  }
}

async function sendChatMessage(event) {
  event.preventDefault();
  if (!requireAuth() || !state.activeMatchId) return;
  const body = ui.chatInput.value.trim();
  if (!body) return;
  try {
    await api(`/api/matches/${state.activeMatchId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        body,
        language: state.language
      })
    });
    ui.chatInput.value = "";
    autosizeChatInput();
    await loadThread(state.activeMatchId, { silent: true });
    await loadBootstrap();
    showToast(t("messageSent"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function logout() {
  try {
    await api("/api/auth/logout", { method: "POST" });
    state.currentUser = null;
    state.activeMatchId = null;
    state.activeThread = null;
    stopChatPolling();
    await loadBootstrap();
    showToast(t("signedOut"));
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

async function useDemoAccount(email, password) {
  try {
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    closeAuth();
    await loadBootstrap();
  } catch (error) {
    showToast(error.message || t("errorFallback"));
  }
}

function passTopDiscoverWish() {
  const topWish = getDiscoverQueue()[0];
  if (!topWish) return;
  state.passedWishIds.push(topWish.id);
  savePassedWishIds();
  renderDiscoverDeck();
}

function requestTopDiscoverWish() {
  const topWish = getDiscoverQueue()[0];
  if (!topWish) return;
  requestWishHelp(topWish.id);
}

function handleAction(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;

  const action = actionTarget.dataset.action;
  const rawValue = actionTarget.dataset.value ?? null;
  const value = rawValue !== null && /^-?\d+$/.test(rawValue) ? Number(rawValue) : rawValue;

  if (action === "open-detail" && value) {
    openDetail(value);
    return;
  }
  if (action === "edit-wish" && value) {
    closeDetail();
    openEditWish(value);
    return;
  }
  if (action === "delete-wish-confirm" && value) {
    openConfirm({
      title: t("deleteWishConfirmTitle"),
      text: t("deleteWishConfirmText"),
      action: "confirm-delete-wish",
      value,
      actionLabel: t("deleteWish")
    });
    return;
  }
  if (action === "close-confirm") {
    closeConfirm();
    return;
  }
  if (action === "toggle-original" && value) {
    toggleWishDisplay(value);
    return;
  }
  if (action === "request-help" && value) {
    requestWishHelp(value);
    return;
  }
  if (action === "approve-request" && value) {
    approveMatch(value);
    return;
  }
  if (action === "open-chat" && value) {
    closeDetail();
    setActiveView("inbox");
    loadThread(value);
    return;
  }
  if (action === "complete-match" && value) {
    openConfirm({
      title: t("confirmCompleteTitle"),
      text: t("confirmCompleteText"),
      action: "confirm-complete-match",
      value,
      actionLabel: t("confirmCompleteAction")
    });
    return;
  }
  if (action === "confirm-complete-match" && value) {
    closeConfirm();
    completeMatch(value);
    return;
  }
  if (action === "unmatch-confirm" && value) {
    openConfirm({
      title: t("unmatchConfirmTitle"),
      text: t("unmatchConfirmText"),
      action: "confirm-unmatch",
      value,
      actionLabel: t("unmatch")
    });
    return;
  }
  if (action === "confirm-unmatch" && value) {
    closeConfirm();
    unmatch(value);
    return;
  }
  if (action === "confirm-delete-wish" && value) {
    closeConfirm();
    deleteWish(value);
    return;
  }
  if (action === "select-match" && value) {
    loadThread(value);
    return;
  }
  if (action === "logout") {
    logout();
    return;
  }
  if (action === "save-profile") {
    saveProfile();
    return;
  }
  if (action === "use-current-location") {
    useCurrentLocation();
    return;
  }
  if (action === "remove-profile-avatar") {
    state.profileAvatarDraft = "";
    renderProfile();
    return;
  }
  if (action === "open-auth") {
    openAuth("login");
    return;
  }
  if (action === "close-completion") {
    closeCompletion();
    return;
  }
  if (action === "center-on-map" && value) {
    const wish = state.data?.wishes.find((item) => item.id === value) || state.detailWish;
    if (wish) {
      closeDetail();
      setActiveView("map");
      pauseGlobeSpin();
      state.map?.flyTo({
        center: [wish.lng, wish.lat],
        zoom: 1.45,
        pitch: 20,
        bearing: -18,
        speed: 0.7,
        essential: true
      });
    }
    return;
  }
  if (action === "use-demo") {
    useDemoAccount(actionTarget.dataset.email, actionTarget.dataset.password);
    return;
  }
  if (action === "profile-filter" && typeof value === "string") {
    state.profileFilter = value;
    renderProfileActivity();
    return;
  }
  if (action === "pick-search-place") {
    const index = Number(actionTarget.dataset.value);
    const result = state.placeSearchResults?.[index];
    if (result) {
      applyComposerPlaceResult(result, { metaMessage: t("placeSearchPicked") });
    }
  }
}

function toggleWishDisplay(wishId) {
  state.wishDisplayModes[wishId] = state.wishDisplayModes[wishId] === "original" ? "translated" : "original";
  renderApp();
}

async function toggleLanguage() {
  state.language = state.language === "zh" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
  applyStaticText();
  if (state.currentUser) {
    try {
      await api("/api/preferences/language", {
        method: "POST",
        body: JSON.stringify({ language: state.language })
      });
    } catch (_error) {
      // Keep the client-side language switch even if the preference update fails.
    }
  }
  loadBootstrap();
}

function requireAuth() {
  if (state.currentUser) return true;
  showToast(t("guestToast"));
  openAuth("login");
  return false;
}

function syncWishQuery(wishId) {
  const url = new URL(window.location.href);
  if (wishId) {
    url.searchParams.set("wish", String(wishId));
  } else {
    url.searchParams.delete("wish");
  }
  window.history.replaceState({}, "", url);
}

function startChatPolling() {
  stopChatPolling();
  state.chatPollTimer = window.setInterval(() => {
    if (state.activeMatchId) {
      loadThread(state.activeMatchId, { silent: true });
    }
  }, 6000);
}

function stopChatPolling() {
  if (state.chatPollTimer) {
    window.clearInterval(state.chatPollTimer);
    state.chatPollTimer = null;
  }
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || t("errorFallback"));
  }
  return payload;
}

function t(key, vars = {}) {
  const table = STRINGS[state.language] || STRINGS.zh;
  const fallback = STRINGS.zh[key] || "";
  const template = table[key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, token) => String(vars[token] ?? ""));
}

function languageLabel(code) {
  return code === "en" ? t("languageEn") : t("languageZh");
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat(state.language === "zh" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch (_error) {
    return value;
  }
}

function loadPassedWishIds() {
  try {
    const raw = JSON.parse(localStorage.getItem(PASSED_STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch (_error) {
    return [];
  }
}

function savePassedWishIds() {
  localStorage.setItem(PASSED_STORAGE_KEY, JSON.stringify(state.passedWishIds));
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  ui.toastRegion.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3000);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

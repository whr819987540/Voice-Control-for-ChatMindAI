console.log("entry.js")

// 为了防止页面未加载完就执行内容脚本，需要等html中出现textarea这个label后再执行该内容脚本
// 目标节点
const targetNode = document.getElementsByTagName("textarea");
// 注册观察器
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const nodesAdded = Array.from(mutation.addedNodes); // 获取被添加的节点列表
        for (var nodeAdded of nodesAdded) {
            // console.log(nodeAdded);
            // console.log(nodeAdded.className);
            if (nodeAdded.className == "n-config-provider h-full") {
                // 停止观察
                observer.disconnect();
                // 包含目标节点，则执行 JS
                console.log("目标节点已经出现了，可执行下一步逻辑！");
                // 在这里编写需要执行的 JS 逻辑
                // js = document.createElement("script");
                // js.type = "text/javascript";
                // js.src = chrome.runtime.getURL('index.js');
                // document.body.appendChild(js);

                console.log("extension starts");
                // 定义插件style
                const e = document.createElement("style");
                var n;
                (e.innerHTML =
                    '\n#sai-root {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10px;\n}\n\n#sai-input-wrapper {\n  position: relative;\n  cursor: pointer;\n  background-color: #e02d2d;\n  animation-name: color;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  max-width: 75%;\n}\n\n#sai-input-wrapper:hover {\n  opacity: 0.7;\n}\n\n#sai-input-wrapper div.w-full {\n  padding-right: 35px;\n}\n\n#sai-input-wrapper div {\n  display: block;\n  min-height: 24px;\n  color: #fff;\n}\n\n#sai-input-wrapper.is-idle {\n  background-color: #9a8e81;\n  animation: none;\n}\n\n/*.light #sai-input-wrapper.is-idle {\n  background-color: #7f7a89;\n}*/\n\n#sai-input-wrapper.is-idle #sai-speech-button {\n  right: 50%;\n  margin-right: -13px;\n  width: 24px;\n  height: 24px;\n  top: 12px;\n}\n\n#sai-input-wrapper.is-idle #sai-speech-button svg {\n  width: 24px;\n  height: 24px;\n}\n\n#sai-speech-button {\n  position: absolute;\n  top: 10px;\n  right: 12px;\n  width: 18px;\n  transition: 0.5s;\n  right: 10px;\n  user-select: none;\n}\n\n#sai-speech-button svg {\n  width: 18px;\n  height: 18px;\n}\n\n#sai-input-wrapper.is-idle #sai-cancel-msg {\n  visibility: hidden;\n  opacity: 0;\n}\n\n#sai-button-wrapper {\n  display: flex;\n  justify-content: space-between;\n  flex: 1;\n  padding: 10px 15px;\n  background: #eeeeee;\n  margin-left: 15px;\n  border-radius: 5px;\n}\n\n.dark #sai-button-wrapper {\n  background: #eeeeee4a;\n}\n\n#sai-cancel-msg {\n  font-size: 8px;\n  color: #fff;\n  position: absolute;\n  bottom: -7px;\n  right: 12px;\n  transition: 0.2s;\n  user-select: none;\n  visibility: visible;\n  opacity: 1;\n}\n\n#sai-speech-button path {\n  fill: #fff;\n}\n\n#sai-lang-selector-wrapper {\n  display: flex;\n  align-items: center;\n}\n\n#sai-no-voices {\n  font-size: 12px;\n  cursor: pointer;\n}\n\n#sai-no-voices:hover {\n  opacity: 0.8;\n}\n\n#sai-lang-selector {\n  font-size: 12px;\n  height: 25px;\n  padding: 0 10px;\n  user-select: none;\n  height: 30px;\n}\n\n#sai-lang-selector.sai-hide {\n  display: none;\n}\n\n.dark #sai-lang-selector {\n  color: #000 !important;\n}\n\n#sai-settings-button {\n  background-color: #1a82bc;\n  padding: 3px 4px;\n  border-radius: 5px;\n}\n\n#sai-settings-button svg {\n  width: 24px;\n  height: 24px;\n}\n\n#sai-disable-read-aloud:hover,\n#sai-settings-button:hover {\n  opacity: 0.8;\n  cursor: pointer;\n}\n\n#sai-disable-read-aloud {\n  background-color: #1abc9c;\n  padding: 3px 4px;\n  border-radius: 5px;\n  margin-left: 10px;\n  margin-right: 10px;\n  position: relative;\n}\n\n#sai-disable-read-aloud.disabled {\n  background-color: #cb4b4b;\n}\n\n#sai-disable-read-aloud.disabled:before {\n  content: "";\n  width: 2px;\n  height: 25px;\n  background-color: #fff;\n  position: absolute;\n  transform: rotate(45deg);\n  left: 13px;\n}\n\n#sai-disable-read-aloud svg {\n  fill: rgba(0,0,0,0.0);\n  width: 24px;\n}\n\n@keyframes color {\n  0% {\n    background-color: #e02d2d;\n  }\n  50% {\n    background-color: #ef8585;\n  }\n  100 {\n    background-color: #e02d2d;\n  }\n}\n\ndiv.px-3.pt-2.pb-3.text-center.text-xs {\n  padding: 6px;\n  font-size: 0.6rem;\n}\n\n#sai-error-message {\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 200px;\n  min-height: 100px;\n  background-color: #cb4b4b;\n  padding: 15px;\n  box-shadow: rgb(0 0 0 / 21%) 0px 0px 10px 2px;\n  color: #fff;\n  font-weight: bold;\n  font-size: 12px;\n}\n\n\n/* ==== SETTINGS ====== */\n\n#sai-settings-view {\n  position: fixed;\n  right: 0;\n  top: 0;\n  width: 100%;\n  background-color: rgb(30 30 30 / 90%);\n  height: 100vh;\n  padding: 25px;\n  z-index: 100000;\n}\n\n#sai-settings-view.sai-hide {\n  display: none;\n}\n\n#sai-settings-view-inner {\n  max-width: 700px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n}\n\n.sai-settings-col {\n  width: 45%;\n}\n\n#sai-settings-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  max-width: 700px;\n  margin: 0 auto;\n  border-bottom: 1px solid #777;\n  margin-bottom: 25px;\n  padding-bottom: 10px;\n}\n\n#sai-settings-view a {\n  color: #1abc9c;\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.sai-button {\n  all: unset;\n  background-color: #1abc9c;\n  color: #fff;\n  padding: 10px 15px;\n  font-weight: bold;\n  border-radius: 5px;\n  font-size: 14px;\n  color: #fff !important;\n  cursor: pointer;\n  line-height: 1.6;\n}\n\n.sai-button:hover {\n  opacity: 0.8;\n}\n\n\n#sai-settings-view h3,\n#sai-settings-view h4,\n#sai-settings-view p  {\n  color: #fff;\n  margin-bottom: 25px;\n}\n\n#sai-settings-view li {\n  color: #fff;\n}\n\n#sai-settings-view h3 {\n  font-size: 20px;\n}\n\n#sai-settings-view h4 {\n  font-size: 17px;\n  font-weight:bold;\n  margin-bottom: 15px;\n}\n\n\n.sai-settings-section {\n  margin-top: 35px;\n  padding-top: 25px;\n  border-top: 1px solid #777;\n}\n\n#sai-settings-view li strong {\n  color: #ffca92;\n}\n\n#sai-settings-view ul {\n  padding-left: 0;\n  margin: 0;\n  list-style: none;\n}\n\n#sai-settings-view li {\n  margin-top: 10px;\n}\n\n#sai-settings-read-aloud-header {\n\n}\n\n.sai-slidecontainer {\n  width: 100%;\n}\n\n.sai-slider {\n  -webkit-appearance: none;\n  width: 100%;\n  height: 15px;\n  border-radius: 5px;\n  background: #d3d3d3;\n  outline: none;\n  opacity: 0.7;\n  -webkit-transition: 0.2s;\n  transition: opacity 0.2s;\n}\n\n.sai-slider:hover {\n  opacity: 1;\n}\n\n.sai-slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 25px;\n  height: 25px;\n  border-radius: 50%;\n  background: #1abc9c;\n  cursor: pointer;\n}\n\n.sai-link-talkio {\n  color: #ac99ff !important;\n}\n\n@media only screen and (max-height: 600px) {\n  #sai-settings-header {\n    margin-bottom: 15px;\n    padding-bottom: 0;\n  }\n\n  #sai-settings-view {\n    font-size: 12px;\n  }\n\n  #sai-settings-view h4 {\n    font-size: 16px;\n  }\n\n  .sai-settings-section {\n    margin-top: 20px;\n    padding-top: 10px;\n  }\n}\n\n/* ======== HIDE SAI ======= */\n.sai-hidden #sai-input-wrapper,\n.sai-hidden #sai-lang-selector-wrapper,\n.sai-hidden #sai-disable-read-aloud {\n  display: none;\n}\n\n.sai-hidden #sai-button-wrapper {\n  background: transparent;\n  padding: 0;\n}\n\n.sai-hidden #sai-settings-button {\n  border-radius: 5px;\n  position: fixed;\n  top: 7px;\n  right: 45px;\n  z-index: 10000;\n}\n\n@media only screen and (min-width: 768px) {\n  .sai-hidden #sai-settings-button {\n    top: 20px;\n    right: 20px\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  form > div.relative.flex.h-full {\n    flex-direction: column;\n  }\n\n  #sai-input-wrapper {\n    height: 50px;\n  }\n}\n\n'),
                    document.body.appendChild(e),
                    (function (e) {
                        (e.info = "info"),
                            (e.warning = "warning"),
                            (e.error = "error"),
                            (e.verbose = "verbose"),
                            (e.success = "success");
                    })(n || (n = {}));
                // log打印
                class t {
                    constructor(e = !0) {
                        (this.logToConsole = e),
                            window.addEventListener("sai-print-logs", () => {
                                console.log("All logs:"), console.log(t.allLogs);
                            });
                    }
                    static info(e, t) {
                        this.instance.write(e, n.info, t);
                    }
                    static success(e, t) {
                        this.instance.write(e, n.success, t);
                    }
                    static warn(e, t) {
                        this.instance.write(e, n.warning, t);
                    }
                    static error(e, t) {
                        this.instance.write(e, n.error, t);
                    }
                    static verbose(e, s) {
                        this.instance.logToConsole && t.allLogs.push([Date.now(), n.verbose, e, s]);
                    }
                    static setup() {
                        if (!t.instance) {
                            const e = "true" === window.localStorage.getItem("sai-log");
                            this.instance = new t(e);
                        }
                        return t.instance;
                    }
                    write(e, n, s) {
                        if (this.logToConsole) {
                            const i = `color: ${this.getConsoleColor(n)}`;
                            s ? console.log(`%c[${n}] ${e}`, i, s) : console.log(`%c[${n}] ${e}`, i),
                                t.allLogs.push([Date.now(), n, e, s]);
                        }
                    }
                    getConsoleColor(e) {
                        return e === n.info
                            ? "#2e99d9"
                            : e === n.warning
                            ? "#ffbb00"
                            : e === n.success
                            ? "#1abc9c"
                            : "#b91e1e";
                    }
                }
                t.allLogs = [];
                class s {
                    constructor(e) {
                        (this.element = e), (this.isVisible = !1);
                    }
                    write(e, n = 3e3) {
                        this.isVisible && clearTimeout(this.timer),
                            (this.element.innerHTML = e),
                            this.setVisible(!0),
                            (this.timer = setTimeout(() => {
                                this.setVisible(!1), (this.element.innerHTML = "");
                            }, n));
                    }
                    setVisible(e) {
                        (this.element.style.display = e ? "block" : "none"), (this.isVisible = e);
                    }
                }
                function i(e, n) {
                    return (
                        e === n ||
                        ("zh-CN" === e && "cmn-Hans-CN" === n) ||
                        ("zh-TW" === e && "cmn-Hant-TW" === n) ||
                        ("zh-HK" === e && "yue-Hant-HK" === n)
                    );
                }
                const a = [
                    ["English (US)", "en-US"],
                    ["English (UK)", "en-GB"],
                    ["English (AU)", "en-AU"],
                    ["普通话 (中国大陆)", "cmn-Hans-CN"],
                    ["中文 (台灣)", "cmn-Hant-TW"],
                    ["粵語 (香港)", "yue-Hant-HK"],
                    ["Bahasa Indonesia", "id-ID"],
                    ["Čeština", "cs-CZ"],
                    ["Dansk", "da-DK"],
                    ["Deutsch", "de-DE"],
                    ["Español (ES)", "es-ES"],
                    ["Español (MX)", "es-MX"],
                    ["Français", "fr-FR"],
                    ["Hrvatski", "hr_HR"],
                    ["Íslenska", "is-IS"],
                    ["Italiano", "it-IT"],
                    ["Magyar", "hu-HU"],
                    ["Nederlands", "nl-NL"],
                    ["Norsk bokmål", "nb-NO"],
                    ["Polski", "pl-PL"],
                    ["Português (PT)", "pt-PT"],
                    ["Português (BR)", "pt-BR"],
                    ["Română", "ro-RO"],
                    ["Slovenčina", "sk-SK"],
                    ["Suomi", "fi-FI"],
                    ["Svenska", "sv-SE"],
                    ["Türkçe", "tr-TR"],
                    ["日本語", "ja-JP"],
                    ["한국어", "ko-KR"],
                    ["Pусский", "ru-RU"],
                ];
                let o = [];
                async function r() {
                    if (o.length > 0) return o;
                    const e = await new Promise((e) => {
                        window.speechSynthesis.onvoiceschanged = () => {
                            const n = window.speechSynthesis.getVoices();
                            e(n);
                        };
                    });
                    return (
                        a.forEach((n) => {
                            e.some((e) => i(e.lang, n[1]))
                                ? o.push(n)
                                : t.warn(`${n[0]} not supported. Removed from selector.`);
                        }),
                        o
                    );
                }
                class l {
                    constructor(e, n) {
                        (this.selectionCb = e),
                            (this.selected = n),
                            (this.storageKey = "sai-language"),
                            this.setDefaultFromStorage(),
                            (this.element = document.createElement("div")),
                            (this.selector = document.createElement("select")),
                            (this.element.id = "sai-lang-selector-wrapper"),
                            (this.selector.id = "sai-lang-selector"),
                            r().then((e) => {
                                if (0 === e.length) {
                                    this.selector.classList.add("sai-hide");
                                    const e = document.createElement("div");
                                    return (
                                        (e.id = "sai-no-voices"),
                                        (e.innerHTML = "No voices"),
                                        this.element.appendChild(e),
                                        void (e.onclick = () => {
                                            let e = "";
                                            (e += "No text-to-speech voices detected on your computer.\n\n"),
                                                (e +=
                                                    "Please see https://voice-control-faq.carrd.co/ on how to install voices."),
                                                alert(
                                                    "No text-to-speech voices detected on your computer.\n\nPlease see https://voice-control-faq.carrd.co/ on how to install voices."
                                                );
                                        })
                                    );
                                }
                                e.forEach(([e, n]) => {
                                    const t = document.createElement("option");
                                    (t.innerText = e),
                                        (t.value = n),
                                        n === this.selected && (t.selected = !0),
                                        this.selector.appendChild(t);
                                }),
                                    this.element.appendChild(this.selector),
                                    (this.selector.onchange = (e) => {
                                        const n = e.target;
                                        this.selectLanguage(n.value);
                                    });
                            });
                    }
                    selectLanguage(e) {
                        window.localStorage.setItem(this.storageKey, e), this.selectionCb(e);
                    }
                    setDefaultFromStorage() {
                        let e = window.localStorage.getItem(this.storageKey);
                        e && ((this.selected = e), this.selectLanguage(e));
                    }
                }
                class d {
                    constructor(e, n) {
                        (this.lang = e),
                            (this.lastText = ""),
                            (this.lastRead = Date.now()),
                            (this.lastUtter = Date.now()),
                            (this.lastUtterCharCount = 0),
                            (this.lastTimeout = 0),
                            (this.lastTimeSinceLastUtter = 0),
                            (this.synth = window.speechSynthesis),
                            (this.queue = []),
                            (this.enabled = !0),
                            (this.storageKey = "sai-read-aloud"),
                            (this.queueIdle = !0),
                            (this.disableButton = document.createElement("div")),
                            (this.disableButton.innerHTML =
                                '<?xml version="1.0" encoding="iso-8859-1"?>\n\x3c!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 496.159 496.159" style="enable-background:new 0 0 496.159 496.159;" xml:space="preserve">\n<path id="sai-svg-color-path" d="M496.159,248.085c0-137.023-111.07-248.082-248.076-248.082C111.071,0.003,0,111.063,0,248.085\n\tc0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.159,385.086,496.159,248.085z"/>\n<g>\n\t<path style="fill:#FFFFFF;" d="M247.711,125.252c-3.41-1.851-7.559-1.688-10.813,0.426l-95.137,61.789h-35.164\n\t\tc-5.845,0-10.583,4.738-10.583,10.584v92.727c0,5.845,4.738,10.583,10.583,10.583h35.164l95.137,61.79\n\t\tc1.748,1.135,3.753,1.707,5.765,1.707c1.733,0,3.471-0.425,5.049-1.281c3.41-1.852,5.534-5.421,5.534-9.301V134.553\n\t\tC253.244,130.672,251.121,127.103,247.711,125.252z"/>\n\t<path style="fill:#FFFFFF;" d="M282.701,319.271c0.894,0,1.801-0.162,2.685-0.504c24.239-9.412,40.524-38.49,40.524-72.359\n\t\tc0-29.957-13.2-57.049-33.63-69.018c-3.534-2.072-8.08-0.885-10.153,2.65c-2.073,3.536-0.885,8.082,2.651,10.153\n\t\tc15.971,9.358,26.291,31.424,26.291,56.214c0,27.359-12.77,51.424-31.055,58.525c-3.82,1.481-5.714,5.781-4.231,9.602\n\t\tC276.924,317.474,279.729,319.271,282.701,319.271z"/>\n\t<path style="fill:#FFFFFF;" d="M302.073,350.217c0.895,0,1.802-0.162,2.684-0.504c34.046-13.219,57.822-55.979,57.822-103.988\n\t\tc0-43.187-18.884-82.156-48.11-99.279c-3.534-2.072-8.082-0.885-10.152,2.652c-2.073,3.535-0.885,8.081,2.651,10.152\n\t\tc24.768,14.512,40.771,48.455,40.771,86.475c0,42.027-19.883,79.1-48.353,90.154c-3.82,1.481-5.715,5.781-4.231,9.602\n\t\tC296.295,348.418,299.1,350.217,302.073,350.217z"/>\n\t<path style="fill:#FFFFFF;" d="M322.025,379.715c-3.005,0-5.841-1.818-6.994-4.788c-1.499-3.861,0.416-8.206,4.277-9.706\n\t\tc38.764-15.051,65.837-64.404,65.837-120.019c0-50.136-21.609-95.192-55.052-114.786c-3.574-2.094-4.773-6.688-2.68-10.262\n\t\tc2.094-3.574,6.688-4.774,10.263-2.68c37.948,22.232,62.469,72.369,62.469,127.728c0,61.66-31.009,116.764-75.409,134.002\n\t\tC323.846,379.551,322.928,379.715,322.025,379.715z"/>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>\n'),
                            (this.disableButton.id = "sai-disable-read-aloud"),
                            (this.disableButton.title = "Toggle read aloud"),
                            window.speechSynthesis.cancel(),
                            this.disableButton.addEventListener("click", () => {
                                this.enabled ? this.disableReadAloud() : this.enableReadAloud();
                            }),
                            this.setReadAloudFromStorage(),
                            t.info(`reInit ${n}, lastTextLength: ${this.lastText.length}`),
                            n && this.reset();
                    }
                    async runQueue() {
                        if ((t.info(`Queue is idle: ${this.queueIdle}`), this.queue.length > 0 && this.queueIdle)) {
                            this.queueIdle = !1;
                            const e = this.queue.shift();
                            await this.readAloud(e),
                                (this.queueIdle = !0),
                                this.queue.length > 0 && this.runQueue();
                        }
                    }
                    observerCallback(e) {
                        const n = this.getText();
                        0 === n.length && (t.info("No text, reset"), this.reset());
                        const s = n.replace(this.lastText.trim(), "").trim(),
                            i = s[s.length - 1],
                            a = this.lastRead + 1e4 < Date.now();
                        if (s.length > 0 && ("." === i || "?" === i || "!" === i || ":" === i || "。" === i || a)) {
                            a &&
                                (t.warn(`Long time since last read. Queue length: ${this.queue.length}`),
                                (this.queueIdle = !0)),
                                t.info(`Push to queue: ${s}`);
                            s
                                .split(".")
                                .filter((e) => e.length > 0)
                                .forEach((e) => {
                                    this.queue.push(e);
                                }),
                                this.runQueue(),
                                (this.lastRead = Date.now()),
                                (this.lastText = n);
                        }
                    }
                    setLang(e) {
                        this.lang = e;
                    }
                    cancelReading() {
                        this.synth.cancel();
                    }
                    readAloud(e) {
                        return new Promise((n, s) => {
                            if (!this.enabled) return t.info("Read aloud disabled"), void n(void 0);
                            if (!e) return t.info("No text to read"), void n(void 0);
                            if (!document.getElementById("sai-root")) return void n(void 0);
                            let a = e.replace(/([0-9]+)\.(?=[0-9]+(?!\.))/g, "$1,");
                            this.synth = window.speechSynthesis;
                            const o = new SpeechSynthesisUtterance(a),
                                r = this.synth
                                    .getVoices()
                                    .reverse()
                                    .find((e) => i(e.lang, this.lang));
                            if (!r) throw new Error(`unknown voice: ${r} lang: ${this.lang}`);
                            (o.volume = 1), (o.voice = r);
                            const l = window.localStorage.getItem("sai-voice-speed");
                            l || t.error("No speed stored in storage");
                            const d = (function (e) {
                                switch (e) {
                                    case "1":
                                        return 0.3;
                                    case "2":
                                        return 0.7;
                                    case "3":
                                    default:
                                        return 1;
                                    case "4":
                                        return 1.15;
                                    case "5":
                                        return 1.3;
                                }
                            })(l);
                            let c;
                            (o.rate = d), t.success(`Voice name: ${r.name}, lang: ${r.lang}, rate: ${d}: ${a}`);
                            const h = () => {
                                const [e, n] = (function (e, n, s, i, a, o) {
                                    const r = Date.now() - s,
                                        l = (function (e, n, t) {
                                            let s = 100;
                                            return (
                                                ("zh-CN" !== e && "zh-TW" !== e && "zh-HK" !== e) || (s = 240),
                                                "zh-TW" === e && (s = 300),
                                                "ja-JP" === e && (s = 260),
                                                "ko-KR" === e && (s = 240),
                                                7e3 + n * s * (1 / t)
                                            );
                                        })(e, a, n);
                                    if (
                                        (t.warn(
                                            `[resumeInfinity] Time since last utter: ${r.toFixed(
                                                1
                                            )}. Timeout: ${l.toFixed(1)}. Last char count: ${a}`
                                        ),
                                        window.navigator.userAgent.search("Mac") > -1 && 0 === r && o > 0)
                                    ) {
                                        const e = i - o,
                                            n = (e / i) * 100;
                                        t.warn(`Last timeout safety gap: ${e.toFixed(1)}ms. ${n.toFixed(1)}%`),
                                            n < 25 &&
                                                t.error(`________Safety gap ${n.toFixed(1)}% too low!________`);
                                    }
                                    return r > l
                                        ? (t.error(`No utter timeout ${l.toFixed(1)} - cancel.`),
                                          window.speechSynthesis.cancel(),
                                          setTimeout(() => {
                                              window.speechSynthesis.resume();
                                          }, 50),
                                          [0, 0])
                                        : [l, r];
                                })(
                                    r.lang,
                                    d,
                                    this.lastUtter,
                                    this.lastTimeout,
                                    this.lastUtterCharCount,
                                    this.lastTimeSinceLastUtter
                                );
                                (this.lastTimeout = e),
                                    (this.lastTimeSinceLastUtter = n),
                                    window.speechSynthesis.pause(),
                                    window.speechSynthesis.resume(),
                                    (c = setTimeout(h, 7e3));
                            };
                            o.addEventListener("error", (e) => {
                                t.error(`Read aloud error ${e.error}`, e), n(void 0), clearTimeout(c);
                            }),
                                o.addEventListener("start", () => {
                                    t.info(`Speech has started. Volume: ${o.volume}`),
                                        (this.lastUtter = Date.now()),
                                        h();
                                }),
                                o.addEventListener("end", function (e) {
                                    t.info("Speech has ended"), n(void 0), clearTimeout(c);
                                }),
                                o.addEventListener("pause", function (e) {
                                    t.verbose("Speech has paused", e);
                                }),
                                o.addEventListener("resume", function (e) {
                                    t.verbose("Speech has resumed", e);
                                }),
                                o.addEventListener("boundary", function (e) {
                                    t.verbose(`Speech reached boundary. CharIndex: ${e.charIndex}`, e);
                                }),
                                o.addEventListener("mark", function (e) {
                                    t.info("Speech reached mark", e);
                                }),
                                this.synth.speak(o),
                                (this.lastUtterCharCount = a.length);
                        });
                    }
                    enableReadAloud() {
                        (this.enabled = !0), this.disableButton.classList.remove("disabled"), this.updateStorage();
                    }
                    disableReadAloud() {
                        (this.queue = []),
                            (this.queueIdle = !0),
                            this.synth.cancel(),
                            this.disableButton.classList.add("disabled"),
                            (this.enabled = !1),
                            this.updateStorage();
                    }
                    updateStorage() {
                        window.localStorage.setItem(this.storageKey, this.enabled.toString());
                    }
                    setReadAloudFromStorage() {
                        const e = window.localStorage.getItem(this.storageKey);
                        e &&
                            ((this.enabled = "true" === e),
                            this.enabled ? this.enableReadAloud() : this.disableReadAloud());
                    }
                    getText() {
                        // 这里需要进行修改
                        // openai官网的回复的类是"markdown"
                        const e = document.querySelectorAll(".markdown-body"),
                            n = e[e.length - 1]?.children ?? [];
                        let t = "";
                        for (const e of n) "PRE" !== e.nodeName && (t += e.textContent);
                        return (
                            (t = t
                                .replace(/`/g, "")
                                .replace(/\*/g, "")
                                .replace(/\"/g, "")
                                .replace(/\\n/g, "")
                                .replace(/\\t/g, "")
                                .replace(/\\b/g, "")
                                .replace(/（/g, " (")
                                .replace(/）/g, ") ")
                                .replace(/？/g, "? ")
                                .replace(/：/g, ": ")
                                .replace(/！/g, "! ")
                                .replace(/。/g, ". ")),
                            t
                        );
                    }
                    reset() {
                        t.warn("RESET read aloud"),
                            (this.lastText = this.getText()),
                            (this.queue = []),
                            (this.lastRead = Date.now());
                    }
                }
                class c {
                    constructor(e, n, s) {
                        (this.lang = e),
                            (this.errorMessage = n),
                            (this.transcript = ""),
                            (this.recognition = new webkitSpeechRecognition()),
                            (this.isRecording = !1),
                            (this.recognition.continuous = !0),
                            (this.recognition.interimResults = !0),
                            (this.recognition.onstart = () => {}),
                            (this.recognition.onresult = (e) => {
                                let n = "";
                                for (let t = e.resultIndex; t < e.results.length; ++t)
                                    e.results[t].isFinal
                                        ? this.isRecording &&
                                          ((this.transcript += e.results[t][0].transcript), s(this.transcript))
                                        : (n += e.results[t][0].transcript);
                                this.isRecording && s(this.transcript + n);
                            }),
                            (this.recognition.onerror = (e) => {
                                let n = e.error;
                                "not-allowed" === e.error &&
                                    (n = "The webpage is not allowed to access your microphone"),
                                    "no-speech" === e.error && (n = "No sound from the microphone");
                                let s = `\n        <span>\n          Error from Voice Control:\n          <br />\n          ${n}\n          <br /><br />\n          <em style="font-size: 10px; font-weight: normal;">(Please note that Google Chrome is the only officially supported browser for this extension)</em>\n        </span>\n      `;
                                this.errorMessage.write(s, 7e3), t.error(`recognition.onerror ${e.error}`);
                            }),
                            (this.recognition.onend = () => {
                                t.info("Ended"), this.endCallback?.();
                            });
                    }
                    start(e) {
                        t.info("Start"),
                            (this.endCallback = e),
                            (this.recognition.lang = this.lang),
                            this.recognition.start(),
                            (this.isRecording = !0);
                    }
                    stop() {
                        t.info(`Stop: ${this.transcript}`),
                            (this.isRecording = !1),
                            this.recognition.stop(),
                            (this.endCallback = void 0);
                    }
                    reset() {
                        (this.isRecording = !1), (this.transcript = "");
                    }
                    setLang(e) {
                        this.lang = e;
                    }
                }
                class h {
                    constructor(e) {
                        (this.readAloud = e),
                            (this.appIsHidden = "true" === window.localStorage.getItem('"sai-hidden"')),
                            (this.settingsView = document.createElement("div")),
                            (this.settingsView.innerHTML = `\n    <div id="sai-settings-header">\n      <h3>Voice Control for ChatGPT</h3>\n      <button class="sai-button" id="sai-close-settings">Close</button>\n    </div>\n    <div id="sai-settings-view-inner">\n      <div class="sai-settings-col">\n        <section>\n          <h4 id="sai-settings-read-aloud-header">Read aloud speed: <span id="sai-read-aloud-speed"></span></h4>\n          <div class="sai-slidecontainer">\n            <input\n              type="range"\n              min="1"\n              max="5"\n              value="3"\n              step="1"\n              class="sai-slider"\n              id="sai-popup-range-slider"\n            />\n          </div>\n        </section>\n\n        <section class="sai-settings-section">\n          <h4>Display settings</h4>\n          <p></p>\n          <button id="sai-display-toggle" class="sai-button">\n            ${
                                this.appIsHidden ? "Show " : "Hide "
                            }\n            Voice Control\n          </button>\n        </section>\n\n        <section class="sai-settings-section">\n          <h4>Need help or have a suggestion?</h4>\n          <p>\n            If you have trouble loading voices or need help troubleshooting please\n            <a href="https://voice-control-faq.carrd.co/" target="_blank">\n              see the FAQ.\n            </a>\n          </p>\n\n          <p>\n            If you have suggestions on how to improve the extension please share your ideas\n            <a href="https://forms.gle/BA3AU9LdApsZDBW28" target="_blank">\n              here.\n            </a>\n          </p>\n        </section>\n      </div>\n      <div class="sai-settings-col">\n        <h4>Keyboard shortcuts</h4>\n\n        <ul>\n        <li>\n          Press-and-hold <strong>SPACE</strong> (outside text input) to\n          record, and release to submit\n        </li>\n        <li>\n          Press <strong>ESC</strong> or <strong>Q</strong> to cancel a\n          transcription\n        </li>\n        <li>\n          Press <strong>E</strong> to stop and copy the transcription to the\n          ChatGPT input field without submitting\n        </li>\n      </ul>\n\n      <section class="sai-settings-section">\n        <p><em>Upgrade your language learning experience with <a class="sai-link-talkio" href="https://talkio.ai" target="_blank">Talkio AI</a>,\n        the premium version of this extension designed specifically for language learners.</em></p>\n      </section>\n\n      <section class="sai-settings-section">\n        <p>\n          The extension is created by <a href="https://twitter.com/theisof" target="_blank">Theis Frøhlich</a>\n          <br />\n          Please <a href="https://chrome.google.com/webstore/detail/voice-control-for-chatgpt/eollffkcakegifhacjnlnegohfdlidhn" target="_blank">leave a review</a>\n          if you like this extension.\n        </p>\n      </section>\n      </div>\n    </div>`),
                            (this.settingsView.id = "sai-settings-view"),
                            this.settingsView.classList.add("sai-hide");
                    }
                    setupListeners() {
                        const e = document.getElementById("sai-popup-range-slider"),
                            n = document.getElementById("sai-read-aloud-speed"),
                            s = document.getElementById("sai-close-settings"),
                            i = document.getElementById("sai-display-toggle");
                        if (!(e && n && s && i)) return void t.warn("range slider missing");
                        (s.onclick = () => {
                            this.settingsView.classList.add("sai-hide");
                        }),
                            (i.onclick = () => {
                                document.body.classList.toggle("sai-hidden");
                                const e = window.localStorage.getItem('"sai-hidden"');
                                e && "true" === e
                                    ? (window.localStorage.setItem('"sai-hidden"', "false"),
                                      (this.appIsHidden = !1),
                                      (i.innerText = "Hide Voice Control"))
                                    : (window.localStorage.setItem('"sai-hidden"', "true"),
                                      (this.appIsHidden = !0),
                                      this.readAloud.disableReadAloud(),
                                      (i.innerText = "Show Voice Control"));
                            });
                        const a = (t) => {
                            n.innerHTML = this.labelFromSpeedValue(t);
                            (e.value = t), window.localStorage.setItem("sai-voice-speed", t);
                        };
                        e.oninput = (e) => {
                            const n = e.target;
                            a(n.value);
                        };
                        const o = window.localStorage.getItem("sai-voice-speed");
                        o && a(o);
                    }
                    labelFromSpeedValue(e) {
                        switch (e) {
                            case "1":
                                return "Very slow";
                            case "2":
                                return "Slow";
                            case "3":
                            default:
                                return "Normal";
                            case "4":
                                return "Fast";
                            case "5":
                                return "Very fast";
                        }
                    }
                }
                const p = a[0][1];
                class g {
                    constructor(e = !1) {
                        (this.isRecording = !1), (this.language = p), (this.spaceIsDown = !1), t.info("Init app");
                        const n = document.querySelector("textarea"),
                            i = n?.parentElement,
                            a =
                                n?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
                                    "button"
                                );
                        if (!n || !i || !a) throw new Error("Missing elements");
                        (this.chatGptInput = n),
                            (this.chatGptInputParent = i?.parentElement?.parentElement?.parentElement),
                            (this.chatGptSubmitButton = a),
                            (this.saiRoot = document.createElement("div")),
                            (this.saiRoot.id = "sai-root"),
                            (this.saiInput = document.createElement("div")),
                            (this.saiInput.className = n.classList.value),
                            (this.saiInputWrapper = document.createElement("div")),
                            (this.saiInputWrapper.id = "sai-input-wrapper"),
                            (this.saiInputWrapper.className = this.chatGptInputParent.classList.value + " is-idle"),
                            this.saiInputWrapper.appendChild(this.saiInput),
                            this.saiRoot.appendChild(this.saiInputWrapper),
                            this.chatGptInputParent.after(this.saiRoot),
                            (this.saiCancelMsg = document.createElement("div")),
                            (this.saiCancelMsg.id = "sai-cancel-msg"),
                            (this.saiCancelMsg.innerHTML = "press esc to cancel"),
                            this.saiInputWrapper.appendChild(this.saiCancelMsg),
                            (this.saiRecordButton = document.createElement("div")),
                            (this.saiRecordButton.id = "sai-speech-button"),
                            (this.saiRecordButton.innerHTML =
                                '<?xml version="1.0" ?><svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,16c2.206,0,4-1.795,4-4V6c0-2.206-1.794-4-4-4S8,3.794,8,6v6C8,14.205,9.794,16,12,16z"/><path d="M19,12v-2c0-0.552-0.447-1-1-1s-1,0.448-1,1v2c0,2.757-2.243,5-5,5s-5-2.243-5-5v-2c0-0.552-0.447-1-1-1s-1,0.448-1,1v2   c0,3.52,2.613,6.432,6,6.92V20H8c-0.553,0-1,0.447-1,1s0.447,1,1,1h8c0.553,0,1-0.447,1-1s-0.447-1-1-1h-3v-1.08   C16.387,18.432,19,15.52,19,12z"/></g></svg>'),
                            this.saiInputWrapper.appendChild(this.saiRecordButton),
                            (this.saiButtonWrapper = document.createElement("div")),
                            (this.saiButtonWrapper.id = "sai-button-wrapper"),
                            (this.saiSettingsButton = document.createElement("div")),
                            (this.saiSettingsButton.id = "sai-settings-button"),
                            (this.saiSettingsButton.innerHTML =
                                '<?xml version="1.0" encoding="UTF-8"?>\n\x3c!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --\x3e\n<svg width="800px" height="800px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\n    <title>/svg/ic-settings</title>\n    <desc>Created with Sketch.</desc>\n    <defs>\n\n</defs>\n    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g id="ic-settings" fill="#ffffff">\n            <path d="M1,5 C1,4.44771525 1.44266033,4 1.99895656,4 L3.00104344,4 C3.55275191,4 4,4.44386482 4,5 C4,5.55228475 3.55733967,6 3.00104344,6 L1.99895656,6 C1.44724809,6 1,5.55613518 1,5 Z M12,5 C12,4.44771525 12.444837,4 12.9955775,4 L22.0044225,4 C22.5542648,4 23,4.44386482 23,5 C23,5.55228475 22.555163,6 22.0044225,6 L12.9955775,6 C12.4457352,6 12,5.55613518 12,5 Z M8,6 C7.44771525,6 7,5.55228475 7,5 C7,4.44771525 7.44771525,4 8,4 C8.55228475,4 9,4.44771525 9,5 C9,5.55228475 8.55228475,6 8,6 Z M8,8 C6.34314575,8 5,6.65685425 5,5 C5,3.34314575 6.34314575,2 8,2 C9.65685425,2 11,3.34314575 11,5 C11,6.65685425 9.65685425,8 8,8 Z M1,19 C1,18.4477153 1.44266033,18 1.99895656,18 L3.00104344,18 C3.55275191,18 4,18.4438648 4,19 C4,19.5522847 3.55733967,20 3.00104344,20 L1.99895656,20 C1.44724809,20 1,19.5561352 1,19 Z M12,19 C12,18.4477153 12.444837,18 12.9955775,18 L22.0044225,18 C22.5542648,18 23,18.4438648 23,19 C23,19.5522847 22.555163,20 22.0044225,20 L12.9955775,20 C12.4457352,20 12,19.5561352 12,19 Z M8,20 C7.44771525,20 7,19.5522847 7,19 C7,18.4477153 7.44771525,18 8,18 C8.55228475,18 9,18.4477153 9,19 C9,19.5522847 8.55228475,20 8,20 Z M8,22 C6.34314575,22 5,20.6568542 5,19 C5,17.3431458 6.34314575,16 8,16 C9.65685425,16 11,17.3431458 11,19 C11,20.6568542 9.65685425,22 8,22 Z M1,12 C1,11.4477153 1.4556644,11 1.99539757,11 L10.0046024,11 C10.5543453,11 11,11.4438648 11,12 C11,12.5522847 10.5443356,13 10.0046024,13 L1.99539757,13 C1.44565467,13 1,12.5561352 1,12 Z M19,12 C19,11.4477153 19.4433532,11 20.0093689,11 L21.9906311,11 C22.5480902,11 23,11.4438648 23,12 C23,12.5522847 22.5566468,13 21.9906311,13 L20.0093689,13 C19.4519098,13 19,12.5561352 19,12 Z M15,13 C14.4477153,13 14,12.5522847 14,12 C14,11.4477153 14.4477153,11 15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 Z M15,15 C13.3431458,15 12,13.6568542 12,12 C12,10.3431458 13.3431458,9 15,9 C16.6568542,9 18,10.3431458 18,12 C18,13.6568542 16.6568542,15 15,15 Z" id="Combined-Shape">\n\n</path>\n        </g>\n    </g>\n</svg>'),
                            (this.saiSettingsButton.onclick = () => {
                                document.getElementById("sai-settings-view")?.classList.remove("sai-hide");
                            }),
                            (this.saiErrorMessage = document.createElement("div")),
                            (this.saiErrorMessage.id = "sai-error-message"),
                            (this.saiErrorMessage.innerHTML = "error"),
                            (this.saiErrorMessage.style.display = "none"),
                            this.saiRoot.append(this.saiErrorMessage),
                            (this.errorMessage = new s(this.saiErrorMessage)),
                            (this.speech = new c(this.language, this.errorMessage, this.speechCallback.bind(this))),
                            (this.readAloud = new d(this.language, e)),
                            (this.settings = new h(this.readAloud)),
                            this.speechHandlers();
                        const o = new l(this.setLanguage.bind(this), p);
                        this.saiButtonWrapper.appendChild(o.element),
                            this.saiRoot.appendChild(this.saiButtonWrapper),
                            this.saiButtonWrapper.appendChild(this.readAloud.disableButton),
                            this.saiButtonWrapper.appendChild(this.saiSettingsButton),
                            this.saiRoot.appendChild(this.settings.settingsView),
                            this.settings.setupListeners();
                        console.log("add toolbar ok");
                    }
                    keyDownHandler(e) {
                        const n = e.target;
                        if (
                            ("textarea" === n?.localName ||
                                "Space" !== e.code ||
                                this.spaceIsDown ||
                                ((this.holdSpaceTimer = setTimeout(() => {
                                    t.info("Space start"),
                                        this.startRecording(),
                                        this.speech.start(() => {
                                            this.stopRecording();
                                        });
                                }, 250)),
                                (this.spaceIsDown = !0)),
                            "textarea" === n?.localName ||
                                ("Escape" !== e.code && "KeyQ" !== e.code) ||
                                !this.isRecording ||
                                (t.info(`Pressed ${e.code}`), this.appToIdle()),
                            ("Escape" === e.code || "KeyQ" === e.code) && !this.isRecording)
                        ) {
                            t.info(`Pressed ${e.code}. Close settings`);
                            document.getElementById("sai-settings-view")?.classList.add("sai-hide");
                        }
                        "KeyE" === e.code &&
                            this.isRecording &&
                            (t.info("Pressed KeyE"),
                            (this.chatGptInput.value = this.saiInput.innerText),
                            this.appToIdle());
                    }
                    keyUpHandler(e) {
                        this.spaceIsDown && "Space" === e.code && (t.info("Space stop"), this.stopRecording());
                    }
                    speechHandlers() {
                        (this.spaceIsDown = !1),
                            (this.saiInputWrapper.onclick = () => {
                                this.isRecording
                                    ? (this.speech.stop(), this.stopRecording())
                                    : (this.startRecording(),
                                      this.speech.start(() => {
                                          this.stopRecording();
                                      }));
                            });
                    }
                    startRecording() {
                        (this.isRecording = !0), this.saiInputWrapper.classList.remove("is-idle");
                    }
                    stopRecording() {
                        const e = this.saiInput.innerText;
                        e.length > 0 &&
                            ((this.chatGptInput.value = e),
                            this.chatGptInput.dispatchEvent(new Event("input", { bubbles: !0 })),
                            this.chatGptSubmitButton.click()),
                            this.appToIdle();
                    }
                    appToIdle() {
                        this.speech.stop(),
                            this.speech.reset(),
                            (this.isRecording = !1),
                            (this.saiInput.innerText = ""),
                            this.saiInputWrapper.classList.add("is-idle"),
                            (this.spaceIsDown = !1),
                            clearTimeout(this.holdSpaceTimer);
                    }
                    speechCallback(e) {
                        this.saiInput.innerText = e;
                    }
                    setLanguage(e) {
                        (this.language = e), this.readAloud.setLang(e), this.speech.setLang(e);
                    }
                }
                t.setup();
                window.localStorage.getItem("sai-voice-speed") ||
                    window.localStorage.setItem("sai-voice-speed", "3");
                "true" === window.localStorage.getItem('"sai-hidden"') && document.body.classList.add("sai-hidden"),
                    chrome.runtime.onMessage.addListener(
                        (e, n, t) => ("sai-on-chatgpt-message" === e.key && t({ value: "yes-we-are-here" }), !0)
                    );
                function f(e) {
                    const n = document.getElementById("sai-root"),
                        s = document.querySelector("textarea");
                    m &&
                        s &&
                        (t.info("Re-init app"),
                        n && n.remove(),
                        (u = new g(!0)),
                        (m = !1),
                        document.addEventListener("keydown", w),
                        document.addEventListener("keyup", b)),
                        (n && s) ||
                            (t.warn("App removed"),
                            n && n.remove(),
                            u.readAloud.reset(),
                            document.removeEventListener("keydown", w),
                            document.removeEventListener("keyup", b),
                            (m = !0)),
                        n && u.readAloud.observerCallback(e);
                }
                
                // 在这里编写需要执行的 JS 逻辑
                let u = new g(),
                    m = !1;
                const w = (e) => {
                        u.keyDownHandler(e);
                    },
                    b = (e) => {
                        u.keyUpHandler(e);
                    };
                document.addEventListener("keydown", w), document.addEventListener("keyup", b);
                new MutationObserver(f).observe(document.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !0,
                }),
                    setInterval(() => {
                        f([]);
                    }, 3500);
                
                // // 为了防止页面未加载完就执行内容脚本，需要等html中出现textarea这个label后再执行该内容脚本
                // // 目标节点
                // const targetNode = document.getElementsByTagName("textarea");
                // // 注册观察器
                // const observer = new MutationObserver((mutations) => {
                //     mutations.forEach((mutation) => {
                //         const nodesAdded = Array.from(mutation.addedNodes); // 获取被添加的节点列表
                //         for (var nodeAdded of nodesAdded) {
                //             // console.log(nodeAdded);
                //             // console.log(nodeAdded.className);
                //             if (nodeAdded.className == "n-config-provider h-full") {
                //                 // 包含目标节点，则执行 JS
                //                 console.log("目标节点已经出现了，可执行下一步逻辑！");
                //                 // 在这里编写需要执行的 JS 逻辑
                //                 let u = new g(),
                //                     m = !1;
                //                 const w = (e) => {
                //                         u.keyDownHandler(e);
                //                     },
                //                     b = (e) => {
                //                         u.keyUpHandler(e);
                //                     };
                //                 document.addEventListener("keydown", w), document.addEventListener("keyup", b);
                //                 new MutationObserver(f).observe(document.body, {
                //                     childList: !0,
                //                     subtree: !0,
                //                     characterData: !0,
                //                 }),
                //                     setInterval(() => {
                //                         f([]);
                //                     }, 3500);
                //             }
                //         }
                //     });
                // });
                // // 规定要观察那些类型的 DOM 变化
                // const config = { childList: true, subtree: true };
                // // 开始观察目标节点
                // observer.observe(document, config);
                


                break;
            }
        }
    });
});
// 规定要观察那些类型的 DOM 变化
const config = { childList: true, subtree: true };
// 开始观察目标节点
observer.observe(document, config);

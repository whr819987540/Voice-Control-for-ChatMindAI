# motivation

Before I started coding, I would like to find an extension which could use chatgpt to have English conversations with me. I did a comprehensive survey of the existing extensions. Below are their features.

| name                                    | github                                                    | function                                                     |
| --------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| Voice Control for OpenAI ChatGPT        | https://github.com/SheikhAminul/ChatGPT-voice-control.git | 输入方式上存在缺陷（自动截断不连续的语音输入）<br />给每个语音提供多种语音包 |
| Voice Control for ChatGPT               | 不开源                                                    | 语音识别没毛病（webkitSpeechRecognition）<br />每种语音只提供一种语音包 |
| talk-to-gpt                             | https://github.com/C-Nedelcu/talk-to-chatgpt              | 对于语音的处理还是不行，无法处理不连续的语音输入<br />给每个语音提供多种语音包 |
| chatgpt-api-whisper-api-voice-assistant |                                                           | 不是插件<br />无法处理音频流，只能整个上传                   |



The existing extensions, like Voice Control for ChatGPT, can provide good assistance, but all of them can only be used on [the official website of ChatGPT](https://chat.openai.com/chat/), which is so slow and unstable for Chinese users.

So I need to write an extension on my own, perhaps on other people's previous and related work.

Below are my requirements for the extension, as well as the features of the extension.

- Support at least [this website](https://x.chatmindai.net/chat).
- Provide at least Chinese and English voice recognition.

# usage

First, you should download this repository to a specific local directory(eg: Voice-Control-for-ChatMindAI).

Second, open your browser(eg: Google Chrome). Follow the steps of "Extensions", "Manage Extensions", and "Load unpacked" to proceed.

![image-20230402233425326](https://raw.githubusercontent.com/whr819987540/pic/main/image-20230402233425326.png)

![image-20230402233547469](https://raw.githubusercontent.com/whr819987540/pic/main/image-20230402233547469.png)

Third, select the directory which stores the repository and click "OK".


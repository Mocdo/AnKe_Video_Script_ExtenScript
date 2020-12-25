# AnKe_Video_Script_ExtenScript
 an extenscript script to make videos

# Example Videos (made by this tool) / 脚本制作成品例
https://www.bilibili.com/video/BV1Lz4y1r7CQ/
https://www.bilibili.com/video/BV1wa4y1p7ZY/
https://www.bilibili.com/video/BV1zA411s7gT/

# What You Need For This Tool / 必要工具
1. Premiere Pro 2020
2. Extend Sctipt Tool kit (for running .jsx file) <br/> Extend Sctipt 工具包，用作运行.jsx脚本文件
3. Premiere Pro 2015.4 (for making title template) <br/> Premiere Pro 2015.4，用于制作更改字幕模板

# Premiere Pro Settings / 预先设置
1. Open Premiere Pro 2020, the video project should be processed in Premiere Pro 2020. <br/>
打开Premiere Pro 2020，视频项目将会在Premiere Pro 2020 里进行。
2. `Edit -> Preferences -> Timeline -> Still Image Default Duration`  <br/>
Set to 1 frame ( **Important**: if not doing this, titles will be disordered. )<br/>
设置为 1 帧 ( **注意**: 若不如此设置，字幕会产生错位。)
3. Before running, Open a empty new sequence, with at least 30 video tracks, 2 audio tracks.<br/>
运行脚本之前，请打开新序列，兵加入至少30个视频轨，2个音频轨。


# Script Directories Structures / 脚本项目文件夹结构
Please look up directory "Examples" in the this git project. <br/>
请参照此git项目中的 "Examples" 目录内的例子。
* backgrounds
  * resources.csv
  * background image files
  * 其他背景类图片
* faces
  * resources.csv
  * face image files
  * 头像类图片
* images
  * resources.csv
  * image image files (the imagesthat are neither  face or background)
  * 其他类型图片
* musics
  * resources.csv
  * background music files
  * 背景音乐文件
* sounds
  * resources.csv
  * sound effect files
  * 音效类文件
* title_bars
  * title bar files (.prtl title files exported from Premiere Pro 2015.4)
  * 字幕框文件 (从Premiere Pro 2015.4 输出的 .prtl 字幕文件)
* title_templates
  * title template files (.prtl title files exported from Premiere Pro 2015.4) <br/>
    the process for creating a template will be talked later 
  * 字幕模板文件 (从Premiere Pro 2015.4 输出的 .prtl 字幕文件)<br/>
    随后会讲解如何制作字幕模板
* titles  (empty folder) / （空文件夹）
* Script.txt
  * (main script sequence, containing all commands)
  * （主脚本文件，包含所有命令）

 

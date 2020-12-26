# AnKe_Video_Script_ExtenScript
 an extenscript script to make videos

# Example Videos (made by this tool) / 脚本制作成品例
https://www.bilibili.com/video/BV1Lz4y1r7CQ/ <br/>
https://www.bilibili.com/video/BV1wa4y1p7ZY/ <br/>
https://www.bilibili.com/video/BV1zA411s7gT/ <br/>

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
  * resources.csv
  * title bar files (.prtl title files exported from Premiere Pro 2015.4. Can be image files, but the script will not scale it.)
  * 字幕框文件 (从Premiere Pro 2015.4 输出的 .prtl 字幕文件。也可以是图像文件，但脚本不会给其修改尺寸)
* title_templates
  * resources.csv
  * title template files (.prtl title files exported from Premiere Pro 2015.4) <br/>
    the process for creating a template will be talked later 
  * 字幕模板文件 (从Premiere Pro 2015.4 输出的 .prtl 字幕文件)<br/>
    随后会讲解如何制作字幕模板
* titles  (empty folder) / （空文件夹）
* Script.txt
  * (main script sequence, containing all commands)
  * （主脚本文件，包含所有命令）

# Content in `resources.csv` / `resources.csv` 内的内容
The `resources.csv` file in each folder is a csv format file containing information of the resources. For example, `resources.csv` in folder `faces` contain all necessary information of images in `faces` folder, including \<name\>, \<file name\>, \<scale\>, \<type\>. The structure of each `resources.csv` (in each folder respectively) is different. Below list is the format for each `resources.csv`. <br/>
各个文件夹内的`resources.csv`文件是一个CSV格式的文件。此文件包含其文件夹下所有资源的必要信息。例如在`faces`文件夹里的`resources.csv`就包含了`faces`文件夹下所有图片的信息，包括\<图片名称\>、\<系统文件名\>、\<尺寸修正\>、\<图片分类\>。各个文件夹内的`resources.csv`结构根据其种类而有差异。以下列表标明所有`resources.csv`的格式。<br/>
Please view below list together with examples in `examples` directory.<br/>
以下列表请与`examples`目录下的例子一齐参照。
* backgrounds
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name <br/>(Shown in File System)|
  | -- | --- |
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|
* faces
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name <br/>(Shown in File System)|<sup>Scale, 0-100<br/>(same in Premiere Pro)|<sup>img type <br/>(same type image has only few changes, like emoji)|
  | -- | --- | --- | --- |
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>尺寸,0-100<br/>（用于在Premiere Pro中设置Scale）|<sup>图片类型<br/>（同类型的图片只有很少变动，例如动作不变表情变化）|
* images
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name <br/>(Shown in File System)|<sup>Scale, 0-100<br/>(same in Premiere Pro)|<sup>img type <br/>(same type image has only few changes, like emoji)|
  | -- | --- | --- | --- |
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>尺寸,0-100<br/>（用于在Premiere Pro中设置Scale）|<sup>图片类型<br/>（同类型的图片只有很少变动，例如动作不变表情变化）|
* musics
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name <br/>(Shown in File System)|<sup>Volume<br/>(same in Premiere Pro)|
  | -- | --- | --- |
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>音量<br/>（用于在Premiere Pro中设置Volume）|
* sounds
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name<br/> (Shown in File System)|<sup>Volume<br/>(same in Premiere Pro)|
  | -- | --- | --- |
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>音量<br/>（用于在Premiere Pro中设置Volume）|
* title_bars
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name<br/> (Shown in File System)|<sup>Title Bar type<br/> (used to match title templates)|
  | -- | --- | --- | 
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>字幕框类型<br/>（用于匹配字幕模板）|
* title_templates
  |<sup>Name <br/>(used in `Script.txt`)|<sup>File Name <br/>(Shown in File System)|<sup>Title type <br/>(used to match title bars, and new title will substitute old title with same type)|<sup>Number of Inputs <br/>(how many inputs can the template contain, related to the "creating templates" and "`set_title` command in `Script.txt`")|<sup>SpecialType <br/>(for special templates such as dice. normal templates can ignore this.)|
  | -- | --- | --- | --- | --- | 
  |<sup>图片名<br/>（在`Script.txt`里用到）|<sup>文件名<br/>（文件夹里的名字）|<sup>字幕模板类型<br/>（用于匹配字幕框，同时新的同类型字幕会替代原同类型字幕）| <sup>输入量<br/>（字幕最多能有多少个输入，与 “制作字母模板” 和 “`Script.txt`中的`set_title`命令” 相关）|<sup>特殊类型<br/>（用于特殊模板，例如骰子模板。通常模板可以无视此项）|

# Commands in `Script.txt` / `Script.txt`内的命令
* set_bg
* clear_bg

* set_img
* clear_img

* set_bgm
* clear_bgm
* set_sound
* clear_sound

* set_face
* set_face_move_in
* clear_face
* clear_face_throw
* clear_face_move

* set_face_blink

* set_title_bar
* clear_title_bar

* set_title
* clear_title

* wait
* end

* set_marker

* set_para

* save
* load



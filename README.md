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

# how to run Script / 运行指南
1. 打开Premiere Pro 2020。打开ExtendScript Tool Kit。连接两者。将`mainScript.jsx`内 第一行的 `var MainPath` 设置为脚本位置。</br> 例如脚本`Script.txt`的位置是 `D:\aaa\bbb\Script.txt`，就设置为 `var MainPath = "D:\\aaa\\bbb";` 注意 `\` 要换成 `\\`。</br>
Open Premiere Pro 2020. Open ExtendScript Tool Kit. Link them. change the first line in `mainScript.jsx` to the location of Script. </br> For example if the Script location is `D:\aaa\bbb\Script.txt`, then set `var MainPath = "D:\\aaa\\bbb";`. note to change `\` to `\\`. 
2. 点击运行，等待。</br> Click Run, and wait. 

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
  * 设置背景图片，会自动调整至屏幕大小
  * set background, will set image scale to frame size
  * 例：`set_bg:洞府1` 即设置背景为 `洞府1`。`洞府1`在 `backgrounds/resources.csv`里声明
  * example: `set_bg:洞府1` is setting background to `洞府1`。`洞府1` is declared in `backgrounds/resources.csv`

* clear_bg
  * 清除背景（会变成黑色背景）
  * clear background (to black background)
  
* set_img
  * 设置图片
  * set image on screen
  * 例：`set_img:鬼背初现1:中` 即设置图片 `鬼背初现1` 于位置 `中`。`鬼背初现1`在 `images/resources.csv` 里声明。位置请参照`mainScript.jsx` 内的 `function getDefaultMotion(type, position)`
  * example: `set_img:鬼背初现1:中` is setting image `鬼背初现1` to location `中`.`鬼背初现1` is declared in `images/resources.csv`. Location is defined in `function getDefaultMotion(type, position)` of file `mainScript.jsx`
* clear_img
  * 清除所有图片（用set_img设置的图片）
  * clear image (set by set_img)
  * 例：`cleat_img:中` 清除所有位置包含字符串`中`的图片， `cleat_img:小伞` 清除所有名称包含字符串`小伞`的图片
  * example：`cleat_img:中` clear all images whose position contain string `中`, `cleat_img:小伞` clear all images whose name contain string `小伞`
  
* set_bgm
  * 设置背景音乐 
  * set background music
  * 例：`set_bgm:鸢尾花:-35` 设置bgm，此时音量(Volume)为-35。若没有`:-35`，则按照 `musics/resources.csv` 内的音量设置。`鸢尾花`在 `musics/resources.csv` 内声明。
  * example: `set_bgm:鸢尾花:-35` is setting bgm `鸢尾花` with Volume `-35`. If `:-35` do not exist, it will set volume according to `musics/resources.csv`. `鸢尾花` is declared in `musics/resources.csv`. 
  
* clear_bgm
  * 清除背景音乐。没有参数
  * clear bgm. no parameters.

* set_sound
  * 设置音效 
  * set Sound Effect
  * 例：`set_sound:骰子` 设置音效 `骰子`，音量根据 `sounds/resources.csv` 设置。`骰子`在 `sounds/resources.csv` 内声明。
  * example: `set_sound:骰子` set Sound Effect `骰子` with volume declared in `sounds/resources.csv`. `骰子` is declared in `sounds/resources.csv`. 
  
* clear_sound
  * 清除音效。没有参数
  * clear Sound Effect. no parameters.

* set_face
  * 设置头像
  * set face photo
  * 例：`set_face:藍:左1` 即设置头像 `藍` 于位置 `左1`。`藍`在 `faces/resources.csv` 里声明。位置请参照`mainScript.jsx` 内的 `function getDefaultMotion(type, position)`
  * example: `set_face:藍:左1` is setting image `藍` to location `左1`.`藍` is declared in `faces/resources.csv`. Location is defined in `function getDefaultMotion(type, position)` of file `mainScript.jsx`
  
* set_face_move_in
  * 与 `set_face` 相同，但头像会移动渐入
  * same with `set_face`, but the face photo will move into the screen. 
  * 例：`set_face_move_in:小傘:右2:右上` 即设置头像 `小傘` 于位置 `右2`，出现时从方向`右上`移动至`右2`。
  * example：`set_face_move_in:小傘:右2:右上` set face photo `小傘` to `右2`，when appearance, it moves from direction `右上` to `右2`.
  * only chinese words are implenmented. 
    * `右上` : UpRight
    * `左上` : UpLeft
    * `右下` : DownRight
    * `左下` : DownLeft
    * `上` : Up
    * `下` : Down
    * `左` : Left
    * `右` : Right

* clear_face
  * 清除头像
  * clear face photo
  * 例：`cleat_face:中` 清除所有位置包含字符串`中`的头像， `cleat_face:小伞` 清除所有名称包含字符串`小伞`的头像
  * example：`cleat_face:中` clear all face photos whose position contain string `中`, `cleat_face:小伞` clear all face photos whose name contain string `小伞`

* clear_face_throw
  * 与 `clear_face` 相同。只能指定一个目标。清除时旋转头像
  * same with `clear_face`, rotate face photo when removing it. Can only work on one target.
  * 例：`clear_face_throw:小伞:右上`，渐出同时向右上旋转退出
  * example：`clear_face_throw:小伞:右上`，rotating fade out and moving to direction `右上`
  
* clear_face_move
  * 与 `clear_face_throw` 相同。无旋转
  * same with `clear_face_throw`, no rotation Can only work on one target.

* set_face_blink

* set_title_bar
  * 设置字幕框
  * set title bar. 
* clear_title_bar

* set_title
  * 设置字幕，设置于图片上方，优先设置在相应`title bar`上方。
  * set title. above images. above related `title bar`.
  * 请参照项目例子。
  * please read example project scripts. 
  * `set_title:底部单行旁白黑:4 字幕1 字幕2 字幕3`。 `底部单行旁白黑`是字幕模板名，在`title_templates/resources.csv`里。`4` 是字幕停留时间，与`wait:4`作用相同。`字幕1` `字幕2` `字幕3` 分别用1个空格隔开，是字母模板的替换词。
  
  * `~` 是增加（保留同模板的原字幕）
  * `~` at first location means appending
  * `set_title:底部单行旁白黑:4 ~ 字幕2 字幕3`
  * `_` 空替换词，也指代空格
  * `_` is empty, and space in text
  * `set_title:底部单行旁白黑:4 字幕1 _ 字幕3`
  * `~~` 在上一个替换词上增加
  * `~~` is appending to last "replace word"
  

* clear_title

* wait
  * `wait:1` 等待1秒
  * `wait:1` wait 1 second
* end
  * clear全部
  * clear all

* set_marker
  * 设置一个marker
  * set a marker
  * 例：`set_marker:调节背景 将背景透明度调低`
* set_para

* save
  * `save:Slot1` 保存现状态于`Slot1`
  * `save:Slot1` save now to `Slot1`
* load
  * `load:Slot1` 读取保存于`Slot1`里的状态
  * `load:Slot1` load to `Slot1`

## 制作字幕模板 / how to make title template.
用Premiere Pro 2015打开现有字母模板，仿照制作。
如果运行完脚本，Premiere Pro 2020自动报错退出，那么99%都是字母模板制作出错了。出错的原因90%都是`RunCount`不匹配。
可以用txt打开.ptrl文件，确认里面内容。.ptrl文件内部是xml格式。
注意二点
* `替换00` 需要在 `替换0011` 之前
* 每个`RunCount`的值要一一对应。

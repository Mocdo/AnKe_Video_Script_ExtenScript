



var MainPath = "";















var ResourcesMap;
var project = app.project;
var projectItem = project.rootItem;

var mainSequence = project.activeSequence;
var videoTracks = mainSequence.videoTracks;
var audioTracks = mainSequence.audioTracks;


var videoTrackSaveSlots = {};
var videoTrackLastClips = newEmptyArray(videoTracks.numTracks);		// in currStartTime, the on-going tracks and their types.
var last_bgm = ""; 
var tempUsedTracks = [];

var titleFolderPath;
var titleNum = 0;
var titleInfoSeq = [];
//	{
//		time
//		titleClipInsertingType
//		trackId
//		changeTrackId
//		newObjName
//		diffObjName
//	}
var titleFileSeq = [];	//array of File.fsName  to import



var time = new Time();
time.ticks = mainSequence.timebase.toString();
var frameLength = time.seconds;
//var halfFrameLength = frameLength*0.5;

var currStartTime = 0;

var BARSTARTTRACK = Math.floor(videoTracks.numTracks*3/5);

var FADE_TIME = 0.5;
var TITLE_TIME = 4;
var BASEBAR_HEIGHT = 240;
var SCREEN_HEIGHT = 720;

var STOP_WRONG = false;
var ERROR_MESSAGE = "";


main();
//test1();
//test2();
//test3();
//test4();
//test5();
//$.writeln ("Hello World");


// read script file
function test1(){
    
    var importFolder = new Folder ("D:\\代码\\安科视频脚本计划\\test_1");
    //importFolder = Folder.selectDialog ("选择主目录");
    
    if(importFolder == null){
        return false
    }
        
    var filePaths = getFilePaths(importFolder.getFiles())

    var scriptPath = filePaths[0];
    var scriptFile = new File (scriptPath);
    
    scriptSequence = readScript(scriptFile);
    
    
    
    for(var i=0;i<scriptSequence.length;i++){
        $.writeln ("key: "+scriptSequence[i]['key']+"   para: "+scriptSequence[i]['para']+"    target: " +scriptSequence[i]['target'] );
    }
}

// read resources
function test2(){ 
    var importFolder = new Folder ("D:\\代码\\安科视频脚本计划\\test_1");
    //importFolder = Folder.selectDialog ("选择主目录");
    
    if(importFolder == null){
        return false
    }
        
    var filePaths = getFilePaths(importFolder.getFiles())

    var scriptPath = filePaths[0];
    var backgroundsPath = filePaths[1];
    
    
    var backgroundMap = getResourceMap(backgroundsPath);
    ResourcesMap['background'] = backgroundMap;
    
    var key = "background";
    
    $.writeln (ResourcesMap[key]['室内'].name);
}


// get effect properties
function test3(a){
    //var components = videoTracks[4].clips[0].components;
    //var opacityComponent;
    
    //var Obj = getLastTrackComponentObjs(1);
    
    //Obj.position.setValue([0.15, 0.7]);
    //Obj.anchorPoint.setValue([0.5,0.5]);
    
    //$.writeln ("position : " + Obj.position.getValue());
    //$.writeln ("anchorPoint : " + Obj.anchorPoint.getValue());
	
	
	
	
	var Obj = getAudioVolume(0);
	
	var nearestKey = Obj.getKeys();
	
	var a = 0.17782793939114 * Math.pow(10,0.05*(-35))
	
	Obj.setValueAtKey(nearestKey[0], a);
	var value = Obj.getValueAtKey(nearestKey[0]);
	
	$.writeln ("Volume : " + value);
}

// run Script Background Fade Substitute (需要Script只含背景变化)
function test4(){
    
    var importFolder = new Folder ("D:\\代码\\安科视频脚本计划\\test_1");
    //importFolder = Folder.selectDialog ("选择主目录");
    
    if(importFolder == null){
        return false
    }
        
    var filePaths = getFilePaths(importFolder.getFiles())

    titleFolderPath = importFolder.fsName + "\\titles"
    var scriptPath = filePaths[0];
    var backgroundsPath = filePaths[1];

    if(backgroundsPath)
        var backgroundMap = getResourceMap(backgroundsPath);
    ResourcesMap['background'] = backgroundMap;
    
    ResourcesMap['title_template'] = getResourceMap(filePaths[4], "title_template");
	ResourcesMap['title_bar'] = getResourceMap(filePaths[6], "title_bar");
	titleFolderBin = projectItem.createBin("Titles");
	
	
	
	doSetBg("set_bg", ["室内"], []);
	
	doSetTitleBar("set_title_bar",["底部白"],[])
	
	//慧音对紫的好感：【1d100:37】
	
	doSetTitle("set_title", ["底部骰子透明黑"], ["_","慧音对紫的好感：【1d100:","37","37","_"]);
	doSetTitle("set_title", ["底部骰子实体黑"], ["_","慧音对紫的好感：【1d100:","37","37","_"]);
	doWait("wait", ["4"],[]);
	doEndVideo("end",[],[]);
	
/*
    videoTracks[0].insertClip(ResourcesMap['background']['室内'].obj, 0);
	videoTracks[1].insertClip(ResourcesMap['background']['室内'].obj, frameLength); 
	videoTracks[2].insertClip(ResourcesMap['background']['室内'].obj, 0.04170833333333); 
	videoTracks[3].insertClip(ResourcesMap['background']['室内'].obj, 0.04170833333334); 
	videoTracks[4].insertClip(ResourcesMap['background']['室内'].obj, 0.05); 
	videoTracks[5].insertClip(ResourcesMap['background']['室内'].obj, 0.04); 
	videoTracks[6].insertClip(ResourcesMap['background']['室内'].obj, 0.03);
	videoTracks[7].insertClip(ResourcesMap['background']['室内'].obj, 0.02);
	videoTracks[8].insertClip(ResourcesMap['background']['室内'].obj, 0.01);
*/
    
}

//
function test5(a){
    var time = new Time();
    time.ticks = mainSequence.timebase.toString();
    var frameLength = time.seconds;

    $.writeln (typeof(frameLength));
}


//main
function main(){
    
    
    
	ResourcesMap = {};
	titleFolderPath = "";
	getAllResource(MainPath);
	


	var firstMarker = mainSequence.markers.getFirstMarker();
	while (firstMarker) {
		mainSequence.markers.deleteMarker(firstMarker);
		firstMarker = mainSequence.markers.getFirstMarker();
	}

    
    
    var scriptFile = new File (ResourcesMap.scriptPath);
    scriptSequence = readScript(scriptFile);
    

    for(var i=0;i<scriptSequence.length;i++){
        runCommand(scriptSequence[i]);
        if(STOP_WRONG){
            alert ("something is wrong at line" + scriptSequence[i].line+", \nERROR: " + ERROR_MESSAGE);
			break;
        }
    }
	
	if(!STOP_WRONG){
		doTitleImplement();
	}
}
//


function runCommand(object){
    var key = object['key'];
    var para = object['para'];
    var target = object['target'];
    switch (key){
        case "set_background":
        case "set_bg":
            doSetBg(key, para, target);
            break;
        case "clear_background":
        case "clear_bg":
            doClearBg(key, para, target);
            break;      
        case "set_bgm":
            doSetBgm(key, para, target);
            break;
        case "clear_bgm":
            doClearBgm(key, para, target);
            break;
        case "set_sound":
            doSetSound(key, para, target);
            break;
        case "clear_sound":
            doClearSound(key, para, target);
            break;
        case "set_image":
        case "set_img":
            doSetImg(key, para, target);
            break;
        case "clear_image":
        case "clear_img":
            doClearImg(key, para, target);
            break;   
        case "set_face":
            doSetFace(key, para, target);
            break;   
        case "set_face_blink":
            doSetFaceBlink(key, para, target);
            break;
        case "set_face_move_in":
            doSetFaceMoveIn(key, para, target);
            break;
        case "clear_face":
            doClearFace(key, para, target);
            break;
        case "clear_face_throw":
            doClearFaceThrow(key, para, target);
            break;
		case "clear_face_move" :
			doClearFaceMove(key, para, target);
			break;
        case "set_title_bar":
            doSetTitleBar(key, para, target);
            break;
        case "clear_title_bar":
            doClearTitleBar(key, para, target);
            break;
        case "set_title":
            doSetTitle(key, para, target);
            break;
        case "clear_title":
            doClearTitle(key, para, target);
            break;
        case "wait":
            doWait(key, para, target);
            break;
		case "endVideo":
        case "end":
            doEndVideo(key, para, target);
            break;
        case "set_marker":
            doSetMarker(key, para, target);
            break;
        case "set_para":
            doSetPara(key, para, target);
            break;
        case "save":
            doSave(key, para, target);
            break;
        case "load":
            doLoad(key, para, target);
            break;
        default:
            STOP_WRONG = true;
            ERROR_MESSAGE = "unknown command \"" + key + "\"";
            break;
    }
    
}
//

function doSetMarker(key, para, target){
	var newMarker = mainSequence.markers.createMarker(currStartTime);
	if(para && para[0] && target && target[0]){
		newMarker.name = para[0];
		newMarker.comments = target[0];
	}else if(para && para[0]){
		newMarker.name = para[0];
	}else if(target && target[0]){
		newMarker.name = target[0];
	}
}

function doWait(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}
	if(isNaN(parseFloat(para[0]))){
        ERROR_MESSAGE = "wait argument is not a number.";
        STOP_WRONG = true;
        return;
	}
    currStartTime = incrementTime(parseFloat(para[0]));
}

function doEndVideo(key, para, target){
    for(var i=0;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type != "empty"){
			clearFadeOutObj(i);
        }
    }
	
	doClearBgm();
	
	if(para && para[0]){
		if(!isNaN(parseFloat(para[0]))){
			currStartTime = incrementTime(parseFloat(para[0]));
			return;
		}else{
            ERROR_MESSAGE = "end argument:duration is not number";
            STOP_WRONG = true;
            return;
        }
	}
	
}

function doSave(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}

	videoTrackSaveSlots[para[0]] = videoTrackLastClips.slice();
	
}

function doLoad(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}
	if(!videoTrackSaveSlots[para[0]]){
        ERROR_MESSAGE = "Load target "+ para[0] +" do not exist. Please save before load.";
        STOP_WRONG = true;
        return;
	}
	
	
	var loadTracks = videoTrackSaveSlots[para[0]];
	
    for(var i=0;i<videoTrackLastClips.length;i++){
		clearFadeOutObj(i);
    }

    for(var i=0;i<loadTracks.length;i++){
		var componentObjs = {};
        switch(loadTracks[i].type){
			case "background":
				var obj = ResourcesMap['background'][loadTracks[i].name].obj;
				obj.setScaleToFrameSize();
				var Clip_and_ComponentObj = setFadeIn(i, obj);
				componentObjs = Clip_and_ComponentObj[1];
				markLastClip(i, "background", "", loadTracks[i].name, componentObjs);
			break;
			case "img":
				var obj = ResourcesMap['image'][loadTracks[i].name].obj;
				var Clip_and_ComponentObj = setFadeIn(i, obj);
				componentObjs = Clip_and_ComponentObj[1];
				var motionDefault = getDefaultMotion("img", loadTracks[i].position);
				componentObjs.position.setValue(motionDefault[0]);
				componentObjs.anchorPoint.setValue(motionDefault[1]);
				componentObjs.scale.setValue(ResourcesMap['image'][loadTracks[i].name].scale);
				markLastClip(i, "img", loadTracks[i].position, loadTracks[i].name, componentObjs);
			break;
			case "face":
				var obj = ResourcesMap['face'][loadTracks[i].name].obj;
				var Clip_and_ComponentObj = setFadeIn(i, obj);
				componentObjs = Clip_and_ComponentObj[1];
				var motionDefault = getDefaultMotion("face", loadTracks[i].position);
				componentObjs.position.setValue(motionDefault[0]);
				componentObjs.anchorPoint.setValue(motionDefault[1]);
				componentObjs.scale.setValue(ResourcesMap['face'][loadTracks[i].name].scale);
				markLastClip(i, "face", loadTracks[i].position, loadTracks[i].name, componentObjs);
				var emptyComponentObjs = {};
				markLastClip(i+1, "change_face", loadTracks[i].position, loadTracks[i].name, emptyComponentObjs);
			break;
			case "title_bar":
				var obj = ResourcesMap['title_bar'][loadTracks[i].name].obj;
				obj.setScaleToFrameSize();
				var Clip_and_ComponentObj = setFadeIn(i, obj);
				componentObjs = Clip_and_ComponentObj[1];
				markLastClip(i, "title_bar", loadTracks[i].position, loadTracks[i].name, componentObjs);
			break;
			case "template":
				var obj = ResourcesMap['title_template'][loadTracks[i].name];
				var titleObj = createNewTitleFile(obj, loadTracks[i].name, loadTracks[i].texts);
				if(!titleObj){
					return;
				}
				
				var titleInfo = {
					time: currStartTime,
					titleClipInsertingType: "insert",
					trackId: i,
					clipNum: videoTracks[i].clips.numItems,
					newObjName:titleObj
				}
				titleInfoSeq.push(titleInfo);
				
				markLastClip(i, "template", loadTracks[i].position, loadTracks[i].name, componentObjs);
				videoTrackLastClips[i].texts = loadTracks[i].texts;
			break;
			
			
			case "blink_face":
			case "change_face":
			case "change_template":
			case "empty":
			default:
				videoTrackLastClips[i] = loadTracks[i];
			break;
        }
				
    }
	
	
	currStartTime = incrementTime(FADE_TIME);
}

//



function doSetBg(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}
    
    var obj = ResourcesMap['background'][para[0]].obj;
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return; 
    }

    obj.setScaleToFrameSize();
	
	componentObjs = {};
    
    if(videoTrackLastClips[0].type != "empty"){
        // fade last
		setFadeOut(0);
		var Clip_and_ComponentObj = setFadeIn(0, obj);
		componentObjs = Clip_and_ComponentObj[1];
    }else{
        // this new one
        var Clip_and_ComponentObj = setFadeIn(0, obj);
        componentObjs = Clip_and_ComponentObj[1];
		
    }

    // mark
    markLastClip(0, "background", "", para[0], componentObjs);
}
function doClearBg(key, para, target){
    var trackId = 0;
    setCutOut(trackId)
    markEmptyClip(trackId);
}

function doSetBgm(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}
	
	if(para[0]!=last_bgm){
		if(audioTracks[0].clips.numItems > 0){
			var lastClip = audioTracks[0].clips[audioTracks[0].clips.numItems-1];
			if(currStartTime <= lastClip.end.seconds){
				lastClip.end = currStartTime;
			}
		}
		var obj = ResourcesMap['music'][para[0]].obj;
		if(!obj){
			STOP_WRONG = true;
			ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
			return; 
		}
		audioTracks[0].insertClip(obj, currStartTime);
		last_bgm = para[0];
	}
	
	var volume;
	if(para[1] && !isNaN(parseFloat(para[1]))){
		volume = parseFloat(para[1]);
	}else{
		volume = ResourcesMap['music'][para[0]].volume;
	}
	
	volume = 0.17782793939114 * Math.pow(10,0.05*(volume));
	
	var volumeProp = getAudioVolume(0);
	var thisClip = audioTracks[0].clips[audioTracks[0].clips.numItems-1];
	var NOW = thisClip.inPoint.seconds + (currStartTime - thisClip.start.seconds);
	
	volumeProp.addKey(NOW);
	volumeProp.setValueAtKey(NOW, volume);
}
function doClearBgm(key, para, target){
    //lastClip = audioTracks[0].clips[audioTracks[0].clips.numItems-1].end = currStartTime;
	if(audioTracks[0].clips.numItems > 0 ){
		var lastClip = audioTracks[0].clips[audioTracks[0].clips.numItems-1];

		if(currStartTime <= lastClip.end.seconds){
			lastClip.end = currStartTime;
		}
		last_bgm = "";
	}
}

function doSetSound(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}

    var obj = ResourcesMap['sound'][para[0]].obj;
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return; 
    }

	audioTracks[1].insertClip(obj, currStartTime);
	
	var volumeProp = getAudioVolume(1);
	volumeProp.setTimeVarying(false);
	var volume = 0.17782793939114 * Math.pow(10,0.05*(ResourcesMap['sound'][para[0]].volume));
	volumeProp.setValue(volume);
}
function doClearSound(key, para, target){
	if(audioTracks[1].clips.numItems > 0 ){
		var lastClip = audioTracks[1].clips[audioTracks[1].clips.numItems-1];

		if(currStartTime <= lastClip.end.seconds){
			lastClip.end = currStartTime;
		}
	}
}

function doSetImg(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}
    
    var obj = ResourcesMap['image'][para[0]].obj;
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return;
    }

    //arguments
    var augments = para.slice(1, para.length);
    var position = "中";
	if(augments[0]){position = augments[0];}

    // add object
    var trackId = findTrackForType("img", position);
    var componentObjs = {};
    
    if(trackId == -1){
        // simple add Image, set Fade In
		if(augments[1] && augments[1] == "aboveTitle"){
			trackId = findTrackNull(BARSTARTTRACK);
		}else{
			trackId = findTrackNull();
		}
        
        // set fade in
        var Clip_and_ComponentObj = setFadeIn(trackId, obj);
        componentObjs = Clip_and_ComponentObj[1];
        
        // set position 改
        var motionDefault = getDefaultMotion("img", position);
        componentObjs.position.setValue(motionDefault[0]);
		componentObjs.anchorPoint.setValue(motionDefault[1]);
        componentObjs.scale.setValue(ResourcesMap['image'][para[0]].scale);
    }
	else{
        // fade Substitute last one to this img
		var isSameType = isSameTypeLayer("image", videoTrackLastClips[trackId].name, para[0]);
        var ComponentObjs = doFadeSubstitute(trackId, obj, findEmptyChangeTrack(false), !isSameType);
        componentObjs = ComponentObjs[1];
		
		ComponentObjs[0].scale.setValue(ResourcesMap['image'][para[0]].scale);
		ComponentObjs[1].scale.setValue(ResourcesMap['image'][para[0]].scale);
    }
    
    // mark Last Clip （"img", position）
    markLastClip(trackId, "img", position, para[0], componentObjs);
}
function doClearImg(key, para, target){

    if(para && para[0]){
		clearFadeOutAllObjByPositionOrName("img", para[0]);
    }else{
        clearFadeOutAllObjByType("img")
	}

}

function doSetFace(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}
    
    if(!ResourcesMap['face'][para[0]]){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object for set_face \"" + para[0] + "\"";
        return;
    }    
    var obj = ResourcesMap['face'][para[0]].obj;
	
	var trackId = -1;
	
	
    //position
    var position = "";
    if(para[1]){
        switch(para[1]){
            case "左":
                position = "左1";
            break;
            case "中":
                position = "中1";
            break;
            case "右":
                position = "右1";
            break;
            case "半身左":
                position = "半身左1";
            break;
            case "半身中":
                position = "半身中1";
            break;
            case "半身右":
                position = "半身右1";
            break;
			default:
				position = para[1];
			break;
        }
		
		trackId = findTrackForType("face", position);
    }
	else{
		var sameTypeTrack = findTrackWithSameType("face", para[0])
		if(sameTypeTrack != -1){
			trackId = sameTypeTrack;
			position = videoTrackLastClips[trackId].position;
		}
	}
    if(position == ""){     //no argument
        if(findTrackForType("face", "左1")==-1){position = "左1";}
        else if(findTrackForType("face", "右1")==-1){position = "右1";}
        else if(findTrackForType("face", "左2")==-1){position = "左2";}
        else if(findTrackForType("face", "右2")==-1){position = "右2";}
		trackId = findTrackForType("face", position);
    }
    if(position == ""){     // all 4 faces are there
        ERROR_MESSAGE="too many faces on screen.";
        STOP_WRONG = true;
		return;
    }

    
    // add object
    var componentObjs = {};
    var changeComponentObjs = {};
    
    if(trackId == -1){
        // simple add Image, set Fade In
        trackId = findTwoTrackNull();
        if(trackId==-1){return;}
        // set fade in
        var Clip_and_ComponentObj = setFadeIn(trackId, obj);
        componentObjs = Clip_and_ComponentObj[1];
        
        // set position 改
        var motionDefault = getDefaultMotion("face", position);
        componentObjs.anchorPoint.setValue(motionDefault[1]);
        componentObjs.position.setValue(motionDefault[0]);
		componentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
        
    }
	else{
        // fade Substitute last one to this 
		var isSameType = isSameTypeLayer("face", videoTrackLastClips[trackId].name, para[0]);
        var twoComponentObjs = doFadeSubstitute(trackId, obj, trackId+1, !isSameType);
        componentObjs = twoComponentObjs[1];
		changeComponentObjs = twoComponentObjs[0];
		componentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
		changeComponentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
    }
    
    // mark Last Clip （"img" + position）
    markLastClip(trackId, "face", position, para[0], componentObjs);
    markLastClip(trackId+1, "change_face", position, para[0], changeComponentObjs);

}

function doSetFaceMoveIn(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}
    
    var obj = ResourcesMap['face'][para[0]].obj;
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return;
    }    
    
    //arguments
    var position = "";
    if(para[1]){
        switch(para[1]){
            case "左":
                position = "左1";
            break;
            case "中":
                position = "中1";
            break;
            case "右":
                position = "右1";
            break;
            case "半身左":
                position = "半身左1";
            break;
            case "半身中":
                position = "半身中1";
            break;
            case "半身右":
                position = "半身右1";
            break;
			default:
				position = para[1];
			break;
        }
    }
    if(position == ""){     //no argument
        if(findTrackForType("face", "左1")==-1){position = "左1";}
        if(findTrackForType("face", "右1")==-1){position = "右1";}
        if(findTrackForType("face", "左2")==-1){position = "左2";}
        if(findTrackForType("face", "右2")==-1){position = "右2";}
    }
    if(position == ""){     // all 4 faces are there
        ERROR_MESSAGE="too many faces on screen.";
        STOP_WRONG = true;
        return;
    }

    var motionDefault = getDefaultMotion("face", position);
    var scaleValue = 1;
    // add object
    var trackId = findTrackForType("face", position);
    var componentObjs = {};
	var changeComponentObjs = {};
    var positionParamToMove;
    
    if(trackId == -1){
        // simple add Image, set Fade In
        trackId = findTwoTrackNull();
        if(trackId==-1){return;}
        // set fade in
        var Clip_and_ComponentObj = setFadeIn(trackId, obj);
        componentObjs = Clip_and_ComponentObj[1];
        
        // set position 改
        
        componentObjs.anchorPoint.setValue(motionDefault[1]);
        componentObjs.position.setValue(motionDefault[0]);
		componentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
        
        positionParamToMove = componentObjs.position;
        
		
        
    }else{
        // fade Substitute last one to this 
        var twoComponentObjs = doFadeSubstitute(trackId, obj, trackId+1, true);
        componentObjs = twoComponentObjs[1];
		changeComponentObjs = twoComponentObjs[0];
		componentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
		changeComponentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
		
        positionParamToMove = twoComponentObjs[0].position;
    }
	
	    // mark Last Clip （"img" + position）
    markLastClip(trackId, "face", position, para[0], componentObjs);
	markLastClip(trackId+1, "change_face", position, para[0], changeComponentObjs);
	
    var displace = [0, 0.2];
    if(para[2]){
        switch(para[2]){
            case "右上":
                displace = [0.1, -0.2];
            break;
            case "左上":
                displace = [-0.1, -0.2];
            break;
            case "右下":
                displace = [0.1, 0.2];
            break;
            case "左下":
                displace = [-0.1, 0.2];
            break;
            case "上":
                displace = [0, -0.2];
            break;
            case "下":
                displace = [0, 0.2];
            break;
            case "左":
                displace = [-0.1, 0];
            break;
            case "右":
                displace = [0.1, 0];
            break;
        }
    }


    var clip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    var startPosition = [motionDefault[0][0]+displace[0], motionDefault[0][1]+displace[1]];
    positionParamToMove.setTimeVarying(true);
    
    positionParamToMove.addKey(clip.inPoint.seconds);
    positionParamToMove.addKey(clip.inPoint.seconds + FADE_TIME);
    positionParamToMove.setValueAtKey(clip.inPoint.seconds, startPosition);
    positionParamToMove.setValueAtKey(clip.inPoint.seconds + FADE_TIME, motionDefault[0]);

}

function doSetFaceBlink(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}
	if(!para[1]){
        ERROR_MESSAGE = key + " do not have target face.";
        STOP_WRONG = true;
        return;
    }
	
    var obj = ResourcesMap['face'][para[0]].obj;
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return;
    }    
	
	var trackId = findTrackForTypeOrName("face", para[1]);
	if(trackId == -1){
        ERROR_MESSAGE = key + " cannot have target face \""+ para[1] +"\".";
        STOP_WRONG = true;
        return;
	}
	
	var position = videoTrackLastClips[trackId].position;
	
	var changeTrackId = findTrackNull(trackId+2);
	if(changeTrackId==-1){return;}
	
	var Clip_and_ComponentObj = setFadeIn(changeTrackId, obj, currStartTime, FADE_TIME);
	componentObjs = Clip_and_ComponentObj[1];
	var motionDefault = getDefaultMotion("face", position);
	componentObjs.anchorPoint.setValue(motionDefault[1]);
	componentObjs.position.setValue(motionDefault[0]);
	componentObjs.scale.setValue(ResourcesMap['face'][para[0]].scale);
	
	markLastClip(changeTrackId, "blink_face", position, para[0], componentObjs);
	tempUsedTracks.push([changeTrackId, currStartTime+4*FADE_TIME]);
	
	setFadeOut(changeTrackId, currStartTime+4*FADE_TIME, FADE_TIME);
}

function doClearFace(key, para, target){
    
    if(para && para[0]){
		switch(para[0]){
			case "全部":
			case "全":
			case "all":
				clearFadeOutAllObjByType("face")
			break;
			case "两边":
				clearFadeOutAllObjByType("face", "左");
				clearFadeOutAllObjByType("face", "右"); 
				clearFadeOutAllObjByType("face", "半身左"); 
				clearFadeOutAllObjByType("face", "半身右"); 
			break;
			
			case "半身左":
			case "左":
				clearFadeOutAllObjByType("face", "左");
				clearFadeOutAllObjByType("face", "半身左");
			break;
			case "半身中":
			case "中":
				clearFadeOutAllObjByType("face", "中");
				clearFadeOutAllObjByType("face", "半身中");
			break;
			case "半身右":
			case "右":
				clearFadeOutAllObjByType("face", "右");
				clearFadeOutAllObjByType("face", "半身右");
			break;
			case "半身左1":
			case "左1":
				clearFadeOutAllObjByType("face", "左1");
				clearFadeOutAllObjByType("face", "半身左1");
			break;
			case "半身中1":
			case "中1":
				clearFadeOutAllObjByType("face", "中1");
				clearFadeOutAllObjByType("face", "半身中1");
			break;
			case "半身右1":
			case "右1":
				clearFadeOutAllObjByType("face", "右1");
				clearFadeOutAllObjByType("face", "半身右1");
			break;
			case "半身左2":
			case "左2":
				clearFadeOutAllObjByType("face", "左2");
				clearFadeOutAllObjByType("face", "半身左2");
			break;
			case "半身中2":
			case "中2":
				clearFadeOutAllObjByType("face", "中2");
				clearFadeOutAllObjByType("face", "半身中2");
			break;
			case "半身右2":
			case "右2":
				clearFadeOutAllObjByType("face", "右2");
				clearFadeOutAllObjByType("face", "半身右2");
			break;


			default:
				clearFadeOutAllObjByPositionOrName("face", para[0]);
			break;
		}
    }else{
		clearFadeOutAllObjByType("face");
	}

}

function doClearFaceThrow(key, para, target){
    
    //do not have target
    if(assertParaNotEmpty(key, para)){return;}

	var targetName;
    switch(para[0]){
        case "左":
            targetName = "左1";
        break;
        case "右":
            targetName = "右1";
        break;
        case "中":
            targetName = "中1";
        break;
        case "半身左":
            targetName = "半身左1";
        break;
        case "半身右":
            targetName = "半身右1";
        break;
        case "半身中":
            targetName = "半身中1";
        break;

		default:
			targetName = para[0];
		break;
    }

    
    var trackId = findTrackForTypeOrName("face", targetName);
    if(trackId==-1){
        ERROR_MESSAGE = "clear_face_throw  \"" + para[0] + "\" do not exist."; 
        STOP_WRONG = true;        
        return;}
    
    var displace = [0, 0];      //                                [  , 1-(240/720) to 0.35]
    if(para[1]){
        switch(para[1]){
            case "右上":
                displace = [0.2, -0.3];
            break;
            case "左上":
                displace = [-0.2, -0.3];
            break;
            case "右下":
                displace = [0.2, 0.3];
            break;
            case "左下":
                displace = [-0.2, 0.3];
            break;
            case "上":
                displace = [0, -0.3];
            break;
            case "下":
                displace = [0, 0.3];
            break;
            case "左":
                displace = [-0.2, 0];
            break;
            case "右":
                displace = [0.2, 0];
            break;
            case "中":
			default:
                displace = [0, 0];
            break;
        }
    }
    setThrowOut(trackId, displace);
    
    markEmptyClip(trackId);
    markEmptyClip(trackId+1);
}

function doClearFaceMove(key, para, target){
    
    //do not have target
    if(assertParaNotEmpty(key, para)){return;}

	var targetName;
    switch(para[0]){
		/*
        case "左":
            targetName = "左1";
        break;
        case "右":
            targetName = "右1";
        break;
        case "中":
            targetName = "中1";
        break;
        case "半身左":
            targetName = "半身左1";
        break;
        case "半身右":
            targetName = "半身右1";
        break;
        case "半身中":
            targetName = "半身中1";
        break;
		*/
		default:
			targetName = para[0];
		break;
    }

    
    var trackId = findTrackForTypeOrName("face", targetName);
    if(trackId==-1){
        ERROR_MESSAGE = "clear_face_move  \"" + para[0] + "\" do not exist."; 
        STOP_WRONG = true;        
        return;}
    
    var displace = [0, 0];      //                                [  , 1-(240/720) to 0.35]
    if(para[1]){
        switch(para[1]){
            case "右上":
                displace = [0.2, -0.3];
            break;
            case "左上":
                displace = [-0.2, -0.3];
            break;
            case "右下":
                displace = [0.2, 0.3];
            break;
            case "左下":
                displace = [-0.2, 0.3];
            break;
            case "上":
                displace = [0, -0.3];
            break;
            case "下":
                displace = [0, 0.3];
            break;
            case "左":
                displace = [-0.2, 0];
            break;
            case "右":
                displace = [0.2, 0];
            break;
        }
    }
    setMoveOut(trackId, displace);
    
    markEmptyClip(trackId);
	markEmptyClip(trackId+1);
}

function doSetTitleBar(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}

    
    if(!ResourcesMap['title_bar'][para[0]]){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object for set_face \"" + para[0] + "\"";
        return; 
    }
	var obj = ResourcesMap['title_bar'][para[0]].obj;

    var type = ResourcesMap['title_bar'][para[0]].type;
    obj.setScaleToFrameSize();
    
    var trackId = findTrackForType("title_bar", type);
    var componentObjs = {};
    
    if(trackId == -1){
        // if it is not battle title_bar, 放置于上方
		if(type.indexOf("battle")!=-1){trackId = findTrackNull();}
        else{trackId = findTrackNull(BARSTARTTRACK);}
        
        // set fade in
        var Clip_and_ComponentObj = setFadeIn(trackId, obj);
        componentObjs = Clip_and_ComponentObj[1];
        
    }else{
        // fade in last cilp, then fade in curr clip
        setFadeOut(trackId);
        var Clip_and_ComponentObj = setFadeIn(trackId, obj);
        componentObjs = Clip_and_ComponentObj[1];
    }
    
    // mark Last Clip （"img" , position）
    markLastClip(trackId, "title_bar", type, para[0], componentObjs);
    
}

function doClearTitleBar(key, para, target){
    if(para && para[0]){
		//clearFadeOutAllObjByPositionOrName("title_bar", para[0]);
		for(var i=0;i<videoTrackLastClips.length;i++){
			if(videoTrackLastClips[i].type.indexOf("title_bar") != -1 && (videoTrackLastClips[i].name.indexOf(para[0]) != -1 || videoTrackLastClips[i].position.indexOf(para[0]) != -1)){
				clearFadeOutAllObjByType("template", videoTrackLastClips[i].position);
				clearFadeOutObj(i);
			}
		}
		return;
    }

	for(var i=0;i<videoTrackLastClips.length;i++){
		if(videoTrackLastClips[i].type.indexOf("title_bar") != -1){
			clearFadeOutAllObjByType("template", videoTrackLastClips[i].position);
			clearFadeOutObj(i);
		}
	}
	//clearFadeOutAllObjByType("title_bar");
}

function doSetTitle(key, para, target){
    if(assertParaNotEmpty(key, para)){return;}

    var obj = ResourcesMap['title_template'][para[0]];
    if(!obj){
        STOP_WRONG = true;
        ERROR_MESSAGE = "unknown object \"" + para[0] + "\"";
        return; 
    }
    if(!target && obj.numInput>0){
        STOP_WRONG = true;
        ERROR_MESSAGE = "can not find target strings in set_title";
        return; 
    }else if(!target){target=[];}

    var type = obj.type;
	var componentObjs = {};

    var trackIds = findRelatedTitleTracks(type);
	var trackId = trackIds[0];
	clearFadeOutObjByTrackIds(trackIds[1]);

	
	
    if(trackId == -1){	//new字幕
        // simple add Titlle, set Fade In
		var barTrackId = findTitleBarTrackForTitle(type);
		if(barTrackId==-1){
			trackId = findTrackNull(BARSTARTTRACK);
		}else{
			trackId = findTrackNull(barTrackId+1);
		}
        if(trackId==-1){
			ERROR_MESSAGE = "cannot find any empty track. Please add more track.";
			STOP_WRONG = true;
			return;
		}
		//create title file and load to project
		var titleObj = createNewTitleFile(obj, para[0], target);
		if(!titleObj){
			return;
		}

		var titleInfo = {
			time: currStartTime,
			titleClipInsertingType: "insert",
			trackId: trackId,
			clipNum: videoTracks[trackId].clips.numItems,
			newObjName:titleObj
		}
		titleInfoSeq.push(titleInfo);

    }
	else if(videoTrackLastClips[trackId].name == para[0] && target && target[0] && (target[0]=="~" || target[0]=="~~")){			//append字幕
					
		var newTitles;
		if(target[0]=="~"){
			newTitles = createTitleTextAppend(videoTrackLastClips[trackId].texts, target, obj.numInput);
		}else{
			newTitles = createTitleTextAppend2(videoTrackLastClips[trackId].texts, target, obj.numInput);
		}
		var diffTitleObj = createNewTitleFile(obj, para[0], newTitles[0], newTitles[1]);
		var newTitleObj = createNewTitleFile(obj, para[0], newTitles[1]);
		if(!diffTitleObj|| !newTitleObj){
			return;
		}
		target = newTitles[1];
		
		var changeTrackId = findEmptyChangeTrack(true);
		if(changeTrackId==-1){
			STOP_WRONG = true;
			ERROR_MESSAGE = "not enough tracks, please add more video tracks";
			return; 
		}
		markLastClip(changeTrackId, "change_template", type, para[0], componentObjs);
		tempUsedTracks.push([changeTrackId, currStartTime + FADE_TIME]);
		
		var titleInfo = {
			time: currStartTime,
			titleClipInsertingType: "append",
			trackId: trackId,
			clipNum: videoTracks[trackId].clips.numItems,
			changeTrackId: changeTrackId,
			changeClipNum: videoTracks[changeTrackId].clips.numItems,
			newObjName: newTitleObj,
			diffObjName: diffTitleObj
		}
		titleInfoSeq.push(titleInfo);
	}
	else if(videoTrackLastClips[trackId].name == para[0] && 	//merge字幕
	   compareTitleTextMerge(videoTrackLastClips[trackId].texts, target, obj.numInput)
	   ){
		
		var newTitles = createTitleTextMerge(videoTrackLastClips[trackId].texts, target, obj.numInput);
		var diffTitleObj = createNewTitleFile(obj, para[0], newTitles[0], newTitles[1]);
		var newTitleObj = createNewTitleFile(obj, para[0], newTitles[1]);
		if(!diffTitleObj|| !newTitleObj){
			return;
		}
		target = newTitles[1];

		var changeTrackId = findEmptyChangeTrack(true);
		if(changeTrackId==-1){
			STOP_WRONG = true;
			ERROR_MESSAGE = "not enough tracks, please add more video tracks";
			return; 
		}
		markLastClip(changeTrackId, "change_template", type, para[0], componentObjs);
		tempUsedTracks.push([changeTrackId, currStartTime + FADE_TIME]);
		
		var titleInfo = {
			time: currStartTime,
			titleClipInsertingType: "merge",
			trackId: trackId,
			clipNum: videoTracks[trackId].clips.numItems,
			changeTrackId: changeTrackId,
			changeClipNum: videoTracks[changeTrackId].clips.numItems,
			newObjName: newTitleObj,
			diffObjName: diffTitleObj
		}
		titleInfoSeq.push(titleInfo);
	}
	else if(checkIsDiceSubsitute(trackId, para[0])){			//模板成对，骰子缓和替换
		
		var titleObj = createNewTitleFile(obj, para[0], target);
		if(!titleObj){
			return;
		}
		
		
		var changeTrackId = findEmptyChangeTrack(true);
		if(changeTrackId==-1){
			STOP_WRONG = true;
			ERROR_MESSAGE = "not enough tracks, please add more video tracks";
			return; 
		}
		markLastClip(changeTrackId, "change_template", type, para[0], componentObjs);
		tempUsedTracks.push([changeTrackId, currStartTime + 2*FADE_TIME]);
		
		var titleInfo = {
			time: currStartTime,
			titleClipInsertingType: "dice",
			trackId: trackId,
			clipNum: videoTracks[trackId].clips.numItems,
			changeTrackId: changeTrackId,
			changeClipNum: videoTracks[changeTrackId].clips.numItems,
			newObjName: titleObj
		}
		titleInfoSeq.push(titleInfo);
	}
	else{														// 无关模板
		
		//create title file and load to project
		var titleObj = createNewTitleFile(obj, para[0], target);
		if(!titleObj){
			return;
		}


		var changeTrackId = findEmptyChangeTrack(true);
		if(changeTrackId==-1){
			STOP_WRONG = true;
			ERROR_MESSAGE = "not enough tracks, please add more video tracks";
			return; 
		}
		markLastClip(changeTrackId, "change_template", type, para[0], componentObjs);
		tempUsedTracks.push([changeTrackId, currStartTime + FADE_TIME]);
		
		var titleInfo = {
			time: currStartTime,
			titleClipInsertingType: "other",
			trackId: trackId,
			clipNum: videoTracks[trackId].clips.numItems,
			changeTrackId: changeTrackId,
			changeClipNum: videoTracks[changeTrackId].clips.numItems,
			newObjName: titleObj
		}
		titleInfoSeq.push(titleInfo);
	}

    
    // mark Last Clip （"img", position）
    markLastClip(trackId, "template", type, para[0], componentObjs);
	videoTrackLastClips[trackId].texts = target;
	//$.writeln (target);
	
    if(para[1]){
        if(!isNaN(parseFloat(para[1]))){
            currStartTime = incrementTime(parseFloat(para[1]));
        }else{
            ERROR_MESSAGE = "set_title argument:duration is not number";
            STOP_WRONG = true;
            return;
        }
    }else{
        currStartTime = incrementTime(TITLE_TIME);
    }
}

function doClearTitle(key, para, target){
    if(para && para[0]){
		clearFadeOutObjByTypeAndName("template", para[0]);
		return;
    }
    
	clearFadeOutAllObjByType("template");
}
//
function doSetPara(key, para, target){
	if(assertParaNotEmpty(key, para)){return;}
	
	var trackId = findTrackForName(para[0]);
	if(trackId==-1){
        ERROR_MESSAGE = "set_para target \"" + para[0] + "\" do not exist."; 
        STOP_WRONG = true;        
        return;
	}
	
	if(!para[1] || para[1]==""){
        ERROR_MESSAGE = "set_para do not have param."; 
        STOP_WRONG = true;        
        return;
	}
	
	
	if(videoTrackLastClips[trackId].type == "template"){
		return;
	}
	
	
	var param = para[1].toLowerCase();
	
	switch(param){
		case "透明度":
		case "透明":
		case "opacity":
			var value = parseFloat(target[0]);
			if(isNaN(value)){
				ERROR_MESSAGE = "set_para opacity value \"" + target[0] +"\" is not a number."; 
				STOP_WRONG = true;    
				return;
			}
			setParam(trackId, videoTrackLastClips[trackId].components.opacity, value);
		break;
		case "位置":
		case "位移":
		case "position":
			var strings = target[0].split(',');
			var value = [parseFloat(strings[0]), parseFloat(strings[1])];
			if(isNaN(value[0]) || isNaN(value[1])){
				ERROR_MESSAGE = "set_para position value \"" + target[0] +"\" is not a pair of number (separated by \',\')."; 
				STOP_WRONG = true;    
				return;
			}
			setParam(trackId, videoTrackLastClips[trackId].components.position, value);
		break;
		case "大小":
		case "尺寸":
		case "scale":
			var value = parseFloat(target[0]);
			if(isNaN(value)){
				ERROR_MESSAGE = "set_para scale value \"" + target[0] +"\" is not a number."; 
				STOP_WRONG = true;    
				return;
			}
			setParam(trackId, videoTrackLastClips[trackId].components.scale, value);
		break;
		case "锚点":
		case "锚":
		case "anchorpoint":
			var strings = target[0].split(',');
			var value = [parseFloat(strings[0]), parseFloat(strings[1])];
			if(isNaN(value[0]) || isNaN(value[1])){
				ERROR_MESSAGE = "set_para anchorPoint value \"" + target[0] +"\" is not a pair of number (separated by \',\')."; 
				STOP_WRONG = true;    
				return;
			}
			setParam(trackId, videoTrackLastClips[trackId].components.anchorPoint, value);
		break;
		case "旋转":
		case "转动":
		case "角度":
		case "rotation":
			var value = parseFloat(target[0]);
			if(isNaN(value)){
				ERROR_MESSAGE = "set_para rotation value \"" + target[0] +"\" is not a number."; 
				STOP_WRONG = true;    
				return;
			}
			setParam(trackId, videoTrackLastClips[trackId].components.rotation, value);
		break;
		default:
			ERROR_MESSAGE = "set_para do not support param \"" + para[1] +"\" ."; 
			STOP_WRONG = true;    
		return;
	}

}
//






function doTitleImplement(){
	
	var titleFolderBin = projectItem.createBin("Titles");
	project.importFiles(titleFileSeq);
	
	var titleObjMap = {};	//objName -> importedObj
	for(var e = 0; e < titleFolderBin.children.numItems; e++){
        var thisName = titleFolderBin.children[e].name;
		titleObjMap[thisName] = titleFolderBin.children[e];
    }
	
//	{
//		time
//		titleClipInsertingType
//		trackId
//		clipNum			（the clipNum after we add this title clip in (without considering other previous titles)）
//						（for "clear", it is the clip id）
//		changeTrackId
//		changeClipNum
//		newObjName
//		diffObjName
//	}

	var clipNumDisplace = [];
	var changeClipNumDisplace = [];
	for(var f = videoTracks.numTracks-1;f>=0;f--){
		clipNumDisplace[f]=0;
		changeClipNumDisplace[f]=0;
	}

	currStartTime = 0;
	for(var i=0;i<titleInfoSeq.length;i++){
		currStartTime = titleInfoSeq[i].time;
		var insertType = titleInfoSeq[i].titleClipInsertingType;
		var trackId = titleInfoSeq[i].trackId;
		var clipNum = titleInfoSeq[i].clipNum + clipNumDisplace[trackId];
		switch(insertType){
			case "insert":
				var titleObj = titleObjMap[titleInfoSeq[i].newObjName];
				var Clip_and_ComponentObj = setTitleFadeIn(trackId, titleObj, clipNum);
				componentObjs = Clip_and_ComponentObj[1];
				
				markLastClip(trackId, "template", insertType, "", componentObjs);
				clipNumDisplace[trackId]++;
			break;
			case "append":
			case "merge":
				var newTitleObj = titleObjMap[titleInfoSeq[i].newObjName];
				var diffTitleObj = titleObjMap[titleInfoSeq[i].diffObjName];
				var changeTrack = titleInfoSeq[i].changeTrackId;
				var changeClipNum = titleInfoSeq[i].changeClipNum + changeClipNumDisplace[changeTrack];
				
				twoComponentObjs = doTitleMerge(trackId, diffTitleObj, newTitleObj, changeTrack, clipNum, changeClipNum);
				componentObjs = twoComponentObjs[1];
				
				markLastClip(trackId, "template", insertType, "", componentObjs);
				clipNumDisplace[trackId]++;
				changeClipNumDisplace[changeTrack]++;
			break;
			case "dice":
				var titleObj = titleObjMap[titleInfoSeq[i].newObjName];
				var changeTrack = titleInfoSeq[i].changeTrackId;
				var changeClipNum = titleInfoSeq[i].changeClipNum + changeClipNumDisplace[changeTrack];
				
				var twoComponentObjs = doLongSubsitute(trackId, titleObj, changeTrack, clipNum, changeClipNum);
				componentObjs = twoComponentObjs[1];
				
				markLastClip(trackId, "template", insertType, "", componentObjs);
				clipNumDisplace[trackId]++;
				changeClipNumDisplace[changeTrack]++;
			break;
			case "other":
				var titleObj = titleObjMap[titleInfoSeq[i].newObjName];
				var changeTrack = titleInfoSeq[i].changeTrackId;
				var changeClipNum = titleInfoSeq[i].changeClipNum + changeClipNumDisplace[changeTrack];
				
				var twoComponentObjs = doTitleFadeSubstitute(trackId, titleObj, changeTrack, clipNum, changeClipNum);
				componentObjs = twoComponentObjs[1];
				
				markLastClip(trackId, "template", insertType, "", componentObjs);
				clipNumDisplace[trackId]++;
				changeClipNumDisplace[changeTrack]++;
			break;
			case "clear":
				setTitleFadeOut(trackId, clipNum);
				markEmptyClip(trackId);
			break;
			default:
				alert("unknown title insertion type.");
			break;
		}

	}
}











//制作新title文件
function createNewTitleFile(templateObj, name, target, old_target){
	if(target===undefined){target=[];}
    var path = templateObj.path;
    var numInputs = templateObj.numInput;
    
    var templateFile = new File (path);
    if(!templateFile.exists){
        ERROR_MESSAGE = "file \"" + path + "\" do not exist";
        STOP_WRONG = true;
        return;
    }

    // read file, copy string, replace strings. 
    // (note: replace " encoding=\"UTF-16\" " to " encoding=\"UTF-8\" ")
    // (note: 替换文本后，要将之后的 “ CharacterAttributes RunCount="83" ”  数字换成   target[i].length+1)
    templateFile.open ("r");
    var buffer = templateFile.read();
    templateFile.close();
    
    buffer = buffer.replace("encoding=\"UTF-16\"","encoding=\"UTF-8\"");
    var replaceWord = "替换";
    for(var i=0;i<numInputs;i++){
		replaceWord = replaceWord + i + i;
		
        var str = target[i];
        if(!str){str = " ";}
        //if(str == "_"){str = "";}
		str = str.replace(/_/g," ");
        
		// 出现 "替换00替换0011" 连续出现情况时，在"替换0"处有特殊处理
		//if(buffer.indexOf(replaceWord+replaceWord+(i+1)+(i+1)) != -1){
		// 改：如果 "替换0011</TRString>"没有出现，则认为其之后有其他文本
		if(buffer.indexOf(replaceWord+"</TRString>") == -1){
			//if(str==" " && old_target && old_target[i] && old_target[i]!="_"){str = old_target[i];}
			if(str==" " && old_target && old_target[i] && old_target[i]!="_"){
				var i2=i+1;
				var replaceWord2 = replaceWord;
				do{
					if(target[i2]!="_" || buffer.indexOf(replaceWord2+replaceWord2+i2+i2)==-1){
						str = old_target[i].replace(/_/g," ");
						break;
					}
					replaceWord2 = replaceWord2 +i2+i2;
				}while(buffer.indexOf(replaceWord2+"</TRString>") == -1 && i2<numInputs && target[++i2])
			}
			buffer = buffer.replace("CharacterAttributes RunCount=\""+(replaceWord.length)+"\"", "CharacterAttributes RunCount=\""+pad(str.length, 3)+"\"");
			buffer = buffer.replace(replaceWord, str);
		}else{
			buffer = buffer.replace("CharacterAttributes RunCount=\""+(replaceWord.length+1)+"\"", "CharacterAttributes RunCount=\""+pad(str.length+1, 3)+"\"");
			buffer = buffer.replace(replaceWord, str);
		}
		
        
    }
    
    if(!titleFolderPath || titleFolderPath==""){
        STOP_WRONG = true;
        ERROR_MESSAGE = "wrong path for title files";
        return;
    }
    
    var titleName = pad(titleNum, 4)+name;
    titleNum++;
    
    var newTitleFile = File(titleFolderPath + "\\"+titleName+".prtl");
    newTitleFile.open('w');
    newTitleFile.encoding = "UTF-8";
    newTitleFile.write(buffer);
    newTitleFile.close();
    
    titleFileSeq.push(newTitleFile.fsName); 
    
	return titleName;
}
//


function checkIsDiceSubsitute(trackId,currName){
	var lastName = videoTrackLastClips[trackId].name;
	return (ResourcesMap['title_template'][lastName].dice && 
			ResourcesMap['title_template'][lastName].dice == "transparent" && 
			ResourcesMap['title_template'][currName].dice && 
			ResourcesMap['title_template'][currName].dice == "solid"
		);	
}

function compareTitleTextMerge(old_text, new_text, len){
	for(var i=0;i<len;i++){
		if(old_text[i]===undefined){continue;}
		if(old_text[i]=="_"){continue;}
		if(new_text[i]===undefined){return false;}
		if(new_text[i]=="_"){continue;}
		if(new_text[i].indexOf(old_text[i])==0){continue;}
		return false;
	}
	return true;
}

//old_text new_text不重叠,
//return [diffTar, newTar]
function createTitleTextMerge(old_text, new_text, len){
	var newTar = [];
	var diffTar = [];
	for(var i=0;i<len;i++){
		if(old_text[i]===undefined && new_text[i]===undefined){
			break;
		}else if(old_text[i]===undefined || old_text[i]=="_"){
			newTar[i] = new_text[i];
			diffTar[i] = new_text[i];
		}else if(new_text[i]===undefined || new_text[i]=="_"){
			newTar[i] = old_text[i];
			diffTar[i] = "_";
		}else if(old_text[i]==new_text[i]){	//they are equal
			newTar[i] = new_text[i];
			diffTar[i] = "_";
		}else{
			newTar[i] = new_text[i];
			diffTar[i] = new_text[i];
		}
	}

	return [diffTar, newTar];
}

function createTitleTextAppend(old_text, new_text, len){
	var newTar = [];
	var diffTar = [];
	var oldLen = old_text.length;
	
	for(var i=0;i<len;i++){
		if(old_text[i]){
			newTar[i] = old_text[i];
			diffTar[i] = "_";
		}else if(new_text[i-oldLen + 1]){
			newTar[i] = new_text[i-oldLen + 1];
			diffTar[i] = new_text[i-oldLen + 1];
		}else{
			break;
		}
	}
	return [diffTar, newTar];
}

function createTitleTextAppend2(old_text, new_text, len){
	var newTar = [];
	var diffTar = [];
	var oldLen = old_text.length;
	
	for(var i=0;i<len;i++){
		if(i<oldLen-1){
			newTar[i] = old_text[i];
			diffTar[i] = "_";
		}else if(i==oldLen-1){
			newTar[i] = old_text[i]+new_text[1];
			diffTar[i] = old_text[i]+new_text[1];
		}else if(new_text[i-oldLen + 2]){
			newTar[i] = new_text[i-oldLen + 2];
			diffTar[i] = new_text[i-oldLen + 2];
		}else{
			break;
		}
	}
	return [diffTar, newTar];
}

function setTitleFadeIn(trackId, currItem, clipNum, startTime, duringTime){
    if(startTime===undefined){startTime = currStartTime;}
    if(duringTime===undefined){duringTime = FADE_TIME;}
    
    videoTracks[trackId].insertClip(currItem, startTime);
    var currClip = videoTracks[trackId].clips[clipNum];
    var videoComponentObjs = getComponentObjs(currClip);
    var opacityProperty = videoComponentObjs.opacity;

    opacityProperty.addKey(currClip.inPoint.seconds);
    opacityProperty.addKey(currClip.inPoint.seconds+duringTime);
    opacityProperty.setValueAtKey(currClip.inPoint.seconds, 0);
    opacityProperty.setValueAtKey(currClip.inPoint.seconds+duringTime, 100);
    
    return [currClip, videoComponentObjs];
}

function setTitleFadeOut(trackId, clipNum, startTime, duringTime){
	if(startTime===undefined){startTime=currStartTime;}
    if(duringTime===undefined){duringTime = FADE_TIME;}
    
    var lastClip = videoTracks[trackId].clips[clipNum];
    lastClip.end = startTime;
    var FADEEND = lastClip.inPoint.seconds + (startTime - lastClip.start.seconds);
    
    var lastOpacityProperty = videoTrackLastClips[trackId].components.opacity;
    

    lastOpacityProperty.addKey(FADEEND - duringTime);
    lastOpacityProperty.addKey(FADEEND);
    lastOpacityProperty.setValueAtKey(FADEEND - duringTime, 100);
    lastOpacityProperty.setValueAtKey(FADEEND, 0);
}

function setTitleCutOut(trackId, clipNum, startTime){
	if(startTime===undefined){startTime=currStartTime;}
    var lastClip = videoTracks[trackId].clips[clipNum];
    lastClip.end = startTime;
}


function doTitleFadeSubstitute(trackId, currItem, changeTrackId, clipNum, changeClipNum){

    // 1. last clip，字幕图片渐变退出，或直接切断
    setTitleFadeOut(trackId, clipNum-1, currStartTime+FADE_TIME);

    // 2. changeTrack增加Clip
    var changeClip_and_ComponentObj = setTitleFadeIn(changeTrackId, currItem, changeClipNum, currStartTime);
    changeClip_and_ComponentObj[0].end = currStartTime + FADE_TIME;

    // 3. 加入新clip，无渐变进入效果
     videoTracks[trackId].insertClip(currItem, currStartTime + FADE_TIME); 
	 var thisClip = videoTracks[trackId].clips[clipNum];
     // 3.5提取ComponentObj
     CurrComponentObj = getComponentObjs(thisClip);

     
     return [changeClip_and_ComponentObj[1], CurrComponentObj];
}

// 前一个的"dice属性"是"transparent", 后一个的"dice属性"是"solid", 则
//	     [渐入渐退]
//	[  不渐退][不渐入  ]
function doLongSubsitute(trackId, currItem, titleChangeTrackId, clipNum, changeClipNum){
	
	// 1. last clip，直接切断
    setTitleCutOut(trackId, clipNum-1, currStartTime+FADE_TIME);
    
    // 2. changeTrack增加Clip
    var changeClip_and_ComponentObj = setTitleFadeIn(titleChangeTrackId, currItem, changeClipNum, currStartTime);
    changeClip_and_ComponentObj[0].end = currStartTime + FADE_TIME + FADE_TIME;
	
	// 2.1 设置渐退
	var FADEEND = changeClip_and_ComponentObj[0].inPoint.seconds + (changeClip_and_ComponentObj[0].end.seconds - changeClip_and_ComponentObj[0].start.seconds);
	var opacityProperty = changeClip_and_ComponentObj[1].opacity;
	opacityProperty.addKey(FADEEND);
	opacityProperty.setValueAtKey(FADEEND, 0);


    // 3. 加入新clip，currItem，无渐变进入效果
     videoTracks[trackId].insertClip(currItem, currStartTime + FADE_TIME); 
	 var thisClip = videoTracks[trackId].clips[clipNum];
     // 3.5提取ComponentObj
     CurrComponentObj = getComponentObjs(thisClip);
     
     return [changeClip_and_ComponentObj[1], CurrComponentObj];
}

//前后字幕模板相同，
//	    [渐入]
//	[  不渐退][不渐入    ]
function doTitleMerge(trackId, diffTitleObj, newTitleObj, titleChangeTrackId, clipNum, changeClipNum){

	// 1. last clip，处理

	setTitleCutOut(trackId, clipNum-1, currStartTime+FADE_TIME);

    // 2. changeTrack增加Clip, 增加diffTitleObj
    var changeClip_and_ComponentObj = setTitleFadeIn(titleChangeTrackId, diffTitleObj, changeClipNum, currStartTime);
    changeClip_and_ComponentObj[0].end = currStartTime + FADE_TIME;


    // 3. 加入新clip，newTitleObj，无渐变进入效果
     videoTracks[trackId].insertClip(newTitleObj, currStartTime + FADE_TIME); 
	 var thisClip = videoTracks[trackId].clips[clipNum];
     // 3.5提取ComponentObj
     CurrComponentObj = getComponentObjs(thisClip);
     
     return [changeClip_and_ComponentObj[1], CurrComponentObj];
}









// 1. last clip 渐变退出，fade==false时不渐变
// 2. changeTrack增加Clip， 此Clip的位置与last clip相同
// 3. 加入新clip，无渐变进入效果，此Clip的位置与last clip相同（默认，但可以在return后更改）
// 4. return [ change clip的ComponentObjs, 新clip的ComponentObjs ]
// 没有mark Last Clip
//	    [渐入]
//	[    渐退][不渐入    ]
function doFadeSubstitute(trackId, currItem, changeTrackId, fade){
    if(fade===undefined){fade=true;}


    
    // 1.5 找last clip 的Position Value 与AnchorPoint Value
    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    var lastPosition = videoTrackLastClips[trackId].components.position;
    var lastAnchorPoint = videoTrackLastClips[trackId].components.anchorPoint;
	var lastOpacity = videoTrackLastClips[trackId].components.opacity;
	
    var lastPositionValue;
    var lastAnchorPointValue;
	
    var FADESTART = lastClip.inPoint.seconds + (currStartTime - lastClip.start.seconds);
    if(lastPosition.isTimeVarying()){
		var nearestKey = lastPosition.findPreviousKey(FADESTART);
		if(nearestKey){lastPositionValue = lastPosition.getValueAtKey(nearestKey);}
		else{lastPositionValue = lastPosition.getValue();}
    }else{
        lastPositionValue = lastPosition.getValue();
    }
    if(lastAnchorPoint.isTimeVarying()){
		var nearestKey = lastAnchorPoint.findPreviousKey(FADESTART);
		if(nearestKey){lastAnchorPointValue = lastAnchorPoint.getValueAtKey(nearestKey);}
		else{lastAnchorPointValue = lastAnchorPoint.getValue();}
    }else{
        lastAnchorPointValue = lastAnchorPoint.getValue();
    }
	
	
	var lastOpacityValue;
    if(lastOpacity.isTimeVarying()){
		var nearestKey = lastOpacity.findPreviousKey(FADESTART);
		if(nearestKey){lastOpacityValue = lastOpacity.getValueAtKey(nearestKey);}
		else{lastOpacityValue = lastOpacity.getValue();}
    }else{
        lastOpacityValue = lastOpacity.getValue();
    }
	

    // 1. last clip，字幕图片渐变退出，或直接切断
    if(fade){
        setFadeOut(trackId, currStartTime+FADE_TIME);
    }else{
        setCutOut(trackId, currStartTime+FADE_TIME);
    }

    // 2. changeTrack增加Clip
    var changeClip_and_ComponentObj = setFadeIn(changeTrackId, currItem, currStartTime);
    changeClip_and_ComponentObj[0].end = currStartTime + FADE_TIME;
    // 2.5 set changeClip的位置与last clip相同
    changeClip_and_ComponentObj[1].position.setValue(lastPositionValue);
    changeClip_and_ComponentObj[1].anchorPoint.setValue(lastAnchorPointValue);

    // 3. 加入新clip，无渐变进入效果
    videoTracks[trackId].insertClip(currItem, currStartTime + FADE_TIME); 
    // 3.5位置与之前位置相同
    CurrComponentObj = getLastTrackComponentObjs(trackId);
    CurrComponentObj.position.setValue(lastPositionValue);
    CurrComponentObj.anchorPoint.setValue(lastAnchorPointValue);
	
	//if not fade, set opacity to same
	if(!fade){
		CurrComponentObj.opacity.setValue(lastOpacityValue);
		var opacityKey = changeClip_and_ComponentObj[1].opacity.getKeys()[1];
		changeClip_and_ComponentObj[1].opacity.setValueAtKey(opacityKey, lastOpacityValue);
	}
     
     return [changeClip_and_ComponentObj[1], CurrComponentObj];
}
//






//set增加量
function setParam(trackId, property, displace, time){
	if(time===undefined){time=currStartTime;}
    
    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    var TIME = lastClip.inPoint.seconds + (time - lastClip.start.seconds);
        
    var lastValue;
    if(property.isTimeVarying()){
		var nearestKey = property.findPreviousKey(TIME);
		if(nearestKey){lastValue = property.getValueAtKey(nearestKey);}
		else{lastValue = property.getValue();}
    }else{
        lastValue = property.getValue();
        property.setTimeVarying(true);
    }
	
	var value;
	if(typeof(lastValue) == "number"){
		value = lastValue + displace;
	}else{
		value = [lastValue[0] + displace[0], lastValue[1] + displace[1]];
		
	}
	
    property.addKey(TIME);
    property.setValueAtKey(TIME, value);
}

// 1. add Clip
// 2. set Fade In 进入渐变效果
// 3. return 此Clip和Component（for setting end）
// 没有mark Last Clip
function setFadeIn(trackId, currItem, startTime, duringTime){
    if(startTime===undefined){startTime = currStartTime;}
    if(duringTime===undefined){duringTime = FADE_TIME;}
    
    videoTracks[trackId].insertClip(currItem, startTime);
    var currClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    var videoComponentObjs = getLastTrackComponentObjs(trackId);
    var opacityProperty = videoComponentObjs.opacity;

    opacityProperty.addKey(currClip.inPoint.seconds);
    opacityProperty.addKey(currClip.inPoint.seconds+duringTime);
    opacityProperty.setValueAtKey(currClip.inPoint.seconds, 0);
    opacityProperty.setValueAtKey(currClip.inPoint.seconds+duringTime, 100);
    
    return [currClip, videoComponentObjs];
}

// set Fade Out to the last clip on track, 'startTime' is the fade end time.
function setFadeOut(trackId, startTime, duringTime){
	if(startTime===undefined){startTime=currStartTime;}
    if(duringTime===undefined){duringTime = FADE_TIME;}
    
    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    lastClip.end = startTime;
    var FADEEND = lastClip.inPoint.seconds + (startTime - lastClip.start.seconds);
    
    var lastOpacityProperty = videoTrackLastClips[trackId].components.opacity;
    
	var lastOpacityValue;
    if(lastOpacityProperty.isTimeVarying()){
		var nearestKey = lastOpacityProperty.findPreviousKey(FADEEND);
		if(nearestKey){lastOpacityValue = lastOpacityProperty.getValueAtKey(nearestKey);}
		else{lastOpacityValue = lastOpacityProperty.getValue();}
    }else{
        lastOpacityValue = lastOpacityProperty.getValue();
        lastOpacityProperty.setTimeVarying(true);
    }

    lastOpacityProperty.addKey(FADEEND - duringTime);
    lastOpacityProperty.addKey(FADEEND);
    lastOpacityProperty.setValueAtKey(FADEEND - duringTime, lastOpacityValue);
    lastOpacityProperty.setValueAtKey(FADEEND, 0);
}

// stop the last clip
function setCutOut(trackId, startTime){
	if(startTime===undefined){startTime=currStartTime;}
    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    lastClip.end = startTime;
}
// rotating out
function setThrowOut(trackId, displace, startTime, duringTime){
    if(duringTime===undefined){duringTime = 2*FADE_TIME;}
	if(startTime===undefined){startTime=currStartTime;}

    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    lastClip.end = startTime;
    var THROWEND = lastClip.inPoint.seconds + (startTime - lastClip.start.seconds);

    var lastOpacityProperty = videoTrackLastClips[trackId].components.opacity;
    lastOpacityProperty.addKey(THROWEND - duringTime);
    lastOpacityProperty.addKey(THROWEND);
    lastOpacityProperty.setValueAtKey(THROWEND - duringTime, 100);
    lastOpacityProperty.setValueAtKey(THROWEND, 0);
 
    var lastPositionProperty = videoTrackLastClips[trackId].components.position;
    var lastPositionValue;
    if(lastPositionProperty.isTimeVarying()){
		var nearestKey = lastPositionProperty.findPreviousKey(THROWEND);
		if(nearestKey){lastPositionValue = lastPositionProperty.getValueAtKey(nearestKey);}
		else{lastPositionValue = lastPositionProperty.getValue();}
    }else{
        lastPositionValue = lastPositionProperty.getValue();
        lastPositionProperty.setTimeVarying(true);
    }
    var lastPositionEndValue = [lastPositionValue[0] + displace[0], lastPositionValue[1] + displace[1]];
    lastPositionProperty.addKey(THROWEND - duringTime);
    lastPositionProperty.addKey(THROWEND);
    lastPositionProperty.setValueAtKey(THROWEND - duringTime, lastPositionValue);
    lastPositionProperty.setValueAtKey(THROWEND, lastPositionEndValue);
    /*
    var lastAnchorPointProperty = videoTrackLastClips[trackId].components.anchorPoint;
    var lastAnchorPointValue = lastAnchorPointProperty.getValue();
    lastAnchorPointProperty.setTimeVarying(true);
    lastAnchorPointProperty.addKey(THROWEND - duringTime);
    lastAnchorPointProperty.addKey(THROWEND);
    lastAnchorPointProperty.setValueAtKey(THROWEND - duringTime, lastAnchorPointValue);
    lastAnchorPointProperty.setValueAtKey(THROWEND, [0.5, 0.5]);
    */

    var lastRotationProperty = videoTrackLastClips[trackId].components.rotation;
    var lastRotationValue;
    if(lastRotationProperty.isTimeVarying()){
		var nearestKey = lastRotationProperty.findPreviousKey(THROWEND);
		if(nearestKey){lastRotationValue = lastRotationProperty.getValueAtKey(nearestKey);}
		else{lastRotationValue = lastRotationProperty.getValue();}
    }else{
        lastRotationValue = lastRotationProperty.getValue();
        lastRotationProperty.setTimeVarying(true);
    }
    var lastRotationEndValue = lastRotationValue+720;
    lastRotationProperty.addKey(THROWEND - duringTime);
    lastRotationProperty.addKey(THROWEND);
    lastRotationProperty.setValueAtKey(THROWEND - duringTime, lastRotationValue);
    lastRotationProperty.setValueAtKey(THROWEND, lastRotationEndValue);


    var lastScaleProperty = videoTrackLastClips[trackId].components.scale;
    var lastScaleValue;
    if(lastScaleProperty.isTimeVarying()){
		var nearestKey = lastScaleProperty.findPreviousKey(THROWEND);
		if(nearestKey){lastScaleValue = lastScaleProperty.getValueAtKey(nearestKey);}
		else{lastScaleValue = lastScaleProperty.getValue();}
    }else{
        lastScaleValue = lastScaleProperty.getValue();
        lastScaleProperty.setTimeVarying(true);
    }
    var lastScaleEndValue = lastScaleValue*0.3;
    lastScaleProperty.addKey(THROWEND - duringTime);
    lastScaleProperty.addKey(THROWEND);
    lastScaleProperty.setValueAtKey(THROWEND - duringTime, lastScaleValue);
    lastScaleProperty.setValueAtKey(THROWEND, lastScaleEndValue);
}
//
function setMoveOut(trackId, displace, startTime, duringTime){
	if(startTime===undefined){startTime=currStartTime;}
    if(duringTime===undefined){duringTime = 2*FADE_TIME;}

    var lastClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    lastClip.end = startTime;
    var THROWEND = lastClip.inPoint.seconds + (startTime - lastClip.start.seconds);
	
	var lastPositionProperty = videoTrackLastClips[trackId].components.position;
    var lastPositionValue;
    if(lastPositionProperty.isTimeVarying()){
		var nearestKey = lastPositionProperty.findPreviousKey(THROWEND);
		if(nearestKey){lastPositionValue = lastPositionProperty.getValueAtKey(nearestKey);}
		else{lastPositionValue = lastPositionProperty.getValue();}
    }else{
        lastPositionValue = lastPositionProperty.getValue();
        lastPositionProperty.setTimeVarying(true);
    }
    var lastPositionEndValue = [lastPositionValue[0] + displace[0], lastPositionValue[1] + displace[1]];
    lastPositionProperty.addKey(THROWEND - duringTime);
    lastPositionProperty.addKey(THROWEND);
    lastPositionProperty.setValueAtKey(THROWEND - duringTime, lastPositionValue);
    lastPositionProperty.setValueAtKey(THROWEND, lastPositionEndValue);
}
//



/*
function addKeysAndValues(param, list){
    for(var i=0; i<list.length; i++){
        param.addKey(list[i][0]);
        param.setValueAtKey(list[i][0], list[i][1]);
    }
}
*/
//
function incrementTime(value){
	var toBe = (currStartTime + value)/frameLength;
	
	//clear tempUsedTracks
	
	for(var i=0;i<tempUsedTracks.length;i++){
		if((currStartTime + value - frameLength) > tempUsedTracks[i][1]){
			markEmptyClip(tempUsedTracks[i][0]);
			tempUsedTracks.splice(i,1);
			i--;
		}
	}
	
	
	if(toBe>Math.floor(toBe) && Math.round(toBe)==Math.floor(toBe)){
		return Math.ceil(toBe)*frameLength;
	}else{
		//return toBe*frameLength;
		return Math.floor(toBe)*frameLength;
	}
	
}
function roundTime(value){
	var toBe = value/frameLength;
	if(toBe>Math.floor(toBe) && Math.round(toBe)==Math.floor(toBe)){
		return Math.ceil(toBe)*frameLength;
	}else{
		return toBe*frameLength;
	}
}

function assertParaNotEmpty(key, para){
    if(!para){
        ERROR_MESSAGE = key + " do not have target.";
        STOP_WRONG = true;
        return true;
    }
    if(!para[0]){
        ERROR_MESSAGE = key + " do not have target.";
        STOP_WRONG = true;
        return true;
    }
    return false;
}

/*
function getAugments(key, list){
	aug = {};
	switch(key){
		case "template":
			aug.color = [];
			aug.waitTime = TITLE_TIME;
			for(var i=0;i<list.length;i++){
				if(!isNaN(parseFloat(list[i]))){
					aug.waitTime = parseFloat(list[i]);
					continue;
				}
				switch(list[i]){
					
				}
			}
		break;
		
		
	}
}

*/






// [positionParam, anchorPointParam], 预设img, face 的位置
function getDefaultMotion(type, position){
    var positionParam;
    var anchorPointParam;
    
    switch(type){
        case "face":
            var faceBase = 1-(BASEBAR_HEIGHT/SCREEN_HEIGHT);
            switch(position){
                case "左1":
                    positionParam = [0.15, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "中1":
                    positionParam = [0.575, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "右1":
                    positionParam = [0.85, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "左2":
                    positionParam = [0.3, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "中2":
                    positionParam = [0.425, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "右2":
                    positionParam = [0.7, faceBase];
					anchorPointParam = [0.5, 1];
                break;
                case "半身左1":
                    positionParam = [0.15, 0.8];
					anchorPointParam = [0.5, 0.5];
                break;
                case "半身左2":
                    positionParam = [0.3, 0.8];
					anchorPointParam = [0.5, 0.5];
                break;
                case "半身右1":
                    positionParam = [0.85, 0.8];
					anchorPointParam = [0.5, 0.5];
                break;
                case "半身右2":
                    positionParam = [0.7, 0.8];
					anchorPointParam = [0.5, 0.5];
                break;
				case "作者":
                    positionParam = [0.75, 0.27];
					anchorPointParam = [0.5, 0.5];
				break;
				case "战斗左":
                    positionParam = [142.5/1280, 0.5];
					anchorPointParam = [0.5, 1];
				break;
				case "战斗右":
                    positionParam = [1137.5/1280, 0.5];
					anchorPointParam = [0.5, 1];
				break;
				case "战斗右全屏":
                    positionParam = [0.85, 0.6];
					anchorPointParam = [0.5, 0.5];
				break;
				case "战斗对话":
                    positionParam = [290/1280, 510/720];
					anchorPointParam = [0, 1];
				break;
                case "默认正中":
                    positionParam = [0.5, 0.5];
					anchorPointParam = [0.5, 0.5];
                break;
                default:
                    positionParam = [0.5, faceBase];
					anchorPointParam = [0.5, 1];
                break;
            }
        break;
		case "image":
        case "img":
            anchorPointParam = [0.5, 0.5];
            switch(position){
                case "左":
                    positionParam = [0.3, 0.43];
                break;
                case "中":
                    positionParam = [0.5, 0.43];
                break;
                case "右":
                    positionParam = [0.7, 0.43];
                break;
                case "全身左":
                    positionParam = [0.15, 0.6];
                break;
                case "全身中":
                    positionParam = [0.5, 0.6];
                break;
                case "全身右":
                    positionParam = [0.85, 0.6];
                break;
                case "全身上左":
                    positionParam = [0.2, 0.43];
                break;
                case "全身上中":
                    positionParam = [0.5, 0.43];
                break;
                case "全身上右":
                    positionParam = [0.8, 0.43];
                break;
				case "战斗开始左":
					positionParam = [0.25,0.75];
					anchorPointParam = [0.5, 1];
				break;
				case "战斗开始右":
					positionParam = [0.75,0.75];
					anchorPointParam = [0.5, 1];
				break;
                case "默认正中":
                    positionParam = [0.5, 0.5];
					anchorPointParam = [0.5, 0.5];
                break;
                default:
                    positionParam = [0.5, 0.5];
                break;
            }
        break;
    }

    return [positionParam, anchorPointParam];
}









// please use this only after insert a clip. 
// To find the componentObj of old clips, use videoTrackLastClips[trackId].components
// return componentObj
function getLastTrackComponentObjs(trackId){
    var thisClip = videoTracks[trackId].clips[videoTracks[trackId].clips.numItems-1];
    var videoComponentObjs = getComponentObjs(thisClip);
    
    return videoComponentObjs;
}

function getComponentObjs(clip) {
	
	var components = clip.components;
    var opacityComponent;
    var motionComponent;
    // search for the opacity and motion components for this given image

    
    for(var i = 0; i < components.numItems; i++) {
        if(components[i].displayName == "Opacity") {
                opacityComponent = components[i];
            }
        if(components[i].displayName == "Motion") {
                motionComponent = components[i];
            }
    }

    var componentObj = {
            
        };

    for(var e = 0; e < opacityComponent.properties.numItems; e++) {
        switch(opacityComponent.properties[e].displayName) {
            case "Opacity":
                componentObj.opacity = opacityComponent.properties[e];
            break;
            //case "Blend Mode":
            //    componentObj.blendMode = opacityComponent.properties[e];
            //break;
        }
    }

// once the opacity and motion components are found, we need to get the other values (like position, scale, rotation, etc.)
    for(var e = 0; e < motionComponent.properties.numItems; e++) {
        switch(motionComponent.properties[e].displayName) {
                case "Position":
                    componentObj.position = motionComponent.properties[e];
                break;
                case "Scale":
                    componentObj.scale = motionComponent.properties[e];
                break;
                case "Scale Width":
                    componentObj.scaleWidth = motionComponent.properties[e];
                    componentObj.scaleCheck = motionComponent.properties[e+1];
                break;
                case "Rotation":
                    componentObj.rotation = motionComponent.properties[e];
                break;
                case "Anchor Point":
                    componentObj.anchorPoint = motionComponent.properties[e];
                break;
                default:
                break;
        }
    }
    
    componentObj.scaleCheck.setValue(true, true);
    // send back a proprietary object that only we know the hierarchy of
    return componentObj;
} 

function getAudioVolume(trackId){
	var components = audioTracks[trackId].clips[audioTracks[trackId].clips.numItems-1].components;
	var volumeComponent;
	
	for(var i = 0; i < components.numItems; i++) {
		if(components[i].displayName == "Volume") {
			volumeComponent = components[i];
			break;
		}
    }
	
    for(var e = 0; e < volumeComponent.properties.numItems; e++) {
		if(volumeComponent.properties[e].displayName == "Level"){
			return volumeComponent.properties[e]
		}
    }
}
//





function findTrackWithSameType(key, name){
    for(var i=1;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type.indexOf(key)!=-1 && isSameTypeLayer(key, name, videoTrackLastClips[i].name)){
            return i;
        }
    }
    return -1;
}
function isSameTypeLayer(key, name1, name2){
	return (ResourcesMap[key][name1] && ResourcesMap[key][name2] && ResourcesMap[key][name1].type && ResourcesMap[key][name2].type && ResourcesMap[key][name1].type==ResourcesMap[key][name2].type);
}
//



function clearFadeOutObjByTrackIds(trackIds){
	if(!trackIds){return;}
	for(var i=0;i<trackIds.length;i++){
		clearFadeOutObj(trackIds[i]);
    }
}

//type例如 "img", name是set里的para[0]
function clearFadeOutObjByTypeAndName(type, name){
	for(var i=0;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type.indexOf(type) != -1 && videoTrackLastClips[i].name.indexOf(name) != -1){
			clearFadeOutObj(i);
        }
    }
}

//name 里可能是position或name
//消除全部
function clearFadeOutAllObjByPositionOrName(type, name){
	for(var i=0;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type.indexOf(type) != -1 && (videoTrackLastClips[i].name.indexOf(name) != -1 || videoTrackLastClips[i].position.indexOf(name) != -1)){
			clearFadeOutObj(i);
        }
    }
}

//position可为空
//position="右" 需要能删除 "半身右" 
function clearFadeOutAllObjByType(type, position){
	if(position===undefined){
		for(var i=0;i<videoTrackLastClips.length;i++){
			if(videoTrackLastClips[i].type.indexOf(type) != -1){
				clearFadeOutObj(i);
			}
		}
	}else{
		for(var i=0;i<videoTrackLastClips.length;i++){
			if(videoTrackLastClips[i].type.indexOf(type) != -1 && videoTrackLastClips[i].position.indexOf(position) != -1){
				clearFadeOutObj(i);
			}
		}
	}
}


// 2. fade out object
// 3. mark empty
function clearFadeOutObj(trackId){
    if(trackId !=-1 && videoTrackLastClips[trackId].type != "empty"){
		if(videoTrackLastClips[trackId].type=="template"){
			var titleInfo = {
				time: currStartTime,
				titleClipInsertingType: "clear",
				trackId: trackId,
				clipNum: videoTracks[trackId].clips.numItems-1
			}
			titleInfoSeq.push(titleInfo);
		}
		else if(videoTrackLastClips[trackId].type.indexOf("change")==-1){
			setFadeOut(trackId);
		}
        markEmptyClip(trackId);
    }
}







function markEmptyClip(trackId){
    videoTrackLastClips[trackId] = {
            type: "empty",
//			position: "",
            components: {},
			name: ""
        };   
}
function markLastClip(trackId, type, position, name, videoComponentObjs){
    videoTrackLastClips[trackId] = {
            type: type,
			position: position,
            components: videoComponentObjs,
			name: name			
        };   
}


//所有type都可，按照Name寻找第一个
function findTrackForName(target){

	for(var i=0;i<videoTrackLastClips.length;i++){
		if(videoTrackLastClips[i].name.indexOf(target) != -1){
			return i;
		}
	}
	
	return -1;
}

//target 可能是position或name
function findTrackForTypeOrName(key, target){

	for(var i=0;i<videoTrackLastClips.length;i++){
		if(videoTrackLastClips[i].type == key && (videoTrackLastClips[i].position.indexOf(target) != -1 || videoTrackLastClips[i].name.indexOf(target) != -1)){
			return i;
		}
	}
	
	return -1;
}

//通过"battleStartLeft"找"battleStart"
function findTitleBarTrackForTitle(type){
	//type = "title_bar"+type;
    for(var i=1;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type=="title_bar" && type.indexOf(videoTrackLastClips[i].position)==0){
            return i;
        }
    }
    return -1;
}

//通过battleMainCenterLower 找 battleMainCenter，反之亦然
function findRelatedTitleTracks(type){
	var sameTrack = -1;
	var tracks = [];
		for(var i=1;i<videoTrackLastClips.length;i++){
		if(videoTrackLastClips[i].type=="template"){
			if(videoTrackLastClips[i].position==type){
				sameTrack = i;
			}
			else if(type.indexOf(videoTrackLastClips[i].position)==0 || videoTrackLastClips[i].position.indexOf(type)==0){
				tracks.push(i);
			}
		}
    }
	
	if(sameTrack==-1 && tracks.length>0){
		sameTrack = tracks[0];
		tracks = tracks.slice(1,tracks.length);
	}
	
	return [sameTrack, tracks];
}

function findTrackForType(type, position){
    for(var i=1;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type == type && videoTrackLastClips[i].position == position){
            return i;
        }
    }
    return -1;
}

// if 'is_title' is false, then consider it as image
function findEmptyChangeTrack(is_title){
	var topTrack = videoTracks.numTracks-1;
	if(is_title){topTrack = videoTracks.numTracks-1;}
	else{topTrack = BARSTARTTRACK-1;}
    for(var i=topTrack;i>topTrack-6;i--){
        if(videoTracks[i].clips.numItems <= 0 && videoTrackLastClips[i].type == "empty"){return i;}
        //$.write ("");
        if(videoTrackLastClips[i].type == "empty" && videoTracks[i].clips[videoTracks[i].clips.numItems-1].end.seconds+frameLength < currStartTime){
			return i;
		}
    }
	
	return -1;
}

function findTrackNull(start){
	if(start === undefined){start=1;}
	if(start < 0){start=1;}
	
    for(var i=start;i<videoTrackLastClips.length;i++){
        if(videoTrackLastClips[i].type == "empty"){
            return i;
        }
    }
    ERROR_MESSAGE = "cannot find any empty track. Please add more track.";
    STOP_WRONG = true;
	return -1;
}

// if track i and track (i+1) are null, return i
function findTwoTrackNull(start){
	if(start === undefined){start=1;}
	if(start < 0){start=1;}
	
    for(var i=start;i<videoTrackLastClips.length-1;i++){
        if(videoTrackLastClips[i].type == "empty" && videoTrackLastClips[i+1].type == "empty"){
            return i;
        }
    }
    ERROR_MESSAGE = "cannot find any empty track. Please add more track.";
    STOP_WRONG = true;
	return -1;
}
//


function readScript(scriptFile){
    
    var scriptSequence = [];
    var lineNum = 0;
    scriptFile.open ('r');
    var line = "";
    do{
        line = scriptFile.readln();
        lineNum++;
        
        line = line.replace(/\/\/.*$/g,'');
        line = line.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        line = line.replace(/ +$/g, ' ');
		
        if(line == ""){
            continue;
        }

        var object_and_lineNum = readScriptLine(scriptFile, line, lineNum);
        lineNum = object_and_lineNum[1];
        scriptSequence.push(object_and_lineNum[0]);

    }while(!scriptFile.eof)
    
    scriptFile.close();
    
    return scriptSequence;
}


function readScriptLine(scriptFile, line, lineNum){
    var obj = {};
    
    var line = line.split(' ');
    var key_para = line[0].split(':');
    obj['key'] = key_para[0];
	obj.line = lineNum;
    if(key_para[1]){
        obj['para'] = key_para.slice(1,key_para.length); 
    }
    
    if(line[1]){
		//obj['target'] = line.slice(1,line.length);
		obj['target'] = []
		for(var i=1;i<line.length;i++){
			if(line[i]=="{"){
				if(i+1>=line.length){
					do{
						line = scriptFile.readln().replace(/\/\/.*$/g,'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(/ +$/g, ' ');
						lineNum++;
					}while(!scriptFile.eof && line=="")
					line = line.split(' ');
					i=0;
				}else{i++;}
				
				while(line[i]!="}"){
					obj['target'].push(line[i]);
					if(i+1>=line.length){
						do{
							line = scriptFile.readln().replace(/\/\/.*$/g,'').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(/ +$/g, ' ');
							lineNum++;
						}while(!scriptFile.eof && line=="")
						line = line.split(' ');
						i=0;
					}else{i++;}

					if(!line[i] && scriptFile.eof){
						scriptFile.close();
						alert("Script parsing error. cannot find \"}\" corresponding to \"{\"\n Please stop the process.");
						return;
					}
				}
				

				continue;
			}
			obj['target'].push(line[i]);
		}
    }
    
    return [obj, lineNum];
}
//








function getAllResource(mainPath){
    var importFolder = new Folder (mainPath);
    //importFolder = Folder.selectDialog ("选择主目录");
    
    if(importFolder == null){
        return false
    }
        
    var filePaths = getFilePaths(importFolder.getFiles())

    titleFolderPath = importFolder.fsName + "\\titles"
    var scriptPath = filePaths['Script.txt'];
    var backgroundsPath = filePaths['backgrounds'];
    var facesPath = filePaths['faces'];
    var imagesPath = filePaths['images'];
    var title_templatesPath = filePaths['title_templates'];
    var musicsPath = filePaths['musics'];
    var title_barsPath = filePaths['title_bars'];
    var soundsPath = filePaths['sounds'];
    

    if(!scriptPath){
		alert ("File \"Script.txt\" not found.");
    }
    if(!backgroundsPath){
		alert ("Folder \"backgrounds\" not found.");
    }
    if(!facesPath){
		alert ("Folder \"faces\" not found.");
    }
    if(!imagesPath){
		alert ("Folder \"images\" not found.");
    }
    if(!musicsPath){
		alert ("Folder \"musics\" not found.");
    }
    if(!title_templatesPath){
		alert ("Folder \"title_templates\" not found.");
	}
    if(!title_barsPath){
		alert ("Folder \"title_bars\" not found.");
    }
    if(!soundsPath){
		alert ("Folder \"sounds\" not found.");
    }

	ResourcesMap.scriptPath = scriptPath;
    ResourcesMap['background'] = getResourceMap(backgroundsPath);
	ResourcesMap['face'] = getResourceMap(facesPath, "face");
    ResourcesMap['image'] = getResourceMap(imagesPath, "image");
	ResourcesMap['music'] = getResourceMap(musicsPath, "music");
    ResourcesMap['title_template'] = getResourceMap(title_templatesPath, "title_template");
	ResourcesMap['title_bar'] = getResourceMap(title_barsPath, "title_bar");
	ResourcesMap['sound'] = getResourceMap(soundsPath, "sound");
	
	/*
	var templateColorFile = new File (title_templatesPath + "\\color.csv");
	if(templateColorFile.exists){
		var colorMap = {}
		templateColorFile.open ("r");
		
		do{
			var tmp = templateColorFile.readln();
			tmp = tmp.replace(/\/\/.*$/g,'');
			tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			if(tmp == ""){
				continue;
			}
			var list = tmp.split (',');
			colorMap[list[0]] = {};
			colorMap[list[0]].num = parseInt(list[1]);
			colorMap[list[0]].colors = list.slice(2,list.length);
		}while(!templateColorFile.eof)
		templateColorFile.close();
	
		ResourcesMap['template_color'] = colorMap;
	}
	*/
}






function getResourceMap(path, type){    
	if(type===undefined){type="";}
    
    var tmp = path.split ('\\');
    var pathName = tmp[tmp.length-1];
    
    
    var itemMap = {};
    var itemPath = [];
    
    var csvFile = new File (path + "\\resources.csv");
    if(csvFile.exists){
        
        var map_and_itemPath;
        switch(type){
            case "title_bar":
                map_and_itemPath = parseCSV2(csvFile, path);
                itemMap = map_and_itemPath[2];
                break;
			case "title_template":
				map_and_itemPath = parseCSV3(csvFile, path);
				itemMap = map_and_itemPath[2];
				break;
			case "img":
			case "image":
			case "face":
				map_and_itemPath = parseCSV1(csvFile, path);
				itemMap = map_and_itemPath[2];
				break;
			case "music":
			case "sound":
				map_and_itemPath = parseCSV4(csvFile, path);
				itemMap = map_and_itemPath[2];
				break;
			default:
				map_and_itemPath = parseCSV(csvFile, path);
				itemMap = map_and_itemPath[2];
			break;
		}


    
        var nameMap = map_and_itemPath[0];
        itemPath = map_and_itemPath[1];
        
        var itemFolder = projectItem.createBin(pathName);
        project.importFiles(itemPath); 

        
        for (var i = 0; i < itemFolder.children.numItems; i++){
            var thisName = itemFolder.children[i].name;
            
            if(thisName in nameMap){
				for(var e=0;e<nameMap[thisName].length;e++){
					itemMap[nameMap[thisName][e]].obj = itemFolder.children[i];
				}
            }
        }
    
    /*
        for(var e in itemMap){
            itemMap[e].moveBin(itemFolder);
        }
    */
    }

    return itemMap;
    
}

//for normal resource  [name, filename]
function parseCSV(csvFile, path){
    var paths = [];				//paths to import
    var map = {};				//object name -> name
	var itemMap = {};			//name -> {}
    csvFile.open ("r");
    
    do{
        var tmp = csvFile.readln();
        tmp = tmp.replace(/\/\/.*$/g,'');
        tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        if(tmp == ""){
            continue;
        }
        var list = tmp.split (',');
		var importedName = list[1].split('\\')[list[1].split('\\').length-1];
		if(map[importedName]){
			map[importedName].push(list[0]);
		}else{
			map[importedName] = [list[0]];
		}
		itemMap[list[0]] = {};
        paths.push ( path + "\\" + list[1]);
    }while(!csvFile.eof)
    csvFile.close();

    return [map, paths, itemMap];
}

//for image & faces  [name, filename, scale, type]
function parseCSV1(csvFile, path){
    var paths = [];
    var map = {};
    var itemMap = {};
    csvFile.open ("r");
    
    do{
        var tmp = csvFile.readln();
        tmp = tmp.replace(/\/\/.*$/g,'');
        tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        if(tmp == ""){
            continue;
        }
        var list = tmp.split (',');
		var importedName = list[1].split('\\')[list[1].split('\\').length-1];
		if(map[importedName]){
			map[importedName].push(list[0]);
		}else{
			map[importedName] = [list[0]];
		}
		itemMap[list[0]] = {};
		if(list[2]===undefined || list[2]=="" || isNaN(parseFloat(list[2]))){
			itemMap[list[0]].scale= 100.0;
		}else{
			itemMap[list[0]].scale= parseFloat(list[2]);
		}
		if(list[3] && list[3]!=""){
			itemMap[list[0]].type = list[3];
		}
        paths.push ( path + "\\" + list[1]);
    }while(!csvFile.eof)
    csvFile.close();

    return [map, paths, itemMap];
}

//for title_bar  [name, filename, title_type]
function parseCSV2(csvFile, path){
    var paths = [];
    var map = {};
    var itemMap = {};
    csvFile.open ("r");
    
    do{
        var tmp = csvFile.readln();
        tmp = tmp.replace(/\/\/.*$/g,'');
        tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        if(tmp == ""){
            continue;
        }
        var list = tmp.split (',');
		var importedName = list[1].split('\\')[list[1].split('\\').length-1];
		if(importedName.substring(importedName.length-5, importedName.length)==".prtl"){
			if(map[importedName.substring(0, importedName.length-5)]){
				map[importedName.substring(0, importedName.length-5)].push(list[0]);
			}else{
				map[importedName.substring(0, importedName.length-5)] = [list[0]];
			}
		}else{
			if(map[importedName]){
				map[importedName].push(list[0]);
			}else{
				map[importedName] = [list[0]];
			}
		}
        
        itemMap[list[0]] = {
            'type': list[2]
            };
        paths.push ( path + "\\" + list[1]);
    }while(!csvFile.eof)
    csvFile.close();

    return [map, paths, itemMap];
}

//for title_template  [name, filename, title_type, number_of_inputs, dice属性]
function parseCSV3(csvFile, path){
    var paths = [];
    var map = {};
    var itemMap = {};
    csvFile.open ("r");
    
    do{
        var tmp = csvFile.readln();
        tmp = tmp.replace(/\/\/.*$/g,'');
        tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        if(tmp == ""){
            continue;
        }
        var list = tmp.split (',');
		var importedName = list[1].split('\\')[list[1].split('\\').length-1];
		if(map[importedName.split ('.')[0]]){
			map[importedName.split ('.')[0]].push(list[0]);
		}else{
			map[importedName.split ('.')[0]] = [list[0]];
		}
		if(isNaN(parseInt(list[3]))){
			alert(path+"  Number of Template Input for " + list[0] + " is not number");
		}
        itemMap[list[0]] = {
            'type': list[2],
            'numInput': parseInt(list[3]),
            'path': path + "\\" + list[1]
            };
		if(list[4] && list[4]!=""){
			itemMap[list[0]]['dice'] = list[4];
		}
        paths.push ( path + "\\" + list[1]);
    }while(!csvFile.eof)
    csvFile.close();

    return [map, paths, itemMap];
}

//for music & sound [name, filename, volume]
function parseCSV4(csvFile, path){
    var paths = [];
    var map = {};
    var itemMap = {};
    csvFile.open ("r");
    
    do{
        var tmp = csvFile.readln();
        tmp = tmp.replace(/\/\/.*$/g,'');
        tmp = tmp.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        if(tmp == ""){
            continue;
        }
        var list = tmp.split (',');
		var importedName = list[1].split('\\')[list[1].split('\\').length-1];
		if(map[importedName]){
			map[importedName].push(list[0]);
		}else{
			map[importedName] = [list[0]];
		}
		itemMap[list[0]] = {};
		if(list[2]===undefined || list[2]=="" || isNaN(parseFloat(list[2]))){
			itemMap[list[0]].volume= 0;
		}else{
			itemMap[list[0]].volume= parseFloat(list[2]);
		}
        paths.push ( path + "\\" + list[1]);
    }while(!csvFile.eof)
    csvFile.close();

    return [map, paths, itemMap];
}

function getFilePaths(allFiles){
    var thisName;

	var Paths = {};
    
    for(var i = 0;i < allFiles.length;i++){
        thisName = allFiles[i].name;
		switch(thisName){
			case "Script.txt":
			case "backgrounds":
			case "faces":
			case "images":
			case "title_templates":
			case "musics":
			case "title_bars":
			case "sounds":
				Paths[thisName] = allFiles[i].fsName;
			break;
		}

    
    }
    return Paths;
}
//

function newEmptyArray(n){
    var A = new Array(n);
    for(var i=0;i<n;i++){
//        A[i] = {};
//        A[i].type = "empty";
		A[i] = {
            type: "empty",
//			position: "",
            components: {},
			name: ""
        };   
    }
	
    return A;
}
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}
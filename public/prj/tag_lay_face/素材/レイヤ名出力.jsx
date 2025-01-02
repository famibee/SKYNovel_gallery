/*
 * レイヤ名出力.jsx
 * AIRNovel用 psdレイヤからレイヤ名と座標・サイズをテキストに書き出すツール
 * 「レイヤ名書き戻し.jsx」の逆をする
 * 
 * 「レイヤ名出力.jsx」→レイヤ名を編集→「レイヤ名書き戻し.jsx」などに使う
 * 
 * Licensed under the MIT License
 * 
 * Copyright (c) 2010 Famibee (famibee.blog38.fc2.com)
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
// テキストファイルに設定されたレイヤー名に従ってレイヤー名を全て設定する
//		x y w h [レイヤーセット名_@_][...]レイヤー名

try {
	// 単位設定をピクセルに変更（後で戻す）
	var org_unit = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;


	var folderObj = Folder.selectDialog("【レイヤ名出力】"+ activeDocument.name +"のレイヤ名一覧ファイル保存場所を指定");
	if (folderObj == null) throw ("【レイヤ名出力】中断しました");

	var fileObj = new File(folderObj.fsName+ "/psd_layers.txt");
	if (! fileObj.open("w")) {
		throw ("【レイヤ名出力】ファイルが開けませんでした");
	}
	fileObj.encoding = "UTF-8";
	s_head = "";
	getLayerNameTree(activeDocument);
	fileObj.close();


	// 単位設定を元に戻す
	preferences.rulerUnits = org_unit;
	alert("【レイヤ名出力】正常終了しました");
}
catch(msg)
{
	alert(msg);
}


//　レイヤー名を出力する（再帰）
function getLayerNameTree(layObj)
{
	// レイヤー
	var n = layObj.artLayers.length;
	for (i=0; i<n; ++i) {
		var lay_name = layObj.artLayers[i].name;
		var lay_bounds = layObj.artLayers[i].bounds;
		var x1 = parseInt(lay_bounds[0]);
		var y1 = parseInt(lay_bounds[1]);
		var x2 = parseInt(lay_bounds[2]);
		var y2 = parseInt(lay_bounds[3]);
		var str_name = s_head + lay_name.replace(/[\\\/:*?"<>|.]/, "#");
		fileObj.write(x1 +"\t"+ y1 +"\t"+ (x2-x1+1) +"\t"+ (y2-y1+1) +"\t"+ str_name +"\n");
	}

	// 子レイヤーセット
	var tmp_head = s_head;
	var ns = layObj.layerSets.length;
	for (var i=0; i<ns; ++i) {
		s_head = tmp_head + layObj.layerSets[i].name + "_@_";
		getLayerNameTree(layObj.layerSets[i])
	}
	s_head = tmp_head;
}

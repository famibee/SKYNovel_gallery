/*
 * レイヤ名書き戻し.jsx
 * AIRNovel用 テキストからレイヤ名と座標・サイズをpsdレイヤに書き戻すツール
 * 「レイヤ名出力.jsx」の逆をする
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
// テキストファイルに設定されたレイヤー名に従ってレイヤー名を全て書き戻す
//		x y w h [レイヤーセット名_@_][...]レイヤー名

try {
	// 単位設定をピクセルに変更（後で戻す）
	var org_unit = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;


	var fileObj = File.openDialog("【レイヤ名書き戻し】"+ activeDocument.name +"に書き戻すレイヤ名一覧ファイルを指定してください", "psd_layers.txt");
	if (fileObj == null) throw ("【レイヤ名書き戻し】中断しました");

	if (! fileObj.open("r")) {
		throw ("【レイヤ名書き戻し】ファイルが開けませんでした");
	}
	fileObj.encoding = "UTF-8";
	setLayerNameTree(activeDocument);
	fileObj.close();


	// 単位設定を元に戻す
	preferences.rulerUnits = org_unit;
	alert("【レイヤ名書き戻し】正常終了しました");
}
catch(msg)
{
	alert(msg);
}


//　レイヤー名を書き戻す（再帰）
function setLayerNameTree(layObj)
{
	// レイヤー
	var n = layObj.artLayers.length;
	for (var i=0; i<n; ++i) {
		var lay_visible = layObj.artLayers[i].visible;
		layObj.artLayers[i].name = fileObj.readln().replace(/\d+\t\d+\t\d+\t\d+\t/, "").replace(/.+_@_/, "");
		layObj.artLayers[i].visible = lay_visible;
	}

	// 子レイヤーセット
	var ns = layObj.layerSets.length;
	for (var i=0; i<ns; ++i) {
		var layset_visible = layObj.layerSets[i].visible;
		setLayerNameTree(layObj.layerSets[i])
		layObj.layerSets[i].visible = layset_visible;
	}
}

/*
 * レイヤ切り出し.jsx
 * AIRNovel用 レイヤから立ち絵ファイルを切り出すツール
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
// ドキュメント内の全レイヤに対し以下の処理を行う。
// 1.レイヤの左上座標をテキストファイルに保存する（透明pixelはトリミング）
//		x y w h [レイヤーセット名_@_][...]レイヤー名
// 2.連番 + レイヤ名でレイヤ画像をpng保存する（透明pixelはトリミング）

try {
	// 単位設定をピクセルに変更（後で戻す）
	var org_unit = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;


	var OutFolderObj = Folder.selectDialog("【レイヤ切出】"+ activeDocument.name +"のレイヤ切り出し保存場所を指定");
	if (OutFolderObj == null) throw ("【レイヤ切出】中断しました");
	var out_folder = OutFolderObj.fsName;
	var out_exp = ".png";


	// そのままレイヤ毎にpng保存
//	fileObj = new File(out_folder+ "/psd_layers.txt");
	var source_doc_name = activeDocument.name.replace(/\..+?$/, "");
	var fileObj = new File(out_folder+ "/face"+ source_doc_name +".an");
	if (! fileObj.open("w")) {
		throw ("【レイヤ切出】ファイルが開けませんでした");
	}
	fileObj.encoding = "UTF-8";
	fileObj.write("; *******************************************************\r");
	fileObj.write("; "+ source_doc_name +"\r");
	fileObj.write("; *******************************************************\r");
	s_head = "";
	writeLayerTree(activeDocument);


	fileObj.write("\r");
	fileObj.write("; *******************************************************\r");
	fileObj.write("\r");
	fileObj.write("[return]\r");

	fileObj.close();

	// 新たに開いて透明pixelトリムして保存
	fileList = OutFolderObj.getFiles("*"+out_exp);
	for (i=0; i<fileList.length; ++i) {
		// PNGを新ドキュメントとして開く
		var docRef = open(fileList[i]);
			// 「トリミング」コマンドを実行
			// 第１引数には次のいずれかを指定してトリミング対象カラーを指定
			//		透明ピクセル	TrimType.TRANSPARENT
			// 第２から第４引数ではトリミングする部分を指定
			//		上端、左端、下端、右端
			docRef.trim(TrimType.TRANSPARENT, true, true, true, true);
		// 保存
		docRef.close(SaveOptions.SAVECHANGES);
	}


	// 単位設定を元に戻す
	preferences.rulerUnits = org_unit;
	alert("【レイヤ切出】正常終了しました");
}
catch(msg)
{
	alert(msg);
}


//　レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）
function writeLayerTree(layObj)
{
	var n = layObj.artLayers.length;
	var ns = layObj.layerSets.length;

		// 全レイヤーを（退避しつつ）非表示にする
		var a_lay_visible = [];
		for (var i=0; i<n; ++i) {
			a_lay_visible[i] = layObj.artLayers[i].visible;
			layObj.artLayers[i].visible = false;
		}

		// 全子レイヤーセットを（退避しつつ）非表示にする
		var a_layset_visible = [];
		for (var i=0; i<ns; ++i) {
			a_layset_visible[i] = layObj.layerSets[i].visible;
			layObj.layerSets[i].visible = false;
		}

	// レイヤー
	for (var i=0; i<n; ++i) {
		var lay_name = layObj.artLayers[i].name;
		var lay_bounds = layObj.artLayers[i].bounds;
		var x1 = parseInt(lay_bounds[0]);
		var y1 = parseInt(lay_bounds[1]);
		var x2 = parseInt(lay_bounds[2]);
		var y2 = parseInt(lay_bounds[3]);
		var str_name = s_head + lay_name.replace(/[\\\/:*?"<>|.]/, "#");
//		fileObj.write(x1 +"\t"+ y1 +"\t"+ (x2-x1+1) +"\t"+ (y2-y1+1) +"\t"+ str_name +"\r");
		var mode = "";
		var comment = "";
		var blendmode_name = layObj.artLayers[i].blendMode;
		switch (blendmode_name) {
		case BlendMode.COLORBLEND:	// カラー
		case BlendMode.COLORBURN:	// 焼き込みカラー
		case BlendMode.COLORDODGE:	// 覆い焼きカラー
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;

		case BlendMode.DARKEN:		// 比較（暗）
			mode = ' blendmode="darken"';
			break;

		case BlendMode.DIFFERENCE:	// 差の絶対値
			mode = ' blendmode="difference"';
			break;

		case BlendMode.DISSOLVE:	// ディザ合成
		case BlendMode.EXCLUSION:	// 除外
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;

		case BlendMode.HARDLIGHT:	// ハードライト
			mode = ' blendmode="hardlight"';
			break;

		case BlendMode.HUE:			// 色相
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;

		case BlendMode.LIGHTEN:		// 比較（明）
			mode = ' blendmode="lighten"';
			break;

		case BlendMode.LINEARBURN:	// 焼き込み（リニア）
		case BlendMode.LINEARDODGE:	// 覆い焼き（リニア）
		case BlendMode.LINEARLIGHT:	// リニアライト
		case BlendMode.LUMINOSITY:	// 輝度
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;

		case BlendMode.MULTIPLY:	// 乗算
			mode = ' blendmode="multiply"';
			break;

		case BlendMode.NORMAL:		// 通常
			mode = '';	// 指定は省略
			break;

		case BlendMode.OVERLAY:		// オーバーレイ
			mode = ' blendmode="overlay"';
			break;

		case BlendMode.PASSTHROUGH:	// 通過
		case BlendMode.PINLIGHT:	// ピンライト
		case BlendMode.SATURATION:	// 彩度
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;

		case BlendMode.SCREEN:		// スクリーン
			mode = ' blendmode="screen"';
			break;

		case BlendMode.SOFTLIGHT:	// ソフトライト
		case BlendMode.VIVIDLIGHT:	// ビビッドライト
			comment = "\t; サポートされないレイヤモード【"+ blendmode_name +"】です";
			break;
		}
		fileObj.write('[add_face name="'+ source_doc_name +'_'+ str_name +'" dx='+ x1 +' dy='+ y1 + mode +']'+ comment +'\r');

		layObj.artLayers[i].visible = true;

			// PNGで保存
//			var pfileObj = new File(out_folder + "/"+ str_name +out_exp);
			var pfileObj = new File(out_folder + "/"+ source_doc_name +"_"+ str_name +out_exp);
			if (pfileObj.exists) pfileObj.remove();	// 上書きするため削除
			var pngOpt = new PNGSaveOptions();
			pngOpt.interlaced = false;
			activeDocument.saveAs(pfileObj, pngOpt, true, Extension.LOWERCASE);

		layObj.artLayers[i].visible = false;
	}

	// 子レイヤーセット
	var tmp_head = s_head;
	for (var i=0; i<ns; ++i) {
//		s_head = tmp_head + layObj.layerSets[i].name + "_@_";
		s_head = tmp_head + layObj.layerSets[i].name + "_";
		layObj.layerSets[i].visible = true;
		writeLayerTree(layObj.layerSets[i])
		layObj.layerSets[i].visible = false;
	}
	s_head = tmp_head;

		// 全子レイヤーセットの表示状態を復帰する
		for (var i=0; i<ns; ++i) {
			layObj.layerSets[i].visible = a_layset_visible[i];
		}

		// 全レイヤーの表示状態を復帰する
		for (var i=0; i<n; ++i) {
			layObj.artLayers[i].visible = a_lay_visible[i];
		}
}

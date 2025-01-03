/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2018, famibee.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define('ace/mode/skynovel', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/skynovel_highlight_rules', 'ace/mode/folding/skynovel'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var anHighlightRules = require("./skynovel_highlight_rules").anHighlightRules;
var FoldMode = require("./folding/skynovel").FoldMode;

var Mode = function() {
    this.HighlightRules = anHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = ";";
}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define('ace/mode/skynovel_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var anHighlightRules = function() {

	var keywordMapper = this.createKeywordMapper({
		'keyword':
			'[|;|*|&|&&'
	,	'tag.punctuation.begin':
			'add_face|add_frame|add_lay|autowc|bracket2macro|break_macro|button|call|ch|ch_in_style|ch_out_style|char2macro|clear_event|clear_lay|clear_text|clearsysvar|clearvar|close|copybookmark|current|dump_lay|dump_script|dump_stack|dump_val|else|elsif|enable_event|endif|endlink|endmacro|er|erasebookmark|event|export|fadebgm|fadeoutbgm|fadeoutse|fadese|finish_trans|frame|graph|if|import|jump|l|lay|let|let_abs|let_char_at|let_frame|let_index_of|let_length|let_ml|let_replace|let_round|let_search|let_substr|link|load|loadplugin|log|macro|navigate_to|p|pause_tsy|playbgm|playse|pop_stack|quake|r|rec_ch|rec_r|record_place|reload_script|reset_rec|resume_tsy|return|ruby2|s|save|set_cancel_skip|set_focus|set_frame|snapshot|span|stats|stop_allse|stop_quake|stop_tsy|stopbgm|stopfadese|stopse|tcy|title|toggle_full_screen|trace|trans|tsy|tsy_frame|update_check|volume|wait|wait_tsy|waitclick|wb|wf|window|wl|wq|ws|wt|wv|xchgbuf'
	,	'entity.other.attribute-name.skynovel':
			'layer|page'
	,	'constant.language.skynovel':
			'null|true|false'
	}, "identifier")


	this.$rules = {
		start: [{

// コメント
			token: 'punctuation.definition.comment.skynovel',
			regex: /;.*/,
			push_: [{
				token: 'comment.line.semicolon.skynovel',
				regex: /$|^/,
				next: 'pop'
			}, {
				defaultToken: 'comment.line.semicolon.skynovel'
			}]
		}, {

// ラベル
			token: 'constant.other.label.skynovel',
			regex: /^\*\w+/
		}, {

// タグ
			token: ['meta.tag.punctuation.begin'],
			regex: /\[[^\s\]]+/,
			next: [
				{include : "attributes"}
			]
		}, {

// ＆変数操作
			token: ['meta.tag.punctuation.amp.begin', 'entity.other.attribute-name.amp.skynovel', 'text', 'keyword.operator.amp', 'string.quoted.double.amp.skynovel', 'keyword.operator.amp', 'text', 'constant.language.amp.skynovel'],
			regex: /(&)([^\s=]+)(\s*)(=)(.+?)(?:(=)(\s*)(int|uint|str))?$/,
		}, {

// ＆変数表示
			token: ['meta.tag.punctuation.begin.amp', 'string.quoted.double.amp.skynovel'],
			regex: /(&)([^&]+)/,
			next: [
				{token : "meta.tag.punctuation.end.amp", regex: '&', next : "start"}
			]
		}, {

// ルビ文法
			token: ['meta.tag.punctuation.begin.ruby', 'constant.other.skynovel.ruby', 'meta.tag.punctuation.begin.ruby', 'constant.language.skynovel.ruby'],
			regex: /(｜?)([^《\s][^《]*)(《)([^》]+)/,
			next: [
				{token : "meta.tag.punctuation.end.ruby", regex: '》', next : "start"}
			]
		}],


// 属性
		attributes: [{
// 閉じタグ
			token : 'meta.tag.punctuation.end',
			regex: /\]/,
			next : "start"
		}, {

			token: ['entity.other.attribute-name.skynovel', 'text', 'keyword.operator'],
			regex: /\b([^\s=]+)(\s*)([-!%&*+=/?:])/,
			next: [
				{include : "value"}
			]
		}],

// 属性値
		value: [{
// 文字列リテラル
			token: 'string.quoted.single.skynovel',
			regex: /(('|"|#).+?\2)/,
			next : "attributes"
		}, {

// 定数リテラル
			token: 'constant.language.skynovel',
			regex: /\b(?:null|true|false)\b/,
			next : "attributes"
		}, {

// 数値リテラル
			token: 'constant.numeric.skynovel',
			regex: /\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\.?[0-9]*|\.[0-9]+))\b/,
			next : "attributes"
		}, {

// ラベル（属性値としての）
			token: 'constant.other.label.skynovel',
			regex: /\*\w+/,
			next : "attributes"
		}, {

// その他の文字列属性値
			token: 'string',
			regex: /[^\s\]]+/,
			next : "attributes"
		}],

	};

	this.normalizeRules();
};

anHighlightRules.metaData = {
	fileTypes: ['an'],
	keyEquivalent: '^~A',
	name: 'skynovel',
	scopeName: 'source.skynovel'
};


oop.inherits(anHighlightRules, TextHighlightRules);

exports.anHighlightRules = anHighlightRules;
});

ace.define('ace/mode/folding/skynovel', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function(require, exports, module) {


var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() {
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

/*
	<key>foldingStartMarker</key>
	<string>(^\*\S+|\[macro )</string>
	<key>foldingStopMarker</key>
	<string>(\[return\]|\[endmacro\])</string>
*/

	this.foldingStartMarker = /^\s*\[([^\])]*)]\s*(?:$|[;#])/;

	this.getFoldWidgetRange = function(session, foldStyle, row) {
		var re = this.foldingStartMarker;
		var line = session.getLine(row);

		var m = line.match(re);

		if (!m) return;

		var startName = m[1] + ".";

		var startColumn = line.length;
		var maxRow = session.getLength();
		var startRow = row;
		var endRow = row;

		while (++row < maxRow) {
			line = session.getLine(row);
			if (/^\s*$/.test(line))
				continue;
			m = line.match(re);
			if (m && m[1].lastIndexOf(startName, 0) !== 0)
				break;

			endRow = row;
		}

		if (endRow > startRow) {
			var endColumn = session.getLine(endRow).length;
			return new Range(startRow, startColumn, endRow, endColumn);
		}
	};

}).call(FoldMode.prototype);

});

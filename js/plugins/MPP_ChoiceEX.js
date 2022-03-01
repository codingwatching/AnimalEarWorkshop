//=============================================================================
// MPP_ChoiceEX.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【MPP ver.3.2】選択肢の機能拡張
 * @author 木星ペンギン
 *
 * @help 
 * プラグインコマンド:
 *   ChoicePos x y row      # 選択肢の位置(x,y)と行数(row)指定
 *                            rowが未設定の場合、すべての選択肢を表示する
 *   ChoiceVariableId n     # 選択肢のデフォルト位置を変数n番にする
 *                            選択中の位置を変数n番にいれる
 * 
 * 注釈:
 *   選択肢ヘルプ             # 各項目の下に設定することで、ヘルプメッセージを表示させる
 *
 * ●選択肢を増やす
 *  イベントコマンド『選択肢の表示』を続けて配置すると
 *  一つの選択肢にまとめられます。
 *  まとめたくない場合は、間に注釈などを入れることで通常通り分けることができます。
 * 
 *  『デフォルト』の処理は、なし以外を設定したものが適用されます。
 *  『デフォルト』の処理が複数ある場合、
 *  後に設定された選択肢のものが適用されます。
 * 
 *  『キャンセル』の処理は、禁止以外を設定したものが適用されます。
 *  『キャンセル』の処理が複数ある場合、
 *  後に設定された選択肢のものが適用されます。
 * 
 * 『背景』と『ウィンドウ位置』は後の選択肢のものが適用されます。
 * 
 *
 * ●項目が表示される条件の設定
 *  選択肢の文章中に
 *    if(条件)
 *  と入れ、その条件が偽になると項目が表示されなくなります。
 * 
 *  条件内では s でスイッチ、v で変数を参照できます。
 *  （例：if(s[1]) とした場合、スイッチ１番がONで表示、OFFで非表示となります）
 * 
 *  『デフォルト』や『キャンセル』の項目が表示されない場合、
 *  なしや禁止と同じ処理をします。
 * 
 *
 * ●項目を半透明で表示する条件の設定
 *  選択肢の文章中に
 *    en(条件)
 *  と入れ、その条件が偽になると項目が半透明で表示されます。
 *  半透明となった項目は選択できなくなります。
 * 
 *  条件は上の『項目が表示される条件の設定』と同じです。
 * 
 *  『キャンセル』の項目が半透明の場合、ブザーが鳴ります。
 * 
 *
 * ●選択肢のカーソル位置指定と保存
 *  イベントコマンドの【プラグインコマンド】にて以下のように入力すると
 *  次に表示する選択肢のデフォルト位置を変数の値にして、
 *  決定またはキャンセル時にカーソル位置をその変数に入れます。
 * 
 *   ChoiceVariableId n
 *     n : 変数番号
 * 
 * カーソル位置は最初の選択肢が上から0～5、次の選択肢は10～15と、
 * 選択肢毎に+10されます。
 * 
 * 変数に入った値の項目がない場合、なしと同じ処理をします。
 * 
 *
 * ●プラグインコマンドの実行タイミング
 *  上記のプラグインコマンドを使用する場合、【選択肢の表示】の前に実行するのが
 *  好ましいです。
 *  ただし、メッセージウィンドウを表示したまま選択肢の処理を実行したい場合、
 *  【文章の表示】より前にプラグインコマンドを実行してください。
 * 
 * ●ヘルプメッセージの表示
 *  各選択肢項目の下に注釈で以下の文字列を入れると、
 *  続きの文章をヘルプメッセージとしてカーソルを合わせたときに標示させることができます。
 *  
 *    選択肢ヘルプ
 * 
 *  ※注意点
 *   ヘルプメッセージは[文章の表示]と同じ機能を使っているため、制御文字が使用できます。
 *   ただし、\!と\^は使用できません。
 *  
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 *
 * @param maxPageRow
 * @desc 1ページに表示される行数
 * @default 6
 *
 */

(function() {

var parameters = PluginManager.parameters('MPP_ChoiceEX');

var maxPageRow = Number(parameters['maxPageRow']);

var Alias = {};

//-----------------------------------------------------------------------------
// Game_Message

//332
Alias.GaMe_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    Alias.GaMe_clear.call(this);
    this._choiceEnables = [];
    this._choiceResults = [];
    this._helpTexts = [];
    this._choiceX = -1;
    this._choiceY = -1;
    this._choiceMaxRow = maxPageRow;
    this._choiceVariableId = 0;
};

Game_Message.prototype.setChoiceEnables = function(enables) {
    this._choiceEnables = enables;
};

Game_Message.prototype.choiceEnables = function() {
    return this._choiceEnables;
};

Game_Message.prototype.setChoiceResults = function(results) {
    this._choiceResults = results;
};

Game_Message.prototype.choiceResults = function() {
    return this._choiceResults;
};

Game_Message.prototype.setChoiceHelpTexts = function(texts) {
    this._helpTexts = texts;
};

Game_Message.prototype.helpTexts = function() {
    return this._helpTexts;
};

Game_Message.prototype.setChoicePos = function(x, y, row) {
    this._choiceX = x;
    this._choiceY = y;
    this._choiceMaxRow = row;
};

Game_Message.prototype.setChoiceVariableId = function(id) {
    this._choiceVariableId = id;
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//9062
Game_Interpreter.prototype.setupChoices = function(params) {
    var data = {
        choices: [],
        enables: [],
        results: [],
        helpTexts: [],
        cancelType: -1,
        defaultType: -1,
        positionType: 0,
        background: 0
    };
    data = this.addChoices(params, this._index, data, 0);
    if (data.choices.length > 0) {
        var helpTexts = [];
        if (data.helpTexts.length > 0) {
            helpTexts = data.results.map(function(i) {
                return data.helpTexts[i];
            });
        }
        var cancelType = -1;
        if (data.cancelType.mod(10) === 8 || data.results.contains(data.cancelType)) {
            data.results.push(data.cancelType);
            cancelType = data.choices.length;
        }
        var defaultType = -1;
        if ($gameMessage._choiceVariableId > 0) {
            var index = $gameVariables.value($gameMessage._choiceVariableId);
            defaultType = data.results.indexOf(index);
        } else {
            defaultType = data.results.indexOf(data.defaultType);
        }
        $gameMessage.setChoices(data.choices, defaultType, cancelType);
        $gameMessage.setChoiceEnables(data.enables);
        $gameMessage.setChoiceResults(data.results);
        $gameMessage.setChoiceHelpTexts(helpTexts);
        $gameMessage.setChoiceBackground(data.background);
        $gameMessage.setChoicePositionType(data.positionType);
        $gameMessage.setChoiceCallback(function(n) {
            this._branch[this._indent] = data.results[n];
        }.bind(this));
    } else {
        this._branch[this._indent] = -1;
    }
};

Game_Interpreter.prototype.addChoices = function(params, i, data, d) {
    var regIf = /\s*if\(([^\)]+)\)/;
    var regEn = /\s*en\(([^\)]+)\)/;
    for (var n = 0; n < params[0].length; n++) {
        var str = params[0][n];
        if (regIf.test(str)) {
            str = str.replace(regIf, '');
            if (RegExp.$1 && !this.evalChoice(RegExp.$1)) continue;
        }
        var enable = true;
        if (regEn.test(str)) {
            str = str.replace(regEn, '');
            enable = this.evalChoice(RegExp.$1);
        }
        data.choices.push(str);
        data.enables.push(enable);
        data.results.push(n + d);
    }
    var cancelType = params[1];
    if (cancelType !== -1) {
        data.cancelType = cancelType + d;
    }
    var defaultType = params.length > 2 ? params[2] : 0;
    if (defaultType >= 0) {
        data.defaultType = defaultType + d;
    }
    data.positionType = params.length > 3 ? params[3] : 2;
    data.background = params.length > 4 ? params[4] : 0;
    for (;;) {
        i++;
        if (this._list[i].indent === this._indent) {
            if (this._list[i].code === 402) {
                this.getHelpText(this._list[i].parameters[0] + d, i + 1, data);
            } else if (this._list[i].code === 404) {
                break;
            }
        }
    }
    if (this._list[i + 1].code === 102) {
        this.addChoices(this._list[i + 1].parameters, i + 1, data, d + 10);
    }
    return data;
};

Game_Interpreter.prototype.getHelpText = function(c, i, data) {
    if (this._list[i].code === 108 && this._list[i].parameters[0] === '選択肢ヘルプ') {
        var texts = [];
        while (this._list[i + 1].code === 408) {
            i++;
            texts.push(this._list[i].parameters[0]);
        }
        data.helpTexts[c] = texts;
    }
};

Game_Interpreter.prototype.evalChoice = function(formula) {
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        return !!eval(formula);
    } catch (e) {
        alert("条件エラー \n\n " + formula);
        return true;
    }
};

//9088
Game_Interpreter.prototype.command403 = function() {
    if (this._branch[this._indent] !== -2) {
        this.skipBranch();
    }
    return true;
};

Game_Interpreter.prototype.command404 = function() {
    if (this.nextEventCode() === 102) {
        this._branch[this._indent] -= 10;
        this._index++;
    }
    return true;
};

//10449
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    switch (command) {
    case 'ChoicePos':
        var x = Number(args[0]);
        var y = Number(args[1]);
        var row = Number(args[2] || 99);
        $gameMessage.setChoicePos(x, y, row);
        break;
    case 'ChoiceVariableId':
        $gameMessage.setChoiceVariableId(Number(args[0]));
        break;
    }
    return true;
};

//-----------------------------------------------------------------------------
// Window_ChoiceList

Alias.WiChLi_close = Window_ChoiceList.prototype.close;
Window_ChoiceList.prototype.close = function() {
    if ($gameMessage.helpTexts()) this._messageWindow.onShowFast();
    Alias.WiChLi_close.call(this);
};

Alias.WiChLi_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function() {
    var lastIndex = this.index();
    Alias.WiChLi_update.call(this);
    var variableId = $gameMessage._choiceVariableId;
    if (lastIndex !== this.index() && variableId > 0) {
        var results = $gameMessage.choiceResults();
        $gameVariables.setValue(variableId, results[this.index()]);
    }
};

//34
Alias.WiChLi_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
    Alias.WiChLi_updatePlacement.call(this);
    if ($gameMessage._choiceX >= 0 && $gameMessage._choiceY >= 0) {
        this.x = Math.min($gameMessage._choiceX, Graphics.boxWidth - this.width);
        this.y = Math.min($gameMessage._choiceY, Graphics.boxHeight - this.height);
    }
};

//67
Window_ChoiceList.prototype.numVisibleRows = function() {
    return Math.min($gameMessage.choices().length, $gameMessage._choiceMaxRow);
};

//103
Window_ChoiceList.prototype.makeCommandList = function() {
    var choices = $gameMessage.choices();
    var enables = $gameMessage.choiceEnables();
    for (var i = 0; i < choices.length; i++) {
        this.addCommand(choices[i], 'choice', enables[i]);
    }
};

//110
Alias.WiChLi_drawItem = Window_ChoiceList.prototype.drawItem;
Window_ChoiceList.prototype.drawItem = function(index) {
    this.changePaintOpacity(this.isCommandEnabled(index));
    Alias.WiChLi_drawItem.call(this, index);
};

//123
Alias.WiChLi_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
    Alias.WiChLi_callOkHandler.call(this);
    this._messageWindow.forceClear();
};

//129
Alias.WiChLi_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
Window_ChoiceList.prototype.callCancelHandler = function() {
    Alias.WiChLi_callCancelHandler.call(this);
    this._messageWindow.forceClear();
};

Alias.WiChLi_processCancel = Window_ChoiceList.prototype.processCancel;
Window_ChoiceList.prototype.processCancel = function() {
    var type = $gameMessage.choiceCancelType();
    var results = $gameMessage.choiceResults();
    var index = results.indexOf(results[type]);
    if (this.isCancelEnabled() && index !== type && !this.isCommandEnabled(index)) {
        this.playBuzzerSound();
    } else {
        Alias.WiChLi_processCancel.call(this);
    }
};

Window_ChoiceList.prototype.callUpdateHelp = function() {
    if (this.active && this._messageWindow && $gameMessage.helpTexts().length > 0) {
        this.updateHelp();
    }
};

Window_ChoiceList.prototype.updateHelp = function() {
    this._messageWindow.forceClear();
    var texts = $gameMessage.helpTexts()[this.index()];
    $gameMessage._texts = texts ? texts.clone() : [''];
    this._messageWindow.startMessage();
};


//-----------------------------------------------------------------------------
// Window_Message

//65
Window_Message.prototype.update = function() {
    this.checkToNotClose();
    Window_Base.prototype.update.call(this);
    while (!this.isOpening() && !this.isClosing()) {
        if (this.updateWait()) {
            return;
        } else if (this.updateLoading()) {
            return;
        } else if (!this.pause && this.updateMessage()) {
            return;
        } else if (this.updateInput()) {
            return;
        } else if (this.canStart()) {
            this.startMessage();
        } else {
            this.startInput();
            return;
        }
    }
};

//206
Alias.WiMe_startInput = Window_Message.prototype.startInput;
Window_Message.prototype.startInput = function() {
    if (this._choiceWindow.active) {
        return true;
    }
    return Alias.WiMe_startInput.call(this);
};

Window_Message.prototype.forceClear = function() {
    this._textState = null;
    this.close();
    this._goldWindow.close();
};

Window_Message.prototype.onShowFast = function() {
    this._showFast = true;
};


})();

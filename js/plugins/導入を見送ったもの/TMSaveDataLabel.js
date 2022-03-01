//=============================================================================
// TMVplugin - セーブデータラベル
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/07/29
//=============================================================================

/*:
 * @plugindesc セーブファイルウィンドウに変数の値を表示します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param labelAName
 * @desc ラベルＡの名前
 * 初期値: ラベルＡ
 * @default ラベルＡ
 *
 * @param labelAId
 * @desc ラベルＡのゲーム変数番号
 * 初期値: 10（ 0 で非表示 / 1 以上で表示）
 * @default 10
 *
 * @param labelBName
 * @desc ラベルＢの名前
 * 初期値: ラベルＢ
 * @default ラベルＢ
 *
 * @param labelBId
 * @desc ラベルＢのゲーム変数番号
 * 初期値: 0（ 0 で非表示 / 1 以上で表示）
 * @default 0
 *
 * @param labelNameWidth
 * @desc ラベル名の表示幅
 * 初期値: 160
 * @default 160
 *
 * @param labelValueWidth
 * @desc ラベル値の表示幅
 * 初期値: 96
 * @default 96
 *
 * @help
 * 使い方:
 *
 *   このプラグインを導入するとセーブファイルウィンドウの右上にゲーム変数の
 *   値を最大で２つまで表示することができるようになります。（以下ラベル）
 *
 *   プラグイン導入前に作成されたセーブデータは、再度セーブが実行されるまで
 *   ラベルは表示されません。
 */

var Imported = Imported || {};
Imported.TMSaveDataLabel = true;

(function() {

  var parameters = PluginManager.parameters('TMSaveDataLabel');
  var labelAName      =  parameters['labelAName'];
  var labelAId        = +parameters['labelAId'];
  var labelBName      =  parameters['labelBName'];
  var labelBId        = +parameters['labelBId'];
  var labelNameWidth  = +parameters['labelNameWidth'];
  var labelValueWidth = +parameters['labelValueWidth'];
  
  //-----------------------------------------------------------------------------
  // DataManager
  //
  
  var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function() {
    var info = _DataManager_makeSavefileInfo.call(this);
    info.labelA = labelAId ? $gameVariables.value(labelAId) : 0;
    info.labelB = labelBId ? $gameVariables.value(labelBId) : 0;
    return info;
  };

  //-----------------------------------------------------------------------------
  // Window_SavefileList
  //
  
  var _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
  Window_SavefileList.prototype.drawItem = function(index) {
    _Window_SavefileList_drawItem.call(this, index);
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id)
    var rect = this.itemRectForText(index);
    if (info && valid) {
      var lineHeight = this.lineHeight();
      var x = rect.width + this.textPadding() - labelValueWidth;
      if (labelAId && info.labelA !== undefined) {
        var y = rect.y;
        this.changeTextColor(this.normalColor());
        this.drawText(info.labelA, x, y, labelValueWidth, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText(labelAName, x - labelNameWidth, y, labelNameWidth);
      }
      if (labelBId && info.labelB !== undefined) {
        var y = rect.y + lineHeight * 1;
        this.changeTextColor(this.normalColor());
        this.drawText(info.labelB, x, y, labelValueWidth, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText(labelBName, x - labelNameWidth, y, labelNameWidth);
      }
    }
  };

})();

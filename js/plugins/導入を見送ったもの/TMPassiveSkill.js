//=============================================================================
// TMVplugin - パッシヴスキル
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.0
// 最終更新日: 2016/01/25
//=============================================================================

/*:
 * @plugindesc 使用せずとも常に効果が発動しつづけるスキルを追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param passiveCommands
 * @desc パッシヴスキルのスキルタイプ番号を半角数字で設定します。
 * 複数指定する場合は半角スペースで区切ってください。
 * @default 
 *
 * @help
 * スキルのメモ欄に <passive:50> のようなタグを使って設定します。
 * この例ではスキルを習得している間、５０番の武器を装備したときと
 * 同じ効果が得られます。
 *
 * 特徴の『スキル追加』ではパッシヴスキルの効果は適用されません。
 *
 * パッシヴスキルに必要武器が設定されている場合、該当するタイプの武器を
 * 装備している間だけパッシヴスキルの効果が適用されます。
 * 武器タイプ以外にもメモ欄タグを使ってＴＰやステートを効果適用の条件に
 * 指定することができます。
 *
 * メモ欄タグ（スキル）:
 *   <passive:50>     # ５０番の武器を効果とするパッシヴスキルになる
 *   <passiveTp:75>   # 残りＴＰが７５以上のときだけパッシヴ効果が適用される
 *   <passiveTp:-25>  # 残りＴＰが２５未満のときだけパッシヴ効果が適用される
 *   <passiveState:4> # ４番のステートが有効なときだけパッシヴ効果が適用される
 *
 * プラグインのパラメータ passiveCommands を設定すると、該当するスキルタイプは
 * バトル中に表示されなくなります。
 * パッシヴスキルのスキルタイプ番号を指定すれば、コマンドからパッシヴスキルを
 * 除外することができます。
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMPassiveSkill = true;

(function() {

  var parameters = PluginManager.parameters('TMPassiveSkill');
  var passiveCommands = parameters['passiveCommands'];
  passiveCommands = passiveCommands ? passiveCommands.split(' ') : [];

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function(paramId) {
    var value = _Game_Actor_paramPlus.call(this, paramId);
    var skills = this._skills;
    for (var i = 0; i < skills.length; i++) {
      var item = this.passiveWeapon($dataSkills[skills[i]]);
      if (item) {
        value += item.params[paramId];
      }
    }
    return value;
  };

  var _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
  Game_Actor.prototype.traitObjects = function() {
    var objects = _Game_Actor_traitObjects.call(this);
    var skills = this._skills;
    for (var i = 0; i < skills.length; i++) {
      var item = this.passiveWeapon($dataSkills[skills[i]]);
      if (item) {
        objects.push(item);
      }
    }
    return objects;
  };
  
  Game_Actor.prototype.passiveWeapon = function(skill) {
    if (skill.meta.passive && this.isSkillWtypeOk(skill) &&
        this.isPassiveSkillTpOk(skill) &&
        this.isPassiveSkillStateOk(skill)) {
      return $dataWeapons[Number(skill.meta.passive)];
    }
    return null;
  };

  Game_Actor.prototype.isPassiveSkillTpOk = function(skill) {
    if (skill.meta.passiveTp) {
      var n = Number(skill.meta.passiveTp);
      var tp = this.tp;
      if ((n > 0 && n > tp) || (n < 0 && -n <= tp)) {
        return false;
      }
    }
    return true;
  };
  
  Game_Actor.prototype.isPassiveSkillStateOk = function(skill) {
    if (skill.meta.passiveState &&
        !this.isStateAffected(Number(skill.meta.passiveState))) {
      return false;
    }
    return true;
  };
  
  Game_Actor.prototype.addedSkillTypes = function() {
    var skillTypes = Game_BattlerBase.prototype.addedSkillTypes.call(this);
    if ($gameParty.inBattle()) {
      for (var i = 0; i < skillTypes.length; i++) {
        for (var j = 0; j < passiveCommands.length; j++) {
          if (skillTypes[i] === Number(passiveCommands[j])) {
            skillTypes.splice(i--, 1);
          }
        }
      }
    }
    return skillTypes;
  };

})();

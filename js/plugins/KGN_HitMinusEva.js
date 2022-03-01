//=============================================================================
// KGN_HitMinusEva.js
//=============================================================================

var Imported = Imported || {};
Imported.KGN_HitMinusEva = true;

/*:
 * @plugindesc 最終的な命中率を「命中率 - 回避率」にします。
 * @author きぎぬ
 * 
 * @help 
 * シンプル。攻撃ミスは無くなり、命中しなかった場合は回避扱いになります。
 * (競合対策は)ないです。Game_Action.prototype.applyを直接書き換えます。

 * YEP_BattleEngineCoreを導入している場合、このプラグインはそれより上に配置を。
 * さもなくばダメージポップアップが無効化されたりします。

 * バグとか自分じゃ太刀打ちできないので、自力で、どうぞ。
 * 
 * HP： http://r3jou.web.fc2.com/

 */

(function() {

var Game_Action_prototype_apply = Game_Action.prototype.apply;//バックアップ
Game_Action.prototype.apply = function(target) {
	var result = target.result();
	this.subject().clearResult();
	result.clear();
	result.used = this.testApply(target);
	//result.missed = (result.used && Math.random() >= this.itemHit(target));//元の
	result.missed = false;//攻撃ミスは絶対にしない
	//result.evaded = (!result.missed && Math.random() < this.itemEva(target));//元の
	result.evaded = (result.used && Math.random() >= (this.itemHit(target) - this.itemEva(target)));//ここで命中-回避計算
	console.log('hit-eva ' + (this.itemHit(target) - this.itemEva(target)));//数字を見てみたい
	result.physical = this.isPhysical();
	result.drain = this.isDrain();
	if (result.isHit()) {
		if (this.item().damage.type > 0) {
			result.critical = (Math.random() < this.itemCri(target));
			var value = this.makeDamageValue(target, result.critical);
			this.executeDamage(target, value);
		}
		this.item().effects.forEach(function(effect) {
			this.applyItemEffect(target, effect);
		}, this);
		this.applyItemUserEffect(target);
	}
};

})();
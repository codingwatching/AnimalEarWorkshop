//=============================================================================
// InfoWindow.js
//=============================================================================

/*:
 * @plugindesc 情報表示ウィンドウをメニュー画面に追加するプラグイン
 * @author Me
 *
 * @help 情報表示ウィンドウをメニュー画面上に追加します。
 *
 */

(function() {

	var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        this.createInfoWindow();
        this._InfoWindow.y = this._commandWindow.height;
    }

    Scene_Menu.prototype.createInfoWindow = function() {
        this._InfoWindow = new Window_Info();
        this.addWindow(this._InfoWindow);
    };
    
    var _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        _Scene_Menu_update.call(this);
        this._InfoWindow.setText();
    };
	
	// ここからメニューウィンドウ作り始まります。
	function Window_Info() {
	    this.initialize.apply(this, arguments);
	}

	Window_Info.prototype = Object.create(Window_Base.prototype);
	Window_Info.prototype.constructor = Window_Info;
	Window_Info.prototype.initialize = function() {
		var x = 0;
		var y = 0;
	    var width = 240;
	    var height = 148;
	    Window_Base.prototype.initialize.call(this, x, y, width, height);
	};

	Window_Info.prototype.setText = function(str) {
		this._text = str;
		this.refresh();
	};
	
	// ウィンドウに載せる内容
	Window_Info.prototype.refresh = function() {
	    this.contents.clear();
		this.changeTextColor(this.textColor(2));
    // 性欲ゲージ
		this.drawText("性欲",1, 1);
		this.resetTextColor();
		this.drawGauge(90, 1, 110, $gameVariables.value(35) / 100, this.textColor(2), this.textColor(2));
		this.drawText($gameVariables.value(35),115,0,80,'right');
	//　淫乱度ゲージ
		this.changeTextColor(this.textColor(10));
		this.drawText("淫亂度",0,this.lineHeight() + 1);
		this.resetTextColor();
		this.drawGauge(90, this.lineHeight(), 110, $gameVariables.value(36) / 100, this.textColor(10), this.textColor(10));
		this.drawText($gameVariables.value(36), 115,this.lineHeight() + 1,80,'right');
	/* 尿意ゲージ
		this.changeTextColor(this.textColor(6));
		this.drawText("尿意",0,(this.lineHeight())*2 + 1);
		this.resetTextColor();
		this.drawGauge(90, (this.lineHeight())*2 + 1, 110, $gameVariables.value(37) / 100, this.textColor(6), this.textColor(6));
		this.drawText($gameVariables.value(37), 115,this.lineHeight() * 2 + 1,80,'right');
		*/
	};
	
	// フォントサイズ
	Window_Info.prototype.standardFontSize = function() {
    	return 28;
    };
	// ウィンドウの透明度
	Window_Info.prototype.standardBackOpacity = function() {
    	return 255;
	};
    // ウィンドウの余白
	Window_Info.prototype.standardPadding = function() {
    	return 18;
	};
	// ウィンドウの色調
	//Window_Info.prototype.updateTone = function() {
    //	this.setTone(64, 0, 128);
	//};
	
})();
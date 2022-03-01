//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//
// Version
// 1.0.0 2015/12/26 公開
// 1.1.0 2016/04/19 回想一覧にサムネイルを指定できるように対応
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------
    var rngd_recollection_mode_settings = {
        //---------------------------------------------------------------------
        // ★ 回想モードで再生するBGMの設定をします
        //---------------------------------------------------------------------
        "rec_mode_bgm": {
            "bgm": {
                "name"  : "6-1",
                "pan"   : 0,
                "pitch" : 100,
                "volume": 90
            }
        },
        //---------------------------------------------------------------------
        // ★ 回想CG選択ウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_mode_window" : {
            "x": 260,
            "y": 180,
            "recollection_title": "回想模式",
            "str_select_recollection": "觀看回想",
            "str_select_cg": "觀看CG",
            "str_select_back_title": "返回標題"
        },
        //---------------------------------------------------------------------
        // ★ 回想リストウィンドウの設定を指定します
        //---------------------------------------------------------------------
        "rec_list_window": {
            // 1画面に表示する縦の数
            "item_height": 3,
            // 1画面に表示する横の数
            "item_width" : 3,
            // 1枚のCGに説明テキストを表示するかどうか
            "show_title_text": true,
            // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
            "title_text_align": "center",
            // 閲覧したことのないCGの場合に表示するピクチャファイル名
            "never_watch_picture_name": "noimage_thumbnail",
            // 閲覧したことのないCGのタイトルテキスト
            "never_watch_title_text": "？？？"
        },
        //---------------------------------------------------------------------
        // ★ 回想用のCGを指定します
        //---------------------------------------------------------------------
        "rec_cg_set": {
            1: {
                "title": "初次手淫",
                "pictures": ["CG01_01", "CG01_02", "CG01_03", "CG01_04", "CG01_05", "CG01_06", "CG01_07", "CG01_08"],
                "common_event_id": 251,
                "switch_id": 203,
                "thumbnail": "ev011_thumbnail"
            },
            2: {
                "title": "漸漸習慣的手淫",
                "pictures": ["CG01_01","CG01_09", "CG01_10", "CG01_11", "CG01_12", "CG01_13", "CG01_14", "CG01_15",],
                "common_event_id": 252,
                "switch_id": 204,
                "thumbnail": "ev012_thumbnail"
            },
            3: {
                "title": "成了習慣的手淫",
                "pictures": ["CG01-5_01", "CG01-5_02", "CG01-5_03", "CG01-5_04", "CG01-5_05", "CG01-5_06", "CG01-5_07", "CG01-5_08"],
                "common_event_id": 254,
                "switch_id": 206,
                "thumbnail": "ev01-51_thumbnail"
            },
            4: {
                "title": "插入自慰",
                "pictures": ["CG01_01", "CG01_05", "CG01_16", "CG01_17", "CG01_18", "CG01_19", "CG01_20", "CG01_21"],
                "common_event_id": 253,
                "switch_id": 205,
                "thumbnail": "ev013_thumbnail"
            },
            5: {
                "title": "別墅揉胸",
                "pictures": ["CG02_01", "CG02_02", "CG02_03", "CG02_04", "CG02_05"],
                "common_event_id": 255,
                "switch_id": 207,
                "thumbnail": "ev021_thumbnail"
            },
            6: {
                "title": "別墅品玉",
                "pictures": ["CG02_01", "CG02_03", "CG02_04", "CG02_06", "CG02_07", "CG02_08"],
                "common_event_id": 256,
                "switch_id": 208,
                "thumbnail": "ev022_thumbnail"
            },
            7: {
                "title": "別墅乳交",
                "pictures": ["CG02_01", "CG02_04", "CG02_03", "CG02_07", "CG02_09", "CG02_10", "CG02_11"],
                "common_event_id": 257,
                "switch_id": 209,
                "thumbnail": "ev023_thumbnail"
            },
            8: {
                "title": "初次吹簫",
                "pictures": ["CG03_01", "CG03_02", "CG03_03", "CG03_04", "CG03_05"],
                "common_event_id": 258,
                "switch_id": 210,
                "thumbnail": "ev031_thumbnail"
            },
            9: {
                "title": "再度吹簫",
                "pictures": ["CG03_01", "CG03_02", "CG03_03", "CG03_04"],
                "common_event_id": 259,
                "switch_id": 211,
                "thumbnail": "ev032_thumbnail"
            },
            10: {
                "title": "精液採集吹簫",
                "pictures": ["CG03_06", "CG03_07", "CG03_08", "CG03_09", "CG03_10"],
                "common_event_id": 260,
                "switch_id": 212,
                "thumbnail": "ev033_thumbnail"
            },
            11: {
                "title": "淫亂口交",
                "pictures": [ "CG03_11", "CG03_07", "CG03_08", "CG03_09"],
                "common_event_id": 261,
                "switch_id": 213,
                "thumbnail": "ev034_thumbnail"
            },
            12: {
                "title": "獸人拘束凌辱",
                "pictures": ["CG04_01", "CG04_02", "CG04_03", "CG04_04", "CG04_05", "CG04_06", "CG04_07"],
                "common_event_id": 262,
                "switch_id": 214,
                "thumbnail": "ev041_thumbnail"
            },
            13: {
                "title": "獸人拘束淫亂凌辱",
                "pictures": ["CG04_08", "CG04_09", "CG04_10", "CG04_11", "CG04_12", "CG04_13", "CG04_14", "CG04_15", "CG04_16", "CG04_17"],
                "common_event_id": 263,
                "switch_id": 215,
                "thumbnail": "ev042_thumbnail"
            },
            14: {
                "title": "初次賣春顏射",
                "pictures": ["CG05_01", "CG05_02", "CG05_03", "CG05_04"],
                "common_event_id": 264,
                "switch_id": 216,
                "thumbnail": "ev051_thumbnail"
            },
            15: {
                "title": "賣春顏射",
                "pictures": ["CG05_05", "CG05_06", "CG05_07"],
                "common_event_id": 265,
                "switch_id": 217,
                "thumbnail": "ev052_thumbnail"
            },
            16: {
                "title": "別墅正常位",
                "pictures": ["CG06_01", "CG06_02", "CG06_03", "CG06_04", "CG06_05", "CG06_06", "CG06_07"],
                "common_event_id": 266,
                "switch_id": 218,
                "thumbnail": "ev061_thumbnail"
            },
            17: {
                "title": "別墅群交正常位",
                "pictures": ["CG06_01", "CG06_09", "CG06_05", "CG06_10", "CG06_04", "CG06_06", "CG06_07", "CG06_08", "CG06_11", "CG06_12", "CG06_13", "CG06_14", "CG06_15", "CG06_16", "CG06_17", "CG06_18", "CG06_19"],
                "common_event_id": 267,
                "switch_id": 219,
                "thumbnail": "ev062_thumbnail"
            },
            18: {
                "title": "受騙遭輪姦",
                "pictures": ["CG07_01", "CG07_10", "CG07_02", "CG07_03", "CG07_04", "CG07_05", "CG07_06", "CG07_07", "CG07_08", "CG07_09"],
                "common_event_id": 268,
                "switch_id": 220,
                "thumbnail": "ev071_thumbnail"
            },
            19: {
                "title": "精液採集輪姦",
                "pictures": ["CG07_01", "CG07_10", "CG07_02","CG07_11", "CG07_12", "CG07_05", "CG07_07", "CG07_13", "CG07_08", "CG07_14", "CG07_15", "CG07_16"],
                "common_event_id": 269,
                "switch_id": 221,
                "thumbnail": "ev072_thumbnail"
            },
            20: {
                "title": "淫亂輪姦",
                "pictures": ["CG07_17", "CG07_18", "CG07_04", "CG07_02", "CG07_05","CG07_13", "CG07_14", "CG07_19", "CG07_20", "CG07_21", "CG07_22"],
                "common_event_id": 270,
                "switch_id": 222,
                "thumbnail": "ev073_thumbnail"
            },
            21: {
                "title": "觸手愛撫",
                "pictures": ["CG08_01", "CG08_02", "CG08_03", "CG08_04", "CG08_05", "CG08_06", "CG08_07"],
                "common_event_id": 271,
                "switch_id": 223,
                "thumbnail": "ev081_thumbnail"
            },
            22: {
                "title": "觸手中出",
                "pictures": ["CG08_01", "CG08_02", "CG08_08", "CG08_09", "CG08_10", "CG08_11", "CG08_12", "CG08_13", "CG08_14"],
                "common_event_id": 272,
                "switch_id": 224,
                "thumbnail": "ev082_thumbnail"
            },
            23: {
                "title": "觸手淫亂",
                "pictures": ["CG08_15", "CG08_16", "CG08_17", "CG08_18", "CG08_19", "CG08_20"],
                "common_event_id": 273,
                "switch_id": 225,
                "thumbnail": "ev083_thumbnail"
            },
            24: {
                "title": "賣春後入",
                "pictures": ["CG09_01", "CG09_02", "CG09_03", "CG09_04", "CG09_05", "CG09_06", "CG09_07"],
                "common_event_id": 274,
                "switch_id": 226,
                "thumbnail": "ev091_thumbnail"
            },
            25: {
                "title": "三頭犬",
                "pictures": ["CG10_01", "CG10_02", "CG10_03", "CG10_04", "CG10_05"],
                "common_event_id": 275,
                "switch_id": 227,
                "thumbnail": "ev101_thumbnail"
            },
            26: {
                "title": "三頭犬淫亂",
                "pictures": ["CG10_06", "CG10_02", "CG10_07", "CG10_08", "CG10_09"],
                "common_event_id": 276,
                "switch_id": 228,
                "thumbnail": "ev102_thumbnail"
            },
            27: {
                "title": "賣春淫亂騎乘位",
                "pictures": ["CG11_01", "CG11_02", "CG11_03", "CG11_04", "CG11_05", "CG11_06", "CG11_07"],
                "common_event_id": 277,
                "switch_id": 229,
                "thumbnail": "ev111_thumbnail"
            },
            28: {
                "title": "淫亂亂交",
                "pictures": ["CG12_01", "CG12_02", "CG12_03", "CG12_04", "CG12_05", "CG12_06"],
                "common_event_id": 278,
                "switch_id": 230,
                "thumbnail": "ev121_thumbnail"
            },
            29: {
                "title": "蕾娜足交",
                "pictures": ["CG13_01", "CG13_02", "CG13_03", "CG13_04", "CG13_05"],
                "common_event_id": 279,
                "switch_id": 231,
                "thumbnail": "ev131_thumbnail"
            },
            30: {
                "title": "蕾娜亂交",
                "pictures": ["CG14_01", "CG14_02", "CG14_03", "CG14_04", "CG14_05", "CG14_06", "CG14_07", "CG14_08"],
                "common_event_id": 280,
                "switch_id": 232,
                "thumbnail": "ev141_thumbnail"
            },
            
        },
        //---------------------------------------------------------------------
        // ★ 回想時に一時的に利用するマップIDを指定します
        //---------------------------------------------------------------------
        // 通常は何もないマップを指定します
        //---------------------------------------------------------------------
        "sandbox_map_id": 223
    };

    function rngd_hash_size(obj) {
        var cnt = 0;
        for(var o in obj) {
            cnt++;
        }
        return cnt;
    }

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Scene_Recollection
    //=========================================================================
    // 回想用のシーン関数です
    //=========================================================================
    function Scene_Recollection() {
        this.initialize.apply(this, arguments);
    }

    Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
    Scene_Recollection.prototype.constructor = Scene_Recollection;

    Scene_Recollection.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Recollection.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createWindowLayer();
        this.createCommandWindow();
    };

    // 回想モードのカーソル
    Scene_Recollection.rec_list_index = 0;

    // 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
    Scene_Recollection.reload_rec_list = false;

    Scene_Recollection.prototype.createCommandWindow = function() {

        if(Scene_Recollection.reload_rec_list) {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));

            // リロードの場合：選択ウィンドウを非表示にする。通常はここがtrue
            this._rec_window.visible = false;
            this._rec_window.deactivate();
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);

            // リロードの場合：回想リストを表示にする。通常はここがfalse
            this._rec_list.visible = true;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._mode = "recollection";
            this._rec_list.activate();
            this._rec_list.select(Scene_Recollection.rec_list_index);

            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);

            Scene_Recollection.reload_rec_list = false;

        } else {
            // 回想モード選択ウィンドウ
            this._rec_window = new Window_RecollectionCommand();
            this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
            this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
            this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
            this.addWindow(this._rec_window);

            // 回想リスト
            this._rec_list = new Window_RecList(0, 0, Graphics.width, Graphics.height);
            this._rec_list.visible = false;
            this._rec_list.setHandler('ok', this.commandDoRecMode.bind(this));
            this._rec_list.setHandler('cancel', this.commandBackSelectMode.bind(this));
            this._rec_list.select(Scene_Recollection.rec_list_index);
            this.addWindow(this._rec_list);

            // CG参照用ダミーコマンド
            this._dummy_window = new Window_Command(0, 0);
            this._dummy_window.deactivate();
            this._dummy_window.visible = false;
            this._dummy_window.setHandler('ok', this.commandDummyOk.bind(this));
            this._dummy_window.setHandler('cancel', this.commandDummyCancel.bind(this));
            this._dummy_window.addCommand('next', 'ok');
            this.addWindow(this._dummy_window);
        }

    };

    //-------------------------------------------------------------------------
    // ● 開始処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        this._rec_window.refresh();
        this._rec_list.refresh();
        AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
        Scene_Recollection._rngd_recollection_doing = false;
    };

    //-------------------------------------------------------------------------
    // ● 更新処理
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.update = function() {
        Scene_Base.prototype.update.call(this);

    };

    //-------------------------------------------------------------------------
    // ● 「回想を見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowRecollection = function() {
        // モードウィンドウの無効化とリストウィンドウの有効化
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "recollection";
    };

    //-------------------------------------------------------------------------
    // ● 「CGを見る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandShowCg = function() {
        this.do_exchange_status_window(this._rec_window, this._rec_list);
        this._mode = "cg";
    };

    //-------------------------------------------------------------------------
    // ● 「タイトルに戻る」を選択した際のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackTitle = function() {
        Scene_Recollection.rec_list_index = 0;
        SceneManager.goto(Scene_Title);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandBackSelectMode = function() {
        this.do_exchange_status_window(this._rec_list, this._rec_window);
    };

    //-------------------------------------------------------------------------
    // ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.commandDoRecMode = function() {
        var target_index = this._rec_list.index() + 1;
        Scene_Recollection.rec_list_index = target_index - 1;

        if (this._rec_list.is_valid_picture(this._rec_list.index() + 1)) {
            // 回想モードの場合
            if (this._mode == "recollection") {
                Scene_Recollection._rngd_recollection_doing = true;

                DataManager.setupNewGame();
                $gamePlayer.setTransparent(255);
                this.fadeOutAll();
                // TODO: パーティを透明状態にする

                //$dataSystem.optTransparent = false;
                $gameTemp.reserveCommonEvent(rngd_recollection_mode_settings.rec_cg_set[target_index]["common_event_id"]);
                $gamePlayer.reserveTransfer(rngd_recollection_mode_settings.sandbox_map_id, 0, 0, 0);
                SceneManager.push(Scene_Map);

                // CGモードの場合
            } else if (this._mode == "cg") {
                this._cg_sprites = [];
                this._cg_sprites_index = 0;

                // シーン画像をロードする
                rngd_recollection_mode_settings.rec_cg_set[target_index].pictures.forEach(function (name) {
                    var sp = new Sprite();
                    sp.bitmap = ImageManager.loadPicture(name);
                    // 最初のSprite以外は見えないようにする
                    if (this._cg_sprites.length > 0) {
                        sp.visible = false;
                    }

                    // TODO: 画面サイズにあわせて、拡大・縮小すべき
                    this._cg_sprites.push(sp);
                    this.addChild(sp);

                }, this);

                this.do_exchange_status_window(this._rec_list, this._dummy_window);
                this._dummy_window.visible = false;
            }
        } else {
            this._rec_list.activate();
        }
    };

    Scene_Recollection.prototype.commandDummyOk = function() {

        if(this._cg_sprites_index < this._cg_sprites.length - 1) {
            this._cg_sprites[this._cg_sprites_index].visible = false;
            this._cg_sprites_index++;
            this._cg_sprites[this._cg_sprites_index].visible = true;

            this._dummy_window.activate();
        } else {
            this.commandDummyCancel();
        }
    };

    Scene_Recollection.prototype.commandDummyCancel = function() {
        this._cg_sprites.forEach(function(obj) {
            obj.visible = false;
            obj = null;
        });
        this.do_exchange_status_window(this._dummy_window, this._rec_list);
    };

    // コモンイベントから呼び出す関数
    Scene_Recollection.prototype.rngd_exit_scene = function() {
        if(Scene_Recollection._rngd_recollection_doing) {
            // Window_RecListを表示する
            Scene_Recollection.reload_rec_list = true;
            SceneManager.push(Scene_Recollection);
        }
    };

    //-------------------------------------------------------------------------
    // ● ウィンドウの無効化と有効化
    //-------------------------------------------------------------------------
    // win1: 無効化するウィンドウ
    // win2: 有効化するウィンドウ
    //-------------------------------------------------------------------------
    Scene_Recollection.prototype.do_exchange_status_window = function(win1, win2) {
        win1.deactivate();
        win1.visible = false;
        win2.activate();
        win2.visible = true;
    };

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

    //=========================================================================
    // ■ Window_RecollectionCommand
    //=========================================================================
    // 回想モードかCGモードを選択するウィンドウです
    //=========================================================================
    function Window_RecollectionCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
    Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

    Window_RecollectionCommand.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = rngd_recollection_mode_settings.rec_mode_window.x;
        this.y = rngd_recollection_mode_settings.rec_mode_window.y;

    };

    Window_RecollectionCommand.prototype.makeCommandList = function() {
        Window_Command.prototype.makeCommandList.call(this);
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_recollection, "select_recollection");
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_cg, "select_cg");
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.str_select_back_title, "select_back_title");
    };

    //=========================================================================
    // ■ Window_RecollectionList
    //=========================================================================
    // 回想またはCGを選択するウィンドウです
    //=========================================================================
    function Window_RecList() {
        this.initialize.apply(this, arguments);
    }

    Window_RecList.prototype = Object.create(Window_Selectable.prototype);
    Window_RecList.prototype.constructor = Window_RecList;

    //-------------------------------------------------------------------------
    // ● 初期化処理
    //-------------------------------------------------------------------------
    Window_RecList.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.windowWidth = width;
        this.windowHeight = height;
        this.select(0);
        this._formationMode = false;
        this.get_global_variables();
        this.refresh();

    };

    Window_RecList.prototype.maxItems = function() {
        return rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);
    };

    Window_RecList.prototype.itemHeight = function() {
        return (this.height - this.standardPadding()) / rngd_recollection_mode_settings.rec_list_window.item_height;
    };

    //Window_RecList.prototype.maxRows = function() {
    //    return rngd_recollection_mode_settings.rec_list_window.item_height;
    //};

    Window_RecList.prototype.maxCols = function() {
        return rngd_recollection_mode_settings.rec_list_window.item_width;
    };

    Window_RecList.prototype.maxPageRows = function() {
        var pageHeight = this.height;// - this.padding * 2;
        return Math.floor(pageHeight / this.itemHeight());
    };

    Window_RecList.prototype.drawItem = function(index) {
        // TODO: itemWidthにあわせたサイズに拡大・縮小する
        // 1番目のCGセットを取得
        var rec_cg = rngd_recollection_mode_settings.rec_cg_set[index+1];
        var rect = this.itemRect(index);
        var text_height = 0;
        if(rngd_recollection_mode_settings.rec_list_window.show_title_text) {
            if(this._global_variables["switches"][rec_cg.switch_id]) {
                this.contents.drawText(rec_cg.title, rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            } else {
                this.contents.drawText(rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
                    rect.x + 4, rect.y + 4, this.itemWidth(), 32,
                    rngd_recollection_mode_settings.rec_list_window.title_text_align);
            }
            text_height = 32;
        }

        // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
        if(this._global_variables["switches"][rec_cg.switch_id]) {

            var thumbnail_file_name = rec_cg.pictures[0];
            if(rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
                thumbnail_file_name = rec_cg.thumbnail;
            }

            this.drawRecollection(thumbnail_file_name, 0, 0,
                this.itemWidth() - 36, this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 +text_height);


        } else {
            this.drawRecollection(rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
                    0, 0 , this.itemWidth() - 36,
                    this.itemHeight() - 8 - text_height, rect.x + 16, rect.y + 4 + text_height);

        }

    };

    //-------------------------------------------------------------------------
    // ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.get_global_variables = function() {
        this._global_variables = {
            "switches": {}
        };
        var maxSaveFiles = DataManager.maxSavefiles();
        for(var i = 0; i < maxSaveFiles; i++) {
            if(DataManager.loadGame(i)) {
                var rec_cg_max = rngd_hash_size(rngd_recollection_mode_settings.rec_cg_set);

                for(var j = 0; j < rec_cg_max; j++) {
                    var cg = rngd_recollection_mode_settings.rec_cg_set[j+1];
                    if($gameSwitches._data[cg.switch_id]) {
                        this._global_variables["switches"][cg.switch_id] = true;
                    }
                }
            }
        }
    };
    //-------------------------------------------------------------------------
    // ● index番目に表示された回想orCGが有効かどうか判断する
    //-------------------------------------------------------------------------
    Window_RecList.prototype.is_valid_picture = function(index) {
        // CG情報の取得と対象スイッチの取得
        var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
        return ( this._global_variables["switches"][_rec_cg_obj.switch_id] == true);

    };


(function(){

//-----------------------------------------------------------------------------
// ◆ 組み込み関数Fix
//-----------------------------------------------------------------------------

    Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
        var bmp = ImageManager.loadPicture(bmp_name);

        var _width = width;
        var _height = height;
        if(_width > bmp.width) {
            _width = bmp.width - 1;
        }

        if(_height > bmp.height) {
            _height = bmp.height - 1;
        }
        this.contents.blt(bmp, x, y, _width, _height, dx, dy);
    };

    var Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function() {
        Window_TitleCommand_makeCommandList.call(this);
        this.clearCommandList();
        this.addCommand(TextManager.newGame,   'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(rngd_recollection_mode_settings.rec_mode_window.recollection_title, 'recollection');
        this.addCommand(TextManager.options,   'options');
    };

    Scene_Title.prototype.commandRecollection = function() {
        SceneManager.push(Scene_Recollection);
    };

    var Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('recollection', this.commandRecollection.bind(this));
    };

})();
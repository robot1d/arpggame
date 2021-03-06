module faction {

    export class FactionTripPanel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _middleRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;
        private _frameRender: FrameUIRender;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public dispose() {
            this._bgRender.dispose();
            this._bgRender = null;
            this._middleRender.dispose();
            this._middleRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.bossChar) {
                this.bossChar.destory();
                this.bossChar = null;
            }
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
        }

        public setUIAtlas($uiatlas: UIAtlas, $winMidRender: UIRenderComponent): void {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._middleRender = new UIRenderComponent();
            this._middleRender.uiAtlas = $uiatlas;
            this.addRender(this._middleRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);

            this.initUI();
        }
        private midAry: Array<UICompenent>;
        private hallLevLab: UICompenent;
        private hallAttLab: UICompenent;
        private tripNumLab: UICompenent;
        private tripBossLab: UICompenent;
        private tripTimeLab: UICompenent;

        private stAry: Array<UICompenent>;

        private tripMap: UICompenent;
        private tripMapBtn: UICompenent;
        private tripZl: UICompenent;
        private myTrip: UICompenent;

        private dayRewardAry: Array<UICompenent>;
        private dayRewardLabAry: Array<UICompenent>;

        private maxIcon: UICompenent;
        private maxName: UICompenent;
        private maxTrip: UICompenent;
        private maxZl: UICompenent;

        private frameLineAry: Array<FrameCompenent>;

        private dayRewardGetAry: Array<UICompenent>;

        private _challengBtn: UICompenent;
        private _sweepBtn: UICompenent;
        private _sweepLab: FrameCompenent;

        private initUI(): void {

            //this.midAry = this.addUIList(["t_wj_bg3", "t_wj_bg4", "t_bg_b"], this._winMidRender);
            this.midAry = new Array;
            this.midAry.push(this._winMidRender.getComponent("t_wj_bg3"));
            this.midAry.push(this._winMidRender.getComponent("t_wj_bg4"));
            this.midAry.push(this._winMidRender.getComponent("t_bg_b"));

            this.addUIList(["t_wj_bg8", "t_wj_bg81", "t_wj_bg1", "t_wj_bg5", "t_wj_bg7", "t_wj_bg6", "t_wj_bg71"], this._bgRender);
            this.addUIList(["t_hua1", "t_hua2", "t_hua3", "t_hua4", "t_hua5", "t_hua6"], this._middleRender);
            this.addUIList(["t_wj_tz"], this._baseRender);

            this._sweepLab = <FrameCompenent>this.addChild(this._baseRender.getComponent("t_wj_sd"));
            this._sweepLab.goToAndStop(0);

            this._challengBtn = this._middleRender.getComponent("t_wj_bg2");
            this.addChild(this._challengBtn);
            this._challengBtn.addEventListener(InteractiveEvent.Up, this.challenge, this);

            this._sweepBtn = this._middleRender.getComponent("t_wj_bg21");
            this.addChild(this._sweepBtn);
            this._sweepBtn.addEventListener(InteractiveEvent.Up, this.sweep, this);

            var ui: UICompenent
            ui = this._baseRender.getComponent("t_wj_lab6");
            this.addChild(ui);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "关卡信息", 14, TextAlign.CENTER, ColorType.colorb96d49);

            ui = this._baseRender.getComponent("t_wj_lab7");
            this.addChild(ui);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "首通奖励", 14, TextAlign.CENTER, ColorType.colorb96d49);


            this.hallLevLab = this._baseRender.getComponent("t_wj_lab1");
            this.addChild(this.hallLevLab);
            this.hallAttLab = this._baseRender.getComponent("t_wj_lab5");
            this.addChild(this.hallAttLab);
            this.tripNumLab = this._baseRender.getComponent("t_wj_lab2");
            this.addChild(this.tripNumLab);
            this.tripBossLab = this._baseRender.getComponent("t_wj_lab3");
            this.addChild(this.tripBossLab);
            this.tripTimeLab = this._baseRender.getComponent("t_wj_lab4");
            this.addChild(this.tripTimeLab);

            this.stAry = new Array;
            for (var i: number = 0; i < 3; i++) {
                ui = this._baseRender.getComponent("t_f_icon" + i);
                this.addChild(ui);
                this.stAry.push(ui);
            }

            this.tripMap = this._baseRender.getComponent("t_wj_lab8");
            this.addChild(this.tripMap);
            this.tripMapBtn = this._baseRender.getComponent("t_wj_lab9");
            this.addChild(this.tripMapBtn);
            this.tripZl = this._baseRender.getComponent("t_wj_lab10");
            this.addChild(this.tripZl);
            this.myTrip = this._baseRender.getComponent("t_wj_lab11");
            this.addChild(this.myTrip);

            this.dayRewardAry = new Array;
            for (var i: number = 0; i < 5; i++) {
                ui = this._baseRender.getComponent("t_a_icon" + i);
                this.addChild(ui);
                ui.data = -1;
                this.dayRewardAry.push(ui);
            }

            this.maxIcon = this._baseRender.getComponent("t_m_icon");
            this.addChild(this.maxIcon);
            this.maxName = this._baseRender.getComponent("t_wj_max1");
            this.addChild(this.maxName);
            this.maxTrip = this._baseRender.getComponent("t_wj_max2");
            this.addChild(this.maxTrip);
            this.maxZl = this._baseRender.getComponent("t_wj_max3");
            this.addChild(this.maxZl);

            this.frameLineAry = new Array;
            for (var i: number = 0; i < 4; i++) {
                var frame: FrameCompenent = <FrameCompenent>this._baseRender.getComponent("t_wj_line" + i);
                this.addChild(frame);
                this.frameLineAry.push(frame);
                frame.goToAndStop(1);
            }

            var numAry: Array<number> = [5, 10, 15, 20, 30];

            this.dayRewardLabAry = new Array;
            for (var i: number = 0; i < 5; i++) {
                ui = this._baseRender.getComponent("t_a_l" + i);
                this.addChild(ui);
                this.dayRewardLabAry.push(ui);
            }
            this.dayRewardGetAry = new Array;
            for (var i: number = 0; i < 5; i++) {
                ui = this._topRender.getComponent("t_wj_chuo" + i);
                //this.addChild(ui);
                this.dayRewardGetAry.push(ui);
            }

            this.addBossChar();

            this.drawMax();
            this.drawTripLel();
            this.drawTripBase();

            this.buildFram();


        }

        public maxChg(): void {
            this.drawMax();
            this.drawDayReward();
            this.playEff();
        }

        public onAdd(): void {
            if (this._baseUiAtlas) {
                this.refreshUI();
            }
        }

        public refreshUI() {
            this.drawMax();
            this.drawTripLel();
            this.drawTripBase();
            this.drawDayReward();
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            for (var i: number = 0; i < this.midAry.length; i++) {
                this.addChild(this.midAry[i]);
            }
            this.playEff();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            for (var i: number = 0; i < this.midAry.length; i++) {
                this.removeChild(this.midAry[i]);
            }
        }



        public challenge($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_TOWER_CHALLENGE, 0, 0, "", "");
        }

        public sweep($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (GuidData.player.getFactionTripSweep()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "今天已经扫荡过了，请明天再来", 99);
            } else {
                if (this.currentTripLev > 1) {
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_TOWER_SWEEP, 0, 0, "", "");
                }else{
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "至少通过第一关，才可扫荡", 99);
                }
            }

        }

        private effAry: Array<FrameTipCompenent>;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, ($ary: any) => {
                    this.effAry = $ary;
                    for (var i: number = 0; i < this.effAry.length; i++) {
                        this.effAry[i].x = this.dayRewardAry[i].x - 30
                        this.effAry[i].y = this.dayRewardAry[i].y - 30
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                }, this.dayRewardAry.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this.dayRewardAry.length; i++) {
                if (i < this.rewardFlagAry.length && !this.rewardFlagAry[i] && this.hallData.chest_floor[i] <= this.maxTripObj.floor) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                } else {
                    this.removeChild(this.effAry[i]);
                }
            }
        }

        public getReward($e: InteractiveEvent): void {
            var idx: number = this.dayRewardAry.indexOf($e.target);
            if (this.rewardFlagAry[idx]) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "该奖励已领取！", 99);
                return;
            }
            idx++;
            NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_TOWER_CHEST, idx, 0, "", "");
        }

        private bossChar: MonsterUIChar;
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this._bgRender.addModel(this.bossChar);
            this.resize();
        }


        private hallLev: number = -1;//当前大厅等级
        private currentTripLev: number = -1;//当前层数
        private allTripNum: number = -1;//所有通关人数
        private hallData: any;
        private drawTripBase(): void {
            var vo: tb.TB_faction_building = FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_EVENT);
            var hallObj: any = TableData.getInstance().getData(TableData.tb_faction_tower_base, vo.level);

            if (vo.level != this.hallLev) {
                this.hallLev = vo.level;
                this.hallData = hallObj;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.hallLevLab.skinName, ColorType.Brown7a2f21 + "活动大厅加成:" + ColorType.Green2ca937 + this.hallLev + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.hallAttLab.skinName, ColorType.Brown7a2f21 + "属性:" + ColorType.Green2ca937 + hallObj.building_buff_des, 14, TextAlign.LEFT);
                this.drawDayReward();
                this.drawDayLabReward();
            }

            var ftripNum: number = GuidData.faction.getTripNum(this.currentTripLev);
            if (ftripNum != this.allTripNum) {
                this.allTripNum = ftripNum;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripNumLab.skinName, ColorType.Brown7a2f21 + "本关通关人数:" + ColorType.Green2ca937 + this.allTripNum, 14, TextAlign.LEFT);

                if (this.allTripNum > 0) {
                    var buffID: number;
                    if (hallObj.enemy_weaken_buffeffect_id.length <= this.allTripNum) {
                        buffID = hallObj.enemy_weaken_buffeffect_id[hallObj.enemy_weaken_buffeffect_id.length - 1];
                    } else {
                        buffID = hallObj.enemy_weaken_buffeffect_id[this.allTripNum];
                    }
                    var buffObj: any = TableData.getInstance().getData(TableData.tb_buff_effect, buffID);
                    if (buffObj) {
                        LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripBossLab.skinName, ColorType.Brown7a2f21 + "本关怪物属性:" + ColorType.Green2ca937 + buffObj.value + "%", 14, TextAlign.LEFT);
                    } else {
                        LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripBossLab.skinName, ColorType.Brown7a2f21 + "本关怪物属性:" + ColorType.Green2ca937 + "-0%", 14, TextAlign.LEFT);
                    }

                } else {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripBossLab.skinName, ColorType.Brown7a2f21 + "本关怪物属性:" + ColorType.Green2ca937 + "-0%", 14, TextAlign.LEFT);
                }

            }

        }

        private drawTripLel(): void {
            var ptrip: number = GuidData.player.getFactionTripLev() + 1;
            if (ptrip > TableData.getInstance().getTabMaxID(TableData.tb_faction_tower_floor)) {
                ptrip = GuidData.player.getFactionTripLev();
            }
            if (ptrip != this.currentTripLev) {
                this.currentTripLev = ptrip;
                var tripLevObj: any = TableData.getInstance().getData(TableData.tb_faction_tower_floor, this.currentTripLev);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripTimeLab.skinName, ColorType.Brown7a2f21 + "本关限时:" + ColorType.Green2ca937 + TimeUtil.getLocalTime4(tripLevObj.time_limit), 14, TextAlign.LEFT);
                this.drawShouTongReward(tripLevObj.firstpass_reward);
                this.drawGuanka(this.currentTripLev, tripLevObj);

                var $tb_creature_template: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(tripLevObj.entry)
                this.bossChar.setAvatar($tb_creature_template.avatar);
            }
        }

        private drawShouTongReward($ary: Array<Array<number>>): void {
            for (var i: number = 0; i < this.stAry.length; i++) {
                var itemObj: Array<number> = $ary[i];
                if (itemObj) {
                    IconManager.getInstance().drawItemIcon60(this.stAry[i], itemObj[0], itemObj[1]);
                } else {
                    UiDraw.clearUI(this.stAry[i]);
                    // IconManager.getInstance().drawItemIcon60(this.stAry[i], 0, 0);
                }

            }
        }

        private drawGuanka($tripLev: number, $tripObj: any): void {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripMap.skinName, $tripObj.name, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.tripMapBtn.skinName, $tripObj.name, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            UiDraw.drawTxtLab(this.tripZl, ColorType.Brown7a2f21 + "推荐战力:" + ColorType.colorcd2000 + $tripObj.advisepoint, 14, TextAlign.CENTER);
            UiDraw.drawTxtLab(this.myTrip, ColorType.Brown7a2f21 + "我的通关记录:" + ColorType.colorcd2000 + ($tripLev - 1), 14, TextAlign.CENTER);
        }
        private canGetState: Array<any> = [-1, -1, -1, -1, -1, -1];
        private rewardFlagAry: Array<boolean>;
        private drawDayReward(): void {

            if (GuidData.player.getFactionTripSweep()) {
                this._sweepLab.goToAndStop(1);
            } else {
                this._sweepLab.goToAndStop(0);
            }

            var maxfloor: number = this.maxTripObj.floor;
            for (var i: number = 0; i < this.dayRewardAry.length; i++) {
                var cur: number = this.hallData.chest_floor[i];

                var canGet: boolean = (cur <= maxfloor);
                if (this.canGetState[i] != canGet) {
                    IconManager.getInstance().drawItemIcon60(this.dayRewardAry[i], this.hallData.chest_itemId[i], 1, !canGet);
                    this.canGetState[i] = canGet;
                    if (canGet) {
                        this.dayRewardAry[i].addEventListener(InteractiveEvent.Up, this.getReward, this);
                    }
                }


                if (i > 0) {
                    if (canGet) {
                        this.frameLineAry[i - 1].goToAndStop(0);
                    } else {
                        this.frameLineAry[i - 1].goToAndStop(1);
                    }
                }

            }

            this.rewardFlagAry = GuidData.player.getFactionTripReward();
            for (var i: number = 0; i < this.dayRewardGetAry.length; i++) {
                if (this.rewardFlagAry[i]) {
                    if (!this.dayRewardGetAry[i].parent) {
                        this.addChild(this.dayRewardGetAry[i]);
                    }
                } else {
                    if (this.dayRewardGetAry[i].parent) {
                        this.removeChild(this.dayRewardGetAry[i]);
                    }
                }
            }

        }
        private drawDayLabReward(): void {
            for (var i: number = 0; i < this.dayRewardLabAry.length; i++) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.dayRewardLabAry[i].skinName, this.hallData.chest_floor[i] + "关奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        }
        private maxTripObj: any = new Object;
        private drawMax(): void {
            var obj: any = GuidData.faction.getMaxTripRole();
            if (this.maxTripObj.icon != obj.icon) {
                IconManager.getInstance().drawCircleIcon(this.maxIcon, 3, obj.icon);
            }

            if (this.maxTripObj.name != obj.name) {
                var nameStr: string = obj.name;
                if (nameStr == "") {
                    nameStr = "无";
                }
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.maxName.skinName, ColorType.Brown7a2f21 + getBaseName(nameStr), 16, TextAlign.LEFT);
            }

            if (this.maxTripObj.floor != obj.floor) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.maxTrip.skinName, ColorType.Brown7a2f21 + "通关记录:" + ColorType.color9a683f + obj.floor, 16, TextAlign.LEFT);
            }

            if (this.maxTripObj.force != obj.force) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.maxZl.skinName, ColorType.Brown7a2f21 + "通关战力:" + ColorType.color9a683f + obj.force, 16, TextAlign.LEFT);
            }

            this.maxTripObj = obj;

        }

        public drawRewardGet(): void {

        }

        public resize(): void {
            super.resize();
            if (this.bossChar) {

                this.bossChar.scale = 1.5 * UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = -30 * UIData.Scale;
                this.bossChar.resize();
            }

        }




    }
}
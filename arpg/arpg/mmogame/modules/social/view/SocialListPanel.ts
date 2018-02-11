﻿module social {

    export class SocialListPanel extends SList {
        public constructor($lastcompenent: UIConatiner) {
            super();
            this.left = 56;
            this.top = 123;
        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            // SocialItemRender.last_Uicontainer = this._lastcompenent;
            this.initData();
        }

        private initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            this.setData(ary, SocialItemRender, 802, 307, 0, 90, 3, 256, 1024, 1, 6);
        }

        /**
         * refreshData
         */
        public type: number;
        public refreshDataByNewData($index: number = 0, $type: number): void {
            this.type = $type;
            var $ary: Array<SocialItemData>;
            if ($type == 0) {
                $ary = GuidData.social.getFriendList();
            } else {
                $ary = GuidData.social.getEnemyList();
            }
            var $sListItemData = this.getData($ary, $index, $type);

            this.refreshData($sListItemData);
        }

        public getData($ary: Array<SocialItemData>, $index: number, $type: number): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var $data: SocialgivingData = new SocialgivingData();
                $data.socialItemData = $ary[i];
                $data.type = $type;
                $data.items = this.getItemsAry($ary[i], $type);

                var item: SListItemData = new SListItemData;
                if ($index == i) {
                    item.selected = true;
                }
                item.data = $data;
                item.id = i;
                ary.push(item);
            }
            //console.log("===$sListItemData===", $ary, $index, $type, ary);
            return ary;
        }

        /**
             * 0查看信息
             * 1邀请入家族
             * 2申请入队
             * 3邀请入队
             * 4赠送物品
             * 5删除好友
             * 6屏蔽消息
             * 7申请好友
             * 8密聊
             * 9职务任命
             * 10踢出家族
             * 11复制
             */
        private getItemsAry($data: SocialItemData, $type: number): Array<number> {
            var itemsary: Array<number> = new Array<number>();
            itemsary.push(0);
            if ($type == 0) {
                //对方无家族。自己有家族
                if ($data.faction == "" && GuidData.faction) {
                    itemsary.push(1);
                }
                itemsary.push(5);
            } else {
                itemsary.push(6);
            }
            return itemsary;
        }

        public show($type: number): void {
            UIManager.getInstance().addUIContainer(this);
            this.refreshDataByNewData(0, $type);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }

    export class SocialItemRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private bg: UICompenent;
        private icon: UICompenent;
        private name: UICompenent;
        private I_vip: UICompenent;
        private fam: UICompenent;
        private I_force: UICompenent;
        private chat: UICompenent;
        private tip: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "I_bg", 0, 0, 802, 86, 10, 10);
            $container.addChild(this.bg);

            this.icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_icon", 18, 9, 68, 68);
            $container.addChild(this.icon);

            this.name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_name", 101, 32, 115, 20);
            $container.addChild(this.name);

            this.I_vip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_vip", 218, 36, 29, 14);
            $container.addChild(this.I_vip);

            this.fam = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_fam", 305, 32, 121, 22);
            $container.addChild(this.fam);

            this.I_force = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_force", 469, 32, 100, 22);
            $container.addChild(this.I_force);

            this.chat = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_chat", 636, 21, 72, 46);
            $container.addChild(this.chat);

            this.tip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_tip", 716, 21, 72, 46);
            $container.addChild(this.tip);

            this.icon.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.chat.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.tip.addEventListener(InteractiveEvent.Up, this.butClik, this);

        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.bg.skinName, UIData.publicUi, PuiData.Slist_nselect);
                this.setIcon($data);

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.name.skinName, getBaseName($data.data.socialItemData.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.uiAtlas.upDataPicToTexture(getVipIconUrl($data.data.socialItemData.vip), this.I_vip.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.fam.skinName, $data.data.socialItemData.faction == "" ? "暂无家族" : getBaseName($data.data.socialItemData.faction), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I_force.skinName, Snum($data.data.socialItemData.force), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

                if ($data.data.type == 0) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.chat.skinName, "chat");
                } else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.chat.skinName, "revenge");
                }
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.tip.skinName, "detailed");
            } else {
                this.setnull();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.bg);
            UiDraw.clearUI(this.icon);
            UiDraw.clearUI(this.name);
            UiDraw.clearUI(this.I_vip);
            UiDraw.clearUI(this.fam);
            UiDraw.clearUI(this.I_force);
            UiDraw.clearUI(this.chat);
            UiDraw.clearUI(this.tip);
        }

        private setIcon($obj: SListItemData): void {
            IconManager.getInstance().getIcon(getTouPic($obj.data.socialItemData.gender),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    //绘制底色
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //绘制头像
                    ctx.drawImage($img, 0, 0, 82, 82, 3, 3, 62, 62);
                    //选中高亮绘制
                    if ($obj.selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHR_C_66, new Rectangle(1, 1, 66, 66), UIData.publicUi);
                    }

                    if (!$obj.data.socialItemData.inOnline) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight))
                    }

                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(15, 50, 53, 18), UIData.publicUi);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String($obj.data.socialItemData.level), 14, 42, 50, TextAlign.CENTER);

                    // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($obj.data.socialItemData.level), 16, 66, 45, TextAlign.RIGHT, ColorType.Brown7a2f21);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private showPop(evt: InteractiveEvent): void {
            //console.log("---weizhi---", this.chat.parent.x / UIData.Scale + this.chat.x, this.chat.parent.y / UIData.Scale + this.chat.y);
            PopMenuUtil.show(this.itdata, (value: number) => { this.popBackFun(value) }, this.chat.parent.x / UIData.Scale + this.chat.x, this.chat.parent.y / UIData.Scale + this.chat.y)
            // PopMenuUtil.show(this.itdata, (value: number) => { this.popBackFun(value) },1200,200)

            //选中，事件派发
            // var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDSELECTED_EVENT);
            // $evt.index = this.itdata.id;
            // ModuleEventManager.dispatchEvent($evt);
        }

        private popBackFun(value: number): void {
            if (this.itdata && this.itdata.data) {
                if (value == 0) {
                    // //console.log("查看信息");
                    NetManager.getInstance().protocolos.get_player_overview(this.itdata.data.socialItemData.guid);
                } else if (value == 5) {
                    //删除好友
                    // //console.log("删除好友");
                    this.delFriend(this.itdata.data.socialItemData.guid);
                } else if (value == 1) {
                    //邀请入家族
                    NetManager.getInstance().protocolos.send_faction_invite(this.itdata.data.socialItemData.guid);
                } else if (value == 6) {
                    //删除仇人
                    NetManager.getInstance().protocolos.social_remove_enemy(this.itdata.data.socialItemData.guid);
                }
            }
        }

        public delFriend($guid: string): void {
            var frilist: Array<SocialItemData> = GuidData.social.getFriendList();
            if (frilist.length) {
                NetManager.getInstance().protocolos.social_del_friend($guid);
            }
        }

        public butClik(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                switch (evt.target) {
                    case this.tip:
                    case this.icon:
                        this.showPop(evt);
                        // if (this.itdata.data.type == 0) {

                        //     // //console.log(" 详情");
                        // } else {
                        //     //复仇tab 删除

                        //     // //console.log(" 删除");
                        // }
                        break
                    case this.chat:
                        if (this.itdata.data.type == 0) {
                            //打开私聊界面
                            ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON, this.itdata.data.socialItemData.guid);
                            break;
                        } else {
                            //复仇tab 查看详细界面
                            if (GuidData.player.getSocial_revenge_num() > 0) {
                                var a: SocialgivingData = this.itdata.data
                                NetManager.getInstance().protocolos.social_revenge_enemy(a.socialItemData.guid);
                                NetManager.getInstance().protocolos.change_battle_mode(SharedDef.FAMILY_MODE);
                                ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.HIDE_SOCIAL_EVENT));
                            } else {
                                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "剩余次数不足", 99);
                            }
                        }
                        break

                    default:
                        break;
                }
            }
        }
    }
}
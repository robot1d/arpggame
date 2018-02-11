declare class SDKUTIL {
    public static Pay(obj: any, fun: any);
    public static CreateRole(obj:any, fun: any);
}

declare class G2sdkClient {
    public static pay(obj: any);
    public static setCallback(obj: any, fun: any);
    public static events: any;
    public static consts: any;
}
class GamePay {

    private static payInfo: any;
    public static pay(rmb: number, yb: number, goodName: string = ""): void {
        var obj: any = new Object;
        obj.appid = 283;//APPID,不填默认为SDKUTIL.APPID，
        obj.goodsname = goodName;//物品名称
        obj.orderid = this.uuid();//CP的订单ID
        obj.money = String(rmb);//购买物品总金额（元）,保留两位小数
        obj.goodsnum = yb;//购买物品的数量，如100金币则填100
        obj.serverid = GameData.mergeServerMsgVo.sid;
        obj.rolename = GuidData.player.getBaseName();
        obj.ext = GameData.mergeServerMsgVo.platformid + "_" + GameData.mergeServerMsgVo.sid;//扩展字符串，支付成功后会原封不动的传递回去
        this.payInfo = obj;
        NetManager.getInstance().protocolos.booking_money(obj.orderid, obj.goodsname, obj.money, obj.goodsnum);
    }

    public static applyPay($oderID: string): void {
        if (this.payInfo.orderid = $oderID) {
            this.pay5wan(this.payInfo);
            //this.payG2(this.payInfo);
            //this.testPost();
            //console.log(this.payInfo);
        }
    }

    public static pay5wan(obj: any): void {

        SDKUTIL.Pay(obj, (success: boolean, payid: string) => {
            console.log("支付结果:", success, payid);
        })

    }

    public static payG2(obj: any): void {
        G2sdkClient.setCallback(G2sdkClient.events.PAY, function (res) {
            if (res.status == G2sdkClient.consts.CALLBACK_SUC) {
                console.log("支付成功:");
            } else {

            }
        });
        var orderInfo = {
            serverId: GameData.mergeServerMsgVo.sid,
            serverName: "挂机一服",
            cpOrderId: obj.orderid,
            productName: obj.goodsname,
            productId: "1",
            productDesc: "元宝",
            amount: 1,
            extend: obj.ext,
            time: String(GameInstance.getServerNow()),
            sign: "FK"
        };
        G2sdkClient.pay(orderInfo);
    }

    public static testPost(): void {
        var _xhr: XMLHttpRequest = new XMLHttpRequest();

        var obj: any = new Object;
        obj.payid = this.uuid();
        obj.orderid = this.payInfo.orderid;
        obj.ext = GameData.mergeServerMsgVo.platformid + "_" + GameData.mergeServerMsgVo.sid;
        obj.paytime = String(GameInstance.getServerNow());
        obj.goodsname = this.payInfo.goodsname;
        obj.money = this.payInfo.money;
        obj.goodsnum = this.payInfo.goodsnum;

        var keyAry: Array<string> = [];
        for (var key in obj) {
            keyAry.push(key);
        }

        keyAry.sort();

        var str2: string = ""
        for (var i: number = 0; i < keyAry.length; i++) {
            str2 += keyAry[i] + "=" + obj[keyAry[i]];
            if (i < keyAry.length - 1) {
                str2 += "&";
            }
        }
        var sign: string// = hex_md5(str2 + "WpIMeEXaV275ADSXQtDU");
        console.log(sign);

        var str: string = str2 + "&sign=" + sign;

        //_xhr.open("POST", "http://14.17.112.99:30080/cow_config/app_addr/payed", true);
        //_xhr.open("POST", "http://118.126.100.14:30080/cow_config/app_addr/payed", true);
        //_xhr.open("POST", "http://192.168.88.5:30080/cow_config/app_addr/payed", true);

        _xhr.send(str);
    }

    public static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
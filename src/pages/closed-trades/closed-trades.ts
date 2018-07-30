import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvidersProvider } from '../../providers/providers/providers';
import { TradePage } from '../trade/trade';

@Component({
  selector: 'page-closed-trades',
  templateUrl: 'closed-trades.html',
})
export class ClosedTradesPage {

  equityClosedTrades : any;
  cryptoClosedTrades : any;
  equityCount: number;
  cryptoCount: number;
  totalCount: number;
  totalProfitable : number;
  equityProfitable: number;
  cryptoProfitable: number;
  equityProfit: number;
  cryptoProfit: number;
  totalProfit: number;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider : ProvidersProvider) {
  }

  ngOnInit(){
    this.getTrades();
    }

  async getTrades(){
    const response =  await this.provider.getClosedEquityTrades().toPromise();
    const response1 = await this.provider.getClosedCryptoTrades().toPromise();
    this.equityClosedTrades = response;
    this.cryptoClosedTrades = response1;
    await this.getStats(response, response1);
    this.equityClosedTrades = await this.equityClosedTrades.sort(this.compare);
    this.cryptoClosedTrades = await this.cryptoClosedTrades.sort(this.compare)
  }


  getStats(data, data1){
    var count = 0;
    var count1 = 0;
    var tradesProfitable = 0
    var tradesProfitable1 = 0;
    var tradesProfit = 0;
    var tradesProfit1 = 0;
      for(let trade of data){
        count++;
        tradesProfit += (((trade.percentChange/100) * trade.signalBuyPrice)*trade.amount);
        if(trade.percentChange >= 0){
          tradesProfitable++;
        }
      }
      for(let trade of data1){
        count1++;
        tradesProfit1 += (((trade.percentChange/100) * trade.signalBuyPrice)*trade.amount);
        if(trade.percentChange >= 0){
          tradesProfitable1++;
        }
      }
        this.equityCount = count;
        this.cryptoCount = count1; 
        this.totalCount = count + count1;
        this.equityProfitable = Math.round(((tradesProfitable/count) * 100) * 10)/10;
        this.cryptoProfitable = Math.round(((tradesProfitable1/count1) * 100) * 10)/10;
        this.totalProfitable = Math.round(((tradesProfitable + tradesProfitable1)/(count + count1)*100)*10)/10;
        this.equityProfit = +(tradesProfit.toFixed(2));
        this.cryptoProfit = +(tradesProfit1.toFixed(2));
        this.totalProfit = +((tradesProfit + tradesProfit1).toFixed(2));
      }

  compare(a,b){
    const tradeA = a.id;
    const tradeB = b.id;
    let comparison = 0;
    if (tradeA > tradeB) {
      comparison = 1;
    } else if (tradeA < tradeB) {
      comparison = -1;
    }
    return comparison * -1;
  }  

  closedTradeTapped($event, closedTrade){
  this.navCtrl.push(TradePage, closedTrade);
}
}

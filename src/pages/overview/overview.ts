import { Chart } from 'chart.js';
import { NavController } from 'ionic-angular';
import { ProvidersProvider } from '../../providers/providers/providers';
import { StatisticsPage } from '../statistics/statistics';
import { Component, ViewChild } from '@angular/core';
import { ClosedTradesPage } from '../closed-trades/closed-trades';
import { OpenTradesPage } from '../open-trades/open-trades';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {
  @ViewChild('lineCanvas') lineCanvas;

  closedtrades: any;
  opentrades : any;
  equityClosedTrades : any;
  cryptoClosedTrades : any;
  forexClosedTrades : any;
  equityCount: any;
  cryptoCount: any;
  forexCount: any;
  totalCount: any;
  totalProfitable : any;
  equityProfitable: any;
  cryptoProfitable: any;
  forexProfitable: any;
  equityProfit: any;
  cryptoProfit: any;
  forexProfit: any;
  totalProfit: any;
  lineChart: any;
  linechartInput: any;
  linechartData: any;
  linechartLabels: any;


  constructor(private navCtrl: NavController, public provider : ProvidersProvider) {
  }

ngOnInit(){
  this.getTrades();
  this.getChart();

}

async getTrades(){
  const response =  await this.provider.getClosedEquityTrades().toPromise();
  const response1 = await this.provider.getClosedCryptoTrades().toPromise();
  const response2 = await this.provider.getClosedForexTrades().toPromise();
  this.equityClosedTrades = response;
  this.cryptoClosedTrades = response1;
  this.forexClosedTrades = response2;
  await this.getStats(response, response1, response2);
  this.equityClosedTrades = await this.equityClosedTrades.sort(this.compare2);
  this.cryptoClosedTrades = await this.cryptoClosedTrades.sort(this.compare2);
  this.forexClosedTrades = await this.forexClosedTrades.sort(this.compare2);
}

async getChart(){
  const response =  await this.provider.getAllPnL().toPromise();
  this.linechartInput = await response.sort(this.compare);
  this.linechartLabels = await this.linechartInput.map(function(e) {
    return e.date;
 });

 this.linechartData= await this.linechartInput.map(function(e) {
  return e.runningTotal;
});;

this.lineChart = new Chart(this.lineCanvas.nativeElement, {
   
  type: 'line',
  options: {
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    }
},
  data: {
      labels: this.linechartLabels,
      
      datasets: [
          {
              label: "Total Profit",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.linechartData,
              spanGaps: false,
          }
      ]
      
  }
  

});

}

getStats(data, data1, data2){
  var count = 0;
  var count1 = 0;
  var count2 = 0;
  var tradesProfitable = 0
  var tradesProfitable1 = 0;
  var tradesProfitable2 = 0;
  var tradesProfit = 0;
  var tradesProfit1 = 0;
  var tradesProfit2 = 0;
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

    for(let trade of data2){
      count2++;
      tradesProfit2 += (((trade.percentChange/100) * trade.signalBuyPrice)*trade.amount);
      if(trade.percentChange >= 0){
        tradesProfitable2++;
      }
    }
      this.equityCount = count;
      this.cryptoCount = count1; 
      this.forexCount = count2;
      this.totalCount = count + count1 + count2;
      this.equityProfitable = Number((tradesProfitable/count) * 100).toFixed(1);
      this.cryptoProfitable = Number((tradesProfitable1/count1) * 100).toFixed(1);
      this.forexProfitable = Number((tradesProfitable2/count2) * 100).toFixed(1);
      this.totalProfitable = Number((tradesProfitable + tradesProfitable1 + tradesProfitable2)/(count + count1 + count2)*100).toFixed(1);
      this.equityProfit = Number(tradesProfit).toFixed(2);
      this.cryptoProfit = Number(tradesProfit1).toFixed(2);
      this.forexProfit = Number(tradesProfit2).toFixed(2);
      this.totalProfit = Number(tradesProfit + tradesProfit1 + tradesProfit2).toFixed(2);
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
      return comparison;
    }  

compare2(a,b){
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



ionViewDidLoad() {
  
  
  
  }


goToStatistics(){
this.navCtrl.push(StatisticsPage);
}
goToOpenTrades(){
  this.navCtrl.push(OpenTradesPage);
}
goToClosedTrades(){
  this.navCtrl.push(ClosedTradesPage);
}
}

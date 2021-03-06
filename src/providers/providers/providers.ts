import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';


@Injectable()
export class ProvidersProvider {

  public API = 'http://167.99.52.238:8080';
  public EQUITY_TRADES  = this.API + '/equity-trades';
  public EQUITY_TRADE_SIGNALS  = this.API + '/equity-trade-signals';
  public CRYPTO_TRADES  = this.API + '/crypto-trades';
  public CRYPTO_TRADE_SIGNALS  = this.API + '/crypto-trade-signals';
  public FOREX_TRADES = this.API + '/forex-trades';
  public FOREX_TRADE_SIGNALS  = this.API + '/forex-trade-signals';
  public PNL  = this.API + '/pnl';
  public STATS  = this.API + '/stats';

  constructor(public http: HttpClient) {
  }

getAllEquityTrades(): Observable<any>{
  return this.http.get(this.EQUITY_TRADES + "/all")
}

getAllCryptoTrades(): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/all")
}

getAllForexTrades(): Observable<any>{
  return this.http.get(this.FOREX_TRADES + "/all")
}

getOpenEquityTrades(): Observable<any>{
  return this.http.get(this.EQUITY_TRADES + "/open")
}

getClosedEquityTrades(): Observable<any> {
  return this.http.get(this.EQUITY_TRADES + "/closed")
}
getOpenForexTrades(): Observable<any>{
  return this.http.get(this.FOREX_TRADES + "/open")
}

getClosedForexTrades(): Observable<any> {
  return this.http.get(this.FOREX_TRADES + "/closed")
}

getOpenCryptoTrades(): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/open")
}

getClosedCryptoTrades(): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/closed")
}

getAllEquityTradeSignals(): Observable<any>{
  return this.http.get(this.EQUITY_TRADE_SIGNALS + "/all")
}

getAllCryptoTradeSignals(): Observable<any>{
  return this.http.get(this.CRYPTO_TRADE_SIGNALS + "/all")
}

getAllForexTradeSignals(): Observable<any>{
  return this.http.get(this.FOREX_TRADE_SIGNALS + "/all")
}

getEquityTradesBySymbol(ticker): Observable<any>{
  return this.http.get(this.EQUITY_TRADES + "/tickers/" + ticker)
}

getCryptoTradesBySymbol(ticker): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/tickers/" + ticker)
}

getForexTradesBySymbol(ticker): Observable<any>{
  return this.http.get(this.FOREX_TRADES + "/tickers/" + ticker)
}

getEquityTradesByStrategy(strategy): Observable<any>{
  return this.http.get(this.EQUITY_TRADES + "/strategies/" + strategy)
}

getCryptoTradesByStrategy(strategy): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/strategies/" + strategy)
}

getForexTradesByStrategy(strategy): Observable<any>{
  return this.http.get(this.FOREX_TRADES + "/strategies/" + strategy)
}

getEquityTradesByTicker(): Observable<any>{
  return this.http.get(this.EQUITY_TRADES + "/tickers")
}

getCryptoTradesByTicker(): Observable<any>{
  return this.http.get(this.CRYPTO_TRADES + "/tickers")
}

getForexTradesByTicker(): Observable<any>{
  return this.http.get(this.FOREX_TRADES + "/tickers")
}

getAllStrategies(): Observable<any>{
  return this.http.get(this.API + "/all")
}

getAllPnL(): Observable<any>{
  return this.http.get(this.PNL + "/all")
}

getPnLDates(): Observable<any>{
  return this.http.get(this.PNL + "/dates")
}

getRunningTotal(): Observable<any>{
  return this.http.get(this.PNL + "/runningprofit")
}

getRunningEquity(): Observable<any>{
  return this.http.get(this.PNL + "/runningequity")
}

getRunningCrypto(): Observable<any>{
  return this.http.get(this.PNL + "/runningcrypto")
}

getDailyTotal(): Observable<any>{
  return this.http.get(this.PNL + "/dailyprofit")
}

getDailyEquity(): Observable<any>{
  return this.http.get(this.PNL + "/dailyequity")
}

getDailyCrypto(): Observable<any>{
  return this.http.get(this.PNL + "/dailycrypto")
}

getTopForexTrade(): Observable<any>{
  return this.http.get(this.STATS + "/toptrade/forex")
}

getWorstForexTrade(): Observable<any>{
  return this.http.get(this.STATS + "/worsttrade/forex")
}

getTopEquityTrade(): Observable<any>{
  return this.http.get(this.STATS + "/toptrade/equity")
}

getWorstEquityTrade(): Observable<any>{
  return this.http.get(this.STATS + "/worsttrade/equity")
}
getTopCryptoTrade(): Observable<any>{
  return this.http.get(this.STATS + "/toptrade/crypto")
}

getWorstCryptoTrade(): Observable<any>{
  return this.http.get(this.STATS + "/worsttrade/crypto")
}

getStrategieStats(): Observable<any>{
  return this.http.get(this.STATS + "/strategies")
}

getTickerStatsEquity(): Observable<any>{
  return this.http.get(this.STATS + "/tickers/equity")
}

getTickerStatsCrypto(): Observable<any>{
  return this.http.get(this.STATS + "/tickers/equity")
}

getTickerStatsForex(): Observable<any>{
  return this.http.get(this.STATS + "/tickers/forex")
}





}

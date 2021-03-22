# SmartAPI - PHP Client SDK

## Installation

#### Without composer
Download library from [here](https://github.com/angelbroking-github/smartapi-php) and use as your custom library

### Via composer
```bash
composer require smartapi-php/angelbroking
```



## Usage
The simplest usage of the library would be as follows:
```
<?php

require_once __DIR__ . '/vendor/autoload.php';

$smart_api  = new \AngelBroking\SmartApi();
	
$smart_api ->GenerateSession("client-code","password");
   

?>
```


## Usage for frameworks
Import package to controller
```
use AngelBroking\SmartApi;
use AngelBroking\Websocket;
```

## Getting started with API
```php
  //in your function of controller create instance of AngelBroking class

    $smart_api  = new SmartApi();
    
    //Login
    $smart_api ->GenerateSession("Client-code","password");
    
    //methods
    $token = $smart_api ->GenerateToken();  
    
    $profile = $smart_api ->GetProfile();
    
    $smart_api ->LogOut(array('clientcode'=>'your client-code'));
    
    $rms = $smart_api ->GetRMS();
    
    $order = $smart_api ->PlaceOrder(array('variety' => 'NORMAL',
                                    'tradingsymbol'  =>  'JINDALSTEL-EQ',
                                    'symboltoken' => '6733',
                                    'exchange' => 'NSE',
                                    'transactiontype' => 'SELL',
                                    'ordertype' => 'LIMIT',
                                    'quantity' => '1',
                                    'producttype' => 'INTRADAY',
                                    'price' => 312.65,
                                    'squareoff' => 0,
                                    'stoploss' => 0,
                                    'duration' => 'DAY'));
                                    
     $modifyOrder = $smart_api ->ModifyOrder(array('variety' => 'NORMAL',
                                    'tradingsymbol'  =>  'JINDALSTEL-EQ',
                                    'symboltoken' => '6733',
                                    'exchange' => 'NSE',
                                    'transactiontype' => 'BUY',
                                    'ordertype' => 'LIMIT',
                                    'quantity' => '1',
                                    'producttype' => 'INTRADAY',
                                    'price' => 200,
                                    'squareoff' => 0,
                                    'stoploss' => 0,
                                    'duration' => 'DAY',
                                    'orderid' =>210312000000394));
    
    $cancelOrder = $smart_api ->CancelOrder(array('variety' => 'NORMAL',
                                      'orderid' => '210312000000394'));
                                      
    $GetOrderBook = $smart_api ->GetOrderBook();
    
    $GetTradeBook = $smart_api ->GetTradeBook();
    
    $GetHoldings =  $smart_api ->GetHoldings();
    
    $GetPosition  = $smart_api ->GetPosition();
    
    $ConvertPosition  = $smart_api ->ConvertPosition(array("exchange"=>"NSE",
                                                "oldproducttype"=>"INTRADAY",
                                                "newproducttype"=>"MARGIN",
                                                "tradingsymbol"=>"JINDALSTEL-EQ",
                                                "transactiontype"=>"SELL",
                                                "quantity"=>"1",
                                                "type"=>"DAY"));
                                                
   $CreateRule  = $smart_api ->CreateRule(array("tradingsymbol" => "SBIN-EQ", 
                                      "symboltoken" => "3045", 
                                      "exchange" => "NSE", 
                                      "producttype" => "MARGIN", 
                                      "transactiontype" => "BUY",
                                      "price" => 100000, 
                                      "qty" => 10, 
                                      "disclosedqty"=> 10, 
                                      "triggerprice" => 200000,
                                      "timeperiod" => 365));
                                       
   $ModifyRule  = $smart_api ->ModifyRule(array('id' => '1000059',
                                       "tradingsymbol" => "SBIN-EQ", 
                                      "symboltoken" => "3045", 
                                      "exchange" => "NSE", 
                                      "producttype" => "MARGIN", 
                                      "transactiontype" => "BUY",
                                      "price" => 100000, 
                                      "qty" => 20, 
                                      "disclosedqty"=> 10, 
                                      "triggerprice" => 200000,
                                      "timeperiod" => 365));
                                      
    $CancelRule = $smart_api ->CancelRule(array('symboltoken'  => '3045'
                                       'exchange'   =>   'NSE' ,
                                      'id'  => '1000059'));
                                      
    $RuleDetails = $smart_api ->RuleDetails(array('id'=>'1000059'));
    
    $RuleList = $smart_api ->RuleList(array( "status"=> [
                                      "NEW",
                                      "CANCELLED",
                                      "ACTIVE",
                                      "SENTTOEXCHANGE",
                                      "FORALL"
                                 ],
                                 "page"=> 1,
                                 "count"=> 10));
                                 
    $GetCandleData = $smart_api ->GetCandleData(array("exchange"=> "NSE",
                                             "symboltoken"=> "3045",
                                             "interval"=> "MINUTE",
                                             "fromdate"=> "2021-02-08 09:00",
                                             "todate"=> "2021-02-08 09:16"));
    
```

## Getting started with SmartAPI Websocket's
```php
$websocket = new Websocket();
echo $websocket->SocketConnet($client-code, $feed-token, $task, $script);   
```

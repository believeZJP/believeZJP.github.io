//Ionic 启动
/**
 * angular.module 是用来创建，获取，注册模块
 * //http://www.mamicode.com/info-detail-247448.html
 * 此处："starter" 是这个模块的名字，需要在index.html的body标签中设置
 * 第二个参数是要调用模块的数组
 * starter.controllers 在controllers.js中
 * 
 */

angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  	.config(function($stateProvider,$urlRouterProvider){
  		$stateProvider.state('app',{
  			url:'/app',
  			abstract:true,
  			templateUrl:'templates/menu.html',
  			controller:'AppCtrl'
  		})
  		.state('app.profile',{
  			url:'/profile',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/profile.html'
  				}
  			}
  		})
  		.state('app.profile1',{
  			url:'/profile1',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/profile_1.html'
  				}
  			}
  		})
  		.state('app.music',{
  			url:'/music',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/feeds.html',
  					controller:'FeedCtrl'
  				}
  			}
  		})
  		.state('app.feeds',{
  			url:'/feeds',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/feeds.html',
  					controller:'FeedCtrl'
  				}
  			}
  		})
  		.state('app.notification',{
  			url:'/notification',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/notification.html',
  					controller:'NotificationCtrl'
  				}
  			}
  		})
  		.state('app.photo',{
  			url:'/photo',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/photo.html'
  				}
  			}
  		})
  		.state('app.setting',{
  			url:'/setting',
  			views:{
  				'menuContent':{
  					templateUrl:'templates/states/setting.html'
  				}
  			}
  		});
  		
  		//如果链接没有和以上的匹配，就用这个回调
  		$urlRouterProvider.otherwise('/app/profile1');
  	});

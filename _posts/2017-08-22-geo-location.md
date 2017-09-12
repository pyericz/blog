---
layout: post
title: "iOS获取地理位置信息"
date: 2017-08-22
categories: ios
tag: [ios, lbs]
---
* content
{:toc}

iOS提供的CoreLocation.framework可以让我们方便地获取基于地理位置的行政区域信息。


## 配置位置服务

为了获取地理位置信息，我们需要导入CoreLocation.framework库，并在源文件中导入CoreLocation.h，如下
```objc
#import <CoreLocation/CoreLocation.h>
```

我们一共需要两个类，一个是CLLocationManager，用于获取地理坐标；还有一个是CLGeocoder，用于将地理坐标转化为行政区域信息。

```objc
@interface GeoLocation: NSObject <CLLocationManagerDelegate>

@property(nonatomic, strong) CLLocationManager* locationManager;
@property(nonatomic, strong) CLGeocoder* geocoder;

@end
```

对声明的两个对象简单初始化
```objc
- (void)setup
{
	_locationManager = [[CLLocationManager alloc] init];
	[_locationManager requestWhenInUseAuthorization];
	_locationManager.delegate = self; // 设置代理
	_geocoder = [[CLGeocoder alloc] init];
}
```

相应的需要在info.plist中配置使用Privacy - Location When In Use Usage Description的值。

接下来我们通过协议方法[locationManager:didUpdateLocations:]得到坐标位置信息，并通过geocoder的[reverseGeocodeLocation:completionHandler:]方法获取placemark信息

```objc
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
	CLLocation * location = locations.lastObject;
	[_geocoder reverseGeocodeLocation:location completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {
		if (placemarks.count > 0) {
			CLPlacemark *placemark = [placemarks objectAtIndex:0];
			// 从placemark中获取感兴趣的行政区域信息，比如获得省份名称
			NSLog(@"administrativeArea: %@", placemark.administrativeArea);
		}
	}]
}
```
CLPlacemark包含如下信息：
- **thoroughfare** 街道
- **subThoroughfare** 子街道
- **locality** 市
- **subLocality** 区/县
- **administrativeArea** 行政区
- **subAdministrativeArea** 子行政区
- **postalCode** 邮政编码
- **ISOcountryCode** 国家区号
- **country** 国家
- **inlandWater** 内陆水系
- **ocean** 海洋
- **areasOfInterest** 兴趣点

一切配置完后，就可以启动位置服务了
```objc
[_locationManager startUpdatingLocation];
```

## 输出指定语言的行政区信息
需要注意的是，从CLPlacemark获取的字符串编码和手机的语言设定有关。比如，当手机语言设置为中文时，则获取的字符串值就是中文编码的；而当设置为英文时，相应的则是英文编码。但有些时候我们希望统一编码，不论用户将手机设定为何种语言。这时候的思路就是geocoder解析之前先临时将系统语言设定为指定的语言，等解析完后再设定回原来的语言。以英文编码为例，代码如下


```objc
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
	CLLocation * location = locations.lastObject;
	// 临时设定语言为英文
	NSMutableArray *userDefaultLanguages = [[NSUserDefaults standardUserDefaults] objectForKey:@"AppleLanguages"];
	[[NSUserDefaults standardUserDefaults] setObject:[NSArray arrayWithObjects:@"en", nil] forKey:@"AppleLanguages"];
	
	[_geocoder reverseGeocodeLocation:location completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {
		if (placemarks.count > 0) {
			CLPlacemark *placemark = [placemarks objectAtIndex:0];
			// 从placemark中获取感兴趣的行政区域信息，比如获得省份名称
			NSLog(@"administrativeArea: %@", placemark.administrativeArea);
		}
		// 恢复语言设定
		[[NSUserDefaults standardUserDefaults] setObject:userDefaultLanguages forKey:@"AppleLanguages"];
	}
}
```


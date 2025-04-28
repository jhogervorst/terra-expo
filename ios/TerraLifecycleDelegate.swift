import ExpoModulesCore
import TerraiOS

public class TerraLifecycleDelegate: ExpoAppDelegateSubscriber {
  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
    Terra.setUpBackgroundDelivery()
    return true
  }
}

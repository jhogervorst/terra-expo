import ExpoModulesCore
import TerraiOS

public class TerraLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func applicationDidBecomeActive(_ application: UIApplication) {
        Terra.setUpBackgroundDelivery()
    }
}

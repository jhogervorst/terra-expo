require "json"

package = JSON.parse(File.read(File.join(__dir__, "..", "package.json")))

Pod::Spec.new do |s|
  s.name         = "TerraReact"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/jhogervorst/terra-expo.git", :tag => "#{s.version}" }

  s.source_files = "**/*.{h,m,mm,swift}"

  s.frameworks = ['HealthKit']
  s.dependency "TerraiOS", "1.6.26"
  s.dependency "React-Core"
  s.dependency 'ExpoModulesCore'
end

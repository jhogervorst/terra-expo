const {
  withEntitlementsPlist,
  withInfoPlist,
  withPlugins,
} = require('expo/config-plugins');

/* eslint-disable no-shadow */

const DEFAULT_HEALTH_SHARE_PERMISSION =
  'Allow $(PRODUCT_NAME) to access your health info';
const BACKGROUND_TASK_IDENTIFIER = 'co.tryterra.data.post.request';

const withIosHealthKit = (config, { healthSharePermission } = {}) =>
  withPlugins(config, [
    (config) =>
      withEntitlementsPlist(config, (config) => {
        config.modResults['com.apple.developer.healthkit'] = true;
        config.modResults[
          'com.apple.developer.healthkit.background-delivery'
        ] = true;
        return config;
      }),
    (config) =>
      withInfoPlist(config, (config) => {
        config.modResults.NSHealthShareUsageDescription =
          healthSharePermission ||
          config.modResults.NSHealthShareUsageDescription ||
          DEFAULT_HEALTH_SHARE_PERMISSION;
        return config;
      }),
  ]);

const withIosBackgroundExecution = (config) =>
  withInfoPlist(config, (config) => {
    if (!Array.isArray(config.modResults.UIBackgroundModes)) {
      config.modResults.UIBackgroundModes = [];
    }
    if (!config.modResults.UIBackgroundModes.includes('processing')) {
      config.modResults.UIBackgroundModes.push('processing');
    }
    if (!config.modResults.UIBackgroundModes.includes('fetch')) {
      config.modResults.UIBackgroundModes.push('fetch');
    }
    if (!Array.isArray(config.modResults.BGTaskSchedulerPermittedIdentifiers)) {
      config.modResults.BGTaskSchedulerPermittedIdentifiers = [];
    }
    if (
      !config.modResults.BGTaskSchedulerPermittedIdentifiers.includes(
        BACKGROUND_TASK_IDENTIFIER
      )
    ) {
      config.modResults.BGTaskSchedulerPermittedIdentifiers.push(
        BACKGROUND_TASK_IDENTIFIER
      );
    }
    return config;
  });

const withTerraIos = (config, { healthSharePermission } = {}) =>
  withPlugins(config, [
    [withIosHealthKit, { healthSharePermission }],
    withIosBackgroundExecution,
  ]);

module.exports = withTerraIos;

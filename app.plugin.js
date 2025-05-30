const {
  withEntitlementsPlist,
  withInfoPlist,
  withPlugins,
} = require('expo/config-plugins');

/* eslint-disable no-shadow */

const DEFAULT_HEALTH_SHARE_PERMISSION =
  'Allow $(PRODUCT_NAME) to access your health data';
const DEFAULT_HEALTH_UPDATE_PERMISSION =
  'Allow $(PRODUCT_NAME) to update your health data';
const DEFAULT_HEALTH_RECORDS_SHARE_PERMISSION =
  'Allow $(PRODUCT_NAME) to access your health records';
const BACKGROUND_TASK_IDENTIFIER = 'co.tryterra.data.post.request';

const withIosHealthKit = (
  config,
  {
    healthSharePermission,
    healthUpdatePermission,
    healthRecordsSharePermission,
  } = {}
) =>
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
        config.modResults.NSHealthUpdateUsageDescription =
          healthUpdatePermission ||
          config.modResults.NSHealthUpdateUsageDescription ||
          DEFAULT_HEALTH_UPDATE_PERMISSION;
        config.modResults.NSHealthClinicalHealthRecordsShareUsageDescription =
          healthRecordsSharePermission ||
          config.modResults
            .NSHealthClinicalHealthRecordsShareUsageDescription ||
          DEFAULT_HEALTH_RECORDS_SHARE_PERMISSION;
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

const withTerraIos = (
  config,
  {
    healthSharePermission,
    healthUpdatePermission,
    healthRecordsSharePermission,
  } = {}
) =>
  withPlugins(config, [
    [
      withIosHealthKit,
      {
        healthSharePermission,
        healthUpdatePermission,
        healthRecordsSharePermission,
      },
    ],
    withIosBackgroundExecution,
  ]);

module.exports = withTerraIos;

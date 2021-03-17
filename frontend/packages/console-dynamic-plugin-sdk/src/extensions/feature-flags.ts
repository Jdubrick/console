import { Extension } from '@console/plugin-sdk/src/typings/base';
import { CodeRef, EncodedCodeRef, UpdateExtensionProperties } from '../types';

namespace ExtensionProperties {
  /** Gives full control over Console feature flags. */
  export type FeatureFlag = {
    /** Used to set/unset arbitrary feature flags. */
    handler: EncodedCodeRef;
  };

  export type FeatureFlagCodeRefs = {
    handler: CodeRef<FeatureFlagHandler>;
  };

  /** Adds new Console feature flag driven by the presence of a CRD on the cluster. */
  export type ModelFeatureFlag = {
    /** The name of the flag to set once the CRD is detected. */
    flag: string;
    /** The model which refers to a `CustomResourceDefinition`. */
    model: {
      group: string;
      version: string;
      kind: string;
    };
  };
}

// Extension types

export type FeatureFlag = Extension<ExtensionProperties.FeatureFlag> & {
  type: 'console.flag';
};

export type ResolvedFeatureFlag = UpdateExtensionProperties<
  FeatureFlag,
  ExtensionProperties.FeatureFlagCodeRefs
>;

export type ModelFeatureFlag = Extension<ExtensionProperties.ModelFeatureFlag> & {
  type: 'console.flag/model';
};

// Support types

export type FeatureFlagHandler = (callback: SetFeatureFlag) => void;
export type SetFeatureFlag = (flag: string, enabled: boolean) => void;

// Type guards

export const isFeatureFlag = (e: Extension): e is ResolvedFeatureFlag => e.type === 'console.flag';

export const isModelFeatureFlag = (e: Extension): e is ModelFeatureFlag =>
  e.type === 'console.flag/model';

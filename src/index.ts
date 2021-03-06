/* eslint-disable no-use-before-define */
import {
	AcceptedPlugin, AtRule, AtRuleProps, CommentProps, Container, Declaration, DeclarationProps, Parser, Stringifier, Root, Rule, RuleProps,
} from "postcss";

export type ThemeValue = string | string[] | number | { [key: string]: ThemeValue } | undefined;

export interface Theme {
	[key: string]: {
		[value: string]: NonNullable<ThemeValue>;
	};
}

export type CorePluginsArray = string[];

export interface CorePluginsObject {
	[k: string]: boolean;
}

export type CorePlugins = boolean | CorePluginsArray | CorePluginsObject;

export interface NestedObject {
	[k: string]: string | NestedObject;
}

export interface AddComponentsOptionsObject {
	respectPrefix?: boolean;
	variants?: Variants;
}

export type AddComponentsOptions = AddComponentsOptionsObject | Variants;

export type Variants = string[];

export interface AddUtilitiesOptionsObject {
	respectPrefix?: boolean;
	respectImportant?: boolean;
	variants?: Variants;
}

export type AddUtilitiesOptions = AddUtilitiesOptionsObject | Variants;

export interface ModifySelectorsOptions {
	className: string;
}

export interface AddVariantGeneratorOptions {
	container: Container;
	modifySelectors: (modifierFunction: (options: ModifySelectorsOptions) => string) => void;
	separator: string;
}

export type AddVariantGenerator = (options: AddVariantGeneratorOptions) => void;

export interface AddVariantOptions {
	// eslint-disable-next-line camelcase
	unstable_stack?: boolean;
}

export type ConfigValue = Theme | ThemeValue | CorePlugins | Plugin[] | undefined;

export interface PostCSS {
	stringify: Stringifier;
	parse: Parser;
	comment(defaults?: CommentProps): Comment;
	atRule(defaults?: AtRuleProps): AtRule;
	decl(defaults?: DeclarationProps): Declaration;
	rule(defaults?: RuleProps): Rule;
	root(defaults?: any): Root; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type PluginTools = {
	addBase: (baseStyles: NestedObject) => void;
	addComponents: (components: NestedObject, options: AddComponentsOptions) => void;
	addUtilities: (utilities: NestedObject, options: AddUtilitiesOptions) => void;
	addVariant: (name: string, generator: AddVariantGenerator, options?: AddVariantOptions) => void;
	config: <Default extends ConfigValue>(path: string, defaultValue: Default) => ConfigValue;
	e: (className: string) => string;
	postcss: PostCSS;
	prefix: (selector: string) => string;
	target: (plugin: string) => TargetValue;
	theme: <Default extends ThemeValue>(path: string, defaultValue: Default) => ThemeValue | Default;
	variants: <Default extends Variants, Path extends keyof VariantsObject>(path: Path, defaultValue: Default) => VariantsObject[Path] | Default;
}

export type BasicPlugin = (args: PluginTools) => void;

export interface WrappedPlugin {
	handler: BasicPlugin;
	config: TailwindCSSConfig;
}

export type PluginFunction<Options> = (options: Options) => BasicPlugin;
export type ConfigFunction<Options> = (options: Options) => TailwindCSSConfig;
export type PluginWithOptions<Options> = (pluginFunction: PluginFunction<Options>, configFunction?: ConfigFunction<Options>) => BasicPlugin;
export type Plugin<Options = null> = Options extends null ? (BasicPlugin | WrappedPlugin) : PluginWithOptions<Options>;

export interface CreatePlugin {
	(plugin: BasicPlugin, config?: TailwindCSSConfig): WrappedPlugin;
	withOptions<Options>(pluginFunction: PluginFunction<Options>, configFunction?: ConfigFunction<Options>): (options: Options) => WrappedPlugin;
}

export interface VariantsObject {
	[utility: string]: Variants;
}

export type PurgeContent = string[];
export type PurgeMode = "layers" | "conservative" | "all";
export type Layer = "base" | "components" | "utilities";
export interface PurgeOptions {
	content: PurgeContent;
	enabled?: boolean;
	layers: Layer[];
	mode?: PurgeMode;
	preserveHtmlElements?: boolean;
	options?: {
		defaultExtractor?: (content: string) => string[];
		whitelist?: string[];
		whitelistPatterns?: string[];
	}
}

export type Purge = PurgeOptions | PurgeContent | boolean;

export interface Future {
	removeDeprecatedGapUtilities?: boolean;
	purgeLayersByDefault?: boolean;
}

export interface ExperimentalOptions {
	applyComplexClasses?: boolean;
	darkModeVariant?: boolean;
	defaultLineHeights?: boolean;
	extendedFontSizeScale?: boolean;
	extendedSpacingScale?: boolean;
	uniformColorPalette?: boolean;
}

export type Experimental = ExperimentalOptions | "all";

export type TargetValue = "ie11" | "relaxed";

export type TargetOverridesPerPlugin = {
	[plugin: string]: TargetValue;
}

export type Target = TargetValue | [TargetValue, TargetOverridesPerPlugin];

export interface TailwindCSSConfig {
	purge?: Purge;
	important?: boolean | string;
	prefix?: string;
	separator?: string;
	theme?: Theme;
	corePlugins?: CorePlugins;
	plugins?: Plugin[];
	variants?: VariantsObject;
	future?: Future;
	experimental?: Experimental;
	target?: Target;
}

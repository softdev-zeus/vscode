/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { TPromise } from 'vs/base/common/winjs.base';
import URI from 'vs/base/common/uri';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import Event from 'vs/base/common/event';
import { IDisposable } from 'vs/base/common/lifecycle';

export interface IBaselineResourceProvider {
	getBaselineResource(resource: URI): TPromise<URI>;
}

export const ISCMService = createDecorator<ISCMService>('scm');

export interface ISCMResourceDecorations {
	icon?: URI;
	iconDark?: URI;
	strikeThrough?: boolean;
}

export interface ISCMResource {
	readonly resourceGroup: ISCMResourceGroup;
	readonly uri: URI;
	readonly sourceUri: URI;
	readonly decorations: ISCMResourceDecorations;
}

export interface ISCMResourceGroup {
	readonly uri: URI;
	readonly label: string;
	readonly contextKey?: string;
	readonly resources: ISCMResource[];
}

export interface ISCMProvider extends IDisposable {
	readonly label: string;
	readonly contextKey?: string;
	readonly resources: ISCMResourceGroup[];
	readonly onDidChange: Event<ISCMResourceGroup[]>;
	readonly count?: number;
	readonly stateContextKey?: string;

	open(uri: ISCMResource): void;
	getOriginalResource(uri: URI): TPromise<URI>;
}

export interface ISCMInput {
	value: string;
	readonly onDidChange: Event<string>;
	readonly onDidAccept: Event<string>;
	acceptChanges(): void;
}

export interface ISCMService {

	readonly _serviceBrand: any;
	readonly onDidChangeProvider: Event<ISCMProvider>;
	readonly providers: ISCMProvider[];
	readonly input: ISCMInput;
	activeProvider: ISCMProvider | undefined;

	registerSCMProvider(provider: ISCMProvider): IDisposable;
}
// @ts-nocheck -- Live2D公式Cubism Web SDK Frameworkのソースをそのまま同梱（LICENSE.md参照）。
//	sn_gallery側tsconfig.json（strictNullChecks/noUncheckedIndexedAccess等）は
//	このベンダーコードを想定しておらず適用すると大量のエラーになるため、型チェック対象
//	からは外す（型定義自体はこのファイルから普通に解決されるため、Live2DLayer.ts側の
//	型チェックには影響しない）。中身は改変していない
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { ICubismUpdater, CubismUpdateOrder } from './icubismupdater';
import { CubismModel } from '../model/cubismmodel';
import { CubismBreath } from '../effect/cubismbreath';

/**
 * Updater for breath effects.
 * Handles the management of breath animation through the CubismBreath class.
 */
export class CubismBreathUpdater extends ICubismUpdater {
  private _breath: CubismBreath;

  /**
   * Constructor
   *
   * @param breath CubismBreath reference
   */
  constructor(breath: CubismBreath);

  /**
   * Constructor
   *
   * @param breath CubismBreath reference
   * @param executionOrder Order of operations
   */
  constructor(breath: CubismBreath, executionOrder: number);

  constructor(breath: CubismBreath, executionOrder?: number) {
    super(executionOrder ?? CubismUpdateOrder.CubismUpdateOrder_Breath);
    this._breath = breath;
  }

  /**
   * Update process.
   *
   * @param model Model to update
   * @param deltaTimeSeconds Delta time in seconds.
   */
  onLateUpdate(model: CubismModel, deltaTimeSeconds: number): void {
    if (!model) {
      return;
    }

    this._breath.updateParameters(model, deltaTimeSeconds);
  }
}

// Namespace definition for compatibility.
import * as $ from './cubismbreathupdater';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismBreathUpdater = $.CubismBreathUpdater;
  export type CubismBreathUpdater = $.CubismBreathUpdater;
}

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

import { CubismId } from './cubismid';

/**
 * ID名の管理
 *
 * ID名を管理する。
 */
export class CubismIdManager {
  /**
   * コンストラクタ
   */
  public constructor() {
    this._ids = new Array<CubismId>();
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    for (let i = 0; i < this._ids.length; ++i) {
      this._ids[i] = void 0;
    }
    this._ids = null;
  }

  /**
   * ID名をリストから登録
   *
   * @param ids ID名リスト
   * @param count IDの個数
   */
  public registerIds(ids: string[]): void {
    for (let i = 0; i < ids.length; i++) {
      this.registerId(ids[i]);
    }
  }

  /**
   * ID名を登録
   *
   * @param id ID名
   */
  public registerId(id: string): CubismId {
    let result: CubismId = null;

    if ('string' == typeof id) {
      if ((result = this.findId(id)) != null) {
        return result;
      }

      result = CubismId.createIdInternal(id);
      this._ids.push(result);
    } else {
      return this.registerId(id);
    }

    return result;
  }

  /**
   * ID名からIDを取得する
   *
   * @param id ID名
   */
  public getId(id: string): CubismId {
    return this.registerId(id);
  }

  /**
   * ID名からIDの確認
   *
   * @return true 存在する
   * @return false 存在しない
   */
  public isExist(id: string): boolean {
    if ('string' == typeof id) {
      return this.findId(id) != null;
    }
    return this.isExist(id);
  }

  /**
   * ID名からIDを検索する。
   *
   * @param id ID名
   * @return 登録されているID。なければNULL。
   */
  private findId(id: string): CubismId {
    for (let i = 0; i < this._ids.length; ++i) {
      if (this._ids[i].getString() == id) {
        return this._ids[i];
      }
    }

    return null;
  }

  private _ids: Array<CubismId>; // 登録されているIDのリスト
}

// Namespace definition for compatibility.
import * as $ from './cubismidmanager';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismIdManager = $.CubismIdManager;
  export type CubismIdManager = $.CubismIdManager;
}

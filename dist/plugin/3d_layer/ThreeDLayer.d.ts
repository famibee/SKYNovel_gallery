import { Layer } from '@famibee/skynovel';
import type { HArg, IPluginInitArg } from '@famibee/skynovel';
import { AnimationMixer } from 'three';
export declare class ThreeDLayer extends Layer {
    #private;
    private pia;
    static THREE: any;
    static init(): Promise<void>;
    constructor(pia: IPluginInitArg);
    lay(hArg: HArg): boolean;
    clearLay(hArg: HArg): void;
    record: () => {
        name: string;
        idx: number;
        alpha: number;
        blendMode: import("pixi.js").BLEND_MODES;
        rotation: number;
        scale_x: number;
        scale_y: number;
        pivot_x: number;
        pivot_y: number;
        x: number;
        y: number;
        visible: boolean;
        aFltHArg: HArg[];
    } & {
        hInf: {
            [name: string]: {
                type: string;
                fn: string;
                label?: string;
                gltf?: any;
                effhdl?: effekseer.EffekseerHandle;
                mixer?: AnimationMixer;
                aa?: any;
            };
        };
    };
    playback(hLay: any, aPrm: Promise<void>[]): void;
    dump(): string;
}
//# sourceMappingURL=ThreeDLayer.d.ts.map
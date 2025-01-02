import { Layer } from '@famibee/skynovel';
import type { HArg, IPluginInitArg } from '@famibee/skynovel';
export declare class Cubism3Layer extends Layer {
    private pia;
    private model;
    private ldr;
    private state;
    constructor(pia: IPluginInitArg);
    lay(hArg: HArg, fncComp?: () => void): boolean;
    private hdl_tick;
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
        fn: string;
        label: string;
        scale: number;
    };
    playback(hLay: any, aPrm: Promise<void>[]): boolean;
    destroy(): void;
}
//# sourceMappingURL=Cubism3Layer.d.ts.map
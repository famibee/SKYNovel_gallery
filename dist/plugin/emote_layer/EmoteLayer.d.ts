import { Layer } from '@famibee/skynovel';
import type { HArg, IPluginInitArg } from '@famibee/skynovel';
export interface IInf {
    fn: string;
    player: any;
}
export declare class EmoteLayer extends Layer {
    #private;
    private pia;
    constructor(pia: IPluginInitArg);
    lay(hArg: HArg, fncComp?: () => void): boolean;
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
    } & ({
        fn: string;
        label: any;
        scale: any;
        grayscale: any;
        windSpeed: any;
        windPowerMin: any;
        windPowerMax: any;
    } | {
        fn: string;
        label?: undefined;
        scale?: undefined;
        grayscale?: undefined;
        windSpeed?: undefined;
        windPowerMin?: undefined;
        windPowerMax?: undefined;
    });
    playback(hLay: any, aPrm: Promise<void>[]): boolean;
    dump(): string;
    destroy(): void;
}
//# sourceMappingURL=EmoteLayer.d.ts.map
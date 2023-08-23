import { React } from './exports';
import type { ReactNode } from 'react';

export abstract class Patch {
    static key: string;
    static title: string;
    static subtitle: string;
    static icon: string | number;

    static patch(Patcher) {};
    static render({ disabled }): ReactNode { 
        return <></> 
    };
}

import type {ComponentType, ReactNode, CSSProperties} from 'react';
export const DesignCanvas: ComponentType<{children:ReactNode;minScale?:number;maxScale?:number;style?:CSSProperties}>;
export const DCSection: ComponentType<{id:string;title:string;subtitle?:string;children:ReactNode;gap?:number}>;
export const DCArtboard: ComponentType<{id:string;label:string;width:number;height?:number;children:ReactNode;style?:CSSProperties;chromeless?:boolean}>;
export const DCPostIt: ComponentType<{children:ReactNode;top?:number;left?:number;right?:number;bottom?:number;rotate?:number;width?:number}>;
